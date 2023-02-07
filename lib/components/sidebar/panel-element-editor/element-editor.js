'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _attributesEditor = require('./attributes-editor/attributes-editor');

var _attributesEditor2 = _interopRequireDefault(_attributesEditor);

var _export = require('../../../utils/export');

var _sharedStyle = require('../../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _flecha = require('./../../../assets/generalItems/flecha.png');

var _flecha2 = _interopRequireDefault(_flecha);

var _puertas = require('./../../../assets/construccion/puertas.png');

var _puertas2 = _interopRequireDefault(_puertas);

var _export2 = require('../../../class/export');

var _constants = require('../../../constants');

var _export3 = require('../../../catalog/properties/export');

var _selectors = require('../../../selectors/selectors');

var _context2 = require('../../../context/context');

var _useFormData = require('../../../hooks/useFormData');

var _useToggle = require('../../../hooks/useToggle');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PRECISION = 2;

// const STYLE_ATTR_PROP_SEPARATOR = {
//   margin: '0.5em 0.25em 0.5em 0',
//   border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
//   position: 'relative',
//   height: '2.5em',
//   borderRadius: '2px'
// };

// const STYLE_HEAD_ACTION = {
//   position: 'absolute',
//   right: '0.5em',
//   top: '0.5em'
// };

// const STYLE_ICON_HEAD = {
//   float: 'right',
//   margin: '-3px 4px 0px 0px',
//   padding: 0,
//   cursor: 'pointer',
//   fontSize: '1.4em'
// };

// export default function ElementEditor ( props ) {
//   const { state, element } = props;
//   const mode = props.state.getIn( [ 'mode' ] );

//   const context = useContext( Context );
//   const { projectActions, catalog } = context;

//   const data = useFormData( props, context );
//   const { formData, attributes, properties } = data;
//   const { updateAttribute, updateProperty } = data;

//   const { isSelectAcabado, handleAcabado } = useToggle();

//   return (
//     <div style={ { marginTop: '2em' } }>
//       <div style={ { display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', marginBottom: '45px' } }>
//         <img style={ { height: '80px', width: '80px', paddingTop: '10px' } } src={ element.image } />
//         <p style={ { margin: '0', padding: '10px 0', fontSize: '0.8em', textAlign: 'center', color: SharedStyle.PRIMARY_COLOR.master, /*fontWeight: 'bold'*/ } }>

//           { element.name }

//         </p>
//         <p style={ { margin: '0', fontSize: '0.7em', textAlign: 'center' } }>

//           { element.description }

//         </p>
//       </div>

//       { console.log( 'test', attributes ) }
//       <AttributesEditor
//         mode={ mode }
//         position={ 1 }
//         state={ state }
//         element={ element }
//         onUpdate={ updateAttribute }
//         attributeFormData={ attributes }
//         projectActions={ projectActions }
//         unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//       />

//       { properties.entrySeq()
//         .map( ( [ propertyName, data ] ) => {
//           if ( propertyName.includes( 'texture' ) === false ) {
//             const configs = data.get( 'configs' );
//             const currentValue = data.get( 'currentValue' );
//             const label = properties.getIn( [ propertyName, 'configs' ] ).label;

//             if ( configs.type === 'length-measure' ) {
//               return (
//                 <PropertyLengthMeasure
//                   mode={ mode }
//                   key={ propertyName }
//                   stateRedux={ state }
//                   state={ properties }
//                   sourceElement={ element }
//                   attributeName={ propertyName }
//                   projectActions={ projectActions }
//                   unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//                   configs={ { label: label, min: 0, max: Infinity, precision: 2 } }
//                   value={ properties.getIn( [ propertyName, "currentValue" ] ) }
//                   onUpdate={ ( value, isEnter ) => updateProperty( propertyName, value, isEnter ) }
//                 />
//               );

//             } else {
//               let { Editor } = catalog.getPropertyType( configs.type );

//               return (
//                 <Editor
//                   configs={ configs }
//                   key={ propertyName }
//                   value={ currentValue }
//                   stateRedux={ state }
//                   sourceElement={ element }
//                   internalState={ formData }
//                   propertyName={ propertyName }
//                   unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//                   onUpdate={ value => updateProperty( propertyName, value ) }
//                 />
//               );
//             }
//           }
//         } ) }

//       <AttributesEditor
//         mode={ mode }
//         position={ 2 }
//         state={ state }
//         element={ element }
//         onUpdate={ updateAttribute }
//         attributeFormData={ attributes }
//         projectActions={ projectActions }
//         unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//       />

//       <div style={ { marginTop: '6px' } }>
//         <div>
//           <div
//             onClick={ handleAcabado }
//             style={ { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer', paddingBottom: '34px' } }>
//             <p style={ {
//               margin: '0',
//               fontSize: '0.75em',
//               color: SharedStyle.PRIMARY_COLOR.master,
//             } }>Acabado</p>
//             <img style={ { height: '0.70em', marginLeft: '1.8em', marginTop: '1px' } } src={ flecha } />
//           </div>

//           <div id={ 'panelAcabado' }
//             style={ ( isSelectAcabado )
//               ? { display: 'block', width: '100%', height: '100%', paddingBottom: '10px' }
//               : { /*width: '100%', height: '100%',*/ display: 'none' } }>

//             { properties.entrySeq()
//               .map( ( [ propertyName, data ] ) => {

//                 if ( propertyName.includes( 'texture' ) ) {
//                   let currentValue = data.get( 'currentValue' ), configs = data.get( 'configs' );

//                   let { Editor } = catalog.getPropertyType( configs.type );

//                   return (
//                     <Editor
//                       state={ state }
//                       configs={ configs }
//                       key={ propertyName }
//                       value={ currentValue }
//                       sourceElement={ element }
//                       internalState={ formData }
//                       propertyName={ propertyName }
//                       onUpdate={ value => updateProperty( propertyName, value ) }
//                     />
//                   );
//                 }
//               } )
//             }
//           </div>

//           <div style={ { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer' } }>
//             <p style={ {
//               margin: '0',
//               fontSize: '0.75em',
//               color: SharedStyle.PRIMARY_COLOR.master,
//             } }>Opciones</p>
//             <img style={ { height: '0.70em', marginLeft: '1.6em', marginTop: '1px' } } src={ flecha } />
//           </div>
//         </div>
//       </div >
//     </div >
//   );
// }

var ElementEditor = function (_Component) {
  _inherits(ElementEditor, _Component);

  function ElementEditor(props, context) {
    _classCallCheck(this, ElementEditor);

    var _this = _possibleConstructorReturn(this, (ElementEditor.__proto__ || Object.getPrototypeOf(ElementEditor)).call(this, props, context));

    _this.state = {
      isSelectAcabado: false,
      attributesFormData: _this.initAttrData(_this.props.element, _this.props.layer, _this.props.state),
      propertiesFormData: _this.initPropData(_this.props.element, _this.props.layer, _this.props.state)
    };

    _this.save = _this.save.bind(_this);
    _this.initAttrData = _this.initAttrData.bind(_this);
    _this.initPropData = _this.initPropData.bind(_this);
    _this.updateAttribute = _this.updateAttribute.bind(_this);
    _this.updateProperty = _this.updateProperty.bind(_this);
    return _this;
  }

  //FIXME this has been commented bc it was preventing the lower components from getting    
  //the updated state

  // shouldComponentUpdate ( nextProps, nextState ) {
  //   return (
  //     this.state.isSelectAcabado !== nextState.isSelectAcabado ||
  //     this.props.state.isElementSelected !== nextProps.state.isElementSelected ||
  //     this.state.attributesFormData.hashCode() !== nextState.attributesFormData.hashCode() ||
  //     this.state.propertiesFormData.hashCode() !== nextState.propertiesFormData.hashCode() ||
  //     this.props.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode()
  //   );
  // }

  _createClass(ElementEditor, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(_ref) {
      var element = _ref.element,
          layer = _ref.layer,
          state = _ref.state;
      var prototype = element.prototype,
          id = element.id;

      var scene = this.props.state.get('scene');
      var selectedLayer = scene.getIn(['layers', scene.get('selectedLayer')]);
      var selected = selectedLayer.getIn([prototype, id]);

      /* //TODO Figure out what's the logic behind checking whether the
       layer passed as props is different from the selected ones */
      if (selectedLayer.hashCode() !== layer.hashCode()) {
        this.setState({
          attributesFormData: this.initAttrData(element, layer, state),
          propertiesFormData: this.initPropData(element, layer, state)
        });
      }
    }
  }, {
    key: 'initAttrData',
    value: function initAttrData(element, layer, state) {

      element = _typeof(element.misc) === 'object' ? element.set('misc', new _immutable.Map(element.misc)) : element;

      switch (element.prototype) {
        case 'items':
          {
            return new _immutable.Map(element);
          }
        case 'lines':
          {

            var v2First = element.v2First;
            var v_a = layer.vertices.get(element.vertices.get(!v2First ? 0 : 1));
            var v_b = layer.vertices.get(element.vertices.get(1));

            var distance = _export.GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
            var _unit = element.misc.get('_unitLength') || this.context.catalog.unit;
            var _length = (0, _convertUnits2.default)(distance).from(this.context.catalog.unit).to(_unit);
            var _angleLine = _export2.Line.getAngleV0_pcl(layer, element);

            //TODO test when pressing enter and creating a new line
            // use the cached angulo for this new line 
            if (distance === 0 && (0, _selectors.getCacheAngulo)(this.props.state)) {
              _angleLine.angle = (0, _selectors.getCacheAngulo)(this.props.state);
            }

            return new _immutable.Map({
              lineLength: new _immutable.Map({ length: distance, _length: _length, _unit: _unit }),
              lineAngle: _angleLine.angle,
              isEndLine: false
            });
          }

        case 'holes':
          {
            var line = layer.lines.get(element.line);

            var _layer$vertices$get = layer.vertices.get(line.vertices.get(0)),
                x0 = _layer$vertices$get.x,
                y0 = _layer$vertices$get.y;

            var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1)),
                x1 = _layer$vertices$get2.x,
                y1 = _layer$vertices$get2.y;

            var lineLength = _export.GeometryUtils.pointsDistance(x0, y0, x1, y1);
            var startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

            var _unitA = element.misc.get('_unitA') || this.context.catalog.unit;
            var _lengthA = (0, _convertUnits2.default)(startAt).from(this.context.catalog.unit).to(_unitA);

            var endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
            var _unitB = element.misc.get('_unitB') || this.context.catalog.unit;
            var _lengthB = (0, _convertUnits2.default)(endAt).from(this.context.catalog.unit).to(_unitB);

            return new _immutable.Map({
              offset: element.offset,
              offsetA: new _immutable.Map({
                length: _export.MathUtils.toFixedFloat(startAt, PRECISION),
                _length: _export.MathUtils.toFixedFloat(_lengthA, PRECISION),
                _unit: _unitA
              }),
              offsetB: new _immutable.Map({
                length: _export.MathUtils.toFixedFloat(endAt, PRECISION),
                _length: _export.MathUtils.toFixedFloat(_lengthB, PRECISION),
                _unit: _unitB
              })
            });
          }
        case 'areas':
          {
            return new _immutable.Map({});
          }
        default:
          return null;
      }
    }
  }, {
    key: 'initPropData',
    value: function initPropData(element, layer, state) {
      var catalog = this.context.catalog;

      var catalogElement = catalog.getElement(element.type);

      var mapped = {};
      for (var name in catalogElement.properties) {
        mapped[name] = new _immutable.Map({
          currentValue: element.properties.has(name) ? element.properties.get(name) : (0, _immutable.fromJS)(catalogElement.properties[name].defaultValue),

          configs: catalogElement.properties[name]
        });
      }

      return new _immutable.Map(mapped);
    }
  }, {
    key: 'updateAttribute',
    value: function updateAttribute(attributeName, value, isEnter) {
      var attributesFormData = this.state.attributesFormData;


      switch (this.props.element.prototype) {
        case 'items':
          {
            attributesFormData = attributesFormData.set(attributeName, value);
            break;
          }
        case 'lines':

          attributesFormData = attributesFormData.set(attributeName, value);
          this.setState({ attributesFormData: attributesFormData });

          if (isEnter && !(0, _selectors.isMultipleSelection)(this.props.state)) {
            var cachedAngulo = document.querySelector('.angulo').value;
            this.context.linesActions.cacheAngulo(cachedAngulo);
          }
          break;

        //case 'lineLength':
        //  {
        //    let v_0 = attributesFormData.get('vertexOne');
        //    let v_1 = attributesFormData.get('vertexTwo');

        //    let [v_a, v_b] = GeometryUtils.orderVertices([v_0, v_1]);

        //    let v_b_new = GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);

        //    attributesFormData = attributesFormData.withMutations(attr => {
        //      attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
        //      attr.set('lineLength', value);
        //    });
        //    break;
        //  }
        //case 'vertexOne':
        //case 'vertexTwo':
        //  {
        //    attributesFormData = attributesFormData.withMutations(attr => {
        //      attr.set(attributeName, attr.get(attributeName).merge(value));

        //      let newDistance = GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

        //      attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
        //        'length': newDistance,
        //        '_length': convert(newDistance).from(this.context.catalog.unit).to(attr.get('lineLength').get('_unit'))
        //      }));
        //    });
        //    break;
        //  }
        case 'holes':
          {
            switch (attributeName) {
              case 'offsetA':
                {
                  var line = this.props.layer.lines.get(this.props.element.line);

                  var orderedVertices = _export.GeometryUtils.orderVertices([this.props.layer.vertices.get(line.vertices.get(0)), this.props.layer.vertices.get(line.vertices.get(1))]);

                  var _orderedVertices = _slicedToArray(orderedVertices, 2),
                      _orderedVertices$ = _orderedVertices[0],
                      x0 = _orderedVertices$.x,
                      y0 = _orderedVertices$.y,
                      _orderedVertices$2 = _orderedVertices[1],
                      x1 = _orderedVertices$2.x,
                      y1 = _orderedVertices$2.y;

                  var alpha = _export.GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
                  var lineLength = _export.GeometryUtils.pointsDistance(x0, y0, x1, y1);
                  var widthLength = this.props.element.properties.get('width').get('length');
                  var halfWidthLength = widthLength / 2;

                  var lengthValue = value.get('length');
                  lengthValue = Math.max(lengthValue, 0);
                  lengthValue = Math.min(lengthValue, lineLength - widthLength);

                  var xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
                  var yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;

                  var offset = _export.GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

                  var endAt = _export.MathUtils.toFixedFloat(lineLength - lineLength * offset - halfWidthLength, PRECISION);
                  var offsetUnit = attributesFormData.getIn(['offsetB', '_unit']);

                  var offsetB = new _immutable.Map({
                    length: endAt,
                    _length: (0, _convertUnits2.default)(endAt).from(this.context.catalog.unit).to(offsetUnit),
                    _unit: offsetUnit
                  });

                  attributesFormData = attributesFormData.set('offsetB', offsetB).set('offset', offset);

                  var offsetAttribute = new _immutable.Map({
                    length: _export.MathUtils.toFixedFloat(lengthValue, PRECISION),
                    _unit: value.get('_unit'),
                    _length: _export.MathUtils.toFixedFloat((0, _convertUnits2.default)(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), PRECISION)
                  });

                  attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

                  break;
                }
              case 'offsetB':
                {
                  var _line = this.props.layer.lines.get(this.props.element.line);

                  var _orderedVertices2 = _export.GeometryUtils.orderVertices([this.props.layer.vertices.get(_line.vertices.get(0)), this.props.layer.vertices.get(_line.vertices.get(1))]);

                  var _orderedVertices3 = _slicedToArray(_orderedVertices2, 2),
                      _orderedVertices3$ = _orderedVertices3[0],
                      _x = _orderedVertices3$.x,
                      _y = _orderedVertices3$.y,
                      _orderedVertices3$2 = _orderedVertices3[1],
                      _x2 = _orderedVertices3$2.x,
                      _y2 = _orderedVertices3$2.y;

                  var _alpha = _export.GeometryUtils.angleBetweenTwoPoints(_x, _y, _x2, _y2);
                  var _lineLength = _export.GeometryUtils.pointsDistance(_x, _y, _x2, _y2);
                  var _widthLength = this.props.element.properties.get('width').get('length');
                  var _halfWidthLength = _widthLength / 2;

                  var _lengthValue = value.get('length');
                  _lengthValue = Math.max(_lengthValue, 0);
                  _lengthValue = Math.min(_lengthValue, _lineLength - _widthLength);

                  var _xp = _x2 - (_lengthValue + _halfWidthLength) * Math.cos(_alpha);
                  var _yp = _y2 - (_lengthValue + _halfWidthLength) * Math.sin(_alpha);

                  var _offset = _export.GeometryUtils.pointPositionOnLineSegment(_x, _y, _x2, _y2, _xp, _yp);

                  var startAt = _export.MathUtils.toFixedFloat(_lineLength * _offset - _halfWidthLength, PRECISION);
                  var _offsetUnit = attributesFormData.getIn(['offsetA', '_unit']);

                  var offsetA = new _immutable.Map({
                    length: startAt,
                    _length: (0, _convertUnits2.default)(startAt).from(this.context.catalog.unit).to(_offsetUnit),
                    _unit: _offsetUnit
                  });

                  attributesFormData = attributesFormData.set('offsetA', offsetA).set('offset', _offset);

                  var _offsetAttribute = new _immutable.Map({
                    length: _export.MathUtils.toFixedFloat(_lengthValue, PRECISION),
                    _unit: value.get('_unit'),
                    _length: _export.MathUtils.toFixedFloat((0, _convertUnits2.default)(_lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), PRECISION)
                  });

                  attributesFormData = attributesFormData.set(attributeName, _offsetAttribute);

                  break;
                }
              default:
                {
                  attributesFormData = attributesFormData.set(attributeName, value);
                  break;
                }
            };
            break;
          }
        default:
          break;
      }

      this.setState({ attributesFormData: attributesFormData });
      this.save({ attributesFormData: attributesFormData, isEnter: isEnter });
    }
  }, {
    key: 'updateProperty',
    value: function updateProperty(propertyName, value, isEnter) {
      var propertiesFormData = this.state.propertiesFormData;


      propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
      this.setState({ propertiesFormData: propertiesFormData });
      this.save({ propertiesFormData: propertiesFormData, isEnter: isEnter || false });
    }

    // Here the values taken from the form data are saved in state

  }, {
    key: 'save',
    value: function save(_ref2) {
      var propertiesFormData = _ref2.propertiesFormData,
          attributesFormData = _ref2.attributesFormData,
          isEnter = _ref2.isEnter;

      if (propertiesFormData) {
        var properties = propertiesFormData.map(function (data) {
          return data.get('currentValue');
        });
        this.context.projectActions.setProperties(properties);
      }

      if (attributesFormData) {
        switch (this.props.element.prototype) {
          case 'items':
            {
              this.context.projectActions.setItemsAttributes(attributesFormData);
              break;
            }
          case 'lines':
            {
              this.context.projectActions.setLinesAttributes(attributesFormData);
              break;
            }
          case 'holes':
            {
              this.context.projectActions.setHolesAttributes(attributesFormData);
              break;
            }
        }
      }

      if (this.props.state.mode == _constants.MODE_DRAWING_LINE && isEnter) this.context.projectActions.next_Drawing_Item();
    }

    //reset () {
    //  this.setState( { propertiesFormData: this.initPropData( this.props.element, this.props.layer, this.props.state ) } );
    //}

    //copyProperties ( properties ) {
    //  this.context.projectActions.copyProperties( properties );
    //}

    //pasteProperties () {
    //  this.context.projectActions.pasteProperties();
    //}

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mode = this.props.state.getIn(['mode']);
      var _props = this.props,
          appState = _props.state,
          element = _props.element,
          _context = this.context,
          projectActions = _context.projectActions,
          catalog = _context.catalog,
          _state = this.state,
          propertiesFormData = _state.propertiesFormData,
          attributesFormData = _state.attributesFormData;


      var showAndHideAcabado = function showAndHideAcabado() {
        if (_this2.state.isSelectAcabado) {
          _this2.setState(_extends({}, _this2.state, { isSelectAcabado: false }));
        } else {
          _this2.setState(_extends({}, _this2.state, { isSelectAcabado: true }));
        }
      };

      return _react2.default.createElement(
        'div',
        { style: { marginTop: '2em' } },
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', marginBottom: '45px' } },
          _react2.default.createElement('img', { style: { height: '80px', width: '80px', paddingTop: '10px' }, src: element.image }),
          _react2.default.createElement(
            'p',
            { style: { margin: '0', padding: '10px 0', fontSize: '0.8em', textAlign: 'center', color: SharedStyle.PRIMARY_COLOR.master /*fontWeight: 'bold'*/ } },
            element.name
          ),
          _react2.default.createElement(
            'p',
            { style: { margin: '0', fontSize: '0.7em', textAlign: 'center' } },
            element.description
          )
        ),
        _react2.default.createElement(_attributesEditor2.default, {
          mode: mode,
          position: 1,
          state: appState,
          element: element,
          onUpdate: this.updateAttribute,
          attributeFormData: attributesFormData,
          projectActions: this.context.projectActions,
          unit: appState.getIn(["prefs", "UNIDADMEDIDA"])
        }),
        propertiesFormData.entrySeq().map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              propertyName = _ref4[0],
              data = _ref4[1];

          // For a line, this would be applied to height and thickness
          if (propertyName.includes('texture') === false) {

            var configs = data.get('configs');
            var currentValue = data.get('currentValue');
            var label = propertiesFormData.getIn([propertyName, 'configs']).label;

            // For a line, this still implied height and thickness
            if (configs.type === 'length-measure') {

              return _react2.default.createElement(_export3.PropertyLengthMeasure, {
                mode: mode,
                key: propertyName,
                stateRedux: appState,
                state: propertiesFormData,
                sourceElement: element,
                attributeName: propertyName,
                projectActions: projectActions,
                unit: appState.getIn(["prefs", "UNIDADMEDIDA"]),
                configs: { label: label, min: 0, max: Infinity, precision: 2 },
                value: propertiesFormData.getIn([propertyName, "currentValue"]),
                onUpdate: function onUpdate(value, isEnter) {
                  return _this2.updateProperty(propertyName, value, isEnter);
                }
              });
            } else {
              var _catalog$getPropertyT = catalog.getPropertyType(configs.type),
                  Editor = _catalog$getPropertyT.Editor;

              return _react2.default.createElement(Editor, {
                configs: configs,
                key: propertyName,
                value: currentValue,
                stateRedux: appState,
                sourceElement: element,
                internalState: _this2.state,
                propertyName: propertyName,
                unit: appState.getIn(["prefs", "UNIDADMEDIDA"]),
                onUpdate: function onUpdate(value) {
                  return _this2.updateProperty(propertyName, value);
                }
              });
            }
          }
        }),
        _react2.default.createElement(_attributesEditor2.default, {
          mode: mode,
          position: 2,
          state: appState,
          element: element,
          onUpdate: this.updateAttribute,
          attributeFormData: attributesFormData,
          projectActions: this.context.projectActions,
          unit: appState.getIn(["prefs", "UNIDADMEDIDA"])
        }),
        _react2.default.createElement(
          'div',
          { style: { marginTop: '6px' } },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              {
                onClick: showAndHideAcabado,
                style: { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer', paddingBottom: '34px' } },
              _react2.default.createElement(
                'p',
                { style: {
                    margin: '0',
                    fontSize: '0.75em',
                    color: SharedStyle.PRIMARY_COLOR.master
                  } },
                'Acabado'
              ),
              _react2.default.createElement('img', { style: { height: '0.70em', marginLeft: '1.8em', marginTop: '1px' }, src: _flecha2.default })
            ),
            _react2.default.createElement(
              'div',
              { id: 'panelAcabado',
                style: this.state.isSelectAcabado ? { display: 'block', width: '100%', height: '100%', paddingBottom: '10px' } : { /*width: '100%', height: '100%',*/display: 'none' } },
              propertiesFormData.entrySeq().map(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    propertyName = _ref6[0],
                    data = _ref6[1];

                if (propertyName.includes('texture')) {
                  var currentValue = data.get('currentValue'),
                      configs = data.get('configs');

                  var _catalog$getPropertyT2 = catalog.getPropertyType(configs.type),
                      Editor = _catalog$getPropertyT2.Editor;

                  return _react2.default.createElement(Editor, {
                    state: appState,
                    configs: configs,
                    key: propertyName,
                    value: currentValue,
                    sourceElement: element,
                    internalState: _this2.state,
                    propertyName: propertyName,
                    onUpdate: function onUpdate(value) {
                      return _this2.updateProperty(propertyName, value);
                    }
                  });
                }
              })
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer' } },
              _react2.default.createElement(
                'p',
                { style: {
                    margin: '0',
                    fontSize: '0.75em',
                    color: SharedStyle.PRIMARY_COLOR.master
                  } },
                'Opciones'
              ),
              _react2.default.createElement('img', { style: { height: '0.70em', marginLeft: '1.6em', marginTop: '1px' }, src: _flecha2.default })
            )
          )
        )
      );
    }
  }]);

  return ElementEditor;
}(_react.Component);

exports.default = ElementEditor;


ElementEditor.propTypes = {
  state: _propTypes2.default.object.isRequired,
  element: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired
};

ElementEditor.contextType = _context2.Context;

// ElementEditor.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };