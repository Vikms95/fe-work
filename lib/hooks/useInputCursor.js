'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInputCursor = useInputCursor;

var _react = require('react');

function useInputCursor(state, props) {

  var cursor = {
    x: props.stateRedux.getIn(['mouse', 'x']),
    y: props.stateRedux.getIn(['mouse', 'y'])
  };

  (0, _react.useEffect)(function () {
    if (document.activeElement === state.inputElement) {
      if (cursor.x !== props.stateRedux.getIn(['mouse', 'x']) || cursor.y !== props.stateRedux.getIn(['mouse', 'y'])) {
        state.inputElement.select();
      }
    }

    cursor = {
      x: props.stateRedux.getIn(['mouse', 'x']),
      y: props.stateRedux.getIn(['mouse', 'y'])
    };
  }, [document.activeElement, state.inputElement]);
}