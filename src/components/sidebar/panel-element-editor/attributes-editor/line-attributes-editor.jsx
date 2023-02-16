import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PropertyLengthMeasure, PropertyNumber } from '../../../../catalog/properties/export';
import { Context } from '../../../../context/context';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '6em' };
const inputStyle = { textAlign: 'left' };

export default function LineAttributesEditor ( {
  mode,
  unit,
  state,
  element,
  attributeName,
  onUpdate,
  projectActions,
  attributeFormData,
  ...rest
} ) {

  const { translator } = useContext( Context );
  //let name = attributeFormData.has( 'name' ) ? attributeFormData.get( 'name' ) : element.name;
  //let vertexOne = attributeFormData.has( 'vertexOne' ) ? attributeFormData.get( 'vertexOne' ) : null;
  //let vertexTwo = attributeFormData.has( 'vertexTwo' ) ? attributeFormData.get( 'vertexTwo' ) : null;
  let lineLength = attributeFormData.has( 'lineLength' ) ? attributeFormData.get( 'lineLength' ) : null;
  let lineAngle = attributeFormData.has( 'lineAngle' ) ? attributeFormData.get( 'lineAngle' ) : null;

  if ( attributeName === 'lineLength' ) {

    return (
      <PropertyLengthMeasure
        mode={ mode }
        unit={ unit }
        stateRedux={ state }
        value={ lineLength }
        sourceElement={ element }
        attributeName={ attributeName }
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Ancho', min: 0, max: Infinity, precision: 2 } }
        onUpdate={ ( mapped, isEnter ) => onUpdate( attributeName, mapped, isEnter ) }
      />
    );
  } else if ( attributeName === 'lineAngle' ) {

    return (
      <PropertyNumber
        mode={ mode }
        state={ state }
        value={ lineAngle }
        sourceElement={ element }
        attributeName={ attributeName }
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Ángulo', min: 0, max: 360, precision: 0 } }
        onUpdate={ ( value, isEnter ) => onUpdate( attributeName, value, isEnter ) }
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

// LineAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };
