'''
python download_datasets.py --from-scratch  # Download all years from scratch
python download_datasets.py                 # Download all years
python download_datasets.py 2019            # Download 2019 only
python download_datasets.py modified        # Download modified
python download_datasets.py recent          # Download recent
'''
import requests
from argparse import ArgumentParser
from collections import namedtuple
from invisibleroads_macros.disk import (
    TemporaryStorage,
    make_folder,
    move_path,
    remove_safely,
    uncompress)
from os.path import basename, exists, getsize, join, splitext

from asset_vulnerability_report.settings import DATASET_FOLDER


URL_TEMPLATE = 'https://nvd.nist.gov/feeds/json/cve/1.0/nvdcve-1.0-{}'
BASE_YEAR = 2002
NVDPack = namedtuple('NVDContent', ('url', 'path', 'content'))


def download_nvd(dataset_name, from_scratch=False, quietly=False):
    try:
        meta = load_nvd_url(dataset_name, '.meta')
    except StopIteration:
        return
    if not from_scratch and exists(meta.path):
        with open(meta.path, 'rb') as f:
            if f.read() == meta.content:
                print(meta.path)
                return meta.path
    with open(meta.path, 'wb') as f:
        f.write(meta.content)
    archive = load_nvd_url(dataset_name, '.json.zip')
    with open(archive.path, 'wb') as f:
        f.write(archive.content)
    file_name = splitext(basename(archive.path))[0]
    file_path = join(DATASET_FOLDER, file_name)
    with TemporaryStorage() as storage:
        uncompress(archive.path, storage.folder)
        move_path(file_path, join(storage.folder, file_name))
    if not quietly:
        print(file_path, getsize(file_path))
    return file_path


def load_nvd_url(dataset_name, extension):
    url = URL_TEMPLATE.format(str(dataset_name) + extension)
    path = join(make_folder(DATASET_FOLDER), basename(url))
    response = requests.get(url)
    if response.status_code != 200:
        raise StopIteration
    return NVDPack(url, path, response.content)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('dataset_name', nargs='?')
    p.add_argument('--from-scratch', action='store_true')
    p.add_argument('--quietly', action='store_true')
    a = p.parse_args()
    dataset_name = a.dataset_name
    if not dataset_name:
        if a.from_scratch:
            remove_safely(DATASET_FOLDER)
        year = BASE_YEAR
        while download_nvd(year, a.from_scratch, a.quietly):
            year += 1
    elif dataset_name in ('recent', 'modified'):
        download_nvd(dataset_name, a.from_scratch, a.quietly)
    elif dataset_name.isdigit():
        download_nvd(int(dataset_name), a.from_scratch, a.quietly)
    else:
        print(
            'Please specify a valid dataset name (recent, modified or a '
            'specific year e.g. 2019) or omit it to download all years.')
