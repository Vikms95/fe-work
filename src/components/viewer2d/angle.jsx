import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { GeometryUtils } from '../../utils/export';
import { _2_PI } from '../../constants';

const STYLE_ARC = { strokeWidth: 1, stroke: '#6386A1', fill: '#ffffff' };

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
  /*fontWeight: "bold", */

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none",   /* Chrome/Safari/Opera */
  MozUserSelect: "none",      /* Firefox */
  MsUserSelect: "none",       /* Internet Explorer/Edge */
  userSelect: "none"
};

export default function Angle({ cx, cy, radius, startAngle, endAngle, angle, dist }) {
  //let angle = Math.abs(endAngle - startAngle);
  //let angle_rad = (-angle / 2 - 90) * Math.PI / 180.0;xxx
  let medAngle = startAngle - 90 + angle / 2;
  let angle_rad = GeometryUtils.fixAngleRadNeg(medAngle * Math.PI / 180);
  let t_radius = dist + 10;
  let tx = cx + t_radius * Math.cos(angle_rad);
  let ty = cy + t_radius * Math.sin(angle_rad);
  let angle180 = startAngle + 180;

  while (angle180 > 360)
    angle180 -= 360;

  let middleAngle = endAngle - startAngle / 2;
  let arc =
    (angle < 180)
      ? <path d={GeometryUtils.describeArc(cx, cy, dist, startAngle, endAngle)} style={STYLE_ARC} />
      //: <g>
      //  <path d={GeometryUtils.describeArc(cx, cy, dist, startAngle, angle180)} style={STYLE_ARC} />
      //  <path d={GeometryUtils.describeArc(cx, cy, dist, angle180, endAngle)} style={STYLE_ARC} />
      //</g >;
      : <path d={GeometryUtils.describeArcArray(cx, cy, dist, [startAngle, angle180, endAngle])} style={STYLE_ARC} />;

  console.log(`arc (startangle: ${startAngle} endangle: ${endAngle} angle: ${angle} medAngle: ${medAngle})`)

  return <g>
    {/*<path d={GeometryUtils.describeArc(cx, cy, dist, startAngle, endAngle)} style={STYLE_ARC} />*/}
    {arc}
    <g transform={`translate(${tx}, ${ty}) rotate(0, 0, 0) `}>
      <text x="0" y="0" transform={`scale(1, -1)`} style={STYLE_TEXT}>{angle}º</text>
    </g>
  </g>;
}

Angle.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
};
