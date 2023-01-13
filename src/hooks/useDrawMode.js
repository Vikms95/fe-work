import { useEffect, useState } from 'react';
import { MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE } from '../constants';

export function useDrawMode ( state ) {
  const [ isDrawMode, setIsDrawMode ] = useState( false );

  useEffect( () => {
    if (
      state.getIn( [ 'react-planner', 'mode' ] ) === MODE_WAITING_DRAWING_LINE ||
      state.getIn( [ 'react-planner', 'mode' ] ) === MODE_DRAWING_LINE
    ) {
      setIsDrawMode( true );

    } else {
      setIsDrawMode( false );

    }

  }, [ state ] );

  return isDrawMode;
}