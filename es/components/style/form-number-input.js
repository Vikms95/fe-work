var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, useContext, useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { KEYBOARD_BUTTON_CODE, MODE_DRAWING_LINE } from '../../constants';
import { convertMeasureToOriginal } from './../../utils/changeUnit';
import { Line } from '../../class/export';

import { getSelectedPrototypeElements, getLayerID, getCacheAngulo, getVerticeCoords, getLineVerticesID, getElementVertices, getElementAttributes, isMultipleSelection, getLayerValue } from '../../selectors/selectors';

import { toFixedFloat } from '../../utils/math';
import { GeometryUtils } from '../../utils/export';
import { Context } from '../../context/context';
import { usePrevProps } from '../../hooks/usePrevProps';

var STYLE_INPUT = {
  display: 'block',
  height: '1.8em',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.COLORS.grey,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid ' + SharedStyle.PRIMARY_COLOR.master,
  outline: 'none',
  textAlign: 'right',
  width: '100%'
};

// export default function FormNumberInput ( props ) {
//   const {
//     value,
//     min,
//     max,
//     style,
//     onValid,
//     onChange,
//     onInvalid,
//     precision,
//     stateRedux,
//     placeholder,
//     attributeName,
//     sourceElement,
//   } = props;

//   const context = useContext( Context );

//   const [ isFocus, setIsFocus ] = useState( false );
//   const [ showedValue, setShowedValue ] = useState( value );
//   const [ isInputValud, setIsInputValid ] = useState( true );

//   let inputElement = useRef( null );
//   let cursor = useRef( null );


//   //**------------------  REPLACE LIFECYCLE------------------------------- */

//   //todo componentDidMount
//   //todo TRY like this, if not, keep following these solutions
//   // https://atomizedobjects.com/blog/react/using-componentdidmount-in-react-hooks/
//   const prevProps = usePrevProps( props );

//   useEffect( () => {

//     const isCachedAnguloWhileDrawing = () => {
//       return getCacheAngulo( props.stateRedux ) && props.stateRedux.get( 'mode' ) === MODE_DRAWING_LINE;
//     };

//     const isInputAnguloAndSingleSelection = () => {
//       return props.attributeName === 'angulo' && !isMultipleSelection();
//     };


//     if ( isCachedAnguloWhileDrawing() && isInputAnguloAndSingleSelection() ) {
//       console.log( 'test setting bc its angulo, single selection and its cached' );
//       setShowedValue( () => parseFloat( getCacheAngulo( props.stateRedux ) ) );

//       document.addEventListener( 'mousemove', resetAngleInput );
//     }
//   }, [] );

//   useEffect( () => {
//     const isSingleSelectionOrInvalidElement = () => {
//       return !props.sourceElement || !isMultipleSelection( props.stateRedux );
//     };

//     const areArrayValuesDifferent = ( values ) => {
//       return !values.every( el => el === values[ 0 ] );
//     };

//     const resetInputOnSelection = () => {
//       if ( !isMultipleSelection( props.stateRedux ) ) {
//         console.log( 'test reseting input on selection' );
//         setShowedValue( () => props.value );
//       }
//     };

//     if ( isSingleSelectionOrInvalidElement() ) return;

//     const getSelectedPropertyValues = ( prototype ) => {
//       let valuesArray = [];
//       const elements = getSelectedPrototypeElements( props.stateRedux, prototype );

//       if ( isAttribute() ) {
//         for ( const { 1: element } of elements ) {

//           const attribute = getAttribute( element );
//           valuesArray.push( attribute );
//         }

//       } else {
//         for ( const { 1: element } of elements ) {

//           const property = getProperty( element );
//           valuesArray.push( property );
//         }
//       }

//       return valuesArray;
//     };

//     const prototype = props.sourceElement.get( 'prototype' );
//     const values = getSelectedPropertyValues( prototype );

