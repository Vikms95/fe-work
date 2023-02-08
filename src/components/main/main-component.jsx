import React, { useContext } from "react";

import newProject from './../../assets/main/newProject.png';
import existingProject from './../../assets/main/existsProject.png';
import logo from './../../assets/topbar/FOR2HOME.png';
import cocina from './../../assets/main/cocina.png';
import lavabo from './../../assets/main/lavabo.png';
import hogar from './../../assets/main/hogar.png';
import salgar from './../../assets/main/ambiente-live-matt-monterrey-blue-night-1000_l.png';
import f2hsalgar from './../../assets/main/FOR2HOME.png';
import logoSalgar from './../../assets/main/Capa 1.png';
import * as SharedStyle from '../../shared-style';
import { useSlideShow } from '../../hooks/useSlideShow';
import { Context } from '../../context/context';

const STYLE = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 9006,
  overflowY: 'hidden',
  overflowX: 'hidden',
};

const STYLE_TOPBAR = {
  backgroundColor: SharedStyle.COLORS.white,
  height: '4.7em',
  width: '100%',
  display: 'flex',
  alingContent: 'center',
  alignItems: 'center',
};

const STYLE_LOGO = {
  marginLeft: '6em'
};

const STYLE_BODY = {
  display: 'flex',
  // marginTop: '22.29%',
  justifyContent: 'center',
  backgroundRepeat: "no-repeat",
};

const STYLE_BOX = {
  backgroundColor: '#6387a1',
  width: '14.2em',
  height: '14.6em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid #3b466e',
  cursor: 'pointer',
};

const STYLE_LYRICS = {
  color: '#a0a5aa',
  fontSize: '1.55em',
  marginTop: '1.4em',
  marginBottom: '1.3em',
  fontWeight: '500'
};

export default function MainComponent () {
  const { projectActions } = useContext( Context );
  // const index = useSlideShow();

  const loadNewProject = ( e ) => {
    e.preventDefault();
    e.stopPropagation();
    //projectActions.updatePreference('VERANGULOS', false);
    projectActions.newProject();
    document.getElementById( 'main' ).style.display = 'none';
    document.getElementById( 'userLogin' ).style.display = 'none';
    document.getElementById( 'userRegister' ).style.display = 'none';
  };

  const loadProjectFromFile = ( e ) => {
    e.preventDefault();
    e.stopPropagation();
    showForms();
    // browserUpload().then((data) => {
    //     projectActions.loadProject(JSON.parse(data));
    // }).then(() => document.getElementById('main').style.display = 'none')
  };

  const showForms = () => {
    const loginComp = document.getElementById( 'userLogin' );
    const registerComp = document.getElementById( 'userRegister' );

    if ( loginComp.style.display === 'block' || registerComp.style.display === 'block' ) {
      loginComp.style.display = 'none';
      registerComp.style.display = 'none';

    } else {
      loginComp.style.display = 'block';

    }
  };

  const hideForms = ( e ) => {
    e.stopPropagation();

    document.getElementById( 'userLogin' ).style.display = 'none';
    document.getElementById( 'userRegister' ).style.display = 'none';
  };

  return (
    <div id={ 'main' } style={ STYLE }>
      {/*<div style={ STYLE_TOPBAR } onClick={ hideForms }>*/ }
      {/*  <img style={ STYLE_LOGO } src={ logo } />*/ }
      {/*</div>*/ }

      <div
        style={ {
          display: 'flex',
          position: 'relative',
          backgroundColor: 'white',
          height: '100%',
          justifyContent: 'center',
        } }
        onClick={ hideForms }
      >
        <div style={ {
          position: 'relative',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
        } }>
          <img
            className={ 'imageBG' }
            style={ {
              height: '102.5%',
            } }
            src={ salgar }
          />

          <div>
            <img
              src={ logoSalgar }
              style={ {
                position: 'absolute',
                zIndex: 3,
                top: '27.5px',
                left: '-269.9px',
                height: '57.5px'
              } } />
          </div>

          <div>
            <div style={
              {
                ...STYLE_BODY,
                position: 'absolute',
                bottom: '266px',
                left: '200px'
              } }>

              <div style={ STYLE_BOX } onClick={ loadNewProject }>
                <p style={ STYLE_LYRICS }>Nuevo Diseño</p>
                <img src={ newProject } style={ { height: '93px' } } />
              </div>

              <div
                style={ { ...STYLE_BOX, marginLeft: '1.3em' } }
                onClick={ loadProjectFromFile }
              >
                <p style={ STYLE_LYRICS }>Diseño Existente</p>
                <img src={ existingProject } style={ { height: '93px' } } />
              </div>

            </div>
          </div>

        </div>

        <img src={ f2hsalgar } style={
          {
            position: 'absolute',
            zIndex: 2,
            bottom: '20.5px',
            right: '30.5px',
            height: '20.75px',
          }
        } />





        {/*<img*/ }
        {/*  className={ 'imageBG' }*/ }
        {/*  style={ {*/ }
        {/*    transition: 'opacity 2s ease',*/ }
        {/*    opacity: ( index === 1 ) ? 1 : 0,*/ }
        {/*    position: 'absolute',*/ }
        {/*    top: '0',*/ }
        {/*    height: '100%',*/ }
        {/*    width: '100%',*/ }
        {/*  } }*/ }
        {/*  src={ cocina }*/ }
        {/*/>*/ }

        {/*<img*/ }
        {/*  className={ 'imageBG' }*/ }
        {/*  style={ {*/ }
        {/*    transition: 'opacity 2s ease',*/ }
        {/*    opacity: ( index === 2 ) ? 1 : 0,*/ }
        {/*    position: 'absolute',*/ }
        {/*    top: '0',*/ }
        {/*    height: '100%',*/ }
        {/*    width: '100%',*/ }
        {/*  } }*/ }
        {/*  src={ lavabo }*/ }
        {/*/>*/ }



      </div>
    </div >
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

