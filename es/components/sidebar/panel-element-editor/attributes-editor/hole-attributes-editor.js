function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';
import { Context } from '../../../../context/context';

export default function HoleAttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var _useContext = useContext(Context),
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
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

// HoleAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };