'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HoleAttributesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propertyLenghtMeasure = require('../../../../catalog/properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

var _propertyString = require('../../../../catalog/properties/property-string');

var _propertyString2 = _interopRequireDefault(_propertyString);

var _context = require('../../../../context/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function HoleAttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var _useContext = (0, _react.useContext)(_context.Context),
      translator = _useContext.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return null;
  /*<div>
    <PropertyString
      value={name}
      onUpdate={mapped => onUpdate('name', mapped)}
      configs={{label: 'Nome'}}
      state={state}
      {...rest}
    />
    <PropertyLengthMeasure
      value={offsetA}
      onUpdate={mapped => onUpdate('offsetA', mapped)}
      configs={{label: 'Offset 1', min: 0, max: Infinity, precision: 2}}
      state={state}
      {...rest}
    />
    <PropertyLengthMeasure
      value={offsetB}
      onUpdate={mapped => onUpdate('offsetB', mapped)}
      configs={{label: 'Offset 2', min: 0, max: Infinity, precision: 2}}
      state={state}
      {...rest}
    />
  </div>;*/
}

HoleAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

// HoleAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };