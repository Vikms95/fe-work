'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Ruler;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _changeUnit = require('../../utils/changeUnit');

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function Ruler(_ref) {
  var length = _ref.length,
      unit = _ref.unit,
      transform = _ref.transform,
      upText = _ref.upText,
      scene = _ref.scene;


  var distanceText = (0, _changeUnit.showMeasure)(length, unit) + ' ' + unit;
  var yText = upText ? -3 : 10;
  var style = _extends({}, STYLE);
  var style_text = _extends({}, STYLE_TEXT);
  var c_cota = scene.getIn(['prefs', _constants.C_COTA]);
  var c_lineas_cota = scene.getIn(['prefs', _constants.C_LINEASCOTA]);

  if (c_cota) style_text.stroke = c_cota;
  if (c_lineas_cota) style.stroke = c_lineas_cota;

  return _react2.default.createElement(
    'g',
    { transform: transform },
    _react2.default.createElement(
      'text',
      { x: length / 2, y: yText, transform: 'scale(1, -1)', style: style_text },
      distanceText
    ),
    _react2.default.createElement('line', { x1: '0', y1: '-5', x2: '0', y2: '5', style: style }),
    _react2.default.createElement('line', { x1: length, y1: '-5', x2: length, y2: '5', style: style }),
    _react2.default.createElement('line', { x1: '0', y1: '0', x2: length, y2: '0', style: style })
  );
}

Ruler.propTypes = {
  length: _propTypes2.default.number.isRequired,
  unit: _propTypes2.default.string.isRequired,
  scene: _propTypes2.default.object.isRequired,
  transform: _propTypes2.default.string.isRequired,
  upText: _propTypes2.default.bool
};

Ruler.defaultProps = {
  upText: true
};