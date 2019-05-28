"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductVersion = exports.ProductName = exports.VendorName = void 0;

var _react = _interopRequireWildcard(require("react"));

var _downshift = _interopRequireDefault(require("downshift"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

var VendorName =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VendorName, _PureComponent);

  function VendorName() {
    _classCallCheck(this, VendorName);

    return _possibleConstructorReturn(this, _getPrototypeOf(VendorName).apply(this, arguments));
  }

  _createClass(VendorName, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          value = _this$props.value,
          setValue = _this$props.setValue,
          saveValue = _this$props.saveValue;
      return _react["default"].createElement(_downshift["default"], {
        inputValue: value,
        onInputValueChange: function onInputValueChange(value) {
          setValue(value);
        },
        onChange: saveValue
      }, function (_ref) {
        var getInputProps = _ref.getInputProps,
            getMenuProps = _ref.getMenuProps,
            getItemProps = _ref.getItemProps,
            clearSelection = _ref.clearSelection,
            isOpen = _ref.isOpen;
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
        }, getMenuProps()), ['one', 'two'].map(function (suggestion) {
          return _react["default"].createElement(_MenuItem["default"], _extends({
            key: suggestion
          }, getItemProps({
            item: suggestion
          })), suggestion);
        })));
      });
    }
  }]);

  return VendorName;
}(_react.PureComponent);

exports.VendorName = VendorName;

var ProductName =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(ProductName, _PureComponent2);

  function ProductName() {
    _classCallCheck(this, ProductName);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductName).apply(this, arguments));
  }

  _createClass(ProductName, [{
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react["default"].createElement("div", {
        className: className
      }, "Product Name");
    }
  }]);

  return ProductName;
}(_react.PureComponent);

exports.ProductName = ProductName;

var ProductVersion =
/*#__PURE__*/
function (_PureComponent3) {
  _inherits(ProductVersion, _PureComponent3);

  function ProductVersion() {
    _classCallCheck(this, ProductVersion);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductVersion).apply(this, arguments));
  }

  _createClass(ProductVersion, [{
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react["default"].createElement("div", {
        className: className
      }, "Product Version");
    }
  }]);

  return ProductVersion;
}(_react.PureComponent);

exports.ProductVersion = ProductVersion;
