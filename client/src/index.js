import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { call, put, takeLatest } from 'redux-saga/effects'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Check'
import FixIcon from '@material-ui/icons/Build'
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

export const getVendorNameSuggestions = state => state.vendorNameSuggestions
export const getProductNameSuggestions = state => state.productNameSuggestions
export const getProductVersionSuggestions = state => state.productVersionSuggestions
export const getRisks = state => state.risks
export const getSortedRisks = state => state.sortedRisks

class _EnhancedInputWithoutStyles extends PureComponent {

  handleStateChange = changes => {
    const {
      attribute,
      onSuggest,
      trackChange,
    } = this.props

    if (changes.hasOwnProperty('selectedItem')) {
      const value = changes.selectedItem
      this.saveChange(attribute, value)
    } else if (changes.type === Downshift.stateChangeTypes.changeInput) {
      const value = changes.inputValue
      trackChange(attribute, value)
      onSuggest(value)
    } else if (changes.isOpen === false) {
      const value = this.props.value
      this.saveChange(attribute, value)
    }
  }

  saveChange = (attribute, value) => {
    const {
      clearSuggestions,
      saveChange,
      trackChange,
    } = this.props
    clearSuggestions()
    trackChange(attribute, value)
    saveChange(attribute, value)
  }

  render() {
    const {
      classes,
      className,
      label,
      value,
      suggestions,
      disableTextInput,
    } = this.props
    return (
      <Downshift selectedItem={value} onStateChange={this.handleStateChange}>
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
                fullWidth
                label={label}
                disabled={disableTextInput}
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
      trackChange,
      saveChange,
      disableTextInput,
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
        saveChange={saveChange}
        trackChange={trackChange}
        disableTextInput={disableTextInput}
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
      trackChange,
      saveChange,
      // Get redux variables
      productNameSuggestions,
      suggestProductNames,
      clearSuggestions,
      disableTextInput
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
        saveChange={saveChange}
        trackChange={trackChange}
        disableTextInput={disableTextInput}
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
      trackChange,
      saveChange,
      // Get redux variables
      productVersionSuggestions,
      suggestProductVersions,
      clearSuggestions,
      disableTextInput,
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
        saveChange={saveChange}
        trackChange={trackChange}
        disableTextInput={disableTextInput}
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
    const {
      riskCount,
      aggregatedThreatScore,
      greatestThreatDescription,
      downstreamMeterPercent,
    } = values
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
  getSortLabelDirection(column, oldSortKey, oldOrder) {
    let order = 'desc'
    if (column === oldSortKey) {
      order = oldOrder
    }
    return order
  }

  getSortColumnIsActive(column, sortKey) {
    return column === sortKey
  }

  onSortClick(column, oldSortKey, oldOrder) {
    let order = 'desc'
    if (column === oldSortKey && oldOrder === 'desc') {
      order = 'asc'
    }
    this.props.refreshRisks({sortKey:column, order})
  }

  render() {
    const {
      classes,
      risks,
      openTaskEditDialog,
      setEditingTaskValues,
      sortedRisks,
    } = this.props
    const {sortKey, order} = sortedRisks
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
                direction={this.getSortLabelDirection('meter-count', sortKey, order)}>

                Meter Count
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={this.getSortColumnIsActive('threat-score', sortKey)}
                onClick={ () => this.onSortClick('threat-score', sortKey, order)}
                direction={this.getSortLabelDirection('threat-score', sortKey, order)}>
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
                direction={this.getSortLabelDirection('published', sortKey, order)}>
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
            const {
              assetId,
              assetName,
              meterCount,
              threatScore,
              threatDescription,
              vulnerabilityUri,
              vulnerabilityUrl,
              vulnerabilityDate,
              taskId,
              taskStatus,
              taskName,
            } = risk
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
                  <Tooltip title={taskButtonTip}>
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

export const SET_VENDOR_NAME_SUGGESTIONS = 'SET_VENDOR_NAME_SUGGESTIONS'
export const SET_PRODUCT_NAME_SUGGESTIONS = 'SET_PRODUCT_NAME_SUGGESTIONS'
export const SET_PRODUCT_VERSION_SUGGESTIONS = 'SET_PRODUCT_VERSION_SUGGESTIONS'
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS'

export const SET_TASK = 'SET_TASK'

export const SET_RISKS = 'SET_RISKS'
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

export const setVendorNameSuggestions = payload => ({
  payload, type: SET_VENDOR_NAME_SUGGESTIONS})
export const setProductNameSuggestions = payload => ({
  payload, type: SET_PRODUCT_NAME_SUGGESTIONS})
export const setProductVersionSuggestions = payload => ({
  payload, type: SET_PRODUCT_VERSION_SUGGESTIONS})
export const clearSuggestions = payload => ({
  payload, type: CLEAR_SUGGESTIONS})

export const setRisks = payload => ({
  payload, type: SET_RISKS})

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
        yield put(setVendorNameSuggestions(vendorNames))
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
        yield put(setProductNameSuggestions(productNames))
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
        yield put(setProductVersionSuggestions(productVersions))
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
          yield put(setRisks(risks))
        },
      })
    }
    else {
      const params = `?sort_key=${sortKey}&order=${order}`
      yield fetchSafely(url + params, {}, {
        on200: function* (risks) {
          const payload = {sortKey, order, risks}
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
      yield on200(yield response.json())
    } else if (on400 && status === 400) {
      yield on400(yield response.json())
    } else {
      yield put(logError({ status }))
    }
  } catch (error) {
    yield put(logError({ text: error }))
  }
}

export const vendorNameSuggestions = (state=[], action) => {
  switch(action.type) {
    case SET_VENDOR_NAME_SUGGESTIONS: {
      const vendorNames = action.payload
      return vendorNames
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const productNameSuggestions = (state=[], action) => {
  switch (action.type) {
    case SET_PRODUCT_NAME_SUGGESTIONS: {
      const productNames = action.payload
      return productNames
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const productVersionSuggestions = (state=[], action) => {
  switch(action.type) {
    case SET_PRODUCT_VERSION_SUGGESTIONS: {
      const productVersions = action.payload
      return productVersions
    }
    case CLEAR_SUGGESTIONS: {
      return []
    }
    default: {
      return state
    }
  }
}

export const risks = (state=[], action) => {
  switch (action.type) {
    case SET_SORTED_RISKS:
    case SET_RISKS: {
      const { risks } = action.payload
      return risks
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
        return {...risk, ...{taskId, taskName, taskStatus}}
      })
    }
    default: {
      return state
    }
  }
}

export const sortedRisks = (
  state = {sortKey: 'threat-score', order: 'desc'},
  action,
) => {
 switch (action.type) {
    case SET_SORTED_RISKS: {
      const { sortKey, order } = action.payload
      return { sortKey, order }
    }
    default: {
      return state
    }
 }
}
