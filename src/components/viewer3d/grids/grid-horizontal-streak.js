import * as Three from 'three';
import { List } from 'immutable';
import { COLORS } from '../../../shared-style';
import { showMeasure } from '../../../utils/changeUnit';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default function ( state, width, height, grid, font ) {

  /*let step = grid.properties.get('step');*/
  const step = ( ( state.getIn( [ 'prefs', 'T/REJILLA2D' ] ) / 10 ) / 5 );
  /*step = 50*/
  /*console.log(grid.properties.get('step'))*/

  /*  console.log('prefs', state.getIn(['prefs', ]))*/
  const medidaTotalRejilla = ( state.getIn( [ 'prefs', 'T/REJILLATOTAL3D' ] ) / 10 );
  const unit = state.getIn( [ 'prefs', 'UNIDADMEDIDA' ] );

  let colors = grid.properties.has( 'color' ) ? new List( [ grid.properties.get( 'color' ) ] ) : grid.properties.get( 'colors' );

  let streak = new Three.Object3D();
  streak.name = 'streak';
  let counter = 0;

  for ( let i = 0; i <= medidaTotalRejilla; i += step ) {
    const geometry = new Three.BufferGeometry();
    const positionNumComponent = 3;
    const positions = new Float32Array( [ 0, 0, -i, medidaTotalRejilla, 0, -i ] );

    geometry.addAttribute(
      'position',
      new Three.BufferAttribute( positions, positionNumComponent )
    );

    let color = colors.get( counter % colors.size );
    let material = new Three.LineBasicMaterial( { color } );

    if ( state.getIn( [ 'prefs', 'GUIA3D' ] ) ) {
      if ( counter % 5 == 0 ) {
        let shape = new TextGeometry( ( '' + showMeasure( ( counter * step ), unit ) ), {
          size: 16,
          height: 1,
          font
        } );

        let wrapper = new Three.MeshBasicMaterial( { color: COLORS.black } );
        let words = new Three.Mesh( shape, wrapper );

        words.rotation.x -= Math.PI / 2;
        words.position.set( -90, 0, -i );
        streak.add( words );
      }
    }

    streak.add( new Three.LineSegments( geometry, material ) );
    counter++;
  }
  return streak;
}
