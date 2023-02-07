import { useEffect } from 'react';

export function useInputCursor(state, props) {

  var cursor = {
    x: props.stateRedux.getIn(['mouse', 'x']),
    y: props.stateRedux.getIn(['mouse', 'y'])
  };

  useEffect(function () {
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