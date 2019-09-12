from argparse import ArgumentParser
from asset_report_risks.routines import (
    get_matching_nvd_ids,
    get_nvd_database,
    get_risks_client,
    load_cve,
    yield_nvd_pack)
from asset_report_risks.settings import (
    MINIMUM_SIMILARITY)
from asset_tracker.models import Asset
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

    risks = []
    with bootstrap(a.configuration_path) as env, env['request'].tm:
        db = env['request'].db
        for asset in db.query(Asset).all():
            asset_type_id = asset.type_id
            component_type = '*' if asset_type_id[0] == 'X' else 'h'
            asset_attributes = asset.attributes or {}
            vendor_name = asset_attributes.get('vendorName') or ''
            product_name = asset_attributes.get('productName') or ''
            product_version = asset_attributes.get('productVersion') or ''
            nvd_ids = get_matching_nvd_ids(
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
                    'url': join('nvd.nist.gov/vuln/detail', nvd_id),
                    'date': nvd_date,
                })
            if not vulnerabilities:
                continue
            risks.append({
                'assetId': asset.id,
                'assetName': asset.name,
                'meterCount': 0,
                'vulnerabilities': vulnerabilities,
            })

    if risks:
        risks_client = get_risks_client()
        risks_client.drop()
        risks_client.create_index(
            [('id', ASCENDING)], unique=True)
        risks_client.insert_many(risks)

    print(risks)
