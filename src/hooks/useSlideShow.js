import { useState, useEffect, useRef } from 'react';

export function useSlideShow () {
  const [ index, setIndex ] = useState( 0 );
  let interval = useRef( null );

  const toggle = () => {
    setIndex( ( prevIndex ) => prevIndex + 1 === 3 ? 0 : prevIndex + 1 );
  };

  useEffect( () => {
    interval.current = setInterval( toggle, 5000 );

    return () => {
      if ( interval ) clearInterval( interval.current );
    };
  }, [] );

  return index;
}