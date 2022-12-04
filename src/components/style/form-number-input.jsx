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
    this.resetAngleInput = this.resetAngleInput.bind( this );
  }

  resetAngleInput () {
    this.setState( { showedValue: props.value } );
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
      if ( getCacheAngulo( this.props.stateRedux ) ) {
        this.setState( { showedValue: parseFloat( getCacheAngulo( this.props.stateRedux ) ) } );
        document.addEventListener( 'mousemove', this.resetAngleInput );
      }
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

  componentWillUnmount () {
    document.removeEventListener( 'mousemove', this.resetAngleInput );
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
      stateRedux,
      placeholder,
      attributeName,
      sourceElement,

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


    const onKeyDown = ( e ) => {
      const keyCode = e.keyCode || e.which;

      if ( isSaveButtonPressed( keyCode ) ) {
        saveFn( e, keyCode );

      } else if ( isArrowPressedOnLength( keyCode ) ) {
        onArrrowPress( e, keyCode );

      } else if ( isEscPressedWhileDrawing( keyCode ) ) {
        this.props.projectActions.undo();
        this.context.linesActions.cacheFondo( '' );
        this.context.linesActions.cacheAlto( '' );
        this.context.linesActions.cacheAngulo( '' );

      } else if ( isEscPressed( keyCode ) ) {
        this.props.projectActions.unselectAll();
      }
    };

    const onInputChange = ( e ) => {
      const valid = regexp.test( e.nativeEvent.target.value );
      if ( valid ) {
        this.setState( { showedValue: e.nativeEvent.target.value } );

        if ( onValid ) onValid( e.nativeEvent );
      }

      else {
        if ( onInvalid ) onInvalid( e.nativeEvent );

      }
      this.setState( { valid } );
    };

    const saveFn = ( e, keyCode ) => {
      e.stopPropagation();

      if ( this.state.valid ) {
        let savedValue = (
          this.state.showedValue !== '' &&
          this.state.showedValue !== '-' )
          ? parseFloat( this.state.showedValue )
          : 0;

        const inputAlto = document.querySelector( '.height' ).value;
        const inputFondo = document.querySelector( '.thickness' ).value;

        this.context.linesActions.cacheAlto( inputAlto );
        this.context.linesActions.cacheFondo( inputFondo );

        onChange( {
          target: {
            value: ( attributeName === 'angulo' )
              ? savedValue
              : convertMeasureToOriginal( savedValue, this.props.unit ),
            isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER
          }
        } );
      };
    };

    const onArrrowPress = ( e, keyCode ) => {
      e.preventDefault();
      const state = stateRedux;

      const layerID = getLayerID( state );
      const { vertice1ID, vertice2ID } = getLineVerticesID( sourceElement );

      if ( vertice1ID === vertice2ID ) return;

      let { x: x1, y: y1 } = getVerticeCoords( state, layerID, vertice1ID );
      let { x: x2, y: y2 } = getVerticeCoords( state, layerID, vertice2ID );
      const { modifiedX, modifiedY } = Line.modifyCoordsOnKeyDown( x1, x2, y1, y2, value, keyCode );

      if ( !modifiedX || !modifiedY ) return;

      this.context.verticesActions.dragVertex( modifiedX, modifiedY, layerID, vertice2ID );
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
          type='number'
          value={ currValue }
          placeholder={ placeholder }
          className={ attributeName }
          ref={ c => ( this.state.inputElement = c ) }
          style={ { ...numericInputStyle, fontFamily: 'Calibri', fontWidth: 'lighter' } }
          onKeyDown={ onKeyDown }
          onChange={ onInputChange }
          onClick={ () => this.state.inputElement.select() }
          onFocus={ () => this.setState( { focus: true } ) }
          onBlur={ () => this.setState( { focus: false } ) }
        />

      </div >
    );
  };
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
