#!/bin/bash
# DO NOT USE IN PRODUCTION
# FOR TESTING ONLY
THIS_FOLDER=$(cd "$(dirname "$BASH_SOURCE[0]")" >/dev/null 2>&1 && pwd)
ROOT_FOLDER=$(dirname "$THIS_FOLDER")
DATABASE_PATH=$(dirname $(dirname "$ROOT_FOLDER"))/asset-tracker-server/development.ini

while [ 1 ]; do
    sleep 1
    python $THIS_FOLDER/update_risks.py "$DATABASE_PATH"
done
