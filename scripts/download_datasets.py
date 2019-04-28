import requests
from argparse import ArgumentParser
from collections import namedtuple
from invisibleroads_macros.disk import (
    make_folder,
    make_unique_folder,
    move_path,
    uncompress)
from os.path import basename, exists, join, splitext

from asset_vulnerability_report.settings import DATASET_FOLDER


URL_TEMPLATE = (
    'https://nvd.nist.gov/feeds/json/cve/1.0/nvdcve-1.0-{year}{extension}')
BASE_YEAR = 2002
NVDPack = namedtuple('NVDContent', ('url', 'path', 'content'))


def load_nvd_url(year, extension):
    url = URL_TEMPLATE.format(year=year, extension=extension)
    path = join(make_folder(DATASET_FOLDER), basename(url))
    response = requests.get(url)
    if response.status_code != 200:
        raise StopIteration
    return NVDPack(url, path, response.content)


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--refresh', action='store_true')
    a = p.parse_args()
    year_index = 0
    temporary_folder = make_unique_folder()
    while True:
        year = BASE_YEAR + year_index
        try:
            meta = load_nvd_url(year, '.meta')
        except StopIteration:
            break
        if not a.refresh and exists(meta.path):
            with open(meta.path, 'rb') as f:
                if f.read() == meta.content:
                    continue
        with open(meta.path, 'wb') as f:
            f.write(meta.content)
        archive = load_nvd_url(year, '.json.zip')
        with open(archive.path, 'wb') as f:
            f.write(archive.content)
        uncompress(archive.path, temporary_folder)
        dataset_name = splitext(basename(archive.path))[0]
        dataset_path = join(DATASET_FOLDER, dataset_name)
        move_path(
            dataset_path,
            join(temporary_folder, dataset_name))
        print(dataset_path)
        year_index += 1
