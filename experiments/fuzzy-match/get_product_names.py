from argparse import ArgumentParser
from fuzzywuzzy.process import extract as select_fuzzy_matches
from invisibleroads_macros.iterable import flatten_lists

from get_vendor_names import query_vendor_names
from asset_vulnerability_report.routines import (
    define_limit_score, load_cve)


def query_product_names(
        cve,
        component_type,
        vendor_name,
        product_name,
        minimum_score,
        maximum_count):
    limit_score = define_limit_score(minimum_score)
    product_names = cve[component_type][vendor_name].keys()
    product_packs = select_fuzzy_matches(
        product_name, product_names, limit=maximum_count)
    selected_product_packs = filter(limit_score, product_packs)
    return [_[0] for _ in selected_product_packs]


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='SEL 3620')
    p.add_argument('--minimum_score', default=80)
    p.add_argument('--maximum_count', default=10)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    matched_vendor_names = query_vendor_names(
        cve, a.component_type, a.vendor_name,
        a.minimum_score, a.maximum_count)
    # !!! If product name is blank, return all product names for vendor
    # ranked by most frequently used
    matched_product_names = flatten_lists(query_product_names(
        cve, a.component_type, vendor_name, a.product_name,
        a.minimum_score, a.maximum_count,
    ) for vendor_name in matched_vendor_names)
    for product_name in matched_product_names:
        print(product_name)
