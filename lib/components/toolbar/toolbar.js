'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Imports de imagenes


// Salgar


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require('../../constants');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _Paredes = require('./../../assets/toolbar/Paredes.png');

var _Paredes2 = _interopRequireDefault(_Paredes);

var _Construccion = require('./../../assets/toolbar/Construccion.png');

var _Construccion2 = _interopRequireDefault(_Construccion);

var _Electros = require('./../../assets/toolbar/Electros.png');

var _Electros2 = _interopRequireDefault(_Electros);

var _Decoracion = require('./../../assets/toolbar/Decoracion.png');

var _Decoracion2 = _interopRequireDefault(_Decoracion);

var _Estilos = require('./../../assets/toolbar/Estilos.png');

var _Estilos2 = _interopRequireDefault(_Estilos);

var _Mi_catalogo = require('./../../assets/toolbar/Mi_catalogo.png');

var _Mi_catalogo2 = _interopRequireDefault(_Mi_catalogo);

var _banyoSalgar = require('./../../assets/salgar/toolBar/banyoSalgar.png');

var _banyoSalgar2 = _interopRequireDefault(_banyoSalgar);

var _context = require('../../context/context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const STYLE_ICON_TEXT = {
//   fontSize: '10px',
//   textDecoration: 'none',
//   fontWeight: 'bold',
//   margin: '0px',
//   userSelect: 'none'
// };

var STYLE_ASIDE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  borderRightStyle: 'solid',
  borderRightWidth: '2px',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
  overflowY: 'auto',
  overflowX: 'hidden'
};

// TODO figure out the logic here
var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

// TODO figure out the logic here
var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    {
      key: ind,
      condition: el.condition,
      style: { display: 'flex', flexDirection: 'column' }
    },
    el.dom
  );
};

