var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import * as SharedStyle from '../../shared-style';
import { getIsElementSelected } from '../../selectors/selectors';

// Imports de imagenes
import iconDown from './../../assets/direction/direction_down_arrow_icon.png';
import iconLeft from './../../assets/direction/direction_left_arrow_icon.png';
import iconRight from './../../assets/direction/direction_right_arrow_icon.png';
import iconUp from './../../assets/direction/direction_up_arrow_icon.png';
import iconPlus from './../../assets/direction/plus_icon.png';
import iconMinus from './../../assets/direction/minus_icon.png';
import active2D from './../../assets/direction/active2D.png';
import active3D from './../../assets/direction/active3D.png';

import { dispatch3DMoveDown, dispatch3DMoveLeft, dispatch3DMoveRight, dispatch3DMoveUp, dispatch3DZoomIn, dispatch3DZoomOut } from '../../utils/dispatch-event';

import { MODE_IDLE, MODE_DRAWING_ITEM, MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_3D_VIEW } from '../../constants';

var STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: 'solid 2px ' + SharedStyle.PRIMARY_COLOR.master,
  paddingTop: '20px'
};

var STYLE_ZOOM = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10%',
  paddingRight: '20px'
};

var STYLE_ARROWS = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10%'
};

var STYLE_BUTTONS_ZOOM = {
  cursor: 'pointer'
};

var STYLE_BUTTONS_DIRECTION = {
  cursor: 'pointer'
};

export default function Direction(_ref) {
  var state = _ref.state,
      width = _ref.width,
      update2DView = _ref.update2DView,
      projectActions = _ref.projectActions,
      viewer3DActions = _ref.viewer3DActions;


  var viewer2DState = state.get('viewer2D').toJS();
  var mode = state.getIn(['mode']);
  var is3DMode = state.getIn(['mode']) === MODE_3D_VIEW;

  var getCanvas = function getCanvas() {
    return document.querySelector('canvas');
  };

  // TODO implement this function
  var dispatchWhileIdle2D = function dispatchWhileIdle2D(dispatch) {
    var selected = getIsElementSelected(state);
    if (!selected) dispatch();
  };

  var dispatchWhileIdle3D = function dispatchWhileIdle3D(dispatch) {
    var canvas = getCanvas();
    var selected = getIsElementSelected(state);
    if (canvas && !selected) dispatch(canvas);
  };

  var changeTo2D = function changeTo2D() {
    projectActions.setMode(MODE_IDLE);
  };

  var changeTo3D = function changeTo3D() {
    viewer3DActions.selectTool3DView();
  };

  return React.createElement(
    'div',
    { style: { position: 'absolute', left: width, bottom: '0', width: '257px', height: '130px', Zindex: '9002' } },
    React.createElement(
      'aside',
      { style: STYLE },
      React.createElement(
        'div',
        { style: { height: '4.6em', paddingLeft: '20px' } },
        mode === MODE_IDLE || mode === MODE_DRAWING_ITEM || mode === MODE_DRAWING_LINE || mode === MODE_WAITING_DRAWING_LINE || mode === MODE_DRAWING_HOLE ? React.createElement('img', { onClick: changeTo3D, style: { cursor: 'pointer' }, src: active2D }) : React.createElement('img', { onClick: changeTo2D, style: { cursor: 'pointer' }, src: active3D })
      ),
      React.createElement(
        'div',
        { style: STYLE_ARROWS },
        React.createElement('img', {
          style: _extends({}, STYLE_BUTTONS_DIRECTION, { marginBottom: '-1px' }),
          src: iconUp,
          id: 'ArrowUp',
          onClick: is3DMode ? function () {
            return dispatchWhileIdle3D(dispatch3DMoveUp);
          } : function (event) {
            return update2DView(viewer2DState, event);
          }
        }),
        React.createElement(
          'div',
          { style: { flexDirection: 'row' } },
          React.createElement('img', {
            style: _extends({}, STYLE_BUTTONS_DIRECTION, { marginRight: '-1px' }),
            src: iconLeft,
            id: 'ArrowLeft',
            onClick: is3DMode ? function () {
              return dispatchWhileIdle3D(dispatch3DMoveLeft);
            } : function (event) {
              return update2DView(viewer2DState, event);
            }
          }),
          React.createElement('img', {
            style: _extends({}, STYLE_BUTTONS_DIRECTION),
            id: 'ArrowDown',
            src: iconDown,
            onClick: is3DMode ? function () {
              return dispatchWhileIdle3D(dispatch3DMoveDown);
            } : function (event) {
              return update2DView(viewer2DState, event);
            }
          }),
          React.createElement('img', {
            style: _extends({}, STYLE_BUTTONS_DIRECTION, { marginLeft: '-1px' }),
            id: 'ArrowRight',
            src: iconRight,
            onClick: is3DMode ? function () {
              return dispatchWhileIdle3D(dispatch3DMoveRight);
            } : function (event) {
              return update2DView(viewer2DState, event);
            }
          })
        )
      ),
      React.createElement(
        'div',
        { style: STYLE_ZOOM },
        React.createElement('img', {
          style: _extends({}, STYLE_BUTTONS_ZOOM, { marginBottom: '0.5em' }),
          src: iconPlus,
          id: 'ZoomIn',
          onClick: is3DMode ? function () {
            return dispatchWhileIdle3D(dispatch3DZoomIn);
          } : function (event) {
            return update2DView(viewer2DState, event);
          }
        }),
        React.createElement('img', {
          style: STYLE_BUTTONS_ZOOM,
          src: iconMinus,
          id: 'ZoomOut',
          onClick: is3DMode ? function () {
            return dispatchWhileIdle3D(dispatch3DZoomOut);
          } : function (event) {
            return update2DView(viewer2DState, event);
          }
        })
      )
    )
  );
}

// export default class Direction extends Component {

//   constructor ( props, context ) {
//     super( props, context );
//     this.state = {};
//     this.is2DActivate = true;
//     this.update2DView = this.props.update2DView;

//     this.moveUpViewer3D = this.moveUpViewer3D.bind( this );
//     this.zoomInViewer3D = this.zoomInViewer3D.bind( this );
//     this.zoomOutViewer3D = this.zoomOutViewer3D.bind( this );
//     this.moveLeftViewer3D = this.moveLeftViewer3D.bind( this );
//     this.moveDownViewer3D = this.moveDownViewer3D.bind( this );
//     this.moveRightViewer3D = this.moveRightViewer3D.bind( this );
//   }

//   componentDidMount () {
//     /*    console.log('didMount Direction')
//         console.log('refViewer2D', this.props.refViewer2D)*/
//   }

//   /* shouldComponentUpdate(nextProps, nextState) {
//      return this.props.state.mode !== nextProps.state.mode ||
//        this.props.height !== nextProps.height ||
//        this.props.width !== nextProps.width ||
//        this.props.state.alterate !== nextProps.state.alterate;
//    }*/


//   moveLeftViewer3D () {
//     const selected = getIsElementSelected( this.props.state );
//     console.log( 'test', selected );
//     if ( !selected ) dispatch3DMoveLeft();
//   }

//   moveRightViewer3D () {
//     const selected = getIsElementSelected( this.props.state );
//     if ( !selected ) dispatch3DMoveRight();
//   }

//   moveUpViewer3D () {
//     const selected = getIsElementSelected( this.props.state );
//     if ( !selected ) dispatch3DMoveUp();
//   }

//   moveDownViewer3D () {
//     const selected = getIsElementSelected( this.props.state );
//     if ( !selected ) dispatch3DMoveDown();
//   }

//   zoomInViewer3D () {
//     const canvas = document.querySelector( 'canvas' );
//     const selected = getIsElementSelected( this.props.state );
//     if ( canvas && !selected ) dispatch3DZoomIn( canvas );
//   }

//   zoomOutViewer3D () {
//     const canvas = document.querySelector( 'canvas' );
//     const selected = getIsElementSelected( this.props.state );
//     if ( canvas && !selected ) dispatch3DZoomOut( canvas );
//   }

//   render () {

//     const {
//       props: {
//         state,
//         width,
//         height,
//         refViewer2D,
//         toolbarButtons,
//         allowProjectFileSupport
//       },
//       context: {
//         projectActions,
//         viewer2DActions,
//         viewer3DActions,
//         translator
//       },
//       update2DView,
//       moveDownViewer3D,
//       moveLeftViewer3D,
//       moveRightViewer3D,
//       moveUpViewer3D,
//       zoomInViewer3D,
//       zoomOutViewer3D
//     } = this;


