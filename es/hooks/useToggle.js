var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from 'react';

//todo refactor into a more generic hook
export function useToggle() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSelectAcabado = _useState2[0],
      setIsSelectAcabado = _useState2[1];

  var handleAcabado = function handleAcabado() {
    if (isSelectAcabado) setIsSelectAcabado(function () {
      return false;
    });else setIsSelectAcabado(function () {
      return true;
    });
  };

  return { isSelectAcabado: isSelectAcabado, handleAcabado: handleAcabado };
}