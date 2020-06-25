from asset_tracker.models import (
    Asset,
    # Task,
    # TaskStatus,
)
from pyramid.view import view_config

from .routines import (
    get_cve,
    get_risks,
    get_similar_product_names,
    get_similar_product_versions,
    get_similar_vendor_names)
from .settings import (
    MAXIMUM_COUNT,
    MINIMUM_SIMILARITY)


@view_config(
    route_name='vendor_names.json',
    renderer='json',
    request_method='GET')
def see_vendor_names_json(request):
    params = request.params
    asset_type_code = params.get('typeCode', 'X')
    vendor_name = params.get('vendorName', '').strip()
    if not vendor_name:
        return []
    cve = get_cve()
    component_type = '*' if asset_type_code[0] == 'X' else 'h'
    return get_similar_vendor_names(
        cve, component_type, vendor_name, MINIMUM_SIMILARITY,
        MAXIMUM_COUNT)


@view_config(
    route_name='product_names.json',
    renderer='json',
    request_method='GET')
def see_product_names_json(request):
    params = request.params
    asset_type_code = params.get('typeCode', 'X')
    vendor_name = params.get('vendorName', '').strip()
    product_name = params.get('productName', '').strip()
    component_type = '*' if asset_type_code[0] == 'X' else 'h'
    cve = get_cve()
    return get_similar_product_names(
        cve, component_type, vendor_name, product_name,
        MINIMUM_SIMILARITY, MAXIMUM_COUNT)


@view_config(
    route_name='product_versions.json',
    renderer='json',
    request_method='GET')
def see_product_versions_json(request):
    params = request.params
    asset_type_code = params.get('typeCode', 'X')
    vendor_name = params.get('vendorName', '').strip()
    product_name = params.get('productName', '').strip()
    product_version = params.get('productVersion', '').strip()
    component_type = '*' if asset_type_code[0] == 'X' else 'h'
    cve = get_cve()
    return get_similar_product_versions(
        cve, component_type, vendor_name, product_name,
        product_version, MINIMUM_SIMILARITY, MAXIMUM_COUNT)


@view_config(
    route_name='risks.json',
    renderer='json',
    request_method='GET')
def see_risks_json(request):
    db = request.db
    asset_ids = Asset.get_viewable_ids(request)
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
            'meterIds': meter_ids,
            'threatScore': r['threatScore'],
            'threatDescription': r['threatDescription'],
            'vulnerabilityUri': reference_uri,
            'vulnerabilityUrl': r['vulnerabilityUrl'],
            'vulnerabilityDate': r['vulnerabilityDate'],
            'lineGeoJson': r['lineGeoJson'],
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
    return ds
