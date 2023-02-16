import React from 'react';
import * as SharedStyle from '../../../../shared-style';


import pureTexture from '../textures/Pure.jpg';
import realTexture from '../textures/Real.jpg';
import intenseTexture from '../textures/Intense.jpg';

import blancoTexture from '../textures/alto-blanco-brillo.jpg';
import eternityTexture from '../textures/roble-eternity.jpg';
import ostippoTexture from '../textures/roble-ostippo.jpg';

import bohemianTexture from '../textures/Bohemian Blue.jpg';
import greenMosaicTexture from '../textures/Green Mosaic.jpg';
import greenTexture from '../textures/Green.jpg';
import marmolTexture from '../textures/Marmol.jpg';
import ral5010 from '../textures/RAL 5010.jpg';
import ral9016 from '../textures/RAL 9016.jpg';

import hidraulicoTexture from '../textures/Hidraulico 9.jpg';
import sueloTexture from '../textures/Suelo (35).jpg';

const STYLE_TEXTURE_DISPLAY = {
  color: SharedStyle.PRIMARY_COLOR.master,
  fontWeight: '600',
  fontSize: '15px',
  marginLeft: '30px'
};

const STYLE_IMG_ACABADO = {
  height: '50px',
  width: '50px'
};

const STYLE_CONT = {
  display: 'flex',
  flexDirection: 'column',

};

export function ElementTextureDisplay ( { element } ) {

  const returnAcabado = () => {
    if ( element.name === '90830' ) {
      if ( element.properties.get( 'texture' ) === 'eternity' ) {
        return (
          <div style={ STYLE_CONT }>
            Eternity
            <img src={ eternityTexture } style={ STYLE_IMG_ACABADO } />
          </div>
        );
      }
      if ( element.properties.get( 'texture' ) === 'alto' ) {
        return (
          <div style={ STYLE_CONT }>
            Alto Blanco Brillo
            <img src={ blancoTexture } style={ STYLE_IMG_ACABADO } />
          </div>
        );
      }
      if ( element.properties.get( 'texture' ) === 'ostippo' ) {
        return (
          <div style={ STYLE_CONT }>
            Ostippo
            <img src={ ostippoTexture } style={ STYLE_IMG_ACABADO } />
          </div>
        );
      }
    } else if ( element.prototype === 'items' ) {
      switch ( element.properties.get( 'texture' ) ) {
        case 'real':
          return (
            <div style={ STYLE_CONT }>
              Real
              <img src={ realTexture } style={ STYLE_IMG_ACABADO }></img>
            </div>
          );
        case 'pure':
          return (
            <div style={ STYLE_CONT }>
              Pure
              <img src={ pureTexture } style={ STYLE_IMG_ACABADO }></img>
            </div>
          );
        case 'intense':
          return (
            <div style={ STYLE_CONT }>
              Intense
              <img src={ intenseTexture } style={ STYLE_IMG_ACABADO }></img>
            </div>
          );
      }
    } else if ( element.prototype === 'lines' ) {
      switch ( element.properties.get( 'textureA' ) ) {
        case 'marmol':
          return (
            <div style={ STYLE_CONT }>
              Mármol
              <img src={ marmolTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'bohemianBlue':
          return (
            <div style={ STYLE_CONT }>
              Bohemian Blue
              <img src={ bohemianTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'greenMosaic':
          return (
            <div style={ STYLE_CONT }>
              Green Mosaic
              <img src={ greenMosaicTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'green':
          return (
            <div style={ STYLE_CONT }>
              Green
              <img src={ greenTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'ral5010':
          return (
            <div style={ STYLE_CONT }>
              RAL 5010
              <img src={ ral5010 } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'ral9016':
          return (
            <div style={ STYLE_CONT }>
              RAL 9016
              <img src={ ral9016 } style={ STYLE_IMG_ACABADO } />
            </div>
          );
      }
    } else if ( element.prototype === 'areas' ) {
      switch ( element.properties.get( 'texture' ) ) {
        case 'marmol':
          return (
            <div style={ STYLE_CONT }>
              Mármol
              <img src={ marmolTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'hidraulico':
          return (
            <div style={ STYLE_CONT }>
              Hidráulico
              <img src={ hidraulicoTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
        case 'parquet':
          return (
            <div style={ STYLE_CONT }>
              Parquet
              <img src={ sueloTexture } style={ STYLE_IMG_ACABADO } />
            </div>
          );
      }
    }
  };


  return (
    <div style={ STYLE_TEXTURE_DISPLAY }>
      Acabado
      <div style={ { fontWeight: '200' } }>
        { returnAcabado() }
      </div>
    </div>
  );
}