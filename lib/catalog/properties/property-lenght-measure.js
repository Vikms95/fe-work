'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PropertyLengthMeasure;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./../../constants');

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _export = require('../../components/style/export');

var _immutable = require('immutable');

var _math = require('../../utils/math');

var _sharedPropertyStyle = require('./shared-property-style');

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

var _changeUnit = require('./../../utils/changeUnit');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var internalTableStyle = { borderCollapse: 'collapse' };
var secondTdStyle = { padding: 0 };
var unitContainerStyle = { width: '5em' };

function PropertyLengthMeasure(_ref, _ref2) {
  var unit = _ref.unit,
      mode = _ref.mode,
      state = _ref.state,
      value = _ref.value,
      onValid = _ref.onValid,
      configs = _ref.configs,
      onUpdate = _ref.onUpdate,
      stateRedux = _ref.stateRedux,
      internalState = _ref.internalState,
      attributeName = _ref.attributeName,
      sourceElement = _ref.sourceElement,
      projectActions = _ref.projectActions,
      attributeFormData = _ref.attributeFormData;
  var catalog = _ref2.catalog;


  var _unit = unit;
  var length = value.get('length') || 0;
  var _length = (0, _changeUnit.showMeasure)(length, _unit) || value.get('_length');

  var hook = configs.hook,
      label = configs.label,
      configRest = _objectWithoutProperties(configs, ['hook', 'label']);

  var update = function update(lengthInput, unitInput, isEnter) {
    // It gets transformed to a float of 6 values
    var newLength = (0, _math.toFixedFloat)(lengthInput);

    // Converts the value prop to an Immutable Map 
    var merged = value.merge({
      length: unitInput !== _constants.UNIT_CENTIMETER ?
      // Use the convert-units library to make sure the length is given in CM
      (0, _convertUnits2.default)(newLength).from(unitInput).to(_constants.UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });

    //TODO What does this do? It does not seem to be used in any scenario
    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(function (val) {
        return onUpdate(val, isEnter);
      });
    }

    return onUpdate(merged, isEnter);
  };

  return _react2.default.createElement(
    'table',
    {
      className: 'PropertyLengthMeasure',
      style: _extends({}, _sharedPropertyStyle2.default.tableStyle, { paddingBottom: '10px', marginLeft: '-3px' })
    },
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
            label
          )
        ),
        _react2.default.createElement(
          'td',
          { style: secondTdStyle },
          _react2.default.createElement(
            'table',
            { style: internalTableStyle },
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormNumberInput, _extends({
                    mode: mode,
                    unit: _unit,
                    state: state,
                    value: _length,
                    onValid: onValid,
                    stateRedux: stateRedux,
                    attributeName: attributeName,
                    sourceElement: sourceElement,
                    projectActions: projectActions,
                    attributeFormData: attributeFormData,
                    onChange: function onChange(event) {
                      return update(event.target.value, _unit, event.target.isEnter);
                    }
                  }, configRest))
                )
              )
            )
          )
        )
      )
    )
  );
}

PropertyLengthMeasure.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_immutable.Map).isRequired, _propTypes2.default.number.isRequired]),
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object
};

// PropertyLengthMeasure.contextTypes = {
//   catalog: PropTypes.object.isRequired
// };