'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridHorizontalStreak;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GridHorizontalStreak(_ref) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      grid = _ref.grid;


  // Se divide entre 10 para pasarlo a cm
  var rejillaTotal = state.getIn(['prefs', 'T/REJILLATOTAL2D']) / 10;
  var step = state.getIn(['prefs', 'T/REJILLA2D']) / 10 / 5;

  // 10 = 500
  // 20 = 1000
  // 2 = 100
  /*let step = grid.properties.get('step');*/

  var colors = void 0;

  if (grid.properties.has('color')) {
    colors = new _immutable.List([grid.properties.get('color')]);
  } else {
    colors = grid.properties.get('colors');
  }

  var rendered = [];
  var i = 0;
  for (var y = 0; y <= rejillaTotal; y += step) {
    var color = colors.get(i % colors.size);

    i++;
    rendered.push(_react2.default.createElement('line', { key: y, x1: '0', y1: y, x2: rejillaTotal, y2: y, strokeWidth: '1', stroke: color }));
  }

  return _react2.default.createElement(
    'g',
    null,
    rendered
  );
}

GridHorizontalStreak.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  grid: _propTypes2.default.object.isRequired
};