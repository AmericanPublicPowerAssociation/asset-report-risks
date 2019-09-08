import operator

from asset_report_risks.routines import (
    is_product_version_vulnerable,
    is_version_constraint_satisfied,
    normalize_version,
    WILDCARD_VERSIONS)


def test_is_product_version_vulnerable():
    assert is_product_version_vulnerable('1.0', ('0.5', None, None, None))
    assert is_product_version_vulnerable('1.0', (None, '1.0', None, None))
    assert is_product_version_vulnerable('1.0', (None, None, '1.0', None))
    assert is_product_version_vulnerable('1.0', (None, None, None, '1.5'))
    assert not is_product_version_vulnerable('1.0', ('1.0', None, None, None))
    assert not is_product_version_vulnerable('1.0', (None, None, None, '1.0'))
    assert not is_product_version_vulnerable('1.0', (None, '2.0', None, None))
    assert not is_product_version_vulnerable('1.0', (None, None, '0.5', None))


def test_is_version_constraint_satisfied():
    for version in WILDCARD_VERSIONS:
        assert is_version_constraint_satisfied(version, operator.ge, '1.0')
    assert is_version_constraint_satisfied('1.1', operator.gt, '1.0')
    assert is_version_constraint_satisfied('1.0', operator.ge, '1.0')
    assert is_version_constraint_satisfied('1.0', operator.le, '1.0')
    assert is_version_constraint_satisfied('1.0', operator.lt, '1.1')


def test_normalize_version():
    for version in WILDCARD_VERSIONS:
        assert normalize_version(version) is None
    assert normalize_version('a') == 'a'
    assert normalize_version('a\\(a\\)') == 'a(a)'
    assert normalize_version('a..a') == 'a.a'
    assert normalize_version('a.') == 'a'
    assert normalize_version('+a_ ') == 'a'
    assert normalize_version('.a') == '0.a'
