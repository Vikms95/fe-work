'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Viewer2D;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSvgPanZoom = require('react-svg-pan-zoom');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _export = require('./export');

var _selectors = require('../../selectors/selectors');

var _context = require('../../context/context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return _reactSvgPanZoom.TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return _reactSvgPanZoom.TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return _reactSvgPanZoom.TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return _reactSvgPanZoom.TOOL_AUTO;
    default:
      return _reactSvgPanZoom.TOOL_NONE;
  }
}

function mode2PointerEvents(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
      return { pointerEvents: 'none' };

    default:
      return {};
  }
}

function mode2Cursor(mode) {
  switch (mode) {
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
      return { cursor: 'move' };

    case constants.MODE_ROTATING_ITEM:
      return { cursor: 'ew-resize' };

    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return { cursor: 'crosshair' };
    default:
      return { cursor: 'default' };
  }
}

function mode2DetectAutopan(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
      return true;

    default:
      return false;
  }
}

function extractElementData(node) {
  while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
    node = node.parentNode;
  }
  if (node.tagName === 'svg') return null;

  return {
    part: node.attributes.getNamedItem('data-part') ? node.attributes.getNamedItem('data-part').value : undefined,
    layer: node.attributes.getNamedItem('data-layer').value,
    prototype: node.attributes.getNamedItem('data-prototype').value,
    selected: node.attributes.getNamedItem('data-selected').value === 'true',
    id: node.attributes.getNamedItem('data-id').value
  };
}

