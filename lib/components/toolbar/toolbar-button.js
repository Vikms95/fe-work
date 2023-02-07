'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ToolbarButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _rectangulo = require('./../../assets/salgar/rectangulo.png');

var _rectangulo2 = _interopRequireDefault(_rectangulo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://www.cssportal.com/css-tooltip-generator/

var STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  position: 'relative',
  cursor: 'pointer'
};

var STYLE_IMG = {
  /* width: '80px',
   height: '80px',*/
};

var STYLE_CONTAINER = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

var STYLE_P = {
  margin: '10px 0px 10px 0px',
  fontSize: '0.9em',
  color: SharedStyle.PRIMARY_COLOR.master
};

var STYLE_TOOLTIP = {
  position: 'absolute',
  width: '140px',
  color: SharedStyle.COLORS.white,
  background: SharedStyle.COLORS.black,
  height: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  visibility: 'visible',
  borderRadius: '6px',
  opacity: '0.8',
  left: '100%',
  top: '50%',
  marginTop: '-15px',
  marginLeft: '15px',
  zIndex: '999',
  fontSize: '12px'
};

var STYLE_TOOLTIP_PIN = {
  position: 'absolute',
  top: '50%',
  right: '100%',
  marginTop: '-8px',
  width: '0',
  height: '0',
  borderRight: '8px solid #000000',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
};

function ToolbarButton(_ref) {
  var index = _ref.index,
      img = _ref.img,
      text = _ref.text,
      tooltip = _ref.tooltip,
      onClick = _ref.onClick,
      children = _ref.children,
      propsActive = _ref.active;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var STYLE_IMG = {
    position: 'absolute',
    marginTop: '-1em',
    marginLeft: '-4.6em',
    opacity: active || propsActive ? 0.2 : 0
  };

  return _react2.default.createElement(
    'div',
    {
      onClick: onClick,
      onMouseOver: function onMouseOver() {
        return setActive(true);
      },
      onMouseOut: function onMouseOut() {
        return setActive(false);
      },
      style: index === 0 ? _extends({}, STYLE, { paddingTop: '30px' }) : _extends({}, STYLE)
    },
    _react2.default.createElement(
      'div',
      { style: _extends({}, STYLE_CONTAINER) },
      _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement('img', { style: STYLE_IMG, src: _rectangulo2.default })
      ),
      _react2.default.createElement(
        'div',
        { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        _react2.default.createElement('img', { src: img }),
        _react2.default.createElement(
          'p',
          { style: STYLE_P },
          text
        ),
        children
      )
    ),
    active && _react2.default.createElement(
      'div',
      { style: STYLE_TOOLTIP },
      _react2.default.createElement('span', { style: STYLE_TOOLTIP_PIN }),
      tooltip
    )
  );
}

// export default class ToolbarButton extends React.Component {

//   constructor ( props, context ) {
//     super( props, context );
//     this.state = { active: false };
//   }

//   render () {
//     let { state, props } = this;
//     let color = props.active || state.active ?
//       SharedStyle.SECONDARY_COLOR.icon
//       :
//       SharedStyle.PRIMARY_COLOR.icon;

//     let bgColor = props.active || state.active ?
//       SharedStyle.SECONDARY_COLOR.background
//       :
//       SharedStyle.PRIMARY_COLOR.background;

//     /*STYLE = { ...STYLE, backgroundColor: bgColor }*/
//     STYLE = { ...STYLE };

//     let styleImage = state.active || props.active ?
//       { ...STYLE_IMG, position: 'absolute', marginTop: '-1em', marginLeft: '-4.6em', opacity: 0.2 }
//       :
//       { ...STYLE_IMG, position: 'absolute', marginTop: '-1em', marginLeft: '-4.6em', opacity: 0 };

//     /*let printDiv;
//     if (props.img) {
//       printDiv = <div style={{ ...STYLE_CONTAINER, color }} onClick={props.onClick}>
//         <img style={STYLE_IMG} src={props.img} />
//         <p style={STYLE_P}>{props.text}</p>
//         {props.children}
//       </div>
//     } else {
//       printDiv = <div style={{ color }} onClick={props.onClick}>
//         {props.children}
//       </div>
//     }*/

//     return (
//       <div style={ props.index === 0 ? { ...STYLE, paddingTop: '30px' } : { ...STYLE } }
//         onClick={ props.onClick }
//         onMouseOver={ event => this.setState( { active: true } ) }
//         onMouseOut={ event => this.setState( { active: false } ) }>

//         {/*<div style={{ ...STYLE_CONTAINER, color }} >
//           <img style={STYLE_IMG} src={props.img} />
//           <p style={STYLE_P}>{props.text}</p>
//           {props.children}
//         </div>*/}

//         <div style={ { ...STYLE_CONTAINER } } >
//           <div style={ { position: 'relative' } }>
//             <img style={ styleImage } src={ rectangulo } />
//           </div>
//           <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', } } >
//             <img style={ STYLE_IMG } src={ props.img } />
//             <p style={ STYLE_P }>{ props.text }</p>
//             { props.children }
//           </div>
//         </div>

//         { state.active ?
//           <div style={ STYLE_TOOLTIP }>
//             <span style={ STYLE_TOOLTIP_PIN } />
//             { props.tooltip }
//           </div>
//           : null
//         }

//       </div>
//     );
//   }
// }

ToolbarButton.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  tooltip: _propTypes2.default.string.isRequired
  // onClick: PropTypes.func.isRequired
};