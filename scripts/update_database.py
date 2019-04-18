import json
from argparse import ArgumentParser
from glob import glob
from os.path import join
from pymongo import ASCENDING

from asset_vulnerability_report.routines import get_nvd_database
from asset_vulnerability_report.settings import FOLDER


DATASET_FOLDER = join(FOLDER, 'datasets')


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--source_folder', default=DATASET_FOLDER)
    p.add_argument('--refresh', action='store_true')
    a = p.parse_args()

    nvd_database = get_nvd_database()
    if a.refresh:
        nvd_database.drop()
    nvd_database.create_index([
        ('cve.CVE_data_meta.ID', ASCENDING),
    ], unique=True)

    source_paths = glob(join(a.source_folder, '*.json'))
    for path in sorted(source_paths):
        with open(path) as f:
            j = json.load(f)
            cve_items = j['CVE_Items']
            print(path, len(cve_items))
            nvd_database.insert_many(cve_items)
    print('document_count =', nvd_database.count_documents({}))
