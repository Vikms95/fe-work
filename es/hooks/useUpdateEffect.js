import { useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

export var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isFirstMount = useFirstMountState();

  useEffect(function () {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};