"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSuggestVendorNames = watchSuggestVendorNames;
exports.watchSuggestProductNames = watchSuggestProductNames;
exports.watchSuggestProductVersions = watchSuggestProductVersions;
exports.watchRefreshRisks = watchRefreshRisks;
exports.fetchSafely = fetchSafely;
exports.sortedRisks = exports.risks = exports.productVersionSuggestions = exports.productNameSuggestions = exports.vendorNameSuggestions = exports.sortRisks = exports.setRisks = exports.clearSuggestions = exports.setProductVersionSuggestions = exports.setProductNameSuggestions = exports.setVendorNameSuggestions = exports.refreshRisks = exports.suggestProductVersions = exports.suggestProductNames = exports.suggestVendorNames = exports.logError = exports.SET_SORTED_RISKS = exports.SET_RISKS = exports.SET_TASK = exports.CLEAR_SUGGESTIONS = exports.SET_PRODUCT_VERSION_SUGGESTIONS = exports.SET_PRODUCT_NAME_SUGGESTIONS = exports.SET_VENDOR_NAME_SUGGESTIONS = exports.REFRESH_RISK_METRICS = exports.REFRESH_RISKS = exports.SUGGEST_PRODUCT_VERSIONS = exports.SUGGEST_PRODUCT_NAMES = exports.SUGGEST_VENDOR_NAMES = exports.LOG_ERROR = exports.ProductVersion = exports.ProductName = exports.VendorName = exports.RisksTable = exports.RisksCard = exports.getSortedRisks = exports.getRisks = exports.getProductVersionSuggestions = exports.getProductNameSuggestions = exports.getVendorNameSuggestions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _effects = require("redux-saga/effects");

var _downshift = _interopRequireDefault(require("downshift"));

var _styles = require("@material-ui/core/styles");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));

var _Build = _interopRequireDefault(require("@material-ui/icons/Build"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardActionArea = _interopRequireDefault(require("@material-ui/core/CardActionArea"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchSuggestVendorNames),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchSuggestProductNames),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watchSuggestProductVersions),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(watchRefreshRisks),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchSafely);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getVendorNameSuggestions = function getVendorNameSuggestions(state) {
  return state.vendorNameSuggestions;
};

exports.getVendorNameSuggestions = getVendorNameSuggestions;

var getProductNameSuggestions = function getProductNameSuggestions(state) {
  return state.productNameSuggestions;
};

exports.getProductNameSuggestions = getProductNameSuggestions;

var getProductVersionSuggestions = function getProductVersionSuggestions(state) {
  return state.productVersionSuggestions;
};

exports.getProductVersionSuggestions = getProductVersionSuggestions;

var getRisks = function getRisks(state) {
  return state.risks;
};

exports.getRisks = getRisks;

var getSortedRisks = function getSortedRisks(state) {
  return state.sortedRisks;
};

exports.getSortedRisks = getSortedRisks;

var _EnhancedInputWithoutStyles =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(_EnhancedInputWithoutStyles, _PureComponent);

  function _EnhancedInputWithoutStyles() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _EnhancedInputWithoutStyles);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_EnhancedInputWithoutStyles)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleStateChange", function (changes) {
      var _this$props = _this.props,
          attribute = _this$props.attribute,
          onSuggest = _this$props.onSuggest,
          trackChange = _this$props.trackChange;

      if (changes.hasOwnProperty('selectedItem')) {
        var value = changes.selectedItem;

        _this.saveChange(attribute, value);
      } else if (changes.type === _downshift["default"].stateChangeTypes.changeInput) {
        var _value = changes.inputValue;
        trackChange(attribute, _value);
        onSuggest(_value);
      } else if (changes.isOpen === false) {
        var _value2 = _this.props.value;

        _this.saveChange(attribute, _value2);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveChange", function (attribute, value) {
      var _this$props2 = _this.props,
          clearSuggestions = _this$props2.clearSuggestions,
          saveChange = _this$props2.saveChange,
          trackChange = _this$props2.trackChange;
      clearSuggestions();
      trackChange(attribute, value);
      saveChange && saveChange(attribute, value);
    });

    return _this;
  }

  _createClass(_EnhancedInputWithoutStyles, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          classes = _this$props3.classes,
          className = _this$props3.className,
          disabled = _this$props3.disabled,
          label = _this$props3.label,
          value = _this$props3.value,
          suggestions = _this$props3.suggestions;
      return _react["default"].createElement(_downshift["default"], {
        selectedItem: value,
        onStateChange: this.handleStateChange
      }, function (_ref) {
        var isOpen = _ref.isOpen,
            highlightedIndex = _ref.highlightedIndex,
            getMenuProps = _ref.getMenuProps,
            getInputProps = _ref.getInputProps,
            getItemProps = _ref.getItemProps,
            clearSelection = _ref.clearSelection;
        return _react["default"].createElement("div", {
          className: className
        }, _react["default"].createElement(_TextField["default"], {
          fullWidth: true,
          label: label,
          disabled: disabled,
          InputProps: getInputProps()
        }), isOpen && suggestions.length > 0 && _react["default"].createElement(_Paper["default"], _extends({
          className: classes.paper,
          square: true
        }, getMenuProps()), suggestions.map(function (suggestion, index) {
          var isHighlighted = highlightedIndex === index;
          return _react["default"].createElement(_MenuItem["default"], _extends({
            key: index,
            selected: isHighlighted
          }, getItemProps({
            item: suggestion
          })), suggestion);
        })));
      });
    }
  }]);

  return _EnhancedInputWithoutStyles;
}(_react.PureComponent);

var EnhancedInput = (0, _styles.withStyles)(function (theme) {
  return {
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: theme.spacing(1),
      right: theme.spacing(1)
    }
  };
})(_EnhancedInputWithoutStyles);

var _VendorName =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(_VendorName, _PureComponent2);

  function _VendorName() {
    _classCallCheck(this, _VendorName);

    return _possibleConstructorReturn(this, _getPrototypeOf(_VendorName).apply(this, arguments));
  }

  _createClass(_VendorName, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          disabled = _this$props4.disabled,
          typeCode = _this$props4.typeCode,
          vendorName = _this$props4.vendorName,
          trackChange = _this$props4.trackChange,
          saveChange = _this$props4.saveChange,
          vendorNameSuggestions = _this$props4.vendorNameSuggestions,
          suggestVendorNames = _this$props4.suggestVendorNames,
          clearSuggestions = _this$props4.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        disabled: disabled,
        label: "Vendor Name",
        attribute: "vendorName",
        value: vendorName,
        suggestions: vendorNameSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestVendorNames({
            typeCode: typeCode,
            vendorName: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChange: saveChange,
        trackChange: trackChange
      });
    }
  }]);

  return _VendorName;
}(_react.PureComponent);

var _ProductName =
/*#__PURE__*/
function (_PureComponent3) {
  _inherits(_ProductName, _PureComponent3);

  function _ProductName() {
    _classCallCheck(this, _ProductName);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductName).apply(this, arguments));
  }

  _createClass(_ProductName, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          className = _this$props5.className,
          disabled = _this$props5.disabled,
          typeCode = _this$props5.typeCode,
          vendorName = _this$props5.vendorName,
          productName = _this$props5.productName,
          trackChange = _this$props5.trackChange,
          saveChange = _this$props5.saveChange,
          productNameSuggestions = _this$props5.productNameSuggestions,
          suggestProductNames = _this$props5.suggestProductNames,
          clearSuggestions = _this$props5.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        disabled: disabled,
        label: "Product Name",
        attribute: "productName",
        value: productName,
        suggestions: productNameSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestProductNames({
            typeCode: typeCode,
            vendorName: vendorName,
            productName: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChange: saveChange,
        trackChange: trackChange
      });
    }
  }]);

  return _ProductName;
}(_react.PureComponent);

var _ProductVersion =
/*#__PURE__*/
function (_PureComponent4) {
  _inherits(_ProductVersion, _PureComponent4);

  function _ProductVersion() {
    _classCallCheck(this, _ProductVersion);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductVersion).apply(this, arguments));
  }

  _createClass(_ProductVersion, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          className = _this$props6.className,
          disabled = _this$props6.disabled,
          typeCode = _this$props6.typeCode,
          vendorName = _this$props6.vendorName,
          productName = _this$props6.productName,
          productVersion = _this$props6.productVersion,
          trackChange = _this$props6.trackChange,
          saveChange = _this$props6.saveChange,
          productVersionSuggestions = _this$props6.productVersionSuggestions,
          suggestProductVersions = _this$props6.suggestProductVersions,
          clearSuggestions = _this$props6.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        disabled: disabled,
        label: "Product Version",
        attribute: "productVersion",
        value: productVersion,
        suggestions: productVersionSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestProductVersions({
            typeCode: typeCode,
            vendorName: vendorName,
            productName: productName,
            productVersion: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChange: saveChange,
        trackChange: trackChange
      });
    }
  }]);

  return _ProductVersion;
}(_react.PureComponent);

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_TableCell["default"], null, "Threat Score");

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_TableCell["default"], null, "Risks");

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_TableCell["default"], null, "Impacted Meters");

var _RisksCardWithoutStyles =
/*#__PURE__*/
function (_PureComponent5) {
  _inherits(_RisksCardWithoutStyles, _PureComponent5);

  function _RisksCardWithoutStyles() {
    _classCallCheck(this, _RisksCardWithoutStyles);

    return _possibleConstructorReturn(this, _getPrototypeOf(_RisksCardWithoutStyles).apply(this, arguments));
  }

  _createClass(_RisksCardWithoutStyles, [{
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          classes = _this$props7.classes,
          to = _this$props7.to,
          values = _this$props7.values;
      var riskCount = values.riskCount,
          aggregatedThreatScore = values.aggregatedThreatScore,
          greatestThreatDescription = values.greatestThreatDescription,
          downstreamMeterPercent = values.downstreamMeterPercent;
      return _react["default"].createElement(_Link["default"], {
        underline: "none",
        component: _reactRouterDom.Link,
        to: to
      }, _react["default"].createElement(_Card["default"], {
        className: classes.card
      }, _react["default"].createElement(_CardActionArea["default"], {
        className: classes.cardActionArea
      }, _react["default"].createElement(_Typography["default"], {
        className: classes.title,
        align: "center"
      }, "Risks"), _react["default"].createElement(_Table["default"], {
        className: classes.section
      }, _react["default"].createElement(_TableBody["default"], null, _react["default"].createElement(_TableRow["default"], null, _ref2, _react["default"].createElement(_TableCell["default"], {
        align: "right"
      }, aggregatedThreatScore)), _react["default"].createElement(_TableRow["default"], null, _ref3, _react["default"].createElement(_TableCell["default"], {
        align: "right"
      }, riskCount)), _react["default"].createElement(_TableRow["default"], null, _ref4, _react["default"].createElement(_TableCell["default"], {
        align: "right"
      }, downstreamMeterPercent, "%")))), _react["default"].createElement(_Typography["default"], {
        className: classes.section
      }, greatestThreatDescription))));
    }
  }]);

  return _RisksCardWithoutStyles;
}(_react.PureComponent);

var RisksCard = (0, _styles.withStyles)(function (theme) {
  return {
    section: {
      marginTop: theme.spacing(3)
    },
    title: {
      fontSize: 24
    },
    card: {
      margin: theme.spacing(1)
    },
    cardActionArea: {
      padding: theme.spacing(3)
    }
  };
})(_RisksCardWithoutStyles);
exports.RisksCard = RisksCard;

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_TableCell["default"], {
  align: "center"
}, "Vulnerability");

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_TableCell["default"], {
  align: "center"
}, "Status");

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_Build["default"], null);

var _ref8 =
/*#__PURE__*/
_react["default"].createElement(_Check["default"], null);

