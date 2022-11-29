import React, { Component } from 'react';

import * as SharedStyle from '../../shared-style';

import { Prefs } from './../../proxies/export';

const STYLE = {
  display: 'none',
  width: '800px',
  height: '600px',
  backgroundColor: 'white',
  position: 'absolute',
  top: '10%',
  right: '32%',
  zIndex: '9006',
  border: '2px solid ' + SharedStyle.PRIMARY_COLOR.master,
  overflow: 'auto',
};

const BASE_STYLE_LABEL = {
  display: "block",
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  /*fontWeight: 'bold',*/
};

const STYLE_INPUT = {
  display: 'block',
  height: '1.8em',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.COLORS.grey,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: `1px solid ${ SharedStyle.PRIMARY_COLOR.master }`,
  outline: 'none',
  textAlign: 'right',
  width: '15%',
};

export default class MenuPreferencias extends Component {

  constructor ( props ) {
    super( props );
    this.state = {
      prefs: [],
      prefsState: {},
    };
    this.onChange = this.onChange.bind( this );
    this.onChangeCheckbox = this.onChangeCheckbox.bind( this );
  }

  componentDidMount () {
    /*console.log('prefsMethodOscar', Prefs.getPrefsInfo())*/
    console.log( 'state', this.props.projectActions );
    this.setState( {
      prefs: Prefs.getPrefsInfo(),
      prefsState: this.props.prefs,
    } );
  }

  onChange ( name, value ) {
    let newPrefsState = this.state.prefsState;
    newPrefsState[ name ] = value;

    this.setState( {
      ...this.state,
      prefsState: newPrefsState
    } );

    this.props.projectActions.updatePreference( name, value );


    /*console.log('newPrefs', this.state.prefsState)*/
  }

  onChangeCheckbox ( name, value ) {
    let newPrefsState = this.state.prefsState;
    newPrefsState[ name ] = value;

    this.setState( {
      ...this.state,
      prefsState: newPrefsState
    } );

    this.props.projectActions.updatePreference( name, value );

    /*console.log('newPrefs', this.state.prefsState)*/
  }

  render () {
    return (
      <div id={ 'menuPreferencias' } style={ STYLE }>
        <div style={ { margin: '1em 2.5em' } }>
          <h4>Menu de Preferencias</h4>
          <div>
            {
              this.state.prefs.map( ( pref, i ) => {
                let valueInput = this.state.prefsState[ pref.nombre ];
                if ( pref.typeValor === 'Texto' ) {
                  return <div key={ i }>
                    <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                      <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
                      <input style={ STYLE_INPUT } type={ 'text' } onChange={ ( e ) => this.onChange( pref.nombre, e.target.value ) } value={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
                      <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
                    </div>
                  </div>;
                } else if ( pref.typeValor === 'Booleano' ) {
                  return <div key={ i }>
                    <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                      <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
                      <div style={ { display: 'flex' } }>
                        <input style={ { ...STYLE_INPUT, width: '2em', margin: '0' } } type={ 'checkbox' } onChange={ ( e ) => this.onChangeCheckbox( pref.nombre, e.target.checked ) } checked={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
                      </div>
                      <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
                    </div>
                  </div>;
                } else if ( pref.typeValor === 'Entero' ) {
                  return <div key={ i }>
                    <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                      <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
                      <input style={ STYLE_INPUT } type={ 'number' } onChange={ ( e ) => this.onChange( pref.nombre, e.target.value ) } value={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
                      <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
                    </div>
                  </div>;
                }

              } ) }
          </div>
        </div >
      </ div >
    );
  }



}
