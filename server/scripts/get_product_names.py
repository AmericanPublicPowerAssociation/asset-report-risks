from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_similar_product_names,
    load_cve)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='SEL 3620')
    p.add_argument('--minimum_similarity', default=80, type=int)
    p.add_argument('--maximum_count', default=10, type=int)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    selected_product_names = get_similar_product_names(
        cve, a.component_type, a.vendor_name, a.product_name,
        a.minimum_similarity, a.maximum_count)
    # !!! If product name is blank, return product names for vendor
    # ranked by most frequently used
    for product_name in selected_product_names:
        print(product_name)