var _RisksTableWithoutStyles =
/*#__PURE__*/
function (_PureComponent6) {
  _inherits(_RisksTableWithoutStyles, _PureComponent6);

  function _RisksTableWithoutStyles() {
    _classCallCheck(this, _RisksTableWithoutStyles);

    return _possibleConstructorReturn(this, _getPrototypeOf(_RisksTableWithoutStyles).apply(this, arguments));
  }

  _createClass(_RisksTableWithoutStyles, [{
    key: "getSortLabelDirection",
    value: function getSortLabelDirection(column, oldSortKey, oldOrder) {
      var order = 'desc';

      if (column === oldSortKey) {
        order = oldOrder;
      }

      return order;
    }
  }, {
    key: "getSortColumnIsActive",
    value: function getSortColumnIsActive(column, sortKey) {
      return column === sortKey;
    }
  }, {
    key: "onSortClick",
    value: function onSortClick(column, oldSortKey, oldOrder) {
      var order = 'desc';

      if (column === oldSortKey && oldOrder === 'desc') {
        order = 'asc';
      }

      this.props.refreshRisks({
        sortKey: column,
        order: order
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props8 = this.props,
          classes = _this$props8.classes,
          risks = _this$props8.risks,
          openTaskEditDialog = _this$props8.openTaskEditDialog,
          setEditingTaskValues = _this$props8.setEditingTaskValues,
          sortedRisks = _this$props8.sortedRisks;
      var sortKey = sortedRisks.sortKey,
          order = sortedRisks.order;
      return _react["default"].createElement(_Table["default"], null, _react["default"].createElement(_TableHead["default"], null, _react["default"].createElement(_TableRow["default"], null, _react["default"].createElement(_TableCell["default"], null, _react["default"].createElement(_TableSortLabel["default"], {
        active: this.getSortColumnIsActive('name', sortKey),
        onClick: function onClick() {
          return _this2.onSortClick('name', sortKey, order);
        },
        direction: this.getSortLabelDirection('name', sortKey, order)
      }, "Name")), _react["default"].createElement(_TableCell["default"], {
        align: "center"
      }, _react["default"].createElement(_TableSortLabel["default"], {
        active: this.getSortColumnIsActive('meter-count', sortKey),
        onClick: function onClick() {
          return _this2.onSortClick('meter-count', sortKey, order);
        },
        direction: this.getSortLabelDirection('meter-count', sortKey, order)
      }, "Meter Count")), _react["default"].createElement(_TableCell["default"], {
        align: "center"
      }, _react["default"].createElement(_TableSortLabel["default"], {
        active: this.getSortColumnIsActive('threat-score', sortKey),
        onClick: function onClick() {
          return _this2.onSortClick('threat-score', sortKey, order);
        },
        direction: this.getSortLabelDirection('threat-score', sortKey, order)
      }, "Aggregated Threat")), _ref5, _react["default"].createElement(_TableCell["default"], {
        align: "center"
      }, _react["default"].createElement(_TableSortLabel["default"], {
        active: this.getSortColumnIsActive('published', sortKey),
        onClick: function onClick() {
          return _this2.onSortClick('published', sortKey, order);
        },
        direction: this.getSortLabelDirection('published', sortKey, order)
      }, "Published")), _ref6)), _react["default"].createElement(_TableBody["default"], null, risks.map(function (risk, index) {
        var assetId = risk.assetId,
            assetName = risk.assetName,
            meterCount = risk.meterCount,
            threatScore = risk.threatScore,
            threatDescription = risk.threatDescription,
            vulnerabilityUri = risk.vulnerabilityUri,
            vulnerabilityUrl = risk.vulnerabilityUrl,
            vulnerabilityDate = risk.vulnerabilityDate,
            taskId = risk.taskId,
            taskStatus = risk.taskStatus,
            taskName = risk.taskName;
        var task = taskId ? {
          id: taskId,
          assetId: assetId,
          name: taskName,
          status: taskStatus,
          referenceUri: vulnerabilityUri
        } : {
          id: null,
          assetId: assetId,
          name: "Fix ".concat(vulnerabilityUrl),
          status: 0,
          referenceUri: vulnerabilityUri
        };
        var taskButtonTip = "".concat(taskId ? 'Edit' : 'Add', " Task");
        var taskButtonClassName = taskId ? {
          '-100': classes.taskCancelled,
          '0': classes.taskNew,
          '50': classes.taskPending,
          '100': classes.taskDone
        }[taskStatus] : classes.taskMissing;
        return _react["default"].createElement(_TableRow["default"], {
          key: index
        }, _react["default"].createElement(_TableCell["default"], {
          component: "th",
          scope: "row"
        }, assetName), _react["default"].createElement(_TableCell["default"], {
          align: "right"
        }, meterCount), _react["default"].createElement(_TableCell["default"], {
          align: "right"
        }, threatScore), _react["default"].createElement(_TableCell["default"], null, threatDescription), _react["default"].createElement(_TableCell["default"], null, _react["default"].createElement(_Link["default"], {
          target: "_blank",
          rel: "noopener noreferrer",
          href: '//' + vulnerabilityUrl
        }, vulnerabilityDate)), _react["default"].createElement(_TableCell["default"], {
          align: "center"
        }, _react["default"].createElement(_Tooltip["default"], {
          title: taskButtonTip
        }, _react["default"].createElement(_IconButton["default"], {
          className: taskButtonClassName,
          onClick: function onClick() {
            setEditingTaskValues(task);
            openTaskEditDialog();
          }
        }, taskStatus !== 100 ? _ref7 : _ref8))));
      })));
    }
  }]);

  return _RisksTableWithoutStyles;
}(_react.PureComponent);

var RisksTable = (0, _styles.withStyles)(function (theme) {
  return {
    taskMissing: {
      color: 'lightgrey'
    },
    taskCancelled: {
      backgroundColor: 'red',
      color: 'white'
    },
    taskNew: {
      color: 'black'
    },
    taskPending: {
      backgroundColor: 'yellow',
      color: 'black'
    },
    taskDone: {
      backgroundColor: 'green',
      color: 'white'
    }
  };
})(_RisksTableWithoutStyles);
exports.RisksTable = RisksTable;
var VendorName = (0, _reactRedux.connect)(function (state) {
  return {
    vendorNameSuggestions: getVendorNameSuggestions(state)
  };
}, function (dispatch) {
  return {
    suggestVendorNames: function suggestVendorNames(payload) {
      dispatch(_suggestVendorNames(payload));
    },
    clearSuggestions: function clearSuggestions(payload) {
      dispatch(_clearSuggestions(payload));
    }
  };
})(_VendorName);
exports.VendorName = VendorName;
var ProductName = (0, _reactRedux.connect)(function (state) {
  return {
    productNameSuggestions: getProductNameSuggestions(state)
  };
}, function (dispatch) {
  return {
    suggestProductNames: function suggestProductNames(payload) {
      dispatch(_suggestProductNames(payload));
    },
    clearSuggestions: function clearSuggestions(payload) {
      dispatch(_clearSuggestions(payload));
    }
  };
})(_ProductName);
exports.ProductName = ProductName;
var ProductVersion = (0, _reactRedux.connect)(function (state) {
  return {
    productVersionSuggestions: getProductVersionSuggestions(state)
  };
}, function (dispatch) {
  return {
    suggestProductVersions: function suggestProductVersions(payload) {
      dispatch(_suggestProductVersions(payload));
    },
    clearSuggestions: function clearSuggestions(payload) {
      dispatch(_clearSuggestions(payload));
    }
  };
})(_ProductVersion);
exports.ProductVersion = ProductVersion;
var LOG_ERROR = 'LOG_ERROR';
exports.LOG_ERROR = LOG_ERROR;
var SUGGEST_VENDOR_NAMES = 'SUGGEST_VENDOR_NAMES';
exports.SUGGEST_VENDOR_NAMES = SUGGEST_VENDOR_NAMES;
var SUGGEST_PRODUCT_NAMES = 'SUGGEST_PRODUCT_NAMES';
exports.SUGGEST_PRODUCT_NAMES = SUGGEST_PRODUCT_NAMES;
var SUGGEST_PRODUCT_VERSIONS = 'SUGGEST_PRODUCT_VERSIONS';
exports.SUGGEST_PRODUCT_VERSIONS = SUGGEST_PRODUCT_VERSIONS;
var REFRESH_RISKS = 'REFRESH_RISKS';
exports.REFRESH_RISKS = REFRESH_RISKS;
var REFRESH_RISK_METRICS = 'REFRESH_RISK_METRICS';
exports.REFRESH_RISK_METRICS = REFRESH_RISK_METRICS;
var SET_VENDOR_NAME_SUGGESTIONS = 'SET_VENDOR_NAME_SUGGESTIONS';
exports.SET_VENDOR_NAME_SUGGESTIONS = SET_VENDOR_NAME_SUGGESTIONS;
var SET_PRODUCT_NAME_SUGGESTIONS = 'SET_PRODUCT_NAME_SUGGESTIONS';
exports.SET_PRODUCT_NAME_SUGGESTIONS = SET_PRODUCT_NAME_SUGGESTIONS;
var SET_PRODUCT_VERSION_SUGGESTIONS = 'SET_PRODUCT_VERSION_SUGGESTIONS';
exports.SET_PRODUCT_VERSION_SUGGESTIONS = SET_PRODUCT_VERSION_SUGGESTIONS;
var CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
exports.CLEAR_SUGGESTIONS = CLEAR_SUGGESTIONS;
var SET_TASK = 'SET_TASK';
exports.SET_TASK = SET_TASK;
var SET_RISKS = 'SET_RISKS';
exports.SET_RISKS = SET_RISKS;
var SET_SORTED_RISKS = 'SET_SORTED_RISKS';
exports.SET_SORTED_RISKS = SET_SORTED_RISKS;

var logError = function logError(payload) {
  return {
    payload: payload,
    type: LOG_ERROR
  };
};

exports.logError = logError;

var _suggestVendorNames = function _suggestVendorNames(payload) {
  return {
    payload: payload,
    type: SUGGEST_VENDOR_NAMES
  };
};

exports.suggestVendorNames = _suggestVendorNames;

var _suggestProductNames = function _suggestProductNames(payload) {
  return {
    payload: payload,
    type: SUGGEST_PRODUCT_NAMES
  };
};

exports.suggestProductNames = _suggestProductNames;

var _suggestProductVersions = function _suggestProductVersions(payload) {
  return {
    payload: payload,
    type: SUGGEST_PRODUCT_VERSIONS
  };
};

exports.suggestProductVersions = _suggestProductVersions;

var refreshRisks = function refreshRisks(payload) {
  if (!payload) {
    payload = {};
  }

  return {
    payload: payload,
    type: REFRESH_RISKS
  };
};

exports.refreshRisks = refreshRisks;

var setVendorNameSuggestions = function setVendorNameSuggestions(payload) {
  return {
    payload: payload,
    type: SET_VENDOR_NAME_SUGGESTIONS
  };
};

exports.setVendorNameSuggestions = setVendorNameSuggestions;

var setProductNameSuggestions = function setProductNameSuggestions(payload) {
  return {
    payload: payload,
    type: SET_PRODUCT_NAME_SUGGESTIONS
  };
};

exports.setProductNameSuggestions = setProductNameSuggestions;

var setProductVersionSuggestions = function setProductVersionSuggestions(payload) {
  return {
    payload: payload,
    type: SET_PRODUCT_VERSION_SUGGESTIONS
  };
};

exports.setProductVersionSuggestions = setProductVersionSuggestions;

var _clearSuggestions = function _clearSuggestions(payload) {
  return {
    payload: payload,
    type: CLEAR_SUGGESTIONS
  };
};

exports.clearSuggestions = _clearSuggestions;

var setRisks = function setRisks(payload) {
  return {
    payload: payload,
    type: SET_RISKS
  };
};

exports.setRisks = setRisks;

var sortRisks = function sortRisks(payload) {
  return {
    payload: payload,
    type: SET_SORTED_RISKS
  };
};

exports.sortRisks = sortRisks;

function watchSuggestVendorNames() {
  return regeneratorRuntime.wrap(function watchSuggestVendorNames$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_VENDOR_NAMES,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(action) {
            var _action$payload, typeCode, vendorName, url, params;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _action$payload = action.payload, typeCode = _action$payload.typeCode, vendorName = _action$payload.vendorName;

                    if (vendorName.trim()) {
                      _context2.next = 5;
                      break;
                    }

                    _context2.next = 4;
                    return (0, _effects.put)(_clearSuggestions());

                  case 4:
                    return _context2.abrupt("return");

                  case 5:
                    url = '/risks/vendorNames.json';
                    params = ["typeCode=".concat(typeCode), "vendorName=".concat(vendorName)];
                    _context2.next = 9;
                    return fetchSafely(url + '?' + params.join('&'), {}, {
                      on200:
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function on200(vendorNames) {
                        return regeneratorRuntime.wrap(function on200$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return (0, _effects.put)(setVendorNameSuggestions(vendorNames));

                              case 2:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, on200);
                      })
                    });

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee);
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked);
}

function watchSuggestProductNames() {
  return regeneratorRuntime.wrap(function watchSuggestProductNames$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_PRODUCT_NAMES,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(action) {
            var _action$payload2, typeCode, vendorName, productName, url, params;

            return regeneratorRuntime.wrap(function _callee2$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _action$payload2 = action.payload, typeCode = _action$payload2.typeCode, vendorName = _action$payload2.vendorName, productName = _action$payload2.productName;
                    url = '/risks/productNames.json';
                    params = ["typeCode=".concat(typeCode), "vendorName=".concat(vendorName), "productName=".concat(productName)];
                    _context5.next = 5;
                    return fetchSafely(url + '?' + params.join('&'), {}, {
                      on200:
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function on200(productNames) {
                        return regeneratorRuntime.wrap(function on200$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return (0, _effects.put)(setProductNameSuggestions(productNames));

                              case 2:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, on200);
                      })
                    });

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee2);
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked2);
}

function watchSuggestProductVersions() {
  return regeneratorRuntime.wrap(function watchSuggestProductVersions$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_PRODUCT_VERSIONS,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(action) {
            var _action$payload3, typeCode, vendorName, productName, productVersion, url, params;

            return regeneratorRuntime.wrap(function _callee3$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _action$payload3 = action.payload, typeCode = _action$payload3.typeCode, vendorName = _action$payload3.vendorName, productName = _action$payload3.productName, productVersion = _action$payload3.productVersion;
                    url = '/risks/productVersions.json';
                    params = ["typeCode=".concat(typeCode), "vendorName=".concat(vendorName), "productName=".concat(productName), "productVersion=".concat(productVersion)];
                    _context8.next = 5;
                    return fetchSafely(url + '?' + params.join('&'), {}, {
                      on200:
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function on200(productVersions) {
                        return regeneratorRuntime.wrap(function on200$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                _context7.next = 2;
                                return (0, _effects.put)(setProductVersionSuggestions(productVersions));

                              case 2:
                              case "end":
                                return _context7.stop();
                            }
                          }
                        }, on200);
                      })
                    });

                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee3);
          }));

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked3);
}

