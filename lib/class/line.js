'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _export = require('./export');

var _export2 = require('../utils/export');

var _constants = require('../constants');

var _selectors = require('../selectors/selectors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cthicknessDefault = 20;

var Line = function () {
  function Line() {
    _classCallCheck(this, Line);
  }

  _createClass(Line, null, [{
    key: 'isHasAreaFromLine',
    value: function isHasAreaFromLine(state, layerID, line) {
      var areas = state.getIn(['scene', 'layers', layerID, 'areas']);
      var vertex0ID = line.vertices.get(0);
      var hasArea = false;

      areas.forEach(function (area) {
        area.vertices.forEach(function (vertex) {
          hasArea |= vertex == vertex0ID;
        });
      });

      return hasArea;
    }
  }, {
    key: 'isHasArea',
    value: function isHasArea(state, layerID, lineID) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      return isHasAreaFromLine(state, layerID, line);
    }
    // ret => 1 (line1ID+line2ID), -1 => (line2ID+line1ID), 0=> no unido

  }, {
    key: 'isLinesJoin',
    value: function isLinesJoin(state, layerID, line1ID, line2ID) {
      var v2First1 = state.getIn(['scene', 'layers', layerID, 'lines', line1ID, 'v2First']) || false;
      var v2First2 = state.getIn(['scene', 'layers', layerID, 'lines', line2ID, 'v2First']) || false;
      var vertex11Id = state.getIn(['scene', 'layers', layerID, 'lines', line1ID, 'vertices', !v2First1 ? 1 : 0]);
      var vertex20Id = state.getIn(['scene', 'layers', layerID, 'lines', line2ID, 'vertices', !v2First2 ? 0 : 1]);
      var vertex11 = state.getIn(['scene', 'layers', layerID, 'vertices', vertex11Id]);
      var vertex20 = state.getIn(['scene', 'layers', layerID, 'vertices', vertex20Id]);

      if (vertex11.id == vertex20.id || _export2.GeometryUtils.samePoints(vertex11, vertex20)) return 1;

      var vertex21Id = state.getIn(['scene', 'layers', layerID, 'lines', line1ID, 'vertices', !v2First1 ? 0 : 1]);
      var vertex10Id = state.getIn(['scene', 'layers', layerID, 'lines', line2ID, 'vertices', !v2First2 ? 1 : 0]);
      var vertex21 = state.getIn(['scene', 'layers', layerID, 'vertices', vertex21Id]);
      var vertex10 = state.getIn(['scene', 'layers', layerID, 'vertices', vertex10Id]);

      if (vertex21.id == vertex10.id || _export2.GeometryUtils.samePoints(vertex21, vertex10)) return -1;

      return 0;
    }
  }, {
    key: 'getLine01',
    value: function getLine01(v, lineID) {
      var line01ID = v.lines.find(function (id) {
        return id != lineID;
      });
      return line01ID;
    }
  }, {
    key: 'getLines0_1_pcl',
    value: function getLines0_1_pcl(layer, line) {
      var v2First = line.v2First || false;
      var v0ID = line.vertices.get(!v2First ? 0 : 1);
      var v1ID = line.vertices.get(!v2First ? 1 : 0);
      var vertices = layer.vertices;
      var v0 = vertices.get(v0ID);
      var v1 = vertices.get(v1ID);
      var line0ID = Line.getLine01(v0, line.id);
      var line1ID = Line.getLine01(v1, line.id);

      return { line0ID: line0ID, line1ID: line1ID };
    }
  }, {
    key: 'getLine2IDV0_pcl',
    value: function getLine2IDV0_pcl(layer, line) {
      var v2First1 = line.v2First || false;
      var v10ID = line.vertices.get(!v2First1 ? 0 : 1);
      var vertices = layer.vertices;
      var v10 = vertices.get(v10ID);
      var line2ID = Line.getLine01(v10, line.id);

      return line2ID;
    }
  }, {
    key: 'getAngleV0_pcl',
    value: function getAngleV0_pcl(layer, line) {
      var v2First1 = line.v2First || false;
      var v10ID = line.vertices.get(!v2First1 ? 0 : 1);
      var v11ID = line.vertices.get(!v2First1 ? 1 : 0);
      var vertices = layer.vertices;

      if (!vertices) return;

      var v10 = vertices.get(v10ID);
      var v11 = vertices.get(v11ID);
      var line2ID = Line.getLine01(v10, line.id);

      if (line2ID) {
        var line2 = layer.lines.get(line2ID);
        var l_angle = Line.getAngleAndArcL11L20_pcl(layer, line2, 1);

        if (l_angle != null) return {
          angle_rad: l_angle.angle_rad,
          angle: l_angle.angle
        };
      }

      var u = _export2.GeometryUtils.diffVector(v10, v11);
      var angle_u = _export2.GeometryUtils.fixAngleRadNeg(_constants.PI_2 - _export2.GeometryUtils.angleVector(u));

      return {
        angle_rad: angle_u,
        angle: Math.round(angle_u * 180 / Math.PI)
      };
    }
  }, {
    key: 'getAngleRadV0ByAngle_pcl',
    value: function getAngleRadV0ByAngle_pcl(layer, line, angleDegree) {
      var lineIDV0 = Line.getLine2IDV0_pcl(layer, line);
      var angleRad = angleDegree * Math.PI / 180;

      if (!lineIDV0) return _constants.PI_2 - angleRad;

      var line0 = layer.lines.get(lineIDV0);
      var v2First1 = line0.v2First || false;
      var v10ID = line0.vertices.get(!v2First1 ? 0 : 1);
      var v11ID = line0.vertices.get(!v2First1 ? 1 : 0);
      var vertices = layer.vertices;
      var v10 = vertices.get(v10ID);
      var v11 = vertices.get(v11ID);
      var u1 = _export2.GeometryUtils.diffVector(v11, v10);
      var angle_u1 = _export2.GeometryUtils.angleVector(u1);
      var startAngle = _export2.GeometryUtils.fixAngleRadNeg(angle_u1);

      return startAngle + angleRad;
    }
  }, {
    key: 'getAngleAndArcL11L20_pcl',
    value: function getAngleAndArcL11L20_pcl(layer, line, dist) {
      var vertices = layer.vertices;
      var v2First1 = line.v2First || false;
      var v10ID = line.vertices.get(!v2First1 ? 0 : 1);
      var v11ID = line.vertices.get(!v2First1 ? 1 : 0);
      var v10 = vertices.get(v10ID);
      var v11 = vertices.get(v11ID);
      var line2ID = Line.getLine01(v11, line.id);

      if (!line2ID) return null;
      var line2 = layer.lines.get(line2ID);

      if (!line2) return null;

      var v2First2 = line2.v2First || false;
      var v20ID = line2.vertices.get(!v2First2 ? 0 : 1);
      var v21ID = line2.vertices.get(!v2First2 ? 1 : 0);
      var v20 = vertices.get(v20ID);
      var v21 = vertices.get(v21ID);
      var u1 = _export2.GeometryUtils.diffVector(v11, v10);
      var u2 = _export2.GeometryUtils.diffVector(v20, v21);
      var angle_u1 = _export2.GeometryUtils.angleVector(u1);
      //let u11 = GeometryUtils.diffVector(v10, v11);
      //let u22 = GeometryUtils.diffVector(v21, v20);
      //let angle = GeometryUtils.fixAngleRadNeg(GeometryUtils.angleVectors(u11, u22));
      var startAngle = _export2.GeometryUtils.fixAngleRadNeg(angle_u1 + _constants.PI_2);
      var endAngle = _export2.GeometryUtils.fixAngleRadNeg(_export2.GeometryUtils.angleVector(u2) + _constants.PI_2);
      //let endAngle = GeometryUtils.fixAngleRadNeg(startAngle + angle)
      var angle = startAngle <= endAngle ? endAngle - startAngle : _constants._2_PI - startAngle + endAngle;

      //let angle = endAngle - startAngle;
      var radius = dist / 2 * Math.tan(angle / 2);

      return {
        cx: v20.x, cy: v20.y,
        radius: radius,
        angle_rad: angle,
        angle: Math.round(angle * 180 / Math.PI),
        startAngle: Math.round(startAngle * 180 / Math.PI),
        endAngle: Math.round(endAngle * 180 / Math.PI)
      };
    }
  }, {
    key: 'createVertexAndVectorsB',
    value: function createVertexAndVectorsB(x0, y0, x1, y1, v2First, thickness) {
      var v00 = { x: x0, y: y0 };
      var v11 = { x: x1, y: y1 };
      var v0 = !v2First ? v00 : v11;
      var v1 = !v2First ? v11 : v00;
      var v = _export2.GeometryUtils.diffVector(v0, v1);

      if (v.x == 0 && v.y == 0) v.x = 0.1;

      var vu = _export2.GeometryUtils.normalizeVector(v);
      var u = _export2.GeometryUtils.orthoVector(vu);
      var unew = _export2.GeometryUtils.multScalarVector(thickness, u);
      var v2 = _export2.GeometryUtils.addVector(v0, unew);
      var v3 = _export2.GeometryUtils.addVector(v1, unew);

      return { vv2: v2, vv3: v3, vu: vu, u: u, unew: unew };
    }
  }, {
    key: 'cacheFondo',
    value: function cacheFondo(state, fondo) {
      state = (0, _selectors.setCacheFondo)(state, fondo);
      return { updatedState: state };
    }
  }, {
    key: 'cacheAlto',
    value: function cacheAlto(state, alto) {
      state = (0, _selectors.setCacheAlto)(state, alto);
      return { updatedState: state };
    }
  }, {
    key: 'cacheAngulo',
    value: function cacheAngulo(state, angulo) {
      state = (0, _selectors.setCacheAngulo)(state, angulo);
      return { updatedState: state };
    }
  }, {
    key: 'create',
    value: function create(state, layerID, type, x0, y0, x1, y1, properties, argsEx) {
      var p = (0, _immutable.fromJS)(properties || {});
      var alto = (0, _selectors.getCacheAlto)(state) || (0, _selectors.getPrefsAlto)(state);
      var fondo = (0, _selectors.getCacheFondo)(state) || (0, _selectors.getPrefsFondo)(state);

      if (alto) {
        p = p.set('height', new _immutable.Map({ length: alto / 10 /*, unit: 'mm'*/ }));
      }
      if (fondo) {
        p = p.set('thickness', new _immutable.Map({ length: fondo / 10 /*, unit: 'mm'*/ }));
      }

      var a = argsEx || {};
      var lineID = _export2.IDBroker.acquireID();
      var v2First = a.v2First || false;

      var _createVertexAndVecto = this.createVertexAndVectorsB(x0, y0, x1, y1, v2First, cthicknessDefault),
          vv2 = _createVertexAndVecto.vv2,
          vv3 = _createVertexAndVecto.vv3;

      var _Vertex$add = _export.Vertex.add(state, layerID, x0, y0, 'lines', lineID),
          stateV0 = _Vertex$add.updatedState,
          v0 = _Vertex$add.vertex;

      var _Vertex$add2 = _export.Vertex.add(stateV0, layerID, x1, y1, 'lines', lineID),
          stateV1 = _Vertex$add2.updatedState,
          v1 = _Vertex$add2.vertex;

      var _Vertex$add3 = _export.Vertex.add(stateV1, layerID, vv2.x, vv2.y, 'lines', lineID),
          stateV2 = _Vertex$add3.updatedState,
          v2 = _Vertex$add3.vertex;

      var _Vertex$add4 = _export.Vertex.add(stateV2, layerID, vv3.x, vv3.y, 'lines', lineID),
          stateV3 = _Vertex$add4.updatedState,
          v3 = _Vertex$add4.vertex;

      state = stateV3;

      var line = state.catalog.factoryElement(type, {
        id: lineID,
        name: _export2.NameGenerator.generateName('lines', state.catalog.getIn(['elements', type, 'info', 'title'])),
        description: state.catalog.getIn(['elements', type, 'info', 'description']),
        image: state.catalog.getIn(['elements', type, 'info', 'image']),
        vertices: new _immutable.List([v0.id, v1.id, v2.id, v3.id]),
        v2First: v2First,
        type: type
      }, p);

      state = state.setIn(['scene', 'layers', layerID, 'lines', lineID], line);

      return { updatedState: state, line: line };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, lineID) {
      state = _export.Layer.select(state, layerID).updatedState;

      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      state = _export.Layer.selectElement(state, layerID, 'lines', lineID).updatedState;
      state = _export.Layer.selectElement(state, layerID, 'vertices', line.vertices.get(0)).updatedState;
      state = _export.Layer.selectElement(state, layerID, 'vertices', line.vertices.get(1)).updatedState;
      state = _export.Project.setIsElementSelected(state).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, lineID) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      if (line) {
        state = this.unselect(state, layerID, lineID).updatedState;
        line.holes.forEach(function (holeID) {
          return state = _export.Hole.remove(state, layerID, holeID).updatedState;
        });
        if (line.perimeter != null) state = _export.Perimeter.removeElement(state, layerID, line.perimeter, 'lines', lineID).updatedState;
        state = _export.Layer.removeElement(state, layerID, 'lines', lineID).updatedState;
        line.vertices.forEach(function (vertexID) {
          return state = _export.Vertex.remove(state, layerID, vertexID, 'lines', lineID).updatedState;
        });
        state.getIn(['scene', 'groups']).forEach(function (group) {
          return state = _export.Group.removeElement(state, group.id, layerID, 'lines', lineID).updatedState;
        });
        state = _export.Project.setIsElementSelected(state).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, lineID) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      if (line) {
        state = _export.Layer.unselect(state, layerID, 'vertices', line.vertices.get(0)).updatedState;
        state = _export.Layer.unselect(state, layerID, 'vertices', line.vertices.get(1)).updatedState;
        state = _export.Layer.unselect(state, layerID, 'lines', lineID).updatedState;
        state = _export.Project.setIsElementSelected(state).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'split',
    value: function split(state, layerID, lineID, x, y) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      var v0 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(0)]);
      var v1 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(1)]);
      var x0 = v0.x,
          y0 = v0.y;
      var x1 = v1.x,
          y1 = v1.y;

      var _Line$create = Line.create(state, layerID, line.type, x0, y0, x, y, line.get('properties')),
          stateL1 = _Line$create.updatedState,
          line0 = _Line$create.line;

      var _Line$create2 = Line.create(stateL1, layerID, line.type, x1, y1, x, y, line.get('properties')),
          stateL2 = _Line$create2.updatedState,
          line1 = _Line$create2.line;

      state = stateL2;

      var splitPointOffset = _export2.GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, x, y);
      var minVertex = _export2.GeometryUtils.minVertex(v0, v1);

      line.holes.forEach(function (holeID) {
        var hole = state.getIn(['scene', 'layers', layerID, 'holes', holeID]);

        var holeOffset = hole.offset;
        if (minVertex.x === x1 && minVertex.y === y1) {
          splitPointOffset = 1 - splitPointOffset;
          holeOffset = 1 - hole.offset;
        }

        if (holeOffset < splitPointOffset) {
          var offset = holeOffset / splitPointOffset;
          if (minVertex.x === x1 && minVertex.y === y1) {
            offset = 1 - offset;
          }
          state = _export.Hole.create(state, layerID, hole.type, line0.id, offset, hole.properties).updatedState;
        } else {
          var _offset = (holeOffset - splitPointOffset) / (1 - splitPointOffset);
          if (minVertex.x === x1 && minVertex.y === y1) {
            _offset = 1 - _offset;
          }
          state = _export.Hole.create(state, layerID, hole.type, line1.id, _offset, hole.properties).updatedState;
        }
      });

      //add splitted lines to the original line's group
      var lineGroups = state.getIn(['scene', 'groups']).filter(function (group) {
        var lines = group.getIn(['elements', layerID, 'lines']);
        return lines && lines.contains(lineID);
      });

      lineGroups.forEach(function (group) {
        state = _export.Group.addElement(state, group.id, layerID, 'lines', line0.id).updatedState;
        state = _export.Group.addElement(state, group.id, layerID, 'lines', line1.id).updatedState;
      });

      state = Line.remove(state, layerID, lineID).updatedState;

      return { updatedState: state, lines: new _immutable.List([line0, line1]) };
    }
  }, {
    key: 'addFromPoints',
    value: function addFromPoints(state, layerID, type, points, properties, holes) {
      var _this = this;

      var v0 = points[0];

      points = new _immutable.List(points).sort(function (_ref, _ref2) {
        var x1 = _ref.x,
            y1 = _ref.y;
        var x2 = _ref2.x,
            y2 = _ref2.y;
        return x1 === x2 ? y1 - y2 : x1 - x2;
      });

      var pointsPair = points.zip(points.skip(1)).filterNot(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            _ref4$ = _ref4[0],
            x1 = _ref4$.x,
            y1 = _ref4$.y,
            _ref4$2 = _ref4[1],
            x2 = _ref4$2.x,
            y2 = _ref4$2.y;

        return x1 === x2 && y1 === y2;
      });

      var lines = [];

      pointsPair.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            _ref6$ = _ref6[0],
            x1 = _ref6$.x,
            y1 = _ref6$.y,
            _ref6$2 = _ref6[1],
            x2 = _ref6$2.x,
            y2 = _ref6$2.y;

        var v2First = !_export2.GeometryUtils.samePoints(v0, { x: x1, y: y1 });

        var _create = _this.create(state, layerID, type, x1, y1, x2, y2, properties, { v2First: v2First }),
            stateL = _create.updatedState,
            line = _create.line;

        state = stateL;

        if (holes) {
          holes.forEach(function (holeWithOffsetPoint) {
            var _holeWithOffsetPoint$ = holeWithOffsetPoint.offsetPosition,
                xp = _holeWithOffsetPoint$.x,
                yp = _holeWithOffsetPoint$.y;


            if (_export2.GeometryUtils.isPointOnLineSegment(x1, y1, x2, y2, xp, yp)) {

              var newOffset = _export2.GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp);

              if (newOffset >= 0 && newOffset <= 1) {
                state = _export.Hole.create(state, layerID, holeWithOffsetPoint.hole.type, line.id, newOffset, holeWithOffsetPoint.hole.properties).updatedState;
              }
            }
          });
        }

        lines.push(line);
      });

      return { updatedState: state, lines: new _immutable.List(lines) };
    }
  }, {
    key: 'createAvoidingIntersections',
    value: function createAvoidingIntersections(state, layerID, type, x0, y0, x1, y1, oldProperties, oldHoles) {
      var _this2 = this;

      var points = [{ x: x0, y: y0 }, { x: x1, y: y1 }];

      state = state.getIn(['scene', 'layers', layerID, 'lines']).reduce(function (reducedState, line) {
        var _line$vertices$map$to = line.vertices.map(function (vertexID) {
          return reducedState.getIn(['scene', 'layers', layerID, 'vertices']).get(vertexID);
        }).toArray(),
            _line$vertices$map$to2 = _slicedToArray(_line$vertices$map$to, 2),
            v0 = _line$vertices$map$to2[0],
            v1 = _line$vertices$map$to2[1];

        var hasCommonEndpoint = _export2.GeometryUtils.samePoints(v0, points[0]) || _export2.GeometryUtils.samePoints(v0, points[1]) || _export2.GeometryUtils.samePoints(v1, points[0]) || _export2.GeometryUtils.samePoints(v1, points[1]);

        var intersection = _export2.GeometryUtils.twoLineSegmentsIntersection(points[0], points[1], v0, v1);

        if (intersection.type === 'colinear') {
          if (!oldHoles) {
            oldHoles = [];
          }

          var orderedVertices = _export2.GeometryUtils.orderVertices(points);

          reducedState.getIn(['scene', 'layers', layerID, 'lines', line.id, 'holes']).forEach(function (holeID) {
            var hole = reducedState.getIn(['scene', 'layers', layerID, 'holes', holeID]);
            var oldLineLength = _export2.GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
            var offset = _export2.GeometryUtils.samePoints(orderedVertices[1], line.vertices.get(1)) ? 1 - hole.offset : hole.offset;
            var offsetPosition = _export2.GeometryUtils.extendLine(v0.x, v0.y, v1.x, v1.y, oldLineLength * offset);

            oldHoles.push({ hole: hole, offsetPosition: offsetPosition });
          });

          reducedState = _this2.remove(reducedState, layerID, line.id).updatedState;

          points.push(v0, v1);
        }

        if (intersection.type === 'intersecting' && !hasCommonEndpoint) {
          reducedState = _this2.split(reducedState, layerID, line.id, intersection.point.x, intersection.point.y).updatedState;
          points.push(intersection.point);
        }

        return reducedState;
      }, state);

      var _Line$addFromPoints = Line.addFromPoints(state, layerID, type, points, oldProperties, oldHoles),
          updatedState = _Line$addFromPoints.updatedState,
          lines = _Line$addFromPoints.lines;

      return { updatedState: updatedState, lines: lines };
    }
  }, {
    key: 'replaceVertex',
    value: function replaceVertex(state, layerID, lineID, vertexIndex, x, y) {
      var vertexID = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex]);

      state = _export.Vertex.remove(state, layerID, vertexID, 'lines', lineID).updatedState;

      var _Vertex$add5 = _export.Vertex.add(state, layerID, x, y, 'lines', lineID),
          stateV = _Vertex$add5.updatedState,
          vertex = _Vertex$add5.vertex;

      state = stateV;

      state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex], vertex.id);
      state = state.setIn(['scene', 'layers', layerID, 'lines', lineID], state.getIn(['scene', 'layers', layerID, 'lines', lineID]));

      return { updatedState: state, line: state.getIn(['scene', 'layers', layerID, 'lines', lineID]), vertex: vertex };
    }
  }, {
    key: 'selectToolDrawingLine',
    value: function selectToolDrawingLine(state, sceneComponentType) {
      state = state.merge({
        mode: _constants.MODE_WAITING_DRAWING_LINE,
        drawingSupport: new _immutable.Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'calcLineVertexsBInit',
    value: function calcLineVertexsBInit(state, layerID, lineID) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      var v2First = line.v2First || false;
      var thickness = line.getIn(['properties', 'thickness', 'length']) || cthicknessDefault;
      var v0 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(0)]);
      var v1 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(1)]);
      var x0 = v0.x,
          y0 = v0.y;
      var x1 = v1.x,
          y1 = v1.y;

      var _createVertexAndVecto2 = this.createVertexAndVectorsB(x0, y0, x1, y1, v2First, thickness),
          vv2 = _createVertexAndVecto2.vv2,
          vv3 = _createVertexAndVecto2.vv3,
          vu = _createVertexAndVecto2.vu,
          u = _createVertexAndVecto2.u,
          unew = _createVertexAndVecto2.unew;

      return { updatedState: state, vv2: vv2, vv3: vv3, vu: vu, u: u, unew: unew };
    }
  }, {
    key: 'reCalcVertexsB',
    value: function reCalcVertexsB(state, layerID, lineID) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      var v2First = line.v2First || false;
      var thickness = line.getIn(['properties', 'thickness', 'length']) || cthicknessDefault;
      var v0 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(0)]);
      var v1 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(1)]);
      var x0 = v0.x,
          y0 = v0.y;
      var x1 = v1.x,
          y1 = v1.y;

      var _createVertexAndVecto3 = this.createVertexAndVectorsB(x0, y0, x1, y1, v2First, thickness),
          vv2 = _createVertexAndVecto3.vv2,
          vv3 = _createVertexAndVecto3.vv3,
          vu = _createVertexAndVecto3.vu,
          u = _createVertexAndVecto3.u,
          unew = _createVertexAndVecto3.unew;

      var _Line$replaceVertex = Line.replaceVertex(state, layerID, lineID, 2, vv2.x, vv2.y),
          stateLV2 = _Line$replaceVertex.updatedState,
          vertex2 = _Line$replaceVertex.vertex2;

      var _Line$replaceVertex2 = Line.replaceVertex(stateLV2, layerID, lineID, 3, vv3.x, vv3.y),
          stateLV3 = _Line$replaceVertex2.updatedState,
          vertex3 = _Line$replaceVertex2.vertex3;

      state = stateLV3;

      return { updatedState: state, vv2: vv2, vv3: vv3, vu: vu, u: u, unew: unew };
    }

    // [ line1ID , line2ID ] en el sentido de las agujas del reloj

  }, {
    key: 'calcVertex5By2Lines',
    value: function calcVertex5By2Lines(state, layerID, line1ID, line2ID) {

      console.log('calcVertex5By2Lines line1ID: ' + line1ID + ' line2ID: ' + line2ID + ' ');

      var vertex13Id = state.getIn(['scene', 'layers', layerID, 'lines', line1ID, 'vertices', 3]);
      var vertex22Id = state.getIn(['scene', 'layers', layerID, 'lines', line2ID, 'vertices', 2]);
      var stateL1 = Line.calcLineVertexsBInit(state, layerID, line1ID);
      var stateL2 = Line.calcLineVertexsBInit(state, layerID, line2ID);
      var _stateL1$vv = stateL1.vv3,
          x14 = _stateL1$vv.x,
          y14 = _stateL1$vv.y;
      var _stateL2$vv = stateL2.vv2,
          x22 = _stateL2$vv.x,
          y22 = _stateL2$vv.y;

      var m1 = stateL1.vu.x == 0 ? 0 : stateL1.vu.y / stateL1.vu.x;
      var m2 = stateL2.vu.x == 0 ? 0 : stateL2.vu.y / stateL2.vu.x;

      /*
          y - y0 = m(x-x0)
          y - y0 = mx -mx0
          y - mx = y0 - m x0
          1:
          . si m1 = inf
            x = x14
          . si m1 = 0
            y = y14
          . sino
            y - m1x = y14 - m1x14
         2:
          . si m2 = inf
            x = x22
          . si m2 = 0
            y = y22
          . sino
            y - m2x = y22 - m2x22
            a1x + b1y = c1
          a2x + b2y = c2
            M  = [  a1, b1,
                  a2, b2 ]
          MA = [ a1, b1, c1,
                 a2, b2, c2 ]
            Mx = [ c1, b1,
                 c2, b2 ]
            My = [ a1, c1
                 a2, c2 ]
            detM  = a1b2 - b1a2
          detMx = c1b2 - b1c2
          detMy = a1c2 - c1a2
            x = detMx / detM
          y = detMy / detM
       */

      var _ref7 = stateL1.vu.x == 0 ? { a1: 1, b1: 0, c1: x14 } : m1 == 0 ? { a1: 0, b1: 1, c1: y14 } : { a1: -m1, b1: 1, c1: y14 - m1 * x14 },
          a1 = _ref7.a1,
          b1 = _ref7.b1,
          c1 = _ref7.c1;

      var _ref8 = stateL2.vu.x == 0 ? { a2: 1, b2: 0, c2: x22 } : m2 == 0 ? { a2: 0, b2: 1, c2: y22 } : { a2: -m2, b2: 1, c2: y22 - m2 * x22 },
          a2 = _ref8.a2,
          b2 = _ref8.b2,
          c2 = _ref8.c2;

      var detM = a1 * b2 - b1 * a2;

      if (detM != 0) {
        var x5 = (c1 * b2 - b1 * c2) / detM;
        var y5 = (a1 * c2 - c1 * a2) / detM;

        console.log('interseccion stateL1.vu.x: ' + stateL1.vu.x + ' stateL2.vu.x: ' + stateL2.vu.x + ' m1 : ' + m1 + ' a1 : ' + a1 + ' b1 : ' + b1 + ' c1: ' + c1 + ' m2 : ' + m2 + ' a2 : ' + a2 + ' b2 : ' + b2 + ' c2: ' + c2 + ' x5: ' + x5 + ' y5: ' + y5);
        console.log('line1 \'' + line1ID + '\' vertex3 \'' + vertex13Id + '\' se ha cambiado sus coordenadas : (' + x5 + ', ' + y5 + ')');

        var _Line$replaceVertex3 = Line.replaceVertex(state, layerID, line1ID, 3, x5, y5),
            stateLV1 = _Line$replaceVertex3.updatedState,
            newVertex13 = _Line$replaceVertex3.vertex;

        state = stateLV1;

        if (newVertex13 != vertex22Id) state = Line.replaceVertex(state, layerID, line2ID, 2, x5, y5).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'beginDrawingLine',
    value: function beginDrawingLine(state, layerID, x, y) {
      var snapElements = _export2.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);
      var snap = null;

      if (state.snapMask && !state.snapMask.isEmpty()) {
        snap = _export2.SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
        if (snap) {
          ;

          var _snap$point = snap.point;
          x = _snap$point.x;
          y = _snap$point.y;
        }snapElements = snapElements.withMutations(function (snapElements) {
          var a = void 0,
              b = void 0,
              c = void 0;

          var _GeometryUtils$horizo = _export2.GeometryUtils.horizontalLine(y);

          a = _GeometryUtils$horizo.a;
          b = _GeometryUtils$horizo.b;
          c = _GeometryUtils$horizo.c;

          _export2.SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);

          var _GeometryUtils$vertic = _export2.GeometryUtils.verticalLine(x);

          a = _GeometryUtils$vertic.a;
          b = _GeometryUtils$vertic.b;
          c = _GeometryUtils$vertic.c;

          _export2.SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);
        });
      }

      var drawingSupport = state.get('drawingSupport').set('layerID', layerID);

      state = _export.Layer.unselectAll(state, layerID).updatedState;

      var _Line$create3 = Line.create(state, layerID, drawingSupport.get('type'), x, y, x, y),
          stateL = _Line$create3.updatedState,
          line = _Line$create3.line;

      state = Line.select(stateL, layerID, line.id).updatedState;

      state = state.merge({
        mode: _constants.MODE_DRAWING_LINE,
        snapElements: snapElements,
        activeSnapElement: snap ? snap.snap : null,
        drawingSupport: drawingSupport
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingLine',
    value: function updateDrawingLine(state, x, y) {
      var snap = null;
      if (state.snapMask && !state.snapMask.isEmpty()) {
        snap = _export2.SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
        if (snap) {
          ;
          var _snap$point2 = snap.point;
          x = _snap$point2.x;
          y = _snap$point2.y;
        }
      }

      var layerID = state.getIn(['drawingSupport', 'layerID']);
      var lineID = state.getIn(['scene', 'layers', layerID, 'selected', 'lines']).first();
      //let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      //let v2First = line.v2First || false;


      var _Line$replaceVertex4 = Line.replaceVertex(state, layerID, lineID, 1, x, y),
          stateLV = _Line$replaceVertex4.updatedState,
          vertex = _Line$replaceVertex4.vertex;

      state = stateLV;

      //state = Line.reCalcVertexsB(state, layerID, lineID).updatedState;

      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(0)).updatedState;
      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(1)).updatedState;

      state = _export.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
      state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;

      state = this.select(state, layerID, lineID).updatedState;
      state = state.merge({ activeSnapElement: snap ? snap.snap : null });

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingLine',
    value: function endDrawingLine(state, x, y, continuous) {
      if (state.snapMask && !state.snapMask.isEmpty()) {
        var snap = _export2.SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
        if (snap) {
          ;
          var _snap$point3 = snap.point;
          x = _snap$point3.x;
          y = _snap$point3.y;
        }
      }

      var layerID = state.getIn(['drawingSupport', 'layerID']);
      var layer = state.getIn(['scene', 'layers', layerID]);

      var lineID = state.getIn(['scene', 'layers', layerID, 'selected', 'lines']).first();
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      /*
        let v0 = layer.vertices.get(line.vertices.get(0));
        state = Line.remove(state, layerID, lineID).updatedState;
        let { updatedState: stateLines, lines } = Line.createAvoidingIntersections(state, layerID, line.type, v0.x, v0.y, x, y);
        state = stateLines;
      line = lines.first();
      */

      if (!line.vertices) return;
      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(0)).updatedState;
      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(1)).updatedState;

      state = _export.Layer.detectAndUpdateAreas(state, layerID).updatedState;
      state = _export.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
      state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;

      //state = state.merge({
      //  mode: MODE_WAITING_DRAWING_LINE,
      //  snapElements: new List(),
      //  activeSnapElement: null
      //});

      /*
        state.viewer2D.isArea = Line.isHasAreaFromLine(state, layerID, line);
      
      state = (!state.viewer2D.isArea)
        ? state.merge({
          mode: MODE_WAITING_DRAWING_LINE,
          snapElements: new List(),
          activeSnapElement: null
        })
        : state.merge({
          mode: MODE_IDLE,
          drawingSupport: null,
          activeSnapElement: null,
          snapElements: new List()
        });
      */
      if (continuous) {
        var isArea = Line.isHasAreaFromLine(state, layerID, line);

        if (!isArea) {
          state = state.merge({
            mode: _constants.MODE_WAITING_DRAWING_LINE,
            snapElements: new _immutable.List(),
            activeSnapElement: null
          });
          state = Line.beginDrawingLine(state, layerID, x, y).updatedState;
        } else state = state.merge({
          mode: _constants.MODE_IDLE,
          drawingSupport: new _immutable.Map(),
          activeSnapElement: null,
          snapElements: new _immutable.List()
        });
      } else {
        state = state.merge({
          mode: _constants.MODE_WAITING_DRAWING_LINE,
          snapElements: new _immutable.List(),
          activeSnapElement: null
        });
      }

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingLine',
    value: function beginDraggingLine(state, layerID, lineID, x, y) {

      var snapElements = _export2.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);

      var layer = state.scene.layers.get(layerID);
      var line = layer.lines.get(lineID);

      var vertex0 = layer.vertices.get(line.vertices.get(0));
      var vertex1 = layer.vertices.get(line.vertices.get(1));
      var oldHoles = _export.Hole.calcOldHolesByLineID(state, layerID, lineID);

      state = state.merge({
        mode: _constants.MODE_DRAGGING_LINE,
        snapElements: snapElements,
        draggingSupport: (0, _immutable.Map)({
          layerID: layerID, lineID: lineID,
          startPointX: x,
          startPointY: y,
          startVertex0X: vertex0.x,
          startVertex0Y: vertex0.y,
          startVertex1X: vertex1.x,
          startVertex1Y: vertex1.y,
          oldHoles: oldHoles
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingLine',
    value: function updateDraggingLine(state, x, y) {
      var draggingSupport = state.draggingSupport;
      var snapElements = state.snapElements;

      var layerID = draggingSupport.get('layerID');
      var lineID = draggingSupport.get('lineID');
      var oldHoles = draggingSupport.get('oldHoles');
      var diffX = x - draggingSupport.get('startPointX');
      var diffY = y - draggingSupport.get('startPointY');
      var newVertex0X = draggingSupport.get('startVertex0X') + diffX;
      var newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
      var newVertex1X = draggingSupport.get('startVertex1X') + diffX;
      var newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;
      var vertices = state.scene.getIn(['layers', layerID, 'lines', lineID, 'vertices']);
      var oldVertex0X = state.scene.getIn(['layers', layerID, 'vertices', vertices.get(0), 'x']);
      var oldVertex0Y = state.scene.getIn(['layers', layerID, 'vertices', vertices.get(0), 'y']);
      var oldVertex1X = state.scene.getIn(['layers', layerID, 'vertices', vertices.get(1), 'x']);
      var oldVertex1Y = state.scene.getIn(['layers', layerID, 'vertices', vertices.get(1), 'y']);

      var activeSnapElement = null;
      var curSnap0 = null,
          curSnap1 = null;
      if (state.snapMask && !state.snapMask.isEmpty()) {
        curSnap0 = _export2.SnapUtils.nearestSnap(snapElements, newVertex0X, newVertex0Y, state.snapMask);
        curSnap1 = _export2.SnapUtils.nearestSnap(snapElements, newVertex1X, newVertex1Y, state.snapMask);
      }

      var deltaX = 0,
          deltaY = 0;
      if (curSnap0 && curSnap1) {
        if (curSnap0.point.distance < curSnap1.point.distance) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
          activeSnapElement = curSnap0.snap;
        } else {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
          activeSnapElement = curSnap1.snap;
        }
      } else {
        if (curSnap0) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
          activeSnapElement = curSnap0.snap;
        }
        if (curSnap1) {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
          activeSnapElement = curSnap1.snap;
        }
      }

      newVertex0X += deltaX;
      newVertex0Y += deltaY;
      newVertex1X += deltaX;
      newVertex1Y += deltaY;

      state = state.merge({
        activeSnapElement: activeSnapElement,
        scene: state.scene.updateIn(['layers', layerID], function (layer) {
          return layer.withMutations(function (layer) {
            var lineVertices = layer.getIn(['lines', lineID, 'vertices']);
            layer.updateIn(['vertices', lineVertices.get(0)], function (vertex) {
              return vertex.merge({ x: newVertex0X, y: newVertex0Y });
            });
            layer.updateIn(['vertices', lineVertices.get(1)], function (vertex) {
              return vertex.merge({ x: newVertex1X, y: newVertex1Y });
            });
            return layer;
          });
        })
      });

      var newHoles = _export.Hole.calcNewHolesFromOldHoles(state, layerID, oldHoles);

      if (!newHoles.valid) {
        state = state.merge({
          activeSnapElement: null,
          scene: state.scene.updateIn(['layers', layerID], function (layer) {
            return layer.withMutations(function (layer) {
              var lineVertices = layer.getIn(['lines', lineID, 'vertices']);
              layer.updateIn(['vertices', lineVertices.get(0)], function (vertex) {
                return vertex.merge({ x: oldVertex0X, y: oldVertex0Y });
              });
              layer.updateIn(['vertices', lineVertices.get(1)], function (vertex) {
                return vertex.merge({ x: oldVertex1X, y: oldVertex1Y });
              });
              return layer;
            });
          })
        });
      } else {
        state = _export.Hole.updateHolesFromNewHoles(state, layerID, newHoles).updatedState;
        state = _export.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
        state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingLine',
    value: function endDraggingLine(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport;

      var layerID = draggingSupport.get('layerID');
      var layer = state.scene.layers.get(layerID);
      var lineID = draggingSupport.get('lineID');
      var line = layer.lines.get(lineID);
      var oldHoles = draggingSupport.get('oldHoles');

      var vertex0 = layer.vertices.get(line.vertices.get(0));
      var vertex1 = layer.vertices.get(line.vertices.get(1));

      var maxV = _export2.GeometryUtils.maxVertex(vertex0, vertex1);
      var minV = _export2.GeometryUtils.minVertex(vertex0, vertex1);

      var lineLength = _export2.GeometryUtils.verticesDistance(minV, maxV);
      var alpha = Math.atan2(maxV.y - minV.y, maxV.x - minV.x);

      var holesWithOffsetPosition = [];
      layer.lines.get(lineID).holes.forEach(function (holeID) {
        var hole = layer.holes.get(holeID);
        var pointOnLine = lineLength * hole.offset;

        var offsetPosition = {
          x: pointOnLine * Math.cos(alpha) + minV.x,
          y: pointOnLine * Math.sin(alpha) + minV.y
        };

        holesWithOffsetPosition.push({ hole: hole, offsetPosition: offsetPosition });
      });

      var diffX = x - draggingSupport.get('startPointX');
      var diffY = y - draggingSupport.get('startPointY');
      var newVertex0X = draggingSupport.get('startVertex0X') + diffX;
      var newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
      var newVertex1X = draggingSupport.get('startVertex1X') + diffX;
      var newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;

      if (state.snapMask && !state.snapMask.isEmpty()) {

        var curSnap0 = _export2.SnapUtils.nearestSnap(state.snapElements, newVertex0X, newVertex0Y, state.snapMask);
        var curSnap1 = _export2.SnapUtils.nearestSnap(state.snapElements, newVertex1X, newVertex1Y, state.snapMask);

        var deltaX = 0,
            deltaY = 0;
        if (curSnap0 && curSnap1) {
          if (curSnap0.point.distance < curSnap1.point.distance) {
            deltaX = curSnap0.point.x - newVertex0X;
            deltaY = curSnap0.point.y - newVertex0Y;
          } else {
            deltaX = curSnap1.point.x - newVertex1X;
            deltaY = curSnap1.point.y - newVertex1Y;
          }
        } else {
          if (curSnap0) {
            deltaX = curSnap0.point.x - newVertex0X;
            deltaY = curSnap0.point.y - newVertex0Y;
          }
          if (curSnap1) {
            deltaX = curSnap1.point.x - newVertex1X;
            deltaY = curSnap1.point.y - newVertex1Y;
          }
        }

        newVertex0X += deltaX;
        newVertex0Y += deltaY;
        newVertex1X += deltaX;
        newVertex1Y += deltaY;
      }

      //let lineGroups = state   //get groups membership if present
      //  .getIn(['scene', 'groups'])
      //  .filter(group => {
      //    const lines = group.getIn(['elements', layerID, 'lines']);
      //    return lines && lines.contains(lineID);
      //  });

      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(0)).updatedState;
      state = _export.Layer.mergeEqualsVertices(state, layerID, line.vertices.get(1)).updatedState;

      var newHoles = _export.Hole.calcNewHolesFromOldHoles(state, layerID, oldHoles);

      state = _export.Hole.updateHolesFromNewHoles(state, layerID, newHoles).updatedState;
      state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;

      /*
          state = Line.remove(state, layerID, lineID).updatedState;
          if (!GeometryUtils.samePoints({ newVertex0X, newVertex0Y }, { newVertex1X, newVertex1Y })) {
        let ret = Line.createAvoidingIntersections(
          state,
          layerID,
          line.type,
          newVertex0X,
          newVertex0Y,
          newVertex1X,
          newVertex1Y,
          line.properties,
          holesWithOffsetPosition
        );
            state = ret.updatedState;
            //re-add to old line's groups if present
        ret.lines.forEach(addedLine => {
          lineGroups.forEach(oldLineGroup => {
            state = Group.addElement(state, oldLineGroup.id, layerID, 'lines', addedLine.id).updatedState;
          });
        });
      }
      */
      state = _export.Layer.detectAndUpdateAreas(state, layerID).updatedState;
      state = _export.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
      state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;

      state = state.merge({
        mode: _constants.MODE_IDLE,
        draggingSupport: null,
        activeSnapElement: null,
        snapElements: new _immutable.List()
      });

      return { updatedState: state };
    }
  }, {
    key: 'modifyCoordsOnKeyDown',
    value: function modifyCoordsOnKeyDown(x1, x2, y1, y2, keyCode) {
      var value = _export2.GeometryUtils.pointsDistance(x1, y1, x2, y2);

      switch (keyCode) {
        case 39:
          //Right
          y2 = y1;
          x2 = x1 + value;
          break;

        case 37:
          //Left
          y2 = y1;
          x2 = x1 - value;
          break;

        case 38:
          //Up
          x2 = x1;
          y2 = y1 + value;
          break;

        case 40:
          // Down
          x2 = x1;
          y2 = y1 - value;
          break;

        default:
          return;
      }
      return { modifiedX: x2, modifiedY: y2 };
    }

    // angle

  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, lineID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'properties'], properties);

      state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, lineID, properties) {
      return this.setProperties(state, layerID, lineID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, lineID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'lines', lineID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, lineID, properties) {
      return this.updateProperties(state, layerID, lineID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, lineID, lineAttributes) {
      var lAttr = lineAttributes.toJS();

      var lineLength = lAttr.lineLength,
          lineAngle = lAttr.lineAngle,
          lineAlto = lAttr.lineAlto,
          isEndLine = lAttr.isEndLine;


      delete lAttr['vertexOne'];
      delete lAttr['vertexTwo'];
      delete lAttr['lineLength'];
      delete lAttr['lineAlto'];
      delete lAttr['lineAngleRad'];
      delete lAttr['isEndLine'];
      delete lAttr['lineAngle'];

      state = state.mergeIn(['scene', 'layers', layerID, 'lines', lineID], (0, _immutable.fromJS)(lAttr))
      //  .mergeIn(['scene', 'layers', layerID, 'vertices', vertexOne.id], { x: vertexOne.x, y: vertexOne.y })
      //  .mergeIn(['scene', 'layers', layerID, 'vertices', vertexTwo.id], { x: vertexTwo.x, y: vertexTwo.y })
      .mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'misc'], new _immutable.Map({ '_unitLength': lineLength._unit }));

      var layer = state.getIn(['scene', 'layers', layerID]);
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

      //let angle_degree = (Line.getLine2IDAngleV0_pcl(layer, line) == null) ? 90 - lineAngle : 360 - lineAngle;
      //let angle = angle_degree * Math.PI / 180;
      var angle = Line.getAngleRadV0ByAngle_pcl(layer, line, lineAngle);
      var v2First = line.v2First;
      var v0id = line.vertices.get(!v2First ? 0 : 1);
      var v1id = line.vertices.get(!v2First ? 1 : 0);

      var _layer$vertices$get = layer.vertices.get(v0id),
          x = _layer$vertices$get.x,
          y = _layer$vertices$get.y;
      //let { x: x1, y: y1 } = layer.vertices.get(v1id);
      //let angle = GeometryUtils.angleBetweenTwoPoints(x, y, x1, y1);


      var x1new = x + lineLength.length * Math.cos(angle);
      var y1new = y + lineLength.length * Math.sin(angle);

      if (v0id == v1id) {
        var _Vertex$add6 = _export.Vertex.add(state, layerID, x1new, y1new, 'lines', lineID),
            stateV0 = _Vertex$add6.updatedState,
            v1new = _Vertex$add6.vertex;

        state = stateV0;
        state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', !v2First ? 1 : 0], v1new.id);
      } else state = state.mergeIn(['scene', 'layers', layerID, 'vertices', v1id], { x: x1new, y: y1new });

      if (!isEndLine) {
        state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;
        state = _export.Layer.detectAndUpdateAreas(state, layerID).updatedState;
        state = _export.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
        state = _export.Layer.reCalcVertexsBByLineId(state, layerID, lineID).updatedState;
      } else {
        state = Line.endDrawingLine(state, x1new, y1new, true).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'setVerticesCoords',
    value: function setVerticesCoords(state, layerID, lineID, x1, y1, x2, y2) {
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      state = _export.Vertex.setAttributes(state, layerID, line.vertices.get(0), new _immutable.Map({ x: x1, y: y1 })).updatedState;
      state = _export.Vertex.setAttributes(state, layerID, line.vertices.get(1), new _immutable.Map({ x: x2, y: y2 })).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'next_Drawing_Item',
    value: function next_Drawing_Item(state, layerID, lineID) {
      var layer = state.getIn(['scene', 'layers', layerID]);
      var line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
      var v2First = line.v2First;
      var v1id = line.vertices.get(!v2First ? 1 : 0);

      var _layer$vertices$get2 = layer.vertices.get(v1id),
          x1 = _layer$vertices$get2.x,
          y1 = _layer$vertices$get2.y;

      state = Line.endDrawingLine(state, x1, y1, true).updatedState;

      return { updatedState: state };
    }
  }]);

  return Line;
}();

exports.default = Line;