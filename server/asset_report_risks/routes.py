def includeme(config):
    config.add_route(
        'risks.json',
        '/extensions/risks.json')
    config.add_route(
        'vendor_names.json',
        '/extensions/risks/vendorNames.json')
    config.add_route(
        'product_names.json',
        '/extensions/risks/productNames.json')
    config.add_route(
        'product_versions.json',
        '/extensions/risks/productVersions.json')
    config.scan()
