var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useEffect, useState } from 'react';
import { MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE } from '../constants';

export function useDrawMode(state) {
  var drawMode = state.getIn(['react-planner', 'mode']) === MODE_DRAWING_LINE;
  var waitingDrawMode = state.getIn(['react-planner', 'mode']) === MODE_WAITING_DRAWING_LINE;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDrawMode = _useState2[0],
      setIsDrawMode = _useState2[1];

  useEffect(function () {
    if (drawMode || waitingDrawMode) {
      setIsDrawMode(true);
    } else {
      setIsDrawMode(false);
    }
  }, [drawMode, waitingDrawMode]);

  return isDrawMode;
}