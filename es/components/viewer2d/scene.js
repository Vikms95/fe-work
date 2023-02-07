var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Grids } from './export';

export default function Scene(_ref) {
  var state = _ref.state,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var layers = scene.layers;

  var selectedLayer = layers.get(scene.selectedLayer);

  return React.createElement(
    'g',
    null,
    React.createElement(Grids, { state: state, scene: scene }),
    React.createElement(
      'g',
      { style: { pointerEvents: 'none' } },
      layers.entrySeq().filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            layerID = _ref3[0],
            layer = _ref3[1];

        return layerID !== scene.selectedLayer && layer.visible;
      }).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            layerID = _ref5[0],
            layer = _ref5[1];

        return React.createElement(Layer, {
          key: layerID,
          layer: layer,
          scene: scene,
          catalog: catalog
        });
      })
    ),
    React.createElement(Layer, {
      key: selectedLayer.id,
      layer: selectedLayer,
      scene: scene,
      catalog: catalog
    })
  );
}
// export default class Scene extends Component {

//   shouldComponentUpdate ( nextProps, nextState ) {
//     return this.props.scene.hashCode() !== nextProps.scene.hashCode();
//   }

//   render () {
//     let { state, scene, catalog } = this.props;
//     let { height, layers } = scene;
//     let selectedLayer = layers.get( scene.selectedLayer );

//     return (
//       <g>
//         <Grids state={ state } scene={ scene } />

//         <g style={ { pointerEvents: 'none' } }>
//           { layers
//             .entrySeq()
//             .filter( ( [ layerID, layer ] ) => layerID !== scene.selectedLayer && layer.visible )
//             .map( ( [ layerID, layer ] ) => <Layer key={ layerID } layer={ layer } scene={ scene } catalog={ catalog } /> )
//           }
//         </g>

//         <Layer key={ selectedLayer.id } layer={ selectedLayer } scene={ scene } catalog={ catalog } />
//       </g>
//     );
//   }
// }


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};