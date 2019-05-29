from argparse import ArgumentParser
from asset_tracker.models import Asset
from asset_vulnerability_report.routines import (
    get_nvd_database,
    get_nvd_ids,
    get_vulnerable_assets_database,
    load_cve,
    yield_nvd_pack)
from asset_vulnerability_report.settings import (
    MINIMUM_SIMILARITY)
from os.path import join
from pymongo import ASCENDING
from pyramid.paster import bootstrap, setup_logging


if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('configuration_path')
    p.add_argument('--minimum_similarity', default=80, type=int)
    a = p.parse_args()
    setup_logging(a.configuration_path)

    cve = load_cve()
    nvd_database = get_nvd_database()

    vulnerable_assets = []
    with bootstrap(a.configuration_path) as env, env['request'].tm:
        db = env['request'].db
        for asset in db.query(Asset).all():
            asset_type_id = asset.type_id
            component_type = '*' if asset_type_id[0] == 'X' else 'h'
            asset_attributes = asset.attributes or {}
            vendor_name = asset_attributes.get('vendorName', '')
            product_name = asset_attributes.get('productName', '')
            product_version = asset_attributes.get('productVersion', '')
            nvd_ids = get_nvd_ids(
                cve,
                component_type,
                vendor_name,
                product_name,
                product_version,
                MINIMUM_SIMILARITY)
            vulnerabilities = []
            for (
                nvd_id,
                nvd_texts,
                nvd_date,
                nvd_score,
            ) in yield_nvd_pack(nvd_database, nvd_ids):
                vulnerabilities.append({
                    'impact': nvd_score,
                    'texts': nvd_texts,
                    'url': join('https://nvd.nist.gov/vuln/detail', nvd_id),
                    'date': nvd_date,
                })
            if not vulnerabilities:
                continue
            vulnerable_assets.append({
                'id': asset.id,
                'name': asset.name,
                'meterCount': 0,
                'vulnerabilities': vulnerabilities,
            })

    if vulnerable_assets:
        vulnerable_assets_database = get_vulnerable_assets_database()
        vulnerable_assets_database.drop()
        vulnerable_assets_database.create_index(
            [('id', ASCENDING)], unique=True)
        vulnerable_assets_database.insert_many(vulnerable_assets)

    print(vulnerable_assets)
