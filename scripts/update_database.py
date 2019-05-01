import json
from argparse import ArgumentParser
from datetime import datetime
from glob import glob
from itertools import chain
from os.path import join, splitext
from pymongo import ASCENDING

from asset_vulnerability_report.routines import (
    get_nvd_database, normalize_version)
from asset_vulnerability_report.settings import DATASET_FOLDER


def run(nvd_database, source_folder, dataset_name, from_scratch, quietly):
    if from_scratch:
        nvd_database.drop()
        nvd_database.create_index([('id', ASCENDING)], unique=True)
    if not dataset_name:
        for file_path in sorted(glob(join(source_folder, '*.json'))):
            file_stem = splitext(file_path)[0]
            if file_stem.endswith('modified'):
                continue
            if file_stem.endswith('recent'):
                continue
            absorb_dataset(nvd_database, file_path, from_scratch, quietly)
        return
    if dataset_name.isdigit():
        dataset_name = int(dataset_name)
    elif dataset_name not in ('recent', 'modified'):
        print(
            'Please specify a valid dataset name (recent, modified or a '
            'specific year e.g. 2019) or omit it to update all years.')
    for file_path in sorted(glob(join(
            source_folder, '*-%s.json' % dataset_name))):
        absorb_dataset(nvd_database, file_path, from_scratch, quietly)


def absorb_dataset(nvd_database, file_path, from_scratch=False, quietly=False):
    with open(file_path) as f:
        j = json.load(f)
        parsed_items = [extract_cve(_) for _ in j['CVE_Items']]
    if not quietly:
        print(file_path, len(parsed_items))
    if from_scratch:
        nvd_database.insert_many(parsed_items)
        return
    for parsed_item in parsed_items:
        nvd_database.update_one({'id': parsed_item['id']}, {
            '$set': parsed_item}, upsert=True)


def extract_cve(d):
    return {
        'id': get_id(d),
        'packs': get_packs(d),
        'texts': get_texts(d),
        'date': get_date(d),
        'score': get_score(d),
    }


def get_id(d):
    return d['cve']['CVE_data_meta']['ID']


def get_packs(d):
    packs = []
    for cpe_match in yield_cpe_match(d):
        parts = cpe_match['cpe23Uri'].split(':')[2:6]
        component_type = parts[0]
        vendor_name = parts[1]
        product_name = parts[2]
        product_version = parts[3]
        version_pack = extract_version_pack(
            cpe_match, product_version)
        packs.append((
            component_type,
            vendor_name,
            product_name,
            version_pack))
    return packs


def get_texts(d):
    texts = []
    for description in d['cve']['description']['description_data']:
        if description['lang'] != 'en':
            continue
        texts.append(description['value'])
    return texts


def get_date(d):
    return datetime.strptime(d['publishedDate'], '%Y-%m-%dT%H:%MZ')


def get_score(d):
    try:
        return d['impact']['baseMetricV3']['cvssV3']['baseScore']
    except KeyError:
        pass
    try:
        return d['impact']['baseMetricV2']['cvssV2']['baseScore']
    except KeyError:
        pass


def yield_cpe_match(d):

    def extract_cpe_matches(node):
        if 'cpe_match' in node:
            return node['cpe_match']
        if 'children' in node:
            return chain(*[extract_cpe_matches(_) for _ in node['children']])
        return []

    for node in d['configurations']['nodes']:
        for cpe_match in extract_cpe_matches(node):
            yield cpe_match


def extract_version_pack(cpe_match, product_version):
    a_excluding = None
    a_including = None
    b_including = None
    b_excluding = None
    if product_version:
        a_including = product_version
        b_including = product_version
    if 'versionStartExcluding' in cpe_match:
        a_excluding = cpe_match['versionStartExcluding']
    if 'versionStartIncluding' in cpe_match:
        a_including = cpe_match['versionStartIncluding']
    if 'versionEndIncluding' in cpe_match:
        b_including = cpe_match['versionEndIncluding']
    if 'versionEndExcluding' in cpe_match:
        b_excluding = cpe_match['versionEndExcluding']
    return [normalize_version(_) for _ in (
        a_excluding, a_including, b_including, b_excluding)]


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('dataset_name', nargs='?')
    p.add_argument('--source_folder', default=DATASET_FOLDER)
    p.add_argument('--from-scratch', action='store_true')
    p.add_argument('--quietly', action='store_true')
    a = p.parse_args()
    nvd_database = get_nvd_database()
    run(
        nvd_database, a.source_folder, a.dataset_name, a.from_scratch,
        a.quietly)
    print('document_count =', nvd_database.count_documents({}))
