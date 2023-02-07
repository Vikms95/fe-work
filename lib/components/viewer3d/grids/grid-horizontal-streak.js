'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, width, height, grid, font) {

  /*let step = grid.properties.get('step');*/
  var step = state.getIn(['prefs', 'T/REJILLA2D']) / 10 / 5;
  /*step = 50*/
  /*console.log(grid.properties.get('step'))*/

  /*  console.log('prefs', state.getIn(['prefs', ]))*/
  var medidaTotalRejilla = state.getIn(['prefs', 'T/REJILLATOTAL3D']) / 10;
  var unit = state.getIn(['prefs', 'UNIDADMEDIDA']);

  var colors = grid.properties.has('color') ? new _immutable.List([grid.properties.get('color')]) : grid.properties.get('colors');

  var streak = new Three.Object3D();
  streak.name = 'streak';
  var counter = 0;
  var positionNumComponent = 3;

  for (var i = 0; i <= medidaTotalRejilla; i += step) {
    var geometry = new Three.BufferGeometry();
    var positions = new Float32Array([0, 0, -i, medidaTotalRejilla, 0, -i]);

    geometry.setAttribute('position', new Three.BufferAttribute(positions, positionNumComponent));

    var color = colors.get(counter % colors.size);
    var material = new Three.LineBasicMaterial({ color: color });

    if (state.getIn(['prefs', 'GUIA3D'])) {
      if (counter % 5 == 0) {
        var shape = new _TextGeometry.TextGeometry('' + (0, _changeUnit.showMeasure)(counter * step, unit), {
          size: 16,
          height: 1,
          font: font
        });

        var wrapper = new Three.MeshBasicMaterial({ color: _sharedStyle.COLORS.black });
        var words = new Three.Mesh(shape, wrapper);

        words.rotation.x -= Math.PI / 2;
        words.position.set(-90, 0, -i);
        streak.add(words);
      }
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
};

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _immutable = require('immutable');

var _sharedStyle = require('../../../shared-style');

var _changeUnit = require('../../../utils/changeUnit');

var _TextGeometry = require('three/examples/jsm/geometries/TextGeometry.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }