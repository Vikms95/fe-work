'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Angle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _export = require('../../utils/export');

var _constants = require('../../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function Angle(_ref) {
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
  var angle_rad = _export.GeometryUtils.fixAngleRadNeg(medAngle * Math.PI / 180);
  var t_radius = dist + 10;
  var tx = cx + t_radius * Math.cos(angle_rad);
  var ty = cy + t_radius * Math.sin(angle_rad);
  var angle180 = startAngle + 180;

  while (angle180 > 360) {
    angle180 -= 360;
  }var middleAngle = endAngle - startAngle / 2;
  var arc = angle < 180 ? _react2.default.createElement('path', { d: _export.GeometryUtils.describeArc(cx, cy, dist, startAngle, endAngle), style: STYLE_ARC })
  //: <g>
  //  <path d={GeometryUtils.describeArc(cx, cy, dist, startAngle, angle180)} style={STYLE_ARC} />
  //  <path d={GeometryUtils.describeArc(cx, cy, dist, angle180, endAngle)} style={STYLE_ARC} />
  //</g >;
  : _react2.default.createElement('path', { d: _export.GeometryUtils.describeArcArray(cx, cy, dist, [startAngle, angle180, endAngle]), style: STYLE_ARC });

  console.log('arc (startangle: ' + startAngle + ' endangle: ' + endAngle + ' angle: ' + angle + ' medAngle: ' + medAngle + ')');

  return _react2.default.createElement(
    'g',
    null,
    arc,
    _react2.default.createElement(
      'g',
      { transform: 'translate(' + tx + ', ' + ty + ') rotate(0, 0, 0) ' },
      _react2.default.createElement(
        'text',
        { x: '0', y: '0', transform: 'scale(1, -1)', style: STYLE_TEXT },
        angle,
        '\xBA'
      )
    )
  );
}

Angle.propTypes = {
  cx: _propTypes2.default.number.isRequired,
  cy: _propTypes2.default.number.isRequired,
  radius: _propTypes2.default.number.isRequired,
  angle: _propTypes2.default.number.isRequired,
  startAngle: _propTypes2.default.number.isRequired,
  endAngle: _propTypes2.default.number.isRequired
};