var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, FormNumberInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyNumber(_ref) {
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

  return React.createElement(
    'table',
    {
      className: 'PropertyNumber',
      style: _extends({}, PropertyStyle.tableStyle, { paddingBottom: '10px', marginLeft: '-3px' }) },
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
            configs.label
          )
        ),
        React.createElement(
          'td',
          null,
          React.createElement(FormNumberInput, {
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
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};