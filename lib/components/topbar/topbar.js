'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Topbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _list_options_menu_icon = require('./../../assets/topbar/list_options_menu_icon.png');

var _list_options_menu_icon2 = _interopRequireDefault(_list_options_menu_icon);

var _FOR2HOME = require('./../../assets/topbar/FOR2HOME.png');

var _FOR2HOME2 = _interopRequireDefault(_FOR2HOME);

var _account_profile_user_avatar_icon = require('./../../assets/topbar/account_profile_user_avatar_icon.png');

var _account_profile_user_avatar_icon2 = _interopRequireDefault(_account_profile_user_avatar_icon);

var _useAuthenticateUser = require('../../hooks/useAuthenticateUser');

var _context = require('../../context/context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_TOPBAR = {
  backgroundColor: SharedStyle.COLORS.white,
  height: '72px',
  width: '100%',
  borderBottomStyle: 'solid',
  borderBottomColor: SharedStyle.PRIMARY_COLOR.master,
  borderBottomWidth: '9px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end'
};

// Imports de imagenes


var STYLE_MENU = {
  marginLeft: '20px',
  marginBottom: '10px',
  cursor: 'pointer'
};

var STYLE_LOGO = {
  marginLeft: '11em',
  marginBottom: '10px'
};

var STYLE_USER = {
  marginRight: '21px',
  marginBottom: '10px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end'
};

var STYLE_USER_NAME = {
  margin: '0 8px 0 0',
  height: '20px',
  display: 'flex',
  alignItems: 'end',
  fontSize: '0.9em'
};

var STYLE_USER_AVATAR = {};

function Topbar(_ref) {
  var state = _ref.state;

  var _useContext = (0, _react.useContext)(_context.Context),
      projectActions = _useContext.projectActions;

  var nombre = (0, _useAuthenticateUser.useAuthenticateUser)(state, projectActions);

  var showLogin = function showLogin() {
    var loginComp = document.getElementById('userLogin');
    var registerComp = document.getElementById('userRegister');

    if (loginComp.style.display === 'block' || registerComp.style.display === 'block') {
      loginComp.style.display = 'none';
      registerComp.style.display = 'none';
    } else {
      loginComp.style.display = 'block';
    }
  };

  var showMenuPreferencias = function showMenuPreferencias() {
    var menuPreferencias = document.getElementById('menuPreferencias');

    if (menuPreferencias.style.display === 'block') {
      menuPreferencias.style.display = 'none';
    } else {
      menuPreferencias.style.display = 'block';
    }
  };

  return _react2.default.createElement(
    'aside',
    { style: STYLE_TOPBAR },
    _react2.default.createElement('img', { onClick: showMenuPreferencias, style: STYLE_MENU, src: _list_options_menu_icon2.default }),
    _react2.default.createElement('img', { style: STYLE_LOGO, src: _FOR2HOME2.default }),
    _react2.default.createElement(
      'div',
      { style: STYLE_USER },
      _react2.default.createElement(
        'p',
        { style: STYLE_USER_NAME },
        nombre
      ),
      _react2.default.createElement('img', { style: STYLE_USER_AVATAR, src: _account_profile_user_avatar_icon2.default, onClick: showLogin })
    )
  );
}

// export default class Topbar extends Component {
//   constructor ( props, context ) {
//     super( props, context );
//     this.state = {
//       nombre: 'Nombre Apellido'
//     };
//     this.callGetUser();
//   }

//   componentWillReceiveProps ( nextProps ) {

//     let { state, projectActions } = nextProps;
//     let userAuthenticated = state.get( 'userAuthenticated' );

//     if ( userAuthenticated )

//       this.callGetUser().then( data => projectActions.SetUserAuthenticated( false ) );
//   }

//   callGetUser () {
//     let proxy = new Auth.AutenticateProxy();

//     return proxy.getUserAuthenticated().then( data => this.setState( { 'nombre': data.name } ) );
//   }

//   render () {
//     const showLogin = () => {
//       const loginComp = document.getElementById( 'userLogin' );
//       const registerComp = document.getElementById( 'userRegister' );
//       loginComp.style.display === 'block' || registerComp.style.display === 'block' ?
//         ( loginComp.style.display = 'none', registerComp.style.display = 'none' )
//         :
//         loginComp.style.display = 'block';
//     };

//     const showMenuPreferenciar = () => {
//       const menuPreferencias = document.getElementById( 'menuPreferencias' );
//       if ( menuPreferencias.style.display === 'block' ) {
//         menuPreferencias.style.display = 'none';
//       } else {
//         menuPreferencias.style.display = 'block';
//       }
//     };

//     //this.callGetUser();

//     return (
//       <aside style={ STYLE_TOPBAR }>
//         <img onClick={ showMenuPreferenciar } style={ STYLE_MENU } src={ menuIcon } />
//         <img style={ STYLE_LOGO } src={ logoImage } />
//         <div style={ STYLE_USER }>
//           <p style={ STYLE_USER_NAME }>{ this.state.nombre }</p>
//           <img style={ STYLE_USER_AVATAR } src={ profileUserIcon } onClick={ showLogin } />
//         </div>
//       </aside>
//     );
//   }
// }

Topbar.propTypes = {
  state: _propTypes2.default.object.isRequired
  //width: PropTypes.number.isRequired,
  //height: PropTypes.number.isRequired,
  //allowProjectFileSupport: PropTypes.bool.isRequired,
  //toolbarButtons: PropTypes.array
};

// Topbar.contextTypes = {

//projectActions: PropTypes.object.isRequired,
//viewer2DActions: PropTypes.object.isRequired,
//viewer3DActions: PropTypes.object.isRequired,
//linesActions: PropTypes.object.isRequired,
//holesActions: PropTypes.object.isRequired,
//itemsActions: PropTypes.object.isRequired,
//translator: PropTypes.object.isRequired,
// };