'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextProvider = exports.ContextConsumer = exports.Context = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import Catalog from '../catalog/catalog';


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _translator = require('../translator/translator');

var _translator2 = _interopRequireDefault(_translator);

var _react = require('react');

var _objectsUtils = require('../utils/objects-utils');

var _export = require('../actions/export');

var _export2 = _interopRequireDefault(_export);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = exports.Context = (0, _react.createContext)(_extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function () {
  return _propTypes2.default.object;
}), {
  translator: new _translator2.default(),
  catalog: {}
}));

var ContextConsumer = exports.ContextConsumer = Context.Consumer;
var ContextProvider = exports.ContextProvider = Context.Provider;