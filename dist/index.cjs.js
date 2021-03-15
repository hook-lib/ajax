'use strict';

require('core-js/modules/es.reflect.construct.js');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
require('core-js/modules/es.object.assign.js');
var axios = require('axios');
var Hook = require('@hook/hook');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Hook__default = /*#__PURE__*/_interopDefaultLegacy(Hook);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
axios__default['default'].defaults.withCredentials = true;

var Ajax = /*#__PURE__*/function (_Hook) {
  _inherits__default['default'](Ajax, _Hook);

  var _super = _createSuper(Ajax);

  function Ajax(options) {
    var _this;

    _classCallCheck__default['default'](this, Ajax);

    _this = _super.call(this, options);
    _this._ajaxable = true;
    _this._abortable = false;
    var config = Object.assign({
      abortable: true
    }, options);

    if (config.abortable) {
      _this.abortable();
    }

    return _this;
  }

  _createClass__default['default'](Ajax, [{
    key: "config",
    value: function config(key, value) {
      return this.generateSetter('config')(key, value);
    }
  }, {
    key: "getConfig",
    value: function getConfig(field) {
      return this.generateGetter('config')(field);
    }
  }, {
    key: "params",
    value: function params(key, value) {
      return this.generateSetter('params')(key, value);
    }
  }, {
    key: "getParams",
    value: function getParams(field) {
      return this.generateGetter('params')(field);
    }
  }, {
    key: "method",
    value: function method(_method) {
      this.config('method', _method);
      return this;
    }
  }, {
    key: "url",
    value: function url(_url) {
      this.config('url', _url);
      return this;
    }
  }, {
    key: "abortable",
    value: function abortable() {
      var CancelToken = axios__default['default'].CancelToken;
      var source = CancelToken.source();
      this._abortable = source;
      this.config('cancelSource', source);
      this.config('cancelToken', source.token);
      return this;
    }
  }, {
    key: "abort",
    value: function abort(message) {
      var source = this._abortable;

      if (source) {
        source.cancel(message);
      }

      this.emit('netAbort', message, source);
      return this;
    }
  }, {
    key: "isAbortable",
    value: function isAbortable() {
      return !!this._abortable;
    }
  }, {
    key: "disable",
    value: function disable() {
      this._ajaxable = false;
      return this;
    }
  }, {
    key: "enable",
    value: function enable() {
      this._ajaxable = true;
      return this;
    }
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      return this._ajaxable === false;
    }
  }, {
    key: "convertResponse",
    value: function convertResponse(res) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
        return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", res.data);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }
  }, {
    key: "convertError",
    value: function convertError(error) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2() {
        return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", error);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }, {
    key: "fetch",
    value: function fetch() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5() {
        var _this2 = this;

        var config, method;
        return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._ajaxable) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this);

              case 2:
                _context5.next = 4;
                return this.emit('netRequest');

              case 4:
                config = this.getConfig();
                method = (config.method || 'get').toUpperCase();

                if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
                  this.config({
                    data: this.getParams()
                  });
                } else {
                  this.config({
                    params: this.getParams()
                  });
                }

                _context5.next = 9;
                return axios__default['default'].request(this.getConfig()).then(function (res) {
                  return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3() {
                    var convertedData;
                    return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return this.convertResponse(res);

                          case 2:
                            convertedData = _context3.sent;
                            _context3.next = 5;
                            return this.emit('netResponse', true, res);

                          case 5:
                            _context3.next = 7;
                            return this.emit('netSuccess', convertedData, res);

                          case 7:
                            _context3.next = 9;
                            return this.emit('netCompleted', true, res);

                          case 9:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));
                })["catch"](function (error) {
                  return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4() {
                    var convertedError;
                    return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return this.convertError(error);

                          case 2:
                            convertedError = _context4.sent;
                            _context4.next = 5;
                            return this.emit('netResponse', false, error);

                          case 5:
                            _context4.next = 7;
                            return this.emit('netError', convertedError, error);

                          case 7:
                            _context4.next = 9;
                            return this.emit('netCompleted', false, error);

                          case 9:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this);
                  }));
                });

              case 9:
                return _context5.abrupt("return", this);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }], [{
    key: "create",
    value: function create(url, method, options) {
      var ajax = new this(options);
      ajax.url(url).method(method);
      return ajax;
    }
  }]);

  return Ajax;
}(Hook__default['default']);
Ajax.axios = axios__default['default'];

module.exports = Ajax;
//# sourceMappingURL=index.cjs.js.map
