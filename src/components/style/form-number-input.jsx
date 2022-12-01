import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { KEYBOARD_BUTTON_CODE, MODE_DRAWING_LINE } from '../../constants';
import { convertMeasureToOriginal } from './../../utils/changeUnit';
import { getCacheAngulo, getLayerID, getLineVerticesID, getVerticeCoords } from '../../selectors/selectors';
import { Line } from '../../class/export';


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
  }

  componentDidMount () {
    if (
      ( this.props.attributeName === 'lineLength' ) &&
      ( this.props.mode === MODE_DRAWING_LINE ) ) {
      this.setState( { focus: true } );
      this.state.inputElement.focus();
      this.state.inputElement.select();
    }

    if ( this.props.attributeName === 'angulo' ) {
      this.setState(
        {
          showedValue: getCacheAngulo( this.props.stateRedux ) ||
            this.props.value
        } );
    }
  }

  componentDidUpdate () {
    if ( document.activeElement === this.state.inputElement ) {
      if ( this.cursor.x !== this.props.stateRedux.getIn( [ 'mouse', 'x' ] )
        || this.cursor.y !== this.props.stateRedux.getIn( [ 'mouse', 'y' ] ) ) {
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

  render () {

    let {
      value,
      min,
      max,
      style,
      onValid,
      precision,
      onChange,
      onInvalid,
      placeholder,
      attributeName,
      sourceElement
    } = this.props;

    let numericInputStyle = { ...STYLE_INPUT, ...style };
    let regexp = new RegExp( `^-?([0-9]+)?\\.?([0-9]{0,${ precision }})?$` );

    if ( this.state.focus ) {
      numericInputStyle.border = `1px solid ${ SharedStyle.SECONDARY_COLOR.main }`;
    }

    if ( !isNaN( min ) && isFinite( min ) && this.state.showedValue < min ) {
      this.setState( { showedValue: min } );
    };

    if ( !isNaN( max ) && isFinite( max ) && this.state.showedValue > max ) {
      this.setState( { showedValue: max } );
    }

    let currValue = ( regexp.test( this.state.showedValue ) )
      ? this.state.showedValue
      : parseFloat( this.state.showedValue ).toFixed( precision );

    let isDifferentValue =
      ( parseFloat( this.props.value ).toFixed( precision ) ) !==
      parseFloat( this.state.showedValue ).toFixed( precision );

    const saveFn = ( e ) => {
      e.stopPropagation();
      if ( this.state.valid ) {
        let savedValue = (
          this.state.showedValue !== '' &&
          this.state.showedValue !== '-' )
          ? parseFloat( this.state.showedValue )
          : 0;

        const cachedAlto = document.querySelector( '.height' ).value;
        const cachedAngulo = document.querySelector( '.angulo' ).value;
        const cachedFondo = document.querySelector( '.thickness' ).value;

        this.context.linesActions.cacheAlto( cachedAlto );
        this.context.linesActions.cacheFondo( cachedFondo );
        this.context.linesActions.cacheAngulo( cachedAngulo );

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

    const isEscPressed = ( keyCode ) => (
      keyCode == KEYBOARD_BUTTON_CODE.ESC
    );

    const isSaveButtonPressed = ( keyCode ) => (
      ( keyCode == KEYBOARD_BUTTON_CODE.ENTER ) ||
      ( keyCode == KEYBOARD_BUTTON_CODE.TAB && isDifferentValue )
    );

    const isArrowPressedOnLength = ( keyCode ) => (
      ( attributeName === 'lineLength' ) &&
      ( KEYBOARD_BUTTON_CODE.ARROW_KEYS.includes( keyCode ) )
    );

    const isEscPressedWhileDrawing = ( keyCode ) => (
      ( keyCode == KEYBOARD_BUTTON_CODE.ESC ) &&
      ( this.props.mode === MODE_DRAWING_LINE )
    );

    return (
      <div style={ { display: 'flex', flexDirection: 'row', width: '100%' } }>

        <input
          ref={ c => ( this.state.inputElement = c ) }
          placeholder={ placeholder }
          className={ attributeName }
          type='number'
          value={ currValue }
          style={ { ...numericInputStyle, fontFamily: 'Calibri', fontWidth: 'lighter' } }
          onClick={ () => this.state.inputElement.select() }
          onFocus={ () => this.setState( { focus: true } ) }
          onBlur={ () => this.setState( { focus: false } ) }
          onChange={ e => {
            let valid = regexp.test( e.nativeEvent.target.value );
            if ( valid ) {
              this.setState( { showedValue: e.nativeEvent.target.value } );
              if ( onValid ) onValid( e.nativeEvent );
            }
            else {
              if ( onInvalid ) onInvalid( e.nativeEvent );
            }
            this.setState( { valid } );
          } }
          onKeyDown={ e => {

            let keyCode = e.keyCode || e.which;
            const state = this.props.stateRedux;

            if ( isSaveButtonPressed( keyCode ) ) {
              saveFn( e );

            } else if ( isArrowPressedOnLength( keyCode ) ) {
              e.preventDefault();

              const layerID = getLayerID( state );
              const { vertice1ID, vertice2ID } = getLineVerticesID( sourceElement );

              let { x: x1, y: y1 } = getVerticeCoords( state, layerID, vertice1ID );
              let { x: x2, y: y2 } = getVerticeCoords( state, layerID, vertice2ID );
              const { modifiedX, modifiedY } = Line.modifyCoordsOnKeyDown( x1, x2, y1, y2, value, keyCode );

              return this.context.verticesActions.dragVertex( modifiedX, modifiedY, layerID, vertice2ID );

            } else if ( isEscPressedWhileDrawing( keyCode ) ) {
              this.props.projectActions.undo();

            } else if ( isEscPressed( keyCode ) ) {

              this.props.projectActions.unselectAll();
            }
          } }
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
  linesActions: PropTypes.object.isRequired,
  verticesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};
