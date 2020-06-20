import { put, takeLatest } from 'redux-saga/effects'
import {
  clearSuggestions,
  setProductNameSuggestions,
  setProductVersionSuggestions,
  setRisks,
  setVendorNameSuggestions,
} from './actions'
import {
  REFRESH_RISKS,
  SUGGEST_VENDOR_NAMES,
  SUGGEST_PRODUCT_NAMES,
  SUGGEST_PRODUCT_VERSIONS,
} from './constants'
import {
  fetchSafely,
} from './macros'

export function* watchSuggestVendorNames() {
  yield takeLatest(SUGGEST_VENDOR_NAMES, function* (action) {
    const { typeCode, vendorName } = action.payload
    if (!vendorName.trim()) {
      yield put(clearSuggestions())
      return
    }
    const url = '/risks/vendorNames.json'
    const params = [
      `typeCode=${typeCode}`,
      `vendorName=${vendorName}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (vendorNames) {
        yield put(setVendorNameSuggestions(vendorNames))
      },
    })
  })
}

export function* watchSuggestProductNames() {
  yield takeLatest(SUGGEST_PRODUCT_NAMES, function* (action) {
    const { typeCode, vendorName, productName } = action.payload
    const url = '/risks/productNames.json'
    const params = [
      `typeCode=${typeCode}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (productNames) {
        yield put(setProductNameSuggestions(productNames))
      },
    })
  })
}

export function* watchSuggestProductVersions() {
  yield takeLatest(SUGGEST_PRODUCT_VERSIONS, function* (action) {
    const { typeCode, vendorName, productName, productVersion } = action.payload
    const url = '/risks/productVersions.json'
    const params = [
      `typeCode=${typeCode}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
      `productVersion=${productVersion}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (productVersions) {
        yield put(setProductVersionSuggestions(productVersions))
      },
    })
  })
}

export function* watchRefreshRisks() {
  yield takeLatest(REFRESH_RISKS, function* (action) {
    const url = '/risks.json'
    yield fetchSafely(url, {}, {
      on200: function* (risks) {
        yield put(setRisks(risks))
      },
    })
  })
}
