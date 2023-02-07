'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_LINE:
      return _export.Line.selectToolDrawingLine(state, action.sceneComponentType).updatedState;

    case _constants.BEGIN_DRAWING_LINE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Line.beginDrawingLine(state, action.layerID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAWING_LINE:
      return _export.Line.updateDrawingLine(state, action.x, action.y).updatedState;

    case _constants.END_DRAWING_LINE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Line.endDrawingLine(state, action.x, action.y, action.continuous).updatedState;

    case _constants.BEGIN_DRAGGING_LINE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Line.beginDraggingLine(state, action.layerID, action.lineID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAGGING_LINE:
      return _export.Line.updateDraggingLine(state, action.x, action.y).updatedState;

    case _constants.END_DRAGGING_LINE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Line.endDraggingLine(state, action.x, action.y).updatedState;

    case _constants.SELECT_LINE:
      return _export.Line.select(state, action.layerID, action.lineID).updatedState;

    case _constants.CACHE_ALTO:
      return _export.Line.cacheAlto(state, action.alto).updatedState;

    case _constants.CACHE_FONDO:
      return _export.Line.cacheFondo(state, action.fondo).updatedState;

    case _constants.CACHE_ANGULO:
      return _export.Line.cacheAngulo(state, action.angulo).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');