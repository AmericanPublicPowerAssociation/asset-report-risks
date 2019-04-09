from argparse import ArgumentParser
from fuzzywuzzy.process import extract as select_fuzzy_matches

from get_vendor_names import query_vendor_names
from routines import define_limit_score, get_nvd_database


def query_product_names(
        nvd_database,
        vendor_name,
        product_name,
        minimum_score,
        maximum_count):
    limit_score = define_limit_score(minimum_score)
    product_names = nvd_database.distinct(
        'cve.affects.vendor.vendor_data.product.product_data.product_name',
        {'cve.affects.vendor.vendor_data.vendor_name': vendor_name})
    product_packs = select_fuzzy_matches(
        product_name, product_names, limit=maximum_count)
    selected_product_packs = filter(limit_score, product_packs)
    return [_[0] for _ in selected_product_packs]


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--product_name', default='SEL 3620')
    p.add_argument('--minimum_score', default=80)
    p.add_argument('--maximum_count', default=10)
    a = p.parse_args()
    nvd_database = get_nvd_database()

    try:
        vendor_name = query_vendor_names(
            nvd_database, a.vendor_name, a.minimum_score, 1)[0]
    except IndexError:
        exit('[]')

    for product_name in query_product_names(
            nvd_database,
            vendor_name,
            a.product_name,
            a.minimum_score,
            a.maximum_count):
        print(product_name)
