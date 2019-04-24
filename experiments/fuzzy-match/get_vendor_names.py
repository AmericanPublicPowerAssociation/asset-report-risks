from argparse import ArgumentParser
from fuzzywuzzy.process import extract as select_fuzzy_matches

from asset_vulnerability_report.routines import (
    define_limit_score, load_cve)


def query_vendor_names(
        cve,
        component_type,
        vendor_name,
        minimum_score,
        maximum_count):
    limit_score = define_limit_score(minimum_score)
    vendor_names = cve[component_type].keys()
    vendor_packs = select_fuzzy_matches(
        vendor_name, vendor_names, limit=maximum_count)
    selected_vendor_packs = filter(limit_score, vendor_packs)
    return [_[0] for _ in selected_vendor_packs]


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='schneider')
    p.add_argument('--minimum_score', default=80, type=int)
    p.add_argument('--maximum_count', default=10, type=int)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    # !!! If vendor_name is blank, return most frequently used vendors
    matched_vendor_names = query_vendor_names(
        cve, a.component_type, a.vendor_name, a.minimum_score, a.maximum_count)
    for vendor_name in matched_vendor_names:
        print(vendor_name)
