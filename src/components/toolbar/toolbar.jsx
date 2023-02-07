import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './toolbar-button';
import If from '../../utils/react-if';

import {
  MODE_VIEWING_CATALOG,
} from '../../constants';

import * as SharedStyle from '../../shared-style';

// Imports de imagenes
import paredes from './../../assets/toolbar/Paredes.png';
import construccion from './../../assets/toolbar/Construccion.png';
import electros from './../../assets/toolbar/Electros.png';
import decoracion from './../../assets/toolbar/Decoracion.png';
import estilos from './../../assets/toolbar/Estilos.png';
import miCatalogo from './../../assets/toolbar/Mi_catalogo.png';

// Salgar
import img_salgar from './../../assets/salgar/toolBar/banyoSalgar.png';
import { Context } from '../../context/context';

// const STYLE_ICON_TEXT = {
//   fontSize: '10px',
//   textDecoration: 'none',
//   fontWeight: 'bold',
//   margin: '0px',
//   userSelect: 'none'
// };

const STYLE_ASIDE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  borderRightStyle: 'solid',
  borderRightWidth: '2px',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
  overflowY: 'auto',
  overflowX: 'hidden',
};

// TODO figure out the logic here
const sortButtonsCb = ( a, b ) => {
  if ( a.index === undefined || a.index === null ) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if ( b.index === undefined || b.index === null ) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

// TODO figure out the logic here
const mapButtonsCb = ( el, ind ) => {
  return (
    <If
      key={ ind }
      condition={ el.condition }
      style={ { display: 'flex', flexDirection: 'column' } }
    >
      { el.dom }
    </If>
  );
};

function Toolbar ( {
  state,
  width,
  height,
} ) {

  const { projectActions } = useContext( Context );

  const mode = state.get( 'mode' );
  const allMenus = [ 'menuRooms', 'menuConstruccion', 'menuMuebles' ];

  const showAndHideMenus = ( menuShow ) => {
    allMenus.forEach( ( ele ) => {
      if ( ele === menuShow ) {

        if ( document.getElementById( ele ).style.display === 'block' ) {
          document.getElementById( ele ).style.display = 'none';

        } else {
          document.getElementById( ele ).style.display = 'block';
        }
      } else {
        document.getElementById( ele ).style.display = 'none';
      }
    } );
  };

  const sorter = [
    {
      index: 0, condition: true,
      dom:
        <ToolbarButton
          index={ 0 }
          tooltip={ 'Paredes' }
          onClick={ ( e ) => {
            e.stopPropagation();
            showAndHideMenus( 'menuRooms' );
          } }
          img={ paredes }
          active={ false }
          //TODO: Poner en el translator
          text={ 'Paredes' } >
        </ToolbarButton >
    },
    {
      index: 1, condition: true,
      dom:
        <ToolbarButton
          index={ 1 }
          className='toolbar-button'
          tooltip={ 'Construccion' }
          onClick={ ( e ) => {
            e.stopPropagation();
            showAndHideMenus( 'menuConstruccion' );
          } }
          active={ false }
          img={ construccion }
          //TODO: Poner en el translator
          text={ 'Construccion' }>
        </ToolbarButton>
    },
    {
      index: 2, condition: true,
      dom:
        <ToolbarButton
          index={ 2 }
          className='toolbar-button'
          tooltip={ 'Baño Salgar' }
          onClick={ ( e ) => {
            e.stopPropagation();
            showAndHideMenus( 'menuMuebles' );
          } }
          img={ img_salgar }
          active={ false }
          //TODO: Poner en el translator
          text={ 'Baño Salgar' }>
        </ToolbarButton>
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
      dom:
        <ToolbarButton
          index={ 5 }
          className='toolbar-button'
          // active={[MODE_3D_VIEW].includes(mode)}
          active={ false }
          tooltip={ 'Decoración' }
          // onClick={event => viewer3DActions.selectTool3DView()}
          img={ decoracion }
          //TODO: Poner en el translator
          text={ 'Decoración' }>
        </ToolbarButton>
    },
    {
      index: 6, condition: true, dom:
        <ToolbarButton
          index={ 6 }
          className='toolbar-button'
          active={ false }
          tooltip={ 'Estilos por Defecto' }
          onClick={ event => projectActions.openProjectConfigurator() }
          img={ estilos }
          //TODO: Poner en el translator
          text={ 'Estilos por Defecto' }>
        </ToolbarButton>
    },
    {
      index: 7, condition: true,
      dom:
        <ToolbarButton
          index={ 7 }
          className='toolbar-button'
          active={ [ MODE_VIEWING_CATALOG ].includes( mode ) }
          tooltip={ 'Mi catálogo' }
          onClick={ event => projectActions.openCatalog() }
          img={ miCatalogo }
          //TODO: Poner en el translator
          text={ 'Mi catálogo' }>
        </ToolbarButton>
    },
  ];

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
  return (
    <aside
      style={ { ...STYLE_ASIDE, width: width, maxHeight: height } }
      className='toolbar'
    >
      { sorter.sort( sortButtonsCb ).map( mapButtonsCb ) }
    </aside>
  );
}

export default React.memo( Toolbar, ( props, nextProps ) => {
  if ( props.state.mode !== nextProps.state.mode ||
    props.height !== nextProps.height ||
    props.width !== nextProps.width ||
    props.state.alterate !== nextProps.state.alterate
  )
    return true;
} );


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
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Toolbar.contextType = Context;

// Toolbar.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   viewer2DActions: PropTypes.object.isRequired,
//   viewer3DActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };
