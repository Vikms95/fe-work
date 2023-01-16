import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

import rectangulo from './../../assets/salgar/rectangulo.png';

//http://www.cssportal.com/css-tooltip-generator/

let STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  position: 'relative',
  cursor: 'pointer'
};

const STYLE_IMG = {
  /* width: '80px',
   height: '80px',*/
};

const STYLE_CONTAINER = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const STYLE_P = {
  margin: '10px 0px 10px 0px',
  fontSize: '0.9em',
  color: SharedStyle.PRIMARY_COLOR.master,
};

const STYLE_TOOLTIP = {
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

const STYLE_TOOLTIP_PIN = {
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

// export default function ToolbarButton ( {
//   index,
//   img,
//   text,
//   tooltip,
//   onClick,
//   children,
//   active: propsActive,

// } ) {

//   const [ active, setActive ] = useState( false );

//   const STYLE_IMG = {
//     position: 'absolute',
//     marginTop: '-1em',
//     marginLeft: '-4.6em',
//     opacity: ( active || propsActive ) ? 0.2 : 0
//   };

//   return (
//     <div
//       onClick={ onClick }
//       onMouseOver={ () => setActive( true ) }
//       onMouseOut={ () => setActive( false ) }
//       style={ ( index === 0 )
//         ? { ...STYLE, paddingTop: '30px' }
//         : { ...STYLE }
//       }
//     >

//       <div style={ { ...STYLE_CONTAINER } } >
//         <div style={ { position: 'relative' } }>
//           <img style={ STYLE_IMG } src={ rectangulo } />
//         </div>
//         <div style={ {
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//         } }
//         >
//           <img src={ img } />
//           <p style={ STYLE_P }>{ text }</p>
//           { children }
//         </div>
//       </div>

//       { ( active ) && (
//         <div style={ STYLE_TOOLTIP }>
//           <span style={ STYLE_TOOLTIP_PIN } />
//           { tooltip }
//         </div>
//       ) }
//     </div>
//   );
// }

export default class ToolbarButton extends React.Component {

  constructor ( props, context ) {
    super( props, context );
    this.state = { active: false };
  }

  render () {
    let { state, props } = this;
    let color = props.active || state.active ?
      SharedStyle.SECONDARY_COLOR.icon
      :
      SharedStyle.PRIMARY_COLOR.icon;

    let bgColor = props.active || state.active ?
      SharedStyle.SECONDARY_COLOR.background
      :
      SharedStyle.PRIMARY_COLOR.background;

    /*STYLE = { ...STYLE, backgroundColor: bgColor }*/
    STYLE = { ...STYLE };

    let styleImage = state.active || props.active ?
      { ...STYLE_IMG, position: 'absolute', marginTop: '-1em', marginLeft: '-4.6em', opacity: 0.2 }
      :
      { ...STYLE_IMG, position: 'absolute', marginTop: '-1em', marginLeft: '-4.6em', opacity: 0 };

    /*let printDiv;
    if (props.img) {
      printDiv = <div style={{ ...STYLE_CONTAINER, color }} onClick={props.onClick}>
        <img style={STYLE_IMG} src={props.img} />
        <p style={STYLE_P}>{props.text}</p>
        {props.children}
      </div>
    } else {
      printDiv = <div style={{ color }} onClick={props.onClick}>
        {props.children}
      </div>
    }*/

    return (
      <div style={ props.index === 0 ? { ...STYLE, paddingTop: '30px' } : { ...STYLE } }
        onClick={ props.onClick }
        onMouseOver={ event => this.setState( { active: true } ) }
        onMouseOut={ event => this.setState( { active: false } ) }>

        {/*<div style={{ ...STYLE_CONTAINER, color }} >
          <img style={STYLE_IMG} src={props.img} />
          <p style={STYLE_P}>{props.text}</p>
          {props.children}
        </div>*/}

        <div style={ { ...STYLE_CONTAINER } } >
          <div style={ { position: 'relative' } }>
            <img style={ styleImage } src={ rectangulo } />
          </div>
          <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', } } >
            <img style={ STYLE_IMG } src={ props.img } />
            <p style={ STYLE_P }>{ props.text }</p>
            { props.children }
          </div>
        </div>

        { state.active ?
          <div style={ STYLE_TOOLTIP }>
            <span style={ STYLE_TOOLTIP_PIN } />
            { props.tooltip }
          </div>
          : null
        }

      </div>
    );
  }
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired
};