//     const viewer2DState = state.get( 'viewer2D' ).toJS();
//     const mode = state.getIn( [ 'mode' ] );
//     const is3DMode = state.getIn( [ 'mode' ] ) === MODE_3D_VIEW;

//     const changeTo2D = () => {
//       this.is2DActivate = true;
//       this.props.projectActions.setMode( MODE_IDLE );
//     };

//     const changeTo3D = () => {
//       this.is2DActivate = false;
//       this.props.viewer3DActions.selectTool3DView();
//     };


//     const changeVisor = () => {
//       if ( !this.is2DActivate ) {
//         return <img onClick={ changeTo2D } style={ { cursor: 'pointer' } } src={ active3D } />;
//       } else {
//         return <img onClick={ changeTo3D } style={ { cursor: 'pointer' } } src={ active2D } />;
//       }
//     };

//     return (
//       <div style={ { position: 'absolute', left: width, bottom: '0', width: '257px', height: '130px', Zindex: '9002' } }>
//         <aside style={ STYLE }>
//           {/* 2D/3D Button */ }
//           <div style={ { height: '4.6em', paddingLeft: '20px' } }>
//             {
//               ( mode === MODE_IDLE ||
//                 mode === MODE_DRAWING_ITEM ||
//                 mode === MODE_DRAWING_LINE ||
//                 mode === MODE_WAITING_DRAWING_LINE ||
//                 mode === MODE_DRAWING_HOLE )
//                 ?
//                 <img onClick={ changeTo3D } style={ { cursor: 'pointer' } } src={ active2D } />
//                 :
//                 <img onClick={ changeTo2D } style={ { cursor: 'pointer' } } src={ active3D } />
//             }

//             {/*{changeVisor()}*/ }
//           </div>

//           {/* Direction Buttons */ }
//           <div style={ STYLE_ARROWS }>
//             <img
//               style={ { ...STYLE_BUTTONS_DIRECTION, marginBottom: '-1px' } }
//               src={ iconUp }
//               id='ArrowUp'
//               onClick={
//                 is3DMode
//                   ? () => moveUpViewer3D()
//                   : ( event ) => update2DView( viewer2DState, event )
//               }
//             />

//             <div style={ { flexDirection: 'row' } }>
//               <img
//                 style={ { ...STYLE_BUTTONS_DIRECTION, marginRight: '-1px' } }
//                 src={ iconLeft }
//                 id='ArrowLeft'
//                 onClick={
//                   is3DMode
//                     ? () => moveLeftViewer3D()
//                     : ( event ) => update2DView( viewer2DState, event )
//                 }
//               />

//               <img
//                 style={ { ...STYLE_BUTTONS_DIRECTION } }
//                 id='ArrowDown'
//                 src={ iconDown }
//                 onClick={
//                   is3DMode
//                     ? () => moveDownViewer3D()
//                     : ( event ) => update2DView( viewer2DState, event )
//                 }
//               />

//               <img
//                 style={ { ...STYLE_BUTTONS_DIRECTION, marginLeft: '-1px' } }
//                 id='ArrowRight'
//                 src={ iconRight }
//                 onClick={
//                   is3DMode
//                     ? () => moveRightViewer3D()
//                     : ( event ) => update2DView( viewer2DState, event )
//                 }
//               />
//             </div>
//           </div>

//           {/* Zoom Buttons */ }
//           <div style={ STYLE_ZOOM }>
//             <img
//               style={ { ...STYLE_BUTTONS_ZOOM, marginBottom: '0.5em' } }
//               src={ iconPlus }
//               id='ZoomIn'
//               onClick={
//                 is3DMode
//                   ? () => zoomInViewer3D()
//                   : ( event ) => update2DView( viewer2DState, event )
//               }
//             />

//             <img
//               style={ STYLE_BUTTONS_ZOOM }
//               src={ iconMinus }
//               id='ZoomOut'
//               onClick={
//                 is3DMode
//                   ? () => zoomOutViewer3D()
//                   : ( event ) => update2DView( viewer2DState, event )
//               }
//             />
//           </div>
//         </aside>
//       </div>
//     );
//   }
// }