import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EnhancedInput from './EnhancedInput'
import {
  clearSuggestions,
  suggestVendorNames,
} from '../actions'
import {
  getVendorNameSuggestions,
} from '../selectors'


export default function VendorName(props) {
  const {
    className,
    disabled,
    typeCode,
    vendorName,
    TextFieldProps,
    trackChange,
    saveChange,
  } = this.props
  const dispatch = useDispatch()
  const vendorNameSuggestions = useSelector(getVendorNameSuggestions)
  return (
    <EnhancedInput
      className={className}
      disabled={disabled}
      label='Vendor Name'
      attribute='vendorName'
      value={vendorName}
      suggestions={vendorNameSuggestions}
      TextFieldProps={TextFieldProps}
      onSuggest={value => dispatch(suggestVendorNames({
        typeCode, vendorName: value
      }))}
      clearSuggestions={() => dispatch(clearSuggestions())}
      saveChange={saveChange}
      trackChange={trackChange}
    />
  )
}
