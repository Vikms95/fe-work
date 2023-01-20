import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import FormNumberInput from '../../../style/form-number-input';
import FormTextInput from '../../../style/form-text-input';
import { PropertyLengthMeasure } from '../../../../catalog/properties/export';
import { Context } from '../../../../context/context';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '4em' };
const inputStyle = { textAlign: 'center', width: '10em' };

export default function ItemAttributesEditor ( {
  element,
  onUpdate,
  position,
  attributeFormData,
  state,
  ...rest
} ) {

  const { translator, projectActions } = useContext( Context );

  let name = attributeFormData.has( 'name' ) ? attributeFormData.get( 'name' ) : element.name;
  let renderedX = attributeFormData.has( 'x' ) ? attributeFormData.get( 'x' ) : element.x;
  let renderedY = attributeFormData.has( 'y' ) ? attributeFormData.get( 'y' ) : element.y;
  let renderedR = attributeFormData.has( 'rotation' ) ? attributeFormData.get( 'rotation' ) : element.rotation;
  let itemDepth = attributeFormData.has( 'depth' ) && attributeFormData.get( 'depth' );
  let itemHeight = attributeFormData.has( 'height' ) && attributeFormData.get( 'height' );
  let isDepthAttribute = position === 1;
  let isHeightAttribute = position === 2;


  // return null;
  // }
  if ( isHeightAttribute ) {

    return (
      <PropertyLengthMeasure
        mode={ state.get( 'mode' ) }
        unit={ 'mm' }
        stateRedux={ state }
        value={ itemHeight }
        sourceElement={ element }
        attributeName='height'
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Alto', min: 0, max: Infinity, precision: 2 } }
        onUpdate={ ( mapped, isEnter ) => onUpdate( 'height', mapped, isEnter ) }
      />
    );

  } else if ( isDepthAttribute ) {
    return (
      <PropertyLengthMeasure
        mode={ state.get( 'mode' ) }
        unit={ 'mm' }
        stateRedux={ state }
        value={ itemDepth }
        sourceElement={ element }
        attributeName='depth'
        projectActions={ projectActions }
        attributeFormData={ attributeFormData }
        configs={ { label: 'Fondo', min: 0, max: Infinity, precision: 2 } }
        onUpdate={ ( mapped, isEnter ) => onUpdate( 'depth', mapped, isEnter ) }
      />
    );

  }
}

//todo old code
//   return (
//     <table style={ tableStyle }>
//       <tbody>
//         <tr>
//           <td style={ firstTdStyle }>Name</td>
//           <td>
//             <FormTextInput
//               value={ name }
//               onChange={ event => onUpdate( 'name', event.target.value ) }
//               style={ inputStyle }
//             />
//           </td>
//         </tr>
//         <tr>
//           <td style={ firstTdStyle }>Alto</td>
//           <td>
//             <FormNumberInput
//               value={ renderedX }
//               onChange={ event => onUpdate( 'x', event.target.value ) }
//               style={ inputStyle }
//               stateRedux={ state }
//               precision={ 2 }
//               { ...rest }
//             />
//           </td>
//         </tr>
//         <tr>
//           <td style={ firstTdStyle }>Fondo</td>
//           <td>
//             <FormNumberInput
//               value={ renderedY }
//               onChange={ event => onUpdate( 'y', event.target.value ) }
//               style={ inputStyle }
//               stateRedux={ state }
//               precision={ 2 }
//               { ...rest }
//             />
//           </td>
//         </tr>
//         <tr>
//           <td style={ firstTdStyle }>Angulo</td>
//           <td>
//             <FormNumberInput
//               value={ renderedR }
//               onChange={ event => onUpdate( 'rotation', event.target.value ) }
//               style={ inputStyle }
//               stateRedux={ state }
//               precision={ 2 }
//               { ...rest }
//             />
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

// ItemAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };
