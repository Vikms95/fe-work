import React, { useEffect } from 'react';
import { getViewer2D } from '../selectors/selectors';

export function useControls2D ( state, updateFn ) {


  const onKeyDown = ( event ) => {
    const viewer2DState = getViewer2D( state );
    updateFn( viewer2DState, event );
  };


  useEffect( () => {

    document.addEventListener( 'keydown', onKeyDown );
    return () => document.removeEventListener( 'keydown', onKeyDown );

  }, [ state ] );

}