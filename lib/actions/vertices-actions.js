'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDraggingVertex = beginDraggingVertex;
exports.updateDraggingVertex = updateDraggingVertex;
exports.endDraggingVertex = endDraggingVertex;
exports.dragVertex = dragVertex;

var _constants = require('../constants');

function beginDraggingVertex(layerID, vertexID, x, y, snapMask) {
  return {
    type: _constants.BEGIN_DRAGGING_VERTEX,
    layerID: layerID, vertexID: vertexID, x: x, y: y, snapMask: snapMask
  };
}

function updateDraggingVertex(x, y, snapMask) {
  return {
    type: _constants.UPDATE_DRAGGING_VERTEX,
    x: x, y: y, snapMask: snapMask
  };
}

function endDraggingVertex(x, y, snapMask) {
  return {
    type: _constants.END_DRAGGING_VERTEX,
    x: x, y: y, snapMask: snapMask

  };
}

function dragVertex(x, y, layerID, verticeID) {
  return {
    type: _constants.DRAG_VERTEX,
    x: x, y: y, layerID: layerID, verticeID: verticeID

  };
}