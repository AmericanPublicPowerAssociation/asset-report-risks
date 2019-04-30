import json
from argparse import ArgumentParser
from datetime import datetime
from glob import glob
from itertools import chain
from os.path import join
from pymongo import ASCENDING

from asset_vulnerability_report.routines import (
    get_nvd_database, normalize_version)
from asset_vulnerability_report.settings import DATASET_FOLDER


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
    p.add_argument('--source_folder', default=DATASET_FOLDER)
    p.add_argument('--refresh', action='store_true')
    a = p.parse_args()
    print(a)

    nvd_database = get_nvd_database()
    if a.refresh:
        nvd_database.drop()
    nvd_database.create_index([
        ('id', ASCENDING),
    ], unique=True)

    source_paths = glob(join(a.source_folder, '*.json'))
    for path in sorted(source_paths):
        with open(path) as f:
            j = json.load(f)
            parsed_items = [extract_cve(_) for _ in j['CVE_Items']]
            nvd_database.insert_many(parsed_items)
            print(path, len(parsed_items))
    print('document_count =', nvd_database.count_documents({}))
