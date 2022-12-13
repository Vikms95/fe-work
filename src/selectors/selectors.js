import { GeometryUtils } from '../utils/export';
import { Line } from '../class/export';

export const getLayerID = ( state ) => state.getIn( [ 'scene', 'selectedLayer' ] );

export const getLayerValue = ( state ) => {
  const layerID = getLayerID( state );
  return state.getIn( [ 'scene', 'layers', layerID ] );
};

export const getIsElementSelected = ( state ) => state.getIn( [ 'scene', 'isElementSelected' ] );
export const getIsGuia2D = ( state ) => state.getIn( [ 'prefs', 'GUIA2D' ] );
export const getViewer2D = ( state ) => state.get( 'viewer2D' ).toJS();
export const getRejillaTotal2D = ( state ) => state.getIn( [ 'prefs', 'T/REJILLATOTAL2D' ] );
export const getUserZoom = ( state ) => state.getIn( [ 'prefs', 'ZOOM2D' ] ) / 1000;
export const getPrefsFondo = ( state ) => state.getIn( [ 'scene', 'prefs', 'FONDOPARED' ] );
export const getPrefsAlto = ( state ) => state.getIn( [ 'scene', 'prefs', 'ALTOPARED' ] );

export const setCacheAlto = ( state, alto ) => state.setIn( [ 'drawingSupport', 'cacheAlto' ], alto );
export const setCacheFondo = ( state, fondo ) => state.setIn( [ 'drawingSupport', 'cacheFondo' ], fondo );
export const setCacheAngulo = ( state, angulo ) => state.setIn( [ 'drawingSupport', 'cacheAngulo' ], angulo );

export const getCacheFondo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheFondo' ] );
export const getCacheAlto = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAlto' ] );
export const getCacheAngulo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAngulo' ] );

export const getSelectedPrototypeElements = ( state, prototype ) => {
  const layerID = getLayerID( state );
  const elements = state.getIn( [ 'scene', 'layers', layerID, prototype ] );
  return elements.filter( element => element.get( 'selected' ) );
};

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

export const getElementVertices = ( element, layer ) => {
  let v2First = element.v2First;
  let v_a = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
  let v_b = layer.vertices.get( element.vertices.get( 1 ) );

  return { v_a, v_b };
};

export const getElementAttributes = ( element, layer, v_a, v_b ) => {
  let lineLength = GeometryUtils.pointsDistance( v_a.x, v_a.y, v_b.x, v_b.y );
  let angulo = Line.getAngleV0_pcl( layer, element );

  return { lineLength, angulo };
};

export const getSelectedElements = ( state ) => {
  const layerID = state.getIn( [ 'scene', 'selectedLayer' ] );
  return state.getIn( [ 'scene', 'layers', layerID, 'selected' ] );
};

export const getSelectedElementsToJS = ( state ) => {
  if ( !state ) return;
  const layerID = state.getIn( [ 'scene', 'selectedLayer' ] );
  const selectedElements = state.getIn( [ 'scene', 'layers', layerID, 'selected' ] );
  return immutableDStoJS( selectedElements );
};

export const isMultipleSelection = ( state ) => {
  const elementsSelected = getSelectedElementsToJS( state );
  if ( !elementsSelected ) return;

  const elementsSelectedAmount = elementsSelected.reduce( ( amount, current ) => {
    const arrayOfSelected = current[ 1 ];

    return ( isSelectedInArray( current ) )
      ? amount + arrayOfSelected.length
      : amount;

  }, 0 );

  return elementsSelectedAmount > 1;
};

export const isMultiplePrototypeSelection = ( state ) => {
  const elementsSelected = getSelectedElementsToJS( state );
  if ( !elementsSelected ) return;

  const prototypesSelectedAmount = elementsSelected.reduce( ( amount, current ) => {
    const prototype = current[ 0 ];
    const arrayOfSelected = current[ 1 ];

    return ( prototype !== 'vertices' && arrayOfSelected.length )
      ? amount + 1
      : amount;

  }, 0 );

  return prototypesSelectedAmount > 1;
};


const immutableDStoJS = ( dataStructure ) => (
  Object.entries( dataStructure.toJS() )
);

const isSelectedInArray = ( element ) => (
  element[ 0 ] !== 'vertices' && typeof element[ 1 ][ 0 ] !== 'undefined'
);

