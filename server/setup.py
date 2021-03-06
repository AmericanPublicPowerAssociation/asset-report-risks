from os.path import abspath, dirname, join
from setuptools import find_packages, setup


ENTRY_POINTS = '''
'''
APP_CLASSIFIERS = [
    'Programming Language :: Python',
]
APP_REQUIREMENTS = [
    'fuzzywuzzy',
    'invisibleroads-macros-disk >= 1.0.1',
    'packaging',
    'pymongo',
    'pyramid',
    'python-Levenshtein',
    'requests',
]
TEST_REQUIREMENTS = [
]
FOLDER = dirname(abspath(__file__))
DESCRIPTION = '\n\n'.join(open(join(FOLDER, x)).read().strip() for x in [
    'README.md', 'CHANGES.md'])


setup(
    name='asset-report-risks',
    version='0.3',
    description='Risks Report for Asset Tracker',
    long_description=DESCRIPTION,
    long_description_content_type='text/markdown',
    classifiers=APP_CLASSIFIERS,
    author='CrossCompute Inc.',
    author_email='support@crosscompute.com',
    url='https://crosscompute.com',
    keywords='',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    extras_require={'testing': TEST_REQUIREMENTS},
    install_requires=APP_REQUIREMENTS,
    entry_points=ENTRY_POINTS)
