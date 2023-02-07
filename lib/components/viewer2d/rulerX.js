'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = RulerX;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _changeUnit = require('../../utils/changeUnit');

var _context = require('../../context/context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RulerX(_ref) {
  var state = _ref.state,
      zoom = _ref.zoom,
      negativeUnitsNumber = _ref.negativeUnitsNumber,
      fontColor = _ref.fontColor,
      width = _ref.width,
      zeroLeftPosition = _ref.zeroLeftPosition,
      markerColor = _ref.markerColor,
      backgroundColor = _ref.backgroundColor,
      mouseX = _ref.mouseX,
      unitPixelSize = _ref.unitPixelSize,
      positiveUnitsNumber = _ref.positiveUnitsNumber;

  var _useContext = (0, _react.useContext)(_context.Context),
      translator = _useContext.translator;

  var unit = state.getIn(['prefs', 'UNIDADMEDIDA']);
  var elementW = unitPixelSize * zoom;

  var STYLE_ELEMENT = {
    display: 'inline-block',
    width: elementW,
    position: 'relative',
    borderLeft: '1px solid ' + fontColor,
    paddingLeft: '0.2em',
    fontSize: '10px',
    height: '100%'
  };

  var STYLE_INNER_ELEMENT = {
    width: '20%',
    display: 'inline-block',
    margin: 0,
    padding: 0
  };

  var STYLE_RULER = {
    backgroundColor: backgroundColor,
    position: 'relative',
    width: width,
    height: '100%',
    color: fontColor
  };

  var STYLE_MARKER = {
    position: 'absolute',
    left: zeroLeftPosition + mouseX * zoom - 6.5,
    top: 8,
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '8px solid ' + markerColor,
    zIndex: 9001
  };

  var STYLE_RULER_CONTAINER = {
    position: 'absolute',
    height: '10px',
    top: '4px',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateRows: '100%',
    grdAutoColumns: elementW + 'px'
  };

  var STYLE_CONTAINER_POSTIVE = _extends({}, STYLE_RULER_CONTAINER, {
    width: positiveUnitsNumber * elementW,
    left: zeroLeftPosition
  });

  var STYLE_CONTAINER_NEGATIVE = _extends({}, STYLE_RULER_CONTAINER, {
    width: negativeUnitsNumber * elementW,
    left: zeroLeftPosition - negativeUnitsNumber * elementW
  });

  var positiveDomElements = [];

  // TODO figure out what this logic accomplishes
  if (elementW <= 200) {
    for (var x = 0; x < positiveUnitsNumber; x++) {
      positiveDomElements.push(_react2.default.createElement(
        'div',
        { key: x, style: _extends({}, STYLE_ELEMENT, { gridColumn: x + 1, gridRow: 1 }) },
        elementW > 30 ? (0, _changeUnit.showMeasure)(x * 100, unit) : ''
      ));
    }
  } else if (elementW > 200) {
    for (var _x = 0; _x < positiveUnitsNumber; _x++) {
      var val = _x * 100;
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

  return _react2.default.createElement(
    'div',
    { style: STYLE_RULER },
    _react2.default.createElement('div', {
      id: 'horizontalMarker',
      style: STYLE_MARKER }),
    _react2.default.createElement('div', {
      id: 'negativeRuler',
      style: STYLE_CONTAINER_NEGATIVE }),
    _react2.default.createElement(
      'div',
      {
        id: 'positiveRuler',
        style: STYLE_CONTAINER_POSTIVE
      },
      positiveDomElements
    )
  );
}

RulerX.propTypes = {
  unitPixelSize: _propTypes2.default.number.isRequired,
  positiveUnitsNumber: _propTypes2.default.number,
  negativeUnitsNumber: _propTypes2.default.number,
  zoom: _propTypes2.default.number.isRequired,
  mouseX: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.number.isRequired,
  zeroLeftPosition: _propTypes2.default.number.isRequired,
  backgroundColor: _propTypes2.default.string,
  fontColor: _propTypes2.default.string,
  markerColor: _propTypes2.default.string
};

RulerX.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};

// RulerX.contextTypes = {
//   translator: PropTypes.object.isRequired
// };

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