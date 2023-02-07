'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.useFormData = useFormData;

var _react = require('react');

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _export = require('../class/export');

var _immutable = require('immutable');

var _constants = require('../constants');

var _export2 = require('../utils/export');

var _selectors = require('../selectors/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFormData(props, context) {
  var PRECISION = 2;

  var _useState = (0, _react.useState)({
    attributesFormData: initAttrData(props.element, props.layer),
    propertiesFormData: initPropData(props.element)
  }),
      _useState2 = _slicedToArray(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  (0, _react.useEffect)(function () {
    var element = props.element,
        layer = props.layer;

    var attributesFormData = initAttrData(element, layer);
    var propertiesFormData = initPropData(element);

    setFormData(function () {
      return { attributesFormData: attributesFormData, propertiesFormData: propertiesFormData };
    });
  }, [props]);

  function initAttrData(element, layer) {
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

          var distance = _export2.GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
          var _unit = element.misc.get('_unitLength') || context.catalog.unit;
          var _length = (0, _convertUnits2.default)(distance).from(context.catalog.unit).to(_unit);
          var _angleLine = _export.Line.getAngleV0_pcl(layer, element);

          //TODO test when pressing enter and creating a new line
          // use the cached angulo for this new line 
          if (distance === 0 && (0, _selectors.getCacheAngulo)(props.state)) {
            _angleLine.angle = (0, _selectors.getCacheAngulo)(props.state);
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

          var lineLength = _export2.GeometryUtils.pointsDistance(x0, y0, x1, y1);
          var startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

          var _unitA = element.misc.get('_unitA') || context.catalog.unit;
          var _lengthA = (0, _convertUnits2.default)(startAt).from(context.catalog.unit).to(_unitA);

          var endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
          var _unitB = element.misc.get('_unitB') || context.catalog.unit;
          var _lengthB = (0, _convertUnits2.default)(endAt).from(context.catalog.unit).to(_unitB);

          return new _immutable.Map({
            offset: element.offset,
            offsetA: new _immutable.Map({
              length: _export2.MathUtils.toFixedFloat(startAt, PRECISION),
              _length: _export2.MathUtils.toFixedFloat(_lengthA, PRECISION),
              _unit: _unitA
            }),
            offsetB: new _immutable.Map({
              length: _export2.MathUtils.toFixedFloat(endAt, PRECISION),
              _length: _export2.MathUtils.toFixedFloat(_lengthB, PRECISION),
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
  };

  function initPropData(element) {
    var catalog = context.catalog;

    var catalogElement = catalog.getElement(element.type);

    var mapped = {};
    for (var name in catalogElement.properties) {
      mapped[name] = new _immutable.Map({
        currentValue: element.properties.has(name) ? element.properties.get(name) : (0, _immutable.fromJS)(catalogElement.properties[name].defaultValue),

        configs: catalogElement.properties[name]
      });
    }
    return new _immutable.Map(mapped);
  };

  var updateAttribute = function updateAttribute(attributeName, value, isEnter) {
    var attributesFormData = formData.attributesFormData;


    switch (props.element.prototype) {
      case 'items':
        {
          attributesFormData = attributesFormData.set(attributeName, value);
          break;
        }
      case 'lines':

        attributesFormData = attributesFormData.set(attributeName, value);
        setFormData(function (prevState) {
          return _extends({}, prevState, { attributesFormData: attributesFormData });
        });

        if (isEnter && !(0, _selectors.isMultipleSelection)(props.state)) {
          var cachedAngulo = document.querySelector('.angulo').value;
          context.linesActions.cacheAngulo(cachedAngulo);
        }
        break;

      case 'holes':
        {
          switch (attributeName) {
            case 'offsetA':
              {
                var line = props.layer.lines.get(props.element.line);

                var orderedVertices = _export2.GeometryUtils.orderVertices([props.layer.vertices.get(line.vertices.get(0)), props.layer.vertices.get(line.vertices.get(1))]);

                var _orderedVertices = _slicedToArray(orderedVertices, 2),
                    _orderedVertices$ = _orderedVertices[0],
                    x0 = _orderedVertices$.x,
                    y0 = _orderedVertices$.y,
                    _orderedVertices$2 = _orderedVertices[1],
                    x1 = _orderedVertices$2.x,
                    y1 = _orderedVertices$2.y;

                var alpha = _export2.GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
                var lineLength = _export2.GeometryUtils.pointsDistance(x0, y0, x1, y1);
                var widthLength = props.element.properties.get('width').get('length');
                var halfWidthLength = widthLength / 2;

                var lengthValue = value.get('length');
                lengthValue = Math.max(lengthValue, 0);
                lengthValue = Math.min(lengthValue, lineLength - widthLength);

                var xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
                var yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;

                var offset = _export2.GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

                var endAt = _export2.MathUtils.toFixedFloat(lineLength - lineLength * offset - halfWidthLength, PRECISION);
                var offsetUnit = attributesFormData.getIn(['offsetB', '_unit']);

                var offsetB = new _immutable.Map({
                  length: endAt,
                  _length: (0, _convertUnits2.default)(endAt).from(context.catalog.unit).to(offsetUnit),
                  _unit: offsetUnit
                });

                attributesFormData = attributesFormData.set('offsetB', offsetB).set('offset', offset);

                var offsetAttribute = new _immutable.Map({
                  length: _export2.MathUtils.toFixedFloat(lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: _export2.MathUtils.toFixedFloat((0, _convertUnits2.default)(lengthValue).from(context.catalog.unit).to(value.get('_unit')), PRECISION)
                });

                attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

                break;
              }
            case 'offsetB':
              {
                var _line = props.layer.lines.get(props.element.line);

                var _orderedVertices2 = _export2.GeometryUtils.orderVertices([props.layer.vertices.get(_line.vertices.get(0)), props.layer.vertices.get(_line.vertices.get(1))]);

                var _orderedVertices3 = _slicedToArray(_orderedVertices2, 2),
                    _orderedVertices3$ = _orderedVertices3[0],
                    _x = _orderedVertices3$.x,
                    _y = _orderedVertices3$.y,
                    _orderedVertices3$2 = _orderedVertices3[1],
                    _x2 = _orderedVertices3$2.x,
                    _y2 = _orderedVertices3$2.y;

                var _alpha = _export2.GeometryUtils.angleBetweenTwoPoints(_x, _y, _x2, _y2);
                var _lineLength = _export2.GeometryUtils.pointsDistance(_x, _y, _x2, _y2);
                var _widthLength = props.element.properties.get('width').get('length');
                var _halfWidthLength = _widthLength / 2;

                var _lengthValue = value.get('length');
                _lengthValue = Math.max(_lengthValue, 0);
                _lengthValue = Math.min(_lengthValue, _lineLength - _widthLength);

                var _xp = _x2 - (_lengthValue + _halfWidthLength) * Math.cos(_alpha);
                var _yp = _y2 - (_lengthValue + _halfWidthLength) * Math.sin(_alpha);

                var _offset = _export2.GeometryUtils.pointPositionOnLineSegment(_x, _y, _x2, _y2, _xp, _yp);

                var startAt = _export2.MathUtils.toFixedFloat(_lineLength * _offset - _halfWidthLength, PRECISION);
                var _offsetUnit = attributesFormData.getIn(['offsetA', '_unit']);

                var offsetA = new _immutable.Map({
                  length: startAt,
                  _length: (0, _convertUnits2.default)(startAt).from(context.catalog.unit).to(_offsetUnit),
                  _unit: _offsetUnit
                });

                attributesFormData = attributesFormData.set('offsetA', offsetA).set('offset', _offset);

                var _offsetAttribute = new _immutable.Map({
                  length: _export2.MathUtils.toFixedFloat(_lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: _export2.MathUtils.toFixedFloat((0, _convertUnits2.default)(_lengthValue).from(context.catalog.unit).to(value.get('_unit')), PRECISION)
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

    setFormData(function (prevState) {
      return _extends({}, prevState, { attributesFormData: attributesFormData });
    });
    save({ attributesFormData: attributesFormData, isEnter: isEnter });
  };

  var updateProperty = function updateProperty(propertyName, value, isEnter) {
    var propertiesFormData = formData.propertiesFormData;


    propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
    setFormData(function (prevState) {
      return _extends({}, prevState, { propertiesFormData: propertiesFormData });
    });
    save({ propertiesFormData: propertiesFormData, isEnter: isEnter || false });
  };

  var save = function save(_ref) {
    var propertiesFormData = _ref.propertiesFormData,
        attributesFormData = _ref.attributesFormData,
        isEnter = _ref.isEnter;

    if (propertiesFormData) {
      var properties = propertiesFormData.map(function (data) {
        return data.get('currentValue');
      });
      context.projectActions.setProperties(properties);
    }

    if (attributesFormData) {
      switch (props.element.prototype) {
        case 'items':
          {
            context.projectActions.setItemsAttributes(attributesFormData);
            break;
          }
        case 'lines':
          {
            context.projectActions.setLinesAttributes(attributesFormData);
            break;
          }
        case 'holes':
          {
            context.projectActions.setHolesAttributes(attributesFormData);
            break;
          }
      }
    }

    if (props.state.mode == _constants.MODE_DRAWING_LINE && isEnter) context.projectActions.next_Drawing_Item();
  };

  var attributesFormData = formData.attributesFormData,
      propertiesFormData = formData.propertiesFormData;

  return {
    formData: formData,
    attributes: attributesFormData,
    properties: propertiesFormData,
    updateAttribute: updateAttribute,
    updateProperty: updateProperty
  };
}