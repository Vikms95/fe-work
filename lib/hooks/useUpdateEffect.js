'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateEffect = undefined;

var _react = require('react');

var _useFirstMountState = require('./useFirstMountState');

var useUpdateEffect = exports.useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isFirstMount = (0, _useFirstMountState.useFirstMountState)();

  (0, _react.useEffect)(function () {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};