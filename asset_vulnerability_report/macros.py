def get_dictionary(d):
    for k, v in d.items():
        if isinstance(v, dict):
            d[k] = get_dictionary(v)
    return dict(d)
