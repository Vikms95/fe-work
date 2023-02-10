import React from 'react';
import * as SharedStyle from '../../shared-style';
import bricks from './textures/bricks.jpg';
import Mosaico from './textures/Mosaico Zen Blanco.jpg';
// import painted from './RAL 5017.jpg';

const STYLE_TEXTURES_THREE = {
  margin: '2em',
  display: 'flex',
  // gridTemplateColumns: 'repeat(auto-fill, minmax(2rem, 1fr))'
  flexWrap: 'wrap',
  columnGap: '0.6em',
  rowGap: '2em',
  // overflowY: 'scroll'
};

const STYLE_ELEMENT_CONTAINER = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  fontSize: '0.5em',
  rowGap: '0.5em'

};

const STYLE_THREE_ELEMENT = {
  height: '165px',
  width: '165px',
  outline: '1px solid black',
};

const textures = [
  bricks,
  Mosaico,
];

export default function MenuPropertyThree ( {
  propertyName,
  data,
  updateProperty
} ) {

  let configs = data.get( 'configs' );
  let currentValue = data.get( 'currentValue' );

  return (
    <div style={ STYLE_TEXTURES_THREE } className='options-three'>
      { Object.entries( configs.values ).map( ( [ value, name ], index ) => {
        if ( value !== 'none' )
          return (
            <div
              key={ value }
              style={ {
                ...STYLE_ELEMENT_CONTAINER
              } }
              onClick={ () => updateProperty( propertyName, value ) }
            >
              <img
                src={ textures[ index ] }
                style={ {
                  ...STYLE_THREE_ELEMENT,
                  outline: value === currentValue && '5px solid' + SharedStyle.PRIMARY_COLOR.master
                } }
              />
              <div> { name } </div>
            </div>
          );
      } ) }
    </div>

  );
}
