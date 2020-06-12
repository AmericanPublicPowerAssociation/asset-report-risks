# Asset Report Risks Server

    sudo dnf -y install \
        https://repo.mongodb.org/yum/redhat/8/mongodb-org/4.2/x86_64/RPMS/mongodb-org-server-4.2.3-1.el8.x86_64.rpm
    sudo systemctl start mongod

    virtualenv ~/.virtualenvs/asset-tracker -p $(which python3)
    source ~/.virtualenvs/asset-tracker/bin/activate

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/asset-tracker-server
    cd ~/Projects/asset-tracker-server
    pip install -e .

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/asset-report-risks
    cd ~/Projects/asset-report-risks/server
    pip install -e .

    # Prepare nvd from scratch
    python scripts/download_nvd.py --from-scratch
    python scripts/update_nvd.py --from-scratch
    python scripts/prepare_cve.py

    # Test autocomplete
    python scripts/get_vendor_names.py -h
    python scripts/get_product_names.py -h
    python scripts/get_product_versions.py -h

    # Test report
    python scripts/get_risks.py -h

    # Update nvd monthly
    python scripts/download_nvd.py
    python scripts/update_nvd.py --from-scratch
    python scripts/prepare_cve.py

    # Update nvd weekly
    python scripts/download_nvd.py modified
    python scripts/update_nvd.py modified
    python scripts/prepare_cve.py

    # Update nvd daily
    python scripts/download_nvd.py recent
    python scripts/update_nvd.py recent
    python scripts/prepare_cve.py

    # Update risks hourly
    python scripts/update_risks.py -h
