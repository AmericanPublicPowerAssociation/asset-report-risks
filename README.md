# Asset Vulnerability Report

## Configure MongoDB

    sudo dnf install mongodb mongodb-server
    sudo systemctl start mongod

## Configure Update Scripts

    cd asset-vulnerability-report
    pip install --user --upgrade pipenv
    pipenv install --three -e .

## Configure Asset Tracker Server

## Configure Asset Tracker Client

## Restart Asset Tracker
