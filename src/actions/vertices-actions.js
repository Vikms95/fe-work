import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX, DRAG_VERTEX } from '../constants';

export function beginDraggingVertex ( layerID, vertexID, x, y, snapMask ) {
  return {
    type: BEGIN_DRAGGING_VERTEX,
    layerID, vertexID, x, y, snapMask
  };
}

export function updateDraggingVertex ( x, y, snapMask ) {
  return {
    type: UPDATE_DRAGGING_VERTEX,
    x, y, snapMask
  };
}

export function endDraggingVertex ( x, y, snapMask ) {
  return {
    type: END_DRAGGING_VERTEX,
    x, y, snapMask

  };
}

export function dragVertex ( x, y, layerID, verticeID  ) {
  return {
    type: DRAG_VERTEX,
    x, y, layerID, verticeID

  };
}
