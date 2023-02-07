'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = MainComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _newProject = require('./../../assets/main/newProject.png');

var _newProject2 = _interopRequireDefault(_newProject);

var _existsProject = require('./../../assets/main/existsProject.png');

var _existsProject2 = _interopRequireDefault(_existsProject);

var _FOR2HOME = require('./../../assets/topbar/FOR2HOME.png');

var _FOR2HOME2 = _interopRequireDefault(_FOR2HOME);

var _cocina = require('./../../assets/main/cocina.png');

var _cocina2 = _interopRequireDefault(_cocina);

var _lavabo = require('./../../assets/main/lavabo.png');

var _lavabo2 = _interopRequireDefault(_lavabo);

var _hogar = require('./../../assets/main/hogar.png');

var _hogar2 = _interopRequireDefault(_hogar);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _useSlideShow = require('../../hooks/useSlideShow');

var _context = require('../../context/context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 9006,
  overflowY: 'hidden',
  overflowX: 'hidden'
};

var STYLE_TOPBAR = {
  backgroundColor: SharedStyle.COLORS.white,
  height: '4.7em',
  width: '100%',
  display: 'flex',
  alingContent: 'center',
  alignItems: 'center'
};

var STYLE_LOGO = {
  marginLeft: '6em'
};

var STYLE_BODY = {
  display: 'flex',
  marginTop: '16%',
  justifyContent: 'center',
  backgroundRepeat: "no-repeat"
};

var STYLE_BOX = {
  backgroundColor: '#6387a1',
  width: '14em',
  height: '14em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2.5px solid #3b466e',
  cursor: 'pointer'
};

var STYLE_LYRICS = {
  color: '#a0a5aa',
  fontSize: '1.3em',
  marginTop: '1.3em',
  marginBottom: '1.3em'
};

function MainComponent() {
  var _useContext = (0, _react.useContext)(_context.Context),
      projectActions = _useContext.projectActions;

  var index = (0, _useSlideShow.useSlideShow)();

  var loadNewProject = function loadNewProject(e) {
    e.preventDefault();
    e.stopPropagation();
    //projectActions.updatePreference('VERANGULOS', false);
    projectActions.newProject();
    document.getElementById('main').style.display = 'none';
    document.getElementById('userLogin').style.display = 'none';
    document.getElementById('userRegister').style.display = 'none';
  };

  var loadProjectFromFile = function loadProjectFromFile(e) {
    e.preventDefault();
    e.stopPropagation();
    showForms();
    // browserUpload().then((data) => {
    //     projectActions.loadProject(JSON.parse(data));
    // }).then(() => document.getElementById('main').style.display = 'none')
  };

  var showForms = function showForms() {
    var loginComp = document.getElementById('userLogin');
    var registerComp = document.getElementById('userRegister');

    if (loginComp.style.display === 'block' || registerComp.style.display === 'block') {
      loginComp.style.display = 'none';
      registerComp.style.display = 'none';
    } else {
      loginComp.style.display = 'block';
    }
  };

  var hideForms = function hideForms(e) {
    e.stopPropagation();

    document.getElementById('userLogin').style.display = 'none';
    document.getElementById('userRegister').style.display = 'none';
  };

  return _react2.default.createElement(
    'div',
    { id: 'main', style: STYLE },
    _react2.default.createElement(
      'div',
      { style: STYLE_TOPBAR, onClick: hideForms },
      _react2.default.createElement('img', { style: STYLE_LOGO, src: _FOR2HOME2.default })
    ),
    _react2.default.createElement(
      'div',
      {
        style: { position: 'relative', backgroundColor: 'white', width: '100%', height: '100%' },
        onClick: hideForms
      },
      _react2.default.createElement('img', {
        className: 'imageBG',
        style: {
          transition: 'opacity 2s ease',
          opacity: index === 0 ? 1 : 0,
          position: 'absolute',
          top: '0',
          height: '100%',
          width: '100%'
        },
        src: _hogar2.default
      }),
      _react2.default.createElement('img', {
        className: 'imageBG',
        style: {
          transition: 'opacity 2s ease',
          opacity: index === 1 ? 1 : 0,
          position: 'absolute',
          top: '0',
          height: '100%',
          width: '100%'
        },
        src: _cocina2.default
      }),
      _react2.default.createElement('img', {
        className: 'imageBG',
        style: {
          transition: 'opacity 2s ease',
          opacity: index === 2 ? 1 : 0,
          position: 'absolute',
          top: '0',
          height: '100%',
          width: '100%'
        },
        src: _lavabo2.default
      }),
      _react2.default.createElement(
        'div',
        { style: _extends({}, STYLE_BODY, { position: 'absolute', top: '0', left: '0', bottom: '0', right: '0' }) },
        _react2.default.createElement(
          'div',
          { style: STYLE_BOX, onClick: loadNewProject },
          _react2.default.createElement(
            'p',
            { style: STYLE_LYRICS },
            'Nuevo Dise\xF1o'
          ),
          _react2.default.createElement('img', { src: _newProject2.default })
        ),
        _react2.default.createElement(
          'div',
          {
            style: _extends({}, STYLE_BOX, { marginLeft: '2em' }),
            onClick: loadProjectFromFile
          },
          _react2.default.createElement(
            'p',
            { style: STYLE_LYRICS },
            'Dise\xF1o Existente'
          ),
          _react2.default.createElement('img', { src: _existsProject2.default })
        )
      )
    )
  );
}