function Toolbar(_ref) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height;

  var _useContext = (0, _react.useContext)(_context.Context),
      projectActions = _useContext.projectActions;

  var mode = state.get('mode');
  var allMenus = ['menuRooms', 'menuConstruccion', 'menuMuebles'];

  var showAndHideMenus = function showAndHideMenus(menuShow) {
    allMenus.forEach(function (ele) {
      if (ele === menuShow) {

        if (document.getElementById(ele).style.display === 'block') {
          document.getElementById(ele).style.display = 'none';
        } else {
          document.getElementById(ele).style.display = 'block';
        }
      } else {
        document.getElementById(ele).style.display = 'none';
      }
    });
  };

  var sorter = [{
    index: 0, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 0,
      tooltip: 'Paredes',
      onClick: function onClick(e) {
        e.stopPropagation();
        showAndHideMenus('menuRooms');
      },
      img: _Paredes2.default,
      active: false
      //TODO: Poner en el translator
      , text: 'Paredes' })
  }, {
    index: 1, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 1,
      className: 'toolbar-button',
      tooltip: 'Construccion',
      onClick: function onClick(e) {
        e.stopPropagation();
        showAndHideMenus('menuConstruccion');
      },
      active: false,
      img: _Construccion2.default
      //TODO: Poner en el translator
      , text: 'Construccion' })
  }, {
    index: 2, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 2,
      className: 'toolbar-button',
      tooltip: 'Baño Salgar',
      onClick: function onClick(e) {
        e.stopPropagation();
        showAndHideMenus('menuMuebles');
      },
      img: _banyoSalgar2.default,
      active: false
      //TODO: Poner en el translator
      , text: 'Baño Salgar' })
  }, {
    index: 3, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 3,
      className: 'toolbar-button',
      tooltip: 'Electrodomésticos',
      onClick: function onClick(event) {
        return projectActions.openCatalog();
      },
      img: _Electros2.default,
      active: false
      //TODO: Poner en el translator
      , text: 'Electrodomésticos' })
  },
  // {
  //   index: 4, condition: true,
  //   dom: 
  //   <ToolbarButton
  //     active={[MODE_VIEWING_CATALOG].includes(mode)}
  //     tooltip={'Muebles'}
  //     onClick={event => projectActions.openCatalog()}
  //     img={muebles}
  //     //TODO: Poner en el translator
  //     text={'Muebles'}>
  //   </ToolbarButton>
  // },
  // {
  //   index: 2, condition: allowProjectFileSupport, 
  //   dom: 
  //   <ToolbarButton
  //     active={false}
  //     tooltip={translator.t('New project')}
  //     onClick={event => confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null}>
  //     <FaFile />
  //   </ToolbarButton>
  // },
  // {
  //   index: 3, condition: allowProjectFileSupport,
  //   dom: <ToolbarSaveButton state={state} />
  // },
  // {
  //   index: 4, condition: allowProjectFileSupport,
  //   dom: <ToolbarLoadButton state={state} />
  // },
  {
    index: 5, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 5,
      className: 'toolbar-button'
      // active={[MODE_3D_VIEW].includes(mode)}
      , active: false,
      tooltip: 'Decoración'
      // onClick={event => viewer3DActions.selectTool3DView()}
      , img: _Decoracion2.default
      //TODO: Poner en el translator
      , text: 'Decoración' })
  }, {
    index: 6, condition: true, dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 6,
      className: 'toolbar-button',
      active: false,
      tooltip: 'Estilos por Defecto',
      onClick: function onClick(event) {
        return projectActions.openProjectConfigurator();
      },
      img: _Estilos2.default
      //TODO: Poner en el translator
      , text: 'Estilos por Defecto' })
  }, {
    index: 7, condition: true,
    dom: _react2.default.createElement(_toolbarButton2.default, {
      index: 7,
      className: 'toolbar-button',
      active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
      tooltip: 'Mi catálogo',
      onClick: function onClick(event) {
        return projectActions.openCatalog();
      },
      img: _Mi_catalogo2.default
      //TODO: Poner en el translator
      , text: 'Mi catálogo' })
  }];

  // Crear boton para hacer una captura de pantalla
  /*    sorter = sorter.concat(toolbarButtons.map((Component, key) => {
        return Component.prototype ? //if is a react component
          {
            condition: true,
            dom: React.createElement(Component, { mode, state, key })
          } :
          {                           //else is a sortable toolbar button
            index: Component.index,
            condition: Component.condition,
            dom: React.createElement(Component.dom, { mode, state, key })
          };
      }));*/
  return _react2.default.createElement(
    'aside',
    {
      style: _extends({}, STYLE_ASIDE, { width: width, maxHeight: height }),
      className: 'toolbar'
    },
    sorter.sort(sortButtonsCb).map(mapButtonsCb)
  );
}

exports.default = _react2.default.memo(Toolbar, function (props, nextProps) {
  if (props.state.mode !== nextProps.state.mode || props.height !== nextProps.height || props.width !== nextProps.width || props.state.alterate !== nextProps.state.alterate) return true;
});

// export default class Toolbar extends React.Component {
//   constructor ( props ) {
//     super( props );
//     this.state = {};
//   }

//   shouldComponentUpdate ( nextProps ) {
//     return this.props.state.mode !== nextProps.state.mode ||
//       this.props.height !== nextProps.height ||
//       this.props.width !== nextProps.width ||
//       this.props.state.alterate !== nextProps.state.alterate;
//   }

//   render () {
//     let {
//       props: {
//         state,
//         width,
//         height,
//         allowProjectFileSupport,
//       },
//       context: { projectActions, viewer3DActions, translator }
//     } = this;

//     let mode = state.get( 'mode' );
//     let alterate = state.get( 'alterate' );
//     let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[ 500 ].orange : '';

//     // let sorterOriginal = [
//     //   {
//     //     index: 0, condition: allowProjectFileSupport, dom: <ToolbarButton
//     //       active={ false }
//     //       tooltip={ translator.t( 'New project' ) }
//     //       onClick={ event => confirm( translator.t( 'Would you want to start a new Project?' ) ) ? projectActions.newProject() : null }>
//     //       <FaFile />
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 1, condition: allowProjectFileSupport,
//     //     dom: <ToolbarSaveButton state={ state } />
//     //   },
//     //   {
//     //     index: 2, condition: allowProjectFileSupport,
//     //     dom: <ToolbarLoadButton state={ state } />
//     //   },
//     //   {
//     //     index: 3, condition: true,
//     //     dom: <ToolbarButton
//     //       active={ [ MODE_VIEWING_CATALOG ].includes( mode ) }
//     //       tooltip={ translator.t( 'Open catalog' ) }
//     //       onClick={ event => projectActions.openCatalog() }>
//     //       <FaPlus />
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 4, condition: true, dom: <ToolbarButton
//     //       active={ [ MODE_3D_VIEW ].includes( mode ) }
//     //       tooltip={ translator.t( '3D View' ) }
//     //       onClick={ event => viewer3DActions.selectTool3DView() }>
//     //       <Icon3D />
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 5, condition: true, dom: <ToolbarButton
//     //       active={ [ MODE_IDLE ].includes( mode ) }
//     //       tooltip={ translator.t( '2D View' ) }
//     //       onClick={ event => projectActions.setMode( MODE_IDLE ) }>
//     //       { [ MODE_3D_FIRST_PERSON, MODE_3D_VIEW ].includes( mode ) ? <Icon2D style={ { color: alterateColor } } /> : <FaMousePointer style={ { color: alterateColor } } /> }
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 6, condition: true, dom: <ToolbarButton
//     //       active={ [ MODE_3D_FIRST_PERSON ].includes( mode ) }
//     //       tooltip={ translator.t( '3D First Person' ) }
//     //       onClick={ event => viewer3DActions.selectTool3DFirstPerson() }>
//     //       <MdDirectionsRun />
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 7, condition: true, dom: <ToolbarButton
//     //       active={ false }
//     //       tooltip={ translator.t( 'Undo (CTRL-Z)' ) }
//     //       onClick={ event => projectActions.undo() }>
//     //       <MdUndo />
//     //     </ToolbarButton>
//     //   },
//     //   {
//     //     index: 8, condition: true, dom: <ToolbarButton
//     //       active={ [ MODE_CONFIGURING_PROJECT ].includes( mode ) }
//     //       tooltip={ translator.t( 'Configure project' ) }
//     //       onClick={ event => projectActions.openProjectConfigurator() }>
//     //       <MdSettings />
//     //     </ToolbarButton>
//     //   }
//     // ];

//     const allMenus = [ 'menuRooms', 'menuConstruccion', 'menuMuebles' ];

//     const showAndHideMenus = ( menuShow ) => {
//       allMenus.forEach( ( ele ) => {

//         if ( ele === menuShow ) {

//           if ( document.getElementById( ele ).style.display === 'block' ) {
//             document.getElementById( ele ).style.display = 'none';

//           } else {
//             document.getElementById( ele ).style.display = 'block';
//           }
//         } else {
//           document.getElementById( ele ).style.display = 'none';
//         }

//       } );
//     };

