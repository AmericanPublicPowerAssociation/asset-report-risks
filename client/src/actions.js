import {
  CLEAR_SUGGESTIONS,
  LOG_ERROR,
  REFRESH_RISKS,
  SET_VENDOR_NAME_SUGGESTIONS,
  SET_PRODUCT_NAME_SUGGESTIONS,
  SET_PRODUCT_VERSION_SUGGESTIONS,
  SET_RISKS,
  SET_SORTED_RISKS,
  SUGGEST_VENDOR_NAMES,
  SUGGEST_PRODUCT_NAMES,
  SUGGEST_PRODUCT_VERSIONS,
} from './constants'


export const logError = payload => ({
  payload, type: LOG_ERROR})

export const suggestVendorNames = payload => ({
  payload, type: SUGGEST_VENDOR_NAMES})
export const suggestProductNames = payload => ({
  payload, type: SUGGEST_PRODUCT_NAMES})
export const suggestProductVersions = payload => ({
  payload, type: SUGGEST_PRODUCT_VERSIONS})

export const refreshRisks = payload => {
  if (!payload) {
    payload = {}
  }
  return {payload, type: REFRESH_RISKS} 
}

export const setVendorNameSuggestions = payload => ({
  payload, type: SET_VENDOR_NAME_SUGGESTIONS})
export const setProductNameSuggestions = payload => ({
  payload, type: SET_PRODUCT_NAME_SUGGESTIONS})
export const setProductVersionSuggestions = payload => ({
  payload, type: SET_PRODUCT_VERSION_SUGGESTIONS})
export const clearSuggestions = payload => ({
  payload, type: CLEAR_SUGGESTIONS})

export const setRisks = payload => ({
  payload, type: SET_RISKS})

export const sortRisks = payload => ({
  payload, type: SET_SORTED_RISKS
})