//     if ( areArrayValuesDifferent( values ) ) {
//       console.log( 'test setting showedvalue to null bc of multiselection and dif values' );
//       setShowedValue( () => null );

//       window.addEventListener( 'click', resetInputOnSelection );
//     };
//   }, [ prevProps ] );


//   useEffect( () => {
//     const isLengthInputWhileDrawing = () => {
//       return props.attributeName === 'lineLength' && props.mode === MODE_DRAWING_LINE;
//     };

//     if ( isLengthInputWhileDrawing() ) {
//       console.log( 'test setting focus to true' );
//       setIsFocus( true );
//       inputElement.current.focus();
//       inputElement.current.select();
//     }
//   } );

//   //todo TRY componentWillUnmount 
//   //todo TRY used to make sure that the value from props is the one similar to componentWillUnmount
//   useEffect( () => {
//     return () => {
//       console.log( 'test changing value cause of component unmounted' );
//       setShowedValue( () => props.value );
//     };
//   }, [ prevProps, props.value ] );


//   //todo componentDidUpdate
//   useEffect( () => {
//     console.log( 'selecting cursor current', cursor.current );
//     console.log( 'selecting is document same', document.activeElement === inputElement.current );
//     if ( cursor.current && props.attributeName === 'lineLength' ) {
//       console.log( 'selecting is x same', cursor.current.x !== stateRedux.getIn( [ 'mouse', 'x' ] ) );
//       console.log( 'selecting is y same', cursor.current.y !== stateRedux.getIn( [ 'mouse', 'y' ] ) );
//       if ( cursor.current.x !== stateRedux.getIn( [ 'mouse', 'x' ] ) ||
//         cursor.current.y !== stateRedux.getIn( [ 'mouse', 'y' ] ) ) {

//         console.log( "selecting while", showedValue );
//         inputElement.current.select();
//       }
//     }

//     cursor.current = {
//       x: props.stateRedux.getIn( [ 'mouse', 'x' ] ),
//       y: props.stateRedux.getIn( [ 'mouse', 'y' ] ),
//     };

//   } );


//   //todo componentWillReceiveProps
//   useEffect( () => {
//     const isNullInputAndSingleSelection = () => {
//       return showedValue === 'null' && !isMultipleSelection();
//     };

//     if ( isNullInputAndSingleSelection() ) {
//       console.log( "test changing the value cause of input null and single selection" );
//       setShowedValue( () => props.value );
//     }
//   }, [ props, showedValue, isMultipleSelection() ] );


//   //**------------------  REPLACE LIFECYCLE------------------------------- */

//   const STYLE_NUMERIC_INPUT = { ...STYLE_INPUT, ...style };
//   const regexp = new RegExp( `^-?([0-9]+)?\\.?([0-9]{0,${ precision }})?$` );

//   if ( isFocus ) {
//     STYLE_NUMERIC_INPUT.border = `1px solid ${ SharedStyle.SECONDARY_COLOR.main }`;
//   }

//   if ( !isNaN( min ) && isFinite( min ) && showedValue < min ) {
//     console.log( "test changing the value cause nan" );
//     setShowedValue( () => min );
//   };

//   if ( !isNaN( max ) && isFinite( max ) && showedValue > max ) {
//     console.log( "test changing the value cause nan" );
//     setShowedValue( () => max );
//   }

//   const currValue = ( regexp.test( showedValue ) )
//     ? showedValue
//     : parseFloat( showedValue ).toFixed( precision );

//   const isDifferentValue =
//     ( parseFloat( props.value ).toFixed( precision ) ) !==
//     parseFloat( showedValue ).toFixed( precision );

//   const isAttribute = () => {
//     return props.attributeName === 'angulo' || props.attributeName === 'lineLength';
//   };

//   const resetAngleInput = () => {
//     if ( showedValue !== 0 ) {
//       console.log( "test changing the value cause of angle reseted" );
//       setShowedValue( () => props.value );
//     }
//   };

