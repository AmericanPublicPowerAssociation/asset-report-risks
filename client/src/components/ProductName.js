import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EnhancedInput from './EnhancedInput'
import {
  clearSuggestions,
  suggestProductNames,
} from '../actions'
import {
  getProductNameSuggestions,
} from '../selectors'


export default function ProductName(props) {
  const {
    className,
    disabled,
    typeCode,
    vendorName,
    productName,
    TextFieldProps,
    trackChange,
    saveChange,
  } = props

  const dispatch = useDispatch()
  const productNameSuggestions = useSelector(getProductNameSuggestions)

  return (
    <EnhancedInput
      className={className}
      disabled={disabled}
      label='Product Name'
      attribute='productName'
      value={productName}
      suggestions={productNameSuggestions}
      TextFieldProps={TextFieldProps}
      onSuggest={value => dispatch(suggestProductNames({
        typeCode, vendorName, productName: value
      }))}
      clearSuggestions={() => dispatch(clearSuggestions())}
      saveChange={saveChange}
      trackChange={trackChange}
    />
  )
}
