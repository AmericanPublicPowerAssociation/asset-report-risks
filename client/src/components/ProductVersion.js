import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EnhancedInput from './EnhancedInput'
import {
  clearSuggestions,
  suggestProductVersions,
} from '../actions'
import {
  getProductVersionSuggestions,
} from '../selectors'


export default function ProductVersion(props) {
  const {
    className,
    disabled,
    typeCode,
    vendorName,
    productName,
    productVersion,
    TextFieldProps,
    trackChange,
    saveChange,
  } = this.props

  const dispatch = useDispatch()
  const productVersionSuggestions = useSelector(getProductVersionSuggestions)
  return (
    <EnhancedInput
      className={className}
      disabled={disabled}
      label='Product Version'
      attribute='productVersion'
      value={productVersion}
      suggestions={productVersionSuggestions}
      TextFieldProps={TextFieldProps}
      onSuggest={value => suggestProductVersions({
        typeCode, vendorName, productName, productVersion: value
      })}
      clearSuggestions={() => dispatch(clearSuggestions)}
      saveChange={saveChange}
      trackChange={trackChange}
    />
  )
}