//   const getProperty = ( element ) => {
//     return element.getIn( [ 'properties', props.attributeName, 'length' ] );
//   };

//   const getAttribute = ( line ) => {
//     if ( !line.vertices ) return;
//     const layerID = getLayerID( props.stateRedux );
//     const layer = props.stateRedux.getIn( [ 'scene', 'layers', layerID ] );

//     const { v_a, v_b } = getElementVertices( line, layer );
//     const { lineLength, angulo } = getElementAttributes( line, layer, v_a, v_b );

//     if ( props.attributeName === 'lineLength' ) {
//       return toFixedFloat( lineLength, 2 );
//     }
//     return angulo.angle;
//   };

//   const onKeyDown = ( e ) => {
//     const keyCode = e.keyCode || e.which;

//     if ( isSaveButtonPressed( keyCode ) ) {
//       saveFn( e, keyCode );

//     } else if ( isArrowPressedOnLength( keyCode ) ) {
//       onArrrowPress( e, keyCode );

//     } else if ( isEscPressedWhileDrawing( keyCode ) ) {
//       props.projectActions.undo();
//       context.linesActions.cacheFondo( '' );
//       context.linesActions.cacheAlto( '' );
//       context.linesActions.cacheAngulo( '' );

//     } else if ( isEscPressed( keyCode ) ) {
//       props.projectActions.unselectAll();
//     }
//   };

//   const onInputChange = ( e ) => {
//     const valid = regexp.test( e.nativeEvent.target.value );

//     if ( valid ) {
//       console.log( "test changing the value cause valid" );
//       setShowedValue( () => e.nativeEvent.target.value );

//       if ( onValid ) {
//         onValid( e.nativeEvent );
//       }

//     } else if ( onInvalid ) {
//       onInvalid( e.nativeEvent );
//     }
//     console.log( "test changing the valid state value" );
//     setIsInputValid( () => true );
//   };

//   const cacheAttributes = () => {
//     const inputAlto = document.querySelector( '.height' ).value;
//     const inputFondo = document.querySelector( '.thickness' ).value;

//     context.linesActions.cacheAlto( inputAlto );
//     context.linesActions.cacheFondo( inputFondo );
//   };

//   const isElementLine = () => (
//     props.sourceElement.get( 'prototype' ) === 'lines'
//   );

//   const saveFn = ( e, keyCode ) => {
//     e.stopPropagation();
//     console.log( "test saving the value on saveFn" );

//     if ( isInputValud === false ) return;
//     if ( showedValue === null ) return;

//     let savedValue;

//     savedValue = ( showedValue !== '' && showedValue !== '-' )
//       ? parseFloat( showedValue )
//       : 0;

//     if ( isElementLine() ) {
//       cacheAttributes();
//     }

//     onChange( {
//       target: {
//         isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER,
//         value: ( attributeName === 'angulo' )
//           ? savedValue
//           : convertMeasureToOriginal( savedValue, props.unit )
//       }
//     } );
//   };

//   const onArrrowPress = ( e, keyCode ) => {
//     e.preventDefault();

//     const state = stateRedux;

//     const layerID = getLayerID( state );
//     const { vertice1ID, vertice2ID } = getLineVerticesID( sourceElement );

//     if ( vertice1ID === vertice2ID ) return;

//     let { x: x1, y: y1 } = getVerticeCoords( state, layerID, vertice1ID );
//     let { x: x2, y: y2 } = getVerticeCoords( state, layerID, vertice2ID );
//     if ( !x1 || !y1 || !x2 || !y2 ) return;

//     const { modifiedX, modifiedY } = Line.modifyCoordsOnKeyDown( x1, x2, y1, y2, keyCode );

//     context.verticesActions.dragVertex( modifiedX, modifiedY, layerID, vertice2ID );
//   };

