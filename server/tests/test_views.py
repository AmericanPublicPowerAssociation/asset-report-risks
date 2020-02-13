from asset_tracker.models import Asset
from asset_report_risks.views import get_risks_json


class TestGetRisksJson(object):

    def test_accept_parameters(self, website_request, db, mocker):
        db.add(Asset(id='X', name='test1'))
        mocker.patch('asset_report_risks.views.get_risks', return_value=[
            {
                'assetId': 'X',
                'meterIds': [1, 2, 3],
                'vulnerabilityUri': 'X',
                'threatScore': 100,
                'threatDescription': 'X',
                'vulnerabilityUrl': 'X',
                'vulnerabilityDate': '20200101',
            },
        ])
        website_response_ds = get_risks_json(website_request)
        assert len(website_response_ds) == 1
        d = website_response_ds[0]
        assert d['assetId'] == 'X'
        assert d['assetName'] == 'test1'
        assert d['meterCount'] == 3
        # assert d['meterIds'] == [1, 2, 3]
        assert d['vulnerabilityUri'] == 'X'
        assert d['threatScore'] == 100
        assert d['threatDescription'] == 'X'
        assert d['vulnerabilityUrl'] == 'X'
        assert d['vulnerabilityDate'] == '20200101'
