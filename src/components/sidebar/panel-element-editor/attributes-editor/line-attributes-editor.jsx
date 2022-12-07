import React from 'react';
import PropTypes from 'prop-types';
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

  //let name = attributeFormData.has( 'name' ) ? attributeFormData.get( 'name' ) : element.name;
  //let vertexOne = attributeFormData.has( 'vertexOne' ) ? attributeFormData.get( 'vertexOne' ) : null;
  //let vertexTwo = attributeFormData.has( 'vertexTwo' ) ? attributeFormData.get( 'vertexTwo' ) : null;
  let lineLength = attributeFormData.has( 'lineLength' ) ? attributeFormData.get( 'lineLength' ) : null;
  let lineAngle = attributeFormData.has( 'lineAngle' ) ? attributeFormData.get( 'lineAngle' ) : null;
  const isLengthAttribute = () => position === 1;
  const isAngleAttribute = () => position === 2;

  // On element editor, line length was given position 1
  // and angle was given position 2
  if ( isLengthAttribute() ) {

    return (
      <PropertyLengthMeasure
        mode={ mode }
        unit={ unit }
        stateRedux={ state }
        value={ lineLength }
        sourceElement={ element }
        attributeName={ 'lineLength' }
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Ancho', min: 0, max: Infinity, precision: 2 } }
        onUpdate={ ( mapped, isEnter ) => onUpdate( 'lineLength', mapped, isEnter ) }
      />
    );
  } else if ( isAngleAttribute() ) {

    return (
      <PropertyNumber
        mode={ mode }
        state={ state }
        value={ lineAngle }
        attributeName='angulo'
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Ángulo', min: 0, max: 360, precision: 0 } }
        onUpdate={ ( value, isEnter ) => onUpdate( 'lineAngle', value, isEnter ) }
        { ...rest }
      />
    );
  }

  return <div></div>;


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
