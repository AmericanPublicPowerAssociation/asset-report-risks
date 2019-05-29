import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { call, put, takeLatest } from 'redux-saga/effects'
import { List, fromJS } from 'immutable'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'


export const getVendorNameSuggestions = state => state.get(
  'vendorNameSuggestions')
export const getProductNameSuggestions = state => state.get(
  'productNameSuggestions')
export const getProductVersionSuggestions = state => state.get(
  'productVersionSuggestions')


class EnhancedInput extends PureComponent {

  handleStateChange = changes => {
    const {
      attribute,
      onSuggest,
      trackChanges,
      saveChanges,
    } = this.props
    if (changes.hasOwnProperty('selectedItem')) {
      const value = changes.selectedItem
      saveChanges({[attribute]: value})
    } else if (changes.hasOwnProperty('inputValue')) {
      const value = changes.inputValue
      trackChanges({[attribute]: value})
      onSuggest(value)
    } else if (changes.hasOwnProperty('isOpen')) {
      saveChanges()
    }
  }

  render() {
    const {
      className,
      label,
      value,
      suggestions,
    } = this.props
    return (
      <Downshift selectedItem={value} onStateChange={this.handleStateChange}>
      {({
        isOpen,
        highlightedIndex,
        getInputProps,
        getMenuProps,
        getItemProps,
        clearSelection,
      }) => (
        <div className={className}>
          <TextField label={label} fullWidth
            InputProps={getInputProps({
                endAdornment: 
                <InputAdornment position='end'>
                  <IconButton onClick={clearSelection}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
            })}
            InputLabelProps={{shrink: true}}
          />
        {isOpen &&
          <Paper square {...getMenuProps()}>
          {suggestions.map((suggestion, index) => {
            const isHighlighted = highlightedIndex === index
            return (
              <MenuItem
                key={suggestion}
                selected={isHighlighted}
                {...getItemProps({item: suggestion})}
              >{suggestion}</MenuItem>
            )
          })}
          </Paper>
        }
        </div>
      )}
      </Downshift>
    )
  }

}


class _VendorName extends PureComponent {
  render() {
    let {
      className,
      typeId,
      vendorName,
      trackChanges,
      saveChanges,
      // Get redux variables
      vendorNameSuggestions,
      suggestVendorNames,
    } = this.props
    return (
      <EnhancedInput 
        className={className}
        label='Vendor Name'
        attribute='vendorName'
        value={vendorName}
        suggestions={vendorNameSuggestions}
        onSuggest={value => suggestVendorNames({
          typeId, vendorName: value})}
        saveChanges={saveChanges}
        trackChanges={trackChanges}
      />
    )
  }
}


class _ProductName extends PureComponent {
  render() {
    const {
      className,
      typeId,
      vendorName,
      productName,
      trackChanges,
      saveChanges,
      // Get redux variables
      productNameSuggestions,
      suggestProductNames,
    } = this.props
    return (
      <EnhancedInput 
        className={className}
        label='Product Name'
        attribute='productName'
        value={productName}
        suggestions={productNameSuggestions}
        onSuggest={value => suggestProductNames({
          typeId, vendorName, productName: value})}
        saveChanges={saveChanges}
        trackChanges={trackChanges}
      />
    )
  }
}


class _ProductVersion extends PureComponent {
  render() {
    const {
      className,
      typeId,
      vendorName,
      productName,
      productVersion,
      trackChanges,
      saveChanges,
      // Get redux variables
      productVersionSuggestions,
      suggestProductVersions,
    } = this.props
    return (
      <EnhancedInput 
        className={className}
        label='Product Version'
        attribute='productVersion'
        value={productVersion}
        suggestions={productVersionSuggestions}
        onSuggest={value => suggestProductVersions({
          typeId, vendorName, productName, productVersion: value})}
        saveChanges={saveChanges}
        trackChanges={trackChanges}
      />
    )
  }
}


