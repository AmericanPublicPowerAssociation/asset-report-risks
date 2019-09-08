from argparse import ArgumentParser

from asset_report_risks.routines import (
    get_matching_nvd_ids,
    get_nvd_client,
    load_cve,
    yield_nvd_pack)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--component_type', default='h')
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='sel')
    p.add_argument('--product_version', default='')
    p.add_argument('--minimum_similarity', default=80, type=int)
    a = p.parse_args()
    print(a)
    cve = load_cve()
    nvd_client = get_nvd_client()
    nvd_ids = get_matching_nvd_ids(
        cve,
        a.component_type,
        a.vendor_name,
        a.product_name,
        a.product_version,
        a.minimum_similarity)
    for nvd_pack in yield_nvd_pack(nvd_client, nvd_ids):
        print(nvd_pack)
