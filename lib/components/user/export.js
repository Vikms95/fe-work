"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterComponent = exports.LoginComponent = undefined;

var _loginComponent = require("./login-component");

var _loginComponent2 = _interopRequireDefault(_loginComponent);

var _registerComponent = require("./register-component");

var _registerComponent2 = _interopRequireDefault(_registerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LoginComponent = _loginComponent2.default;
exports.RegisterComponent = _registerComponent2.default;
exports.default = {
  LoginComponent: _loginComponent2.default,
  RegisterComponent: _registerComponent2.default
};