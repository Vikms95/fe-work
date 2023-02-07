'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Line;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../utils/export');

var _ruler = require('./ruler');

var _ruler2 = _interopRequireDefault(_ruler);

var _angle = require('./angle');

var _angle2 = _interopRequireDefault(_angle);

var _export2 = require('../../class/export');

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(_ref) {
  var line = _ref.line,
      layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;

  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id || _export.GeometryUtils.samePoints(vertex0, vertex1)) return null; //avoid 0-length lines

  var thickness = line.getIn(['properties', 'thickness', 'length']);
  var v2First = line.v2First;
  var x1 = vertex0.x,
      y1 = vertex0.y;
  var x2 = vertex1.x,
      y2 = vertex1.y;

  var v0 = !v2First ? vertex0 : vertex1;
  var v1 = !v2First ? vertex1 : vertex0;
  //let v2 = line.vertices.has(2) ? layer.vertices.get(line.vertices.get(2)) : vertex0;
  //let v3 = line.vertices.has(3) ? layer.vertices.get(line.vertices.get(3)) : vertex1;

  var _CL_LINE$createVertex = _export2.Line.createVertexAndVectorsB(x1, y1, x2, y2, v2First, thickness),
      v2 = _CL_LINE$createVertex.vv2,
      v3 = _CL_LINE$createVertex.vv3;

  if (!v2 || !v3) {
    v2 = vertex0;
    v3 = vertex1;
  }

  var pr = !v2First ? v2 : v3;

  if (x1 > x2) {
    x1 = vertex1.x;
    y1 = vertex1.y;
    x2 = vertex0.x;
    y2 = vertex0.y;

    pr = !v2First ? v3 : v2;
  }

  var length = _export.GeometryUtils.pointsDistance(x1, y1, x2, y2);
  var angle = _export.GeometryUtils.angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2);
  var v = _export.GeometryUtils.diffVector(v1, v3);
  var u = _export.GeometryUtils.normalizeVector(v);

  var renderedHoles = line.holes.map(function (holeID) {
    var hole = layer.holes.get(holeID);
    var startAt = length * hole.offset;
    var renderedHole = catalog.getElement(hole.type).render2D(hole, layer, scene);

    return _react2.default.createElement(
      'g',
      {
        key: holeID,
        transform: 'translate(' + startAt + ', 0)',
        'data-element-root': true,
        'data-prototype': hole.prototype,
        'data-id': hole.id,
        'data-selected': hole.selected,
        'data-layer': layer.id
      },
      renderedHole
    );
  });

  var half_thickness = thickness / 2;
  var ur = _export.GeometryUtils.multScalarVector(half_thickness + 5, u);
  var vr = _export.GeometryUtils.addVector(pr, ur);
  var u_angle = _export.GeometryUtils.angleVector(u);

  var dist = 20;
  var l_angle = _export2.Line.getAngleAndArcL11L20_pcl(layer, line, dist);
  var verAngulos = scene.getIn(['prefs', _constants.VERANGULOS]);
  var ver90 = scene.getIn(['prefs', _constants.VER90]);
  //console.log(`line.jsx l_angle : ${l_angle}`)
  var arc = verAngulos && l_angle && (ver90 || l_angle.angle % 90 != 0) ? _react2.default.createElement(_angle2.default, { cx: l_angle.cx, cy: l_angle.cy, radius: l_angle.radius, startAngle: l_angle.startAngle, endAngle: l_angle.endAngle, angle: l_angle.angle, dist: dist }) : null;
  //let arc = null;

  //console.log(`line.jsx: u_angle : ${u_angle}`);

  var renderedLine = catalog.getElement(line.type).render2D(line, layer, scene);
  //let renderedRuler = line.selected ?
  //  <Ruler unit={scene.unit} length={length} transform={`translate(0, ${half_thickness + 10} )`} /> : null;
  //let renderedRuler =
  //  <Ruler unit={scene.unit} length={length} transform={`translate(0, ${half_thickness + 10} )`} /> ;
  // u_angle == 0 => para evitar: Si haces un resctángulo en las paredes, la cota de la derecha se queda por dentro
  var renderedRuler =
  /*<Ruler unit={scene.unit} upText={u.y > 0} length={length} transform={`translate(${vr.x}, ${vr.y} ) rotate(${angle}, 0, 0) `} />;*/
  _react2.default.createElement(_ruler2.default, { scene: scene, unit: scene.unit, upText: u_angle >= 0 && u_angle <= Math.PI, length: length, transform: 'translate(' + vr.x + ', ' + vr.y + ' ) rotate(' + angle + ', 0, 0) ' });

  //console.log(`line.jsx: u.x: ${u.x} u.y: ${u.y} u_angle: ${u_angle}`);

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(
      'g',
      {
        'data-element-root': true,
        'data-prototype': line.prototype,
        'data-id': line.id,
        'data-selected': line.selected,
        'data-layer': layer.id,
        style: line.selected ? { cursor: 'move' } : {}
      },
      renderedRuler,
      renderedLine,
      arc
    ),
    _react2.default.createElement(
      'g',
      {
        transform: 'translate(' + x1 + ', ' + y1 + ') rotate(' + angle + ', 0, 0)',
        'data-element-root': true,
        'data-prototype': line.prototype,
        'data-id': line.id,
        'data-selected': line.selected,
        'data-layer': layer.id,
        style: line.selected ? { cursor: 'move' } : {}
      },
      renderedHoles
    )
  );

  //return (
  //  <g>
  //    <g
  //      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)` }
  //      data-element-root
  //      data-prototype={line.prototype}
  //      data-id={line.id}
  //      data-selected={line.selected}
  //      data-layer={layer.id}
  //      style={line.selected ? { cursor: 'move' } : {}}
  //    >
  //      {renderedRuler}
  //      {renderedLine}
  //      {renderedHoles}
  //    </g>
  //    {renderedHoles}
  //  </g >
  //);
}

Line.propTypes = {
  line: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};