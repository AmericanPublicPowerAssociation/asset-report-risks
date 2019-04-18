def define_limit_score(minimum_score):

    def limit_score(vendor_pack):
        match_score = vendor_pack[1]
        return match_score >= minimum_score

    return limit_score
