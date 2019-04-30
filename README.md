# Asset Vulnerability Report

## Configure Update Scripts

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .

    pipenv shell
    python scripts/download_datasets.py --refresh
    python scripts/update_database.py --refresh
    python scripts/prepare_lookup.py
    python scripts/get_vendor_names.py -h
    python scripts/get_product_names.py -h
    python scripts/get_product_versions.py -h
    python scripts/get_vulnerabilities.py -h

## Configure Asset Tracker Server

## Configure Asset Tracker Client

## Restart Asset Tracker
