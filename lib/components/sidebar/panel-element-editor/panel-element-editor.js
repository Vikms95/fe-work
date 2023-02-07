'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PanelElementEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _elementEditor = require('./element-editor');

var _elementEditor2 = _interopRequireDefault(_elementEditor);

var _constants = require('../../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validModesToShowPanel = [_constants.MODE_IDLE, _constants.MODE_2D_ZOOM_IN, _constants.MODE_2D_ZOOM_OUT, _constants.MODE_2D_PAN, _constants.MODE_3D_VIEW, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_WAITING_DRAWING_LINE, _constants.MODE_DRAWING_LINE, _constants.MODE_DRAWING_HOLE, _constants.MODE_DRAWING_ITEM, _constants.MODE_DRAGGING_LINE, _constants.MODE_DRAGGING_VERTEX, _constants.MODE_DRAGGING_ITEM, _constants.MODE_DRAGGING_HOLE, _constants.MODE_ROTATING_ITEM, _constants.MODE_UPLOADING_IMAGE, _constants.MODE_FITTING_IMAGE];

function PanelElementEditor(_ref) {
  var state = _ref.state;
  var scene = state.scene,
      mode = state.mode;

  if (validModesToShowPanel.includes(mode) === false) return null;

  var componentRenderer = function componentRenderer(element, layer) {
    return _react2.default.createElement(
      'div',
      { key: element.id },
      _react2.default.createElement(_elementEditor2.default, {
        state: state,
        layer: layer,
        element: element
      })
    );
  };

  var lastElementSelectedID = (0, _immutable.fromJS)(state.getIn(['scene', 'selectedElementsHistory'])).first();

  var layerRenderer = function layerRenderer(layer) {
    return (0, _immutable.Seq)().concat(layer.lines, layer.holes, layer.areas, layer.items).filter(function (element) {
      return element.id === lastElementSelectedID;
    }).map(function (element) {
      return componentRenderer(element, layer);
    }).valueSeq();
  };

  //let selectedLayer = state.getIn( [ 'scene', 'selectedLayer' ] );
  //let layerRenderer2 = ( layer ) => {
  //  const elements = layer.getIn( [ selectedLayer, 'lines' ] ).concat( layer.getIn( [ selectedLayer, 'holes' ] ) ).concat( layer.getIn( [ selectedLayer, 'areas' ] ) ).concat( layer.getIn( [ selectedLayer, 'items' ] ) );
  //  const elementsFilter = elements.filter( element => element.selected );
  //  return elementsFilter;
  //};

  //const elementsSelected = layerRenderer2( scene.layers );
  //let i = 0;

  return _react2.default.createElement(
    'div',
    null,
    scene.layers.valueSeq().map(layerRenderer)
  )
  /*<div>
    {
      elementsSelected.map((e) => {
        return componentRenderer(e, scene.layers.valueSeq())
      })
    }
  </div>*/
  ;
}

PanelElementEditor.propTypes = {
  state: _propTypes2.default.object.isRequired
};

// PanelElementEditor.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired
// };