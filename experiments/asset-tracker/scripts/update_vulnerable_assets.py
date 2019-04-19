def get_vulnerabilities(asset, mongo_cursor):
    vulnerabilities = query_nvd(mongo_cursor, asset.name)
    return [{
            'asset_id': asset.id,
            'id': v['id'],
            'description': v['description'],
            'date_published': v['date_published'],
            'score': v['score']} for v in vulnerabilities]


def query_nvd(cursor, product_name=None, vendor_name=None, version_value=None):
    product_query, vendor_query, version_query = {}, {}, {}
    results = []
    for x in cursor.find(
            {'$and': [product_query, vendor_query, version_query]}):
        r = {
            'description':
                x['cve']['description']['description_data'][0]['value'],
            'id': x['cve']['CVE_data_meta']['ID'],
            'date_published': x['publishedDate'],
            'score': x[
                'impact'].get('baseMetricV2', {}).get(
                    'cvssV2', {}).get('baseScore', None)
        }
        results.append(r)
    return results


def get_assets(dbsession):
    for a in dbsession.query(Asset).outerjoin(VulnerableAsset).filter(
            VulnerableAsset.asset_id is None):
        yield a


def search_vulnerabilities(dbsession, mongo_cursor):
    assets = get_assets(dbsession)
    vulnerable_assets = filter(
        lambda a: a is not None, (
         get_vulnerabilities(a, mongo_cursor)
         for a in assets))
    for vulnerabilities in vulnerable_assets:
        for vulnerability in vulnerabilities:
            va = VulnerableAsset(
                id=vulnerability['id'],
                asset_id=vulnerability['asset_id'],
                description=vulnerability['description'],
                date_published=vulnerability['date_published'],
                score=vulnerability['score'])
            dbsession.add(va)
            dbsession.commit()
