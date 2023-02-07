import { useRef, useEffect } from 'react';

export function usePrevProps(props) {
  var val = useRef();

  useEffect(function () {
    val.current = props;
  }, [props]);

  return val.current;
}