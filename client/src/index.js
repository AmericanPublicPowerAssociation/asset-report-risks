import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { call, put, takeLatest } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { List, fromJS } from 'immutable'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AdapterLink = React.forwardRef((props, ref) =>
  <Link innerRef={ref} {...props} />)


export const getVendorNameSuggestions = state => state.get(
  'vendorNameSuggestions')
export const getProductNameSuggestions = state => state.get(
  'productNameSuggestions')
export const getProductVersionSuggestions = state => state.get(
  'productVersionSuggestions')
export const getVulnerableAssets = state => state.get(
  'vulnerableAssets')


export const getVulnerableAssetCount = createSelector([
  getVulnerableAssets,
], (
  vulnerableAssets,
  ) => vulnerableAssets.count())


class EnhancedInputWithoutStyles extends PureComponent {

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
                InputLabelProps={{ shrink: true }}
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
}))(EnhancedInputWithoutStyles)


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


class _VulnerabilitiesCardWithoutStyles extends PureComponent {
  render() {
    const {
      classes,
    } = this.props
    return (

      <Grid container spacing={3}>
        <Grid item xs>
          <Link
            underline='none'
            component={RouterLink}
            to='/reports/vulnerabilities'
          >
            <Card className={classes.card}>
              <CardActionArea className={classes.cardActionArea}>
                <Typography className={classes.title} align='center'>
                  Vulnerabilities
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>


    )
  }
}


const _VulnerabilitiesCard = withStyles(theme => ({
  card: {
    width: theme.spacing(32),
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    // width: theme.spacing(48),
    padding: theme.spacing(3),
  }

}))(_VulnerabilitiesCardWithoutStyles)


class _VulnerabilitiesFormDialogWithoutStyle extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }



  render() {
    const {
      classes
    } = this.props
    return (
      <div>
        <Tooltip title="Add" aria-label="add" onClick={this.handleClickOpen}>
          <Fab color="primary" >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
          <DialogTitle id="form-dialog-title">Notes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To solve this vulnerability issue, please enter your email address here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />

            <TextField
              id="outlined-full-width"
              label="Notes"
              type="search"
              style={{ margin: 2 }}
              placeholder="Write here"
              helperText=""
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.inputNote } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Create as a new record
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save notes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const _VulnerabilitiesFormDialog = withStyles(theme => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
},
  inputNote:{
    minHeight: '40vh',
    maxHeight: '40vh',
  }
}))(_VulnerabilitiesFormDialogWithoutStyle)

class _VulnerabilitiesWindow extends PureComponent {

  componentDidMount() {
    const { refreshVulnerableAssets } = this.props
    refreshVulnerableAssets()
  }

