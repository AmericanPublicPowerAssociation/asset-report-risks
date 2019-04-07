from argparse import ArgumentParser
from fuzzywuzzy import process
from pymongo import MongoClient


def fuzzy_match(key, choices, limit=5):
    return process.extract(key, choices, limit=limit)


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
            'cve.affects.vendor.vendor_data'
            '.product.product_data.product_name': 1,
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
    if 'vendor' in kwargs:
        vendor = kwargs['vendor']
        matched_words = fuzzy_match(vendor, vendor_names)
        match['vendor'] = matched_words

    if 'product' in kwargs:
        product = kwargs['product']
        matched_words = fuzzy_match(product, product_names)
        match['product'] = matched_words
    return match


def get_mongo_connection():
    URL = 'mongodb://localhost:27017/Vulnerabilities'
    MONGO_DICT = dict(
        database='Vulnerabilities',
        collection='NVD',
        document='CVE_Items')
    client = MongoClient(URL)
    database = client[MONGO_DICT['database']]
    collection = database[MONGO_DICT['collection']]
    return collection[MONGO_DICT['document']]


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--vendor', default='selnc')
    parser.add_argument('--product', default='cvs')
    args = parser.parse_args()
    match = main(vendor=args.vendor, product=args.product)
    print(match)
