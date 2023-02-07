import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { GeometryUtils } from '../../utils/export';
import { _2_PI } from '../../constants';

var STYLE_ARC = { strokeWidth: 1, stroke: '#6386A1', fill: '#ffffff' };

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
  /*fontWeight: "bold", */

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none", /* Chrome/Safari/Opera */
  MozUserSelect: "none", /* Firefox */
  MsUserSelect: "none", /* Internet Explorer/Edge */
  userSelect: "none"
};

export default function Angle(_ref) {
  var cx = _ref.cx,
      cy = _ref.cy,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      angle = _ref.angle,
      dist = _ref.dist;

  //let angle = Math.abs(endAngle - startAngle);
  //let angle_rad = (-angle / 2 - 90) * Math.PI / 180.0;xxx
  var medAngle = startAngle - 90 + angle / 2;
  var angle_rad = GeometryUtils.fixAngleRadNeg(medAngle * Math.PI / 180);
  var t_radius = dist + 10;
  var tx = cx + t_radius * Math.cos(angle_rad);
  var ty = cy + t_radius * Math.sin(angle_rad);
  var angle180 = startAngle + 180;

  while (angle180 > 360) {
    angle180 -= 360;
  }var middleAngle = endAngle - startAngle / 2;
  var arc = angle < 180 ? React.createElement('path', { d: GeometryUtils.describeArc(cx, cy, dist, startAngle, endAngle), style: STYLE_ARC })
  //: <g>
  //  <path d={GeometryUtils.describeArc(cx, cy, dist, startAngle, angle180)} style={STYLE_ARC} />
  //  <path d={GeometryUtils.describeArc(cx, cy, dist, angle180, endAngle)} style={STYLE_ARC} />
  //</g >;
  : React.createElement('path', { d: GeometryUtils.describeArcArray(cx, cy, dist, [startAngle, angle180, endAngle]), style: STYLE_ARC });

  console.log('arc (startangle: ' + startAngle + ' endangle: ' + endAngle + ' angle: ' + angle + ' medAngle: ' + medAngle + ')');

  return React.createElement(
    'g',
    null,
    arc,
    React.createElement(
      'g',
      { transform: 'translate(' + tx + ', ' + ty + ') rotate(0, 0, 0) ' },
      React.createElement(
        'text',
        { x: '0', y: '0', transform: 'scale(1, -1)', style: STYLE_TEXT },
        angle,
        '\xBA'
      )
    )
  );
}

Angle.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired
};