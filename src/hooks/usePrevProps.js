import { useRef, useEffect } from 'react';

export function usePrevProps ( props ) {
  const val = useRef();

  useEffect( () => {
    val.current = props;
  }, [ props ] );

  return val.current;
}
