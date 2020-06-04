import {
  CLEAR_SUGGESTIONS,
  LOG_ERROR,
  REFRESH_RISKS,
  SET_PRODUCT_NAME_SUGGESTIONS,
  SET_PRODUCT_VERSION_SUGGESTIONS,
  SET_RISKS,
  SET_SELECTED_RISK_INDEX,
  SET_SORTED_RISKS,
  SET_VENDOR_NAME_SUGGESTIONS,
  SUGGEST_PRODUCT_NAMES,
  SUGGEST_PRODUCT_VERSIONS,
  SUGGEST_VENDOR_NAMES,
} from './constants'

export const logError = payload => ({
  type: LOG_ERROR,
  payload,
})

export const suggestVendorNames = payload => ({
  type: SUGGEST_VENDOR_NAMES,
  payload,
})

export const suggestProductNames = payload => ({
  type: SUGGEST_PRODUCT_NAMES,
  payload,
})

export const suggestProductVersions = payload => ({
  type: SUGGEST_PRODUCT_VERSIONS,
  payload,
})

export const refreshRisks = payload => {
  if (!payload) {
    payload = {}
  }
  return {
    type: REFRESH_RISKS,
    payload,
  }
}

export const setVendorNameSuggestions = payload => ({
  payload,
  type: SET_VENDOR_NAME_SUGGESTIONS,
})

export const setProductNameSuggestions = payload => ({
  payload,
  type: SET_PRODUCT_NAME_SUGGESTIONS,
})

export const setProductVersionSuggestions = payload => ({
  type: SET_PRODUCT_VERSION_SUGGESTIONS,
  payload,
})

export const clearSuggestions = payload => ({
  type: CLEAR_SUGGESTIONS,
  payload,
})

export const setRisks = payload => ({
  type: SET_RISKS,
  payload,
})

export const sortRisks = payload => ({
  type: SET_SORTED_RISKS,
  payload,
})

export const setSelectedRiskIndex = selectedRiskIndex => ({
  type: SET_SELECTED_RISK_INDEX,
  payload: selectedRiskIndex,
})
