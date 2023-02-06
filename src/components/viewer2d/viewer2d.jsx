import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { INITIAL_VALUE, fitSelection, ReactSVGPanZoom, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_AUTO } from 'react-svg-pan-zoom';
import * as constants from '../../constants';
import State from './state';
import * as SharedStyle from '../../shared-style';
import { RulerX, RulerY } from './export';
import { getIsGuia2D, getViewer2D, getRejillaTotal2D, getUserZoom } from '../../selectors/selectors';
import { Context } from '../../context/context';

function mode2Tool ( mode ) {
  switch ( mode ) {
    case constants.MODE_2D_PAN:
      return TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return TOOL_AUTO;
    default:
      return TOOL_NONE;
  }
}

function mode2PointerEvents ( mode ) {
  switch ( mode ) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
      return { pointerEvents: 'none' };

    default:
      return {};
  }
}

function mode2Cursor ( mode ) {
  switch ( mode ) {
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
      return { cursor: 'move' };

    case constants.MODE_ROTATING_ITEM:
      return { cursor: 'ew-resize' };

    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return { cursor: 'crosshair' };
    default:
      return { cursor: 'default' };
  }
}

function mode2DetectAutopan ( mode ) {
  switch ( mode ) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
      return true;

    default:
      return false;
  }
}

function extractElementData ( node ) {
  while ( !node.attributes.getNamedItem( 'data-element-root' ) && node.tagName !== 'svg' ) {
    node = node.parentNode;
  }
  if ( node.tagName === 'svg' ) return null;

  return {
    part: node.attributes.getNamedItem( 'data-part' ) ? node.attributes.getNamedItem( 'data-part' ).value : undefined,
    layer: node.attributes.getNamedItem( 'data-layer' ).value,
    prototype: node.attributes.getNamedItem( 'data-prototype' ).value,
    selected: node.attributes.getNamedItem( 'data-selected' ).value === 'true',
    id: node.attributes.getNamedItem( 'data-id' ).value
  };
}

