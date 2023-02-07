'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDidMount = useDidMount;

var _react = require('react');

var mounted = false;
function useDidMount(callback) {

  (0, _react.useEffect)(function () {
    if (callback && !mounted) {
      mounted = true;
      callback();
    }
  });
}