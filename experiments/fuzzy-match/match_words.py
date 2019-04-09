from argparse import ArgumentParser
from fuzzywuzzy import process
from packaging.version import parse as parse_version
from pymongo import MongoClient


def fuzzy_match(key, choices, limit=5):
    return process.extract(key, choices, limit=limit)


def is_vulnerable_version(vendor, product, inputted_version):
    match = {
        'vendor':  [],
        'product': []
    }
    if vendor is None and product is None:
        return match

    cursor = get_mongo_connection()
    # SELECT vendor_name, product_name FROM table;
    data = cursor.find(
        {
            '$and': [
                {
                    'cve.affects.vendor.vendor_data.product'
                    '.product_data.product_name':
                        product
                }, {
                    'cve.affects.vendor.vendor_data.vendor_name':
                        vendor
                }
            ]
        },
        {
            'cve.affects.vendor.vendor_data'
            '.product.product_data.version.version_data': 1,
            '_id': 0,
        }
    )

    parsed_input = parse_version(inputted_version)

    def match_versions(version_data):
        parsed_data = parse_version(version_data['version_value'])
        is_equal = parsed_input == parsed_data
        is_less_than = parsed_input < parsed_data
        operator = version_data['version_affected']
        if operator == '=':
            return is_equal
        elif operator == '<=':
            return is_equal or is_less_than
        elif operator == '>=':
            return is_equal or not is_less_than
        else:
            return False

    for vuln in data:
        for vendor in vuln['cve']['affects']['vendor']['vendor_data']:
            for product in vendor['product']['product_data']:
                for i, version in enumerate(
                        product['version']['version_data']):
                    if match_versions(version):
                        return True
    else:
        return False


def main(vendor=None, product=None):
    match = {
        'vendor':  [],
        'product': []
    }
    if vendor is None and product is None:
        return match

    cursor = get_mongo_connection()
    # SELECT vendor_name, product_name FROM table;
    data = cursor.find(
        {},
        {
            'cve.affects.vendor.vendor_data.vendor_name': 1,
            'cve.affects.vendor.vendor_data.product.product_data.product_name': 1,
            '_id': 0,
        }
    )

    vendor_names = set()
    product_names = set()
    for vuln in data:
        for vendor in vuln['cve']['affects']['vendor']['vendor_data']:
            vendor_names.add(vendor['vendor_name'])
            for product in vendor['product']['product_data']:
                product_names.add(product['product_name'])

    del data
    if vendor is not None:
        matched_words = fuzzy_match(vendor, vendor_names)
        match['vendor'] = matched_words

    if product is not None:
        matched_words = fuzzy_match(product, product_names)
        match['product'] = matched_words
    return match


def get_mongo_connection():
    URL = 'mongodb://localhost:27017/Vulnerabilities'
    MONGO_DICT = dict(
        database='vulnerability',
        collection='nvd')
    client = MongoClient(URL)
    database = client[MONGO_DICT['database']]
    return database[MONGO_DICT['collection']]


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--vendor', default='selnc')
    parser.add_argument('--product', default='cvs')
    args = parser.parse_args()
    match = main(vendor=args.vendor, product=args.product)
    # match = is_vulnerable_version('ge', 'multilink_firmware', '5.4.0')
    print(match)
