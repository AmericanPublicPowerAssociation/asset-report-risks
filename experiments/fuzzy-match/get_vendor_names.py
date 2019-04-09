from argparse import ArgumentParser
from fuzzywuzzy.process import extract as select_fuzzy_matches

from routines import define_limit_score, get_nvd_database


def query_vendor_names(
        nvd_database,
        vendor_name,
        minimum_score,
        maximum_count):
    limit_score = define_limit_score(minimum_score)
    vendor_names = nvd_database.distinct(
        'cve.affects.vendor.vendor_data.vendor_name')
    vendor_packs = select_fuzzy_matches(
        vendor_name, vendor_names, limit=maximum_count)
    selected_vendor_packs = filter(limit_score, vendor_packs)
    return [_[0] for _ in selected_vendor_packs]


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--vendor_name', default='selnc')
    p.add_argument('--minimum_score', default=80)
    p.add_argument('--maximum_count', default=10)
    a = p.parse_args()
    nvd_database = get_nvd_database()

    for vendor_name in query_vendor_names(
            nvd_database,
            a.vendor_name,
            a.minimum_score,
            a.maximum_count):
        print(vendor_name)

    # return top ten matches
    # !!! db.inventory.distinct('item.sku', {dept: 'A'})

    '''
    {'bard': 'train', 'dog': 'man'}
    [('train', 22, 'bard'), ('man', 0, 'dog')]
    '''
