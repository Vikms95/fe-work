import * as Three from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { HELVETIKER } from './libs/helvetiker_regular.typeface.js';
import gridHorizontalStreak from './grids/grid-horizontal-streak';
import gridVerticalStreak from './grids/grid-vertical-streak';


export default function createGrid ( state, scene ) {
  let gridMesh = new Three.Object3D();
  gridMesh.name = 'grid';
  let fontLoader = new FontLoader();
  let font = fontLoader.parse( HELVETIKER ); // For measures
  let { grids, width, height } = scene;

  grids.forEach( grid => {
    switch ( grid.type ) {
      case 'horizontal-streak':
        gridMesh.add( gridHorizontalStreak( state, width, height, grid, font ) );
        break;
      case 'vertical-streak':
        gridMesh.add( gridVerticalStreak( state, width, height, grid, font ) );
        break;
    }
  } );

  gridMesh.position.y = -1;
  console.log( gridMesh );
  return gridMesh;
}
