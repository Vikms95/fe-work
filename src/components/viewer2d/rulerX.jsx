import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { showMeasure } from '../../utils/changeUnit';

export default function RulerX (
  {
    state,
    zoom,
    negativeUnitsNumber,
    fontColor,
    width,
    zeroLeftPosition,
    markerColor,
    backgroundColor,
    mouseX,
    unitPixelSize,
    positiveUnitsNumber
  } ) {

  const unit = state.getIn( [ 'prefs', 'UNIDADMEDIDA' ] );
  const elementW = unitPixelSize * zoom;

  const STYLE_ELEMENT = {
    display: 'inline-block',
    width: elementW,
    position: 'relative',
    borderLeft: '1px solid ' + fontColor,
    paddingLeft: '0.2em',
    fontSize: '10px',
    height: '100%'
  };

  const STYLE_INNER_ELEMENT = {
    width: '20%',
    display: 'inline-block',
    margin: 0,
    padding: 0
  };

  const STYLE_RULER = {
    backgroundColor: backgroundColor,
    position: 'relative',
    width: width,
    height: '100%',
    color: fontColor
  };

  const STYLE_MARKER = {
    position: 'absolute',
    left: zeroLeftPosition + ( mouseX * zoom ) - 6.5,
    top: 8,
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '8px solid ' + markerColor,
    zIndex: 9001
  };

  const STYLE_RULER_CONTAINER = {
    position: 'absolute',
    height: '10px',
    top: '4px',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateRows: '100%',
    grdAutoColumns: `${ elementW }px`
  };

  const STYLE_CONTAINER_POSTIVE = {
    ...STYLE_RULER_CONTAINER,
    width: ( positiveUnitsNumber * elementW ),
    left: zeroLeftPosition
  };

  const STYLE_CONTAINER_NEGATIVE = {
    ...STYLE_RULER_CONTAINER,
    width: ( negativeUnitsNumber * elementW ),
    left: zeroLeftPosition - ( negativeUnitsNumber * elementW )
  };

  const positiveDomElements = [];

  // TODO figure out what this logic accomplishes
  if ( elementW <= 200 ) {
    for ( let x = 0; x < positiveUnitsNumber; x++ ) {
      positiveDomElements.push(
        <div key={ x } style={ { ...STYLE_ELEMENT, gridColumn: ( x + 1 ), gridRow: 1 } }>
          { elementW > 30 ? showMeasure( ( x * 100 ), unit ) : '' }
        </div>
      );
    }
  }
  else if ( elementW > 200 ) {
    for ( let x = 0; x < positiveUnitsNumber; x++ ) {
      let val = x * 100;
      /* positiveDomElements.push(
         <div key={x} style={{ ...elementStyle, gridColumn: (x + 1), gridRow: 1 }}>
           <div style={insideElementsStyle}>{val}</div>
           <div style={insideElementsStyle}>{val + (1 * 20)}</div>
           <div style={insideElementsStyle}>{val + (2 * 20)}</div>
           <div style={insideElementsStyle}>{val + (3 * 20)}</div>
           <div style={insideElementsStyle}>{val + (4 * 20)}</div>
         </div>
       );*/
    }
  }

  return (
    <div style={ STYLE_RULER }>
      <div
        id="horizontalMarker"
        style={ STYLE_MARKER }>
      </div>
      <div
        id="negativeRuler"
        style={ STYLE_CONTAINER_NEGATIVE }>
      </div>
      <div
        id="positiveRuler"
        style={ STYLE_CONTAINER_POSTIVE }
      >
        { positiveDomElements }
      </div>
    </div>
  );
}


RulerX.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  positiveUnitsNumber: PropTypes.number,
  negativeUnitsNumber: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  mouseX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  zeroLeftPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerX.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};

RulerX.contextTypes = {
  translator: PropTypes.object.isRequired
};

// export default class RulerX extends Component {
//   constructor ( props, context ) {
//     super( props, context );
//   }

//   render () {
//     const unit = this.props.state.getIn( [ 'prefs', 'UNIDADMEDIDA' ] );
//     let elementW = this.props.unitPixelSize * this.props.zoom;

//     let elementStyle = {
//       display: 'inline-block',
//       width: elementW,
//       position: 'relative',
//       borderLeft: '1px solid ' + this.props.fontColor,
//       paddingLeft: '0.2em',
//       fontSize: '10px',
//       height: '100%'
//     };

//     let insideElementsStyle = {
//       width: '20%',
//       display: 'inline-block',
//       margin: 0,
//       padding: 0
//     };

//     let rulerStyle = {
//       backgroundColor: this.props.backgroundColor,
//       position: 'relative',
//       width: this.props.width,
//       height: '100%',
//       color: this.props.fontColor
//     };

//     let markerStyle = {
//       position: 'absolute',
//       left: this.props.zeroLeftPosition + ( this.props.mouseX * this.props.zoom ) - 6.5,
//       top: 8,
//       width: 0,
//       height: 0,
//       borderLeft: '5px solid transparent',
//       borderRight: '5px solid transparent',
//       borderTop: '8px solid ' + this.props.markerColor,
//       zIndex: 9001
//     };

//     let rulerContainer = {
//       position: 'absolute',
//       height: '10px',
//       top: '4px',
//       display: 'grid',
//       gridRowGap: '0',
//       gridColumnGap: '0',
//       gridTemplateRows: '100%',
//       grdAutoColumns: `${ elementW }px`
//     };

//     let positiveRulerContainer = {
//       ...rulerContainer,
//       width: ( this.props.positiveUnitsNumber * elementW ),
//       left: this.props.zeroLeftPosition
//     };

//     let negativeRulerContainer = {
//       ...rulerContainer,
//       width: ( this.props.negativeUnitsNumber * elementW ),
//       left: this.props.zeroLeftPosition - ( this.props.negativeUnitsNumber * elementW )
//     };

//     let positiveDomElements = [];

//     if ( elementW <= 200 ) {
//       for ( let x = 0; x < this.props.positiveUnitsNumber; x++ ) {
//         positiveDomElements.push(
//           <div key={ x } style={ { ...elementStyle, gridColumn: ( x + 1 ), gridRow: 1 } }>
//             { elementW > 30 ? showMeasure( ( x * 100 ), unit ) : '' }
//           </div>
//         );
//       }
//     }
//     else if ( elementW > 200 ) {
//       for ( let x = 0; x < this.props.positiveUnitsNumber; x++ ) {
//         let val = x * 100;
//         /* positiveDomElements.push(
//            <div key={x} style={{ ...elementStyle, gridColumn: (x + 1), gridRow: 1 }}>
//              <div style={insideElementsStyle}>{val}</div>
//              <div style={insideElementsStyle}>{val + (1 * 20)}</div>
//              <div style={insideElementsStyle}>{val + (2 * 20)}</div>
//              <div style={insideElementsStyle}>{val + (3 * 20)}</div>
//              <div style={insideElementsStyle}>{val + (4 * 20)}</div>
//            </div>
//          );*/
//       }
//     }

//     return <div style={ rulerStyle }>
//       <div id="horizontalMarker" style={ markerStyle }></div>
//       <div id="negativeRuler" style={ negativeRulerContainer }></div>
//       <div id="positiveRuler" style={ positiveRulerContainer }>{ positiveDomElements }</div>
//     </div>;
//   }

// }