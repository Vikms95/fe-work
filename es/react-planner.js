var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, useEffect, useRef, useState, useMemo } from 'react';

import './utils/wdyr';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { getIsElementSelected } from './selectors/selectors';
import { objectsMap } from './utils/objects-utils';
import { Context } from './context/context';

import { ToolbarComponents, Content, SidebarComponents, FooterBarComponents, TopbarComponents, DirectionComponent, MenuRoomsComponent, LoginComponent, RegisterComponent, MainComponent, MenuConstruccion, MenuMuebles, MenuPreferencias } from './components/export';

import { VERSION } from './version';
import './styles/export';
import { useComponentWillMount } from './hooks/useComponentWillMount';

var Toolbar = ToolbarComponents.Toolbar;
var Sidebar = SidebarComponents.Sidebar;
var FooterBar = FooterBarComponents.FooterBar;
var TopBar = TopbarComponents.TopBar;
var Direction = DirectionComponent.Direction;
var MenuRooms = MenuRoomsComponent.MenuRooms;


var toolbarW = 122;
var sidebarW = 280;
var footerBarH = 20;

var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

//TODO move to context.js
var setupContextObject = function setupContextObject(props) {
  return _extends({}, objectsMap(actions, function (actionNamespace) {
    return props[actionNamespace];
  }), {
    translator: props.translator,
    catalog: props.catalog
  });
};

// function ReactPlanner ( props ) {


//   useEffect( () => {
//     const foo = () => {
//       let {
//         state,
//         catalog,
//         prefs,
//         plugins,
//         prefsInfo,
//         stateExtractor,
//         projectActions,
//       } = props;

//       plugins.forEach( plugin => plugin( state, stateExtractor, projectActions ) );
//       projectActions.initCatalog( catalog );
//       projectActions.SetPreference( prefs, prefsInfo );
//     };
//     foo();
//   }, [] );


//   //todo componentWillReceiveProps
//   useMemo( () => {
//     let { stateExtractor, state, projectActions, catalog } = props;

//     let plannerState = stateExtractor( state );
//     // let catalogReady = plannerState.getIn( [ 'catalog', 'ready' ] );

//     // if ( !catalogReady ) {
//     //   projectActions.initCatalog( catalog );
//     // }

//     // This can go on its own useEffect(() => {}, [props])

//     const delay = 500;
//     const autosaveKey = 'react-planner_v0';

//     if ( !autosaveKey ) return;
//     if ( !localStorage ) return;

//     if ( timeout ) clearTimeout( timeout );

//     timeout = setTimeout( () => {
//       localStorage.setItem( autosaveKey, JSON.stringify( plannerState.scene.toJS() ) );
//     }, delay );
//   }, [ ...props ] );

//   const { width, height, state, stateExtractor, ...rest } = props;

//   const [ sizes, setSizes ] = useState( {
//     contentW: props.width - toolbarW + 14.6,
//     contentH: props.height - footerBarH,
//     toolbarH: props.height - 72, // 72 from topBar Height
//     sideBarW: props.width - 257, // 257 from sideBar Width
//     sideBarH: props.height - ( 82 + 120 ), // 72 from topBar Height and 130 from direction Height con los px de los borders
//     directionW: props.width - 257, // 257 from direction Width

//   } );

//   const { contentH, contentW, directionW, sideBarH, sideBarW, toolbarH } = sizes;

//   const refViewer = useRef();
//   let timeout = false;
//   const [ contextObject, setContextObject ] = useState( null );
//   const [ isContextLoaded, setIsContextLoaded ] = useState( false );

//   useEffect( () => {
//     if ( isContextLoaded === false ) {
//       setContextObject( () => setupContextObject( props ) );
//       setIsContextLoaded( ( prevIsContextLoaded ) => !prevIsContextLoaded );
//     }
//   } );

//   //todo componentWillMount
//   // const foo = () => {
//   //   let {
//   //     projectActions,
//   //     catalog,
//   //     stateExtractor,
//   //     plugins,
//   //     prefs,
//   //     prefsInfo,
//   //     state
//   //   } = props;

//   //   plugins.forEach( plugin => plugin( state, stateExtractor, projectActions ) );
//   //   projectActions.initCatalog( catalog );
//   //   projectActions.SetPreference( prefs, prefsInfo );
//   // };

//   // useComponentWillMount( foo );

//   const getState = () => {
//     return props.stateExtractor( props.state );
//   };

//   const isElementSelected = () => {
//     const { state } = props;
//     const plannerState = getState( state );
//     return getIsElementSelected( plannerState );
//   };

//   const panUp = ( value ) => {
//     return { ...value, f: value.f + 50 };
//   };

//   const panDown = ( value ) => {
//     return { ...value, f: value.f - 50 };
//   };

//   const panLeft = ( value ) => {
//     return { ...value, e: value.e + 50 };
//   };

//   const panRight = ( value ) => {
//     return { ...value, e: value.e - 50 };
//   };

//   const zoomIn = () => {
//     refViewer.current.zoomOnViewerCenter( 1.03 );
//   };

//   const zoomOut = () => {
//     refViewer.current.zoomOnViewerCenter( 0.97 );
//   };

//   const update2DView = ( value, event ) => {
//     const isKeystroke = getEventType( event );
//     const direction = getEventDirection( event, isKeystroke );

//     if ( isClickWithoutSelection( direction ) ) {
//       value = update2DViewObject( value, direction );
//     }

//     return update2DViewOnState( value );
//   };

//   const getEventDirection = ( event, isKeyStroke ) => {
//     if ( !event ) return;
//     if ( isKeyStroke ) return event.key;
//     return event.target.id;
//   };

//   const getEventType = ( event ) => {
//     if ( !event ) return;
//     return typeof event.key === 'string';
//   };

//   const isClickWithoutSelection = ( input, isKeyStroke ) => {
//     const isSelected = isElementSelected();
//     return input && !isKeyStroke && !isSelected;
//   };

//   const update2DViewObject = ( value, directionPressed ) => {
//     switch ( directionPressed ) {
//       case 'ArrowUp':
//         return panUp( value );
//       case 'ArrowDown':
//         return panDown( value );
//       case 'ArrowRight':
//         return panRight( value );
//       case 'ArrowLeft':
//         return panLeft( value );

//       case '+':
//       case 'ZoomIn':
//         return zoomIn();

//       case '-':
//       case 'ZoomOut':
//         return zoomOut();

//       default:
//         return value;
//     }
//   };

//   const update2DViewOnState = ( value ) => {
//     if ( !value ) return;
//     props.projectActions.updateZoomScale( value.a );
//     return props.viewer2DActions.updateCameraView( value );
//   };

//   const extractedState = stateExtractor( state );

//   if ( contextObject === null ) return;

//   return (
//     <div>
//       <Context.Provider value={ contextObject } >
//         <MainComponent state={ state } { ...props } />

//         <TopBar state={ extractedState }
//         // { ...props }
//         />

//         <div style={ { ...wrapperStyle, height } }>

//           <Toolbar
//             width={ toolbarW }
//             height={ toolbarH }
//             state={ extractedState }
//           // { ...props }
//           />

//           <div style={ { position: 'relative' } }>

//             <MenuRooms
//               state={ state }
//               { ...props }
//             />
//             <MenuConstruccion
//               state={ state }
//               { ...props }
//             />
//             <MenuMuebles
//               state={ state }
//               { ...props }
//             />
//             <LoginComponent state={ extractedState } { ...props } />
//             <RegisterComponent state={ state } { ...props } />
//             <MenuPreferencias state={ state } { ...props } />

//             <Content
//               style={ { position: 'absolute', zIndex: '0' } }
//               width={ contentW }
//               height={ contentH }
//               state={ extractedState }
//               refViewer2D={ refViewer }
//               update2DView={ update2DView }
//               onWheel={ event => event.preventDefault() }
//             // { ...props }
//             />

//           </div>

