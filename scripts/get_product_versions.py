from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_similar_product_versions,
    load_cve)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='SEL 3620')
    p.add_argument('--product_version', default='')
    p.add_argument('--minimum_similarity', default=80)
    p.add_argument('--maximum_count', default=10)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    selected_product_versions = get_similar_product_versions(
        cve, a.component_type, a.vendor_name, a.product_name,
        a.product_version, a.minimum_similarity, a.maximum_count)
    # !!! If product version is blank, return all versions for product
    # ranked by most frequently used
    for product_version in selected_product_versions:
        print(product_version)
