import React, { PureComponent } from 'react'
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import { List, fromJS } from 'immutable'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'


export class VendorName extends PureComponent {
  render() {
    const {
      className,
      value,
      setValue,
      saveValue,
    } = this.props
    return (
      <Downshift
        inputValue={value}
        onInputValueChange={value => {
          setValue(value)
        }}
        onChange={saveValue}
      >
      {({
        getInputProps,
        getMenuProps,
        getItemProps,
        clearSelection,
        isOpen,
      }) => (
        <div className={className}>
          <TextField
            label='Vendor Name'
            fullWidth
            InputProps={getInputProps({
              endAdornment: 
                <InputAdornment position='end'>
                  <IconButton onClick={() => clearSelection()}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        {isOpen &&
          <Paper square {...getMenuProps()}>
          {['one', 'two'].map(suggestion => {
            return (
              <MenuItem
                key={suggestion}
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


export class ProductName extends PureComponent {
  render() {
    const {
      className,
    } = this.props
    return (
      <div className={className}>Product Name</div>
    )
  }
}


export class ProductVersion extends PureComponent {
  render() {
    const {
      className,
    } = this.props
    return (
      <div className={className}>Product Version</div>
    )
  }
}


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
    const baseUrl = '/reports/vulnerabilities/vendorNames.json'
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


/*
export function *watchSuggestProductNames() {
  yield takeLatest(SUGGEST_PRODUCT_NAMES, function* () {
    try {
    } catch (error) {
    }
  })
}


export function *watchSuggestProductVersions() {
  yield takeLatest(SUGGEST_PRODUCT_VERSIONS, function* () {
    try {
    } catch (error) {
    }
  })
}
*/


export const vendorNameSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
    }
    default: {
      return state
    }
  }
}


export const productNameSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
    }
    default: {
      return state
    }
  }
}


export const productVersionSuggestions = (state=List(), action) => {
  switch (action.type) {
    case REPLACE_SUGGESTIONS: {
    }
    default: {
      return state
    }
  }
}
