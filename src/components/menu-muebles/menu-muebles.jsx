import React, { useState } from 'react';
import * as SharedStyle from '../../shared-style';
import './style.css';

import img_close from './../../assets/generalItems/deleteCross.png';
import img_flecha from './../../assets/generalItems/flecha.png';
import img_rectangulo from './../../assets/salgar/rectangulo.png';

// Muebles baño
import img_mueblesBanyo from './../../assets/salgar/mueblesBanyo/mueblesBanyo.png';
import img_fusionChrome from './../../assets/salgar/mueblesBanyo/fussionChrome.png';
import img_fussionLine from './../../assets/salgar/mueblesBanyo/fussionLine.png';
import img_mam from './../../assets/salgar/mueblesBanyo/mam.png';
import img_monterrey from './../../assets/salgar/mueblesBanyo/monterrey.png';
import img_spirit from './../../assets/salgar/mueblesBanyo/spirit.png';
import img_uniiq from './../../assets/salgar/mueblesBanyo/uniiq.png';
import img_23275 from './../../assets/salgar/mueblesBanyo/23275.png';

// Lavabos y Encimeras
import img_lavabos from './../../assets/salgar/lavabos/lavabos.png';
import img_lavabos2 from './../../assets/salgar/lavabos/lavabos2.png';
import img_lavabosPosar from './../../assets/salgar/lavabos/lavabosPosar.png';
import img_encimeras from './../../assets/salgar/lavabos/encimeras.png';
import img_18687 from './../../assets/salgar/lavabos/18687.png';

// Compakt
import img_compakt from './../../assets/salgar/compakt/compakt.png';
import img_compaktFondo46 from './../../assets/salgar/compakt/compaktFondo_46.png';
import img_compaktFondo51 from './../../assets/salgar/compakt/compaktFondo_51.png';
import img_24471 from './../../assets/salgar/compakt/24471.png';

// Mamparas
import img_mamparas from './../../assets/salgar/mamparas/mamparas.png';
import img_angular from './../../assets/salgar/mamparas/angular.png';
import img_frontal from './../../assets/salgar/mamparas/frontal.png';
import img_pasoLibre from './../../assets/salgar/mamparas/pasoLibre.png';
import img_semicircular from './../../assets/salgar/mamparas/semicircular.png';
import img_22443 from './../../assets/salgar/mamparas/22443.png';

// Platos de ducha
import img_platosDucha from './../../assets/salgar/platosDucha/platosDucha.png';
import img_pompeya from './../../assets/salgar/platosDucha/pompeya.png';
import img_rioja from './../../assets/salgar/platosDucha/rioja.png';
import img_23425 from './../../assets/salgar/platosDucha/23425.png';

// Accesorios
import img_accesorios from './../../assets/salgar/accesorios/accesorios.png';

