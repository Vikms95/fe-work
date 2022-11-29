import React from 'react';
import PropTypes from 'prop-types';
import { UNITS_LENGTH, UNIT_CENTIMETER } from './../../constants';
import convert from 'convert-units';
import { FormLabel, FormNumberInput, FormSelect } from '../../components/style/export';
import { Map } from 'immutable';
import { toFixedFloat } from '../../utils/math';
import PropertyStyle from './shared-property-style';
import { showMeasure } from './../../utils/changeUnit';

import * as SharedStyle from '../../shared-style';

import flecha from './../../assets/generalItems/flecha.png';

const internalTableStyle = { borderCollapse: 'collapse' };
const secondTdStyle = { padding: 0 };
const unitContainerStyle = { width: '5em' };

export default function PropertyLengthMeasure ( { value, onUpdate, onValid, configs, sourceElement, internalState, state, stateRedux, attributeName, mode, unit, projectActions }, { catalog } ) {

  let _unit = unit;
  let length = value.get( 'length' ) || 0;
  /*let _length = value.get('_length') || length;*/
  let _length = showMeasure( length, _unit ) || value.get( '_length' );

  /*let _unit = value.get('_unit') || UNIT_CENTIMETER;*/


  let { hook, label, ...configRest } = configs;

  let update = ( lengthInput, unitInput, isEnter ) => {
    let newLength = toFixedFloat( lengthInput );

    let merged = value.merge( {
      length: unitInput !== UNIT_CENTIMETER ? convert( newLength ).from( unitInput ).to( UNIT_CENTIMETER ) : newLength,
      _length: lengthInput,
      _unit: unitInput
    } );

    if ( hook ) {
      return hook( merged, sourceElement, internalState, state ).then( val => {
        return onUpdate( val, isEnter );
      } );
    }

    return onUpdate( merged, isEnter );
  };

  return (
    <table className="PropertyLengthMeasure" style={ { ...PropertyStyle.tableStyle, paddingBottom: '10px', marginLeft: '-3px' } }>
      <tbody>
        <tr>
          <td style={ PropertyStyle.firstTdStyle }><FormLabel>{ label }</FormLabel></td>
          <td style={ secondTdStyle }>
            <table style={ internalTableStyle }>
              <tbody>
                <tr>
                  <td>
                    <FormNumberInput
                      value={ _length }
                      onChange={ event => update( event.target.value, _unit, event.target.isEnter ) }
                      onValid={ onValid }
                      unit={ _unit }
                      attributeName={ attributeName }
                      mode={ mode }
                      projectActions={ projectActions }
                      state={ state }
                      stateRedux={ stateRedux }
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
