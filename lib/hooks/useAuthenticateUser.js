'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.useAuthenticateUser = useAuthenticateUser;

var _react = require('react');

var _export = require('../proxies/export');

function useAuthenticateUser(state, projectActions) {
  var _useState = (0, _react.useState)('Nombre Apellido'),
      _useState2 = _slicedToArray(_useState, 2),
      nombre = _useState2[0],
      setNombre = _useState2[1];

  var callGetUser = function callGetUser() {
    var proxy = new _export.Auth.AutenticateProxy();
    return proxy.getUserAuthenticated().then(function (data) {
      return setNombre(data.name);
    });
  };

  (0, _react.useEffect)(function () {
    callGetUser();
  }, []);

  (0, _react.useEffect)(function () {
    var userAuthenticated = state.get('userAuthenticated');

    if (userAuthenticated) callGetUser().then(function (data) {
      return projectActions.SetUserAuthenticated(false);
    });
  }, [state]);

  return nombre;
}