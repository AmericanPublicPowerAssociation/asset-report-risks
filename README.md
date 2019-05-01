# Asset Vulnerability Report

## Configure Update Scripts

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .
    pipenv shell

    # Prepare database from scratch
    python scripts/download_datasets.py --from-scratch
    python scripts/update_database.py --from-scratch
    python scripts/prepare_lookup.py

    # Update database monthly
    python scripts/download_datasets.py
    python scripts/update_database.py
    python scripts/prepare_lookup.py

    # Update database weekly
    python scripts/download_datasets.py modified
    python scripts/update_database.py modified
    python scripts/prepare_lookup.py

    # Update database daily
    python scripts/download_datasets.py recent
    python scripts/update_database.py recent
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
