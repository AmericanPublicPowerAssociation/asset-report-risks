# Asset Vulnerability Report Server

## Configure

    cd ~/Downloads
    curl -o /tmp/mongodb-org-server.rpm https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.0/x86_64/RPMS/mongodb-org-server-4.0.10-1.el7.x86_64.rpm
    sudo dnf -y install /tmp/mongodb-org-server.rpm
    sudo systemctl start mongod

    cd ~/Projects/asset-vulnerability-report/server
    pip install --user --upgrade pipenv
    pipenv install --three -e .
    pipenv shell

    # Prepare nvd from scratch
    python scripts/download_nvd.py --from-scratch
    python scripts/update_nvd.py --from-scratch
    python scripts/prepare_cve.py

    # Test autocomplete
    python scripts/get_vendor_names.py -h
    python scripts/get_product_names.py -h
    python scripts/get_product_versions.py -h

    # Test report
    python scripts/get_vulnerabilities.py -h

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

## Install

    sudo adduser asset-tracker
    sudo -s
    su asset-tracker
    cd
    virtualenv ~/.virtualenvs/asset-tracker -p $(which python3)
    source ~/.virtualenvs/asset-tracker/bin/activate

    mkdir Experiments Projects

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/asset-tracker-client
    cd ~/Projects/asset-tracker-client
    npm install

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/appa-auth-client
    cd ~/Projects/appa-auth-client/client
    npm install

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/asset-tracker-server
    cd ~/Projects/asset-tracker-server
    pip install -e .

    cd ~/Projects
    git clone git@github.com:AmericanPublicPowerAssociation/asset-vulnerability-report
    cd ~/Projects/asset-vulnerability-report/client
    npm install
    cd ~/Projects/asset-vulnerability-report/server
    pip install -e .
    python scripts/download_nvd.py --from-scratch
    python scripts/update_nvd.py --from-scratch
    python scripts/prepare_cve.py

    cd ~/Experiments
    mkdir asset-tracker-server
    cp ~/Projects/asset-tracker-server/production.ini .
    cd ~/Experiments/asset-tracker-server
    alembic -c development.ini revision --autogenerate -m 'Initialize database'
    alembic -c development.ini upgrade head

    sudo chown asset-tracker:asset-tracker /home/asset-tracker -R

    sudo systemctl enable nginx
    sudo cp /home/asset-tracker/Projects/asset-tracker-server/services/nginx.conf /etc/nginx
    sudo systemctl enable mongod
    sudo cp services/asset-vulnerability-report.* /etc/systemd/system/
    sudo systemctl enable asset-vulnerability-report
