import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, FormNumberInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyNumber (
  {
    mode,
    state,
    value,
    onValid,
    configs,
    onUpdate,
    attributeName,
    internalState,
    sourceElement,
    projectActions,
    attributeFormData,
  } ) {

  let update = ( val, isEnter ) => {
    let number = parseFloat( val );

    if ( isNaN( number ) ) {
      number = 0;
    }

    //TODO What does this do?
    if ( configs.hook ) {
      return configs.hook( number, sourceElement, internalState, state ).then( _val => {
        return onUpdate( _val, isEnter );
      } );
    }

    return onUpdate( number, isEnter );
  };

  return (
    <table
      className="PropertyNumber"
      style={ { ...PropertyStyle.tableStyle, paddingBottom: '10px', marginLeft: '-3px' } }>
      <tbody>
        <tr>
          <td style={ PropertyStyle.firstTdStyle }>
            <FormLabel>
              { configs.label }
            </FormLabel>
          </td>
          <td>
            <FormNumberInput
              mode={ mode }
              value={ value }
              min={ configs.min }
              onValid={ onValid }
              max={ configs.max }
              stateRedux={ state }
              attributeName={ attributeName }
              projectActions={ projectActions }
              attributeFormData={ attributeFormData }
              onChange={ event => update( event.target.value, event.target.isEnter ) }
            />
          </td>
        </tr>
      </tbody>
    </table>
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
