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


const internalTableStyle = { borderCollapse: 'collapse' };
const secondTdStyle = { padding: 0 };
const unitContainerStyle = { width: '5em' };

export default function PropertyLengthMeasure (
  {
    unit,
    mode,
    state,
    value,
    onValid,
    configs,
    onUpdate,
    stateRedux,
    internalState,
    attributeName,
    sourceElement,
    projectActions,
    attributeFormData,
  }, { catalog } ) {

  let _unit = unit;
  let length = value.get( 'length' ) || 0;
  let _length = showMeasure( length, _unit ) || value.get( '_length' );

  let { hook, label, ...configRest } = configs;

  const update = ( lengthInput, unitInput, isEnter ) => {
    // It gets transformed to a float of 6 values
    let newLength = toFixedFloat( lengthInput );

    // Converts the value prop to an Immutable Map 
    let merged = value.merge( {
      length: ( unitInput !== UNIT_CENTIMETER )
        // Use the convert-units library to make sure the length is given in CM
        ? convert( newLength ).from( unitInput ).to( UNIT_CENTIMETER )
        : newLength,
      _length: lengthInput,
      _unit: unitInput
    } );

    //TODO What does this do? It does not seem to be used in any scenario
    if ( hook ) {
      return hook( merged, sourceElement, internalState, state ).then( val => {
        return onUpdate( val, isEnter );
      } );
    }

    return onUpdate( merged, isEnter );
  };

  return (
    <table
      className="PropertyLengthMeasure"
      style={ { ...PropertyStyle.tableStyle, paddingBottom: '10px', marginLeft: '-3px' } }
    >
      <tbody>
        <tr>

          <td style={ PropertyStyle.firstTdStyle }>

            <FormLabel>
              { label }
            </FormLabel>

          </td>

          <td style={ secondTdStyle }>
            <table style={ internalTableStyle }>
              <tbody>
                <tr>
                  <td>

                    <FormNumberInput
                      mode={ mode }
                      unit={ _unit }
                      state={ state }
                      value={ _length }
                      onValid={ onValid }
                      stateRedux={ stateRedux }
                      attributeName={ attributeName }
                      sourceElement={ sourceElement }
                      projectActions={ projectActions }
                      attributeFormData={ attributeFormData }
                      onChange={ event => update( event.target.value, _unit, event.target.isEnter ) }
                      { ...configRest }
                    />

                  </td>
                  {/* SELECT UNIDADES */ }
                  {/* <td style={unitContainerStyle}>
                      <FormSelect value={_unit} onChange={event => update(_length, event.target.value) }>
                  {
                    UNITS_LENGTH.map(el => <option key={el} value={el}>{el}</option>)
                  }
                </FormSelect>
              </td> */}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );

}

PropertyLengthMeasure.propTypes = {
  value: PropTypes.oneOfType( [
    PropTypes.instanceOf( Map ).isRequired,
    PropTypes.number.isRequired,
  ] ),
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
};

PropertyLengthMeasure.contextTypes = {
  catalog: PropTypes.object.isRequired
};