  render() {
    const { vulnerableAssets } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Meter Count</TableCell>
            <TableCell>Aggregated Threat</TableCell>
            <TableCell>Vulnerability</TableCell>
            <TableCell>Published</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerableAssets.map((asset, index) => {
            const assetName = asset.get('name')
            const meterCount = asset.get('meterCount')
            const threat = asset.get('threat')
            const description = asset.get('description')
            const url = asset.get('url')
            const date = asset.get('date')
            return (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>{assetName}</TableCell>
                <TableCell>{meterCount}</TableCell>
                <TableCell>{threat}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  <a target='_blank' rel='noopener noreferrer'
                    href={url}>{date}</a>
                </TableCell>
                <TableCell>Untreated</TableCell>
                <TableCell>
                  <_VulnerabilitiesFormDialog />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

}


export const VendorName = connect(
  state => ({
    vendorNameSuggestions: getVendorNameSuggestions(state),
  }),
  dispatch => ({
    suggestVendorNames: payload => {
      dispatch(
        suggestVendorNames(payload))
    },
    clearSuggestions: payload => {
      dispatch(
        clearSuggestions(payload))
    },
  }),
)(_VendorName)


export const ProductName = connect(
  state => ({
    productNameSuggestions: getProductNameSuggestions(state),
  }),
  dispatch => ({
    suggestProductNames: payload => {
      dispatch(
        suggestProductNames(payload))
    },
    clearSuggestions: payload => {
      dispatch(
        clearSuggestions(payload))
    },
  }),
)(_ProductName)


export const ProductVersion = connect(
  state => ({
    productVersionSuggestions: getProductVersionSuggestions(state),
  }),
  dispatch => ({
    suggestProductVersions: payload => {
      dispatch(
        suggestProductVersions(payload))
    },
    clearSuggestions: payload => {
      dispatch(
        clearSuggestions(payload))
    },
  }),
)(_ProductVersion)


export const VulnerabilitiesWindow = connect(
  state => ({
    vulnerableAssets: getVulnerableAssets(state),
  }),
  dispatch => ({
    refreshVulnerableAssets: payload => {
      dispatch(
        refreshVulnerableAssets(payload))
    },
  }),
)(_VulnerabilitiesWindow)


export const VulnerabilitiesCard = connect(
  state => ({
    // vulnerableAssetCount: getVulnerableAssetCount(state),
  }),
  dispatch => ({
  }),
)(_VulnerabilitiesCard)


export const LOG_ERROR = 'LOG_ERROR'


export const SUGGEST_VENDOR_NAMES = 'SUGGEST_VENDOR_NAMES'
export const SUGGEST_PRODUCT_NAMES = 'SUGGEST_PRODUCT_NAMES'
export const SUGGEST_PRODUCT_VERSIONS = 'SUGGEST_PRODUCT_VERSIONS'


export const REFRESH_VULNERABLE_ASSETS = 'REFRESH_VULNERABLE_ASSETS'


export const RESET_VENDOR_NAME_SUGGESTIONS = 'RESET_VENDOR_NAME_SUGGESTIONS'
export const RESET_PRODUCT_NAME_SUGGESTIONS = 'RESET_PRODUCT_NAME_SUGGESTIONS'
export const RESET_PRODUCT_VERSION_SUGGESTIONS = 'RESET_PRODUCT_VERSION_SUGGESTIONS'
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS'


export const RESET_VULNERABLE_ASSETS = 'RESET_VULNERABLE_ASSETS'


export const logError = payload => ({
  payload, type: LOG_ERROR
})


export const suggestVendorNames = payload => ({
  payload, type: SUGGEST_VENDOR_NAMES
})
export const suggestProductNames = payload => ({
  payload, type: SUGGEST_PRODUCT_NAMES
})
export const suggestProductVersions = payload => ({
  payload, type: SUGGEST_PRODUCT_VERSIONS
})


export const refreshVulnerableAssets = payload => ({
  payload, type: REFRESH_VULNERABLE_ASSETS
})


export const resetVendorNameSuggestions = payload => ({
  payload, type: RESET_VENDOR_NAME_SUGGESTIONS
})
export const resetProductNameSuggestions = payload => ({
  payload, type: RESET_PRODUCT_NAME_SUGGESTIONS
})
export const resetProductVersionSuggestions = payload => ({
  payload, type: RESET_PRODUCT_VERSION_SUGGESTIONS
})
export const clearSuggestions = payload => ({
  payload, type: CLEAR_SUGGESTIONS
})


export const resetVulnerableAssets = payload => ({
  payload, type: RESET_VULNERABLE_ASSETS
})


export function* watchSuggestVendorNames() {
  yield takeLatest(SUGGEST_VENDOR_NAMES, function* (action) {
    const { typeId, vendorName } = action.payload
    if (!vendorName.trim()) {
      yield put(clearSuggestions())
      return
    }
    const url = '/extensions/vulnerability/vendorNames.json'
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
    const url = '/extensions/vulnerability/productNames.json'
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
    const url = '/extensions/vulnerability/productVersions.json'
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


export function* watchRefreshVulnerableAssets() {
  yield takeLatest(REFRESH_VULNERABLE_ASSETS, function* (action) {
    const url = '/extensions/vulnerability/assets.json'
    yield fetchSafely(url, {}, {
      on200: function* (vulnerableAssets) {
        yield put(resetVulnerableAssets(vulnerableAssets))
      },
    })
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


export const vulnerableAssets = (state = List(), action) => {
  switch (action.type) {
    case RESET_VULNERABLE_ASSETS: {
      const vulnerableAssets = action.payload
      return vulnerableAssets
    }
    default: {
      return state
    }
  }
}
