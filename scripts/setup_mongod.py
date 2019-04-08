import json
from argparse import ArgumentParser
from glob import glob
from os.path import expanduser, join
from pymongo import MongoClient


SOURCE_FOLDER = expanduser('~/Experiments/nvd')


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--source_folder', default=SOURCE_FOLDER)
    p.add_argument('--refresh', action='store_true')
    a = p.parse_args()

    client = MongoClient()
    vulnerability_database = client['vulnerability']
    nvd_collection = vulnerability_database['nvd']
    if a.refresh:
        nvd_collection.drop()
    source_paths = glob(join(a.source_folder, '*.json'))
    for path in sorted(source_paths):
        with open(path) as f:
            j = json.load(f)
            cve_items = j['CVE_Items']
            print(path, len(cve_items))
            nvd_collection.insert_many(cve_items)
    print(nvd_collection.count_documents({}))
