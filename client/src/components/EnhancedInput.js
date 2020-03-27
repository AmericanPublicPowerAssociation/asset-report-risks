import React from 'react'
import Downshift from 'downshift'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  },
}))

export default function EnhancedInput(props) {
  const {
    className,
    disabled,
    label,
    value,
    suggestions,
    TextFieldProps,
  } = props
  const classes = useStyles()
  
  function handleStateChange(changes) {
    const {
      attribute,
      onSuggest,
      trackChange,
    } = props

    if (changes.hasOwnProperty('selectedItem')) {
      const value = changes.selectedItem
      saveChange(attribute, value)
    } else if (changes.type === Downshift.stateChangeTypes.changeInput) {
      const value = changes.inputValue
      trackChange(attribute, value)
      onSuggest(value)
    } else if (changes.isOpen === false) {
      const value = props.value
      saveChange(attribute, value)
    }

  }

  function saveChange(attribute, value) {
    const {
      clearSuggestions,
      saveChange,
      trackChange,
    } = props
    clearSuggestions()
    trackChange(attribute, value)
    saveChange && saveChange(attribute, value)
  }

  return (
    <Downshift selectedItem={value} onStateChange={handleStateChange}>
      {({
        isOpen,
        highlightedIndex,
        getMenuProps,
        getInputProps,
        getItemProps,
        clearSelection,
      }) => (
        <div className={className}>
          <TextField
            label={label}
            disabled={disabled}
            {...TextFieldProps}
            InputProps={getInputProps()}
          />
          {isOpen && suggestions.length > 0 &&
            <Paper className={classes.paper} square {...getMenuProps()}>
              {suggestions.map((suggestion, index) => {
                const isHighlighted = highlightedIndex === index
                return (
                  <MenuItem
                    key={index}
                    selected={isHighlighted}
                    {...getItemProps({ item: suggestion })}
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
