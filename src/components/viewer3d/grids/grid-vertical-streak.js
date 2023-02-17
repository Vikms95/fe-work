import * as Three from 'three';
import { List } from 'immutable';
import { COLORS } from '../../../shared-style';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { showMeasure } from '../../../utils/changeUnit';
import { BufferAttribute } from 'three';

export default function ( state, width, height, grid, font ) {
  const step = ( ( state.getIn( [ 'prefs', 'T/REJILLA2D' ] ) / 10 ) / 5 );

  let colors = grid.properties.has( 'color' ) ? new List( [ grid.properties.get( 'color' ) ] ) : grid.properties.get( 'colors' );

  const medidaTotalRejilla = ( state.getIn( [ 'prefs', 'T/REJILLATOTAL3D' ] ) / 10 );
  const unit = state.getIn( [ 'prefs', 'UNIDADMEDIDA' ] );

  let streak = new Three.Object3D();
  streak.name = 'streak';

  let counter = 0;

  for ( let i = 0; i <= medidaTotalRejilla; i += step ) {
    const geometry = new Three.BufferGeometry();
    const positionNumComponent = 3;
    const positions = new Float32Array( [ i, 0, 0, i, 0, - medidaTotalRejilla ] );

    geometry.setAttribute(
      'position',
      new BufferAttribute( positions, positionNumComponent )
    );

    let color = colors.get( counter % colors.size );
    let material = new Three.LineBasicMaterial( { color } );

    if ( state.getIn( [ 'prefs', 'GUIA3D' ] ) ) {
      if ( counter % 5 == 0 ) {
        let shape = new TextGeometry( ( '' + showMeasure( ( counter * step ), unit ) ), {
          size: 16,
          height: 1,
          font: font
        } );

        let wrapper = new Three.LineBasicMaterial( { color: COLORS.black } );
        let words = new Three.Mesh( shape, wrapper );

        words.rotation.x -= Math.PI / 2;
        words.position.set( i - 20, 0, 50 );
        streak.add( words );
      }
    }

    streak.add( new Three.LineSegments( geometry, material ) );
    counter++;
  }
  return streak;
}