export default function Viewer2D (
  {
    state,
    width,
    height,
    refViewer2D,
    update2DView,
    isFirstRender,
    setIsFirstRender,
  } ) {

  const {
    catalog,
    areaActions,
    itemsActions,
    linesActions,
    holesActions,
    projectActions,
    viewer2DActions,
    verticesActions,
  }
    = useContext( Context );

  const { viewer2D, mode, scene } = state;
  const layerID = scene.selectedLayer;
  let viewerState = useRef( null );


  useEffect( () => {

    if ( isFirstRender ) {
      const userZoom = getUserZoom( state );
      if ( !userZoom ) return;

      //**startup */
      const windowWidthRatio = window.innerWidth / 1000;
      const finalZoom = constants.BASE_ZOOM / userZoom;

      refViewer2D.current.setPointOnViewerCenter(
        550,
        568,
        finalZoom * windowWidthRatio
      );

      setIsFirstRender( false );

    } else {

      refViewer2D.current = viewerState.current;

    }

    return () => viewerState.current = refViewer2D.current;

  }, [ state ] );



  useEffect( () => {

    document.addEventListener( 'keydown', onKeyDown );
    return () => document.removeEventListener( 'keydown', onKeyDown );

  }, [ state ] );


  const onKeyDown = ( event ) => {
    const viewer2DState = getViewer2D( state );
    update2DView( viewer2DState, event );
  };

  const mapCursorPosition = ( { x, y } ) => {
    return { x, y: -y + scene.height };
  };

  const onMouseMove = viewerEvent => {

    //workaround that allow imageful component to work
    const evt = new Event( 'mousemove-planner-event' );
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent( evt );

    let { x, y } = mapCursorPosition( viewerEvent );

    projectActions.updateMouseCoord( { x, y } );

    switch ( mode ) {
      case constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine( x, y, state.snapMask );
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole( layerID, x, y );
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem( layerID, x, y );
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.updateDraggingHole( x, y );
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine( x, y, state.snapMask );
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex( x, y, state.snapMask );
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem( x, y );
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem( x, y );
        break;
    }

    viewerEvent.originalEvent.stopPropagation();
  };

  const onMouseDown = viewerEvent => {
    let event = viewerEvent.originalEvent;

    //workaround that allow imageful component to work
    let evt = new Event( 'mousedown-planner-event' );
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent( evt );

    let { x, y } = mapCursorPosition( viewerEvent );

    if ( mode === constants.MODE_IDLE ) {
      let elementData = extractElementData( event.target );

      if ( !elementData || !elementData.selected ) return;

      switch ( elementData.prototype ) {
        case 'lines':
          linesActions.beginDraggingLine( elementData.layer, elementData.id, x, y, state.snapMask );
          break;

        case 'vertices':
          verticesActions.beginDraggingVertex( elementData.layer, elementData.id, x, y, state.snapMask );
          break;

        case 'items':
          if ( elementData.part === 'rotation-anchor' ) {
            console.log( "rotating item" );
            itemsActions.beginRotatingItem( elementData.layer, elementData.id, x, y );
          }
          else
            itemsActions.beginDraggingItem( elementData.layer, elementData.id, x, y );
          break;

        case 'holes':
          holesActions.beginDraggingHole( elementData.layer, elementData.id, x, y );
          break;

        default:
          break;
      }
    }
    event.stopPropagation();
  };

  const onMouseUp = viewerEvent => {
    let event = viewerEvent.originalEvent;

    let evt = new Event( 'mouseup-planner-event' );
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent( evt );

    let { x, y } = mapCursorPosition( viewerEvent );

    switch ( mode ) {

      case constants.MODE_IDLE:
        let elementData = extractElementData( event.target );

        if ( elementData && elementData.selected ) return;

        switch ( elementData ? elementData.prototype : 'none' ) {
          case 'areas':
            areaActions.selectArea( elementData.layer, elementData.id );
            break;

          case 'lines':
            linesActions.selectLine( elementData.layer, elementData.id );
            break;

          case 'holes':
            holesActions.selectHole( elementData.layer, elementData.id );
            break;

          case 'items':
            itemsActions.selectItem( elementData.layer, elementData.id );
            break;

          case 'none':
            projectActions.unselectAll();
            break;
        }
        break;

      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine( layerID, x, y, state.snapMask );
        break;

      case constants.MODE_DRAWING_LINE:
        //state.viewer2D.isArea = false;

        linesActions.endDrawingLine( x, y, state.snapMask, true );
        //if (!state.viewer2D.isArea)
        //  linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole( layerID, x, y );
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem( layerID, x, y );
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine( x, y, state.snapMask );
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex( x, y, state.snapMask );
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem( x, y );
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.endDraggingHole( x, y );
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.endRotatingItem( x, y );
        break;
    }

    event.stopPropagation();
  };

  const onChangeTool = ( tool ) => {
    switch ( tool ) {
      case TOOL_NONE:
        projectActions.selectToolEdit();
        break;

      case TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;

      case TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;

      case TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };

  let { e, f, SVGWidth, SVGHeight } = getViewer2D( state );

  let rulerSize = 15; //px
  let rulerUnitPixelSize = 100;
  let rulerBgColor = SharedStyle.PRIMARY_COLOR.main;
  let rulerFnColor = SharedStyle.COLORS.white;
  let rulerMkColor = SharedStyle.SECONDARY_COLOR.main;
  let sceneWidth = SVGWidth || state.getIn( [ 'scene', 'width' ] );
  let sceneHeight = SVGHeight || state.getIn( [ 'scene', 'height' ] );
  let sceneZoom = state.zoom || 1;
  let rulerXElements = Math.ceil( sceneWidth / rulerUnitPixelSize ) + 1;
  let rulerYElements = Math.ceil( sceneHeight / rulerUnitPixelSize ) + 1;

  if ( getIsGuia2D( state ) ) {
    return <div style={ {
      margin: 0,
      padding: 0,
      display: 'grid',
      gridRowGap: '0',
      gridColumnGap: '0',
      position: 'relative',
      gridTemplateColumns: `${ rulerSize }px ${ width - rulerSize }px`,
      gridTemplateRows: `${ rulerSize }px ${ height - rulerSize }px`,
    } }>

      <div style={ { gridColumn: 1, gridRow: 1, backgroundColor: rulerBgColor } }></div>

      <div style={ { gridRow: 1, gridColumn: 2, position: 'relative', overflow: 'hidden' } } id="rulerX">
        { sceneWidth && (
          <RulerX
            state={ state }
            zoom={ sceneZoom }
            negativeUnitsNumber={ 0 }
            fontColor={ rulerFnColor }
            width={ width - rulerSize }
            zeroLeftPosition={ e || 0 }
            markerColor={ rulerMkColor }
            backgroundColor={ rulerBgColor }
            mouseX={ state.mouse.get( 'x' ) }
            unitPixelSize={ rulerUnitPixelSize }
            positiveUnitsNumber={ rulerXElements }
          /> ) }
      </div>

      <div style={ { gridColumn: 1, gridRow: 2, position: 'relative', overflow: 'hidden' } } id="rulerY">
        { sceneHeight && (
          <RulerY
            state={ state }
            zoom={ sceneZoom }
            negativeUnitsNumber={ 0 }
            fontColor={ rulerFnColor }
            markerColor={ rulerMkColor }
            height={ height - rulerSize }
            backgroundColor={ rulerBgColor }
            mouseY={ state.mouse.get( 'y' ) }
            unitPixelSize={ rulerUnitPixelSize }
            positiveUnitsNumber={ rulerYElements }
            zeroTopPosition={ ( ( sceneHeight * sceneZoom ) + f ) || 0 }
          /> ) }
      </div>

      <div>
        <div>
          {/*//TODO Arreglar duplicado de HTML con un HOC*/ }
          <ReactSVGPanZoom
            ref={ refViewer2D }
            className='ReactSVGPanZoom'
            toolbarPosition="none"
            miniaturePosition="none"
            width={ width - rulerSize }
            tool={ mode2Tool( mode ) }
            height={ height - rulerSize }
            style={ { gridColumn: 2, gridRow: 2 } }
            detectAutoPan={ mode2DetectAutopan( mode ) }
            value={ viewer2D.isEmpty() ? null : viewer2D.toJS() }
            onMouseUp={ onMouseUp }
            onMouseMove={ onMouseMove }
            onMouseDown={ onMouseDown }
            onChangeTool={ onChangeTool }
            onChangeValue={ update2DView }
          >
            <svg width={ getRejillaTotal2D( state ) / 10 } height={ getRejillaTotal2D( state ) / 10 }>
              <defs>
                <pattern id="diagonalFill" patternUnits="userSpaceOnUse" width="4" height="4" fill="#FFF">
                  <rect x="0" y="0" width="4" height="4" fill="#FFF" />
                  <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={ { stroke: '#8E9BA2', strokeWidth: 1 } } />
                </pattern>
              </defs>
              <g style={ Object.assign( mode2Cursor( mode ), mode2PointerEvents( mode ) ) }>
                <State state={ state } catalog={ catalog } />
              </g>
            </svg>
          </ReactSVGPanZoom>
        </div>
      </div >
    </div >;
  }
  else {
    return <div>
      <div>
        <ReactSVGPanZoom
          ref={ refViewer2D }
          style={ { gridColumn: 2, gridRow: 2 } }
          width={ width - rulerSize }
          height={ height - rulerSize }
          value={ viewer2D.isEmpty() ? null : viewer2D.toJS() }
          onChangeValue={ update2DView }
          tool={ mode2Tool( mode ) }
          onChangeTool={ onChangeTool }
          detectAutoPan={ mode2DetectAutopan( mode ) }
          onMouseDown={ onMouseDown }
          onMouseMove={ onMouseMove }
          onMouseUp={ onMouseUp }
          miniaturePosition="none"
          toolbarPosition="none"

        >
          <svg width={ getRejillaTotal2D( state ) / 10 } height={ getRejillaTotal2D( state ) / 10 }>
            <defs>
              <pattern id="diagonalFill" patternUnits="userSpaceOnUse" width="4" height="4" fill="#FFF">
                <rect x="0" y="0" width="4" height="4" fill="#FFF" />
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={ { stroke: '#8E9BA2', strokeWidth: 1 } } />
              </pattern>
            </defs>
            <g style={ Object.assign( mode2Cursor( mode ), mode2PointerEvents( mode ) ) }>
              <State state={ state } catalog={ catalog } />
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    </div >;
  }

}

Viewer2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

// Viewer2D.contextTypes = {
//   viewer2DActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   verticesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   areaActions: PropTypes.object.isRequired,
//   projectActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object.isRequired,
// };
