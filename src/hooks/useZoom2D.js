import { useEffect, useRef } from 'react';
import { getUserZoom } from '../selectors/selectors';
import { BASE_ZOOM } from '../constants';

export function useZoom2D ( isFirstRender, setIsFirstRender, refViewer2D, state ) {
  let viewerState = useRef( null );

  useEffect( () => {
    if ( isFirstRender ) return;

    refViewer2D.current = viewerState.current;

  }, [] );

  useEffect( () => {
    if ( isFirstRender ) {
      const userZoom = getUserZoom( state );
      if ( !userZoom ) return;

      const windowWidthRatio = window.innerWidth / 1000;
      const finalZoom = BASE_ZOOM / userZoom;

      refViewer2D.current.setPointOnViewerCenter(
        550,
        568,
        finalZoom * windowWidthRatio
      );

      setIsFirstRender( false );
    }

    return () => viewerState.current = refViewer2D.current;

  }, [ state ] );

}