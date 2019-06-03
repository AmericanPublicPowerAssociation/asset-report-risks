"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSuggestVendorNames = watchSuggestVendorNames;
exports.watchSuggestProductNames = watchSuggestProductNames;
exports.watchSuggestProductVersions = watchSuggestProductVersions;
exports.watchRefreshVulnerableAssets = watchRefreshVulnerableAssets;
exports.vulnerableAssets = exports.productVersionSuggestions = exports.productNameSuggestions = exports.vendorNameSuggestions = exports.replaceVulnerableAssets = exports.clearSuggestions = exports.replaceSuggestions = exports.refreshVulnerableAssets = exports.suggestProductVersions = exports.suggestProductNames = exports.suggestVendorNames = exports.logError = exports.REPLACE_VULNERABLE_ASSETS = exports.CLEAR_SUGGESTIONS = exports.REPLACE_SUGGESTIONS = exports.REFRESH_VULNERABLE_ASSETS = exports.SUGGEST_PRODUCT_VERSIONS = exports.SUGGEST_PRODUCT_NAMES = exports.SUGGEST_VENDOR_NAMES = exports.LOG_ERROR = exports.VulnerabilitiesWindow = exports.ProductVersion = exports.ProductName = exports.VendorName = exports.getVulnerableAssets = exports.getProductVersionSuggestions = exports.getProductNameSuggestions = exports.getVendorNameSuggestions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _downshift = _interopRequireDefault(require("downshift"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
regeneratorRuntime.mark(watchRefreshVulnerableAssets);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  return state.get('vendorNameSuggestions');
};

exports.getVendorNameSuggestions = getVendorNameSuggestions;

var getProductNameSuggestions = function getProductNameSuggestions(state) {
  return state.get('productNameSuggestions');
};

exports.getProductNameSuggestions = getProductNameSuggestions;

var getProductVersionSuggestions = function getProductVersionSuggestions(state) {
  return state.get('productVersionSuggestions');
};

exports.getProductVersionSuggestions = getProductVersionSuggestions;

var getVulnerableAssets = function getVulnerableAssets(state) {
  return state.get('vulnerableAssets');
};

exports.getVulnerableAssets = getVulnerableAssets;

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Clear["default"], null);

var EnhancedInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EnhancedInput, _PureComponent);

  function EnhancedInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EnhancedInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EnhancedInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleStateChange", function (changes) {
      var _this$props = _this.props,
          attribute = _this$props.attribute,
          onSuggest = _this$props.onSuggest,
          trackChanges = _this$props.trackChanges;

      if (changes.hasOwnProperty('selectedItem')) {
        var value = changes.selectedItem;

        _this.saveChanges(_defineProperty({}, attribute, value));
      } else if (changes.hasOwnProperty('inputValue')) {
        var _value = changes.inputValue;
        trackChanges(_defineProperty({}, attribute, _value));
        onSuggest(_value);
      } else if (changes.hasOwnProperty('isOpen')) {
        var _value2 = _this.props.value;

        _this.saveChanges(_defineProperty({}, attribute, _value2));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveChanges", function (attributes) {
      var _this$props2 = _this.props,
          clearSuggestions = _this$props2.clearSuggestions,
          saveChanges = _this$props2.saveChanges;
      clearSuggestions();
      saveChanges(attributes);
    });

    return _this;
  }

  _createClass(EnhancedInput, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          label = _this$props3.label,
          value = _this$props3.value,
          suggestions = _this$props3.suggestions;
      return _react["default"].createElement(_downshift["default"], {
        selectedItem: value,
        onStateChange: this.handleStateChange
      }, function (_ref) {
        var isOpen = _ref.isOpen,
            highlightedIndex = _ref.highlightedIndex,
            getInputProps = _ref.getInputProps,
            getMenuProps = _ref.getMenuProps,
            getItemProps = _ref.getItemProps,
            clearSelection = _ref.clearSelection;
        return _react["default"].createElement("div", {
          className: className
        }, _react["default"].createElement(_TextField["default"], {
          label: label,
          fullWidth: true,
          InputProps: getInputProps({
            endAdornment: _react["default"].createElement(_InputAdornment["default"], {
              position: "end"
            }, _react["default"].createElement(_IconButton["default"], {
              onClick: clearSelection
            }, _ref2))
          }),
          InputLabelProps: {
            shrink: true
          }
        }), isOpen && !suggestions.isEmpty() && _react["default"].createElement(_Paper["default"], _extends({
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

  return EnhancedInput;
}(_react.PureComponent);

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
          typeId = _this$props4.typeId,
          vendorName = _this$props4.vendorName,
          trackChanges = _this$props4.trackChanges,
          saveChanges = _this$props4.saveChanges,
          vendorNameSuggestions = _this$props4.vendorNameSuggestions,
          suggestVendorNames = _this$props4.suggestVendorNames,
          clearSuggestions = _this$props4.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        label: "Vendor Name",
        attribute: "vendorName",
        value: vendorName,
        suggestions: vendorNameSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestVendorNames({
            typeId: typeId,
            vendorName: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChanges: saveChanges,
        trackChanges: trackChanges
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
          typeId = _this$props5.typeId,
          vendorName = _this$props5.vendorName,
          productName = _this$props5.productName,
          trackChanges = _this$props5.trackChanges,
          saveChanges = _this$props5.saveChanges,
          productNameSuggestions = _this$props5.productNameSuggestions,
          suggestProductNames = _this$props5.suggestProductNames,
          clearSuggestions = _this$props5.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        label: "Product Name",
        attribute: "productName",
        value: productName,
        suggestions: productNameSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestProductNames({
            typeId: typeId,
            vendorName: vendorName,
            productName: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChanges: saveChanges,
        trackChanges: trackChanges
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
          typeId = _this$props6.typeId,
          vendorName = _this$props6.vendorName,
          productName = _this$props6.productName,
          productVersion = _this$props6.productVersion,
          trackChanges = _this$props6.trackChanges,
          saveChanges = _this$props6.saveChanges,
          productVersionSuggestions = _this$props6.productVersionSuggestions,
          suggestProductVersions = _this$props6.suggestProductVersions,
          clearSuggestions = _this$props6.clearSuggestions;
      return _react["default"].createElement(EnhancedInput, {
        className: className,
        label: "Product Version",
        attribute: "productVersion",
        value: productVersion,
        suggestions: productVersionSuggestions,
        onSuggest: function onSuggest(value) {
          return suggestProductVersions({
            typeId: typeId,
            vendorName: vendorName,
            productName: productName,
            productVersion: value
          });
        },
        clearSuggestions: clearSuggestions,
        saveChanges: saveChanges,
        trackChanges: trackChanges
      });
    }
  }]);

  return _ProductVersion;
}(_react.PureComponent);

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_TableHead["default"], null, _react["default"].createElement(_TableRow["default"], null, _react["default"].createElement(_TableCell["default"], null, "Name"), _react["default"].createElement(_TableCell["default"], null, "Meter Count"), _react["default"].createElement(_TableCell["default"], null, "Aggregated Threat"), _react["default"].createElement(_TableCell["default"], null, "Vulnerability"), _react["default"].createElement(_TableCell["default"], {
  align: "right"
}, "Published")));

var _VulnerabilitiesWindow =
/*#__PURE__*/
function (_PureComponent5) {
  _inherits(_VulnerabilitiesWindow, _PureComponent5);

  function _VulnerabilitiesWindow() {
    _classCallCheck(this, _VulnerabilitiesWindow);

    return _possibleConstructorReturn(this, _getPrototypeOf(_VulnerabilitiesWindow).apply(this, arguments));
  }

  _createClass(_VulnerabilitiesWindow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var refreshVulnerableAssets = this.props.refreshVulnerableAssets;
      refreshVulnerableAssets();
    }
  }, {
    key: "render",
    value: function render() {
      var vulnerableAssets = this.props.vulnerableAssets;
      return _react["default"].createElement(_Table["default"], null, _ref3, _react["default"].createElement(_TableBody["default"], null, vulnerableAssets.map(function (asset, index) {
        var assetName = asset.get('name');
        var meterCount = asset.get('meterCount');
        var threat = asset.get('threat');
        var description = asset.get('description');
        var url = asset.get('url');
        var date = asset.get('date');
        return _react["default"].createElement(_TableRow["default"], {
          key: index
        }, _react["default"].createElement(_TableCell["default"], {
          component: "th",
          scope: "row"
        }, assetName), _react["default"].createElement(_TableCell["default"], null, meterCount), _react["default"].createElement(_TableCell["default"], null, threat), _react["default"].createElement(_TableCell["default"], null, description), _react["default"].createElement(_TableCell["default"], {
          align: "right"
        }, _react["default"].createElement("a", {
          target: "_blank",
          rel: "noopener noreferrer",
          href: url
        }, date)));
      })));
    }
  }]);

  return _VulnerabilitiesWindow;
}(_react.PureComponent);

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
var VulnerabilitiesWindow = (0, _reactRedux.connect)(function (state) {
  return {
    vulnerableAssets: getVulnerableAssets(state)
  };
}, function (dispatch) {
  return {
    refreshVulnerableAssets: function refreshVulnerableAssets(payload) {
      dispatch(_refreshVulnerableAssets(payload));
    }
  };
})(_VulnerabilitiesWindow);
exports.VulnerabilitiesWindow = VulnerabilitiesWindow;
var LOG_ERROR = 'LOG_ERROR';
exports.LOG_ERROR = LOG_ERROR;
var SUGGEST_VENDOR_NAMES = 'SUGGEST_VENDOR_NAMES';
exports.SUGGEST_VENDOR_NAMES = SUGGEST_VENDOR_NAMES;
var SUGGEST_PRODUCT_NAMES = 'SUGGEST_PRODUCT_NAMES';
exports.SUGGEST_PRODUCT_NAMES = SUGGEST_PRODUCT_NAMES;
var SUGGEST_PRODUCT_VERSIONS = 'SUGGEST_PRODUCT_VERSIONS';
exports.SUGGEST_PRODUCT_VERSIONS = SUGGEST_PRODUCT_VERSIONS;
var REFRESH_VULNERABLE_ASSETS = 'REFRESH_VULNERABLE_ASSETS';
exports.REFRESH_VULNERABLE_ASSETS = REFRESH_VULNERABLE_ASSETS;
var REPLACE_SUGGESTIONS = 'REPLACE_SUGGESTIONS';
exports.REPLACE_SUGGESTIONS = REPLACE_SUGGESTIONS;
var CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
exports.CLEAR_SUGGESTIONS = CLEAR_SUGGESTIONS;
var REPLACE_VULNERABLE_ASSETS = 'REPLACE_VULNERABLE_ASSETS';
exports.REPLACE_VULNERABLE_ASSETS = REPLACE_VULNERABLE_ASSETS;

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

var _refreshVulnerableAssets = function _refreshVulnerableAssets(payload) {
  return {
    payload: payload,
    type: REFRESH_VULNERABLE_ASSETS
  };
};

exports.refreshVulnerableAssets = _refreshVulnerableAssets;

var replaceSuggestions = function replaceSuggestions(payload) {
  return {
    payload: payload,
    type: REPLACE_SUGGESTIONS
  };
};

exports.replaceSuggestions = replaceSuggestions;

var _clearSuggestions = function _clearSuggestions(payload) {
  return {
    payload: payload,
    type: CLEAR_SUGGESTIONS
  };
};

exports.clearSuggestions = _clearSuggestions;

var replaceVulnerableAssets = function replaceVulnerableAssets(payload) {
  return {
    payload: payload,
    type: REPLACE_VULNERABLE_ASSETS
  };
};

exports.replaceVulnerableAssets = replaceVulnerableAssets;

function watchSuggestVendorNames() {
  return regeneratorRuntime.wrap(function watchSuggestVendorNames$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_VENDOR_NAMES,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(action) {
            var _action$payload, typeId, vendorName, baseUrl, params, response, vendorNames;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _action$payload = action.payload, typeId = _action$payload.typeId, vendorName = _action$payload.vendorName;

                    if (vendorName.trim()) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 4;
                    return (0, _effects.put)(replaceSuggestions({
                      vendorNames: (0, _immutable.List)()
                    }));

                  case 4:
                    return _context.abrupt("return");

                  case 5:
                    baseUrl = '/extensions/vulnerabilities/vendorNames.json';
                    params = ["typeId=".concat(typeId), "vendorName=".concat(vendorName)];
                    _context.prev = 7;
                    _context.next = 10;
                    return (0, _effects.call)(fetch, baseUrl + '?' + params.join('&'));

                  case 10:
                    response = _context.sent;
                    _context.t0 = response.status;
                    _context.next = _context.t0 === 200 ? 14 : 22;
                    break;

                  case 14:
                    _context.t1 = _immutable.fromJS;
                    _context.next = 17;
                    return response.json();

                  case 17:
                    _context.t2 = _context.sent;
                    vendorNames = (0, _context.t1)(_context.t2);
                    _context.next = 21;
                    return (0, _effects.put)(replaceSuggestions({
                      vendorNames: vendorNames
                    }));

                  case 21:
                    return _context.abrupt("break", 24);

                  case 22:
                    _context.next = 24;
                    return (0, _effects.put)(logError({
                      status: response.status
                    }));

                  case 24:
                    _context.next = 30;
                    break;

                  case 26:
                    _context.prev = 26;
                    _context.t3 = _context["catch"](7);
                    _context.next = 30;
                    return (0, _effects.put)(logError({
                      text: _context.t3
                    }));

                  case 30:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[7, 26]]);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked);
}

