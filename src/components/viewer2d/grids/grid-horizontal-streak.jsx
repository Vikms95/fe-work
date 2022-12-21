import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export default function GridHorizontalStreak ( { state, width, height, grid } ) {

  // Se divide entre 10 para pasarlo a cm
  const rejillaTotal = ( state.getIn( [ 'prefs', 'T/REJILLATOTAL2D' ] ) / 10 );
  let step = ( ( state.getIn( [ 'prefs', 'T/REJILLA2D' ] ) / 10 ) / 5 );

  // 10 = 500
  // 20 = 1000
  // 2 = 100
  /*let step = grid.properties.get('step');*/


  let colors;

  if ( grid.properties.has( 'color' ) ) {
    colors = new List( [ grid.properties.get( 'color' ) ] );
  } else {
    colors = grid.properties.get( 'colors' );
  }

  let rendered = [];
  let i = 0;
  for ( let y = 0; y <= rejillaTotal; y += step ) {
    let color = colors.get( i % colors.size );

    i++;
    rendered.push( <line key={ y } x1="0" y1={ y } x2={ rejillaTotal } y2={ y } strokeWidth="1" stroke={ color } /> );
  }

  return ( <g>{ rendered }</g> );
}

GridHorizontalStreak.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};
