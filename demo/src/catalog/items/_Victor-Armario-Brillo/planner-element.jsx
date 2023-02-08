import { BoxHelper, Box3, ObjectLoader, Object3D, Mesh } from 'three';
import { loadGLTF } from '../../utils/load-obj';
import { getObject3d, selectedObject3d, sizeParametricObject3d, cacheLoadedObjects, cacheLoadingObjects, repeatTexturesOnMorph } from '../../utils/objects3d-utils';
import { render2DSimple } from '../../utils/objects2d-utils';
import path from 'path';
import convert from 'convert-units';

//import React from 'react';
import { object } from 'prop-types';

const glb = require('./Fussion_Chrome_800_2_cajones_2.glb');

const width =
{
  min: 100,  // cm
  max: 184  //184 cm
};

const depth = {
  min: 45.2,
  max: 100
};

const height = {
  min: 45.2,
  max: 100
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
  name: 'Fussion_Chrome_800_2_cajones_2',
  prototype: 'items',

  info: {
    title: 'Victor_Armario_Brillo',
    // title: 'Fussion Chrome 800 2 cajones',
    tag: ['furnishings', 'leather'],
    // description: 'Mueble attila Fussion Chrome 800 2 cajones',
    description: 'Mueble de entrada para pruebas',
    image: require('./Fussion_Chrome_800_2_cajones.jpg'),
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
  },

  render2D: function (element, layer, scene) {
    return render2DSimple(element, layer, scene);
    //let width = (typeof (element.width) == 'object') ? element.properties.get('width').get('length') : element.width;
    //let depth = (typeof (element.depth) == 'object') ? element.properties.get('depth').get('length') : element.depth;
    //let angle = element.rotation + 90;
    //let textRotation = Math.sin(angle * Math.PI / 180) < 0 ? 180 : 0;

    //let style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    //let arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    //return (
    //  <g transform={`translate(0,${-depth})`}>
    //    {/*<g transform={`translate(${-width / 2},${-depth / 2})`}>*/}
    //    <rect x="0" y="0" width={width} height={depth} style={style} />
    //    {/*<line x1={width / 2} x2={width / 2} y1={depth} y2={1.5 * depth} style={arrow_style} />*/}
    //    <line x1={width / 2} x2={width / 2} y1="0" y2={-depth / 2} style={arrow_style} />
    //    {/*<line*/}
    //    {/*  x1={.35 * width}*/}
    //    {/*  x2={width / 2}*/}
    //    {/*  y1={1.2 * depth}*/}
    //    {/*  y2={1.5 * depth}*/}
    //    {/*  style={arrow_style}*/}
    //    {/*/>*/}
    //    <line
    //      x1={.35 * width}
    //      x2={width / 2}
    //      y1={-depth / 5}
    //      y2={-depth / 2}
    //      style={arrow_style}
    //    />
    //    {/*<line*/}
    //    {/*  x1={width / 2}*/}
    //    {/*  x2={.65 * width}*/}
    //    {/*  y1={1.5 * depth}*/}
    //    {/*  y2={1.2 * depth}*/}
    //    {/*  style={arrow_style}*/}
    //    {/*/>*/}
    //    <line
    //      x1={width / 2}
    //      x2={.65 * width}
    //      y1={-depth / 2}
    //      y2={-depth / 5}
    //      style={arrow_style}
    //    />
    //    <text
    //      x="0"
    //      y="0"
    //      transform={`translate(${width / 2}, ${depth / 2}) scale(1,-1) rotate(${textRotation})`}
    //      style={{ textAnchor: 'middle', fontSize: '11px' }}
    //    >
    //      {element.type}
    //    </text>
    //  </g>
    //);
  },

  render3D: function (element, layer, scene) {
    let loadItem = () =>
      loadGLTF(glbInfo);

    return getObject3d(element.name, loadItem).then(object => {
      sizeParametricObject3d(object, element);
      return object;
    });
  },

  updateRender3D: (element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) => {
    let noPerf = () => { selfDestroy(); return selfBuild(); };

    if (differences.indexOf('rotation') !== -1) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    if (sizeParametricObject3d(mesh, element)) {
      // repeatTexturesOnMorph( mesh );
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};