const STYLE = {
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

const STYLE_TITLE_BAR = {
  minHeight: '1.5em',
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
};

const STYLE_TITLE = {
  margin: '0 0 0 20px',
  paddingTop: '0.3em',
  fontSize: '0.75em',
};

const STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

const STYLE_IMAGE = {
  cursor: 'pointer',
  width: '80px',
  height: '80px',
};

const STYLE_NAME = {
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  margin: '0',
  marginTop: '10px',
  minHeight: '20px',

};

const STYLE_BREADCRUMB = {
  margin: '0 10px 0 20px',
  paddingTop: '0.25em',
  fontSize: '0.75em',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export default function MenuMuebles ( props ) {
  const [ state, setState ] = useState( {
    currentShowElement: null,
    filterShowElement: null,
    breadcrumb: null,
    hoverBreadcrumb: false,
    matchString: '',
    mueblesBanyo: null,
    lavabos: null,
    mamparas: null,
    platosDucha: null,
    accesorios: null,
  } );

  //TODO Refactor into custom hook
  const matcharray = ( text ) => {
    if ( text != '' && state.currentShowElement !== null ) {
      let filtered = [];
      let array = state.currentShowElement;
      let regexp = new RegExp( text, 'i' );

      for ( let i = 0; i < array.length; i++ ) {
        if ( regexp.test( array[ i ].info.title ) ) {
          filtered.push( array[ i ] );
        }
      }

      setState( ( prevState ) => ( {
        ...prevState,
        matchString: text,
        filterShowElement: filtered
      }
      ) );

    } else {
      setState( ( prevState ) => ( {
        ...prevState,
        filterShowElement: null
      } ) );

    }
  };



  const closeMenuMuebles = () => {
    setState( ( prevState ) => ( { ...prevState, currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } ) );
    document.getElementById( 'menuMuebles' ).style.display = 'none';
  };

  const printItems = ( elements ) => {
    return (
      <div
        style={ {
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          textAlign: 'center',
          columnGap: '20px',
        } }
      >
        { elements && elements.map( ( element, key ) => {
          return (
            <div
              key={ key }
              style={ { cursor: 'pointer', paddingTop: '10px' } }
              onClick={ element.action ? element.action : null }
            >
              <div style={ { position: 'relative' } }>
                <img
                  className='rectangulo'
                  src={ img_rectangulo }
                  style={ { marginLeft: key % 2 === 0 ? '-1.5em' : '-0.9em', minHeight: '100%' } }
                />
                <img src={ element.image } style={ STYLE_IMAGE } />
                <p style={ STYLE_NAME }>{ element.name }</p>
              </div>
            </div>
          );
        } )
        }
      </div>
    );
  };

  const selectFusionChrome = () => {
    // TODO: Cambiar idioma
    let newBreadcrumb = () => {
      const simbol = ' > ';
      const text1 = 'Muebles baño';
      const text2 = 'Fusion Chrome';

      return (
        <span >
          <span>{ simbol }</span>
          <span className={ 'breadcrumb2' }
            onClick={ () => {
              setState( ( prevState ) => ( {
                ...prevState,
                currentShowElement: elementsMueblesBanyo,
                breadcrumb: ' > Muebles baño'
              } ) );
            } }
          >
            { text1 }
          </span>
          <span>{ simbol }</span>
          <span>{ text2 }</span>
        </span >
      );
    };

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: newBreadcrumb(),
      currentShowElement: [ { image: img_23275, name: '23275', } ],
    } ) );
  };

  const selectMueblesBanyo = () => {
    // TODO: Cambiar idioma
    const text = ' > Muebles baño';

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: elementsMueblesBanyo
    } ) );
  };

  const selectLavabo2 = () => {
    // TODO: Cambiar idioma
    let newBreadcrumb = () => {
      const simbol = ' > ';
      const text1 = 'Lavabos y Encimeras';
      const text2 = 'Lavabos';

      return (
        <span>
          <span>{ simbol }</span>
          <span className={ 'breadcrumb2' }
            onClick={ () => {
              setState( ( prevState ) => ( {
                ...prevState,
                currentShowElement: elementsLavabo,
                breadcrumb: ' > Lavabos'
              } ) );
            } }
          >
            { text1 }
          </span>
          <span>{ simbol }</span>
          <span>{ text2 }</span>
        </span>
      );
    };

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: newBreadcrumb(),
      currentShowElement: [ { image: img_18687, name: '18687', } ],
    } ) );
  };


  const selectLavabo = () => {
    // TODO: Cambiar idioma
    const text = ' > Lavabos y Encimeras';

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: elementsLavabo
    } ) );
  };

  const selectCompakt46 = () => {
    // TODO: Cambiar idioma
    let newBreadcrumb = () => {
      const simbol = ' > ';
      const text1 = 'Compakt';
      const text2 = 'Compakt 46';

      return (
        <span>
          <span>{ simbol }</span>
          <span className={ 'breadcrumb2' }
            onClick={ () => {
              setState( ( prevState ) => ( {
                ...prevState,
                currentShowElement: elementsCompakt,
                breadcrumb: ' > Compakt'
              } ) );
            } }
          >
            { text1 }
          </span>
          <span>{ simbol }</span>
          <span>{ text2 }</span>
        </span>
      );
    };

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: newBreadcrumb(),
      currentShowElement: [ { image: img_24471, name: '24471', } ],
    } ) );
  };

  const selectCompakt = () => {
    // TODO: Cambiar idioma
    const text = ' > Compakt';
    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: elementsCompakt
    } ) );
  };

  const selectFrontal = () => {
    // TODO: Cambiar idioma
    let newBreadcrumb = () => {
      const simbol = ' > ';
      const text1 = 'Mamparas';
      const text2 = 'Frontal';

      return (
        <span>
          <span>{ simbol }</span>
          <span className={ 'breadcrumb2' }
            onClick={ () => {
              setState( ( prevState ) => ( {
                ...prevState,
                currentShowElement: elementsMamparas,
                breadcrumb: ' > Mamparas',
                hoverBreadcrumb2: false
              } ) );
            } }
          >
            { text1 }
          </span>
          <span>{ simbol }</span>
          <span>{ text2 }</span>
        </span>
      );
    };

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: newBreadcrumb(),
      currentShowElement: [ { image: img_22443, name: '22443', } ],
    } ) );
  };



  const selectMamparas = () => {
    // TODO: Cambiar idioma
    const text = ' > Mamparas';

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: elementsMamparas
    } ) );
  };

  // SECTION PLATOS DUCHA
  const selectRioja = () => {
    // TODO: Cambiar idioma
    let newBreadcrumb = () => {
      const simbol = ' > ';
      const text1 = 'Platos de ducha';
      const text2 = 'Rioja';

      return (
        <span>
          <span>{ simbol }</span>
          <span
            className={ 'breadcrumb2' }
            onClick={ () => {
              setState( ( prevState ) => ( {
                ...prevState,
                currentShowElement: elementsPlatosDucha,
                breadcrumb: ' > Platos de ducha',
                hoverBreadcrumb2: false
              } ) );
            } }
          >
            { text1 }
          </span>
          <span>{ simbol }</span>
          <span>{ text2 }</span>
        </span> );
    };

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: newBreadcrumb(),
      currentShowElement: [ { image: img_23425, name: '23425', } ],
    } ) );
  };



  const selectPlatosDucha = () => {
    // TODO: Cambiar idioma
    const text = ' > Platos de ducha';

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: elementsPlatosDucha
    } ) );
  };

  const selectAccesorios = () => {
    // TODO: Cambiar idioma
    const text = ' > Accesorios';

    setState( ( prevState ) => ( {
      ...prevState,
      breadcrumb: <span>{ text }</span>,
      currentShowElement: []
    } ) );
  };


  const elementsMueblesBanyo = [
    { image: img_fusionChrome, name: 'Fusion Chrome', action: selectFusionChrome },
    { image: img_fussionLine, name: 'Fussion Line', },
    { image: img_mam, name: 'Mam', },
    { image: img_monterrey, name: 'Monterrey', },
    { image: img_spirit, name: 'Spirit', },
    { image: img_uniiq, name: 'UNiiq', },
  ];

  const elementsLavabo = [
    { image: img_lavabos2, name: 'Lavabos', action: selectLavabo2 },
    { image: img_lavabosPosar, name: 'Lavabos de posar', },
    { image: img_encimeras, name: 'Encimeras', },
  ];


  const elementsCompakt = [
    { image: img_compaktFondo46, name: 'Compakt Fondo 46', action: selectCompakt46 },
    { image: img_compaktFondo51, name: 'Compakt Fondo 51', },
  ];

  const elementsMamparas = [
    { image: img_frontal, name: 'Frontal', action: selectFrontal },
    { image: img_angular, name: 'Angular', },
    { image: img_pasoLibre, name: 'Paso Libre', },
    { image: img_semicircular, name: 'Semicircular', },
  ];

  const elementsPlatosDucha = [
    { image: img_rioja, name: 'Rioja', action: selectRioja },
    { image: img_pompeya, name: 'Pompeya', },
  ];

  return (
    <aside id='menuMuebles' style={ STYLE }>
      <div style={ STYLE_TITLE_BAR }>
        { ( state.breadcrumb === null )
          ? <p style={ STYLE_BREADCRUMB }>
            Baño Salgar
          </p>
          : <p style={ STYLE_BREADCRUMB }>
            <span
              style={ ( state.hoverBreadcrumb )
                ? { textDecoration: 'underline', cursor: 'pointer' }
                : {}
              }

              onMouseEnter={ () => setState( ( prevState ) => (
                { ...prevState, hoverBreadcrumb: true }
              ) ) }

              onMouseLeave={ () => setState( ( prevState ) => (
                { ...prevState, hoverBreadcrumb: false }
              ) ) }

              onClick={ () => {
                setState( ( prevState ) => (
                  {
                    ...prevState,
                    currentShowElement: null,
                    breadcrumb: null,
                    hoverBreadcrumb: false
                  }
                ) );
              } }
            >
              Baño Salgar
            </span>
            { state.breadcrumb }
          </p>
        }

        <img
          style={ STYLE_BUTTON_CLOSE }
          src={ img_close }
          onClick={ closeMenuMuebles }
        />
      </div>

      <div style={ { margin: '0 20px' } }>
        <div style={ { display: 'flex', flexDirection: 'column', marginTop: '10px' } } >
          <input
            style={ { width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' } }
            type="text"
            placeholder='Buscar...'
            onChange={ ( e ) => { matcharray( e.target.value ); } }
          />
          <div style={ { display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer', } }>
            <p style={ {
              fontSize: '0.75em',
              color: SharedStyle.PRIMARY_COLOR.master,
              width: '10em',
            } }
            >
              Búsqueda Avanzada
            </p>
            <img style={ { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', } } src={ img_flecha } />
          </div>

          { ( state.currentShowElement === null )
            ? <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
              <div onClick={ selectMueblesBanyo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
                  <img src={ img_mueblesBanyo } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Muebles Baño</p>
                </div>
              </div>
              <div onClick={ selectLavabo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
                  <img src={ img_lavabos } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Lavabos y Encimeras</p>
                </div>
              </div>
              <div onClick={ selectCompakt } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
                  <img src={ img_compakt } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Compakt</p>
                </div>
              </div>
              <div onClick={ selectMamparas } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
                  <img src={ img_mamparas } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Mamparas</p>
                </div>
              </div>
              <div onClick={ selectPlatosDucha } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
                  <img src={ img_platosDucha } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Platos de ducha</p>
                </div>
              </div>
              <div onClick={ selectAccesorios } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                <div style={ { position: 'relative' } }>
                  <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
                  <img src={ img_accesorios } style={ STYLE_IMAGE } />
                  <p style={ STYLE_NAME }>Accesorios</p>
                </div>
              </div>
            </div>
            : ( ( state.filterShowElement === null )
              ? printItems( state.currentShowElement )
              : printItems( state.filterShowElement )
            )
          }
        </div>
      </div>
    </aside >
  );
}


// export default class MenuMuebles extends Component {

//   constructor ( props ) {
//     super( props );
//     const mueblesElements = this.props.catalog.getCategory( 'muebles' ).elements.filter( element => element.info.visibility ? element.info.visibility.catalog : true );
//     /*this.state = {
//       currentShowElement: mueblesElements,
//       filterShowElement: null,
//       matchString: '',
//     }*/
//     this.state = {
//       currentShowElement: null,
//       filterShowElement: null,
//       breadcrumb: null,
//       hoverBreadcrumb: false,
//       matchString: '',
//       mueblesBanyo: null,
//       lavabos: null,
//       mamparas: null,
//       platosDucha: null,
//       accesorios: null,
//     };
//   }


//   render () {
//     const matcharray = ( text ) => {
//       if ( text != '' && this.state.currentShowElement !== null ) {
//         console.log( 'enter' );
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

//     const closeMenuMuebles = () => {
//       document.getElementById( 'menuMuebles' ).style.display = 'none';
//     };

//     /*  const printItems = (elements) => {
//         return <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' }}>
//           {
//             elements.map((element, key) => {
//               return <div
//                 key={key}
//                 style={{ cursor: 'pointer', width: '80px' }}
//                 onClick={() => {
//                   this.props.itemsActions.selectToolDrawingItem(element.name);
//                 }}
//               >
//                 <img src={element.info.image} style={STYLE_IMAGE} />
//                 <p style={STYLE_NAME}>{element.name}</p>
//               </div>
//             })
//           }
//         </div>
//       }*/

//     const printItems = ( elements ) => {
//       return <div style={ {
//         marginTop: '20px',
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         textAlign: 'center',
//         columnGap: '20px',
//       } }>
//         {
//           elements.map( ( element, key ) => {
//             return <div
//               key={ key }
//               style={ { cursor: 'pointer', paddingTop: '10px' } }
//               onClick={ element.action ? element.action : null }
//             >
//               <div style={ { position: 'relative' } }>
//                 <img
//                   className='rectangulo'
//                   src={ img_rectangulo }
//                   style={ { marginLeft: key % 2 === 0 ? '-1.5em' : '-0.9em', minHeight: '100%' } }
//                 />

//                 <img src={ element.image } style={ STYLE_IMAGE } />
//                 <p style={ STYLE_NAME }>{ element.name }</p>
//               </div>
//             </div>;
//           } )
//         }
//       </div>;
//     };


//     // SECTION MUEBLES
//     const selectFusionChrome = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Muebles baño';
//         const text2 = 'Fusion Chrome';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsMueblesBanyo, breadcrumb: ' > Muebles baño', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_23275, name: '23275', },
//         ],
//       } );
//     };

//     const elementsMueblesBanyo = [
//       { image: img_fusionChrome, name: 'Fusion Chrome', action: selectFusionChrome },
//       { image: img_fussionLine, name: 'Fussion Line', },
//       { image: img_mam, name: 'Mam', },
//       { image: img_monterrey, name: 'Monterrey', },
//       { image: img_spirit, name: 'Spirit', },
//       { image: img_uniiq, name: 'UNiiq', },
//     ];

//     const selectMueblesBanyo = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Muebles baño';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsMueblesBanyo
//       } );
//     };

//     // SECTION LAVABO
//     const selectLavabo2 = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Lavabos y Encimeras';
//         const text2 = 'Lavabos';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsLavabo, breadcrumb: ' > Lavabos', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_18687, name: '18687', },
//         ],
//       } );
//     };

//     const elementsLavabo = [
//       { image: img_lavabos2, name: 'Lavabos', action: selectLavabo2 },
//       { image: img_lavabosPosar, name: 'Lavabos de posar', },
//       { image: img_encimeras, name: 'Encimeras', },
//     ];

//     const selectLavabo = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Lavabos y Encimeras';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsLavabo
//       } );
//     };

//     // SECTION COMPAKT
//     const selectCompakt46 = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Compakt';
//         const text2 = 'Compakt 46';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsCompakt, breadcrumb: ' > Compakt', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_24471, name: '24471', },
//         ],
//       } );
//     };

//     const elementsCompakt = [
//       { image: img_compaktFondo46, name: 'Compakt Fondo 46', action: selectCompakt46 },
//       { image: img_compaktFondo51, name: 'Compakt Fondo 51', },
//     ];

//     const selectCompakt = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Compakt';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsCompakt
//       } );
//     };

//     // SECTION MAMPARAS
//     const selectFrontal = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Mamparas';
//         const text2 = 'Frontal';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsMamparas, breadcrumb: ' > Mamparas', hoverBreadcrumb2: false } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_22443, name: '22443', },
//         ],
//       } );
//     };

//     const elementsMamparas = [
//       { image: img_frontal, name: 'Frontal', action: selectFrontal },
//       { image: img_angular, name: 'Angular', },
//       { image: img_pasoLibre, name: 'Paso Libre', },
//       { image: img_semicircular, name: 'Semicircular', },
//     ];

//     const selectMamparas = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Mamparas';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsMamparas
//       } );
//     };

//     // SECTION PLATOS DUCHA
//     const selectRioja = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Platos de ducha';
//         const text2 = 'Rioja';

//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsPlatosDucha, breadcrumb: ' > Platos de ducha', hoverBreadcrumb2: false } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_23425, name: '23425', },
//         ],
//       } );
//     };

//     const elementsPlatosDucha = [
//       { image: img_rioja, name: 'Rioja', action: selectRioja },
//       { image: img_pompeya, name: 'Pompeya', },
//     ];

//     const selectPlatosDucha = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Platos de ducha';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsPlatosDucha
//       } );
//     };

//     const selectAccesorios = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Accesorios';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: []
//       } );
//     };

//     return (
//       /* <aside id='menuMuebles' style={STYLE}>
//          {*//* Initial Bar *//*}
// <div style={STYLE_TITLE_BAR}>
// <p style={STYLE_TITLE}>
// Muebles
// </p>
// <img style={STYLE_BUTTON_CLOSE} src={close} onClick={closeMenuMuebles} />
// </div>
// {*//* Search *//*}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <div style={{ margin: '0 20px 0 20px' }}>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.4em' }} >
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <input
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         style={{ width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' }}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         type="text"
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         placeholder='Buscar...'
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         onChange={(e) => { matcharray(e.target.value) }}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       />
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <div style={{ display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer' }}>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <p style={{
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           fontSize: '0.75em',
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           color: SharedStyle.PRIMARY_COLOR.master,
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           width: '10em',
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }}>Búsqueda Avanzada</p>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <img style={{ height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', }} src={flecha} />
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       </div>

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       {*//* Objects *//*}
// {
// this.state.filterShowElement === null ?
// printItems(this.state.currentShowElement)
// :
// printItems(this.state.filterShowElement)

// }
// </div>
// </div>
// </aside >*/
//       <aside id='menuMuebles' style={ STYLE }>
//         {/* Barra Inicial */ }
//         <div style={ STYLE_TITLE_BAR }>
//           {
//             this.state.breadcrumb === null ?
//               <p style={ STYLE_BREADCRUMB }>
//                 Baño Salgar
//               </p>
//               :
//               <p style={ STYLE_BREADCRUMB }>
//                 <span
//                   style={ this.state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {} }
//                   onMouseEnter={ () => this.setState( { hoverBreadcrumb: true } ) }
//                   onMouseLeave={ () => this.setState( { hoverBreadcrumb: false } ) }
//                   onClick={ () => { this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } ); } }
//                 >
//                   Baño Salgar
//                 </span>
//                 { this.state.breadcrumb }
//               </p>
//           }
//           <img
//             style={ STYLE_BUTTON_CLOSE }
//             src={ img_close }
//             onClick={ ( e ) => {
//               closeMenuMuebles();
//             } }
//           />
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
//               <img style={ { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', } } src={ img_flecha } />
//             </div>

//             {/* Objects */ }
//             {
//               this.state.currentShowElement === null ?
//                 <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
//                   <div onClick={ selectMueblesBanyo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_mueblesBanyo } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Muebles Baño</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectLavabo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_lavabos } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Lavabos y Encimeras</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectCompakt } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_compakt } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Compakt</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectMamparas } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_mamparas } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Mamparas</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectPlatosDucha } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_platosDucha } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Platos de ducha</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectAccesorios } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_accesorios } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Accesorios</p>
//                     </div>
//                   </div>
//                 </div>
//                 :
//                 (
//                   this.state.filterShowElement === null ?
//                     printItems( this.state.currentShowElement )
//                     :
//                     printItems( this.state.filterShowElement )
//                 )
//             }
//           </div>
//         </div>
//       </aside >
//     );
//   }
// }