import { BoxHelper, Box3, ObjectLoader, Object3D } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';

import React from 'react';
import { object } from 'prop-types';

const glb = require( './Mueble_attila_1000.glb' );
//const glb = require('./Fussion_Chrome_800_2_cajones.glb');
//const glb = require('./prueba.glb');

// Ancho : { 10m - 18.4m }
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
  rotation: { y: 90 }
};

export default {
  name: 'Mueble_attila_1000',
  prototype: 'items',

  info: {
    title: 'Mueble Oscar',
    // title: 'Mueble attila 1000',
    tag: [ 'furnishings', 'leather' ],
    // description: 'Mueble attila 1000',
    description: 'Mueble de entrada para pruebas',
    image: require( './Mueble_attila_1000.jpg' ),
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
    //depth: {
    //  label: "Fondo",
    //  type: "length-measure",
    //  defaultValue: {
    //    length: 45.2,
    //    unit: 'cm'
    //  }
    //}
  },

  render2D: function ( element, layer, scene ) {
    console.log( 'hi', element );
    let width = ( typeof ( element.width ) == 'object' ) ? element.properties.get( 'width' ).get( 'length' ) : element.width;
    // let depth = ( typeof ( element.depth ) == 'object' ) ? element.properties.get( 'depth' ).get( 'length' ) : element.depth;
    let depth = ( typeof ( element.depth ) === 'object' ) ? element.getIn( [ 'depth', 'length' ] ) : element.depth;
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
    console.log( mesh );
    console.log( element );

    if ( sizeParametricObject3d( mesh, element ) )
      return Promise.resolve( mesh );

    return noPerf();
  }
};
