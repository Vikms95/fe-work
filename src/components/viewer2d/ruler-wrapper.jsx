import React from 'react';
import { getViewer2D } from '../../selectors/selectors';
import * as SharedStyle from '../../shared-style';

import RulerX from './rulerX';
import RulerY from './rulerY';

const rulerSize = 15;
const rulerUnitPixelSize = 100;
const rulerBgColor = SharedStyle.PRIMARY_COLOR.main;
const rulerFnColor = SharedStyle.COLORS.white;
const rulerMkColor = SharedStyle.SECONDARY_COLOR.main;

const STYLE_RULER_BACKGROUND = {
  gridColumn: 1,
  gridRow: 1,
  backgroundColor: rulerBgColor
};

const STYLE_RULER_X = {
  gridRow: 1,
  gridColumn: 2,
  position: 'relative',
  overflow: 'hidden'
};

const STYLE_RULER_Y = {
  gridColumn: 1,
  gridRow: 2,
  position: 'relative',
  overflow: 'hidden'
};

export function RulerWrapper ( {
  state,
  width,
  height,
  children
} ) {

  const STYLE_RULER_WRAPPER = {
    margin: 0,
    padding: 0,
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    position: 'relative',
    gridTemplateColumns: `${ rulerSize }px ${ width - rulerSize }px`,
    gridTemplateRows: `${ rulerSize }px ${ height - rulerSize }px`,
  };

  const { e, f, SVGWidth, SVGHeight } = getViewer2D( state );

  const sceneZoom = state.zoom || 1;
  const sceneWidth = SVGWidth || state.getIn( [ 'scene', 'width' ] );
  const sceneHeight = SVGHeight || state.getIn( [ 'scene', 'height' ] );
  const rulerXElements = Math.ceil( sceneWidth / rulerUnitPixelSize ) + 1;
  const rulerYElements = Math.ceil( sceneHeight / rulerUnitPixelSize ) + 1;

  return (
    <div style={ STYLE_RULER_WRAPPER }>

      <div style={ STYLE_RULER_BACKGROUND } />

      <div style={ STYLE_RULER_X } id="rulerX">
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

      <div style={ STYLE_RULER_Y } id="rulerY">
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
        { children }
      </div>
    </div>
  );
}
