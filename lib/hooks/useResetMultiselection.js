'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.useResetMultiSelection = useResetMultiSelection;

var _react = require('react');

function useResetMultiSelection(state, props) {

  (0, _react.useEffect)(function () {
    var isEmptyInputAndSingleSelection = function isEmptyInputAndSingleSelection() {
      return state.showedValue === 'null' && !state.isMultiSelection;
    };

    if (isEmptyInputAndSingleSelection()) {
      setState(function (prevState) {
        return _extends({}, prevState, { showedValue: props.value });
      });
    }
  }, [props, state.showedValue, state.isMultiSelection]);
}