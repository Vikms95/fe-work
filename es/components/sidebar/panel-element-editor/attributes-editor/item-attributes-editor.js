function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import FormNumberInput from '../../../style/form-number-input';
import FormTextInput from '../../../style/form-text-input';
import { Context } from '../../../../context/context';

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '4em' };
var inputStyle = { textAlign: 'center', width: '10em' };

export default function ItemAttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var _useContext = useContext(Context),
      translator = _useContext.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var renderedX = attributeFormData.has('x') ? attributeFormData.get('x') : element.x;
  var renderedY = attributeFormData.has('y') ? attributeFormData.get('y') : element.y;
  var renderedR = attributeFormData.has('rotation') ? attributeFormData.get('rotation') : element.rotation;

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
         {*/ /*TODO: Hacer traduccion*/ /*}
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
                                        {*/ /*TODO: Hacer traduccion*/ /*}
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
                                                                       {*/ /*TODO: Hacer traduccion*/ /*}
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

// ItemAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };