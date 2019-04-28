from argparse import ArgumentParser

from asset_vulnerability_report.routines import (
    get_vendor_names,
    load_cve,
    select_matches)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='schneider')
    p.add_argument('--minimum_score', default=80, type=int)
    p.add_argument('--maximum_count', default=10, type=int)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    component_types = cve.keys() if a.component_type == '*' else [
        a.component_type]

    vendor_names = set()
    for component_type in component_types:
        vendor_names.update(get_vendor_names(cve, component_type))

    # !!! If vendor_name is blank, return most frequently used vendors
    selected_vendor_names = select_matches([
        a.vendor_name], vendor_names, a.minimum_score, a.maximum_count)
    for vendor_name in selected_vendor_names:
        print(vendor_name)
