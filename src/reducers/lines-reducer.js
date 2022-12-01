import { Line } from '../class/export';
import { history } from '../utils/export';
import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  BEGIN_DRAGGING_LINE,
  UPDATE_DRAGGING_LINE,
  END_DRAGGING_LINE,
  SELECT_LINE,
  CACHE_ALTO,
  CACHE_FONDO,
  CACHE_ANGULO
} from '../constants';

export default function ( state, action ) {

  switch ( action.type ) {
    case SELECT_TOOL_DRAWING_LINE:
      return Line.selectToolDrawingLine( state, action.sceneComponentType ).updatedState;

    case BEGIN_DRAWING_LINE:
      state = state.merge( { sceneHistory: history.historyPush( state.sceneHistory, state.scene ) } );
      return Line.beginDrawingLine( state, action.layerID, action.x, action.y ).updatedState;

    case UPDATE_DRAWING_LINE:
      return Line.updateDrawingLine( state, action.x, action.y ).updatedState;

    case END_DRAWING_LINE:
      state = state.merge( { sceneHistory: history.historyPush( state.sceneHistory, state.scene ) } );
      return Line.endDrawingLine( state, action.x, action.y, action.continuous ).updatedState;

    case BEGIN_DRAGGING_LINE:
      state = state.merge( { sceneHistory: history.historyPush( state.sceneHistory, state.scene ) } );
      return Line.beginDraggingLine( state, action.layerID, action.lineID, action.x, action.y ).updatedState;

    case UPDATE_DRAGGING_LINE:
      return Line.updateDraggingLine( state, action.x, action.y ).updatedState;

    case END_DRAGGING_LINE:
      state = state.merge( { sceneHistory: history.historyPush( state.sceneHistory, state.scene ) } );
      return Line.endDraggingLine( state, action.x, action.y ).updatedState;

    case SELECT_LINE:
      return Line.select( state, action.layerID, action.lineID ).updatedState;

    case CACHE_ALTO:
      return Line.cacheAlto( state, action.alto ).updatedState;

    case CACHE_FONDO:
      return Line.cacheFondo( state, action.fondo ).updatedState;

    case CACHE_ANGULO:
      return Line.cacheAngulo( state, action.angulo ).updatedState;

    default:
      return state;
  }
}
