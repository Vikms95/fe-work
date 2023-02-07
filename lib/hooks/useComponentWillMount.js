'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponentWillMount = undefined;

var _react = require('react');

var useComponentWillMount = exports.useComponentWillMount = function useComponentWillMount(callback) {
  var willMount = (0, _react.useRef)(true);

  if (willMount.current) callback();

  willMount.current = false;
};