export const VendorName = connect(
  state => ({
    vendorNameSuggestions: getVendorNameSuggestions(state),
  }),
  dispatch => ({
    suggestVendorNames: payload => {dispatch(
      suggestVendorNames(payload))},
  }),
)(_VendorName)


export const ProductName = connect(
  state => ({
    productNameSuggestions: getProductNameSuggestions(state),
  }),
  dispatch => ({
    suggestProductNames: payload => {dispatch(
      suggestProductNames(payload))},
  }),
)(_ProductName)


export const ProductVersion = connect(
  state => ({
    productVersionSuggestions: getProductVersionSuggestions(state),
  }),
  dispatch => ({
    suggestProductVersions: payload => {dispatch(
      suggestProductVersions(payload))},
  }),
)(_ProductVersion)


export const LOG_ERROR = 'LOG_ERROR'
export const SUGGEST_VENDOR_NAMES = 'SUGGEST_VENDOR_NAMES'
export const SUGGEST_PRODUCT_NAMES = 'SUGGEST_PRODUCT_NAMES'
export const SUGGEST_PRODUCT_VERSIONS = 'SUGGEST_PRODUCT_VERSIONS'
export const REPLACE_SUGGESTIONS = 'REPLACE_SUGGESTIONS'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const suggestVendorNames = payload => ({
  payload, type: SUGGEST_VENDOR_NAMES})
export const suggestProductNames = payload => ({
  payload, type: SUGGEST_PRODUCT_NAMES})
export const suggestProductVersions = payload => ({
  payload, type: SUGGEST_PRODUCT_VERSIONS})


export const replaceSuggestions = payload => ({
  payload, type: REPLACE_SUGGESTIONS})


export function *watchSuggestVendorNames() {
  yield takeLatest(SUGGEST_VENDOR_NAMES, function* (action) {
    const { typeId, vendorName } = action.payload
    if (!vendorName.trim()) {
      yield put(replaceSuggestions({vendorNames: List()}))
      return
    }
    const baseUrl = '/extensions/vulnerabilities/vendorNames.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
    ]
    try {
      const response = yield call(fetch, baseUrl + '?' + params.join('&'))
      switch (response.status) {
        case 200: {
          const vendorNames = fromJS(yield response.json())
          yield put(replaceSuggestions({vendorNames}))
          break
        }
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


export function *watchSuggestProductNames() {
  yield takeLatest(SUGGEST_PRODUCT_NAMES, function* (action) {
    const { typeId, vendorName, productName } = action.payload
    const baseUrl = '/extensions/vulnerabilities/productNames.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
    ]
    try {
      const response = yield call(fetch, baseUrl + '?' + params.join('&'))
      switch (response.status) {
        case 200: {
          const productNames = fromJS(yield response.json())
          yield put(replaceSuggestions({productNames}))
          break
        }
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


export function *watchSuggestProductVersions() {
  yield takeLatest(SUGGEST_PRODUCT_VERSIONS, function* (action) {
    const { typeId, vendorName, productName, productVersion } = action.payload
    const baseUrl = '/extensions/vulnerabilities/productVersions.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
      `productVersion=${productVersion}`,
    ]
    try {
      const response = yield call(fetch, baseUrl + '?' + params.join('&'))
      switch (response.status) {
        case 200: {
          const productVersions = fromJS(yield response.json())
          yield put(replaceSuggestions({productVersions}))
          break
        }
        default:
          yield put(logError({status: response.status}))
      }
    } catch (error) {
      yield put(logError({text: error}))
    }
  })
}


export const vendorNameSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
      const { vendorNames } = action.payload
      return state.withMutations(state => {
        state.clear()
        state.concat(vendorNames)
      })
    }
    default: {
      return state
    }
  }
}


export const productNameSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
      const { productNames } = action.payload
      return state.withMutations(state => {
        state.clear()
        state.concat(productNames)
      })
    }
    default: {
      return state
    }
  }
}


export const productVersionSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
      const { productVersions } = action.payload
      return state.withMutations(state => {
        state.clear()
        state.concat(productVersions)
      })
    }
    default: {
      return state
    }
  }
}