//   const isEscPressed = ( keyCode ) => (
//     keyCode == KEYBOARD_BUTTON_CODE.ESC
//   );

//   const isSaveButtonPressed = ( keyCode ) => (
//     ( keyCode == KEYBOARD_BUTTON_CODE.ENTER ) ||
//     ( keyCode == KEYBOARD_BUTTON_CODE.TAB && isDifferentValue )
//   );

//   const isArrowPressedOnLength = ( keyCode ) => (
//     ( attributeName === 'lineLength' ) &&
//     ( KEYBOARD_BUTTON_CODE.ARROW_KEYS.includes( keyCode ) )
//   );

//   const isEscPressedWhileDrawing = ( keyCode ) => (
//     ( keyCode == KEYBOARD_BUTTON_CODE.ESC ) &&
//     ( props.mode === MODE_DRAWING_LINE )
//   );

//   return (
//     <div style={ { display: 'flex', flexDirection: 'row', width: '100%' } }>

//       <input
//         type='number'
//         value={ currValue }
//         placeholder={ placeholder }
//         className={ attributeName }
//         ref={ inputElement }
//         style={ { ...STYLE_NUMERIC_INPUT, fontFamily: 'Calibri', fontWidth: 'lighter' } }
//         onKeyDown={ onKeyDown }
//         onChange={ onInputChange }
//         onClick={ () => inputElement.current.select() }
//         onFocus={ () => setIsFocus( true ) }
//         onBlur={ () => setIsFocus( false ) }
//       />
//     </div >
//   );
// };


