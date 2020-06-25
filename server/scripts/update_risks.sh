#!/bin/bash
# DO NOT USE IN PRODUCTION
# FOR TESTING ONLY
THIS_FOLDER=$(cd "$(dirname "$BASH_SOURCE[0]")" >/dev/null 2>&1 && pwd)
DATABASE_PATH=$1

while [ 1 ]; do
    sleep 5
    python $THIS_FOLDER/update_risks.py "$DATABASE_PATH"
done
