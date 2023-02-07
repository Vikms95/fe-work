var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { proxyResponse } from './proxy.js';

var tokenKey = 'access_token';
var rememberSessionKey = "remember_session";

function setAuthToken(token) {
  sessionStorage.setItem(tokenKey, token);
}
function cleanAuthToken() {
  sessionStorage.removeItem(tokenKey);
}

function setRememberSession(token) {
  localStorage.setItem(rememberSessionKey, token);
}
function cleanRememberSession() {
  localStorage.removeItem(rememberSessionKey);
}

function getParamsForNewSession() {
  var p = {};
  var token = localStorage.getItem(rememberSessionKey);

  if (token) p.rememberToken = token;

  return p;
}

function setRemeberSession() {
  var token = localStorage.getItem(rememberSessionKey);

  if (!token) cleanAuthToken();else setAuthToken(token);
}

function addOptionsAuth(p) {
  var p1 = p || {};
  var token = sessionStorage.getItem(tokenKey);

  if (token != null) {
    if (!p1.headers) p1.headers = {};
    p1.headers.Authorization = 'Ninpo ' + token;
  }

  return p1;
}

var AutenticateProxy = function () {
  function AutenticateProxy(host) {
    _classCallCheck(this, AutenticateProxy);

    this.url = (host || '') + '/api/auth';
  }

  _createClass(AutenticateProxy, [{
    key: 'isAutenticated',
    value: function isAutenticated() {
      return proxyResponse(fetch(this.url + '/isAuthenticated', addOptionsAuth()));
    }
  }, {
    key: 'getUserAuthenticated',
    value: function getUserAuthenticated() {
      return proxyResponse(fetch(this.url + '/getUserAuthenticated', addOptionsAuth()));
    }
  }, {
    key: 'newSession',
    value: function newSession() {
      setRemeberSession();

      return proxyResponse(fetch(this.url + '/newSession', addOptionsAuth())).
      //let p = getParamsForNewSession();

      //return proxyResponse(fetch(this.url + '/newSession', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } }))).
      then(function (data) {
        if (data.token) setAuthToken(data.token);
        if (data.cleanRembemberToken) cleanRememberSession();

        return data;
      });
    }
  }, {
    key: 'autenticate',
    value: function autenticate(p) {
      return proxyResponse(fetch(this.url + '/authenticate', { method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })).then(function (data) {
        if (data.token) setAuthToken(data.token);
        if (data.rememberToken) setRememberSession(data.rememberToken);

        return data;
      });
    }
  }, {
    key: 'register',
    value: function register(p) {
      return proxyResponse(fetch(this.url + '/register', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })));
    }
  }, {
    key: 'logOff',
    value: function logOff() {
      cleanAuthToken();
    }
  }]);

  return AutenticateProxy;
}();

export { setAuthToken, cleanAuthToken, addOptionsAuth, setRememberSession, cleanRememberSession, AutenticateProxy };
export default { setAuthToken: setAuthToken, cleanAuthToken: cleanAuthToken, setRememberSession: setRememberSession, cleanRememberSession: cleanRememberSession, addOptionsAuth: addOptionsAuth, AutenticateProxy: AutenticateProxy };