import { SELECT_LINE, SELECT_TOOL_DRAWING_LINE, BEGIN_DRAWING_LINE, UPDATE_DRAWING_LINE, END_DRAWING_LINE, BEGIN_DRAGGING_LINE, UPDATE_DRAGGING_LINE, END_DRAGGING_LINE, CACHE_FONDO, CACHE_ALTO, CACHE_ANGULO } from '../constants';

export function selectLine(layerID, lineID) {
  return {
    type: SELECT_LINE,
    layerID: layerID,
    lineID: lineID
  };
}

export function selectToolDrawingLine(sceneComponentType) {
  return {
    type: SELECT_TOOL_DRAWING_LINE,
    sceneComponentType: sceneComponentType
  };
}

export function beginDrawingLine(layerID, x, y, snapMask) {
  return {
    type: BEGIN_DRAWING_LINE,
    layerID: layerID, x: x, y: y, snapMask: snapMask
  };
}

export function updateDrawingLine(x, y, snapMask) {
  return {
    type: UPDATE_DRAWING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

export function endDrawingLine(x, y, snapMask, continuous) {
  return {
    type: END_DRAWING_LINE,
    x: x, y: y, snapMask: snapMask, continuous: continuous
  };
}

export function beginDraggingLine(layerID, lineID, x, y, snapMask) {
  return {
    type: BEGIN_DRAGGING_LINE,
    layerID: layerID, lineID: lineID, x: x, y: y, snapMask: snapMask
  };
}

export function updateDraggingLine(x, y, snapMask) {
  return {
    type: UPDATE_DRAGGING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

export function endDraggingLine(x, y, snapMask) {
  return {
    type: END_DRAGGING_LINE,
    x: x, y: y, snapMask: snapMask
  };
}

export function dragLine(x, y, layerID, verticeID) {
  return {
    type: DRAG_LINE,
    x: x,
    y: y,
    layerID: layerID,
    verticeID: verticeID
  };
};

export function cacheFondo(fondo) {
  return {
    type: CACHE_FONDO,
    fondo: fondo
  };
}
export function cacheAlto(alto) {
  return {
    type: CACHE_ALTO,
    alto: alto
  };
}

export function cacheAngulo(angulo) {
  return {
    type: CACHE_ANGULO,
    angulo: angulo
  };
}