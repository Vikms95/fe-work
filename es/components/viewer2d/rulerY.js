var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { showMeasure } from '../../utils/changeUnit';
import { Context } from '../../context/context';

export default function RulerY(_ref) {
  var state = _ref.state,
      zoom = _ref.zoom,
      negativeUnitsNumber = _ref.negativeUnitsNumber,
      fontColor = _ref.fontColor,
      markerColor = _ref.markerColor,
      height = _ref.height,
      backgroundColor = _ref.backgroundColor,
      mouseY = _ref.mouseY,
      unitPixelSize = _ref.unitPixelSize,
      positiveUnitsNumber = _ref.positiveUnitsNumber,
      zeroTopPosition = _ref.zeroTopPosition;

  var _useContext = useContext(Context),
      translator = _useContext.translator;

  var unit = state.getIn(['prefs', 'UNIDADMEDIDA']);
  var elementH = unitPixelSize * zoom;

  var STYLE_ELEMENT = {
    width: '8px',
    borderBottom: '1px solid ' + fontColor,
    paddingBottom: '0.2em',
    fontSize: '10px',
    height: elementH,
    textOrientation: 'upright',
    writingMode: 'vertical-lr',
    letterSpacing: '-2px',
    textAlign: 'right'
  };

  var STYLE_ELEMENT_INSIDE = {
    height: '20%',
    width: '100%',
    textOrientation: 'upright',
    writingMode: 'vertical-lr',
    display: 'inline-block',
    letterSpacing: '-2px',
    textAlign: 'right'
  };

  var STYLE_RULER = {
    backgroundColor: backgroundColor,
    height: height,
    width: '100%',
    color: fontColor
  };

  var STYLE_MARKER = {
    position: 'absolute',
    top: zeroTopPosition - mouseY * zoom - 6.5,
    left: 8,
    width: 0,
    height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: '8px solid ' + markerColor,
    zIndex: 9001
  };

  var STYLE_RULER_CONTAINER = {
    position: 'absolute',
    width: '100%',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateColumns: '100%',
    grdAutoRows: elementH + 'px',
    paddingLeft: '5px'
  };

  var STYLE_CONTAINER_POSITIVE = _extends({}, STYLE_RULER_CONTAINER, {
    top: zeroTopPosition - positiveUnitsNumber * elementH,
    height: positiveUnitsNumber * elementH
  });

  var STYLE_CONTAINER_NEGATIVE = _extends({}, STYLE_RULER_CONTAINER, {
    top: zeroTopPosition + negativeUnitsNumber * elementH,
    height: negativeUnitsNumber * elementH
  });

  var positiveDomElements = [];

  if (elementH <= 200) {
    for (var x = 1; x <= positiveUnitsNumber; x++) {
      positiveDomElements.push(React.createElement(
        'div',
        { key: x, style: _extends({}, STYLE_ELEMENT, { gridColumn: 1, gridRow: x }) },
        elementH > 30 ? showMeasure((positiveUnitsNumber - x) * 100, unit) : ''
      ));
    }
  } else if (elementH > 200) {
    for (var _x = 1; _x <= positiveUnitsNumber; _x++) {
      var val = (positiveUnitsNumber - _x) * 100;
      positiveDomElements.push(React.createElement(
        'div',
        { key: _x, style: _extends({}, STYLE_ELEMENT, { gridColumn: 1, gridRow: _x }) },
        React.createElement(
          'div',
          { style: STYLE_ELEMENT_INSIDE },
          val + 4 * 20
        ),
        React.createElement(
          'div',
          { style: STYLE_ELEMENT_INSIDE },
          val + 3 * 20
        ),
        React.createElement(
          'div',
          { style: STYLE_ELEMENT_INSIDE },
          val + 2 * 20
        ),
        React.createElement(
          'div',
          { style: STYLE_ELEMENT_INSIDE },
          val + 1 * 20
        ),
        React.createElement(
          'div',
          { style: STYLE_ELEMENT_INSIDE },
          val
        )
      ));
    }
  }

  return React.createElement(
    'div',
    { style: STYLE_RULER },
    React.createElement('div', {
      id: 'verticalMarker',
      style: STYLE_MARKER
    }),
    React.createElement('div', {
      id: 'negativeRuler',
      style: STYLE_CONTAINER_NEGATIVE
    }),
    React.createElement(
      'div',
      {
        id: 'positiveRuler',
        style: STYLE_CONTAINER_POSITIVE
      },
      positiveDomElements
    )
  );
}

