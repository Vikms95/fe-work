var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useState } from 'react';
import * as SharedStyle from '../../shared-style';

var STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.PRIMARY_COLOR.input,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px'
};

export default function FormTextInput(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, ['style']);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var textInputStyle = _extends({}, STYLE_INPUT, style);

  if (focus) textInputStyle.border = '1px solid ' + SharedStyle.SECONDARY_COLOR.main;

  return React.createElement('input', _extends({
    type: 'text',
    style: textInputStyle,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest));
}

// export default class FormTextInput extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { focus: false };
//   }

//   render() {
//     let { style, ...rest } = this.props;

//     let textInputStyle = { ...STYLE_INPUT, ...style };
//     if (this.state.focus) textInputStyle.border = `1px solid ${SharedStyle.SECONDARY_COLOR.main}`;

//     return <input
//       onFocus={e => this.setState({ focus: true })}
//       onBlur={e => this.setState({ focus: false })}
//       style={textInputStyle}
//       type="text"
//       {...rest}
//     />
//   }
// }

FormTextInput.defaultProps = {
  style: {}
};