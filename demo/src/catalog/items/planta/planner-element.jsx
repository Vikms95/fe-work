import { BoxHelper, Box3, ObjectLoader } from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import { getObject3d } from '../../utils/objects3d-utils';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

const mtl = require('./planta.mtl');
const obj = require('./planta.obj');

const width = { length: 0.673, unit: 'm' };
const depth = { length: 1.755, unit: 'm' };
const height = { length: 0.690, unit: 'm' };

const mapImages =
{
  'f2h_Planta/5e0c8d09-7eec-452b-b3f1-681017199682.jpg': require('./5e0c8d09-7eec-452b-b3f1-681017199682.jpg'),
  'f2h_Planta/a9c2d9e4-5ed8-49ea-93d5-c34de0757f0e.jpg': require('./a9c2d9e4-5ed8-49ea-93d5-c34de0757f0e.jpg'),
  'f2h_Planta/d9c22c74-b097-4e0d-a972-11f40d44e217.jpg': require('./d9c22c74-b097-4e0d-a972-11f40d44e217.jpg'),
  'f2h_Planta/e3f2576a-6a34-4fcb-8ae5-a9c95130d35b.jpg': require('./e3f2576a-6a34-4fcb-8ae5-a9c95130d35b.jpg'),
  'f2h_Planta/f693a490-cd73-4909-b4c0-8c395bad7f3e.jpg': require('./f693a490-cd73-4909-b4c0-8c395bad7f3e.jpg')
};

export default {
  name: 'planta',
  prototype: 'items',

  info: {
    title: 'planta',
    tag: ['furnishings', 'leather'],
    description: 'Planta',
    image: require('./planta.jpg')
  },

  properties: {},

  render2D: function (element, layer, scene) {
    let angle = element.rotation + 90;
    let textRotation = Math.sin(angle * Math.PI / 180) < 0 ? 180 : 0;

    let style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
    let arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

    return (
      <g transform={`translate(${-width.length / 2},${-depth.length / 2})`}>
        <rect x="0" y="0" width={width.length} height={depth.length} style={style} />
        <line x1={width.length / 2} x2={width.length / 2} y1={depth.length} y2={1.5 * depth.length}
          style={arrow_style} />
        <line
          x1={.35 * width.length}
          x2={width.length / 2}
          y1={1.2 * depth.length}
          y2={1.5 * depth.length}
          style={arrow_style}
        />
        <line
          x1={width.length / 2}
          x2={.65 * width.length}
          y1={1.5 * depth.length}
          y2={1.2 * depth.length}
          style={arrow_style}
        />
        <text
          x="0"
          y="0"
          transform={`translate(${width.length / 2}, ${depth.length / 2}) scale(1,-1) rotate(${textRotation})`}
          style={{ textAnchor: 'middle', fontSize: '11px' }}
        >
          {element.type}
        </text>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let loadItem = () =>
      loadObjWithMaterial(mtl, obj, path.dirname(mapImages['f2h_Planta/5e0c8d09-7eec-452b-b3f1-681017199682.jpg']) + '/', mapImages, true, true);

    return getObject3d(element.name, loadItem);
  },

  updateRender3D: (element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) => {

    let noPerf = () => { selfDestroy(); return selfBuild(); };

    if (differences.indexOf('selected') !== -1) {
      mesh.traverse((child) => {
        if (child instanceof BoxHelper) {
          child.visible = element.selected;
        }
      });

      return Promise.resolve(mesh);
    }

    if (differences.indexOf('rotation') !== -1) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};
