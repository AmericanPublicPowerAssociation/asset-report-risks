from collections import defaultdict

from asset_report_risks.macros.iterable import get_dictionary
from asset_report_risks.routines import (
    get_nvd_client,
    save_cve)


def prepare_cve(results):
    d = defaultdict(lambda: defaultdict(lambda: defaultdict(
        lambda: defaultdict(set))))
    for r in results:
        cve_id = r['id']
        for (
            component_type,
            vendor_name,
            product_name,
            product_version_pack,
        ) in r['packs']:
            d[component_type][vendor_name][product_name][
                tuple(product_version_pack)].add(cve_id)
    return get_dictionary(d)


if __name__ == '__main__':
    nvd_client = get_nvd_client()
    nvd_results = nvd_client.find({}, {
        '_id': 0,
        'id': 1,
        'packs': 1,
    })
    cve = prepare_cve(nvd_results)
    save_cve(cve)
