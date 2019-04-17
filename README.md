# Asset Vulnerability Report

## Configure Update Scripts

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .

    pipenv shell
    bash scripts/download_datasets.sh
    python scripts/update_database.py --refresh

## Configure Asset Tracker Server

## Configure Asset Tracker Client

## Restart Asset Tracker
