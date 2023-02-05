import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial, loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d } from '../../utils/objects3d-utils';
import path from 'path';

let cached3DDoor = null;

const STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
const STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', fill: '#0096fd', cursor: 'move' };
const STYLE_ARC_BASE = { stroke: '#000', strokeWidth: '3px', strokeDasharray: '5,5', fill: 'none' };
const STYLE_ARC_SELECTED = { stroke: '#0096fd', strokeWidth: '4px', strokeDasharray: '5,5', fill: 'none', cursor: 'move' };
const EPSILON = 3;

const glb = require( './Puerta morph.glb' );

// Escala : { 0.001, 0.001, 0.001 }
// Ancho : { 0.8m - 1.4m }
const width =
{
  min: 0.8 * 100,  // cm
  max: 1.4 * 100  // cm
};
// Fondo : { 0.145m - 0.594m }
const depth =
{
  min: 0.145 * 100,  // cm
  max: 0.594 * 100  // cm
};
// Alto : { 1.8m - 3m }
const height =
{
  min: 1.8 * 100,  // cm
  max: 3 * 100  // cm
};

const glbInfo =
{
  gltfFile: glb, width, height, depth, tocm: true, normalizeOrigin: false
  //, rotation: { y: -90 }
  , scale: { x: 100, y: 100, z: 100 }
};

export default {
  name: 'door',
  prototype: 'holes',

  info: {
    title: 'door',
    tag: [ 'door' ],
    description: 'Wooden door',
    image: require( './door.png' ),
    width: width,
    depth: depth,
    height: height,
  },

  properties: {
    width: {
      label: 'Ancho',
      type: 'length-measure',
      defaultValue: {
        length: 80
      }
    },
    height: {
      label: 'Alto',
      type: 'length-measure',
      defaultValue: {
        length: 215
      }
    },
    altitude: {
      label: 'Fondo',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'Altura Z',
      type: 'length-measure',
      defaultValue: {
        length: 30,
        unit: 'cm'
      }
    },
    distanciaD: {
      label: 'Distancia D',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    distanciaI: {
      label: 'Distancia I',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
  },

  render2D: function ( element, layer, scene ) {
    let flip = element.properties.get( 'flip_orizzontal' );
    let holeWidth = element.properties.get( 'width' ).get( 'length' );
    let holePath = `M${ 0 } ${ -EPSILON }  L${ holeWidth } ${ -EPSILON }  L${ holeWidth } ${ EPSILON }  L${ 0 } ${ EPSILON }  z`;
    let arcPath = `M${ 0 },${ 0 }  A${ holeWidth },${ holeWidth } 0 0,1 ${ holeWidth },${ holeWidth }`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    let length = element.properties.get( 'width' ).get( 'length' );

    if ( flip == false ) {
      return (
        <g transform={ `translate(${ -length / 2 }, 0)` }>
          <path d={ arcPath } style={ arcStyle } transform={ `translate(${ 0 },${ holeWidth }) scale(${ 1 },${ -1 }) rotate(${ 0 })` } />
          <line x1={ 0 } y1={ holeWidth - EPSILON } x2={ 0 } y2={ 0 - EPSILON } style={ holeStyle } transform={ `scale(${ -1 },${ 1 })` } />
          <path d={ holePath } style={ holeStyle } />
        </g>
      );
    }
    else {
      return (
        <g transform={ `translate(${ -length / 2 }, 0)` }>
          <path d={ arcPath } style={ arcStyle } transform={ `translate(${ 0 },${ -holeWidth }) scale(${ 1 },${ 1 }) rotate(${ 0 })` } />
          <line x1={ 0 } y1={ -holeWidth - EPSILON } x2={ 0 } y2={ 0 - EPSILON } style={ holeStyle } transform={ `scale(${ -1 },${ 1 })` } />
          <path d={ holePath } style={ holeStyle } />
        </g>
      );
    }
  },

  render3D: function ( element, layer, scene ) {
    let loadItem = () =>
      loadGLTF( glbInfo );

    return getObject3d( element.name, loadItem ).then( object => {
      /*
      let obj = new Object3D();
      let bbox = new BoxHelper(object, 0x99c3fb);

      bbox.material.linewidth = 100;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      obj.add(bbox);
      obj.add(object);
      //object.add(bbox);

      //selectedObject3d(object, element.selected);
      //sizeParametricObject3d(object, glbInfo, element);

      return obj;
      */

      sizeParametricObject3d( object, element );

      return object;

    } );
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {

    let noPerf = () => { selfDestroy(); return selfBuild(); };

    /*
    if (differences.indexOf('selected') !== -1) {
      if (element.selected) {
        let bbox = new BoxHelper(mesh, 0x99c3fb);
        bbox.material.linewidth = 5;
        bbox.renderOrder = 1000;
        bbox.material.depthTest = false;
        mesh.add(bbox);

        return Promise.resolve(mesh);
      }
    }
    */

    /*
    if (differences.indexOf('selected') !== -1) {
      //mesh.traverse((child) => {
      //  if (child instanceof BoxHelper) {
      //    child.visible = element.selected;
      //  }
      //});
      selectedObject3d(mesh, element.selected);

      return Promise.resolve(mesh);
    }
    */

    if ( differences.indexOf( 'rotation' ) !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve( mesh );
    }

    if ( sizeParametricObject3d( mesh, element ) )
      return Promise.resolve( mesh );

    return noPerf();
  }
};
