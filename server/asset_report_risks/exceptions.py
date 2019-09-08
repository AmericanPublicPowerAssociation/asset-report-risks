from asset_tracker.exceptions import AssetTrackerError


class BadArchive(IOError, AssetTrackerError):
    pass


class BadFormat(IOError, AssetTrackerError):
    pass
