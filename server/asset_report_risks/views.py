from asset_tracker.models import (
    Asset,
    # Task,
    # TaskStatus,
)
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
    db = request.db
    asset_ids = Asset.get_readable_ids(request)
    asset_name_by_id = dict(db.query(Asset.id, Asset.name).filter(
        Asset.id.in_(asset_ids)))
    risks = get_risks(asset_ids)
    '''
    reference_uris = [_['vulnerabilityUri'] for _ in risks]

    tasks = db.query(Task).filter(
        Task.asset_id.in_(asset_ids),
        Task.reference_uri.in_(reference_uris))
    task_by_risk_pack = {(
        task.asset_id,
        task.reference_uri,
    ): task for task in tasks}
    '''

    ds = []
    for r in risks:
        asset_id = r['assetId']
        asset_name = asset_name_by_id[asset_id]
        meter_ids = r['meterIds']
        meter_count = len(meter_ids)
        reference_uri = r['vulnerabilityUri']
        '''
        risk_pack = asset_id, reference_uri
        task = task_by_risk_pack.get(risk_pack)
        '''
        d = {
            'assetId': asset_id,
            'assetName': asset_name,
            'meterCount': meter_count,
            'threatScore': r['threatScore'],
            'threatDescription': r['threatDescription'],
            'vulnerabilityUri': reference_uri,
            'vulnerabilityUrl': r['vulnerabilityUrl'],
            'vulnerabilityDate': r['vulnerabilityDate'],
        }
        '''
        if task:
            d.update({
                'taskId': task.id,
                'taskName': task.name,
                'taskStatus': task.status.value,
            })
        '''
        ds.append(d)
    valid_sort_keys = {
        'name': 'assetName',
        'meter-count': 'meterCount',
        'threat-score': 'threatScore',
        'published': 'vulnerabilityDate',
    }
    request_sort_key = request.GET.get('sort_key', '')
    reverse = request.GET.get('order', 'asc') == 'desc'
    sort_key = valid_sort_keys.get(request_sort_key, 'threatScore')
    return sorted(ds, key=lambda _: _[sort_key], reverse=reverse)


@view_config(
    route_name='risks_metrics.json',
    renderer='json',
    request_method='GET')
# !!! cache these metrics using dogpile cache
def see_risks_metrics_json(request):
    asset_ids = Asset.get_readable_ids(request)
    asset_count = len(asset_ids)
    if not asset_count:
        return {}

    risks = get_risks(asset_ids)
    # reference_uris = [_['vulnerabilityUri'] for _ in risks]

    db = request.db
    '''
    tasks = db.query(Task).filter(
        Task.status == TaskStatus.Done,
        Task.reference_uri.in_(reference_uris),
    ).all()
    closed_uris = [_.reference_uri for _ in tasks]
    '''
    closed_uris = []

    open_risks = []
    for risk in risks:
        uri = risk['vulnerabilityUri']
        if uri in closed_uris:
            continue
        open_risks.append(risk)

    impacted_asset_ids = set()
    for risk in open_risks:
        impacted_asset_ids.add(risk['assetId'])
    impacted_asset_count = len(impacted_asset_ids)

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

    downstream_meter_ids = set()
    for risk in risks:
        downstream_meter_ids.update(risk['meterIds'])
    downstream_meter_count = len(downstream_meter_ids)
    meter_count = db.query(Asset.id).filter(
        Asset.id.in_(asset_ids),
        Asset.type_id.startswith('m'),
    ).count()

    return {
        'riskCount': len(open_risks),
        'aggregatedThreatScore': aggregated_threat_score,
        'impactedAssetCount': impacted_asset_count,
        'impactedAssetPercent': get_percent(
            impacted_asset_count, asset_count),
        'greatestThreatDescription': greatest_threat_description,
        'downstreamMeterCount': downstream_meter_count,
        'downstreamMeterPercent': get_percent(
            downstream_meter_count, meter_count),
    }
