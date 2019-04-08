from argparse import ArgumentParser

import json
import requests


def search_type(type_name, query):
    headers = {
        'Content-Type': 'application/json',
    }
    url = 'http://localhost:9200/nvd/%s/_search' % type_name
    data = {
        'query': {
            'query_string': {
                'query': query,
                'fields': ['name'],
            }
        }
    }
    response = requests.post(
        url,
        data = json.dumps(data),
        headers=headers,
    )
    if response.status_code == 200:
        return json.loads(response.content)
    else:
        return []


def main(vendor=None, product=None):
    match = {
        'vendor': [],
        'product': [],
    }
    if vendor is not None:
        match['vendor'] = search_type('vendor', vendor)

    if product is not None:
        match['product'] = search_type('product', product)
    return match


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--vendor', default='selnc')
    parser.add_argument('--product', default='cvs')
    args = parser.parse_args()
    match = main(vendor=args.vendor, product=args.product)
    print(match)