function watchRefreshRisks() {
  return regeneratorRuntime.wrap(function watchRefreshRisks$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.takeLatest)(REFRESH_RISKS,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4(action) {
            var payload, sortKey, order, url, params;
            return regeneratorRuntime.wrap(function _callee4$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    payload = action.payload;
                    sortKey = payload.sortKey, order = payload.order;
                    url = '/risks.json';

                    if (!false) {
                      _context12.next = 8;
                      break;
                    }

                    _context12.next = 6;
                    return fetchSafely(url, {}, {
                      on200:
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function on200(risks) {
                        return regeneratorRuntime.wrap(function on200$(_context10) {
                          while (1) {
                            switch (_context10.prev = _context10.next) {
                              case 0:
                                _context10.next = 2;
                                return (0, _effects.put)(setRisks(risks));

                              case 2:
                              case "end":
                                return _context10.stop();
                            }
                          }
                        }, on200);
                      })
                    });

                  case 6:
                    _context12.next = 11;
                    break;

                  case 8:
                    params = "?sort_key=".concat(sortKey, "&order=").concat(order);
                    _context12.next = 11;
                    return fetchSafely(url + params, {}, {
                      on200:
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function on200(risks) {
                        var payload;
                        return regeneratorRuntime.wrap(function on200$(_context11) {
                          while (1) {
                            switch (_context11.prev = _context11.next) {
                              case 0:
                                payload = {
                                  sortKey: sortKey,
                                  order: order,
                                  risks: risks
                                };
                                _context11.next = 3;
                                return (0, _effects.put)(sortRisks(payload));

                              case 3:
                              case "end":
                                return _context11.stop();
                            }
                          }
                        }, on200);
                      })
                    });

                  case 11:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee4);
          }));

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked4);
}

