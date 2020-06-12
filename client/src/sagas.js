import { call, put, takeLatest } from 'redux-saga/effects'
import {
  clearSuggestions,
  logError,
  setProductNameSuggestions,
  setProductVersionSuggestions,
  setRisks,
  sortRisks,
  setVendorNameSuggestions,
} from './actions'
import {
  REFRESH_RISKS,
  SUGGEST_VENDOR_NAMES,
  SUGGEST_PRODUCT_NAMES,
  SUGGEST_PRODUCT_VERSIONS,
} from './constants'

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

export function* fetchSafely(url, options, callbacks) {
  try {
    const response = yield call(fetch, url, options)
    const status = response.status
    const { on200, on400 } = callbacks
    if (on200 && status === 200) {
      yield on200(yield response.json())
    } else if (on400 && status === 400) {
      yield on400(yield response.json())
    } else {
      yield put(logError({ status }))
    }
  } catch (error) {
    yield put(logError({ text: error }))
  }
}