RulerY.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zeroTopPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerY.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};

// RulerY.contextTypes = {
//   translator: PropTypes.object.isRequired
// };


// export default class RulerY extends Component {

//   constructor ( props, context ) {
//     super( props, context );
//   }

//   render () {

//     const unit = this.props.state.getIn( [ 'prefs', 'UNIDADMEDIDA' ] );
//     let elementH = this.props.unitPixelSize * this.props.zoom;

//     let elementStyle = {
//       width: '8px',
//       borderBottom: '1px solid ' + this.props.fontColor,
//       paddingBottom: '0.2em',
//       fontSize: '10px',
//       height: elementH,
//       textOrientation: 'upright',
//       writingMode: 'vertical-lr',
//       letterSpacing: '-2px',
//       textAlign: 'right'
//     };

//     let insideElementsStyle = {
//       height: '20%',
//       width: '100%',
//       textOrientation: 'upright',
//       writingMode: 'vertical-lr',
//       display: 'inline-block',
//       letterSpacing: '-2px',
//       textAlign: 'right'
//     };

//     let rulerStyle = {
//       backgroundColor: this.props.backgroundColor,
//       height: this.props.height,
//       width: '100%',
//       color: this.props.fontColor
//     };

//     let markerStyle = {
//       position: 'absolute',
//       top: this.props.zeroTopPosition - ( this.props.mouseY * this.props.zoom ) - 6.5,
//       left: 8,
//       width: 0,
//       height: 0,
//       borderTop: '5px solid transparent',
//       borderBottom: '5px solid transparent',
//       borderLeft: '8px solid ' + this.props.markerColor,
//       zIndex: 9001
//     };

//     let rulerContainer = {
//       position: 'absolute',
//       width: '100%',
//       display: 'grid',
//       gridRowGap: '0',
//       gridColumnGap: '0',
//       gridTemplateColumns: '100%',
//       grdAutoRows: `${ elementH }px`,
//       paddingLeft: '5px'
//     };

//     let positiveRulerContainer = {
//       ...rulerContainer,
//       top: this.props.zeroTopPosition - ( this.props.positiveUnitsNumber * elementH ),
//       height: ( this.props.positiveUnitsNumber * elementH )
//     };

//     let negativeRulerContainer = {
//       ...rulerContainer,
//       top: this.props.zeroTopPosition + ( this.props.negativeUnitsNumber * elementH ),
//       height: ( this.props.negativeUnitsNumber * elementH )
//     };

//     let positiveDomElements = [];

//     if ( elementH <= 200 ) {
//       for ( let x = 1; x <= this.props.positiveUnitsNumber; x++ ) {
//         positiveDomElements.push(
//           <div key={ x } style={ { ...elementStyle, gridColumn: 1, gridRow: x } }>
//             { elementH > 30 ? showMeasure( ( ( this.props.positiveUnitsNumber - x ) * 100 ), unit ) : '' }
//           </div>
//         );
//       }
//     }
//     else if ( elementH > 200 ) {
//       for ( let x = 1; x <= this.props.positiveUnitsNumber; x++ ) {
//         let val = ( this.props.positiveUnitsNumber - x ) * 100;
//         positiveDomElements.push(
//           <div key={ x } style={ { ...elementStyle, gridColumn: 1, gridRow: x } }>
//             <div style={ insideElementsStyle }>{ val + ( 4 * 20 ) }</div>
//             <div style={ insideElementsStyle }>{ val + ( 3 * 20 ) }</div>
//             <div style={ insideElementsStyle }>{ val + ( 2 * 20 ) }</div>
//             <div style={ insideElementsStyle }>{ val + ( 1 * 20 ) }</div>
//             <div style={ insideElementsStyle }>{ val }</div>
//           </div>
//         );
//       }
//     }

//     return <div style={ rulerStyle }>
//       <div id="verticalMarker" style={ markerStyle }></div>
//       <div id="negativeRuler" style={ negativeRulerContainer }></div>
//       <div id="positiveRuler" style={ positiveRulerContainer }>{ positiveDomElements }</div>
//     </div>;
//   }

// }