var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';

import { showMeasure } from '../../utils/changeUnit';
import { C_LINEASCOTA, C_COTA } from '../../constants';

var STYLE = {
  stroke: "#aaaaaa",
  strokeWidth: "1px"
};

var STYLE_TEXT = {
  stroke: "#aaaaaa",
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "Calibri",
  pointerEvents: "none",
  /*fontWeight: "bold",*/

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none", /* Chrome/Safari/Opera */
  MozUserSelect: "none", /* Firefox */
  MsUserSelect: "none", /* Internet Explorer/Edge */
  userSelect: "none"
};

export default function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform,
      upText = _ref.upText,
      scene = _ref.scene;


  var distanceText = showMeasure(length, unit) + ' ' + unit;
  var yText = upText ? -3 : 10;
  var style = _extends({}, STYLE);
  var style_text = _extends({}, STYLE_TEXT);
  var c_cota = scene.getIn(['prefs', C_COTA]);
  var c_lineas_cota = scene.getIn(['prefs', C_LINEASCOTA]);

  if (c_cota) style_text.stroke = c_cota;
  if (c_lineas_cota) style.stroke = c_lineas_cota;

  return React.createElement(
    'g',
    { transform: transform },
    React.createElement(
      'text',
      { x: length / 2, y: yText, transform: 'scale(1, -1)', style: style_text },
      distanceText
    ),
    React.createElement('line', { x1: '0', y1: '-5', x2: '0', y2: '5', style: style }),
    React.createElement('line', { x1: length, y1: '-5', x2: length, y2: '5', style: style }),
    React.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: style })
  );
}

Ruler.propTypes = {
  length: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  scene: PropTypes.object.isRequired,
  transform: PropTypes.string.isRequired,
  upText: PropTypes.bool
};

Ruler.defaultProps = {
  upText: true
};