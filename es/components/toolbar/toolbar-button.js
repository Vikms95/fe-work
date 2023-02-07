var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

import rectangulo from './../../assets/salgar/rectangulo.png';

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

export default function ToolbarButton(_ref) {
  var index = _ref.index,
      img = _ref.img,
      text = _ref.text,
      tooltip = _ref.tooltip,
      onClick = _ref.onClick,
      children = _ref.children,
      propsActive = _ref.active;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var STYLE_IMG = {
    position: 'absolute',
    marginTop: '-1em',
    marginLeft: '-4.6em',
    opacity: active || propsActive ? 0.2 : 0
  };

  return React.createElement(
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
    React.createElement(
      'div',
      { style: _extends({}, STYLE_CONTAINER) },
      React.createElement(
        'div',
        { style: { position: 'relative' } },
        React.createElement('img', { style: STYLE_IMG, src: rectangulo })
      ),
      React.createElement(
        'div',
        { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        React.createElement('img', { src: img }),
        React.createElement(
          'p',
          { style: STYLE_P },
          text
        ),
        children
      )
    ),
    active && React.createElement(
      'div',
      { style: STYLE_TOOLTIP },
      React.createElement('span', { style: STYLE_TOOLTIP_PIN }),
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
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired
  // onClick: PropTypes.func.isRequired
};