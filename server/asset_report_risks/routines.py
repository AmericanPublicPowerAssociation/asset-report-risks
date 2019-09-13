import operator
import pickle
from fuzzywuzzy.process import extract as extract_matches
from os.path import exists
from packaging.version import parse as parse_version
from pymongo import MongoClient

from .settings import CVE_PATH, MONGO_HOST, MONGO_PORT


WILDCARD_VERSIONS = '*', '-', '.', '', None


def get_mongo_client():
    return MongoClient(MONGO_HOST, MONGO_PORT)


def get_report_risks_client():
    mongo_client = get_mongo_client()
    return mongo_client['report-risks']


def get_vulnerabilities_client():
    report_risks_client = get_report_risks_client()
    return report_risks_client['vulnerabilities']


def get_risks_client():
    report_risks_client = get_report_risks_client()
    return report_risks_client['risks']


def get_nvd_client():
    vulnerabilities_client = get_vulnerabilities_client()
    return vulnerabilities_client['nvd']


def yield_nvd_pack(nvd_client, nvd_ids):
    nvd_results = nvd_client.find({
        'id': {'$in': list(nvd_ids)},
    }, {
        '_id': 0,
        'id': 1,
        'texts': 1,
        'date': 1,
        'score': 1,
    })
    for r in nvd_results:
        yield r['id'], r['texts'], r['date'], r['score']


def save_cve(cve):
    return pickle.dump(cve, open(CVE_PATH, 'wb'), protocol=-1)


def load_cve():
    if not exists(CVE_PATH):
        return {}
    return pickle.load(open(CVE_PATH, 'rb'))


def get_risks(asset_ids):
    risks_client = get_risks_client()
    results = risks_client.find({
        'assetId': {'$in': list(asset_ids)},
    }, {
        '_id': 0,
        'assetId': 1,
        'meterIds': 1,
        'vulnerabilities': 1,
    })
    risks = []
    for r in results:
        asset_id = r['assetId']
        meter_ids = r['meterIds']
        meter_count = len(meter_ids)
        for d in r['vulnerabilities']:
            impact = d['impact']
            texts = d['texts']
            risks.append({
                'assetId': asset_id,
                'meterIds': meter_ids,
                'threatScore': impact * meter_count,
                'threatDescription': '\n'.join(texts),
                'vulnerabilityUri': 'nvd:%s' % d['id'],
                'vulnerabilityUrl': d['url'],
                'vulnerabilityDate': d['date'].strftime('%Y%m%d'),
            })
    return risks


def get_matching_nvd_ids(
        cve,
        approximate_component_type,
        approximate_vendor_name,
        approximate_product_name,
        approximate_product_version,
        minimum_similarity):
    matching_nvd_ids = set()

    approximate_vendor_name = approximate_vendor_name.strip()
    if not approximate_vendor_name:
        return matching_nvd_ids
    matching_component_types = get_matching_component_types(
        cve, approximate_component_type)

    approximate_product_name = approximate_product_name.strip()
    if not approximate_product_name:

        def update_nvd_ids(component_type):
            for vendor_name in get_matching_vendor_names(
                    cve, component_type, approximate_vendor_name,
                    minimum_similarity):
                for product_name in get_product_names(
                        cve, component_type, vendor_name):
                    for version_pack, nvd_ids in get_cve_packs(
                            cve, component_type, vendor_name, product_name):
                        matching_nvd_ids.update(nvd_ids)

        for component_type in matching_component_types:
            update_nvd_ids(component_type)
        if matching_component_types and component_type == 'h':
            update_nvd_ids('o')
        return matching_nvd_ids

    approximate_product_version = approximate_product_version.strip()
    if not approximate_product_version:

        def update_nvd_ids(component_type):
            for vendor_name in get_matching_vendor_names(
                    cve, component_type, approximate_vendor_name,
                    minimum_similarity):
                for product_name in get_matching_product_names(
                        cve, component_type, vendor_name,
                        approximate_product_name, minimum_similarity):
                    for version_pack, nvd_ids in get_cve_packs(
                            cve, component_type, vendor_name, product_name):
                        matching_nvd_ids.update(nvd_ids)

        for component_type in matching_component_types:
            update_nvd_ids(component_type)
        if matching_component_types and component_type == 'h':
            update_nvd_ids('o')
        return matching_nvd_ids

    def update_nvd_ids(component_type):
        for vendor_name in get_matching_vendor_names(
                cve, component_type, approximate_vendor_name,
                minimum_similarity):
            for product_name in get_matching_product_names(
                    cve, component_type, vendor_name, approximate_product_name,
                    minimum_similarity):
                for version_pack, nvd_ids in get_cve_packs(
                        cve, component_type, vendor_name, product_name):
                    if is_product_version_vulnerable(
                            approximate_product_version, version_pack):
                        matching_nvd_ids.update(nvd_ids)

    for component_type in matching_component_types:
        update_nvd_ids(component_type)
    if matching_component_types and component_type == 'h':
        update_nvd_ids('o')
    return matching_nvd_ids


def select_matches(
        target_text, source_texts, minimum_similarity, maximum_count=None):
    if not source_texts:
        return []
    if not maximum_count:
        maximum_count = len(source_texts)
    matches = sorted(extract_matches(
        target_text, source_texts, limit=maximum_count,
    ), key=lambda _: -_[1])
    return [
        text for text, similarity in matches
        if minimum_similarity <= similarity]


