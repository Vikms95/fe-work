var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';

export default function AttributesEditor(_ref) {
  var unit = _ref.unit,
      mode = _ref.mode,
      state = _ref.state,
      element = _ref.element,
      onValid = _ref.onValid,
      position = _ref.position,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      rest = _objectWithoutProperties(_ref, ['unit', 'mode', 'state', 'element', 'onValid', 'position', 'onUpdate', 'attributeFormData']);

  switch (element.prototype) {
    case 'items':
      return React.createElement(ItemAttributesEditor, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'lines':
      return React.createElement(LineAttributesEditor, _extends({
        mode: mode,
        unit: unit,
        state: state,
        element: element,
        onValid: onValid,
        onUpdate: onUpdate,
        position: position,
        attributeFormData: attributeFormData
      }, rest));
    case 'holes':
      return React.createElement(HoleAttributesEditor, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        state: state,
        attributeFormData: attributeFormData
      }, rest));
    case 'areas':
      return null;
  }
  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};