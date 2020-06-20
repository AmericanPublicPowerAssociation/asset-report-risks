// TODO: Review from scratch

import {
  CLEAR_SUGGESTIONS,
  SET_PRODUCT_NAME_SUGGESTIONS,
  SET_PRODUCT_VERSION_SUGGESTIONS,
  SET_RISKS,
  SET_SELECTED_RISK_INDEX,
  SET_TASK,
  SET_VENDOR_NAME_SUGGESTIONS,
} from './constants'

export const vendorNameSuggestions = (state = [], action) => {
  switch (action.type) {
    case SET_VENDOR_NAME_SUGGESTIONS: {
      return action.payload
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const productNameSuggestions = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_NAME_SUGGESTIONS: {
      return action.payload
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const productVersionSuggestions = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_VERSION_SUGGESTIONS: {
      return action.payload
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const risks = (state = [], action) => {
  switch (action.type) {
    case SET_RISKS: {
      return action.payload
    }
    case SET_TASK: {
      const task = action.payload
      const taskAssetId = task.assetId
      const taskReferenceUri = task.referenceUri
      const taskId = task.id
      const taskName = task.name
      const taskStatus = task.status
      return state.map(risk => {
        const riskAssetId = risk.assetId
        const riskReferenceUri = risk.vulnerabilityUri
        if (
          riskAssetId !== taskAssetId ||
          riskReferenceUri !== taskReferenceUri
        ) {
          return risk
        }
        return { ...risk, ...{ taskId, taskName, taskStatus } }
      })
    }
    default: {
      return state
    }
  }
}

export const selectedRiskIndex = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_RISK_INDEX: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