def get_similar_vendor_names(
        cve, approximate_component_type, approximate_vendor_name,
        minimum_similarity, maximum_count=None):
    vendor_names = set()
    matching_component_types = get_matching_component_types(
        cve, approximate_component_type)
    for component_type in matching_component_types:
        vendor_names.update(get_vendor_names(cve, component_type))
    if not approximate_vendor_name:
        return sorted(vendor_names)
    return select_matches(
        approximate_vendor_name, vendor_names, minimum_similarity,
        maximum_count)


def get_similar_product_names(
        cve, approximate_component_type, approximate_vendor_name,
        approximate_product_name, minimum_similarity, maximum_count=None):
    product_names = set()
    matching_component_types = get_matching_component_types(
        cve, approximate_component_type)
    for component_type in matching_component_types:
        matching_vendor_names = get_matching_vendor_names(
            cve, component_type, approximate_vendor_name, minimum_similarity,
            maximum_count)
        for vendor_name in matching_vendor_names:
            product_names.update(get_product_names(
                cve, component_type, vendor_name))
    if not approximate_product_name:
        return sorted(product_names)
    return select_matches(
        approximate_product_name, product_names, minimum_similarity,
        maximum_count)


def get_similar_product_versions(
        cve, approximate_component_type, approximate_vendor_name,
        approximate_product_name, approximate_product_version,
        minimum_similarity, maximum_count=None):
    product_versions = set()

    def update_product_versions(component_type):
        matching_vendor_names = get_matching_vendor_names(
            cve, component_type, approximate_vendor_name, minimum_similarity,
            maximum_count)
        for vendor_name in matching_vendor_names:
            matching_product_names = get_matching_product_names(
                cve, component_type, vendor_name, approximate_product_name,
                minimum_similarity, maximum_count)
            for product_name in matching_product_names:
                product_versions.update(get_product_versions(
                    cve, component_type, vendor_name, product_name))

    matching_component_types = get_matching_component_types(
        cve, approximate_component_type)
    for component_type in matching_component_types:
        update_product_versions(component_type)
    if approximate_component_type == 'h':
        update_product_versions('o')
    if not approximate_product_version:
        return sorted(product_versions)
    return select_matches(
        approximate_product_version, product_versions, minimum_similarity,
        maximum_count)


def get_matching_component_types(
        cve,
        approximate_component_type):
    component_types = cve.keys()
    if approximate_component_type in component_types:
        return [approximate_component_type]
    return component_types


def get_matching_vendor_names(
        cve,
        exact_component_type,
        approximate_vendor_name,
        minimum_similarity,
        maximum_count=None):
    all_vendor_names = get_vendor_names(
        cve,
        exact_component_type)
    if not approximate_vendor_name:
        return []
    return select_matches(
        approximate_vendor_name,
        all_vendor_names,
        minimum_similarity,
        maximum_count)


def get_matching_product_names(
        cve,
        exact_component_type,
        exact_vendor_name,
        approximate_product_name,
        minimum_similarity,
        maximum_count=None):
    all_product_names = get_product_names(
        cve,
        exact_component_type,
        exact_vendor_name)
    if not approximate_product_name:
        return []
    return select_matches(
        approximate_product_name,
        all_product_names,
        minimum_similarity,
        maximum_count)


def get_vendor_names(cve, component_type):
    if not cve:
        return []
    return cve[component_type].keys()


def get_product_names(cve, component_type, vendor_name):
    if not cve:
        return []
    return cve[component_type][vendor_name].keys()


def get_product_versions(cve, component_type, vendor_name, product_name):
    if not cve:
        return []
    product_versions = set()
    for version_pack in cve[component_type][vendor_name][product_name]:
        product_versions.update(version_pack)
    if None in product_versions:
        product_versions.remove(None)
    if '-' in product_versions:
        product_versions.remove('-')
    return product_versions


def get_cve_packs(cve, component_type, vendor_name, product_name):
    if not cve:
        return []
    return cve[component_type][vendor_name][product_name].items()


def is_product_version_vulnerable(product_version, version_pack):
    gt_version, ge_version, le_version, lt_version = version_pack
    if not is_version_constraint_satisfied(
            product_version, operator.gt, gt_version):
        return False
    if not is_version_constraint_satisfied(
            product_version, operator.ge, ge_version):
        return False
    if not is_version_constraint_satisfied(
            product_version, operator.le, le_version):
        return False
    if not is_version_constraint_satisfied(
            product_version, operator.lt, lt_version):
        return False
    return True


def is_version_constraint_satisfied(version_a, compare, version_b):
    version_a = normalize_version(version_a)
    version_b = normalize_version(version_b)
    if version_a in WILDCARD_VERSIONS or version_b in WILDCARD_VERSIONS:
        return True
    return compare(parse_version(version_a), parse_version(version_b))


def normalize_version(version):
    if version is None:
        return
    version = version.lower()
    version = version.replace('\\', '')
    version = version.replace('..', '.')
    version = version.rstrip('.')
    version = version.strip('+_ ')
    if version in WILDCARD_VERSIONS:
        return
    if version.startswith('.'):
        version = '0' + version
    return version
