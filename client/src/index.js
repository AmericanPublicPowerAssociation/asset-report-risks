import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Map, List, fromJS } from 'immutable'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import FixIcon from '@material-ui/icons/Build'
import DoneIcon from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Link from '@material-ui/core/Link'


const TOOLTIP_DELAY = 500
const SET_TASK = 'SET_TASK'


export const getVendorNameSuggestions = state => state.get(
  'vendorNameSuggestions')
export const getProductNameSuggestions = state => state.get(
  'productNameSuggestions')
export const getProductVersionSuggestions = state => state.get(
  'productVersionSuggestions')
export const getRisks = state => state.get(
  'risks')
export const getSortedRisks = state => state.get(
  'sortedRisks')


class _EnhancedInputWithoutStyles extends PureComponent {

  handleStateChange = changes => {
    const {
      attribute,
      onSuggest,
      trackChanges,
    } = this.props

    if (changes.hasOwnProperty('selectedItem')) {
      const value = changes.selectedItem
      this.saveChanges({ [attribute]: value })
    } else if (changes.type === Downshift.stateChangeTypes.changeInput) {
      const value = changes.inputValue
      trackChanges({ [attribute]: value })
      onSuggest(value)
    } else if (changes.isOpen === false) {
      const value = this.props.value
      this.saveChanges({ [attribute]: value })
    }
  }

  saveChanges = attributes => {
    const {
      clearSuggestions,
      saveChanges,
    } = this.props
    clearSuggestions()
    saveChanges(attributes)
  }

  render() {
    const {
      classes,
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
              <TextField
                fullWidth
                label={label}
                InputProps={getInputProps({
                  endAdornment:
                    <InputAdornment position='end'>
                      <IconButton onClick={clearSelection}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                })}
              />
              {isOpen && !suggestions.isEmpty() &&
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

}
const EnhancedInput = withStyles(theme => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  },
}))(_EnhancedInputWithoutStyles)


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
      clearSuggestions,
    } = this.props
    return (
      <EnhancedInput
        className={className}
        label='Vendor Name'
        attribute='vendorName'
        value={vendorName}
        suggestions={vendorNameSuggestions}
        onSuggest={value => suggestVendorNames({
          typeId, vendorName: value
        })}
        clearSuggestions={clearSuggestions}
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
      clearSuggestions,
    } = this.props
    return (
      <EnhancedInput
        className={className}
        label='Product Name'
        attribute='productName'
        value={productName}
        suggestions={productNameSuggestions}
        onSuggest={value => suggestProductNames({
          typeId, vendorName, productName: value
        })}
        clearSuggestions={clearSuggestions}
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
      clearSuggestions,
    } = this.props
    return (
      <EnhancedInput
        className={className}
        label='Product Version'
        attribute='productVersion'
        value={productVersion}
        suggestions={productVersionSuggestions}
        onSuggest={value => suggestProductVersions({
          typeId, vendorName, productName, productVersion: value
        })}
        clearSuggestions={clearSuggestions}
        saveChanges={saveChanges}
        trackChanges={trackChanges}
      />
    )
  }
}


class _RisksCardWithoutStyles extends PureComponent {

  render() {
    const {
      classes,
      to,
      values,
    } = this.props
    const riskCount = values.get(
      'riskCount')
    const aggregatedThreatScore = values.get(
      'aggregatedThreatScore')
    const greatestThreatDescription = values.get(
      'greatestThreatDescription')
    const downstreamMeterPercent = values.get(
      'downstreamMeterPercent')
    return (
      <Link underline='none' component={RouterLink} to={to}>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <Typography className={classes.title} align='center'>
              Risks
            </Typography>
            <Table className={classes.section}>
              <TableBody>
                <TableRow>
                  <TableCell>Threat Score</TableCell>
                  <TableCell align='right'>{aggregatedThreatScore}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Risks</TableCell>
                  <TableCell align='right'>{riskCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Impacted Meters</TableCell>
                  <TableCell align='right'>{downstreamMeterPercent}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography className={classes.section}>
              {greatestThreatDescription}
            </Typography>
          </CardActionArea>
        </Card>
      </Link>
    )
  }
}


export const RisksCard = withStyles(theme => ({
  section: {
    marginTop: theme.spacing(3),
  },
  title: {
    fontSize: 24,
  },
  card: {
    margin: theme.spacing(1),
  },
  cardActionArea: {
    padding: theme.spacing(3),
  },
}))(_RisksCardWithoutStyles)


class _RisksTableWithoutStyles extends PureComponent {
  getSortLabelDirection(column, sortKey, order) {
    return order
  }

