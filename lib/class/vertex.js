'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _models = require('../models');

var _export = require('../utils/export');

var _constants = require('../constants');

var _export2 = require('../class/export');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vertex = function () {
  function Vertex() {
    _classCallCheck(this, Vertex);
  }

  _createClass(Vertex, null, [{
    key: 'add',
    value: function add(state, layerID, x, y, relatedPrototype, relatedID) {

      var vertex = state.getIn(['scene', 'layers', layerID, 'vertices']).find(function (vertex) {
        return _export.GeometryUtils.samePoints(vertex, { x: x, y: y });
      });

      if (vertex) {
        vertex = vertex.update(relatedPrototype, function (related) {
          return related.push(relatedID);
        });
      } else {
        vertex = new _models.Vertex(_defineProperty({
          id: _export.IDBroker.acquireID(),
          name: 'Vertex',
          x: x, y: y
        }, relatedPrototype, new _immutable.List([relatedID])));
      }

      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertex.id], vertex);

      return { updatedState: state, vertex: vertex };
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, vertexID, vertexAttributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'vertices', vertexID], vertexAttributes);

      return { updatedState: state };
    }
  }, {
    key: 'addElement',
    value: function addElement(state, layerID, vertexID, elementPrototype, elementID) {
      state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], function (list) {
        return list.push(elementID);
      });
      return { updatedState: state };
    }
  }, {
    key: 'removeElement',
    value: function removeElement(state, layerID, vertexID, elementPrototype, elementID) {
      var elementIndex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype]).findIndex(function (el) {
        return el === elementID;
      });
      if (elementIndex !== -1) {
        state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], function (list) {
          return list.remove(elementIndex);
        });
      }
      return { updatedState: state };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, vertexID) {
      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], true);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], function (elems) {
        return elems.push(vertexID);
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, vertexID) {
      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], false);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], function (elems) {
        return elems.filter(function (el) {
          return el.id !== vertexID;
        });
      });

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, vertexID, relatedPrototype, relatedID, forceRemove) {
      var vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

      if (vertex) {
        if (relatedPrototype && relatedID) vertex = vertex.update(relatedPrototype, function (related) {
          var index = related.findIndex(function (ID) {
            return relatedID === ID;
          });
          return related.delete(index);
        });

        var inUse = vertex.areas.size || vertex.lines.size;

        if (inUse && !forceRemove) {
          state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID], vertex);
        } else {
          state = state.deleteIn(['scene', 'layers', layerID, 'vertices', vertexID]);
        }
      }

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingVertex',
    value: function beginDraggingVertex(state, layerID, vertexID, x, y) {

      var snapElements = _export.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);
      var oldHoles = _export2.Hole.calcOldHolesByVertexID(state, layerID, vertexID);

      state = state.merge({
        mode: _constants.MODE_DRAGGING_VERTEX,
        snapElements: snapElements,
        draggingSupport: (0, _immutable.Map)({
          layerID: layerID,
          vertexID: vertexID,
          oldHoles: oldHoles,
          previousMode: state.get('mode')
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingVertex',
    value: function updateDraggingVertex(state, x, y) {
      var triggerSnap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var _state = state,
          draggingSupport = _state.draggingSupport,
          snapElements = _state.snapElements,
          scene = _state.scene;

      var snap = void 0;

      // While moving the lines with arrows, this code snippet was causing the lines
      // to change its length, so we avoid snap events by calling this function with
      // the triggerSnap as false when triggered by arrow key press.
      if (triggerSnap) {
        snap = null;
        if (state.snapMask && !state.snapMask.isEmpty()) {
          snap = _export.SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
          if (snap) {
            ;
            var _snap$point = snap.point;
            x = _snap$point.x;
            y = _snap$point.y;
          }
        }
      }

      var layerID = draggingSupport.get('layerID');
      var vertexID = draggingSupport.get('vertexID');
      var oldHoles = draggingSupport.get('oldHoles');
      var xOld = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'x']);
      var yOld = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'y']);

      state = state.merge({
        activeSnapElement: snap ? snap.snap : null,
        scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
      });

      var newHoles = _export2.Hole.calcNewHolesFromOldHoles(state, layerID, oldHoles);

      if (!newHoles.valid) {
        state = state.merge({
          activeSnapElement: snap ? snap.snap : null,
          scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: xOld, y: yOld })
        });
      } else {
        state = _export2.Layer.reCalcVertexsBByVertexId(state, layerID, vertexID).updatedState;
        state = _export2.Hole.updateHolesFromNewHoles(state, layerID, newHoles).updatedState;
        state = _export2.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingVertex',
    value: function endDraggingVertex(state, x, y) {
      var _state2 = state,
          draggingSupport = _state2.draggingSupport;

      var layerID = draggingSupport.get('layerID');
      var vertexID = draggingSupport.get('vertexID');
      var oldHoles = draggingSupport.get('oldHoles');
      var lines = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']);

      if (lines) {
        state = lines.reduce(function (reducedState, lineID) {
          if (!reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID])) return reducedState;

          reducedState = _export2.Layer.removeZeroLengthLines(reducedState, layerID).updatedState;
          reducedState = _export2.Layer.mergeEqualsVertices(reducedState, layerID, vertexID).updatedState;

          var newHoles = _export2.Hole.calcNewHolesFromOldHoles(reducedState, layerID, oldHoles);

          reducedState = _export2.Hole.updateHolesFromNewHoles(reducedState, layerID, newHoles).updatedState;

          reducedState = _export2.Layer.reCalcVertexsBByVertexId(reducedState, layerID, vertexID).updatedState;

          /*
          let v_id0 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 0]);
          let v_id1 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1]);
          let oldVertexID = v_id0 === vertexID ? v_id1 : v_id0;
            let oldVertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', oldVertexID]);
          let vertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);
            let oldHoles = [];
            let orderedVertices = GeometryUtils.orderVertices([oldVertex, vertex]);
            let holes = reducedState
            .getIn(['scene', 'layers', layerID, 'lines', lineID, 'holes'])
            .forEach(holeID => {
              let hole = reducedState.getIn(['scene', 'layers', layerID, 'holes', holeID]);
              let oldLineLength = GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);
              let offset = GeometryUtils.samePoints(orderedVertices[1], reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1])) ? (1 - hole.offset) : hole.offset;
              let offsetPosition = GeometryUtils.extendLine(oldVertex.x, oldVertex.y, vertex.x, vertex.y, oldLineLength * offset);
                oldHoles.push({ hole, offsetPosition });
            });
            let lineType = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'type']);
          let lineProps = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'properties']);
          let lineGroups = reducedState   //get groups membership if present
            .getIn(['scene', 'groups'])
            .filter(group => {
              const lines = group.getIn(['elements', layerID, 'lines']);
              return lines && lines.contains(lineID);
            });
            reducedState = Layer.removeZeroLengthLines(reducedState, layerID).updatedState;
          reducedState = Layer.mergeEqualsVertices(reducedState, layerID, vertexID).updatedState;
          reducedState = Line.remove(reducedState, layerID, lineID).updatedState;
            if (!GeometryUtils.samePoints(oldVertex, vertex)) {
            let ret = Line.createAvoidingIntersections(
              reducedState,
              layerID,
              lineType,
              oldVertex.x,
              oldVertex.y,
              vertex.x,
              vertex.y,
              lineProps,
              oldHoles
            );
              reducedState = ret.updatedState;
              //re-add to old line's groups if present
            ret.lines.forEach(addedLine => {
              lineGroups.forEach(oldLineGroup => {
                reducedState = Group.addElement(reducedState, oldLineGroup.id, layerID, 'lines', addedLine.id).updatedState;
              });
            });            
          }
          */

          return reducedState;
        }, state);
      }

      state = _export2.Layer.detectAndUpdateAreas(state, layerID).updatedState;
      state = _export2.Layer.detectAndUpdatePerimeters(state, layerID).updatedState;

      state = state.merge({
        mode: draggingSupport.get('previousMode'),
        draggingSupport: null,
        activeSnapElement: null,
        snapElements: new _immutable.List()
      });

      return { updatedState: state };
    }
  }]);

  return Vertex;
}();

exports.default = Vertex;