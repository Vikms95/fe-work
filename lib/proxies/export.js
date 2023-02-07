'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prefs = exports.Auth = exports.proxyResponse = undefined;

var _proxy = require('./proxy.js');

var _auth = require('./auth');

var Auth = _interopRequireWildcard(_auth);

var _prefs = require('./prefs');

var Prefs = _interopRequireWildcard(_prefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.proxyResponse = _proxy.proxyResponse;
exports.Auth = Auth;
exports.Prefs = Prefs;
exports.default = { proxyResponse: _proxy.proxyResponse, Auth: Auth, Prefs: Prefs };