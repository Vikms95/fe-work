'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefsProxy = exports.getPrefsInfo = exports.setPrefsInfo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _proxy = require('./proxy.js');

var _auth = require('./auth');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prefsInfo = {};

function setPrefsInfo(_prefsInfo) {
  prefsInfo = _prefsInfo;
}

function getPrefsInfo() {
  return prefsInfo;
}

var PrefsProxy = function () {
  function PrefsProxy(host) {
    _classCallCheck(this, PrefsProxy);

    this.url = (host || '') + '/api/prefs';
  }

  _createClass(PrefsProxy, [{
    key: 'updatePreference',
    value: function updatePreference(p) {
      return (0, _proxy.proxyResponse)(fetch(this.url + '/updatePreference', (0, _auth.addOptionsAuth)({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })));
    }
  }]);

  return PrefsProxy;
}();

exports.setPrefsInfo = setPrefsInfo;
exports.getPrefsInfo = getPrefsInfo;
exports.PrefsProxy = PrefsProxy;
exports.default = { setPrefsInfo: setPrefsInfo, getPrefsInfo: getPrefsInfo, PrefsProxy: PrefsProxy };