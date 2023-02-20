import { BoxHelper, Box3, ObjectLoader, Object3D, Mesh } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects, repeatTexturesOnMorph } from '../../utils/objects3d-utils';
import path from 'path';
import { render2DSimple } from '../../utils/objects2d-utils';

const glb = require( './SOFIA 800.glb' );

const width =
{
  min: 80,  // cm
  max: 240  // cm
};

const depth = {
  min: 460,
  max: 460
};

const height = {
  min: 143,
  max: 143
};

const widthRight = {
  min: 0,
  max: 80
};

const widthLeft = {
  min: 0,
  max: 80
};

const glbInfo =
{
  gltfFile: glb, width, height, depth,
  widthRight,
  widthLeft,
  tocm: true,
  normalizeOrigin: false,
};

export default {
  name: '24403',
  prototype: 'items',

  info: {
    title: '24403',
    tag: [ 'furnishings', 'leather' ],
    description: 'LAVABO SOFIA A MEDIDA',
    price: 942,
    image: require( './24403.jpg' ),
    width: width,
    depth: depth,
    height: height,
    widthRight: widthRight,
    widthLeft: widthLeft
  },

  properties: {
    width: {
      label: "Ancho",
      type: "length-measure",
      defaultValue: {
        length: 80,
        unit: 'cm'
      }
    },
    widthRight: {
      label: 'Ancho Derecha',
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    widthLeft: {
      label: 'Ancho Izquierda',
      type: "length-measure",
      defaultValue: {
        length: 0,
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
        length: 14.3,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altura de colocación',
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
    let noPerf = () => {
      selfDestroy();
      return selfBuild();
    };

    if ( differences.indexOf( 'rotation' ) !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve( mesh );
    }

    if ( differences.indexOf( 'altitude' ) !== -1 ) {
      mesh.position.y = element.properties.getIn( [ 'altitude', 'length' ] );
    }

    if ( sizeParametricObject3d( mesh, element, differences ) ) {
      // repeatTexturesOnMorph( mesh );
      return Promise.resolve( mesh );
    }

    return noPerf();
  }
};
