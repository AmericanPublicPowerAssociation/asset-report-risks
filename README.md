# Asset Vulnerability Report

## Configure Update Scripts

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .
    pipenv shell

    # Prepare database
    python scripts/download_datasets.py --refresh  # Run monthly
    python scripts/prepare_database.py             # Run monthly
    python scripts/update_database.py modified     # Run weekly
    python scripts/update_database.py recent       # Run daily

    # Prepare lookup tree after updating database
    python scripts/prepare_lookup.py

    # Test autocomplete
    python scripts/get_vendor_names.py -h
    python scripts/get_product_names.py -h
    python scripts/get_product_versions.py -h

    # Test report
    python scripts/get_vulnerabilities.py -h

## Configure Asset Tracker Server

## Configure Asset Tracker Client

## Restart Asset Tracker
