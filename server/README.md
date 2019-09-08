# Asset Report Risks Server

    pushd ~/Downloads
    curl -o /tmp/mongodb-org-server.rpm https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.0/x86_64/RPMS/mongodb-org-server-4.0.10-1.el7.x86_64.rpm
    sudo dnf -y install /tmp/mongodb-org-server.rpm
    sudo systemctl start mongod
    popd

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

    # Update risks hourly
    python scripts/update_risks.py -h
