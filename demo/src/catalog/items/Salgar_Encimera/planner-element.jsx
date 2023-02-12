import { BoxHelper, Box3, ObjectLoader, Object3D, Mesh } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects, repeatTexturesOnMorph } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';
import { render2DSimple } from '../../utils/objects2d-utils';

import React from 'react';
import { object } from 'prop-types';

const glb = require( './encimera doble fondo.glb' );

const width =
{
  min: 60,  // cm
  max: 240  // cm
};

const depth = {
  min: 46,
  max: 46
};

const height = {
  min: 12,
  max: 12
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
  name: '87978',
  prototype: 'items',

  info: {
    title: '87978',
    // title: 'Fussion Chrome 800 2 cajones',
    tag: [ 'furnishings', 'leather' ],
    // description: 'Mueble attila Fussion Chrome 800 2 cajones',
    description: 'ENCIMERA',
    image: require( './87978.jpg' ),
    width: width,
    depth: depth,
    height: height,
  },

  properties: {
    width: {
      label: "Ancho",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    depth: {
      label: "Fondo",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    height: {
      label: "Alto",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altura Z',
      type: 'length-measure',
      defaultValue: {
        length: 87,
        unit: 'cm'
      }
    },
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

    console.log( differences );

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
