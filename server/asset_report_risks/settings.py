from os import environ
from os.path import expanduser, join


BASE_FOLDER = expanduser('~/Experiments/asset-report-risks')
DATASET_FOLDER = join(BASE_FOLDER, 'datasets')
CVE_PATH = join(BASE_FOLDER, 'cve.pkl')
MINIMUM_SIMILARITY = 80
MAXIMUM_COUNT = 10
MONGO_HOST = environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = int(environ.get('MONGO_PORT', 27017))
