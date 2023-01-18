import { BoxHelper, Box3, ObjectLoader, Object3D } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';

import React from 'react';
import { object } from 'prop-types';

const glb = require( './Fussion_Chrome_800_2_cajones.glb' );

const width =
{
  min: 100,  // cm
  max: 184  // cm
};
const depth = 45.2;  // cm
const height = 50;  // cm

const glbInfo =
{
  gltfFile: glb, width, height, depth,
  tocm: true,
  normalizeOrigin: false,
  rotation: { y: 180 }
};

export default {
  name: 'Fussion_Chrome_800_2_cajones_7',
  prototype: 'items',

  info: {
    title: 'Victor_Cubo_Madera_BrilloAlto',
    // title: 'Fussion Chrome 800 2 cajones',
    tag: [ 'furnishings', 'leather' ],
    // description: 'Mueble attila Fussion Chrome 800 2 cajones',
    description: 'Mueble de entrada para pruebas',
    image: require( './Captura.JPG' ),
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
    }
  },

  render2D: function ( element, layer, scene ) {
    let width = ( typeof ( element.width ) == 'object' ) ? element.properties.get( 'width' ).get( 'length' ) : element.width;
    let depth = ( typeof ( element.depth ) == 'object' ) ? element.properties.get( 'depth' ).get( 'length' ) : element.depth;
    let angle = element.rotation + 90;
    let textRotation = Math.sin( angle * Math.PI / 180 ) < 0 ? 180 : 0;

    let style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    let arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    return (
      <g>
        {/*<g transform={`translate(${-width / 2},${-depth / 2})`}>*/ }
        <rect x="0" y="0" width={ width } height={ depth } style={ style } />
        <line x1={ width / 2 } x2={ width / 2 } y1={ depth } y2={ 1.5 * depth }
          style={ arrow_style } />
        <line
          x1={ .35 * width }
          x2={ width / 2 }
          y1={ 1.2 * depth }
          y2={ 1.5 * depth }
          style={ arrow_style }
        />
        <line
          x1={ width / 2 }
          x2={ .65 * width }
          y1={ 1.5 * depth }
          y2={ 1.2 * depth }
          style={ arrow_style }
        />
        <text
          x="0"
          y="0"
          transform={ `translate(${ width / 2 }, ${ depth / 2 }) scale(1,-1) rotate(${ textRotation })` }
          style={ { textAnchor: 'middle', fontSize: '11px' } }
        >
          { element.type }
        </text>
      </g>
    );
  },

  render3D: function ( element, layer, scene ) {
    console.log( 'test render3D from mueble' );
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
      console.log( 'test cacheloaded', cacheLoadedObjects );
      console.log( 'test cacheloading', cacheLoadedObjects );
      sizeParametricObject3d( object, element );

      return object;

    } );
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {
    console.log( 'test updaterender3D from mueble' );
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