//           <Sidebar
//             state={ extractedState }
//             width={ sideBarW }
//             height={ sideBarH }
//           // { ...props }
//           />

//           { refViewer && (
//             <Direction
//               width={ directionW }
//               state={ extractedState }
//               refViewer2D={ refViewer }
//               update2DView={ update2DView }
//             // { ...props }

//             />
//           )
//           }
//         </div>
//       </Context.Provider>
//     </div >
//   );
// }


var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner(props) {
    _classCallCheck(this, ReactPlanner);

    var _this = _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).call(this, props));

    _this.state = {
      contentW: props.width - toolbarW + 14.6,
      contentH: props.height - footerBarH,
      toolbarH: props.height - 72, // 72 from topBar Height
      sideBarW: props.width - 257, // 257 from sideBar Width
      sideBarH: props.height - (82 + 120), // 72 from topBar Height and 130 from direction Height con los px de los borders
      directionW: props.width - 257 // 257 from direction Width
    };

    _this.refViewer = React.createRef();
    _this.timeout = false;
    _this.contextObject = null;

    _this.panUp = _this.panUp.bind(_this);
    _this.zoomIn = _this.zoomIn.bind(_this);
    _this.panDown = _this.panDown.bind(_this);
    _this.zoomOut = _this.zoomOut.bind(_this);
    _this.panLeft = _this.panLeft.bind(_this);
    _this.panRight = _this.panRight.bind(_this);

    _this.update2DView = _this.update2DView.bind(_this);
    _this.update2DViewObject = _this.update2DViewObject.bind(_this);
    _this.update2DViewOnState = _this.update2DViewOnState.bind(_this);

    _this.getState = _this.getState.bind(_this);
    return _this;
  }

  // UseEffect con []


  _createClass(ReactPlanner, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins,
          prefs = _props.prefs,
          prefsInfo = _props.prefsInfo,
          state = _props.state;


      plugins.forEach(function (plugin) {
        return plugin(state, stateExtractor, projectActions);
      });
      projectActions.initCatalog(catalog);
      projectActions.SetPreference(prefs, prefsInfo);
      this.contextObject = setupContextObject(this.props);
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // useEffect(() => {}, [props])

      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;


      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(['catalog', 'ready']);

      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }

      // This can go on its own useEffect(() => {}, [props])

      var delay = 500;
      var autosaveKey = 'react-planner_v0';

      if (!autosaveKey) return;
      if (!localStorage) return;

      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        localStorage.setItem(autosaveKey, JSON.stringify(plannerState.scene.toJS()));
      }, delay);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.props.stateExtractor(this.props.state);
    }
  }, {
    key: 'isElementSelected',
    value: function isElementSelected() {
      var state = this.props.state;

      var plannerState = this.getState(state);
      return getIsElementSelected(plannerState);
    }
  }, {
    key: 'panUp',
    value: function panUp(value) {
      return _extends({}, value, { f: value.f + 50 });
    }
  }, {
    key: 'panDown',
    value: function panDown(value) {
      return _extends({}, value, { f: value.f - 50 });
    }
  }, {
    key: 'panLeft',
    value: function panLeft(value) {
      return _extends({}, value, { e: value.e + 50 });
    }
  }, {
    key: 'panRight',
    value: function panRight(value) {
      return _extends({}, value, { e: value.e - 50 });
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      this.refViewer.current.zoomOnViewerCenter(1.03);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      this.refViewer.current.zoomOnViewerCenter(0.97);
    }
  }, {
    key: 'update2DView',
    value: function update2DView(value, event) {
      var isKeystroke = this.getEventType(event);
      var direction = this.getEventDirection(event, isKeystroke);

      if (this.isClickWithoutSelection(direction)) {
        value = this.update2DViewObject(value, direction);
      }

      return this.update2DViewOnState(value);
    }
  }, {
    key: 'getEventDirection',
    value: function getEventDirection(event, isKeyStroke) {
      if (!event) return;
      if (isKeyStroke) return event.key;
      return event.target.id;
    }
  }, {
    key: 'getEventType',
    value: function getEventType(event) {
      if (!event) return;
      return typeof event.key === 'string';
    }
  }, {
    key: 'isClickWithoutSelection',
    value: function isClickWithoutSelection(input, isKeyStroke) {
      var isSelected = this.isElementSelected();
      return input && !isKeyStroke && !isSelected;
    }
  }, {
    key: 'update2DViewObject',
    value: function update2DViewObject(value, directionPressed) {
      switch (directionPressed) {
        case 'ArrowUp':
          return this.panUp(value);
        case 'ArrowDown':
          return this.panDown(value);
        case 'ArrowRight':
          return this.panRight(value);
        case 'ArrowLeft':
          return this.panLeft(value);

        case '+':
        case 'ZoomIn':
          return this.zoomIn();

        case '-':
        case 'ZoomOut':
          return this.zoomOut();

        default:
          return value;
      }
    }
  }, {
    key: 'update2DViewOnState',
    value: function update2DViewOnState(value) {
      if (!value) return;
      this.props.projectActions.updateZoomScale(value.a);
      return this.props.viewer2DActions.updateCameraView(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var update2DView = this.update2DView,
          contextObject = this.contextObject;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          state = _props2.state,
          stateExtractor = _props2.stateExtractor,
          props = _objectWithoutProperties(_props2, ['width', 'height', 'state', 'stateExtractor']);

      var _state = this.state,
          contentH = _state.contentH,
          contentW = _state.contentW,
          directionW = _state.directionW,
          sideBarH = _state.sideBarH,
          sideBarW = _state.sideBarW,
          toolbarH = _state.toolbarH;

      var extractedState = stateExtractor(state);

      return React.createElement(
        'div',
        null,
        React.createElement(
          Context.Provider,
          { value: contextObject },
          React.createElement(MainComponent, _extends({ state: state }, props)),
          React.createElement(TopBar, _extends({ state: extractedState }, props)),
          React.createElement(
            'div',
            { style: _extends({}, wrapperStyle, { height: height }) },
            React.createElement(Toolbar, _extends({
              width: toolbarW,
              height: toolbarH,
              state: extractedState
            }, props)),
            React.createElement(
              'div',
              { style: { position: 'relative' } },
              React.createElement(MenuRooms, _extends({
                state: state
              }, props)),
              React.createElement(MenuConstruccion, _extends({
                state: state
              }, props)),
              React.createElement(MenuMuebles, _extends({
                state: state
              }, props)),
              React.createElement(LoginComponent, _extends({ state: extractedState }, props)),
              React.createElement(RegisterComponent, _extends({ state: state }, props)),
              React.createElement(MenuPreferencias, _extends({ state: state }, props)),
              React.createElement(Content, _extends({
                style: { position: 'absolute', zIndex: '0' },
                width: contentW,
                height: contentH,
                state: extractedState,
                refViewer2D: this.refViewer,
                update2DView: update2DView,
                onWheel: function onWheel(event) {
                  return event.preventDefault();
                }
              }, props))
            ),
            React.createElement(Sidebar, _extends({
              state: extractedState,
              width: sideBarW,
              height: sideBarH
            }, props)),
            this.refViewer && React.createElement(Direction, _extends({
              width: directionW,
              state: extractedState,
              refViewer2D: this.refViewer,
              handleZoom2D: this.handleZoom2D,
              update2DView: update2DView
            }, props))
          )
        )
      );
    }
  }]);

  return ReactPlanner;
}(Component);

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string
  //prefsInfo: PropTypes.object,
  //prefs: PropTypes.object,
};

// ReactPlanner.contextTypes = {
//   store: PropTypes.object.isRequired,
// };

// ReactPlanner.childContextTypes = {
//   ...objectsMap( actions, () => PropTypes.object ),
//   translator: PropTypes.object,
//   catalog: PropTypes.object,
// };

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: 'For2Home ' + VERSION,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
  prefsInfo: {},
  prefs: {}
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, function (actionNamespace) {
    return bindActionCreators(actions[actionNamespace], dispatch);
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);