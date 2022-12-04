import React, { Component } from 'react';

import * as SharedStyle from '../../shared-style';
import './style.css';

import rectangulo from './../../assets/salgar/rectangulo.png';

// Imports de imagenes
import close from './../../assets/generalItems/deleteCross.png';
import puertas from './../../assets/construccion/puertas.png';
import ventanas from './../../assets/construccion/ventanas.png';
import obstaculos from './../../assets/construccion/obstaculos.png';
import flecha from './../../assets/generalItems/flecha.png';

import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

let STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  height: '100%',
  width: '238px',
  borderRightStyle: 'solid',
  borderRightWidth: '2px',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
  zIndex: '9005',
};

const STYLE_TITLE_BAR = {
  height: '1.5em',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
};

const STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

const STYLE_IMAGE = {
  cursor: 'pointer',
  width: '80px', height: '80px',
};

const STYLE_NAME = {
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  minHeight: '20px',
};

const STYLE_BREADCRUMB = {
  margin: '0 0 0 20px',
  paddingTop: '0.25em',
  fontSize: '0.75em',
};


export default class MenuConstruccion extends Component {

  constructor ( props ) {
    super( props );

    const doorsElements =
      this.props
        .catalog
        .getCategory( 'doors' )
        .elements
        .filter( element => ( element.info.visibility )
          ? element.info.visibility.catalog
          : true
        );

    const windowsElements =
      this.props
        .catalog
        .getCategory( 'windows' )
        .elements
        .filter( element => ( element.info.visibility )
          ? element.info.visibility.catalog
          : true
        );

    this.state = {
      currentShowElement: null,
      filterShowElement: null,
      breadcrumb: null,
      doors: doorsElements,
      windows: windowsElements,
      hoverBreadcrumb: false,
      matchString: '',
    };
  }

  render () {
    const matcharray = ( text ) => {
      if ( text != '' && this.state.currentShowElement !== null ) {
        let array = this.state.currentShowElement;
        let filtered = [];
        let regexp = new RegExp( text, 'i' );
        for ( let i = 0; i < array.length; i++ ) {
          if ( regexp.test( array[ i ].info.title ) ) {
            filtered.push( array[ i ] );
          }
        }

        this.setState( {
          matchString: text,
          filterShowElement: filtered
        } );
      } else {
        this.setState( {
          filterShowElement: null
        } );

      }

    };

    const closeMenuConstruccion = () => {
      this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } );
      document.getElementById( 'menuConstruccion' ).style.display = 'none';
    };

    const selectDoors = () => {
      // TODO: Cambiar idioma
      this.setState( {
        breadcrumb: 'Puertas',
        currentShowElement: this.state.doors,
      } );
    };

    const selectWindows = () => {
      // TODO: Cambiar idioma
      this.setState( {
        breadcrumb: 'Ventanas',
        currentShowElement: this.state.windows,
      } );
    };

    const selectObstacule = () => {
      // TODO: Cambiar idioma
      this.setState( {
        breadcrumb: 'Obstaculos',
        currentShowElement: [],
      } );
    };

    const printItems = ( elements ) => {
      return <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
        {
          elements.map( ( element, key ) => (
            <div
              key={ key }
              style={ { cursor: 'pointer', paddingTop: '10px' } }
              onClick={ () => this.props.holesActions.selectToolDrawingHole( element.name ) }
            >
              <div style={ { position: 'relative' } }>
                <img
                  className={ 'rectangulo' }
                  src={ rectangulo }
                  style={ { marginLeft: ( key % 2 === 0 ) ? '-1.5em' : '-0.9em', marginTop: '-0.5em' } }
                />
                <img src={ element.info.image } style={ STYLE_IMAGE } />
                <p style={ STYLE_NAME }>{ element.name }</p>
              </div>
            </div>
          ) )
        }
      </div>;
    };



    return (
      <aside id='menuConstruccion' style={ STYLE }>
        {/* Barra Inicial */ }
        <div style={ STYLE_TITLE_BAR }>
          {
            this.state.breadcrumb === null ?
              <p style={ STYLE_BREADCRUMB }>
                Construcción
              </p>
              :
              <p style={ STYLE_BREADCRUMB }>
                <span
                  style={ this.state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {} }
                  onMouseEnter={ () => this.setState( { hoverBreadcrumb: true } ) }
                  onMouseLeave={ () => this.setState( { hoverBreadcrumb: false } ) }
                  onClick={ () => { this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } ); } }
                >
                  Construcción
                </span>
                { ` > ${ this.state.breadcrumb }` }
              </p>

          }
          <img
            style={ STYLE_BUTTON_CLOSE }
            src={ close }
            onClick={ () => {
              closeMenuConstruccion();
              this.props.handleToolbarButtons();
            } } />
        </div>
        {/* Search */ }
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
              } }>Búsqueda Avanzada</p>
              <img style={ { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', } } src={ flecha } />
            </div>

            {/* Objects */ }
            {
              this.state.currentShowElement === null ?
                <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
                  <div onClick={ selectDoors } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                    <div style={ { position: 'relative' } }>
                      <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-1.5em', marginTop: '-0.5em' } } />
                      <img src={ puertas } style={ STYLE_IMAGE } />
                      <p style={ STYLE_NAME }>Puertas</p>
                    </div>
                  </div>
                  <div onClick={ selectWindows } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                    <div style={ { position: 'relative' } }>
                      <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-0.9em', marginTop: '-0.5em' } } />
                      <img src={ ventanas } style={ STYLE_IMAGE } />
                      <p style={ STYLE_NAME }>Ventanas</p>
                    </div>
                  </div>
                  <div onClick={ selectObstacule } style={ { cursor: 'pointer', paddingTop: '10px' } }>
                    <div style={ { position: 'relative' } }>
                      <img className={ 'rectangulo' } src={ rectangulo } style={ { marginLeft: '-1.5em', marginTop: '-0.5em' } } />
                      <img src={ obstaculos } style={ STYLE_IMAGE } />
                      <p style={ STYLE_NAME }>Obstaculos</p>
                    </div>
                  </div>
                </div>
                :
                (
                  ( this.state.filterShowElement === null )
                    ? printItems( this.state.currentShowElement )
                    : printItems( this.state.filterShowElement )
                )
            }
          </div>
        </div>
      </aside >
    );
  }
}
