import React from 'react';
import * as SharedStyle from '../../shared-style';
import bricks from './textures/bricks.jpg';
import Mosaico from './textures/Mosaico Zen Blanco.jpg';
import pureTexture from './textures/Pure.jpg';
import realTexture from './textures/Real.jpg';
import intenseTexture from './textures/Intense.jpg';

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
  fontSize: '13px',
  rowGap: '0.5em'

};

const STYLE_THREE_ELEMENT = {
  height: '165px',
  width: '165px',
  outline: '1px solid black',
};

const wallTextures = [
  bricks,
  Mosaico,
];

const areaTextures = [
  bricks,
  Mosaico,
];

const itemTextures = [
  pureTexture,
  intenseTexture,
  realTexture,
];

export default function MenuPropertyThree ( {
  propertyName,
  element,
  data,
  updateProperty
} ) {

  const proto = element.get( 'prototype' );
  const configs = data.get( 'configs' );
  const currentValue = data.get( 'currentValue' );

  console.log( proto );

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
              { proto === 'items' && (
                <img
                  src={
                    itemTextures[ index ]
                  }
                  style={ {
                    ...STYLE_THREE_ELEMENT,
                    outline: value === currentValue && '5px solid' + SharedStyle.PRIMARY_COLOR.master
                  } }
                />

              ) }
              { proto === 'lines' && (
                <img
                  src={
                    wallTextures[ index ]
                  }
                  style={ {
                    ...STYLE_THREE_ELEMENT,
                    outline: value === currentValue && '5px solid' + SharedStyle.PRIMARY_COLOR.master
                  } }
                />

              ) }
              { proto === 'areas' && (
                <img
                  src={
                    areaTextures[ index ]
                  }
                  style={ {
                    ...STYLE_THREE_ELEMENT,
                    outline: value === currentValue && '5px solid' + SharedStyle.PRIMARY_COLOR.master
                  } }
                />

              ) }


              <div> { name } </div>
            </div>
          );
      } ) }
    </div>

  );
}
