import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormNumberInput, FormTextInput } from '../../../style/export';
import { PropertyLengthMeasure, PropertyNumber } from '../../../../catalog/properties/export';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };
const inputStyle = { textAlign: 'left' };

export default function LineAttributesEditor (
  {
    mode,
    unit,
    state,
    element,
    position,
    onUpdate,
    projectActions,
    attributeFormData,
    ...rest
  }, { translator } ) {

  let name = attributeFormData.has( 'name' ) ? attributeFormData.get( 'name' ) : element.name;
  let vertexOne = attributeFormData.has( 'vertexOne' ) ? attributeFormData.get( 'vertexOne' ) : null;
  let vertexTwo = attributeFormData.has( 'vertexTwo' ) ? attributeFormData.get( 'vertexTwo' ) : null;
  let lineLength = attributeFormData.has( 'lineLength' ) ? attributeFormData.get( 'lineLength' ) : null;
  let lineAngle = attributeFormData.has( 'lineAngle' ) ? attributeFormData.get( 'lineAngle' ) : null;

  if ( position === 1 ) {
    return (
      <div>
        <PropertyLengthMeasure
          mode={ mode }
          unit={ unit }
          stateRedux={ state }
          value={ lineLength }
          sourceElement={ element }
          attributeName={ 'lineLength' }
          projectActions={ projectActions }
          configs={ { label: 'Ancho', min: 0, max: Infinity, precision: 2 } }
          onUpdate={ ( mapped, isEnter ) => onUpdate( 'lineLength', mapped, isEnter ) }
        />
      </div>
    );
  } else if ( position === 2 ) {
    return <div >
      <PropertyNumber
        mode={ mode }
        state={ state }
        value={ lineAngle }
        attributeFormData={ attributeFormData }
        attributeName='angulo'
        projectActions={ projectActions }
        configs={ { label: 'Ángulo', min: 0, max: 360, precision: 0 } }
        onUpdate={ ( value, isEnter ) => onUpdate( 'lineAngle', value, isEnter ) }
        { ...rest }
      />
    </div >;
  } else {
    return <div></div>;
  }


}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
