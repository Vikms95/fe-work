import { useEffect } from 'react';

var mounted = false;
export function useDidMount(callback) {

  useEffect(function () {
    if (callback && !mounted) {
      mounted = true;
      callback();
    }
  });
}