var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import * as SharedStyle from './../../shared-style';

var BASE_STYLE = {
  display: "block",
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master
  /*fontWeight: 'bold',*/
};

export default function FormLabel(_ref) {
  var children = _ref.children,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ['children', 'style']);

  return React.createElement(
    'label',
    _extends({ style: _extends({}, BASE_STYLE, { style: style }) }, rest),
    children
  );
}