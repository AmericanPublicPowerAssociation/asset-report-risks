from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_similar_vendor_names,
    load_cve)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='schneider')
    p.add_argument('--minimum_similarity', default=80, type=int)
    p.add_argument('--maximum_count', default=10, type=int)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    selected_vendor_names = get_similar_vendor_names(
        cve, a.component_type, a.vendor_name, a.minimum_similarity,
        a.maximum_count)
    # !!! If vendor_name is blank, return most frequently used vendors
    for vendor_name in selected_vendor_names:
        print(vendor_name)
