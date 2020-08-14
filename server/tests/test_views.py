from asset_tracker.models import Asset
from asset_report_risks.views import see_risks_json


class TestGetRisksJson(object):

    def test_accept_parameters(self, application_request, database, mocker):
        database.add(Asset(id='X', name='test1'))
        mocker.patch('asset_report_risks.views.get_risks', return_value=[{
            'assetId': 'X',
            'meterIds': [1, 2, 3],
            'vulnerabilityUri': 'X',
            'threatScore': 100,
            'threatDescription': 'X',
            'vulnerabilityUrl': 'X',
            'vulnerabilityDate': '20200101',
        }])
        website_response_ds = see_risks_json(application_request)
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
