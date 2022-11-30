import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { MdUpdate } from 'react-icons/md';
import { KEYBOARD_BUTTON_CODE, MODE_DRAWING_LINE } from '../../constants';

import { convertMeasureToOriginal } from './../../utils/changeUnit';
import { getCacheAlto, getCacheAngulo, getCacheFondo } from '../../selectors/selectors';

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
  width: '100%',
};

export default class FormNumberInput extends Component {
  constructor ( props, context ) {
    super( props, context );
    this.state = {
      focus: false,
      valid: true,
      showedValue: props.value,
      inputElement: null,
    };
    this.cursor = {
      x: props.stateRedux.getIn( [ 'mouse', 'x' ] ),
      y: props.stateRedux.getIn( [ 'mouse', 'y' ] ),
    };

    // Mirar que sea una propiedad de las paredes
    /*console.log('props.stateRedux', props.stateRedux.getIn(['scene', 'layers', 'layer-1']))*/

  }


  componentDidMount () {
    if ( ( this.props.attributeName === 'lineLength' ) && ( this.props.mode === MODE_DRAWING_LINE ) ) {
      this.setState( { focus: true } );
      this.state.inputElement.focus();
      this.state.inputElement.select();
    }

    // Prevent arrow keys default actions when on line length input
    if ( this.props.attributeName === 'lineLength' ) {
      const input = document.querySelector( '.lineLength' );
      input.addEventListener( 'keydown', this.preventArrowKeysAction );
    }

    if ( this.props.attributeName === 'angulo' ) {
      this.setState( { showedValue: getCacheAngulo( this.props.stateRedux ) || this.props.value } );
    }
  }

  componentDidUpdate () {
    if ( document.activeElement === this.state.inputElement ) {
      if ( this.cursor.x !== this.props.stateRedux.getIn( [ 'mouse', 'x' ] ) || this.cursor.y !== this.props.stateRedux.getIn( [ 'mouse', 'y' ] ) ) {
        this.state.inputElement.select();
      }
    }
    this.cursor = {
      x: this.props.stateRedux.getIn( [ 'mouse', 'x' ] ),
      y: this.props.stateRedux.getIn( [ 'mouse', 'y' ] ),
    };
  }

  componentWillReceiveProps ( nextProps ) {
    if ( this.props.value !== nextProps.value ) {
      this.setState( { showedValue: nextProps.value } );
    }
  }

  componentWillUnmount () {
    const input = document.querySelector( '.lineLength' );
    input.removeEventListener( 'keydown', this.preventArrowKeysAction );
  }

  preventArrowKeysAction ( e ) {
    const keys = [ 37, 38, 39, 40 ];
    if ( keys.includes( e.keyCode ) ) e.preventDefault();
  }


  render () {

    let { value, min, max, precision, onChange, onValid, onInvalid, style, placeholder, attributeName, mode, projectActions, unit } = this.props;
    let numericInputStyle = { ...STYLE_INPUT, ...style };
    if ( this.state.focus ) numericInputStyle.border = `1px solid ${ SharedStyle.SECONDARY_COLOR.main }`;

    let regexp = new RegExp( `^-?([0-9]+)?\\.?([0-9]{0,${ precision }})?$` );

    if ( !isNaN( min ) && isFinite( min ) && this.state.showedValue < min ) this.setState( { showedValue: min } ); // value = min;
    if ( !isNaN( max ) && isFinite( max ) && this.state.showedValue > max ) this.setState( { showedValue: max } ); // value = max;

    let currValue = regexp.test( this.state.showedValue ) ? this.state.showedValue : parseFloat( this.state.showedValue ).toFixed( precision );
    let different = parseFloat( this.props.value ).toFixed( precision ) !== parseFloat( this.state.showedValue ).toFixed( precision );

    let saveFn = ( e ) => {
      e.stopPropagation();
      if ( this.state.valid ) {
        let savedValue = (
          this.state.showedValue !== '' &&
          this.state.showedValue !== '-' )
          ? parseFloat( this.state.showedValue )
          : 0;

        const cachedAngulo = document.querySelector( '.angulo' ).value;
        const cachedFondo = document.querySelector( '.thickness' ).value;
        const cachedAlto = document.querySelector( '.height' ).value;
        this.context.linesActions.cacheAngulo( cachedAngulo );
        this.context.linesActions.cacheFondo( cachedFondo );
        this.context.linesActions.cacheAlto( cachedAlto );

        switch ( attributeName ) {
          case 'angulo':
            this.setState( { showedValue: getCacheAngulo( this.props.stateRedux ) } );
            break;
          case 'thickness':
            this.setState( { showedValue: savedValue } );
            break;
          case 'height':
            this.setState( { showedValue: savedValue } );
            break;
        }

        let keyCode = e.keyCode || e.which;
        if ( attributeName === 'angulo' ) {
          onChange( { target: { value: savedValue, isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER } } );
          this.setState( { showedValue: getCacheAngulo( this.props.stateRedux ) } );
        } else {
          onChange( { target: { value: convertMeasureToOriginal( savedValue, this.props.unit ), isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER } } );
        }
      }
    };

    return (
      <div style={ { display: 'flex', flexDirection: 'row', width: '100%' } }>

        <input
          ref={ c => ( this.state.inputElement = c ) }
          className={ attributeName }
          type='number'
          value={ currValue }
          style={ { ...numericInputStyle, fontFamily: 'Calibri', fontWidth: 'lighter' } }
          onClick={ () => this.state.inputElement.select() }
          onChange={ ( evt ) => {
            let valid = regexp.test( evt.nativeEvent.target.value );
            if ( valid ) {
              this.setState( { showedValue: evt.nativeEvent.target.value } );
              if ( onValid ) onValid( evt.nativeEvent );
            }
            else {
              if ( onInvalid ) onInvalid( evt.nativeEvent );
            }

            this.setState( { valid } );
          } }
          onFocus={ e => this.setState( { focus: true } ) }
          onBlur={ e => this.setState( { focus: false } ) }
          onKeyDown={ e => {
            var keyCode = e.keyCode || e.which;
            if ( keyCode == KEYBOARD_BUTTON_CODE.ENTER || ( keyCode == KEYBOARD_BUTTON_CODE.TAB && different ) ) {
              saveFn( e );

            } else if ( ( keyCode == KEYBOARD_BUTTON_CODE.ESC ) && ( this.props.mode === MODE_DRAWING_LINE ) ) {

              this.props.projectActions.undo();
            } else if ( keyCode == KEYBOARD_BUTTON_CODE.ESC ) {
              this.props.projectActions.unselectAll();
            }
          } }
          placeholder={ placeholder }
        />
      </div>
    );
  }
}

FormNumberInput.propTypes = {
  value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  precision: PropTypes.number,
  placeholder: PropTypes.string
};

FormNumberInput.contextTypes = {
  translator: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};
