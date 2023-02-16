import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

// Imports de imagenes
import menuIcon from './../../assets/topbar/list_options_menu_icon.png';
// import logoImage from './../../assets/topbar/FOR2HOME.png';
import logoImage from './../../assets/topbar/LogoSalgar.png';
import profileUserIcon from './../../assets/topbar/account_profile_user_avatar_icon.png';
import { useAuthenticateUser } from '../../hooks/useAuthenticateUser';
import { Context } from '../../context/context';


import documentoIco from '../../assets/topbar/documento.png';
import imprimirIco from '../../assets/topbar/imprimir.png';
import listadoIco from '../../assets/topbar/listado_elementos.png';
import tiendaIco from '../../assets/topbar/shop.png';
import { useState } from 'react';

const STYLE_TOPBAR = {
  backgroundColor: SharedStyle.COLORS.white,
  height: '72px',
  width: '100%',
  borderBottomStyle: 'solid',
  borderBottomColor: SharedStyle.PRIMARY_COLOR.master,
  borderBottomWidth: '9px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
};

const STYLE_MENU = {
  marginLeft: '20px',
  marginBottom: '10px',
  cursor: 'pointer',
};

const STYLE_LOGO = {
  height: '30px',
  marginLeft: '80px',
  marginBottom: '13px',
};

const STYLE_USER = {
  marginRight: '21px',
  marginBottom: '10px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
};

const STYLE_USER_NAME = {
  margin: '0 8px 0 0',
  height: '20px',

  display: 'flex',
  alignItems: 'end',
  fontSize: '0.9em',
};

const STYLE_CTA = {
  display: 'flex',
  columnGap: '50px',
  justifyContent: 'space-evenly',
  color: SharedStyle.PRIMARY_COLOR.master,
  fontSize: '12px',
  fontWeight: '900',
  marginRight: '6em'
};

const STYLE_ICONS = {
  display: 'flex',
  columnGap: '14px',
  justifyContent: 'space-evenly',
  marginRight: '6em'
};

const STYLE_TOTAL_PRICE = {
  marginRight: '3em',
  fontSize: '20px',
  fontWeight: '900',
  color: SharedStyle.PRIMARY_COLOR.master

};

export default function Topbar ( { state } ) {

  const [ totalPrice, setTotalPrice ] = useState( 0 );
  const { projectActions } = useContext( Context );

  const nombre = useAuthenticateUser( state, projectActions );


  //**Precio unitario */
  const selectedLayer = state.getIn( [ 'scene', 'selectedLayer' ] );
  const stateItems = state.getIn( [ 'scene', 'layers', selectedLayer, 'items' ] );


  const catalogItems = state.catalog.get( 'elements' );

  // console.log( catalogItems );

  // useEffect( () => {
  //   const stateItemNames = stateItems.map( item => {
  //     return item.get( 'name' );
  //   } );

  //   const stateItemNamesToJS = Object.values( stateItemNames.toJS() );

  //   if ( !stateItemNamesToJS ) return;

  //   const usedItems = stateItemNamesToJS.map( sItem => {

  //   } );

  //   console.log( stateItemNamesToJS );
  // }, [ state ] );

  const showLogin = () => {
    const loginComp = document.getElementById( 'userLogin' );
    const registerComp = document.getElementById( 'userRegister' );

    if ( loginComp.style.display === 'block' || registerComp.style.display === 'block' ) {
      loginComp.style.display = 'none';
      registerComp.style.display = 'none';

    } else {
      loginComp.style.display = 'block';

    }
  };

  const showMenuPreferencias = () => {
    const menuPreferencias = document.getElementById( 'menuPreferencias' );

    if ( menuPreferencias.style.display === 'block' ) {
      menuPreferencias.style.display = 'none';

    } else {
      menuPreferencias.style.display = 'block';

    }
  };

  return (
    <aside style={ STYLE_TOPBAR }>
      <div>
        <img onClick={ showMenuPreferencias } style={ STYLE_MENU } src={ menuIcon } />
        <img style={ STYLE_LOGO } src={ logoImage } />
      </div>


      <div style={ STYLE_USER }>
        <div style={ STYLE_CTA }>
          <div>Encuentre su tienda</div>
          <div>Contáctenos</div>
          <div>Compartir proyecto</div>
        </div>
        <div style={ STYLE_ICONS }>
          <img src={ listadoIco } />
          <img src={ documentoIco } />
          <img src={ imprimirIco } />
          <img src={ tiendaIco } />
        </div>

        <div style={ STYLE_TOTAL_PRICE }>
          2.350 €
        </div>

        <p style={ STYLE_USER_NAME }>{ nombre }</p>
        <img src={ profileUserIcon } onClick={ showLogin } />
      </div>
    </aside>
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
//         <img style={ STYLE_LOGO } src
//         <div style={ STYLE_USE80px }>
//           <p style={ STYLE_USER_NAME }>{ this.state.nombre }</p>
//           <img style={ STYLE_USER_AVATAR } src={ profileUserIcon } onClick={ showLogin } />
//         </div>
//       </aside>
//     );
//   }
// }

Topbar.propTypes = {
  state: PropTypes.object.isRequired,
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
