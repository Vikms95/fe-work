import React from 'react';
import * as Three from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d } from '../../utils/objects3d-utils';

const glb = require( './Ventana.glb' );

const width =
{
  min: 60,  // cm
  max: 300 // cm
};
const depth = //11; // cm
{
  min: 11,  // cm
  max: 11  // cm
};
const height =
{
  min: 80,  // cm
  max: 300  // cm
};

const glbInfo =
{
  gltfFile: glb, width, height, depth, tocm: true, normalizeOrigin: false
  //, rotation: { y: -90 }
  , scale: { x: 100, y: 100, z: 100 }
};

export default {
  name: "window",
  prototype: "holes",

  info: {
    title: "window",
    tag: [ 'window' ],
    description: "Window",
    image: require( './window.png' ),
    width: width,
    depth: depth,
    height: height,
  },

  properties: {
    width: {
      label: "Ancho",
      type: "length-measure",
      defaultValue: {
        length: 120
      }
    },
    height: {
      label: "Alto",
      type: "length-measure",
      defaultValue: {
        length: 120
      }
    },
    altitude: {
      label: "Altitud",
      type: "length-measure",
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: "Fondo",
      type: "length-measure",
      defaultValue: {
        length: 11
      }
    },
    altColocacion: {
      label: 'Altura de Colocación',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
  },

  render2D: function ( element, layer, scene ) {
    const STYLE_HOLE_BASE = { stroke: "#000", strokeWidth: "3px", fill: "#000" };
    const STYLE_HOLE_SELECTED = { stroke: "#0096fd", strokeWidth: "3px", fill: "#0096fd", cursor: "move" };
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let holeWidth = element.properties.get( 'width' ).get( 'length' );
    let holePath = `M${ 0 } ${ -epsilon }  L${ holeWidth } ${ -epsilon }  L${ holeWidth } ${ epsilon }  L${ 0 } ${ epsilon }  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get( 'width' ).get( 'length' );
    return (
      <g transform={ `translate(${ -length / 2 }, 0)` }>
        <path key="1" d={ holePath } style={ holeStyle } />
        <line key="2" x1={ holeWidth / 2 } y1={ -10 - epsilon } x2={ holeWidth / 2 } y2={ 10 + epsilon } style={ holeStyle } />
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

    if ( sizeParametricObject3d( mesh, element ) )
      return Promise.resolve( mesh );

    return noPerf();
  }
};
