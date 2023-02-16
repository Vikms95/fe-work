import React from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';


export default function AttributesEditor ( {
  unit,
  mode,
  state,
  element,
  onValid,
  position,
  onUpdate,
  attributeFormData,
  ...rest
} ) {

  switch ( element.prototype ) {
    case 'items':
      return <ItemAttributesEditor
        state={ state }
        element={ element }
        onUpdate={ onUpdate }
        onValid={ onValid }
        position={ position }
        attributeFormData={ attributeFormData }
        { ...rest }
      />;
    case 'lines':
      return <LineAttributesEditor
        mode={ mode }
        unit={ unit }
        state={ state }
        element={ element }
        onValid={ onValid }
        onUpdate={ onUpdate }
        position={ position }
        attributeFormData={ attributeFormData }
        { ...rest }
      />;
    case 'holes':
      return <HoleAttributesEditor
        element={ element }
        onUpdate={ onUpdate }
        onValid={ onValid }
        state={ state }
        attributeFormData={ attributeFormData }
        { ...rest }
      />;
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