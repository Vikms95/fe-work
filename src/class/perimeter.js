import { List } from 'immutable';
import { Perimeter as PerimeterModel } from '../models';
import {
  IDBroker,
  GeometryUtils
} from '../utils/export';
import { Line, Layer } from './export';
import line from './line';

class Perimeter {
  static add(state, layerID, linesIDs) {
    let perimeter = new PerimeterModel({
      id: IDBroker.acquireID(),
      name: 'Perimeter',
      //lines: new List(linesIDs)
      lines: new List()
    });

    state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeter.id], perimeter);
    //linesIDs.forEach(lineID => state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], perimeter.id));
    state = Perimeter.replaceLines(state, layerID, perimeter.id, linesIDs).updatedState;

    return { updatedState: state, perimeter };
  }
  static updateIsClosed(state, layerID, perimeterID) {
    let lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

    state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'isClosed'], lines != null && lines.size > 1 && Line.isLinesJoin(state, layerID, lines.last(), lines.first()) == 1);

    return { updatedState: state };
  }
  static replaceLines(state, layerID, perimeterID, linesIDs) {
    state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(lineID => state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], null));
    state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines'], new List(linesIDs));

    let lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

    lines.forEach(lineID => state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], perimeterID));
    state = Perimeter.updateIsClosed(state, layerID, perimeterID).updatedState;

    return { updatedState: state };
  }

  static remove(state, layerID, perimeterID) {
    state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(lineID => state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], null));
    //state = state.deleteIn(['scene', 'layers', layerID, 'perimeters', perimeterID]);
    state = Layer.removeElement(state, layerID, 'perimeters', perimeterID).updatedState;

    return { updatedState: state };
  }

  static removeElement(state, layerID, perimeterID, elementPrototype, elementID) {
    let elementIndex = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, elementPrototype]).findIndex(el => el === elementID);
    if (elementIndex !== -1) {
      state = state.updateIn(['scene', 'layers', layerID, 'perimeters', perimeterID, elementPrototype], list => list.remove(elementIndex));
      state = Perimeter.updateIsClosed(state, layerID, perimeterID).updatedState;
    }
    return { updatedState: state };
  }

  static reCalcVertexsB(state, layerID, perimeterID) {
    //state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(lineID => state = Line.reCalcVertexsB(state, layerID, lineID).updatedState);
    let lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

    if (lines != null) {
      let lastLine2ID = lines.reduce((line1ID, line2ID) => {
        state = Line.calcVertex5By2Lines(state, layerID, line1ID, line2ID).updatedState;

        return line2ID;
      });

      if (!state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'isClosed'])) {
        let firstLineID = lines.first();
        let stateL1 = Line.calcLineVertexsBInit(state, layerID, firstLineID);
        let stateL2 = Line.calcLineVertexsBInit(state, layerID, lastLine2ID);

        state = Line.replaceVertex(state, layerID, firstLineID, 2, stateL1.vv2.x, stateL1.vv2.y).updatedState;
        state = Line.replaceVertex(state, layerID, lastLine2ID, 3, stateL2.vv3.x, stateL2.vv3.y).updatedState;
      }
      else
        state = Line.calcVertex5By2Lines(state, layerID, lastLine2ID, lines.first()).updatedState;
    }

    return { updatedState: state };
  }

  static reCalcAllVertexsB(state, layerID) {
    state.getIn(['scene', 'layers', layerID, 'perimeters']).forEach(perimeter => {
      state = Perimeter.reCalcVertexsB(state, layerID, perimeter.id).updatedState;
    });

    return { updatedState: state };
  }
}

export { Perimeter as default };
