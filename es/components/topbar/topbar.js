import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

// Imports de imagenes
import menuIcon from './../../assets/topbar/list_options_menu_icon.png';
import logoImage from './../../assets/topbar/FOR2HOME.png';
import profileUserIcon from './../../assets/topbar/account_profile_user_avatar_icon.png';
import { useAuthenticateUser } from '../../hooks/useAuthenticateUser';
import { Context } from '../../context/context';

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

export default function Topbar(_ref) {
  var state = _ref.state;

  var _useContext = useContext(Context),
      projectActions = _useContext.projectActions;

  var nombre = useAuthenticateUser(state, projectActions);

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

  return React.createElement(
    'aside',
    { style: STYLE_TOPBAR },
    React.createElement('img', { onClick: showMenuPreferencias, style: STYLE_MENU, src: menuIcon }),
    React.createElement('img', { style: STYLE_LOGO, src: logoImage }),
    React.createElement(
      'div',
      { style: STYLE_USER },
      React.createElement(
        'p',
        { style: STYLE_USER_NAME },
        nombre
      ),
      React.createElement('img', { style: STYLE_USER_AVATAR, src: profileUserIcon, onClick: showLogin })
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
  state: PropTypes.object.isRequired
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