'''
python download_nvd.py --from-scratch  # Download all years from scratch
python download_nvd.py                 # Download all years
python download_nvd.py 2019            # Download 2019 only
python download_nvd.py modified        # Download modified
python download_nvd.py recent          # Download recent
'''
import os
import requests
from argparse import ArgumentParser
from collections import namedtuple
from glob import glob
from invisibleroads_macros.disk import (
    TemporaryStorage,
    make_folder,
    move_path,
    uncompress)
from os.path import basename, exists, getsize, join, splitext

from asset_vulnerability_report.settings import DATASET_FOLDER


URL_TEMPLATE = 'https://nvd.nist.gov/feeds/json/cve/1.0/nvdcve-1.0-{}'
BASE_YEAR = 2002
NVDPack = namedtuple('NVDContent', ('url', 'path', 'content'))


def run(target_folder, dataset_name, from_scratch, quietly):
    if not dataset_name:
        if from_scratch:
            for file_path in glob(join(target_folder, '*.meta')):
                os.remove(file_path)
            for file_path in glob(join(target_folder, '*.json')):
                os.remove(file_path)
        year = BASE_YEAR
        while download_nvd(target_folder, year, from_scratch, quietly):
            year += 1
        return
    if dataset_name.isdigit():
        dataset_name = int(dataset_name)
    elif dataset_name not in ('recent', 'modified'):
        print(
            'Please specify a valid dataset name (recent, modified or a '
            'specific year e.g. 2019) or omit it to download all years.')
    download_nvd(target_folder, dataset_name, from_scratch, quietly)


def download_nvd(
        target_folder, dataset_name, from_scratch=False, quietly=False):
    try:
        meta = load_nvd_url(target_folder, dataset_name, '.meta')
    except StopIteration:
        return
    if not from_scratch and exists(meta.path):
        with open(meta.path, 'rb') as f:
            if f.read() == meta.content:
                print(meta.path)
                return meta.path
    with open(meta.path, 'wb') as f:
        f.write(meta.content)
    archive = load_nvd_url(target_folder, dataset_name, '.json.zip')
    with open(archive.path, 'wb') as f:
        f.write(archive.content)
    file_name = splitext(basename(archive.path))[0]
    file_path = join(target_folder, file_name)
    with TemporaryStorage() as storage:
        uncompress(archive.path, storage.folder)
        move_path(file_path, join(storage.folder, file_name))
    if not quietly:
        print(file_path, getsize(file_path))
    return file_path


def load_nvd_url(target_folder, dataset_name, extension):
    url = URL_TEMPLATE.format(str(dataset_name) + extension)
    path = join(make_folder(target_folder), basename(url))
    response = requests.get(url)
    if response.status_code != 200:
        raise StopIteration
    return NVDPack(url, path, response.content)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('dataset_name', nargs='?')
    p.add_argument('--target-folder', default=DATASET_FOLDER)
    p.add_argument('--from-scratch', action='store_true')
    p.add_argument('--quietly', action='store_true')
    a = p.parse_args()
    run(a.target_folder, a.dataset_name, a.from_scratch, a.quietly)