  getSortColumnIsActive(column, sortKey) {
    return column === sortKey
  }

  onSortClick(clickedColumn, curCol, order) {
    this.props.refreshRisks({sortKey: clickedColumn, order})
  }

  render() {
    const {
      classes,
      risks,
      openTaskEditDialog,
      setEditingTaskValues,
      sortedRisks,
    } = this.props
    const {sortKey, order} = sortedRisks.toJS()
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={this.getSortColumnIsActive('name', sortKey)}
                onClick={ () => this.onSortClick('name', sortKey, order)}
                direction={this.getSortLabelDirection('name', sortKey, order)}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={this.getSortColumnIsActive('meter-count', sortKey)}
                onClick={ () => this.onSortClick('meter-count', sortKey, order)}
                direction={this.getSortLabelDirection('meter-count', sortKey)}>

                Meter Count
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={this.getSortColumnIsActive('threat-score', sortKey)}
                onClick={ () => this.onSortClick('threat-score', sortKey, order)}
                direction={this.getSortLabelDirection('threat-score', sortKey)}>
                Aggregated Threat
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              Vulnerability
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={ this.getSortColumnIsActive('published', sortKey)}
                onClick={ () => this.onSortClick('published', sortKey, order)}
                direction={this.getSortLabelDirection('published', sortKey)}>
                Published
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {risks.map((risk, index) => {
            const assetId = risk.get('assetId')
            const assetName = risk.get('assetName')
            const meterCount = risk.get('meterCount')
            const threatScore = risk.get('threatScore')
            const threatDescription = risk.get('threatDescription')
            const vulnerabilityUri = risk.get('vulnerabilityUri')
            const vulnerabilityUrl = risk.get('vulnerabilityUrl')
            const vulnerabilityDate = risk.get('vulnerabilityDate')
            const taskId = risk.get('taskId')
            const taskStatus = risk.get('taskStatus')
            const taskName = risk.get('taskName')
            const task = taskId ? {
              id: taskId,
              assetId,
              name: taskName,
              status: taskStatus,
              referenceUri: vulnerabilityUri,
            } : {
              id: null,
              assetId,
              name: `Fix ${vulnerabilityUrl}`,
              status: 0,
              referenceUri: vulnerabilityUri,
            }
            const taskButtonTip = `${taskId ? 'Edit' : 'Add'} Task`
            const taskButtonClassName = taskId ? {
              '-100': classes.taskCancelled,
              '0': classes.taskNew,
              '50': classes.taskPending,
              '100': classes.taskDone,
            }[taskStatus] : classes.taskMissing

            return (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>{assetName}</TableCell>
                <TableCell align='right'>{meterCount}</TableCell>
                <TableCell align='right'>{threatScore}</TableCell>
                <TableCell>{threatDescription}</TableCell>
                <TableCell>
                  <Link target='_blank' rel='noopener noreferrer'
                    href={'//' + vulnerabilityUrl}>{vulnerabilityDate}</Link>
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title={taskButtonTip} enterDelay={TOOLTIP_DELAY}>
                    <IconButton
                      className={taskButtonClassName}
                      onClick={() => {
                        setEditingTaskValues(task)
                        openTaskEditDialog()
                      }}
                    >
                      {taskStatus !== 100 ? <FixIcon /> : <DoneIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

}
export const RisksTable = withStyles(theme => ({
  taskMissing: {
    color: 'lightgrey',
  },
  taskCancelled: {
    backgroundColor: 'red',
    color: 'white',
  },
  taskNew: {
    color: 'black',
  },
  taskPending: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  taskDone: {
    backgroundColor: 'green',
    color: 'white',
  },
}))(_RisksTableWithoutStyles)


export const VendorName = connect(
  state => ({
    vendorNameSuggestions: getVendorNameSuggestions(state),
  }),
  dispatch => ({
    suggestVendorNames: payload => {dispatch(
      suggestVendorNames(payload))
    },
    clearSuggestions: payload => {dispatch(
      clearSuggestions(payload))
    },
  }),
)(_VendorName)


export const ProductName = connect(
  state => ({
    productNameSuggestions: getProductNameSuggestions(state),
  }),
  dispatch => ({
    suggestProductNames: payload => {dispatch(
      suggestProductNames(payload))
    },
    clearSuggestions: payload => {dispatch(
      clearSuggestions(payload))
    },
  }),
)(_ProductName)


export const ProductVersion = connect(
  state => ({
    productVersionSuggestions: getProductVersionSuggestions(state),
  }),
  dispatch => ({
    suggestProductVersions: payload => {dispatch(
      suggestProductVersions(payload))
    },
    clearSuggestions: payload => {dispatch(
      clearSuggestions(payload))
    },
  }),
)(_ProductVersion)


export const LOG_ERROR = 'LOG_ERROR'


export const SUGGEST_VENDOR_NAMES = 'SUGGEST_VENDOR_NAMES'
export const SUGGEST_PRODUCT_NAMES = 'SUGGEST_PRODUCT_NAMES'
export const SUGGEST_PRODUCT_VERSIONS = 'SUGGEST_PRODUCT_VERSIONS'


export const REFRESH_RISKS = 'REFRESH_RISKS'
export const REFRESH_RISK_METRICS = 'REFRESH_RISK_METRICS'


export const RESET_VENDOR_NAME_SUGGESTIONS = 'RESET_VENDOR_NAME_SUGGESTIONS'
export const RESET_PRODUCT_NAME_SUGGESTIONS = 'RESET_PRODUCT_NAME_SUGGESTIONS'
export const RESET_PRODUCT_VERSION_SUGGESTIONS = 'RESET_PRODUCT_VERSION_SUGGESTIONS'
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS'


export const RESET_RISKS = 'RESET_RISKS'
export const RESET_RISK_METRICS = 'RESET_RISK_METRICS'
export const SET_SORTED_RISKS = 'SET_SORTED_RISKS'


export const logError = payload => ({
  payload, type: LOG_ERROR})


export const suggestVendorNames = payload => ({
  payload, type: SUGGEST_VENDOR_NAMES})
export const suggestProductNames = payload => ({
  payload, type: SUGGEST_PRODUCT_NAMES})
export const suggestProductVersions = payload => ({
  payload, type: SUGGEST_PRODUCT_VERSIONS})


export const refreshRisks = payload => {
  if (!payload){
    payload = {}
  }
  return {payload, type: REFRESH_RISKS} 
}


export const resetVendorNameSuggestions = payload => ({
  payload, type: RESET_VENDOR_NAME_SUGGESTIONS})
export const resetProductNameSuggestions = payload => ({
  payload, type: RESET_PRODUCT_NAME_SUGGESTIONS})
export const resetProductVersionSuggestions = payload => ({
  payload, type: RESET_PRODUCT_VERSION_SUGGESTIONS})
export const clearSuggestions = payload => ({
  payload, type: CLEAR_SUGGESTIONS})


export const resetRisks = payload => ({
  payload, type: RESET_RISKS})


export const sortRisks = payload => ({
  payload, type: SET_SORTED_RISKS
})

export function* watchSuggestVendorNames() {
  yield takeLatest(SUGGEST_VENDOR_NAMES, function* (action) {
    const { typeId, vendorName } = action.payload
    if (!vendorName.trim()) {
      yield put(clearSuggestions())
      return
    }
    const url = '/risks/vendorNames.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (vendorNames) {
        yield put(resetVendorNameSuggestions(vendorNames))
      },
    })
  })
}


export function* watchSuggestProductNames() {
  yield takeLatest(SUGGEST_PRODUCT_NAMES, function* (action) {
    const { typeId, vendorName, productName } = action.payload
    const url = '/risks/productNames.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (productNames) {
        yield put(resetProductNameSuggestions(productNames))
      },
    })
  })
}


export function* watchSuggestProductVersions() {
  yield takeLatest(SUGGEST_PRODUCT_VERSIONS, function* (action) {
    const { typeId, vendorName, productName, productVersion } = action.payload
    const url = '/risks/productVersions.json'
    const params = [
      `typeId=${typeId}`,
      `vendorName=${vendorName}`,
      `productName=${productName}`,
      `productVersion=${productVersion}`,
    ]
    yield fetchSafely(url + '?' + params.join('&'), {}, {
      on200: function* (productVersions) {
        yield put(resetProductVersionSuggestions(productVersions))
      },
    })
  })
}


export function* watchRefreshRisks() {
  yield takeLatest(REFRESH_RISKS, function* (action) {
    const payload = action.payload
    const { sortKey, order } = payload
    const url = '/risks.json'
    if (false) {
        yield fetchSafely(url, {}, {
        on200: function* (risks) {
          yield put(resetRisks(risks))
        },
      })
    }
    else {
      const params = `?sort_key=${sortKey}&order=${order}`
      yield fetchSafely(url + params, {}, {
        on200: function* (risks) {
          const payload = Map({sortKey, order, risks})
          yield put(sortRisks(payload))
        },
      })
    }
  })
}


export function* fetchSafely(url, options, callbacks) {
  try {
    const response = yield call(fetch, url, options)
    const status = response.status
    const { on200, on400 } = callbacks
    if (on200 && status === 200) {
      yield on200(fromJS(yield response.json()))
    } else if (on400 && status === 400) {
      yield on400(fromJS(yield response.json()))
    } else {
      yield put(logError({ status }))
    }
  } catch (error) {
    yield put(logError({ text: error }))
  }
}


export const vendorNameSuggestions = (state = List(), action) => {
  switch (action.type) {
    case RESET_VENDOR_NAME_SUGGESTIONS: {
      const vendorNames = action.payload
      return vendorNames
    }
    case CLEAR_SUGGESTIONS: {
      return state.clear()
    }
    default: {
      return state
    }
  }
}


export const productNameSuggestions = (state = List(), action) => {
  switch (action.type) {
    case RESET_PRODUCT_NAME_SUGGESTIONS: {
      const productNames = action.payload
      return productNames
    }
    case CLEAR_SUGGESTIONS: {
      return state.clear()
    }
    default: {
      return state
    }
  }
}


export const productVersionSuggestions = (state = List(), action) => {
  switch (action.type) {
    case RESET_PRODUCT_VERSION_SUGGESTIONS: {
      const productVersions = action.payload
      return productVersions
    }
    case CLEAR_SUGGESTIONS: {
      return state.clear()
    }
    default: {
      return state
    }
  }
}


export const risks = (state = List(), action) => {
  switch (action.type) {
    case SET_SORTED_RISKS:
    case RESET_RISKS: {
      const risks = action.payload.get('risks')
      return risks
    }
    case SET_TASK: {
      const task = action.payload
      const taskAssetId = task.get('assetId')
      const taskReferenceUri = task.get('referenceUri')
      const taskId = task.get('id')
      const taskName = task.get('name')
      const taskStatus = task.get('status')
      return state.map(risk => {
        const riskAssetId = risk.get('assetId')
        const riskReferenceUri = risk.get('vulnerabilityUri')
        if (
          riskAssetId !== taskAssetId ||
          riskReferenceUri !== taskReferenceUri
        ) {
          return risk
        }
        return risk.merge({taskId, taskName, taskStatus})
      })
    }
    default: {
      return state
    }
  }
}


export const sortedRisks = (
  state = Map({sortKey: 'threat-score', order: 'desc'}), 
  action
) => {
 switch (action.type) {
    case SET_SORTED_RISKS: {
      const payload = action.payload
      const sortKey = payload.get('sortKey')
      const order = payload.get('order')
      return state.mergeDeep({sortKey, order})
    }
    default: {
      return state
    }
 }
}
