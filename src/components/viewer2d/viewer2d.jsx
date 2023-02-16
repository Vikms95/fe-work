import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { INITIAL_VALUE, fitSelection, ReactSVGPanZoom, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_AUTO } from 'react-svg-pan-zoom';
import * as constants from '../../constants';
import State from './state';
import * as SharedStyle from '../../shared-style';
import { RulerX, RulerY } from './export';
import { getIsGuia2D, getViewer2D, getRejillaTotal2D, getUserZoom } from '../../selectors/selectors';
import { Context } from '../../context/context';
import { useZoom2D } from '../../hooks/useZoom2D';
import { useControls2D } from '../../hooks/useControls2D';
import { RulerWrapper } from './ruler-wrapper';

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

function mode2DCursor ( mode ) {
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


const rulerSize = 15; //px

export default function Viewer2D ( {
  state,
  width,
  height,
  refViewer2D,
  update2DView,
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
  } = useContext( Context );

  const { viewer2D, mode, scene } = state;
  const layerID = scene.selectedLayer;

  useZoom2D( refViewer2D, state );
  useControls2D( state, update2DView );

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


  if ( getIsGuia2D( state ) ) {
    return (
      <RulerWrapper
        state={ state }
        width={ width }
        height={ height }
      >
        <ReactSVGPanZoom
          ref={ refViewer2D }
          className='ReactSVGPanZoom'
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
            <g style={ Object.assign( mode2DCursor( mode ), mode2PointerEvents( mode ) ) }>
              <State state={ state } catalog={ catalog } />
            </g>
          </svg>
        </ReactSVGPanZoom>
      </RulerWrapper>
    );

  } else {
    return (
      <div>
        <ReactSVGPanZoom
          ref={ refViewer2D }
          className='ReactSVGPanZoom'
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
            <g style={ Object.assign( mode2DCursor( mode ), mode2PointerEvents( mode ) ) }>
              <State state={ state } catalog={ catalog } />
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }

}

Viewer2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
