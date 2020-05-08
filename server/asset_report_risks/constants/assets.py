import json
from os.path import join

from asset_tracker.routines.asset import absorb_asset_type_by_code

from . import CONSTANTS_FOLDER


def includeme(config):
    absorb_asset_type_by_code(ASSET_TYPE_BY_CODE)


ASSET_TYPE_BY_CODE = json.load(
    open(join(CONSTANTS_FOLDER, 'assetTypeByCode.json'), 'rt'))
