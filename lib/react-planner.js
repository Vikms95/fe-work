'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./utils/wdyr');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _translator = require('./translator/translator');

var _translator2 = _interopRequireDefault(_translator);

var _catalog = require('./catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _export = require('./actions/export');

var _export2 = _interopRequireDefault(_export);

var _selectors = require('./selectors/selectors');

var _objectsUtils = require('./utils/objects-utils');

var _context = require('./context/context');

var _export3 = require('./components/export');

var _version = require('./version');

require('./styles/export');

var _useComponentWillMount = require('./hooks/useComponentWillMount');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = _export3.ToolbarComponents.Toolbar;
var Sidebar = _export3.SidebarComponents.Sidebar;
var FooterBar = _export3.FooterBarComponents.FooterBar;
var TopBar = _export3.TopbarComponents.TopBar;
var Direction = _export3.DirectionComponent.Direction;
var MenuRooms = _export3.MenuRoomsComponent.MenuRooms;


var toolbarW = 122;
var sidebarW = 280;
var footerBarH = 20;

var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

//TODO move to context.js
var setupContextObject = function setupContextObject(props) {
  return _extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
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

    _this.refViewer = _react2.default.createRef();
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
      return (0, _selectors.getIsElementSelected)(plannerState);
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

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _context.Context.Provider,
          { value: contextObject },
          _react2.default.createElement(_export3.MainComponent, _extends({ state: state }, props)),
          _react2.default.createElement(TopBar, _extends({ state: extractedState }, props)),
          _react2.default.createElement(
            'div',
            { style: _extends({}, wrapperStyle, { height: height }) },
            _react2.default.createElement(Toolbar, _extends({
              width: toolbarW,
              height: toolbarH,
              state: extractedState
            }, props)),
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement(MenuRooms, _extends({
                state: state
              }, props)),
              _react2.default.createElement(_export3.MenuConstruccion, _extends({
                state: state
              }, props)),
              _react2.default.createElement(_export3.MenuMuebles, _extends({
                state: state
              }, props)),
              _react2.default.createElement(_export3.LoginComponent, _extends({ state: extractedState }, props)),
              _react2.default.createElement(_export3.RegisterComponent, _extends({ state: state }, props)),
              _react2.default.createElement(_export3.MenuPreferencias, _extends({ state: state }, props)),
              _react2.default.createElement(_export3.Content, _extends({
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
            _react2.default.createElement(Sidebar, _extends({
              state: extractedState,
              width: sideBarW,
              height: sideBarH
            }, props)),
            this.refViewer && _react2.default.createElement(Direction, _extends({
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
}(_react.Component);

ReactPlanner.propTypes = {
  translator: _propTypes2.default.instanceOf(_translator2.default),
  catalog: _propTypes2.default.instanceOf(_catalog2.default),
  allowProjectFileSupport: _propTypes2.default.bool,
  plugins: _propTypes2.default.arrayOf(_propTypes2.default.func),
  autosaveKey: _propTypes2.default.string,
  autosaveDelay: _propTypes2.default.number,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  stateExtractor: _propTypes2.default.func.isRequired,
  toolbarButtons: _propTypes2.default.array,
  sidebarComponents: _propTypes2.default.array,
  footerbarComponents: _propTypes2.default.array,
  customContents: _propTypes2.default.object,
  softwareSignature: _propTypes2.default.string
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
  translator: new _translator2.default(),
  catalog: new _catalog2.default(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: 'For2Home ' + _version.VERSION,
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
  return (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
    return (0, _redux.bindActionCreators)(_export2.default[actionNamespace], dispatch);
  });
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactPlanner);