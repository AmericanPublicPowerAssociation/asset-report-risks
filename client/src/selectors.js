import { createSelector } from 'reselect'

export const getVendorNameSuggestions = state => state.vendorNameSuggestions
export const getProductNameSuggestions = state => state.productNameSuggestions
export const getProductVersionSuggestions = state => state.productVersionSuggestions
export const getRisks = state => state.risks
export const getSortedRisks = state => state.sortedRisks

export const getVisibleRisks = createSelector([
  getRisks,
], (
  risks,
) => {
  // TODO: Limit visible risks to what is visible in current map viewport
  return risks
})

export const getVisibleRiskCount = createSelector([
  getVisibleRisks,
], (
  visibleRisks,
) => {
  return visibleRisks.length
})
