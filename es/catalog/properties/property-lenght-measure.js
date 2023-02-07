var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { UNIT_CENTIMETER } from './../../constants';
import convert from 'convert-units';
import { FormLabel, FormNumberInput } from '../../components/style/export';
import { Map } from 'immutable';
import { toFixedFloat } from '../../utils/math';
import PropertyStyle from './shared-property-style';
import { showMeasure } from './../../utils/changeUnit';

import * as SharedStyle from '../../shared-style';

var internalTableStyle = { borderCollapse: 'collapse' };
var secondTdStyle = { padding: 0 };
var unitContainerStyle = { width: '5em' };

export default function PropertyLengthMeasure(_ref, _ref2) {
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
  var _length = showMeasure(length, _unit) || value.get('_length');

  var hook = configs.hook,
      label = configs.label,
      configRest = _objectWithoutProperties(configs, ['hook', 'label']);

  var update = function update(lengthInput, unitInput, isEnter) {
    // It gets transformed to a float of 6 values
    var newLength = toFixedFloat(lengthInput);

    // Converts the value prop to an Immutable Map 
    var merged = value.merge({
      length: unitInput !== UNIT_CENTIMETER ?
      // Use the convert-units library to make sure the length is given in CM
      convert(newLength).from(unitInput).to(UNIT_CENTIMETER) : newLength,
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

  return React.createElement(
    'table',
    {
      className: 'PropertyLengthMeasure',
      style: _extends({}, PropertyStyle.tableStyle, { paddingBottom: '10px', marginLeft: '-3px' })
    },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: PropertyStyle.firstTdStyle },
          React.createElement(
            FormLabel,
            null,
            label
          )
        ),
        React.createElement(
          'td',
          { style: secondTdStyle },
          React.createElement(
            'table',
            { style: internalTableStyle },
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormNumberInput, _extends({
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
  value: PropTypes.oneOfType([PropTypes.instanceOf(Map).isRequired, PropTypes.number.isRequired]),
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object
};

// PropertyLengthMeasure.contextTypes = {
//   catalog: PropTypes.object.isRequired
// };