"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSuggestVendorNames = watchSuggestVendorNames;
exports.productVersionSuggestions = exports.productNameSuggestions = exports.vendorNameSuggestions = exports.replaceSuggestions = exports.suggestProductVersions = exports.suggestProductNames = exports.suggestVendorNames = exports.logError = exports.REPLACE_SUGGESTIONS = exports.SUGGEST_PRODUCT_VERSIONS = exports.SUGGEST_PRODUCT_NAMES = exports.SUGGEST_VENDOR_NAMES = exports.LOG_ERROR = exports.ProductVersion = exports.ProductName = exports.VendorName = exports.getProductVersionSuggestions = exports.getProductNameSuggestions = exports.getVendorNameSuggestions = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchSuggestVendorNames);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var _VendorName =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(_VendorName, _PureComponent);

  function _VendorName() {
    _classCallCheck(this, _VendorName);

    return _possibleConstructorReturn(this, _getPrototypeOf(_VendorName).apply(this, arguments));
  }

  _createClass(_VendorName, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          typeId = _this$props.typeId,
          vendorName = _this$props.vendorName,
          trackChanges = _this$props.trackChanges,
          saveChanges = _this$props.saveChanges,
          vendorNameSuggestions = _this$props.vendorNameSuggestions,
          suggestVendorNames = _this$props.suggestVendorNames;
      return _react["default"].createElement(_downshift["default"], {
        selectedItem: vendorName,
        onStateChange: function onStateChange(changes) {
          if (changes.hasOwnProperty('selectedItem')) {
            var value = changes.selectedItem;
            saveChanges({
              vendorName: value
            });
          } else if (changes.hasOwnProperty('inputValue')) {
            var _value = changes.inputValue;
            trackChanges({
              vendorName: _value
            });
            suggestVendorNames({
              typeId: typeId,
              vendorName: _value
            });
          } else if (changes.hasOwnProperty('isOpen')) {
            saveChanges();
          }
        }
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
          label: "Vendor Name",
          fullWidth: true,
          InputProps: getInputProps({
            endAdornment: _react["default"].createElement(_InputAdornment["default"], {
              position: "end"
            }, _react["default"].createElement(_IconButton["default"], {
              onClick: function onClick() {
                return clearSelection();
              }
            }, _react["default"].createElement(_Clear["default"], null)))
          }),
          InputLabelProps: {
            shrink: true
          }
        }), isOpen && _react["default"].createElement(_Paper["default"], _extends({
          square: true
        }, getMenuProps()), vendorNameSuggestions.map(function (suggestion, index) {
          var isHighlighted = highlightedIndex === index;
          return _react["default"].createElement(_MenuItem["default"], _extends({
            key: suggestion,
            selected: isHighlighted
          }, getItemProps({
            item: suggestion
          })), suggestion);
        })));
      });
    }
  }]);

  return _VendorName;
}(_react.PureComponent);

var _ProductName =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(_ProductName, _PureComponent2);

  function _ProductName() {
    _classCallCheck(this, _ProductName);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductName).apply(this, arguments));
  }

  _createClass(_ProductName, [{
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react["default"].createElement("div", {
        className: className
      }, "Product Name");
    }
  }]);

  return _ProductName;
}(_react.PureComponent);

var _ProductVersion =
/*#__PURE__*/
function (_PureComponent3) {
  _inherits(_ProductVersion, _PureComponent3);

  function _ProductVersion() {
    _classCallCheck(this, _ProductVersion);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductVersion).apply(this, arguments));
  }

  _createClass(_ProductVersion, [{
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react["default"].createElement("div", {
        className: className
      }, "Product Version");
    }
  }]);

  return _ProductVersion;
}(_react.PureComponent);

var VendorName = (0, _reactRedux.connect)(function (state) {
  return {
    vendorNameSuggestions: getVendorNameSuggestions(state)
  };
}, function (dispatch) {
  return {
    suggestVendorNames: function suggestVendorNames(payload) {
      dispatch(_suggestVendorNames(payload));
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
var REPLACE_SUGGESTIONS = 'REPLACE_SUGGESTIONS';
exports.REPLACE_SUGGESTIONS = REPLACE_SUGGESTIONS;

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

var replaceSuggestions = function replaceSuggestions(payload) {
  return {
    payload: payload,
    type: REPLACE_SUGGESTIONS
  };
};

exports.replaceSuggestions = replaceSuggestions;

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

    default:
      {
        return state;
      }
  }
};

exports.productVersionSuggestions = productVersionSuggestions;
