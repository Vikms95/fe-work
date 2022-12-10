import { GeometryUtils } from '../utils/export';
import { Line } from '../class/export';

export const getLayerID = ( state ) => state.getIn( [ 'scene', 'selectedLayer' ] );

export const getLayerValue = ( state ) => {
  const layerID = getLayerID( state );
  return state.getIn( [ 'scene', 'layers', layerID ] );
};

export const getIsElementSelected = ( state ) => state.get( 'isElementSelected' );
export const getIsGuia2D = ( state ) => state.getIn( [ 'prefs', 'GUIA2D' ] );
export const getViewer2D = ( state ) => state.get( 'viewer2D' ).toJS();
export const getRejillaTotal2D = ( state ) => state.getIn( [ 'prefs', 'T/REJILLATOTAL2D' ] );
export const getUserZoom = ( state ) => state.getIn( [ 'prefs', 'ZOOM2D' ] ) / 1000;
export const getPrefsFondo = ( state ) => state.getIn( [ 'scene', 'prefs', 'FONDOPARED' ] );
export const getPrefsAlto = ( state ) => state.getIn( [ 'scene', 'prefs', 'ALTOPARED' ] );

//TODO Ensure the insertion is a valid data structure for Immutable.js
export const setCacheAlto = ( state, alto ) => state.setIn( [ 'drawingSupport', 'cacheAlto' ], alto );
export const setCacheFondo = ( state, fondo ) => state.setIn( [ 'drawingSupport', 'cacheFondo' ], fondo );
export const setCacheAngulo = ( state, angulo ) => state.setIn( [ 'drawingSupport', 'cacheAngulo' ], angulo );

export const getCacheFondo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheFondo' ] );
export const getCacheAlto = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAlto' ] );
export const getCacheAngulo = ( state ) => state.getIn( [ 'drawingSupport', 'cacheAngulo' ] );

export const getSelectedLines = ( state ) => {
  const layerID = getLayerID( state );
  const lines = state.getIn( [ 'scene', 'layers', layerID, 'lines' ] );
  return lines.filter( line => line.get( 'selected' ) );
};

export const getSelectedAreas = ( state ) => {
  const layerID = getLayerID( state );
  const areas = state.getIn( [ 'scene', 'layers', layerID, 'areas' ] );
  return areas.filter( area => area.get( 'selected' ) );
};

export const getSelectedHoles = ( state ) => {
  const layerID = getLayerID( state );
  const holes = state.getIn( [ 'scene', 'layers', layerID, 'holes' ] );
  return holes.filter( hole => hole.get( 'selected' ) );
};

export const getSelectedItems = ( state ) => {
  const layerID = getLayerID( state );
  const items = state.getIn( [ 'scene', 'layers', layerID, 'items' ] );
  return items.filter( item => item.get( 'selected' ) );
};

export const getLineVerticesID = ( line ) => {
  const vertices = line.get( 'vertices' );
  const vertice1ID = vertices.toJS()[ 0 ];
  const vertice2ID = vertices.toJS()[ 1 ];

  return { vertice1ID, vertice2ID };
};

export const getElementVertices = ( element, layer ) => {
  let v2First = element.v2First;
  let v_a = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
  let v_b = layer.vertices.get( element.vertices.get( 1 ) );

  return { v_a, v_b };
};

export const getVerticeCoords = ( state, layerID, verticeID ) => {
  let x = state.getIn( [ 'scene', 'layers', layerID, 'vertices', verticeID, 'x' ] );
  let y = state.getIn( [ 'scene', 'layers', layerID, 'vertices', verticeID, 'y' ] );

  return { x, y };
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

const immutableDStoJS = ( dataStructure ) => (
  Object.entries( dataStructure.toJS() )
);

const isSelectedInArray = ( element ) => (
  element[ 0 ] !== 'vertices' && typeof element[ 1 ][ 0 ] !== 'undefined'
);

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

