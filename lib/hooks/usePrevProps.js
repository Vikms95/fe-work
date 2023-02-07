'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevProps = usePrevProps;

var _react = require('react');

function usePrevProps(props) {
  var val = (0, _react.useRef)();

  (0, _react.useEffect)(function () {
    val.current = props;
  }, [props]);

  return val.current;
}