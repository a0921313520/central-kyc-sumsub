"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _websdk = _interopRequireDefault(require("@sumsub/websdk"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SumsubWeb = /*#__PURE__*/function (_Component) {
  function SumsubWeb(props) {
    var _this;
    _classCallCheck(this, SumsubWeb);
    _this = _callSuper(this, SumsubWeb, [props]);
    _defineProperty(_this, "openSumsub", function () {
      var _this$props = _this.props,
        _this$props$res = _this$props.res,
        res = _this$props$res === void 0 ? {
          token: 'token',
          theme: 'dark',
          lang: 'zh'
        } : _this$props$res,
        _this$props$tokenProm = _this$props.tokenPromise,
        tokenPromise = _this$props$tokenProm === void 0 ? function () {
          Promise.resolve('newAccessToken');
        } : _this$props$tokenProm,
        _this$props$callBack = _this$props.callBack,
        callBack = _this$props$callBack === void 0 ? function () {} : _this$props$callBack;
      var snsWebSdkInstance = _websdk["default"].init(res.token, tokenPromise).withConf({
        lang: res.lang,
        theme: res.theme
      }).withOptions({
        addViewportTag: false,
        adaptIframeHeight: true
      }).on("idCheck.onStepCompleted", function (payload) {
        callBack('onStepCompleted', payload);
      }).on("idCheck.onError", function (error) {
        callBack('onError', error);
      }).on("idCheck.onApplicantActionLoaded", function (res) {
        callBack('onApplicantActionLoaded', res);
      }).on("idCheck.onApplicantActionCompleted", function (res) {
        callBack('onApplicantActionCompleted', res);
      }).build();
      snsWebSdkInstance.launch("#sumsub-websdk-container");
    });
    return _this;
  }
  _inherits(SumsubWeb, _Component);
  return _createClass(SumsubWeb, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.openSumsub();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "sumsub-websdk-container"
      });
    }
  }]);
}(_react.Component);
var _default = exports["default"] = SumsubWeb;