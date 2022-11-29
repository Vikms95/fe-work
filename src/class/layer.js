import { List, Set } from 'immutable';
import { Project, Area, Line, Hole, Item, Vertex, Perimeter } from './export';
import {
  GraphInnerCycles,
  GeometryUtils,
  IDBroker
} from '../utils/export';
import { Layer as LayerModel /*, Perimeter as PerimeterModel */ } from '../models';
import line from './line';
import vertex from './vertex';
import { func } from 'prop-types';

const sameSet = (set1, set2) => set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);
const someList = (list1, list2) => list1.some(e => list2.includes(e))

class Layer {
  static create(state, name, altitude) {
    let layerID = IDBroker.acquireID();
    name = name || `layer ${layerID}`;
    altitude = altitude || 0;

    let layer = new LayerModel({ id: layerID, name, altitude });

    state = state.setIn(['scene', 'selectedLayer'], layerID);
    state = state.setIn(['scene', 'layers', layerID], layer);

    return { updatedState: state };
  }

  static select(state, layerID) {
    if (!state.get('alterate')) state = Project.unselectAll(state).updatedState;
    state = state.setIn(['scene', 'selectedLayer'], layerID);

    return { updatedState: state };
  }

  static selectElement(state, layerID, elementPrototype, elementID) {
    state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], true);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], elems => elems.push(elementID));

    return { updatedState: state };
  }

  static unselect(state, layerID, elementPrototype, elementID) {
    state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], false);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], elems => elems.filter(el => el.id === elementID));
    return { updatedState: state };
  }

  static unselectAll(state, layerID) {
    let { lines, holes, items, areas } = state.getIn(['scene', 'layers', layerID]);

    if (lines) lines.forEach(line => { state = Line.unselect(state, layerID, line.id).updatedState; });
    if (holes) holes.forEach(hole => { state = Hole.unselect(state, layerID, hole.id).updatedState; });
    if (items) items.forEach(item => { state = Item.unselect(state, layerID, item.id).updatedState; });
    if (areas) areas.forEach(area => { state = Area.unselect(state, layerID, area.id).updatedState; });

    return { updatedState: state };
  }

  static setProperties(state, layerID, properties) {
    state = state.mergeIn(['scene', 'layers', layerID], properties);
    state = state.updateIn(['scene', 'layers'], layers => layers.sort((a, b) => a.altitude !== b.altitude ? a.altitude - b.altitude : a.order - b.order));

    return { updatedState: state };
  }

  static remove(state, layerID) {
    state = state.removeIn(['scene', 'layers', layerID]);

    state = state.setIn(
      ['scene', 'selectedLayer'],
      state.scene.selectedLayer !== layerID ? state.scene.selectedLayer : state.scene.layers.first().id
    );

    return { updatedState: state };
  }

  static removeElement(state, layerID, elementPrototype, elementID) {
    state = state.deleteIn(['scene', 'layers', layerID, elementPrototype, elementID]);

    return { updatedState: state };
  }

  static reCalcVertexsBByVertexId(state, layerID, vertexID) {
    let lines = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']);

    state = Layer.reCalcVertexsBByLines(state, layerID, lines).updatedState;

    return { updatedState: state };
  }

  static reCalcVertexsBByLines(state, layerID, lines) {
    let paremetersIDs = new Set();
    let linesIDs = new Set();

    lines.forEach(lineID => {
      if (!state.getIn(['scene', 'layers', layerID, 'lines', lineID])) return state;

      let perimeterID = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'])
      if (perimeterID != null)
        paremetersIDs = paremetersIDs.add(perimeterID);
      else
        linesIDs = linesIDs.add(lineID);
    });
    paremetersIDs.forEach(parameterID => {
      state = Perimeter.reCalcVertexsB(state, layerID, parameterID).updatedState;
    });
    linesIDs.forEach(
      lineID => {
        if (!state.getIn(['scene', 'layers', layerID, 'lines', lineID])) return state;

        state = Line.reCalcVertexsB(state, layerID, lineID).updatedState;
      });

    return { updatedState: state };
  }

  static reCalcVertexsBByLineId(state, layerID, lineID) {
    let linesIDs = new Set([lineID]);
    //state = Line.reCalcVertexsB(state, layerID, lineID).updatedState;

    let vertices = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices']);
    let vertexID = vertices.get(0);

    if (vertexID)
      //state = Layer.reCalcVertexsBByVertexId(state, layerID, v).updatedState;
      linesIDs = linesIDs.union(state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']));

    vertexID = vertices.get(1);

    if (vertexID)
      //state = Layer.reCalcVertexsBByVertexId(state, layerID, v).updatedState;
      linesIDs = linesIDs.union(state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']));

    state = Layer.reCalcVertexsBByLines(state, layerID, linesIDs).updatedState;

    return { updatedState: state };
  }

  static getWallsPerimeter(state, layerID) {
    state = Layer.removeZeroLengthLines(state, layerID).updatedState;
    let lines = state.getIn(['scene', 'layers', layerID, 'lines']).keySeq().toList();
    let perimeters = new List();

    while (lines.size > 0) {
      let p = new List();
      let added;

      p = p.push(lines.first());
      lines = lines.shift();

      do {
        let p2 = new List();
        added = false;
        lines.forEach(lineID => {
          let line1FID = p.first();
          let line1EID = p.last();
          let isJoin = Line.isLinesJoin(state, layerID, line1EID, lineID);
          if (isJoin == 1) {
            added = true;
            p = p.push(lineID);
          }
          else {
            isJoin = Line.isLinesJoin(state, layerID, lineID, line1FID);
            if (isJoin == 1) {
              added = true;
              p = p.unshift(lineID);
            }
            else
              p2 = p2.push(lineID);
          }
        })
        lines = p2;
      } while (added);

      perimeters = perimeters.push(p);
    }

    //return perimeters.filter(p => p.size > 1).toList();
    return perimeters;
  }

  static getWallsPerimeter2(state, layerID) {
    let state2 = Layer.removeZeroLengthLines(state, layerID).updatedState;
    let lines = state2.getIn(['scene', 'layers', layerID, 'lines']);
    let perimeters = new List();
    let perimeters2 = lines.keySeq().map(lineID => new List([lineID])).toList();

    while (perimeters2.size > 0) {
      let lines1IDs = perimeters2.first();
      let length = lines1IDs.size;

      perimeters2 = perimeters2.shift();

      do {
        //let lines1IDs: lines1IDs
        let p = new List();

        // no sirve reduce tiene que ser del mismo tipo. pensar como hacerlo
        perimeters2.forEach(lines2IDs => {
          let line1FID = lines1IDs.first();
          let line1EID = lines1IDs.last();
          let line2FID = lines2IDs.first();
          let line2EID = lines2IDs.last();
          let isJoin = Line.isLinesJoin(state, layerID, line1EID, line2FID);

          if (isJoin == 1)
            lines1IDs = lines1IDs.concat(lines2IDs);
          else {
            isJoin = Line.isLinesJoin(state, layerID, line2EID, line1FID);
            if (isJoin == 1)
              lines1IDs = lines2IDs.concat(lines1IDs);
            else
              p = p.push(lines2IDs);
          }
        });
        //lines1IDs = lines_reduce.lines1IDs;
        //perimeters2 = lines_reduce.p;
        perimeters2 = p;
      } while (perimeters2.size > 0 && lines1IDs.length > length);
      perimeters = perimeters.unshift(lines1IDs);
    }

    return perimeters.filter(p => p.size > 1).toList();
  }

  static reCalcAngleWall(state, layerID, lineID) {
    return { updatedState: state };
  }

  static detectAndUpdatePerimeters(state, layerID) {
    let perimeters = Layer.getWallsPerimeter(state, layerID);
    let used = new List();
    let noUsed = new List();

    // update perimeters
    perimeters.forEach(linesIDs => {
      let perimeters = state.getIn(['scene', 'layers', layerID, 'perimeters']);
      let perimeter = perimeters.find(p => someList(p.lines, linesIDs));

      if (perimeter) {
        state = Perimeter.replaceLines(state, layerID, perimeter.id, linesIDs).updatedState;
        used = used.push(linesIDs);
      }
      else
        noUsed = noUsed.push(linesIDs);
    });

    // remove perimeters
    state.getIn(['scene', 'layers', layerID, 'perimeters']).forEach(perimeter => {
      var inUsed = used.some(linesID => linesID.isSubset(perimeter.lines));

      if (!inUsed)
        state = Perimeter.remove(state, layerID, perimeter.id).updatedState;
    });

    // add perimeters
    noUsed.forEach(linesID => {
      let { updatedState: stateAdd } = Perimeter.add(state, layerID, linesID);

      state = stateAdd;
    })

    return { updatedState: state };
  }

  static detectAndUpdateAreas(state, layerID) {
    let verticesArray = [];           //array with vertices coords
    let linesArray;                   //array with edges

    let vertexID_to_verticesArrayIndex = {};
    let verticesArrayIndex_to_vertexID = {};

    state.getIn(['scene', 'layers', layerID, 'vertices']).forEach(vertex => {
      let verticesCount = verticesArray.push([vertex.x, vertex.y]);
      let latestVertexIndex = verticesCount - 1;
      vertexID_to_verticesArrayIndex[vertex.id] = latestVertexIndex;
      verticesArrayIndex_to_vertexID[latestVertexIndex] = vertex.id;
    });

    linesArray = state.getIn(['scene', 'layers', layerID, 'lines'])
      .map(line => line.vertices.map(vertexID => vertexID_to_verticesArrayIndex[vertexID]).toArray());

    let innerCyclesByVerticesArrayIndex = GraphInnerCycles.calculateInnerCycles(verticesArray, linesArray);

    let innerCyclesByVerticesID = new List(innerCyclesByVerticesArrayIndex)
      .map(cycle => new List(cycle.map(vertexIndex => verticesArrayIndex_to_vertexID[vertexIndex])));

    // All area vertices should be ordered in counterclockwise order
    innerCyclesByVerticesID = innerCyclesByVerticesID.map((area) =>
      GraphInnerCycles.isClockWiseOrder(area.map(vertexID => state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]))) ? area.reverse() : area
    );

    let areaIDs = [];

    //remove areas
    state.getIn(['scene', 'layers', layerID, 'areas']).forEach(area => {
      let areaInUse = innerCyclesByVerticesID.some(vertices => sameSet(vertices, area.vertices));
      if (!areaInUse) {
        state = Area.remove(state, layerID, area.id).updatedState;
      }
    });

    //add new areas
    innerCyclesByVerticesID.forEach((cycle, ind) => {
      let areaInUse = state.getIn(['scene', 'layers', layerID, 'areas']).find(area => sameSet(area.vertices, cycle));

      if (areaInUse) {
        areaIDs[ind] = areaInUse.id;
        state = state.setIn(['scene', 'layers', layerID, 'areas', areaIDs[ind], 'holes'], new List());
      } else {
        let areaVerticesCoords = cycle.map(vertexID => state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]));
        let resultAdd = Area.add(state, layerID, 'area', areaVerticesCoords, state.catalog);

        areaIDs[ind] = resultAdd.area.id;
        state = resultAdd.updatedState;
      }
    });

    // Build a relationship between areas and their coordinates
    let verticesCoordsForArea = areaIDs.map(id => {
      let vertices = state.getIn(['scene', 'layers', layerID, 'areas', id]).vertices.map(vertexID => {
        let { x, y } = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);
        return new List([x, y]);
      });
      return { id, vertices };
    });

    // Find all holes for an area
    let i, j;
    for (i = 0; i < verticesCoordsForArea.length; i++) {
      let holesList = new List(); // The holes for this area
      let areaVerticesList = verticesCoordsForArea[i].vertices.flatten().toArray();
      for (j = 0; j < verticesCoordsForArea.length; j++) {
        if (i !== j) {
          let isHole = GeometryUtils.ContainsPoint(areaVerticesList,
            verticesCoordsForArea[j].vertices.get(0).get(0),
            verticesCoordsForArea[j].vertices.get(0).get(1));
          if (isHole) {
            holesList = holesList.push(verticesCoordsForArea[j].id);
          }
        }
      }
      state = state.setIn(['scene', 'layers', layerID, 'areas', verticesCoordsForArea[i].id, 'holes'], holesList);
    }

    // Remove holes which are already holes for other areas
    areaIDs.forEach(areaID => {
      let doubleHoles = new Set();
      let areaHoles = state.getIn(['scene', 'layers', layerID, 'areas', areaID, 'holes']);
      areaHoles.forEach((areaHoleID) => {
        let holesOfholes = state.getIn(['scene', 'layers', layerID, 'areas', areaHoleID, 'holes']);
        holesOfholes.forEach((holeID) => {
          if (areaHoles.indexOf(holeID) !== -1) doubleHoles.add(holeID);
        });
      });
      doubleHoles.forEach(doubleHoleID => {
        areaHoles = areaHoles.remove(areaHoles.indexOf(doubleHoleID));
      });
      state = state.setIn(['scene', 'layers', layerID, 'areas', areaID, 'holes'], areaHoles);
    });

    return { updatedState: state };
  }

  static removeZeroLengthLines(state, layerID) {
    let updatedState = state.getIn(['scene', 'layers', layerID, 'lines']).reduce(
      (newState, line) => {
        let v_id0 = line.getIn(['vertices', 0]);
        let v_id1 = line.getIn(['vertices', 1]);

        let v0 = newState.getIn(['scene', 'layers', layerID, 'vertices', v_id0]);
        let v1 = newState.getIn(['scene', 'layers', layerID, 'vertices', v_id1]);

        if (GeometryUtils.verticesDistance(v0, v1) === 0) {
          newState = Line.remove(newState, layerID, line.id).updatedState;
        }

        return newState;
      },
      state
    );

    return { updatedState };
  }

  static mergeEqualsVertices(state, layerID, vertexID) {
    //1. find vertices to remove
    let vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

    let doubleVertices = state.getIn(['scene', 'layers', layerID, 'vertices'])
      .filter(v => {
        return (
          v.id !== vertexID &&
          GeometryUtils.samePoints(vertex, v)// &&
          //!v.lines.contains( vertexID ) &&
          //!v.areas.contains( vertexID )
        );
      });

    if (doubleVertices.isEmpty()) return { updatedState: state };

    doubleVertices.forEach(doubleVertex => {
      let reduced = doubleVertex.lines.reduce(
        (reducedState, lineID) => {

          reducedState = reducedState.updateIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices'], vertices => {
            if (vertices) {
              return vertices.map(v => v === doubleVertex.id ? vertexID : v);
            }
          });
          reducedState = Vertex.addElement(reducedState, layerID, vertexID, 'lines', lineID).updatedState;

          return reducedState;
        },
        state
      );

      let biReduced = doubleVertex.areas.reduce(
        (reducedState, areaID) => {

          reducedState = reducedState.updateIn(['scene', 'layers', layerID, 'areas', areaID, 'vertices'], vertices => {
            if (vertices) return vertices.map(v => v === doubleVertex.id ? vertexID : v);
          });
          reducedState = Vertex.addElement(reducedState, layerID, vertexID, 'areas', areaID).updatedState;

          return reducedState;
        },
        reduced
      );

      state = Vertex.remove(biReduced, layerID, doubleVertex.id, null, null, true).updatedState;
    });

    return { updatedState: state };
  }

  static setPropertiesOnSelected(state, layerID, properties) {
    let selected = state.getIn(['scene', 'layers', layerID, 'selected']);

    selected.lines.forEach(lineID => state = Line.setProperties(state, layerID, lineID, properties).updatedState);
    selected.holes.forEach(holeID => state = Hole.setProperties(state, layerID, holeID, properties).updatedState);
    selected.areas.forEach(areaID => state = Area.setProperties(state, layerID, areaID, properties).updatedState);
    selected.items.forEach(itemID => state = Item.setProperties(state, layerID, itemID, properties).updatedState);

    return { updatedState: state };
  }

  static next_Drawing_ItemOnSelected(state, layerID) {
    let selected = state.getIn(['scene', 'layers', layerID, 'selected']);

    selected.lines.forEach(lineID => state = Line.next_Drawing_Item(state, layerID, lineID).updatedState);

    return { updatedState: state };
  }

  static updatePropertiesOnSelected(state, layerID, properties) {
    let selected = state.getIn(['scene', 'layers', layerID, 'selected']);

    selected.lines.forEach(lineID => state = Line.updateProperties(state, layerID, lineID, properties).updatedState);
    selected.holes.forEach(holeID => state = Hole.updateProperties(state, layerID, holeID, properties).updatedState);
    selected.areas.forEach(areaID => state = Area.updateProperties(state, layerID, areaID, properties).updatedState);
    selected.items.forEach(itemID => state = Item.updateProperties(state, layerID, itemID, properties).updatedState);

    return { updatedState: state };
  }

  static setAttributesOnSelected(state, layerID, attributes) {
    let selected = state.getIn(['scene', 'layers', layerID, 'selected']);

    selected.lines.forEach(lineID => state = Line.setAttributes(state, layerID, lineID, attributes).updatedState);
    selected.holes.forEach(holeID => state = Hole.setAttributes(state, layerID, holeID, attributes).updatedState);
    selected.items.forEach(itemID => state = Item.setAttributes(state, layerID, itemID, attributes).updatedState);
    //selected.areas.forEach(areaID => state = Area.setAttributes( state, layerID, areaID, attributes ).updatedState);

    return { updatedState: state };
  }

}

export { Layer as default };
