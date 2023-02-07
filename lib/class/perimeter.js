'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _models = require('../models');

var _export = require('../utils/export');

var _export2 = require('./export');

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Perimeter = function () {
  function Perimeter() {
    _classCallCheck(this, Perimeter);
  }

  _createClass(Perimeter, null, [{
    key: 'add',
    value: function add(state, layerID, linesIDs) {
      var perimeter = new _models.Perimeter({
        id: _export.IDBroker.acquireID(),
        name: 'Perimeter',
        //lines: new List(linesIDs)
        lines: new _immutable.List()
      });

      state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeter.id], perimeter);
      //linesIDs.forEach(lineID => state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], perimeter.id));
      state = Perimeter.replaceLines(state, layerID, perimeter.id, linesIDs).updatedState;

      return { updatedState: state, perimeter: perimeter };
    }
  }, {
    key: 'updateIsClosed',
    value: function updateIsClosed(state, layerID, perimeterID) {
      var lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

      state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'isClosed'], lines != null && lines.size > 1 && _export2.Line.isLinesJoin(state, layerID, lines.last(), lines.first()) == 1);

      return { updatedState: state };
    }
  }, {
    key: 'replaceLines',
    value: function replaceLines(state, layerID, perimeterID, linesIDs) {
      state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(function (lineID) {
        return state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], null);
      });
      state = state.setIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines'], new _immutable.List(linesIDs));

      var lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

      lines.forEach(function (lineID) {
        return state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], perimeterID);
      });
      state = Perimeter.updateIsClosed(state, layerID, perimeterID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, perimeterID) {
      state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(function (lineID) {
        return state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'perimeter'], null);
      });
      //state = state.deleteIn(['scene', 'layers', layerID, 'perimeters', perimeterID]);
      state = _export2.Layer.removeElement(state, layerID, 'perimeters', perimeterID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'removeElement',
    value: function removeElement(state, layerID, perimeterID, elementPrototype, elementID) {
      var elementIndex = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, elementPrototype]).findIndex(function (el) {
        return el === elementID;
      });
      if (elementIndex !== -1) {
        state = state.updateIn(['scene', 'layers', layerID, 'perimeters', perimeterID, elementPrototype], function (list) {
          return list.remove(elementIndex);
        });
        state = Perimeter.updateIsClosed(state, layerID, perimeterID).updatedState;
      }
      return { updatedState: state };
    }
  }, {
    key: 'reCalcVertexsB',
    value: function reCalcVertexsB(state, layerID, perimeterID) {
      //state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']).forEach(lineID => state = Line.reCalcVertexsB(state, layerID, lineID).updatedState);
      var lines = state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'lines']);

      if (lines != null) {
        var lastLine2ID = lines.reduce(function (line1ID, line2ID) {
          state = _export2.Line.calcVertex5By2Lines(state, layerID, line1ID, line2ID).updatedState;

          return line2ID;
        });

        if (!state.getIn(['scene', 'layers', layerID, 'perimeters', perimeterID, 'isClosed'])) {
          var firstLineID = lines.first();
          var stateL1 = _export2.Line.calcLineVertexsBInit(state, layerID, firstLineID);
          var stateL2 = _export2.Line.calcLineVertexsBInit(state, layerID, lastLine2ID);

          state = _export2.Line.replaceVertex(state, layerID, firstLineID, 2, stateL1.vv2.x, stateL1.vv2.y).updatedState;
          state = _export2.Line.replaceVertex(state, layerID, lastLine2ID, 3, stateL2.vv3.x, stateL2.vv3.y).updatedState;
        } else state = _export2.Line.calcVertex5By2Lines(state, layerID, lastLine2ID, lines.first()).updatedState;
      }

      return { updatedState: state };
    }
  }, {
    key: 'reCalcAllVertexsB',
    value: function reCalcAllVertexsB(state, layerID) {
      state.getIn(['scene', 'layers', layerID, 'perimeters']).forEach(function (perimeter) {
        state = Perimeter.reCalcVertexsB(state, layerID, perimeter.id).updatedState;
      });

      return { updatedState: state };
    }
  }]);

  return Perimeter;
}();

exports.default = Perimeter;