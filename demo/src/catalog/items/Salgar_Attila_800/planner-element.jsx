import { TextureLoader, BoxHelper, Box3, ObjectLoader, Object3D, Mesh, RepeatWrapping } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects, repeatTexturesOnMorph } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';
import { render2DSimple } from '../../utils/objects2d-utils';

import blancoTexture from './textures/alto-blanco-brillo.jpg';
import eternityTexture from './textures/roble-eternity.jpg';
import ostippoTexture from './textures/roble-ostippo.jpg';

import React from 'react';
import { object } from 'prop-types';

const glb = require( './attila 800 3c mlea.glb' );

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
  name: '90830',
  prototype: 'items',

  info: {
    title: '90830',
    // title: 'Fussion Chrome 800 2 cajones',
    tag: [ 'furnishings', 'leather' ],
    // description: 'Mueble attila Fussion Chrome 800 2 cajones',
    description: 'ATTILA 800 3 C. Conjunto mueble de baño ATTILA 800 3 cajones + Lavabo + Espejo + Aplique',
    price: 569,
    image: require( './90830.jpg' ),
    width: width,
    depth: depth,
    height: height,
  },

  properties: {
    width: {
      label: "Ancho",
      type: "length-measure",
      defaultValue: {
        length: 81,
        unit: 'cm'
      }
    },
    depth: {
      label: "Fondo",
      type: "length-measure",
      defaultValue: {
        length: 46,
        unit: 'cm'
      }
    },
    height: {
      label: "Alto",
      type: "length-measure",
      defaultValue: {
        length: 190,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altura de colocación',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    texture: {
      label: 'Textura',
      type: 'enum',
      defaultValue: { alto: 'Alto Blanco Brillo' },
      values: {
        alto: 'Alto Blanco Brilo',
        eternity: 'Roble Eternity',
        ostippo: 'Roble Ostippo',
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
    let noPerf = () => {
      console.log( "Hi" );
      console.log( selfBuild );
      selfDestroy();
      return selfBuild();
    };

    if ( differences.indexOf( 'texture' ) !== -1 ) {
      let texture;
      const loader = new TextureLoader();
      const textureProperty = element.getIn( [ 'properties', 'texture' ] );

      switch ( textureProperty ) {
        case 'alto':
          texture = loader.load( blancoTexture ); break;
        case 'eternity':
          texture = loader.load( eternityTexture ); break;
        case 'ostippo':
          texture = loader.load( ostippoTexture ); break;
      }

      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;

      mesh.traverse( node => {
        if ( node instanceof Mesh )
          node.material.map = texture;
      } );
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
