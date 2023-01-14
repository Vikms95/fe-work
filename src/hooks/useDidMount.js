import { useEffect } from 'react';

let mounted = false;
export function useDidMount ( callback ) {

  useEffect( () => {
    if ( callback && !mounted ) {
      mounted = true;
      callback();
    }
  } );
}