var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { useEffect, useState } from 'react';

export function useResetMultiSelection(state, props) {

  useEffect(function () {
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