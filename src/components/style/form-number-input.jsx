
import React, { Component, useContext, useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { KEYBOARD_BUTTON_CODE, MODE_DRAWING_LINE } from '../../constants';
import { convertMeasureToOriginal } from './../../utils/changeUnit';
import { Line } from '../../class/export';

import {
  getSelectedPrototypeElements,
  getLayerID,
  getCacheAngulo,
  getVerticeCoords,
  getLineVerticesID,
  getElementVertices,
  getElementAttributes,
  isMultipleSelection,
  getLayerValue,
} from '../../selectors/selectors';

import { toFixedFloat } from '../../utils/math';
import { GeometryUtils } from '../../utils/export';
import { Context } from '../../context/context';
import { usePrevProps } from '../../hooks/usePrevProps';


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

export default function FormNumberInput ( props ) {
  const {
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
  } = props;

  const context = useContext( Context );

  const [ isFocus, setIsFocus ] = useState( false );
  const [ showedValue, setShowedValue ] = useState( value );
  const [ isInputValud, setIsInputValid ] = useState( true );
  let inputElement = useRef( null );
  let cursor = useRef( null );


  //**------------------  REPLACE LIFECYCLE------------------------------- */

  //todo componentDidMount
  //todo TRY like this, if not, keep following these solutions
  // https://atomizedobjects.com/blog/react/using-componentdidmount-in-react-hooks/
  const prevProps = usePrevProps( props );

  const isCachedAnguloWhileDrawing = () => {
    return getCacheAngulo( props.stateRedux ) && props.stateRedux.get( 'mode' ) === MODE_DRAWING_LINE;
  };

  const isInputAnguloAndSingleSelection = () => {
    return props.attributeName === 'angulo' && !isMultipleSelection();
  };

  useEffect( () => {



    if ( isCachedAnguloWhileDrawing() && isInputAnguloAndSingleSelection() ) {
      console.log( 'test setting bc its angulo, single selection and its cached' );
      setShowedValue( () => parseFloat( getCacheAngulo( props.stateRedux ) ) );

      document.addEventListener( 'mousemove', resetAngleInput );
    }
  }, [] );

  const isSingleSelectionOrInvalidElement = () => {
    return !props.sourceElement || !isMultipleSelection( props.stateRedux );
  };

  const areArrayValuesDifferent = ( values ) => {
    return !values.every( el => el === values[ 0 ] );
  };

  const resetInputOnSelection = () => {
    if ( !isMultipleSelection( props.stateRedux ) ) {
      console.log( 'test reseting input on selection' );
      setShowedValue( () => props.value );
    }
  };
  const getSelectedPropertyValues = ( prototype ) => {
    let valuesArray = [];
    const elements = getSelectedPrototypeElements( props.stateRedux, prototype );

    if ( isAttribute() ) {
      for ( const { 1: element } of elements ) {

        const attribute = getAttribute( element );
        valuesArray.push( attribute );
      }

    } else {
      for ( const { 1: element } of elements ) {

        const property = getProperty( element );
        valuesArray.push( property );
      }
    }

    return valuesArray;
  };
  useEffect( () => {

    if ( isSingleSelectionOrInvalidElement() ) return;


    const prototype = props.sourceElement.get( 'prototype' );
    const values = getSelectedPropertyValues( prototype );

    if ( areArrayValuesDifferent( values ) ) {
      console.log( 'test setting showedvalue to null bc of multiselection and dif values' );
      setShowedValue( () => null );

      window.addEventListener( 'click', resetInputOnSelection );
    };
  }, [ prevProps ] );

  const isLengthInputWhileDrawing = () => {
    return props.attributeName === 'lineLength' && props.mode === MODE_DRAWING_LINE;
  };

  const isNullInputAndSingleSelection = () => {
    return showedValue === 'null' && !isMultipleSelection();
  };

  useEffect( () => {
    if ( isLengthInputWhileDrawing() ) {
      setIsFocus( true );
      inputElement.current.focus();
      inputElement.current.select();
    }

    if ( isCachedAnguloWhileDrawing() && isInputAnguloAndSingleSelection() ) {
      setShowedValue( parseFloat( getCacheAngulo( props.stateRedux ) ) );
      document.addEventListener( "mousemove", resetAngleInput );
    }

    if ( isSingleSelectionOrInvalidElement() ) return;

    const prototype = props.sourceElement.get( "prototype" );
    const values = getSelectedPropertyValues( prototype );

    if ( areArrayValuesDifferent( values ) ) {
      setShowedValue( null );
      window.addEventListener( "click", resetInputOnSelection );
    }
    return () => {
      setShowedValue( props.value );
      document.removeEventListener( "mousemove", resetAngleInput );
      window.removeEventListener( "click", resetInputOnSelection );
    };
  }, [] );

  useEffect( () => {
    if ( document.activeElement === inputElement.current ) {
      if (
        cursor.x !== props.stateRedux.getIn( [ "mouse", "x" ] ) ||
        cursor.y !== props.stateRedux.getIn( [ "mouse", "y" ] )
      ) {
        inputElement.current.select();
      }
    }

    cursor.x = props.stateRedux.getIn( [ "mouse", "x" ] );
    cursor.y = props.stateRedux.getIn( [ "mouse", "y" ] );
  }, [ props.stateRedux ] );

  useEffect( () => {
    if ( isDifferentPropsValue( props ) || isEmptyInputAndSingleSelection() ) {
      setShowedValue( props.value );
    }
  }, [ props ] );

  //**------------------  REPLACE LIFECYCLE------------------------------- */

  const STYLE_NUMERIC_INPUT = { ...STYLE_INPUT, ...style };
  const regexp = new RegExp( `^-?([0-9]+)?\\.?([0-9]{0,${ precision }})?$` );

  if ( isFocus ) {
    STYLE_NUMERIC_INPUT.border = `1px solid ${ SharedStyle.SECONDARY_COLOR.main }`;
  }

  if ( !isNaN( min ) && isFinite( min ) && showedValue < min ) {
    console.log( "test changing the value cause nan" );
    setShowedValue( () => min );
  };

  if ( !isNaN( max ) && isFinite( max ) && showedValue > max ) {
    console.log( "test changing the value cause nan" );
    setShowedValue( () => max );
  }

  const currValue = ( regexp.test( showedValue ) )
    ? showedValue
    : parseFloat( showedValue ).toFixed( precision );

  const isDifferentValue =
    ( parseFloat( props.value ).toFixed( precision ) ) !==
    parseFloat( showedValue ).toFixed( precision );

  const isAttribute = () => {
    return props.attributeName === 'angulo' || props.attributeName === 'lineLength';
  };

  const resetAngleInput = () => {
    if ( showedValue !== 0 ) {
      console.log( "test changing the value cause of angle reseted" );
      setShowedValue( () => props.value );
    }
  };

  const getProperty = ( element ) => {
    return element.getIn( [ 'properties', props.attributeName, 'length' ] );
  };

  const getAttribute = ( line ) => {
    if ( !line.vertices ) return;
    const layerID = getLayerID( props.stateRedux );
    const layer = props.stateRedux.getIn( [ 'scene', 'layers', layerID ] );

    const { v_a, v_b } = getElementVertices( line, layer );
    const { lineLength, angulo } = getElementAttributes( line, layer, v_a, v_b );

    if ( props.attributeName === 'lineLength' ) {
      return toFixedFloat( lineLength, 2 );
    }
    return angulo.angle;
  };

  const onKeyDown = ( e ) => {
    const keyCode = e.keyCode || e.which;

    if ( isSaveButtonPressed( keyCode ) ) {
      saveFn( e, keyCode );

    } else if ( isArrowPressedOnLength( keyCode ) ) {
      onArrrowPress( e, keyCode );

    } else if ( isEscPressedWhileDrawing( keyCode ) ) {
      props.projectActions.undo();
      context.linesActions.cacheFondo( '' );
      context.linesActions.cacheAlto( '' );
      context.linesActions.cacheAngulo( '' );

    } else if ( isEscPressed( keyCode ) ) {
      props.projectActions.unselectAll();
    }
  };

  const onInputChange = ( e ) => {
    const valid = regexp.test( e.nativeEvent.target.value );

    if ( valid ) {
      console.log( "test changing the value cause valid" );
      setShowedValue( () => e.nativeEvent.target.value );

      if ( onValid ) {
        onValid( e.nativeEvent );
      }

    } else if ( onInvalid ) {
      onInvalid( e.nativeEvent );
    }
    console.log( "test changing the valid state value" );
    setIsInputValid( () => true );
  };

  const cacheAttributes = () => {
    const inputAlto = document.querySelector( '.height' ).value;
    const inputFondo = document.querySelector( '.thickness' ).value;

    context.linesActions.cacheAlto( inputAlto );
    context.linesActions.cacheFondo( inputFondo );
  };

  const isElementLine = () => (
    props.sourceElement.get( 'prototype' ) === 'lines'
  );

  const saveFn = ( e, keyCode ) => {
    e.stopPropagation();
    console.log( "test saving the value on saveFn" );

    if ( isInputValud === false ) return;
    if ( showedValue === null ) return;

    let savedValue;

    savedValue = ( showedValue !== '' && showedValue !== '-' )
      ? parseFloat( showedValue )
      : 0;

    if ( isElementLine() ) {
      cacheAttributes();
    }

    onChange( {
      target: {
        isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER,
        value: ( attributeName === 'angulo' )
          ? savedValue
          : convertMeasureToOriginal( savedValue, props.unit )
      }
    } );
  };

  const onArrrowPress = ( e, keyCode ) => {
    e.preventDefault();

    const state = stateRedux;

    const layerID = getLayerID( state );
    const { vertice1ID, vertice2ID } = getLineVerticesID( sourceElement );

    if ( vertice1ID === vertice2ID ) return;

    let { x: x1, y: y1 } = getVerticeCoords( state, layerID, vertice1ID );
    let { x: x2, y: y2 } = getVerticeCoords( state, layerID, vertice2ID );
    if ( !x1 || !y1 || !x2 || !y2 ) return;

    const { modifiedX, modifiedY } = Line.modifyCoordsOnKeyDown( x1, x2, y1, y2, keyCode );

    context.verticesActions.dragVertex( modifiedX, modifiedY, layerID, vertice2ID );
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
    ( props.mode === MODE_DRAWING_LINE )
  );

  return (
    <div style={ { display: 'flex', flexDirection: 'row', width: '100%' } }>

      <input
        type='number'
        value={ currValue }
        placeholder={ placeholder }
        className={ attributeName }
        ref={ inputElement }
        style={ { ...STYLE_NUMERIC_INPUT, fontFamily: 'Calibri', fontWidth: 'lighter' } }
        onKeyDown={ onKeyDown }
        onChange={ onInputChange }
        onClick={ () => inputElement.current.select() }
        onFocus={ () => setIsFocus( true ) }
        onBlur={ () => setIsFocus( false ) }
      />
    </div >
  );
};


// export default class FormNumberInput extends Component {
//   constructor ( props, context ) {
//     super( props, context );

//     this.state = {
//       focus: false,
//       valid: true,
//       showedValue: props.value,
//       inputElement: null
//     };

//     this.cursor = {
//       x: props.stateRedux.getIn( [ 'mouse', 'x' ] ),
//       y: props.stateRedux.getIn( [ 'mouse', 'y' ] ),
//     };

//     this.isAttribute = this.isAttribute.bind( this );
//     this.getProperty = this.getProperty.bind( this );
//     this.getAttribute = this.getAttribute.bind( this );
//     this.resetAngleInput = this.resetAngleInput.bind( this );
//     this.isDifferentPropsValue = this.isDifferentPropsValue.bind( this );
//     this.resetInputOnSelection = this.resetInputOnSelection.bind( this );
//     this.areArrayValuesDifferent = this.areArrayValuesDifferent.bind( this );
//     this.getSelectedPropertyValues = this.getSelectedPropertyValues.bind( this );
//     this.isLengthInputWhileDrawing = this.isLengthInputWhileDrawing.bind( this );
//     this.isElementsOfSamePrototype = this.isElementsOfSamePrototype.bind( this );
//     this.isCachedAnguloWhileDrawing = this.isCachedAnguloWhileDrawing.bind( this );
//     this.isEmptyInputAndSingleSelection = this.isEmptyInputAndSingleSelection.bind( this );
//     this.isInputAnguloAndSingleSelection = this.isInputAnguloAndSingleSelection.bind( this );
//     this.isInputAnguloAndMultipleSelection = this.isInputAnguloAndMultipleSelection.bind( this );
//     this.isSingleSelectionOrInvalidElement = this.isSingleSelectionOrInvalidElement.bind( this );
//   }


//   isAttribute () {
//     return this.props.attributeName === 'angulo' || this.props.attributeName === 'lineLength';
//   }

//   isLengthInputWhileDrawing () {
//     return this.props.attributeName === 'lineLength' && this.props.mode === MODE_DRAWING_LINE;
//   }

//   isDifferentPropsValue ( nextProps ) {
//     return this.props.value !== nextProps.value;
//   }

//   isCachedAnguloWhileDrawing () {
//     return getCacheAngulo( this.props.stateRedux ) && this.props.stateRedux.get( 'mode' ) === MODE_DRAWING_LINE;
//   }

//   isInputAnguloAndSingleSelection () {
//     return this.props.attributeName === 'angulo' && !isMultipleSelection();
//   }

//   isInputAnguloAndMultipleSelection () {
//     return this.props.attributeName === 'angulo' && isMultipleSelection();
//   }

//   isElementsOfSamePrototype ( element ) {
//     if ( this.props.sourceElement ) {
//       return element[ 0 ] === this.props.sourceElement.get( 'prototype' );
//     }
//   }

//   isSingleSelectionOrInvalidElement () {
//     return !this.props.sourceElement || !isMultipleSelection( this.props.stateRedux );
//   }

//   isEmptyInputAndSingleSelection () {
//     return this.state.showedValue === 'null' && !this.state.isMultiSelection;
//   }

//   areArrayValuesDifferent ( values ) {
//     return !values.every( el => el === values[ 0 ] );
//   }

//   resetAngleInput () {
//     if ( this.state.showedValue !== 0 )
//       this.setState( { showedValue: this.props.value } );
//   }

//   getProperty ( element ) {
//     return element.getIn( [ 'properties', this.props.attributeName, 'length' ] );
//   }

//   getAttribute ( line ) {
//     if ( !line.vertices ) return;
//     const layerID = getLayerID( this.props.stateRedux );
//     const layer = this.props.stateRedux.getIn( [ 'scene', 'layers', layerID ] );

//     const { v_a, v_b } = getElementVertices( line, layer );
//     const { lineLength, angulo } = getElementAttributes( line, layer, v_a, v_b );

//     if ( this.props.attributeName === 'lineLength' ) {
//       return toFixedFloat( lineLength, 2 );
//     }
//     return angulo.angle;
//   }

//   getSelectedPropertyValues ( prototype ) {
//     let valuesArray = [];
//     const elements = getSelectedPrototypeElements( this.props.stateRedux, prototype );

//     if ( this.isAttribute() ) {
//       for ( const { 1: element } of elements ) {

//         const attribute = this.getAttribute( element );
//         valuesArray.push( attribute );
//       }

//     } else {
//       for ( const { 1: element } of elements ) {

//         const property = this.getProperty( element );
//         valuesArray.push( property );
//       }
//     }

//     return valuesArray;
//   }

//   componentDidMount () {
//     if ( this.isLengthInputWhileDrawing() ) {
//       this.setState( { focus: true } );
//       this.state.inputElement.focus();
//       this.state.inputElement.select();
//     }

//     if ( this.isCachedAnguloWhileDrawing() && this.isInputAnguloAndSingleSelection() ) {
//       this.setState( { showedValue: parseFloat( getCacheAngulo( this.props.stateRedux ) ) } );
//       document.addEventListener( 'mousemove', this.resetAngleInput );
//     }

//     if ( this.isSingleSelectionOrInvalidElement() ) return;

//     const prototype = this.props.sourceElement.get( 'prototype' );
//     const values = this.getSelectedPropertyValues( prototype );

//     if ( this.areArrayValuesDifferent( values ) ) {
//       this.setState( { showedValue: null } );
//       window.addEventListener( 'click', this.resetInputOnSelection );
//     };
//   }

//   resetInputOnSelection () {
//     if ( !isMultipleSelection( this.props.stateRedux ) ) {
//       this.setState( { showedValue: this.props.value } );
//     }
//   }

//   componentWillUnmount () {
//     this.setState( { showedValue: this.props.value } );
//     document.removeEventListener( 'mousemove', this.resetAngleInput );
//     window.removeEventListener( 'click', this.resetInputOnSelection );
//   };

//   componentDidUpdate () {
//     console.log( 'test', document.activeElement );
//     console.log( 'test', this.state.inputElement );
//     if ( document.activeElement === this.state.inputElement ) {
//       if ( this.cursor.x !== this.props.stateRedux.getIn( [ 'mouse', 'x' ] )
//         || this.cursor.y !== this.props.stateRedux.getIn( [ 'mouse', 'y' ] ) ) {
//         console.log( 'test selecting' );
//         this.state.inputElement.select();
//       }
//     }

//     this.cursor = {
//       x: this.props.stateRedux.getIn( [ 'mouse', 'x' ] ),
//       y: this.props.stateRedux.getIn( [ 'mouse', 'y' ] ),
//     };
//   }

//   UNSAFE_componentWillReceiveProps ( nextProps ) {
//     if ( this.isDifferentPropsValue( nextProps ) || this.isEmptyInputAndSingleSelection() ) {
//       this.setState( { showedValue: nextProps.value } );
//     }
//   }


//   render () {
//     const {
//       value,
//       min,
//       max,
//       style,
//       onValid,
//       onChange,
//       onInvalid,
//       precision,
//       stateRedux,
//       placeholder,
//       attributeName,
//       sourceElement,
//     } = this.props;

//     const numericInputStyle = { ...STYLE_INPUT, ...style };
//     const regexp = new RegExp( `^-?([0-9]+)?\\.?([0-9]{0,${ precision }})?$` );

//     if ( this.state.focus ) {
//       numericInputStyle.border = `1px solid ${ SharedStyle.SECONDARY_COLOR.main }`;
//     }

//     if ( !isNaN( min ) && isFinite( min ) && this.state.showedValue < min ) {
//       this.setState( { showedValue: min } );
//     };

//     if ( !isNaN( max ) && isFinite( max ) && this.state.showedValue > max ) {
//       this.setState( { showedValue: max } );
//     }

//     const currValue = ( regexp.test( this.state.showedValue ) )
//       ? this.state.showedValue
//       : parseFloat( this.state.showedValue ).toFixed( precision );

//     const isDifferentValue =
//       ( parseFloat( this.props.value ).toFixed( precision ) ) !==
//       parseFloat( this.state.showedValue ).toFixed( precision );


//     const onKeyDown = ( e ) => {
//       const keyCode = e.keyCode || e.which;

//       if ( isSaveButtonPressed( keyCode ) ) {
//         saveFn( e, keyCode );

//       } else if ( isArrowPressedOnLength( keyCode ) ) {
//         onArrrowPress( e, keyCode );

//       } else if ( isEscPressedWhileDrawing( keyCode ) ) {
//         this.props.projectActions.undo();
//         this.context.linesActions.cacheFondo( '' );
//         this.context.linesActions.cacheAlto( '' );
//         this.context.linesActions.cacheAngulo( '' );

//       } else if ( isEscPressed( keyCode ) ) {
//         this.props.projectActions.unselectAll();
//       }
//     };

//     const onInputChange = ( e ) => {
//       const valid = regexp.test( e.nativeEvent.target.value );

//       if ( valid ) {
//         this.setState( { showedValue: e.nativeEvent.target.value } );

//         if ( onValid ) {
//           onValid( e.nativeEvent );
//         }

//       } else if ( onInvalid ) {
//         onInvalid( e.nativeEvent );
//       }

//       this.setState( { valid } );
//     };

//     const cacheAttributes = () => {
//       const inputAlto = document.querySelector( '.height' ).value;
//       const inputFondo = document.querySelector( '.thickness' ).value;

//       this.context.linesActions.cacheAlto( inputAlto );
//       this.context.linesActions.cacheFondo( inputFondo );
//     };

//     const isElementLine = () => (
//       this.props.sourceElement.get( 'prototype' ) === 'lines'
//     );

//     const saveFn = ( e, keyCode ) => {
//       e.stopPropagation();
//       if ( this.state.valid === false ) return;
//       if ( this.state.showedValue === null ) return;

//       let savedValue;

//       savedValue =
//         ( this.state.showedValue !== '' && this.state.showedValue !== '-' )
//           ? parseFloat( this.state.showedValue )
//           : 0;

//       if ( isElementLine() ) {
//         cacheAttributes();
//       }

//       onChange( {
//         target: {
//           isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER,
//           value: ( attributeName === 'angulo' )
//             ? savedValue
//             : convertMeasureToOriginal( savedValue, this.props.unit )
//         }
//       } );
//     };

//     const onArrrowPress = ( e, keyCode ) => {
//       e.preventDefault();

//       const state = stateRedux;

//       const layerID = getLayerID( state );
//       const { vertice1ID, vertice2ID } = getLineVerticesID( sourceElement );

//       if ( vertice1ID === vertice2ID ) return;

//       let { x: x1, y: y1 } = getVerticeCoords( state, layerID, vertice1ID );
//       let { x: x2, y: y2 } = getVerticeCoords( state, layerID, vertice2ID );
//       if ( !x1 || !y1 || !x2 || !y2 ) return;

//       const { modifiedX, modifiedY } = Line.modifyCoordsOnKeyDown( x1, x2, y1, y2, keyCode );

//       this.context.verticesActions.dragVertex( modifiedX, modifiedY, layerID, vertice2ID );

//       /** DEBUG **/

//       const layer = getLayerValue( state );
//       let v2First = sourceElement.v2First;
//       let v_a = layer.vertices.get( sourceElement.vertices.get( !v2First ? 0 : 1 ) );
//       let v_b = layer.vertices.get( sourceElement.vertices.get( 1 ) );

//       let distance = GeometryUtils.pointsDistance( v_a.x, v_a.y, v_b.x, v_b.y );

//     };

//     const isEscPressed = ( keyCode ) => (
//       keyCode == KEYBOARD_BUTTON_CODE.ESC
//     );

//     const isSaveButtonPressed = ( keyCode ) => (
//       ( keyCode == KEYBOARD_BUTTON_CODE.ENTER ) ||
//       ( keyCode == KEYBOARD_BUTTON_CODE.TAB && isDifferentValue )
//     );

//     const isArrowPressedOnLength = ( keyCode ) => (
//       ( attributeName === 'lineLength' ) &&
//       ( KEYBOARD_BUTTON_CODE.ARROW_KEYS.includes( keyCode ) )
//     );

//     const isEscPressedWhileDrawing = ( keyCode ) => (
//       ( keyCode == KEYBOARD_BUTTON_CODE.ESC ) &&
//       ( this.props.mode === MODE_DRAWING_LINE )
//     );

//     return (
//       <div style={ { display: 'flex', flexDirection: 'row', width: '100%' } }>

//         <input
//           type='number'
//           value={ currValue }
//           placeholder={ placeholder }
//           className={ attributeName }
//           ref={ c => ( this.state.inputElement = c ) }
//           style={ { ...numericInputStyle, fontFamily: 'Calibri', fontWidth: 'lighter' } }
//           onKeyDown={ onKeyDown }
//           onChange={ onInputChange }
//           onClick={ () => this.state.inputElement.select() }
//           onFocus={ () => this.setState( { focus: true } ) }
//           onBlur={ () => this.setState( { focus: false } ) }
//         />

//       </div >
//     );
//   };
// }


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

FormNumberInput.contextType = Context;

// FormNumberInput.contextTypes = {
//   catalog: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   verticesActions: PropTypes.object.isRequired,
//   projectActions: PropTypes.object.isRequired
// };

FormNumberInput.defaultProps = {
  value: 500,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};
