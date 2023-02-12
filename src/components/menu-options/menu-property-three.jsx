import React from 'react';
import * as SharedStyle from '../../shared-style';

import pureTexture from './textures/Pure.jpg';
import realTexture from './textures/Real.jpg';
import intenseTexture from './textures/Intense.jpg';

import bohemianTexture from './textures/Bohemian Blue.jpg';
import greenMosaicTexture from './textures/Green Mosaic.jpg';
import greenTexture from './textures/Green.jpg';
import marmolTexture from './textures/Marmol.jpg';
import ral5010 from './textures/RAL 5010.jpg';
import ral9016 from './textures/RAL 9016.jpg';

import hidraulicoTexture from './textures/Hidraulico 9.jpg';
import sueloTexture from './textures/Suelo (35).jpg';

const STYLE_TEXTURES_THREE = {
  margin: '2em 1.5em ',
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
  height: '125px',
  width: '125px',
  outline: '1px solid black',
};

const wallTextures = [
  bohemianTexture,
  greenMosaicTexture,
  greenTexture,
  marmolTexture,
  ral5010,
  ral9016
];

const areaTextures = [
  hidraulicoTexture,
  marmolTexture,
  sueloTexture
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
                    wallTextures[ index - 1 ]
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
                    areaTextures[ index - 1 ]
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