//     let sorter = [
//       {
//         index: 0, condition: true,
//         dom: <ToolbarButton
//           index={ 0 }
//           tooltip={ 'Paredes' }
//           onClick={ ( e ) => {
//             e.stopPropagation();
//             showAndHideMenus( 'menuRooms' );
//           } }
//           img={ paredes }
//           //TODO: Poner en el translator
//           text={ 'Paredes' } >
//         </ToolbarButton >
//       },
//       {
//         index: 1, condition: true,
//         dom: <ToolbarButton
//           index={ 1 }
//           className='toolbar-button'
//           tooltip={ 'Construccion' }
//           onClick={ ( e ) => {
//             e.stopPropagation();
//             showAndHideMenus( 'menuConstruccion' );
//           } }
//           img={ construccion }
//           //TODO: Poner en el translator
//           text={ 'Construccion' }>
//         </ToolbarButton>
//       },
//       {
//         index: 2, condition: true,
//         dom: <ToolbarButton
//           index={ 2 }
//           className='toolbar-button'
//           tooltip={ 'Baño Salgar' }
//           onClick={ ( e ) => {
//             e.stopPropagation();
//             showAndHideMenus( 'menuMuebles' );
//           } }
//           img={ img_salgar }
//           //TODO: Poner en el translator
//           text={ 'Baño Salgar' }>
//         </ToolbarButton>
//       },
//       {
//         index: 3, condition: true,
//         dom: <ToolbarButton
//           index={ 3 }
//           className='toolbar-button'
//           tooltip={ 'Electrodomésticos' }
//           onClick={ event => projectActions.openCatalog() }
//           img={ electros }
//           //TODO: Poner en el translator
//           text={ 'Electrodomésticos' }>
//         </ToolbarButton>
//       },
//       // {
//       //   index: 4, condition: true,
//       //   dom: <ToolbarButton
//       //     active={[MODE_VIEWING_CATALOG].includes(mode)}
//       //     tooltip={'Muebles'}
//       //     onClick={event => projectActions.openCatalog()}
//       //     img={muebles}
//       //     //TODO: Poner en el translator
//       //     text={'Muebles'}>
//       //   </ToolbarButton>
//       // },
//       // {
//       //   index: 2, condition: allowProjectFileSupport, dom: <ToolbarButton
//       //     active={false}
//       //     tooltip={translator.t('New project')}
//       //     onClick={event => confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null}>
//       //     <FaFile />
//       //   </ToolbarButton>
//       // },
//       // {
//       //   index: 3, condition: allowProjectFileSupport,
//       //   dom: <ToolbarSaveButton state={state} />
//       // },
//       // {
//       //   index: 4, condition: allowProjectFileSupport,
//       //   dom: <ToolbarLoadButton state={state} />
//       // },
//       {
//         index: 5, condition: true, dom: <ToolbarButton
//           index={ 5 }
//           className='toolbar-button'
//           // active={[MODE_3D_VIEW].includes(mode)}
//           active={ false }
//           tooltip={ 'Decoración' }
//           // onClick={event => viewer3DActions.selectTool3DView()}
//           img={ decoracion }
//           //TODO: Poner en el translator
//           text={ 'Decoración' }>
//         </ToolbarButton>
//       },
//       {
//         index: 6, condition: true, dom: <ToolbarButton
//           index={ 6 }
//           className='toolbar-button'
//           // active={[MODE_IDLE].includes(mode)}
//           active={ false }
//           tooltip={ 'Estilos por Defecto' }
//           onClick={ event => projectActions.openProjectConfigurator() }
//           img={ estilos }
//           //TODO: Poner en el translator
//           text={ 'Estilos por Defecto' }>
//         </ToolbarButton>
//       },
//       {
//         index: 7, condition: true,
//         dom: <ToolbarButton
//           index={ 7 }
//           className='toolbar-button'
//           active={ [ MODE_VIEWING_CATALOG ].includes( mode ) }
//           tooltip={ 'Mi catálogo' }
//           onClick={ event => projectActions.openCatalog() }
//           img={ miCatalogo }
//           //TODO: Poner en el translator
//           text={ 'Mi catálogo' }>
//         </ToolbarButton>
//       },
//     ];

//     // Crear boton para hacer una captura de pantalla
//     /*    sorter = sorter.concat(toolbarButtons.map((Component, key) => {
//           return Component.prototype ? //if is a react component
//             {
//               condition: true,
//               dom: React.createElement(Component, { mode, state, key })
//             } :
//             {                           //else is a sortable toolbar button
//               index: Component.index,
//               condition: Component.condition,
//               dom: React.createElement(Component.dom, { mode, state, key })
//             };
//         }));*/
//     return (
//       <aside style={ { ...STYLE_ASIDE, width: width, maxHeight: height } } className='toolbar'>
//         { sorter.sort( sortButtonsCb ).map( mapButtonsCb ) }
//       </aside>
//     );
//   }
// }

Toolbar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Toolbar.contextType = _context.Context;

// Toolbar.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   viewer2DActions: PropTypes.object.isRequired,
//   viewer3DActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };