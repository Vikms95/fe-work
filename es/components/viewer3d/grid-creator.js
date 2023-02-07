import * as Three from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { HELVETIKER } from './libs/helvetiker_regular.typeface.js';
import gridHorizontalStreak from './grids/grid-horizontal-streak';
import gridVerticalStreak from './grids/grid-vertical-streak';

export default function createGrid(state, scene) {
  var gridMesh = new Three.Object3D();
  gridMesh.name = 'grid';
  var fontLoader = new FontLoader();
  var font = fontLoader.parse(HELVETIKER); // For measures
  var grids = scene.grids,
      width = scene.width,
      height = scene.height;


  grids.forEach(function (grid) {
    switch (grid.type) {
      case 'horizontal-streak':
        gridMesh.add(gridHorizontalStreak(state, width, height, grid, font));
        break;
      case 'vertical-streak':
        gridMesh.add(gridVerticalStreak(state, width, height, grid, font));
        break;
    }
  });

  gridMesh.position.y = -1;
  return gridMesh;
}