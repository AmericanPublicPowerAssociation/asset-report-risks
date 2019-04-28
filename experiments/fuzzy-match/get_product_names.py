from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_matching_component_types,
    get_matching_vendor_names,
    get_product_names,
    load_cve,
    select_matches)


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
    product_names = set()
    matching_component_types = get_matching_component_types(
        cve, a.component_type)
    for component_type in matching_component_types:
        matching_vendor_names = get_matching_vendor_names(
            cve, component_type, a.vendor_name, a.minimum_score,
            a.maximum_count)
        for vendor_name in matching_vendor_names:
            product_names.update(get_product_names(
                cve, component_type, vendor_name))
    # !!! If product name is blank, return product names for vendor
    # ranked by most frequently used
    selected_product_names = select_matches(
        a.product_name, product_names, a.minimum_score, a.maximum_count)
    for product_name in selected_product_names:
        print(product_name)
