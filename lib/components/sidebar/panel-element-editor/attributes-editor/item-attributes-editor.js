'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemAttributesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formNumberInput = require('../../../style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formTextInput = require('../../../style/form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

var _context = require('../../../../context/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '4em' };
var inputStyle = { textAlign: 'center', width: '10em' };

function ItemAttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var _useContext = (0, _react.useContext)(_context.Context),
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
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

// ItemAttributesEditor.contextTypes = {
//   translator: PropTypes.object.isRequired,
// };