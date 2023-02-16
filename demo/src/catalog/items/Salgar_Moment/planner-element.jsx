
import { TextureLoader, RepeatWrapping, BoxHelper, Box3, ObjectLoader, Object3D, Mesh } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects, repeatTexturesOnMorph } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';
import { render2DSimple } from '../../utils/objects2d-utils';

import React from 'react';
import { object } from 'prop-types';

import pureTexture from './textures/Pure.jpg';
import realTexture from './textures/Real.jpg';
import intenseTexture from './textures/Intense.jpg';


const glb = require( './moment 800 2c.glb' );

const width =
{
  min: 0,  // cm
  max: 0  // cm
};

const depth = {
  min: 0,
  max: 0
};

const height = {
  min: 0,
  max: 0
};

// const depth = 45.2;  // cm
// const height = 50;  // cm

const glbInfo =
{
  gltfFile: glb, width, height, depth,
  tocm: true,
  normalizeOrigin: false,
  // rotation: { y: 180 }
};

export default {
  name: '91371',
  prototype: 'items',

  info: {
    title: '91371',
    tag: [ 'furnishings', 'leather' ],
    description: 'MOMENT 800 2 C.',
    price: 1059,
    image: require( './91371.jpg' ),
    width: width,
    depth: depth,
    height: height,
  },

  properties: {
    width: {
      label: "Ancho",
      type: "length-measure",
      defaultValue: {
        length: 79.8,
        unit: 'cm'
      }
    },
    depth: {
      label: "Fondo",
      type: "length-measure",
      defaultValue: {
        length: 45.2,
        unit: 'cm'
      }
    },
    height: {
      label: "Alto",
      type: "length-measure",
      defaultValue: {
        length: 54,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altura de colocación',
      type: 'length-measure',
      defaultValue: {
        length: 33,
        unit: 'cm'
      }
    },
    texture: {
      label: 'Textura',
      type: 'enum',
      defaultValue: { pure: 'Pure' },
      values: {
        pure: 'Pure',
        intense: 'Intense',
        real: 'Real',
      }
    }
  },

  render2D: function ( element, layer, scene ) {

    return render2DSimple( element, layer, scene );

  },

  render3D: function ( element, layer, scene ) {
    let loadItem = () =>
      loadGLTF( glbInfo );

    return getObject3d( element.name, loadItem ).then( object => {
      sizeParametricObject3d( object, element );
      return object;
    } );
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {
    let noPerf = () => { selfDestroy(); return selfBuild(); };


    if ( differences.indexOf( 'texture' ) !== -1 ) {
      let texture;
      const loader = new TextureLoader();
      const textureProperty = element.getIn( [ 'properties', 'texture' ] );

      switch ( textureProperty ) {
        case 'real':
          texture = loader.load( realTexture ); break;
        case 'pure':
          texture = loader.load( pureTexture ); break;
        case 'intense':
          texture = loader.load( intenseTexture ); break;
      }

      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;

      mesh.traverse( node => {
        if ( node instanceof Mesh )
          node.material.map = texture;
      } );

      return Promise.resolve( mesh );
    }


    if ( differences.indexOf( 'rotation' ) !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve( mesh );
    }

    if ( differences.indexOf( 'altitude' ) !== -1 ) {
      mesh.position.y = element.properties.getIn( [ 'altitude', 'length' ] );
    }

    if ( sizeParametricObject3d( mesh, element ) ) {
      // repeatTexturesOnMorph( mesh );
      return Promise.resolve( mesh );
    }

    return noPerf();
  }
};
