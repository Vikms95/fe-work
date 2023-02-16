import { useEffect, useRef } from 'react';
import { getUserZoom } from '../selectors/selectors';
import { BASE_ZOOM } from '../constants';

let isFirstRender = true;

export function useZoom2D ( refViewer2D, state ) {

  let viewerState = useRef( null );

  const setInitialZoom = () => {
    const userZoom = getUserZoom( state );
    if ( !userZoom ) return;

    const windowWidthRatio = window.innerWidth / 1000;
    const finalZoom = BASE_ZOOM / userZoom;

    refViewer2D.current.setPointOnViewerCenter(
      550,
      568,
      finalZoom * windowWidthRatio
    );

    isFirstRender = false;
  };

  useEffect( () => {

    if ( isFirstRender ) return;

    refViewer2D.current = viewerState.current;

  }, [] );

  useEffect( () => {

    if ( isFirstRender ) setInitialZoom();

    return () => viewerState.current = refViewer2D.current;

  }, [ state ] );

}