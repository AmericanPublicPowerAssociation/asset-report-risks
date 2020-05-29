import { createSelector } from 'reselect'

export const getVendorNameSuggestions = state => state.vendorNameSuggestions
export const getProductNameSuggestions = state => state.productNameSuggestions
export const getProductVersionSuggestions = state => state.productVersionSuggestions
export const getRisks = state => state.risks
export const getSortedRisks = state => state.sortedRisks
export const getSelectedRiskIndex = state => state.selectedRiskIndex

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

export const getRisksByAssetId = createSelector([
  getRisks,
], (
  risks,
) => {
  const risksByAssetId = {}
  risks.forEach(risk => {
    const assetId = risk.assetId
    const assetRisks = risksByAssetId[assetId] || []
    assetRisks.push(risk)
    risksByAssetId[assetId] = assetRisks
  })
  return risksByAssetId
})

export const getThreatScoreByAssetId = createSelector([
  getRisksByAssetId,
], (
  risksByAssetId,
) => {
  const threatScoreByAssetId = {}
  Object.entries(risksByAssetId).forEach(([assetId, risks]) => {
    const threatScore = risks.reduce((sum, x) => sum + x.threatScore, 0)
    threatScoreByAssetId[assetId] = threatScore
  })
  return threatScoreByAssetId
})
