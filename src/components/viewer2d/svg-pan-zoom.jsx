import React from 'react';

function SVGPanZoom () {
  return (
    <div>
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
          <g style={ Object.assign( mode2DCursor( mode ), mode2PointerEvents( mode ) ) }>
            <State state={ state } catalog={ catalog } />
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
}

export default SVGPanZoom;