// export default class MainComponent extends React.Component {

//   constructor ( props, context ) {
//     super( props, context );
//     this.projectActions = props.projectActions;
//     this.indexImage = 0;
//     this.listImages = [ hogar, cocina, lavabo ];
//     this.count = 0;

//     this.state = {
//       opacity: [
//         { opacity: 1 },
//         { opacity: 0 },
//         { opacity: 0 },
//       ]
//     };
//   }

//   componentDidMount () {
//     this.interval = setInterval( () => {
//       this.toggle();

//     }, 5000 );

//     // Esto no hace nada? componentDidMount devuelve void
//     // return () => {
//     //   clearInterval(this.interval)
//     // };
//   }

//   componentWillUnmount () {
//     if ( this.interval ) {
//       clearInterval( this.interval );
//     }
//   }

//   toggle () {
//     const newState = this.state.opacity;

//     newState[ this.count ].opacity = '0';
//     this.count++;
//     this.count === 3 ? this.count = 0 : '';

//     newState[ this.count ].opacity = '1';

//     this.setState( newState );
//   }

//   render () {
//     const loadNewProject = ( e ) => {
//       e.preventDefault();
//       e.stopPropagation();
//       //this.projectActions.updatePreference('VERANGULOS', false);
//       this.projectActions.newProject();
//       document.getElementById( 'main' ).style.display = 'none';
//       document.getElementById( 'userLogin' ).style.display = 'none';
//       document.getElementById( 'userRegister' ).style.display = 'none';
//     };

//     const loadProjectFromFile = ( e ) => {
//       e.preventDefault();
//       e.stopPropagation();
//       showForms();
//       // browserUpload().then((data) => {
//       //     this.projectActions.loadProject(JSON.parse(data));
//       // }).then(() => document.getElementById('main').style.display = 'none')
//     };

//     const showForms = () => {
//       const loginComp = document.getElementById( 'userLogin' );
//       const registerComp = document.getElementById( 'userRegister' );
//       loginComp.style.display === 'block' || registerComp.style.display === 'block' ?
//         ( loginComp.style.display = 'none', registerComp.style.display = 'none' )
//         :
//         loginComp.style.display = 'block';
//     };

//     const hideForms = ( e ) => {
//       e.stopPropagation();
//       document.getElementById( 'userLogin' ).style.display = 'none';
//       document.getElementById( 'userRegister' ).style.display = 'none';
//     };

//     return (
//       <div id={ 'main' } style={ STYLE }>
//         <div style={ STYLE_TOPBAR } onClick={ hideForms }>
//           <img style={ STYLE_LOGO } src={ logo } />
//         </div>
//         <div style={ { position: 'relative', backgroundColor: 'white', width: '100%', height: '100%' } } onClick={ hideForms }>
//           <img className={ 'imageBG' } style={ {
//             transition: 'opacity 2s ease',
//             opacity: this.state.opacity[ 0 ].opacity,
//             position: 'absolute',
//             top: '0',
//             height: '100%',
//             width: '100%',
//           } } src={ hogar } />
//           <img className={ 'imageBG' } style={ {
//             transition: 'opacity 2s ease',
//             opacity: this.state.opacity[ 1 ].opacity,
//             position: 'absolute',
//             top: '0',
//             height: '100%',
//             width: '100%',
//           } } src={ cocina } />
//           <img className={ 'imageBG' } style={ {
//             transition: 'opacity 2s ease',
//             opacity: this.state.opacity[ 2 ].opacity,
//             position: 'absolute',
//             top: '0',
//             height: '100%',
//             width: '100%',
//           } }
//             src={ lavabo } />


//           <div style={ { ...STYLE_BODY, position: 'absolute', top: '0', left: '0', bottom: '0', right: '0' } }>
//             <div style={ STYLE_BOX } onClick={ loadNewProject }>
//               <p style={ STYLE_LYRICS }>Nuevo Diseño</p>
//               <img src={ newProject } />
//             </div>
//             <div style={ { ...STYLE_BOX, marginLeft: '2em' } } onClick={ loadProjectFromFile }>
//               <p style={ STYLE_LYRICS }>Diseño Existente</p>
//               <img src={ existingProject } />
//             </div>
//           </div>
//         </div>
//       </div >
//     );
//   }
// }