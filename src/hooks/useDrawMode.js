import { useEffect, useState } from 'react';
import { MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE } from '../constants';

export function useDrawMode ( state ) {
  const drawMode = state.getIn( [ 'react-planner', 'mode' ] ) === MODE_DRAWING_LINE;
  const waitingDrawMode = state.getIn( [ 'react-planner', 'mode' ] ) === MODE_WAITING_DRAWING_LINE;

  const [ isDrawMode, setIsDrawMode ] = useState( false );

  useEffect( () => {
    if ( drawMode || waitingDrawMode ) {
      setIsDrawMode( true );

    }

    else {
      setIsDrawMode( false );

    }

  }, [ drawMode, waitingDrawMode ] );

  return isDrawMode;
}