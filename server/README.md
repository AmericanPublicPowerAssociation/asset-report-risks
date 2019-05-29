# Asset Vulnerability Report Server

## Configure Update Scripts

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .
    pipenv shell

    # Prepare nvd from scratch
    python scripts/download_nvd.py --from-scratch
    python scripts/update_nvd.py --from-scratch
    python scripts/prepare_cve.py

    # Update nvd monthly
    python scripts/download_nvd.py
    python scripts/update_nvd.py
    python scripts/prepare_cve.py

    # Update nvd weekly
    python scripts/download_nvd.py modified
    python scripts/update_nvd.py modified
    python scripts/prepare_cve.py

    # Update nvd daily
    python scripts/download_nvd.py recent
    python scripts/update_nvd.py recent
    python scripts/prepare_cve.py

    # Update vulnerable assets hourly
    python scripts/update_vulnerable_assets.py

    # Test autocomplete
    python scripts/get_vendor_names.py -h
    python scripts/get_product_names.py -h
    python scripts/get_product_versions.py -h

    # Test report
    python scripts/get_vulnerabilities.py -h

## Configure Asset Tracker Server

    pyramid.includes =
        asset_vulnerability_report
