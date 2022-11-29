import React from 'react';
import PropTypes from 'prop-types';

import { showMeasure } from '../../utils/changeUnit';
import { C_LINEASCOTA, C_COTA } from '../../constants';

const STYLE = {
  stroke: "#aaaaaa",
  strokeWidth: "1px"
};

const STYLE_TEXT = {
  stroke: "#aaaaaa",
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "Calibri",
  pointerEvents: "none",
  /*fontWeight: "bold",*/

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none",   /* Chrome/Safari/Opera */
  MozUserSelect: "none",      /* Firefox */
  MsUserSelect: "none",       /* Internet Explorer/Edge */
  userSelect: "none"
};


export default function Ruler({ length, unit, transform, upText, scene }) {

  let distanceText = `${showMeasure(length, unit)} ${unit}`;
  let yText = (upText) ? -3 : 10;
  let style = { ...STYLE };
  let style_text = { ...STYLE_TEXT };
  let c_cota = scene.getIn(['prefs', C_COTA]);
  let c_lineas_cota = scene.getIn(['prefs', C_LINEASCOTA]);

  if (c_cota)
    style_text.stroke = c_cota;
  if (c_lineas_cota)
    style.stroke = c_lineas_cota;

  return (
    <g transform={transform}>
      <text x={length / 2} y={yText} transform={`scale(1, -1)`} style={style_text}>{distanceText}</text>
      <line x1="0" y1="-5" x2="0" y2="5" style={style} />
      <line x1={length} y1="-5" x2={length} y2="5" style={style} />
      <line x1="0" y1="0" x2={length} y2="0" style={style} />
    </g>
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
