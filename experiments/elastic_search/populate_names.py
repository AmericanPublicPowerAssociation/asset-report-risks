from pymongo import MongoClient

import json
import requests


def main():
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

    headers = {
        'Content-Type': 'application/json',
    }
    for vuln in data:
        for i, vendor in enumerate(vuln['cve']['affects']['vendor']['vendor_data']):
            requests.put(
                'http://localhost:9200/nvd/vendor/%s' % i,
                data=json.dumps({'name': vendor['vendor_name']}),
                headers=headers,
            )
            for j, product in enumerate(vendor['product']['product_data']):
                requests.put(
                    'http://localhost:9200/nvd/product/%s%s' % (i, j),
                    data=json.dumps({'name': product['product_name']}),
                    headers=headers,
                )


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
    main()
