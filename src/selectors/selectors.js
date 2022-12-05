
export const getLayerID = ( state ) => state.getIn( [ 'scene', 'selectedLayer' ] );

export const getSelectedElements = ( state ) => {
  const layerID = state.getIn( [ 'scene', 'selectedLayer' ] );
  const selectedElements = state.getIn( [ 'scene', 'layers', layerID, 'selected' ] );
  return Object.entries( selectedElements.toJS() );
};

export const getIsElementSelected = ( state ) => state.get( 'isElementSelected' );

export const isMultipleSelection = ( state ) => {
  const elementsSelected = getSelectedElements( state );
  if ( !elementsSelected ) return;

  const isSelectedInArray = ( element ) => (
    element[ 0 ] !== 'vertices' && typeof element[ 1 ][ 0 ] !== 'undefined'
  );

  const selectedAmount = elementsSelected.reduce( ( amount, current ) => {
    const arrayOfSelected = current[ 1 ];

    return ( isSelectedInArray( current ) )
      ? amount + arrayOfSelected.length
      : amount;

  }, 0 );

  return selectedAmount > 1;
};

export const getIsGuia2D = ( state ) => state.getIn( [ 'prefs', 'GUIA2D' ] );
export const getViewer2D = ( state ) => state.get( 'viewer2D' ).toJS();
export const getRejillaTotal2D = ( state ) => state.getIn( [ 'prefs', 'T/REJILLATOTAL2D' ] );
export const getUserZoom = ( state ) => state.getIn( [ 'prefs', 'ZOOM2D' ] ) / 1000;

export const getPrefsFondo = ( state ) => state.getIn( [ 'scene', 'prefs', 'FONDOPARED' ] );
export const getPrefsAlto = ( state ) => state.getIn( [ 'scene', 'prefs', 'ALTOPARED' ] );

export const setCacheFondo = ( state, fondo ) => state.setIn( [ 'drawingSupport', 'cacheFondo' ], fondo );
export const setCacheAlto = ( state, alto ) => state.setIn( [ 'drawingSupport', 'cacheAlto' ], alto );
export const setCacheAngulo = ( state, angulo ) => state.setIn( [ 'drawingSupport', 'cacheAngulo' ], angulo );

export const getCacheFondo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheFondo' ] );
export const getCacheAlto = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAlto' ] );
export const getCacheAngulo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAngulo' ] );

export const getLineVerticesID = ( line ) => {
  const vertices = line.get( 'vertices' );
  const vertice1ID = vertices.toJS()[ 0 ];
  const vertice2ID = vertices.toJS()[ 1 ];

  return { vertice1ID, vertice2ID };
};

export const getVerticeCoords = ( state, layerID, verticeID ) => {
  let x = state.getIn( [ 'scene', 'layers', layerID, 'vertices', verticeID, 'x' ] );
  let y = state.getIn( [ 'scene', 'layers', layerID, 'vertices', verticeID, 'y' ] );

  return { x, y };
};
