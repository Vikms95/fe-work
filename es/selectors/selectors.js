import { GeometryUtils } from '../utils/export';
import { Line } from '../class/export';

export var getLayerID = function getLayerID(state) {
  return state.getIn(['scene', 'selectedLayer']);
};

export var getLayerValue = function getLayerValue(state) {
  var layerID = getLayerID(state);
  return state.getIn(['scene', 'layers', layerID]);
};

export var getIsElementSelected = function getIsElementSelected(state) {
  return state.getIn(['scene', 'isElementSelected']);
};
export var getIsGuia2D = function getIsGuia2D(state) {
  return state.getIn(['prefs', 'GUIA2D']);
};
export var getViewer2D = function getViewer2D(state) {
  return state.get('viewer2D').toJS();
};
export var getRejillaTotal2D = function getRejillaTotal2D(state) {
  return state.getIn(['prefs', 'T/REJILLATOTAL2D']);
};
export var getUserZoom = function getUserZoom(state) {
  return state.getIn(['prefs', 'ZOOM2D']) / 1000;
};
export var getPrefsFondo = function getPrefsFondo(state) {
  return state.getIn(['scene', 'prefs', 'FONDOPARED']);
};
export var getPrefsAlto = function getPrefsAlto(state) {
  return state.getIn(['scene', 'prefs', 'ALTOPARED']);
};

export var setCacheAlto = function setCacheAlto(state, alto) {
  return state.setIn(['drawingSupport', 'cacheAlto'], alto);
};
export var setCacheFondo = function setCacheFondo(state, fondo) {
  return state.setIn(['drawingSupport', 'cacheFondo'], fondo);
};
export var setCacheAngulo = function setCacheAngulo(state, angulo) {
  return state.setIn(['drawingSupport', 'cacheAngulo'], angulo);
};

export var getCacheFondo = function getCacheFondo(state) {
  return state.getIn(['drawingSupport', 'cacheFondo']);
};
export var getCacheAlto = function getCacheAlto(state) {
  return state.getIn(['drawingSupport', 'cacheAlto']);
};
export var getCacheAngulo = function getCacheAngulo(state) {
  return state.getIn(['drawingSupport', 'cacheAngulo']);
};

export var getSelectedPrototypeElements = function getSelectedPrototypeElements(state, prototype) {
  var layerID = getLayerID(state);
  var elements = state.getIn(['scene', 'layers', layerID, prototype]);
  return elements.filter(function (element) {
    return element.get('selected');
  });
};

export var getLineVerticesID = function getLineVerticesID(line) {
  var vertices = line.get('vertices');
  var vertice1ID = vertices.toJS()[0];
  var vertice2ID = vertices.toJS()[1];

  return { vertice1ID: vertice1ID, vertice2ID: vertice2ID };
};

export var getVerticeCoords = function getVerticeCoords(state, layerID, verticeID) {
  var x = state.getIn(['scene', 'layers', layerID, 'vertices', verticeID, 'x']);
  var y = state.getIn(['scene', 'layers', layerID, 'vertices', verticeID, 'y']);

  return { x: x, y: y };
};

export var getElementVertices = function getElementVertices(element, layer) {
  var v2First = element.v2First;
  var v_a = layer.vertices.get(element.vertices.get(!v2First ? 0 : 1));
  var v_b = layer.vertices.get(element.vertices.get(1));

  return { v_a: v_a, v_b: v_b };
};

export var getElementAttributes = function getElementAttributes(element, layer, v_a, v_b) {
  var lineLength = GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
  var angulo = Line.getAngleV0_pcl(layer, element);

  return { lineLength: lineLength, angulo: angulo };
};

export var getSelectedElements = function getSelectedElements(state) {
  var layerID = state.getIn(['scene', 'selectedLayer']);
  return state.getIn(['scene', 'layers', layerID, 'selected']);
};

export var getSelectedElementsToJS = function getSelectedElementsToJS(state) {
  if (!state) return;
  var layerID = state.getIn(['scene', 'selectedLayer']);
  var selectedElements = state.getIn(['scene', 'layers', layerID, 'selected']);
  return immutableDStoJS(selectedElements);
};

export var isMultipleSelection = function isMultipleSelection(state) {
  var elementsSelected = getSelectedElementsToJS(state);
  if (!elementsSelected) return;

  var elementsSelectedAmount = elementsSelected.reduce(function (amount, current) {
    var arrayOfSelected = current[1];

    return isSelectedInArray(current) ? amount + arrayOfSelected.length : amount;
  }, 0);

  return elementsSelectedAmount > 1;
};

export var isMultiplePrototypeSelection = function isMultiplePrototypeSelection(state) {
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