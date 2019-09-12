from asset_tracker.models import Asset, Task, TaskStatus
from collections import defaultdict
from pyramid.view import view_config

from .macros.calculator import get_percent
from .routines import (
    get_risks,
    get_similar_product_names,
    get_similar_product_versions,
    get_similar_vendor_names,
    load_cve)
from .settings import (
    MAXIMUM_COUNT,
    MINIMUM_SIMILARITY)


CVE = load_cve()


@view_config(
    route_name='vendor_names.json',
    renderer='json',
    request_method='GET')
def get_vendor_names_json(request):
    params = request.params
    asset_type_id = params.get('typeId', 'X')
    vendor_name = params.get('vendorName', '').strip()
    if not vendor_name:
        return []
    component_type = '*' if asset_type_id[0] == 'X' else 'h'
    return get_similar_vendor_names(
        CVE, component_type, vendor_name, MINIMUM_SIMILARITY,
        MAXIMUM_COUNT)


@view_config(
    route_name='product_names.json',
    renderer='json',
    request_method='GET')
def get_product_names_json(request):
    params = request.params
    asset_type_id = params.get('typeId', 'X')
    vendor_name = params.get('vendorName', '').strip()
    product_name = params.get('productName', '').strip()
    component_type = '*' if asset_type_id[0] == 'X' else 'h'
    return get_similar_product_names(
        CVE, component_type, vendor_name, product_name,
        MINIMUM_SIMILARITY, MAXIMUM_COUNT)


@view_config(
    route_name='product_versions.json',
    renderer='json',
    request_method='GET')
def get_product_versions_json(request):
    params = request.params
    asset_type_id = params.get('typeId', 'X')
    vendor_name = params.get('vendorName', '').strip()
    product_name = params.get('productName', '').strip()
    product_version = params.get('productVersion', '').strip()
    component_type = '*' if asset_type_id[0] == 'X' else 'h'
    return get_similar_product_versions(
        CVE, component_type, vendor_name, product_name,
        product_version, MINIMUM_SIMILARITY, MAXIMUM_COUNT)


@view_config(
    route_name='risks.json',
    renderer='json',
    request_method='GET')
def get_risks_json(request):
    asset_ids = Asset.get_readable_ids(request)
    risks = get_risks(asset_ids)
    return risks


@view_config(
    route_name='risk_metrics.json',
    renderer='json',
    request_method='GET')
# !!! cache these metrics using dogpile cache
def get_risk_metrics_json(request):
    asset_ids = Asset.get_readable_ids(request)
    asset_count = len(asset_ids)
    if not asset_count:
        return {}

    risks = get_risks(asset_ids)
    reference_uris = [_['vulnerabilityUri'] for _ in risks]

    db = request.db
    tasks = db.query(Task).filter(
        Task.status == TaskStatus.done,
        Task.reference_uri.in_(reference_uris),
    ).all()
    closed_uris = [_.reference_uri for _ in tasks]

    open_risks = []
    for risk in risks:
        uri = risk['vulnerabilityUri']
        if uri in closed_uris:
            continue
        open_risks.append(risk)

    asset_ids = set()
    for risk in open_risks:
        asset_ids.add(risk['assetId'])
    impacted_asset_count = len(asset_ids)

    risks_by_uri = defaultdict(list)
    for risk in open_risks:
        uri = risk['vulnerabilityUri']
        risks_by_uri[uri].append(risk)
    greatest_threat_score = 0
    greatest_threat_description = None
    for uri, uri_risks in risks_by_uri.items():
        threat_score = sum(_['threatScore'] for _ in uri_risks)
        if threat_score > greatest_threat_score:
            greatest_threat_score = threat_score
            greatest_threat_description = uri_risks[0]['threatDescription']

    aggregated_threat_score = sum(_['threatScore'] for _ in risks)
    downstream_meter_count = sum(_['meterCount'] for _ in risks)
    meter_count = db.query(Asset.id).filter(
        Asset.type_id.startswith('m'),
        Asset.id.in_(asset_ids),
    ).count()

    return {
        'impacted_asset_count': impacted_asset_count,
        'impacted_asset_percent': get_percent(
            impacted_asset_count, asset_count),
        'cyber_vulnerability_count': len(open_risks),
        'greatest_threat_description': greatest_threat_description,
        'aggregated_threat_score': aggregated_threat_score,
        'downstream_meter_count': downstream_meter_count,
        'downstream_meter_percent': get_percent(
            downstream_meter_count, meter_count),
    }
