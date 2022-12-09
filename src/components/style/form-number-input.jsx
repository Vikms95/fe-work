import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { KEYBOARD_BUTTON_CODE, MODE_DRAWING_LINE } from '../../constants';
import { convertMeasureToOriginal } from './../../utils/changeUnit';
import { Line } from '../../class/export';

import {
  getLines,
  getLayerID,
  getCacheAngulo,
  getVerticeCoords,
  getLineVerticesID,
  getSelectedElementsToJS,
  getElementVertices,
  getElementAttributes,
  isMultipleSelection
} from '../../selectors/selectors';
import { toFixedFloat } from '../../utils/math';


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
    this.isAttribute = this.isAttribute.bind( this );
    this.isProperty = this.isProperty.bind( this );
    this.getProperty = this.getProperty.bind( this );
    this.getAttribute = this.getAttribute.bind( this );
    this.areAllValuesEqual = this.areAllValuesEqual.bind( this );
    this.resetAngleInput = this.resetAngleInput.bind( this );
    this.isLengthInputWhileDrawing = this.isLengthInputWhileDrawing.bind( this );
    this.isElementsOfSamePrototype = this.isElementsOfSamePrototype.bind( this );
    this.isNotMultipleSelectionOrInvalidElement = this.isNotMultipleSelectionOrInvalidElement.bind( this );

  }

  resetAngleInput () {
    // Use a variable determining if the value is in multiselection reset
    if ( this.state.showedValue !== 0 )
      this.setState( { showedValue: this.props.value } );
  }

  isLengthInputWhileDrawing () {
    return this.props.attributeName === 'lineLength' && this.props.mode === MODE_DRAWING_LINE;
  }

  isElementsOfSamePrototype ( element ) {
    if ( this.props.sourceElement ) {
      return element[ 0 ] === this.props.sourceElement.get( 'prototype' );
    }
  }

  isAttribute () {
    return this.props.attributeName === 'angulo' || this.props.attributeName === 'lineLength';
  }

  isProperty () {
    return this.props.attributeName === 'thickness' || this.props.attributeName === 'height';
  }

  isNotMultipleSelectionOrInvalidElement () {
    return !this.props.sourceElement || !isMultipleSelection( this.props.stateRedux );
  }

  getProperty ( elementID, elements ) {
    const element = elements.get( elementID );
    if ( !element ) return;
    return element.getIn( [ 'properties', this.props.attributeName, 'length' ] );
  }

  getAttribute ( elementID, elements ) {
    const layerID = getLayerID( this.props.stateRedux );
    const layer = this.props.stateRedux.getIn( [ 'scene', 'layers', layerID ] );
    const line = elements.get( elementID );
    const { v_a, v_b } = getElementVertices( line, layer );
    const { lineLength, angulo } = getElementAttributes( line, layer, v_a, v_b );

    if ( this.props.attributeName === 'lineLength' ) {
      return toFixedFloat( lineLength, 2 );
    }
    return angulo.angle;
  }

  areAllValuesEqual ( values ) {
    return !values.every( el => el === values[ 0 ] );
  }

  componentDidMount () {
    if ( this.isLengthInputWhileDrawing() ) {
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

    // Only on multiselection, add conditonal?
    if ( this.isNotMultipleSelectionOrInvalidElement() ) return;

    let values = [];
    const selectedElements = getSelectedElementsToJS( this.props.stateRedux );
    const lines = getLines( this.props.stateRedux );

    const prototypeElementsContainer = selectedElements
      .filter( element => this.isElementsOfSamePrototype( element ) );

    const elementsID = prototypeElementsContainer[ 0 ][ 1 ];

    if ( this.isProperty() ) {
      for ( const elementID of elementsID ) {
        const property = this.getProperty( elementID, lines );
        values.push( property );
      }

    } else if ( this.isAttribute() ) {
      for ( const elementID of elementsID ) {
        const attribute = this.getAttribute( elementID, lines );
        values.push( attribute );
      }
    }
    if ( this.areAllValuesEqual( values ) ) {
      this.setState( { showedValue: '' } );
    };
  }

  componentWillUnmount () {
    document.removeEventListener( 'mousemove', this.resetAngleInput );
  };

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
      onChange,
      onInvalid,
      precision,
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
