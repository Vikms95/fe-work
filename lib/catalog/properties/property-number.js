'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PropertyNumber;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../components/style/export');

var _sharedPropertyStyle = require('./shared-property-style');

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyNumber(_ref) {
  var mode = _ref.mode,
      state = _ref.state,
      value = _ref.value,
      onValid = _ref.onValid,
      configs = _ref.configs,
      onUpdate = _ref.onUpdate,
      attributeName = _ref.attributeName,
      internalState = _ref.internalState,
      sourceElement = _ref.sourceElement,
      projectActions = _ref.projectActions,
      attributeFormData = _ref.attributeFormData;


  var update = function update(val, isEnter) {
    //makes sure this is a number
    var number = parseFloat(val);

    // if no number, conver it to 0
    if (isNaN(number)) {
      number = 0;
    }

    //TODO What does this do?
    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val, isEnter);
      });
    }

    return onUpdate(number, isEnter);
  };

  return _react2.default.createElement(
    'table',
    {
      className: 'PropertyNumber',
      style: _extends({}, _sharedPropertyStyle2.default.tableStyle, { paddingBottom: '10px', marginLeft: '-3px' }) },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: _sharedPropertyStyle2.default.firstTdStyle },
          _react2.default.createElement(
            _export.FormLabel,
            null,
            configs.label
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_export.FormNumberInput, {
            mode: mode,
            value: value,
            min: configs.min,
            onValid: onValid,
            max: configs.max,
            stateRedux: state,
            attributeName: attributeName,
            sourceElement: sourceElement,
            projectActions: projectActions,
            attributeFormData: attributeFormData,
            onChange: function onChange(event) {
              return update(event.target.value, event.target.isEnter);
            }
          })
        )
      )
    )
  );
}

PropertyNumber.propTypes = {
  value: _propTypes2.default.any.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};