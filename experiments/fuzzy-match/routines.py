from pymongo import MongoClient


def get_nvd_database():
    client = MongoClient()
    vulnerability_database = client['vulnerability']
    return vulnerability_database['nvd']


def define_limit_score(minimum_score):

    def limit_score(vendor_pack):
        match_score = vendor_pack[1]
        return match_score >= minimum_score

    return limit_score
