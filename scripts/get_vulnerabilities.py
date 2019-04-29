from argparse import ArgumentParser
from packaging.version import parse as parse_version

from asset_vulnerability_report.routines import (
    get_matching_component_types,
    get_matching_product_names,
    get_matching_vendor_names,
    load_cve)


def get_nvd_ids(
        cve,
        approximate_component_type,
        approximate_vendor_name,
        approximate_product_name,
        approximate_product_version,
        minimum_similarity):
    nvd_ids = set()

    approximate_vendor_name = approximate_vendor_name.strip()
    if not approximate_vendor_name:
        return nvd_ids
    matching_component_types = get_matching_component_types(
        cve, approximate_component_type)

    approximate_product_name = approximate_product_name.strip()
    if not approximate_product_name:

        def update_nvd_ids(component_type):
            for vendor_name in get_matching_vendor_names(
                    cve, component_type, approximate_vendor_name,
                    minimum_similarity):
                for product_name in cve[component_type][vendor_name]:
                    for nvd_id in cve[component_type][vendor_name][
                            product_name].values():
                        nvd_ids.update(nvd_id)

        for component_type in matching_component_types:
            update_nvd_ids(component_type)
        if component_type == 'h':
            update_nvd_ids('o')
        return nvd_ids

    approximate_product_version = approximate_product_version.strip()
    if not approximate_product_version:

        def update_nvd_ids(component_type):
            for vendor_name in get_matching_vendor_names(
                    cve, component_type, approximate_vendor_name,
                    minimum_similarity):
                for product_name in get_matching_product_names(
                        cve, component_type, vendor_name,
                        approximate_product_name, minimum_similarity):
                    for nvd_id in cve[component_type][vendor_name][
                            product_name].values():
                        nvd_ids.update(nvd_id)

        for component_type in matching_component_types:
            update_nvd_ids(component_type)
        if component_type == 'h':
            update_nvd_ids('o')
        return nvd_ids

    product_version = parse_version(approximate_product_version)

    def update_nvd_ids(component_type):
        for vendor_name in get_matching_vendor_names(
                cve, component_type, approximate_vendor_name,
                minimum_similarity):
            for product_name in get_matching_product_names(
                    cve, component_type, vendor_name, approximate_product_name,
                    minimum_similarity):
                for version_pack, nvd_id in cve[component_type][vendor_name][
                        product_name].items():
                    [
                        greater_than_version,
                        greater_than_or_equal_to_version,
                        less_than_or_equal_to_version,
                        less_than_version,
                    ] = [
                        parse_version(_) for _ in version_pack
                    ]
                    if product_version <= greater_than_version:
                        continue
                    if product_version < greater_than_or_equal_to_version:
                        continue
                    if product_version > less_than_or_equal_to_version:
                        continue
                    if product_version >= less_than_version:
                        continue
                    nvd_ids.add(nvd_id)

    for component_type in matching_component_types:
        update_nvd_ids(component_type)
    if component_type == 'h':
        update_nvd_ids('o')
    return nvd_ids


def get_nvd_attributes(nvd_ids):
    pass


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='sel')
    p.add_argument('--product_version', default='')
    p.add_argument('--minimum_similarity', default=80)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    nvd_ids = get_nvd_ids(
        cve,
        a.component_type,
        a.vendor_name,
        a.product_name,
        a.product_version,
        a.minimum_similarity)
    for nvd_id in nvd_ids:
        print(nvd_id)
