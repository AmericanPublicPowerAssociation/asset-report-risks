from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    load_cve,
    query_product_names,
    query_vendor_names)


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
    vendor_names = query_vendor_names(
        cve,
        a.component_type,
        [a.vendor_name],
        a.minimum_score,
        a.maximum_count)
    # !!! If product name is blank, return all product names for vendor
    # ranked by most frequently used
    product_names = query_product_names(
        cve,
        a.component_type,
        vendor_names,
        [a.product_name],
        a.minimum_score,
        a.maximum_count)
    for product_name in product_names:
        print(product_name)