function watchSuggestProductNames() {
  return regeneratorRuntime.wrap(function watchSuggestProductNames$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_PRODUCT_NAMES,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(action) {
            var _action$payload2, typeId, vendorName, productName, baseUrl, params, response, productNames;

            return regeneratorRuntime.wrap(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _action$payload2 = action.payload, typeId = _action$payload2.typeId, vendorName = _action$payload2.vendorName, productName = _action$payload2.productName;
                    baseUrl = '/extensions/vulnerabilities/productNames.json';
                    params = ["typeId=".concat(typeId), "vendorName=".concat(vendorName), "productName=".concat(productName)];
                    _context3.prev = 3;
                    _context3.next = 6;
                    return (0, _effects.call)(fetch, baseUrl + '?' + params.join('&'));

                  case 6:
                    response = _context3.sent;
                    _context3.t0 = response.status;
                    _context3.next = _context3.t0 === 200 ? 10 : 18;
                    break;

                  case 10:
                    _context3.t1 = _immutable.fromJS;
                    _context3.next = 13;
                    return response.json();

                  case 13:
                    _context3.t2 = _context3.sent;
                    productNames = (0, _context3.t1)(_context3.t2);
                    _context3.next = 17;
                    return (0, _effects.put)(replaceSuggestions({
                      productNames: productNames
                    }));

                  case 17:
                    return _context3.abrupt("break", 20);

                  case 18:
                    _context3.next = 20;
                    return (0, _effects.put)(logError({
                      status: response.status
                    }));

                  case 20:
                    _context3.next = 26;
                    break;

                  case 22:
                    _context3.prev = 22;
                    _context3.t3 = _context3["catch"](3);
                    _context3.next = 26;
                    return (0, _effects.put)(logError({
                      text: _context3.t3
                    }));

                  case 26:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee2, null, [[3, 22]]);
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked2);
}

function watchSuggestProductVersions() {
  return regeneratorRuntime.wrap(function watchSuggestProductVersions$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeLatest)(SUGGEST_PRODUCT_VERSIONS,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(action) {
            var _action$payload3, typeId, vendorName, productName, productVersion, baseUrl, params, response, productVersions;

            return regeneratorRuntime.wrap(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _action$payload3 = action.payload, typeId = _action$payload3.typeId, vendorName = _action$payload3.vendorName, productName = _action$payload3.productName, productVersion = _action$payload3.productVersion;
                    baseUrl = '/extensions/vulnerabilities/productVersions.json';
                    params = ["typeId=".concat(typeId), "vendorName=".concat(vendorName), "productName=".concat(productName), "productVersion=".concat(productVersion)];
                    _context5.prev = 3;
                    _context5.next = 6;
                    return (0, _effects.call)(fetch, baseUrl + '?' + params.join('&'));

                  case 6:
                    response = _context5.sent;
                    _context5.t0 = response.status;
                    _context5.next = _context5.t0 === 200 ? 10 : 18;
                    break;

                  case 10:
                    _context5.t1 = _immutable.fromJS;
                    _context5.next = 13;
                    return response.json();

                  case 13:
                    _context5.t2 = _context5.sent;
                    productVersions = (0, _context5.t1)(_context5.t2);
                    _context5.next = 17;
                    return (0, _effects.put)(replaceSuggestions({
                      productVersions: productVersions
                    }));

                  case 17:
                    return _context5.abrupt("break", 20);

                  case 18:
                    _context5.next = 20;
                    return (0, _effects.put)(logError({
                      status: response.status
                    }));

                  case 20:
                    _context5.next = 26;
                    break;

                  case 22:
                    _context5.prev = 22;
                    _context5.t3 = _context5["catch"](3);
                    _context5.next = 26;
                    return (0, _effects.put)(logError({
                      text: _context5.t3
                    }));

                  case 26:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee3, null, [[3, 22]]);
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked3);
}

function watchRefreshVulnerableAssets() {
  return regeneratorRuntime.wrap(function watchRefreshVulnerableAssets$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.takeLatest)(REFRESH_VULNERABLE_ASSETS,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4(action) {
            var response, _vulnerableAssets;

            return regeneratorRuntime.wrap(function _callee4$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return (0, _effects.call)(fetch, '/extensions/vulnerabilities.json');

                  case 3:
                    response = _context7.sent;
                    _context7.t0 = response.status;
                    _context7.next = _context7.t0 === 200 ? 7 : 15;
                    break;

                  case 7:
                    _context7.t1 = _immutable.fromJS;
                    _context7.next = 10;
                    return response.json();

                  case 10:
                    _context7.t2 = _context7.sent;
                    _vulnerableAssets = (0, _context7.t1)(_context7.t2);
                    _context7.next = 14;
                    return (0, _effects.put)(replaceVulnerableAssets(_vulnerableAssets));

                  case 14:
                    return _context7.abrupt("break", 17);

                  case 15:
                    _context7.next = 17;
                    return (0, _effects.put)(logError({
                      status: response.status
                    }));

                  case 17:
                    _context7.next = 23;
                    break;

                  case 19:
                    _context7.prev = 19;
                    _context7.t3 = _context7["catch"](0);
                    _context7.next = 23;
                    return (0, _effects.put)(logError({
                      text: _context7.t3
                    }));

                  case 23:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee4, null, [[0, 19]]);
          }));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked4);
}

var vendorNameSuggestions = function vendorNameSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REPLACE_SUGGESTIONS:
      {
        var vendorNames = action.payload.vendorNames;
        return state.withMutations(function (state) {
          state.clear();
          state.concat(vendorNames);
        });
      }

    case CLEAR_SUGGESTIONS:
      {
        return state.clear();
      }

    default:
      {
        return state;
      }
  }
};

exports.vendorNameSuggestions = vendorNameSuggestions;

var productNameSuggestions = function productNameSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REPLACE_SUGGESTIONS:
      {
        var productNames = action.payload.productNames;
        return state.withMutations(function (state) {
          state.clear();
          state.concat(productNames);
        });
      }

    case CLEAR_SUGGESTIONS:
      {
        return state.clear();
      }

    default:
      {
        return state;
      }
  }
};

exports.productNameSuggestions = productNameSuggestions;

var productVersionSuggestions = function productVersionSuggestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REPLACE_SUGGESTIONS:
      {
        var productVersions = action.payload.productVersions;
        return state.withMutations(function (state) {
          state.clear();
          state.concat(productVersions);
        });
      }

    case CLEAR_SUGGESTIONS:
      {
        return state.clear();
      }

    default:
      {
        return state;
      }
  }
};

exports.productVersionSuggestions = productVersionSuggestions;

var vulnerableAssets = function vulnerableAssets() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REPLACE_VULNERABLE_ASSETS:
      {
        var _vulnerableAssets2 = action.payload;
        return state.withMutations(function (state) {
          state.clear();
          state.concat(_vulnerableAssets2);
        });
      }

    default:
      {
        return state;
      }
  }
};

exports.vulnerableAssets = vulnerableAssets;
