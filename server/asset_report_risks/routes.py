def includeme(config):
    config.add_route(
        'risks.json',
        '/risks.json')
    config.add_route(
        'vendor_names.json',
        '/risks/vendorNames.json')
    config.add_route(
        'product_names.json',
        '/risks/productNames.json')
    config.add_route(
        'product_versions.json',
        '/risks/productVersions.json')