function fetchSafely(url, options, callbacks) {
  var response, status, _on, on400;

  return regeneratorRuntime.wrap(function fetchSafely$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return (0, _effects.call)(fetch, url, options);

        case 3:
          response = _context14.sent;
          status = response.status;
          _on = callbacks.on200, on400 = callbacks.on400;

          if (!(_on && status === 200)) {
            _context14.next = 15;
            break;
          }

          _context14.t0 = _on;
          _context14.next = 10;
          return response.json();

        case 10:
          _context14.t1 = _context14.sent;
          _context14.next = 13;
          return (0, _context14.t0)(_context14.t1);

        case 13:
          _context14.next = 26;
          break;

        case 15:
          if (!(on400 && status === 400)) {
            _context14.next = 24;
            break;
          }

          _context14.t2 = on400;
          _context14.next = 19;
          return response.json();

        case 19:
          _context14.t3 = _context14.sent;
          _context14.next = 22;
          return (0, _context14.t2)(_context14.t3);

        case 22:
          _context14.next = 26;
          break;

        case 24:
          _context14.next = 26;
          return (0, _effects.put)(logError({
            status: status
          }));

        case 26:
          _context14.next = 32;
          break;

        case 28:
          _context14.prev = 28;
          _context14.t4 = _context14["catch"](0);
          _context14.next = 32;
          return (0, _effects.put)(logError({
            text: _context14.t4
          }));

        case 32:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked5, null, [[0, 28]]);
}

