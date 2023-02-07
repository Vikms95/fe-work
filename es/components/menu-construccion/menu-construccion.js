var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { Component, useState } from 'react';

import * as SharedStyle from '../../shared-style';
import './style.css';

import rectangulo from './../../assets/salgar/rectangulo.png';

// Imports de imagenes
import close from './../../assets/generalItems/deleteCross.png';
import puertas from './../../assets/construccion/puertas.png';
import ventanas from './../../assets/construccion/ventanas.png';
import obstaculos from './../../assets/construccion/obstaculos.png';
import flecha from './../../assets/generalItems/flecha.png';

var STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  height: '100%',
  width: '238px',
  borderRightStyle: 'solid',
  borderRightWidth: '2px',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
  zIndex: '9005',
  overflow: 'hidden'
};

var STYLE_TITLE_BAR = {
  height: '1.5em',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white
};

var STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

var STYLE_IMAGE = {
  cursor: 'pointer',
  width: '80px', height: '80px'
};

var STYLE_NAME = {
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  minHeight: '20px'
};

var STYLE_BREADCRUMB = {
  margin: '0 0 0 20px',
  paddingTop: '0.25em',
  fontSize: '0.75em'
};

export default function MenuConstruccion(props) {

  // TODO Refactor into custom hook
  var doorsElements = props.catalog.getCategory('doors').elements.filter(function (element) {
    return element.info.visibility ? element.info.visibility.catalog : true;
  });

  var windowsElements = props.catalog.getCategory('windows').elements.filter(function (element) {
    return element.info.visibility ? element.info.visibility.catalog : true;
  });

  var _useState = useState({
    currentShowElement: null,
    filterShowElement: null,
    breadcrumb: null,
    doors: doorsElements,
    windows: windowsElements,
    hoverBreadcrumb: false,
    matchString: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var matcharray = function matcharray(text) {
    if (text != '' && state.currentShowElement !== null) {
      var array = state.currentShowElement;
      var filtered = [];
      var regexp = new RegExp(text, 'i');
      for (var i = 0; i < array.length; i++) {
        if (regexp.test(array[i].info.title)) {
          filtered.push(array[i]);
        }
      }

      setState(function (prevState) {
        return _extends({}, prevState, {
          matchString: text,
          filterShowElement: filtered
        });
      });
    } else {
      setState(function (prevState) {
        return _extends({}, prevState, {
          filterShowElement: null

        });
      });
    }
  };

  var closeMenuConstruccion = function closeMenuConstruccion() {
    setState(function (prevState) {
      return _extends({}, prevState, { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false });
    });
    document.getElementById('menuConstruccion').style.display = 'none';
  };

  var selectDoors = function selectDoors() {
    // TODO: Cambiar idioma
    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: 'Puertas',
        currentShowElement: state.doors
      });
    });
  };

  var selectWindows = function selectWindows() {
    // TODO: Cambiar idioma
    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: 'Ventanas',
        currentShowElement: state.windows
      });
    });
  };

  var selectObstacle = function selectObstacle() {
    // TODO: Cambiar idioma
    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: 'Obstaculos',
        currentShowElement: []
      });
    });
  };

  var printItems = function printItems(elements) {
    return React.createElement(
      'div',
      { style: {
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          textAlign: 'center',
          columnGap: '20px'
        }
      },
      elements.map(function (element, key) {
        return React.createElement(
          'div',
          {
            key: key,
            style: { cursor: 'pointer', paddingTop: '10px' },
            onClick: function onClick() {
              return props.holesActions.selectToolDrawingHole(element.name);
            }
          },
          React.createElement(
            'div',
            { style: { position: 'relative', minHeight: '100%' } },
            React.createElement('img', {
              className: 'rectangulo',
              src: rectangulo,
              style: {
                marginLeft: key % 2 === 0 ? '-1.5em' : '-0.9em',
                marginTop: '-0.5em',
                minHeight: '100%',
                maxWidth: '150%'
              }
            }),
            React.createElement('img', { src: element.info.image, style: STYLE_IMAGE }),
            React.createElement(
              'p',
              { style: STYLE_NAME },
              element.name
            )
          )
        );
      })
    );
  };

  return React.createElement(
    'aside',
    { id: 'menuConstruccion', style: STYLE },
    React.createElement(
      'div',
      { style: STYLE_TITLE_BAR },
      state.breadcrumb === null ? React.createElement(
        'p',
        { style: STYLE_BREADCRUMB },
        'Construcci\xF3n'
      ) : React.createElement(
        'p',
        { style: STYLE_BREADCRUMB },
        React.createElement(
          'span',
          {
            style: state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {},
            onMouseEnter: function onMouseEnter() {
              return setState(function (prevState) {
                return _extends({}, prevState, { hoverBreadcrumb: true });
              });
            },
            onMouseLeave: function onMouseLeave() {
              return setState(function (prevState) {
                return _extends({}, prevState, { hoverBreadcrumb: false });
              });
            },
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false });
              });
            }
          },
          'Construcci\xF3n'
        ),
        ' > ' + state.breadcrumb
      ),
      React.createElement('img', {
        style: STYLE_BUTTON_CLOSE,
        src: close,
        onClick: closeMenuConstruccion })
    ),
    React.createElement(
      'div',
      { style: { margin: '0 20px' } },
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', marginTop: '10px' } },
        React.createElement('input', {
          style: { width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' },
          type: 'text',
          placeholder: 'Buscar...',
          onChange: function onChange(e) {
            matcharray(e.target.value);
          }
        }),
        React.createElement(
          'div',
          { style: { display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer' } },
          React.createElement(
            'p',
            { style: {
                fontSize: '0.75em',
                color: SharedStyle.PRIMARY_COLOR.master,
                width: '10em'
              } },
            'B\xFAsqueda Avanzada'
          ),
          React.createElement('img', { style: { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em' }, src: flecha })
        ),
        state.currentShowElement === null ? React.createElement(
          'div',
          { style: { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } },
          React.createElement(
            'div',
            { onClick: selectDoors, style: { cursor: 'pointer', paddingTop: '10px' } },
            React.createElement(
              'div',
              { style: { position: 'relative', minHeight: '100%' } },
              React.createElement('img', { className: 'rectangulo', src: rectangulo, style: { marginLeft: '-1.5em', marginTop: '-0.5em', minHeight: '100%' } }),
              React.createElement('img', { src: puertas, style: STYLE_IMAGE }),
              React.createElement(
                'p',
                { style: STYLE_NAME },
                'Puertas'
              )
            )
          ),
          React.createElement(
            'div',
            { onClick: selectWindows, style: { cursor: 'pointer', paddingTop: '10px' } },
            React.createElement(
              'div',
              { style: { position: 'relative', minHeight: '100%' } },
              React.createElement('img', { className: 'rectangulo', src: rectangulo, style: { marginLeft: '-0.9em', marginTop: '-0.5em', minHeight: '100%' } }),
              React.createElement('img', { src: ventanas, style: STYLE_IMAGE }),
              React.createElement(
                'p',
                { style: STYLE_NAME },
                'Ventanas'
              )
            )
          ),
          React.createElement(
            'div',
            { onClick: selectObstacle, style: { cursor: 'pointer', paddingTop: '10px' } },
            React.createElement(
              'div',
              { style: { position: 'relative', minHeight: '100%' } },
              React.createElement('img', { className: 'rectangulo', src: rectangulo, style: { marginLeft: '-1.5em', marginTop: '-0.5em', minHeight: '100%' } }),
              React.createElement('img', { src: obstaculos, style: STYLE_IMAGE }),
              React.createElement(
                'p',
                { style: STYLE_NAME },
                'Obstaculos'
              )
            )
          )
        ) : state.filterShowElement === null ? printItems(state.currentShowElement) : printItems(state.filterShowElement)
      )
    )
  );
}

// export default class MenuConstruccion extends Component {

//   constructor ( props ) {
//     super( props );

//     const doorsElements =
//       this.props
//         .catalog
//         .getCategory( 'doors' )
//         .elements
//         .filter( element => ( element.info.visibility )
//           ? element.info.visibility.catalog
//           : true
//         );

//     const windowsElements =
//       this.props
//         .catalog
//         .getCategory( 'windows' )
//         .elements
//         .filter( element => ( element.info.visibility )
//           ? element.info.visibility.catalog
//           : true
//         );

//     this.state = {
//       currentShowElement: null,
//       filterShowElement: null,
//       breadcrumb: null,
//       doors: doorsElements,
//       windows: windowsElements,
//       hoverBreadcrumb: false,
//       matchString: '',
//     };
//   }


//   render () {
//     const matcharray = ( text ) => {
//       if ( text != '' && this.state.currentShowElement !== null ) {
//         let array = this.state.currentShowElement;
//         let filtered = [];
//         let regexp = new RegExp( text, 'i' );
//         for ( let i = 0; i < array.length; i++ ) {
//           if ( regexp.test( array[ i ].info.title ) ) {
//             filtered.push( array[ i ] );
//           }
//         }

//         this.setState( {
//           matchString: text,
//           filterShowElement: filtered
//         } );
//       } else {
//         this.setState( {
//           filterShowElement: null
//         } );
//       }
//     };

//     const closeMenuConstruccion = () => {
//       this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } );
//       document.getElementById( 'menuConstruccion' ).style.display = 'none';
//     };

//     const selectDoors = () => {
//       // TODO: Cambiar idioma
//       this.setState( {
//         breadcrumb: 'Puertas',
//         currentShowElement: this.state.doors,
//       } );
//     };

//     const selectWindows = () => {
//       // TODO: Cambiar idioma
//       this.setState( {
//         breadcrumb: 'Ventanas',
//         currentShowElement: this.state.windows,
//       } );
//     };

//     const selectObstacle = () => {
//       // TODO: Cambiar idioma
//       this.setState( {
//         breadcrumb: 'Obstaculos',
//         currentShowElement: [],
//       } );
//     };

//     const printItems = ( elements ) => {
//       return <div style={ {
//         marginTop: '20px',
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         textAlign: 'center',
//         columnGap: '20px'
//       } }>
//         {
//           elements.map( ( element, key ) => (
//             < div
//               key={ key }
//               style={ { cursor: 'pointer', paddingTop: '10px' } }
//               onClick={ () => this.props.holesActions.selectToolDrawingHole( element.name ) }
//             >
//               <div style={ { position: 'relative', minHeight: '100%' } }>
//                 <img
//                   className='rectangulo'
//                   src={ rectangulo }
//                   style={
//                     {
//                       marginLeft: ( key % 2 === 0 ) ? '-1.5em' : '-0.9em',
//                       marginTop: '-0.5em',
//                       minHeight: '100%',
//                       maxWidth: '150%'
//                     } }
//                 />

//                 <img src={ element.info.image } style={ STYLE_IMAGE } />
//                 <p style={ STYLE_NAME }>{ element.name }</p>
//               </div>
//             </div>
//           ) )
//         }
//       </div>;
//     };

//     return (
//       <aside id='menuConstruccion' style={ STYLE }>
//         {/* Barra Inicial */ }
//         <div style={ STYLE_TITLE_BAR }>
//           {
//             this.state.breadcrumb === null ?
//               <p style={ STYLE_BREADCRUMB }>
//                 Construcción
//               </p>
//               :
//               <p style={ STYLE_BREADCRUMB }>
//                 <span
//                   style={ this.state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {} }
//                   onMouseEnter={ () => this.setState( { hoverBreadcrumb: true } ) }
//                   onMouseLeave={ () => this.setState( { hoverBreadcrumb: false } ) }
//                   onClick={ () => { this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } ); } }
//                 >
//                   Construcción
//                 </span>
//                 { ` > ${ this.state.breadcrumb }` }
//               </p>

//           }
//           <img
//             style={ STYLE_BUTTON_CLOSE }
//             src={ close }
//             onClick={ () => {
//               closeMenuConstruccion();
//             } } />
//         </div>
//         {/* Search */ }
//         <div style={ { margin: '0 20px' } }>
//           <div style={ { display: 'flex', flexDirection: 'column', marginTop: '10px' } } >
//             <input
//               style={ { width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' } }
//               type="text"
//               placeholder='Buscar...'
//               onChange={ ( e ) => { matcharray( e.target.value ); } }
//             />
//             <div style={ { display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer', } }>
//               <p style={ {
//                 fontSize: '0.75em',
//                 color: SharedStyle.PRIMARY_COLOR.master,
//                 width: '10em',
//               } }>Búsqueda Avanzada</p>
//               <img style={ { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', } } src={ flecha } />
//             </div>

//             {/* Objects */ }
//             {
//               this.state.currentShowElement === null ?
//                 <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
//                   <div onClick={ selectDoors } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative', minHeight: '100%' } }>
//                       <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-1.5em', marginTop: '-0.5em', minHeight: '100%' } } />
//                       <img src={ puertas } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Puertas</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectWindows } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative', minHeight: '100%' } }>
//                       <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-0.9em', marginTop: '-0.5em', minHeight: '100%' } } />
//                       <img src={ ventanas } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Ventanas</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectObstacle } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative', minHeight: '100%' } }>
//                       <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-1.5em', marginTop: '-0.5em', minHeight: '100%' } } />
//                       <img src={ obstaculos } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Obstaculos</p>
//                     </div>
//                   </div>
//                 </div>
//                 :
//                 (
//                   ( this.state.filterShowElement === null )
//                     ? printItems( this.state.currentShowElement )
//                     : printItems( this.state.filterShowElement )
//                 )
//             }
//           </div>
//         </div>
//       </aside >
//     );
//   }
// }