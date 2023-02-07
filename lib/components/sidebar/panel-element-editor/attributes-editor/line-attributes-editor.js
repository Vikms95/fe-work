'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../../../catalog/properties/export');

var _context = require('../../../../context/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };
var inputStyle = { textAlign: 'left' };

function LineAttributesEditor(_ref) {
  var mode = _ref.mode,
      unit = _ref.unit,
      state = _ref.state,
      element = _ref.element,
      position = _ref.position,
      _onUpdate = _ref.onUpdate,
      projectActions = _ref.projectActions,
      attributeFormData = _ref.attributeFormData,
      rest = _objectWithoutProperties(_ref, ['mode', 'unit', 'state', 'element', 'position', 'onUpdate', 'projectActions', 'attributeFormData']);

  var _useContext = (0, _react.useContext)(_context.Context),
      translator = _useContext.translator;
  //let name = attributeFormData.has( 'name' ) ? attributeFormData.get( 'name' ) : element.name;
  //let vertexOne = attributeFormData.has( 'vertexOne' ) ? attributeFormData.get( 'vertexOne' ) : null;
  //let vertexTwo = attributeFormData.has( 'vertexTwo' ) ? attributeFormData.get( 'vertexTwo' ) : null;


  var lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;
  var lineAngle = attributeFormData.has('lineAngle') ? attributeFormData.get('lineAngle') : null;
  var isLengthAttribute = function isLengthAttribute() {
    return position === 1;
  };
  var isAngleAttribute = function isAngleAttribute() {
    return position === 2;
  };

  // On element editor, line length was given position 1
  // and angle was given position 2
  if (isLengthAttribute()) {

    return _react2.default.createElement(_export.PropertyLengthMeasure, {
      mode: mode,
      unit: unit,
      stateRedux: state,
      value: lineLength,
      sourceElement: element,
      attributeName: 'lineLength',
      projectActions: projectActions,
      attributeFormData: attributeFormData,
      configs: { label: 'Ancho', min: 0, max: Infinity, precision: 2 },
      onUpdate: function onUpdate(mapped, isEnter) {
        return _onUpdate('lineLength', mapped, isEnter);
      }
    });
  } else if (isAngleAttribute()) {

    return _react2.default.createElement(_export.PropertyNumber, _extends({
      mode: mode,
      state: state,
      value: lineAngle,
      sourceElement: element,
      attributeName: 'angulo',
      projectActions: projectActions,
      attributeFormData: attributeFormData,
      configs: { label: 'Ángulo', min: 0, max: 360, precision: 0 },
      onUpdate: function onUpdate(value, isEnter) {
        return _onUpdate('lineAngle', value, isEnter);
      }
    }, rest));
  }

  return _react2.default.createElement('div', null);
}

exports.default = LineAttributesEditor;
LineAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

// LineAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };