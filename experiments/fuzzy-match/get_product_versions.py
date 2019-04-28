from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_matching_component_types,
    get_matching_product_names,
    get_matching_vendor_names,
    get_product_versions,
    load_cve,
    select_matches)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='SEL 3620')
    p.add_argument('--product_version', default='')
    p.add_argument('--minimum_score', default=80)
    p.add_argument('--maximum_count', default=10)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    product_versions = set()
    matching_component_types = get_matching_component_types(
        cve, a.component_type)
    for component_type in matching_component_types:
        matching_vendor_names = get_matching_vendor_names(
            cve, component_type, a.vendor_name, a.minimum_score,
            a.maximum_count)
        for vendor_name in matching_vendor_names:
            matching_product_names = get_matching_product_names(
                cve, component_type, vendor_name, a.product_name,
                a.minimum_score, a.maximum_count)
            for product_name in matching_product_names:
                product_versions.update(get_product_versions(
                    cve, component_type, vendor_name, product_name))
    if a.component_type == 'h':
        component_type = 'o'
        matching_vendor_names = get_matching_vendor_names(
            cve, component_type, a.vendor_name, a.minimum_score,
            a.maximum_count)
        for vendor_name in matching_vendor_names:
            matching_product_names = get_matching_product_names(
                cve, component_type, vendor_name, a.product_name,
                a.minimum_score, a.maximum_count)
            for product_name in matching_product_names:
                product_versions.update(get_product_versions(
                    cve, component_type, vendor_name, product_name))
    # !!! If product version is blank, return all versions for product
    # ranked by most frequently used
    product_version = a.product_version.strip()
    selected_product_versions = select_matches(
        a.product_version, product_versions, a.minimum_score,
        a.maximum_count) if product_version else sorted(product_versions)
    for product_version in selected_product_versions:
        print(product_version)
