from collections import defaultdict
from itertools import chain

from asset_vulnerability_report.macros import get_dictionary
from asset_vulnerability_report.routines import (
    get_nvd_database,
    save_cve)


def prepare_cve(results):
    d = defaultdict(lambda: defaultdict(lambda: defaultdict(
        lambda: defaultdict(set))))
    for cve_id, cpe_match in yield_cpe_pack(results):
        cpe_pack = cpe_match['cpe23Uri'].split(':')[2:6]
        component_type = cpe_pack[0]
        vendor_name = cpe_pack[1]
        product_name = cpe_pack[2]
        product_version = cpe_pack[3]
        product_version_pack = get_product_version_pack(
            cpe_match, product_version)
        d[component_type][vendor_name][product_name][
            product_version_pack].add(cve_id)
    return get_dictionary(d)


def yield_cpe_pack(results):
    for r in results:
        cve_id = r['cve']['CVE_data_meta']['ID']
        for node in r['configurations']['nodes']:
            for cpe_match in extract_cpe_matches(node):
                yield cve_id, cpe_match


def extract_cpe_matches(node):
    if 'cpe_match' in node:
        return node['cpe_match']
    if 'children' in node:
        return chain(*[extract_cpe_matches(_) for _ in node['children']])
    return []


def get_product_version_pack(cpe_match, product_version):
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
    return a_excluding, a_including, b_including, b_excluding


if __name__ == '__main__':
    nvd_database = get_nvd_database()
    nvd_results = nvd_database.find({}, {
        'cve.CVE_data_meta.ID': 1,
        'configurations': 1,
        '_id': 0,
    })
    cve = prepare_cve(nvd_results)
    save_cve(cve)