var vendorNameSuggestions = function vendorNameSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_VENDOR_NAME_SUGGESTIONS:
      {
        var vendorNames = action.payload;
        return vendorNames;
      }

    case CLEAR_SUGGESTIONS:
      {
        return [];
      }

    default:
      {
        return state;
      }
  }
};

exports.vendorNameSuggestions = vendorNameSuggestions;

var productNameSuggestions = function productNameSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PRODUCT_NAME_SUGGESTIONS:
      {
        var productNames = action.payload;
        return productNames;
      }

    case CLEAR_SUGGESTIONS:
      {
        return [];
      }

    default:
      {
        return state;
      }
  }
};

exports.productNameSuggestions = productNameSuggestions;

var productVersionSuggestions = function productVersionSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PRODUCT_VERSION_SUGGESTIONS:
      {
        var productVersions = action.payload;
        return productVersions;
      }

    case CLEAR_SUGGESTIONS:
      {
        return [];
      }

    default:
      {
        return state;
      }
  }
};

exports.productVersionSuggestions = productVersionSuggestions;

var risks = function risks() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_SORTED_RISKS:
    case SET_RISKS:
      {
        var _risks = action.payload.risks;
        return _risks;
      }

    case SET_TASK:
      {
        var task = action.payload;
        var taskAssetId = task.assetId;
        var taskReferenceUri = task.referenceUri;
        var taskId = task.id;
        var taskName = task.name;
        var taskStatus = task.status;
        return state.map(function (risk) {
          var riskAssetId = risk.assetId;
          var riskReferenceUri = risk.vulnerabilityUri;

          if (riskAssetId !== taskAssetId || riskReferenceUri !== taskReferenceUri) {
            return risk;
          }

          return _objectSpread({}, risk, {}, {
            taskId: taskId,
            taskName: taskName,
            taskStatus: taskStatus
          });
        });
      }

    default:
      {
        return state;
      }
  }
};

exports.risks = risks;

var sortedRisks = function sortedRisks() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    sortKey: 'threat-score',
    order: 'desc'
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_SORTED_RISKS:
      {
        var _action$payload4 = action.payload,
            sortKey = _action$payload4.sortKey,
            order = _action$payload4.order;
        return {
          sortKey: sortKey,
          order: order
        };
      }

    default:
      {
        return state;
      }
  }
};

exports.sortedRisks = sortedRisks;
