var _extends = Object.assign || function ( target ) { for ( var i = 1; i < arguments.length; i++ ) { var source = arguments[ i ]; for ( var key in source ) { if ( Object.prototype.hasOwnProperty.call( source, key ) ) { target[ key ] = source[ key ]; } } } return target; };

import React from 'react';
import { buildWall, updatedWall } from './wall-factory-3d';
import * as SharedStyle from '../../shared-style';
import * as Geometry from '../../utils/geometry';
import Translator from '../../translator/translator';

import { C_LISOPARED2D } from '../../constants';

var epsilon = 20;
var STYLE_TEXT = { textAnchor: 'middle' };
var STYLE_LINE = { stroke: SharedStyle.LINE_MESH_COLOR.selected };
var STYLE_RECT = { strokeWidth: 1, stroke: SharedStyle.LINE_MESH_COLOR.unselected, fill: '#6386A1' };
var STYLE_RECT_SELECTED = _extends( {}, STYLE_RECT, { stroke: SharedStyle.LINE_MESH_COLOR.selected } );

var translator = new Translator();

export default function WallFactory ( name, info, textures ) {

  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      //angle: {
      //  label: 'Ángulo',
      //  type: 'number',
      //  defaultValue: {
      //    length: 0,
      //  }
      //},
      height: {
        label: 'Alto',
        type: 'length-measure',
        defaultValue: {
          length: 300
        }
      },
      thickness: {
        label: 'Fondo',
        type: 'length-measure',
        defaultValue: {
          length: 20
        }
      }
    },

    render2D: function render2D ( element, layer, scene ) {
      var v2First = element.v2First || false;

      var _layer$vertices$get = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) ),
        x0 = _layer$vertices$get.x,
        y0 = _layer$vertices$get.y;

      var _layer$vertices$get2 = layer.vertices.get( element.vertices.get( !v2First ? 1 : 0 ) ),
        x1 = _layer$vertices$get2.x,
        y1 = _layer$vertices$get2.y;

      var _ref = layer.vertices.get( element.vertices.get( 2 ) ) || { x: x0, y: y0 },
        x2 = _ref.x,
        y2 = _ref.y;

      var _ref2 = layer.vertices.get( element.vertices.get( 3 ) ) || { x: x1, y: y1 },
        x3 = _ref2.x,
        y3 = _ref2.y;

      var style_rect = _extends( {}, STYLE_RECT );
      var c_liso_pared2d = scene.getIn( [ 'prefs', C_LISOPARED2D ] );
      var points = x0 + ',' + y0 + ' ' + x1 + ',' + y1 + ' ' + x3 + ',' + y3 + ' ' + x2 + ',' + y2;

      if ( c_liso_pared2d ) style_rect.fill = c_liso_pared2d;

      return React.createElement( 'polygon', { points: points, style: style_rect } );

      /*
        if (!layer.vertices.has(element.vertices.get(2)))
        console.log(`line '${element.id}' vertex2 '${element.vertices.get(2)}' no existe`);
      if (!layer.vertices.has(element.vertices.get(3)))
        console.log(`line '${element.id}' vertex3 '${element.vertices.get(3)}' no existe`);
        return <g>
        <polygon points={points} style={STYLE_RECT} />
        <circle cx={x0} cy={y0} r="10" fill="cyan" />
        <circle cx={x1} cy={y1} r="10" fill="magenta" />
        <circle cx={x2} cy={y2} r="10" fill="blue" />
        <circle cx={x3} cy={y3} r="10" fill="red" />
      </g>;
      */

      /*
      return (!element.vertices.has(4))
        ? <polygon points={points} style={STYLE_RECT} />
        : <g>
          <polygon points={points} style={STYLE_RECT} />
          <polygon points={points0} stroke="green" fill="none" />
          <circle cx={x3} cy={y3} r="10" fill="red" />
          <circle cx={x4} cy={y4} r="10" fill="cyan" />
        </g>;
        */

      /*
      let { x: x1, y: y1 } = layer.vertices.get(element.vertices.get(0));
      let { x: x2, y: y2 } = layer.vertices.get(element.vertices.get(1));
         let length = Geometry.pointsDistance(x1, y1, x2, y2);
      let length_5 = length / 5;
         let thickness = element.getIn(['properties', 'thickness', 'length']);
      let half_thickness = thickness / 2;
      let half_thickness_eps = half_thickness + epsilon;
      let char_height = 11;
      let extra_epsilon = 5;
      let textDistance = half_thickness + epsilon + extra_epsilon;
         return (element.selected) ?
        <g>
          <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT_SELECTED} />
          <line x1={length_5} y1={-half_thickness_eps} x2={length_5} y2={half_thickness_eps} style={STYLE_LINE} />
          <text x={length_5} y={textDistance + char_height} style={STYLE_TEXT}>A</text>
          <text x={length_5} y={-textDistance} style={STYLE_TEXT}>B</text>
        </g> :
        <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT} />
        */
    },

    render3D: function render3D ( element, layer, scene ) {
      return buildWall( element, layer, scene, textures );
    },

    updateRender3D: function updateRender3D ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) {
      return updatedWall( element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild );
    }

  };

  if ( textures && textures !== {} ) {

    var textureValues = { 'none': 'None' };

    for ( var textureName in textures ) {
      textureValues[ textureName ] = textures[ textureName ].name;
    }

    wallElement.properties.textureA = {
      label: 'Textura' + ' A',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };

    wallElement.properties.textureB = {
      label: 'Textura' + ' B',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };
  }

  return wallElement;
}