function Viewer2D(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      refViewer2D = _ref.refViewer2D,
      update2DView = _ref.update2DView;

  _objectDestructuringEmpty(_ref2);

  var _useContext = (0, _react.useContext)(_context.Context),
      catalog = _useContext.catalog,
      areaActions = _useContext.areaActions,
      itemsActions = _useContext.itemsActions,
      linesActions = _useContext.linesActions,
      holesActions = _useContext.holesActions,
      projectActions = _useContext.projectActions,
      viewer2DActions = _useContext.viewer2DActions,
      verticesActions = _useContext.verticesActions;

  var viewer2D = state.viewer2D,
      mode = state.mode,
      scene = state.scene;

  var layerID = scene.selectedLayer;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isFirstRender = _useState2[0],
      setIsFirstRender = _useState2[1];

  (0, _react.useEffect)(function () {
    var userZoom = (0, _selectors.getUserZoom)(state);
    if (!userZoom || !isFirstRender) return;

    var windowWidthRatio = window.innerWidth / 1000;
    // const windowHeigthRatio = window.innerHeight / 1000;
    var finalZoom = constants.BASE_ZOOM / userZoom;

    refViewer2D.current.setPointOnViewerCenter(550, // initial width
    568, // initial height  465.8
    finalZoom * windowWidthRatio // same zoom output for all monitor sizes
    );

    setIsFirstRender(false);
  }, [state]);

  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', onKeyDown);
    return function () {
      return document.removeEventListener('keydown', onKeyDown);
    };
  }, [state]);

  var onKeyDown = function onKeyDown(event) {
    var viewer2DState = (0, _selectors.getViewer2D)(state);
    update2DView(viewer2DState, event);
  };

  var mapCursorPosition = function mapCursorPosition(_ref3) {
    var x = _ref3.x,
        y = _ref3.y;

    return { x: x, y: -y + scene.height };
  };

  var onMouseMove = function onMouseMove(viewerEvent) {

    //workaround that allow imageful component to work
    var evt = new Event('mousemove-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);

    var _mapCursorPosition = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition.x,
        y = _mapCursorPosition.y;

    projectActions.updateMouseCoord({ x: x, y: y });

    switch (mode) {
      case constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem(layerID, x, y);
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.updateDraggingHole(x, y);
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem(x, y);
        break;
    }

    viewerEvent.originalEvent.stopPropagation();
  };

  var onMouseDown = function onMouseDown(viewerEvent) {
    var event = viewerEvent.originalEvent;

    //workaround that allow imageful component to work
    var evt = new Event('mousedown-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);

    var _mapCursorPosition2 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition2.x,
        y = _mapCursorPosition2.y;

    if (mode === constants.MODE_IDLE) {
      var elementData = extractElementData(event.target);

      if (!elementData || !elementData.selected) return;

      switch (elementData.prototype) {
        case 'lines':
          linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y, state.snapMask);
          break;

        case 'vertices':
          verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y, state.snapMask);
          break;

        case 'items':
          if (elementData.part === 'rotation-anchor') itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);else itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
          break;

        case 'holes':
          holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
          break;

        default:
          break;
      }
    }
    event.stopPropagation();
  };

  var onMouseUp = function onMouseUp(viewerEvent) {
    var event = viewerEvent.originalEvent;

    var evt = new Event('mouseup-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);

    var _mapCursorPosition3 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition3.x,
        y = _mapCursorPosition3.y;

    switch (mode) {

      case constants.MODE_IDLE:
        var elementData = extractElementData(event.target);

        if (elementData && elementData.selected) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'areas':
            areaActions.selectArea(elementData.layer, elementData.id);
            break;

          case 'lines':
            linesActions.selectLine(elementData.layer, elementData.id);
            break;

          case 'holes':
            holesActions.selectHole(elementData.layer, elementData.id);
            break;

          case 'items':
            itemsActions.selectItem(elementData.layer, elementData.id);
            break;

          case 'none':
            projectActions.unselectAll();
            break;
        }
        break;

      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_LINE:
        //state.viewer2D.isArea = false;

        linesActions.endDrawingLine(x, y, state.snapMask, true);
        //if (!state.viewer2D.isArea)
        //  linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem(x, y);
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.endDraggingHole(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.endRotatingItem(x, y);
        break;
    }

    event.stopPropagation();
  };

  var onChangeTool = function onChangeTool(tool) {
    switch (tool) {
      case _reactSvgPanZoom.TOOL_NONE:
        projectActions.selectToolEdit();
        break;

      case _reactSvgPanZoom.TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;

      case _reactSvgPanZoom.TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;

      case _reactSvgPanZoom.TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };

  var _getViewer2D = (0, _selectors.getViewer2D)(state),
      e = _getViewer2D.e,
      f = _getViewer2D.f,
      SVGWidth = _getViewer2D.SVGWidth,
      SVGHeight = _getViewer2D.SVGHeight;

  var rulerSize = 15; //px
  var rulerUnitPixelSize = 100;
  var rulerBgColor = SharedStyle.PRIMARY_COLOR.main;
  var rulerFnColor = SharedStyle.COLORS.white;
  var rulerMkColor = SharedStyle.SECONDARY_COLOR.main;
  var sceneWidth = SVGWidth || state.getIn(['scene', 'width']);
  var sceneHeight = SVGHeight || state.getIn(['scene', 'height']);
  var sceneZoom = state.zoom || 1;
  var rulerXElements = Math.ceil(sceneWidth / rulerUnitPixelSize) + 1;
  var rulerYElements = Math.ceil(sceneHeight / rulerUnitPixelSize) + 1;

  if ((0, _selectors.getIsGuia2D)(state)) {
    return _react2.default.createElement(
      'div',
      { style: {
          margin: 0,
          padding: 0,
          display: 'grid',
          gridRowGap: '0',
          gridColumnGap: '0',
          position: 'relative',
          gridTemplateColumns: rulerSize + 'px ' + (width - rulerSize) + 'px',
          gridTemplateRows: rulerSize + 'px ' + (height - rulerSize) + 'px'
        } },
      _react2.default.createElement('div', { style: { gridColumn: 1, gridRow: 1, backgroundColor: rulerBgColor } }),
      _react2.default.createElement(
        'div',
        { style: { gridRow: 1, gridColumn: 2, position: 'relative', overflow: 'hidden' }, id: 'rulerX' },
        sceneWidth && _react2.default.createElement(_export.RulerX, {
          state: state,
          zoom: sceneZoom,
          negativeUnitsNumber: 0,
          fontColor: rulerFnColor,
          width: width - rulerSize,
          zeroLeftPosition: e || 0,
          markerColor: rulerMkColor,
          backgroundColor: rulerBgColor,
          mouseX: state.mouse.get('x'),
          unitPixelSize: rulerUnitPixelSize,
          positiveUnitsNumber: rulerXElements
        })
      ),
      _react2.default.createElement(
        'div',
        { style: { gridColumn: 1, gridRow: 2, position: 'relative', overflow: 'hidden' }, id: 'rulerY' },
        sceneHeight && _react2.default.createElement(_export.RulerY, {
          state: state,
          zoom: sceneZoom,
          negativeUnitsNumber: 0,
          fontColor: rulerFnColor,
          markerColor: rulerMkColor,
          height: height - rulerSize,
          backgroundColor: rulerBgColor,
          mouseY: state.mouse.get('y'),
          unitPixelSize: rulerUnitPixelSize,
          positiveUnitsNumber: rulerYElements,
          zeroTopPosition: sceneHeight * sceneZoom + f || 0
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactSvgPanZoom.ReactSVGPanZoom,
            {
              ref: refViewer2D,
              className: 'ReactSVGPanZoom',
              toolbarPosition: 'none',
              miniaturePosition: 'none',
              width: width - rulerSize,
              tool: mode2Tool(mode),
              height: height - rulerSize,
              style: { gridColumn: 2, gridRow: 2 },
              detectAutoPan: mode2DetectAutopan(mode),
              value: viewer2D.isEmpty() ? null : viewer2D.toJS(),
              onMouseUp: onMouseUp,
              onMouseMove: onMouseMove,
              onMouseDown: onMouseDown,
              onChangeTool: onChangeTool,
              onChangeValue: update2DView
            },
            _react2.default.createElement(
              'svg',
              { width: (0, _selectors.getRejillaTotal2D)(state) / 10, height: (0, _selectors.getRejillaTotal2D)(state) / 10 },
              _react2.default.createElement(
                'defs',
                null,
                _react2.default.createElement(
                  'pattern',
                  { id: 'diagonalFill', patternUnits: 'userSpaceOnUse', width: '4', height: '4', fill: '#FFF' },
                  _react2.default.createElement('rect', { x: '0', y: '0', width: '4', height: '4', fill: '#FFF' }),
                  _react2.default.createElement('path', { d: 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2', style: { stroke: '#8E9BA2', strokeWidth: 1 } })
                )
              ),
              _react2.default.createElement(
                'g',
                { style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode)) },
                _react2.default.createElement(_state2.default, { state: state, catalog: catalog })
              )
            )
          )
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactSvgPanZoom.ReactSVGPanZoom,
          {
            ref: refViewer2D,
            style: { gridColumn: 2, gridRow: 2 },
            width: width - rulerSize,
            height: height - rulerSize,
            value: viewer2D.isEmpty() ? null : viewer2D.toJS(),
            onChangeValue: update2DView,
            tool: mode2Tool(mode),
            onChangeTool: onChangeTool,
            detectAutoPan: mode2DetectAutopan(mode),
            onMouseDown: onMouseDown,
            onMouseMove: onMouseMove,
            onMouseUp: onMouseUp,
            miniaturePosition: 'none',
            toolbarPosition: 'none'
          },
          _react2.default.createElement(
            'svg',
            { width: (0, _selectors.getRejillaTotal2D)(state) / 10, height: (0, _selectors.getRejillaTotal2D)(state) / 10 },
            _react2.default.createElement(
              'defs',
              null,
              _react2.default.createElement(
                'pattern',
                { id: 'diagonalFill', patternUnits: 'userSpaceOnUse', width: '4', height: '4', fill: '#FFF' },
                _react2.default.createElement('rect', { x: '0', y: '0', width: '4', height: '4', fill: '#FFF' }),
                _react2.default.createElement('path', { d: 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2', style: { stroke: '#8E9BA2', strokeWidth: 1 } })
              )
            ),
            _react2.default.createElement(
              'g',
              { style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode)) },
              _react2.default.createElement(_state2.default, { state: state, catalog: catalog })
            )
          )
        )
      )
    );
  }
}

Viewer2D.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

// Viewer2D.contextTypes = {
//   viewer2DActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   verticesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   areaActions: PropTypes.object.isRequired,
//   projectActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object.isRequired,
// };