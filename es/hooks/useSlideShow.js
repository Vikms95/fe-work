var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect, useRef } from 'react';

// Right now, it is limited to our use case of 3 slides.
// This can be refactored to handle a max amount of slides.
export function useSlideShow() {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1];

  var interval = useRef(null);

  var toggle = function toggle() {
    setIndex(function (prevIndex) {
      return prevIndex + 1 === 3 ? 0 : prevIndex + 1;
    });
  };

  useEffect(function () {
    interval.current = setInterval(toggle, 5000);

    return function () {
      if (interval) clearInterval(interval.current);
    };
  }, []);

  return index;
}