var FormNumberInput = function (_Component) {
  _inherits(FormNumberInput, _Component);

  function FormNumberInput(props, context) {
    _classCallCheck(this, FormNumberInput);

    var _this = _possibleConstructorReturn(this, (FormNumberInput.__proto__ || Object.getPrototypeOf(FormNumberInput)).call(this, props, context));

    _this.state = {
      focus: false,
      valid: true,
      showedValue: props.value,
      inputElement: null
    };

    _this.cursor = {
      x: props.stateRedux.getIn(['mouse', 'x']),
      y: props.stateRedux.getIn(['mouse', 'y'])
    };

    _this.isAttribute = _this.isAttribute.bind(_this);
    _this.getProperty = _this.getProperty.bind(_this);
    _this.getAttribute = _this.getAttribute.bind(_this);
    _this.resetAngleInput = _this.resetAngleInput.bind(_this);
    _this.isDifferentPropsValue = _this.isDifferentPropsValue.bind(_this);
    _this.resetInputOnSelection = _this.resetInputOnSelection.bind(_this);
    _this.areArrayValuesDifferent = _this.areArrayValuesDifferent.bind(_this);
    _this.getSelectedPropertyValues = _this.getSelectedPropertyValues.bind(_this);
    _this.isLengthInputWhileDrawing = _this.isLengthInputWhileDrawing.bind(_this);
    _this.isElementsOfSamePrototype = _this.isElementsOfSamePrototype.bind(_this);
    _this.isCachedAnguloWhileDrawing = _this.isCachedAnguloWhileDrawing.bind(_this);
    _this.isEmptyInputAndSingleSelection = _this.isEmptyInputAndSingleSelection.bind(_this);
    _this.isInputAnguloAndSingleSelection = _this.isInputAnguloAndSingleSelection.bind(_this);
    _this.isInputAnguloAndMultipleSelection = _this.isInputAnguloAndMultipleSelection.bind(_this);
    _this.isSingleSelectionOrInvalidElement = _this.isSingleSelectionOrInvalidElement.bind(_this);
    return _this;
  }

  _createClass(FormNumberInput, [{
    key: 'isAttribute',
    value: function isAttribute() {
      return this.props.attributeName === 'angulo' || this.props.attributeName === 'lineLength';
    }
  }, {
    key: 'isLengthInputWhileDrawing',
    value: function isLengthInputWhileDrawing() {
      return this.props.attributeName === 'lineLength' && this.props.mode === MODE_DRAWING_LINE;
    }
  }, {
    key: 'isDifferentPropsValue',
    value: function isDifferentPropsValue(nextProps) {
      return this.props.value !== nextProps.value;
    }
  }, {
    key: 'isCachedAnguloWhileDrawing',
    value: function isCachedAnguloWhileDrawing() {
      return getCacheAngulo(this.props.stateRedux) && this.props.stateRedux.get('mode') === MODE_DRAWING_LINE;
    }
  }, {
    key: 'isInputAnguloAndSingleSelection',
    value: function isInputAnguloAndSingleSelection() {
      return this.props.attributeName === 'angulo' && !isMultipleSelection();
    }
  }, {
    key: 'isInputAnguloAndMultipleSelection',
    value: function isInputAnguloAndMultipleSelection() {
      return this.props.attributeName === 'angulo' && isMultipleSelection();
    }
  }, {
    key: 'isElementsOfSamePrototype',
    value: function isElementsOfSamePrototype(element) {
      if (this.props.sourceElement) {
        return element[0] === this.props.sourceElement.get('prototype');
      }
    }
  }, {
    key: 'isSingleSelectionOrInvalidElement',
    value: function isSingleSelectionOrInvalidElement() {
      return !this.props.sourceElement || !isMultipleSelection(this.props.stateRedux);
    }
  }, {
    key: 'isEmptyInputAndSingleSelection',
    value: function isEmptyInputAndSingleSelection() {
      return this.state.showedValue === 'null' && !this.state.isMultiSelection;
    }
  }, {
    key: 'areArrayValuesDifferent',
    value: function areArrayValuesDifferent(values) {
      return !values.every(function (el) {
        return el === values[0];
      });
    }
  }, {
    key: 'resetAngleInput',
    value: function resetAngleInput() {
      if (this.state.showedValue !== 0) this.setState({ showedValue: this.props.value });
    }
  }, {
    key: 'getProperty',
    value: function getProperty(element) {
      return element.getIn(['properties', this.props.attributeName, 'length']);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(line) {
      if (!line.vertices) return;
      var layerID = getLayerID(this.props.stateRedux);
      var layer = this.props.stateRedux.getIn(['scene', 'layers', layerID]);

      var _getElementVertices = getElementVertices(line, layer),
          v_a = _getElementVertices.v_a,
          v_b = _getElementVertices.v_b;

      var _getElementAttributes = getElementAttributes(line, layer, v_a, v_b),
          lineLength = _getElementAttributes.lineLength,
          angulo = _getElementAttributes.angulo;

      if (this.props.attributeName === 'lineLength') {
        return toFixedFloat(lineLength, 2);
      }
      return angulo.angle;
    }
  }, {
    key: 'getSelectedPropertyValues',
    value: function getSelectedPropertyValues(prototype) {
      var valuesArray = [];
      var elements = getSelectedPrototypeElements(this.props.stateRedux, prototype);

      if (this.isAttribute()) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;
            var element = _ref[1];


            var attribute = this.getAttribute(element);
            valuesArray.push(attribute);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref2 = _step2.value;
            var _element = _ref2[1];


            var property = this.getProperty(_element);
            valuesArray.push(property);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return valuesArray;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.isLengthInputWhileDrawing()) {
        this.setState({ focus: true });
        this.state.inputElement.focus();
        this.state.inputElement.select();
      }

      if (this.isCachedAnguloWhileDrawing() && this.isInputAnguloAndSingleSelection()) {
        this.setState({ showedValue: parseFloat(getCacheAngulo(this.props.stateRedux)) });
        document.addEventListener('mousemove', this.resetAngleInput);
      }

      if (this.isSingleSelectionOrInvalidElement()) return;

      var prototype = this.props.sourceElement.get('prototype');
      var values = this.getSelectedPropertyValues(prototype);

      if (this.areArrayValuesDifferent(values)) {
        this.setState({ showedValue: null });
        window.addEventListener('click', this.resetInputOnSelection);
      };
    }
  }, {
    key: 'resetInputOnSelection',
    value: function resetInputOnSelection() {
      if (!isMultipleSelection(this.props.stateRedux)) {
        this.setState({ showedValue: this.props.value });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ showedValue: this.props.value });
      document.removeEventListener('mousemove', this.resetAngleInput);
      // window.removeEventListener( 'click', this.resetInputOnSelection );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      if (document.activeElement === this.state.inputElement) {
        if (this.cursor.x !== this.props.stateRedux.getIn(['mouse', 'x']) || this.cursor.y !== this.props.stateRedux.getIn(['mouse', 'y'])) {
          console.log('test selecting');
          this.state.inputElement.select();
        }
      }

      this.cursor = {
        x: this.props.stateRedux.getIn(['mouse', 'x']),
        y: this.props.stateRedux.getIn(['mouse', 'y'])
      };
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.isDifferentPropsValue(nextProps) || this.isEmptyInputAndSingleSelection()) {
        this.setState({ showedValue: nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          min = _props.min,
          max = _props.max,
          style = _props.style,
          onValid = _props.onValid,
          onChange = _props.onChange,
          onInvalid = _props.onInvalid,
          precision = _props.precision,
          stateRedux = _props.stateRedux,
          placeholder = _props.placeholder,
          attributeName = _props.attributeName,
          sourceElement = _props.sourceElement;


      var numericInputStyle = _extends({}, STYLE_INPUT, style);
      var regexp = new RegExp('^-?([0-9]+)?\\.?([0-9]{0,' + precision + '})?$');

      if (this.state.focus) {
        numericInputStyle.border = '1px solid ' + SharedStyle.SECONDARY_COLOR.main;
      }

      if (!isNaN(min) && isFinite(min) && this.state.showedValue < min) {
        this.setState({ showedValue: min });
      };

      if (!isNaN(max) && isFinite(max) && this.state.showedValue > max) {
        this.setState({ showedValue: max });
      }

      var currValue = regexp.test(this.state.showedValue) ? this.state.showedValue : parseFloat(this.state.showedValue).toFixed(precision);

      var isDifferentValue = parseFloat(this.props.value).toFixed(precision) !== parseFloat(this.state.showedValue).toFixed(precision);

      var onKeyDown = function onKeyDown(e) {
        var keyCode = e.keyCode || e.which;

        if (isSaveButtonPressed(keyCode)) {
          saveFn(e, keyCode);
        } else if (isArrowPressedOnLength(keyCode)) {
          onArrrowPress(e, keyCode);
        } else if (isEscPressedWhileDrawing(keyCode)) {
          _this2.props.projectActions.undo();
          _this2.context.linesActions.cacheFondo('');
          _this2.context.linesActions.cacheAlto('');
          _this2.context.linesActions.cacheAngulo('');
        } else if (isEscPressed(keyCode)) {
          _this2.props.projectActions.unselectAll();
        }
      };

      var onInputChange = function onInputChange(e) {
        var valid = regexp.test(e.nativeEvent.target.value);

        if (valid) {
          _this2.setState({ showedValue: e.nativeEvent.target.value });

          if (onValid) {
            onValid(e.nativeEvent);
          }
        } else if (onInvalid) {
          onInvalid(e.nativeEvent);
        }

        _this2.setState({ valid: valid });
      };

      var cacheAttributes = function cacheAttributes() {
        var inputAlto = document.querySelector('.height').value;
        var inputFondo = document.querySelector('.thickness').value;

        _this2.context.linesActions.cacheAlto(inputAlto);
        _this2.context.linesActions.cacheFondo(inputFondo);
      };

      var isElementLine = function isElementLine() {
        return _this2.props.sourceElement.get('prototype') === 'lines';
      };

      var saveFn = function saveFn(e, keyCode) {
        e.stopPropagation();
        if (_this2.state.valid === false) return;
        if (_this2.state.showedValue === null) return;

        var savedValue = void 0;

        savedValue = _this2.state.showedValue !== '' && _this2.state.showedValue !== '-' ? parseFloat(_this2.state.showedValue) : 0;

        if (isElementLine()) {
          cacheAttributes();
        }

        onChange({
          target: {
            isEnter: keyCode == KEYBOARD_BUTTON_CODE.ENTER,
            value: attributeName === 'angulo' ? savedValue : convertMeasureToOriginal(savedValue, _this2.props.unit)
          }
        });
      };

      var onArrrowPress = function onArrrowPress(e, keyCode) {
        e.preventDefault();

        var state = stateRedux;

        var layerID = getLayerID(state);

        var _getLineVerticesID = getLineVerticesID(sourceElement),
            vertice1ID = _getLineVerticesID.vertice1ID,
            vertice2ID = _getLineVerticesID.vertice2ID;

        if (vertice1ID === vertice2ID) return;

        var _getVerticeCoords = getVerticeCoords(state, layerID, vertice1ID),
            x1 = _getVerticeCoords.x,
            y1 = _getVerticeCoords.y;

        var _getVerticeCoords2 = getVerticeCoords(state, layerID, vertice2ID),
            x2 = _getVerticeCoords2.x,
            y2 = _getVerticeCoords2.y;

        if (!x1 || !y1 || !x2 || !y2) return;

        var _Line$modifyCoordsOnK = Line.modifyCoordsOnKeyDown(x1, x2, y1, y2, keyCode),
            modifiedX = _Line$modifyCoordsOnK.modifiedX,
            modifiedY = _Line$modifyCoordsOnK.modifiedY;

        _this2.context.verticesActions.dragVertex(modifiedX, modifiedY, layerID, vertice2ID);

        /** DEBUG **/

        var layer = getLayerValue(state);
        var v2First = sourceElement.v2First;
        var v_a = layer.vertices.get(sourceElement.vertices.get(!v2First ? 0 : 1));
        var v_b = layer.vertices.get(sourceElement.vertices.get(1));

        var distance = GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
      };

      var isEscPressed = function isEscPressed(keyCode) {
        return keyCode == KEYBOARD_BUTTON_CODE.ESC;
      };

      var isSaveButtonPressed = function isSaveButtonPressed(keyCode) {
        return keyCode == KEYBOARD_BUTTON_CODE.ENTER || keyCode == KEYBOARD_BUTTON_CODE.TAB && isDifferentValue;
      };

      var isArrowPressedOnLength = function isArrowPressedOnLength(keyCode) {
        return attributeName === 'lineLength' && KEYBOARD_BUTTON_CODE.ARROW_KEYS.includes(keyCode);
      };

      var isEscPressedWhileDrawing = function isEscPressedWhileDrawing(keyCode) {
        return keyCode == KEYBOARD_BUTTON_CODE.ESC && _this2.props.mode === MODE_DRAWING_LINE;
      };

      return React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row', width: '100%' } },
        React.createElement('input', {
          type: 'number',
          value: currValue,
          placeholder: placeholder,
          className: attributeName,
          ref: function ref(c) {
            return _this2.state.inputElement = c;
          },
          style: _extends({}, numericInputStyle, { fontFamily: 'Calibri', fontWidth: 'lighter' }),
          onKeyDown: onKeyDown,
          onChange: onInputChange,
          onClick: function onClick() {
            return _this2.state.inputElement.select();
          },
          onFocus: function onFocus() {
            return _this2.setState({ focus: true });
          },
          onBlur: function onBlur() {
            return _this2.setState({ focus: false });
          }
        })
      );
    }
  }]);

  return FormNumberInput;
}(Component);

export default FormNumberInput;


FormNumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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