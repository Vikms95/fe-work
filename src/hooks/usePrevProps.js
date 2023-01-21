import { useRef, useEffect } from 'react';

export function usePrevProps ( props ) {
  console.log( 'test from hook', props );
  const val = useRef();

  useEffect( () => {
    val.current = props;
  }, [ props ] );

  return val.current;
}
