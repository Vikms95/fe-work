import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormNumberInput from '../../../style/form-number-input';
import FormTextInput from '../../../style/form-text-input';

const tableStyle = { width: '100%' };
const firstTdStyle = { width: '4em' };
const inputStyle = { textAlign: 'center', width: '10em' };

export default function ItemAttributesEditor({ element, onUpdate, attributeFormData, state, ...rest }, { translator }) {
  let name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  let renderedX = attributeFormData.has('x') ? attributeFormData.get('x') : element.x;
  let renderedY = attributeFormData.has('y') ? attributeFormData.get('y') : element.y;
  let renderedR = attributeFormData.has('rotation') ? attributeFormData.get('rotation') : element.rotation;

  return null;
   /*( <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}>{translator.t('Name')}</td>
          <td>
            <FormTextInput
              value={name}
              onChange={event => onUpdate('name', event.target.value)}
              style={inputStyle}
            />
          </td>
        </tr>
        <tr>
          {*//*TODO: Hacer traduccion*//*}
          <td style={firstTdStyle}>Alto</td>
          <td>
            <FormNumberInput
              value={renderedX}
              onChange={event => onUpdate('x', event.target.value)}
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
        <tr>
          {*//*TODO: Hacer traduccion*//*}
          <td style={firstTdStyle}>Fondo</td>
          <td>
            <FormNumberInput
              value={renderedY}
              onChange={event => onUpdate('y', event.target.value)}
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
        <tr>
          {*//*TODO: Hacer traduccion*//*}
          <td style={firstTdStyle}>Angulo</td>
          <td>
            <FormNumberInput
              value={renderedR}
              onChange={event => onUpdate('rotation', event.target.value)}
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );*/
}

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

ItemAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
