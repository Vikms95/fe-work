'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMultiplePrototypeSelection = exports.isMultipleSelection = exports.getSelectedElementsToJS = exports.getSelectedElements = exports.getElementAttributes = exports.getElementVertices = exports.getVerticeCoords = exports.getLineVerticesID = exports.getSelectedPrototypeElements = exports.getCacheAngulo = exports.getCacheAlto = exports.getCacheFondo = exports.setCacheAngulo = exports.setCacheFondo = exports.setCacheAlto = exports.getPrefsAlto = exports.getPrefsFondo = exports.getUserZoom = exports.getRejillaTotal2D = exports.getViewer2D = exports.getIsGuia2D = exports.getIsElementSelected = exports.getLayerValue = exports.getLayerID = undefined;

var _export = require('../utils/export');

var _export2 = require('../class/export');

var getLayerID = exports.getLayerID = function getLayerID(state) {
  return state.getIn(['scene', 'selectedLayer']);
};

var getLayerValue = exports.getLayerValue = function getLayerValue(state) {
  var layerID = getLayerID(state);
  return state.getIn(['scene', 'layers', layerID]);
};

var getIsElementSelected = exports.getIsElementSelected = function getIsElementSelected(state) {
  return state.getIn(['scene', 'isElementSelected']);
};
var getIsGuia2D = exports.getIsGuia2D = function getIsGuia2D(state) {
  return state.getIn(['prefs', 'GUIA2D']);
};
var getViewer2D = exports.getViewer2D = function getViewer2D(state) {
  return state.get('viewer2D').toJS();
};
var getRejillaTotal2D = exports.getRejillaTotal2D = function getRejillaTotal2D(state) {
  return state.getIn(['prefs', 'T/REJILLATOTAL2D']);
};
var getUserZoom = exports.getUserZoom = function getUserZoom(state) {
  return state.getIn(['prefs', 'ZOOM2D']) / 1000;
};
var getPrefsFondo = exports.getPrefsFondo = function getPrefsFondo(state) {
  return state.getIn(['scene', 'prefs', 'FONDOPARED']);
};
var getPrefsAlto = exports.getPrefsAlto = function getPrefsAlto(state) {
  return state.getIn(['scene', 'prefs', 'ALTOPARED']);
};

var setCacheAlto = exports.setCacheAlto = function setCacheAlto(state, alto) {
  return state.setIn(['drawingSupport', 'cacheAlto'], alto);
};
var setCacheFondo = exports.setCacheFondo = function setCacheFondo(state, fondo) {
  return state.setIn(['drawingSupport', 'cacheFondo'], fondo);
};
var setCacheAngulo = exports.setCacheAngulo = function setCacheAngulo(state, angulo) {
  return state.setIn(['drawingSupport', 'cacheAngulo'], angulo);
};

var getCacheFondo = exports.getCacheFondo = function getCacheFondo(state) {
  return state.getIn(['drawingSupport', 'cacheFondo']);
};
var getCacheAlto = exports.getCacheAlto = function getCacheAlto(state) {
  return state.getIn(['drawingSupport', 'cacheAlto']);
};
var getCacheAngulo = exports.getCacheAngulo = function getCacheAngulo(state) {
  return state.getIn(['drawingSupport', 'cacheAngulo']);
};

var getSelectedPrototypeElements = exports.getSelectedPrototypeElements = function getSelectedPrototypeElements(state, prototype) {
  var layerID = getLayerID(state);
  var elements = state.getIn(['scene', 'layers', layerID, prototype]);
  return elements.filter(function (element) {
    return element.get('selected');
  });
};

var getLineVerticesID = exports.getLineVerticesID = function getLineVerticesID(line) {
  var vertices = line.get('vertices');
  var vertice1ID = vertices.toJS()[0];
  var vertice2ID = vertices.toJS()[1];

  return { vertice1ID: vertice1ID, vertice2ID: vertice2ID };
};

var getVerticeCoords = exports.getVerticeCoords = function getVerticeCoords(state, layerID, verticeID) {
  var x = state.getIn(['scene', 'layers', layerID, 'vertices', verticeID, 'x']);
  var y = state.getIn(['scene', 'layers', layerID, 'vertices', verticeID, 'y']);

  return { x: x, y: y };
};

var getElementVertices = exports.getElementVertices = function getElementVertices(element, layer) {
  var v2First = element.v2First;
  var v_a = layer.vertices.get(element.vertices.get(!v2First ? 0 : 1));
  var v_b = layer.vertices.get(element.vertices.get(1));

  return { v_a: v_a, v_b: v_b };
};

var getElementAttributes = exports.getElementAttributes = function getElementAttributes(element, layer, v_a, v_b) {
  var lineLength = _export.GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
  var angulo = _export2.Line.getAngleV0_pcl(layer, element);

  return { lineLength: lineLength, angulo: angulo };
};

var getSelectedElements = exports.getSelectedElements = function getSelectedElements(state) {
  var layerID = state.getIn(['scene', 'selectedLayer']);
  return state.getIn(['scene', 'layers', layerID, 'selected']);
};

var getSelectedElementsToJS = exports.getSelectedElementsToJS = function getSelectedElementsToJS(state) {
  if (!state) return;
  var layerID = state.getIn(['scene', 'selectedLayer']);
  var selectedElements = state.getIn(['scene', 'layers', layerID, 'selected']);
  return immutableDStoJS(selectedElements);
};

var isMultipleSelection = exports.isMultipleSelection = function isMultipleSelection(state) {
  var elementsSelected = getSelectedElementsToJS(state);
  if (!elementsSelected) return;

  var elementsSelectedAmount = elementsSelected.reduce(function (amount, current) {
    var arrayOfSelected = current[1];

    return isSelectedInArray(current) ? amount + arrayOfSelected.length : amount;
  }, 0);

  return elementsSelectedAmount > 1;
};

var isMultiplePrototypeSelection = exports.isMultiplePrototypeSelection = function isMultiplePrototypeSelection(state) {
  var elementsSelected = getSelectedElementsToJS(state);
  if (!elementsSelected) return;

  var prototypesSelectedAmount = elementsSelected.reduce(function (amount, current) {
    var prototype = current[0];
    var arrayOfSelected = current[1];

    return prototype !== 'vertices' && arrayOfSelected.length ? amount + 1 : amount;
  }, 0);

  return prototypesSelectedAmount > 1;
};

var immutableDStoJS = function immutableDStoJS(dataStructure) {
  return Object.entries(dataStructure.toJS());
};

var isSelectedInArray = function isSelectedInArray(element) {
  return element[0] !== 'vertices' && typeof element[1][0] !== 'undefined';
};