import React from 'react';
import PropTypes from 'prop-types';
import {
  Line,
  Area,
  Vertex,
  Item,
  Group
} from './export';

export default function Layer ( { layer, scene, catalog } ) {

  let { unit, groups } = scene;
  let { lines, areas, vertices, holes, id: layerID, items, opacity } = layer;

  /*

    Relleno de figuras:
    https://aprende-web.net/NT/svg/svg_5.php

    ejemplo unir paredes

    1- Si la figura esta cerrada:

      primero se añade la pared exterior y luego la interior

      <path id="p1" d="M 10 10 l 50 0 l 0 30 l -50 0 z M 15 15 l 40 0 l 0 20 l -40 0 z" stroke="blue" fill="yellow" stroke-width="1" fill-rule="evenodd"/>

    2- Si no esta cerrada, se empieza con la pared exterior y seguiramente sin saltar a la interior

      <path id="p1" d="M 75 10 l 45 0 l 0 30 l -45 0 l 0 -5 l 40 0 l 0 -20 l -40 0 z" stroke="blue" fill="yellow" stroke-width="1" fill-rule="evenodd" linejoin ="bevel"/>  
   */

  return (
    <g opacity={ opacity }>
      {
        areas.valueSeq().map( area =>
          <Area key={ area.id } layer={ layer } area={ area } unit={ unit } catalog={ catalog } /> )
      }
      {
        lines.valueSeq().map( line =>
          <Line key={ line.id } layer={ layer } line={ line } scene={ scene } catalog={ catalog } /> )
      }
      {
        items.valueSeq().map( item =>
          <Item key={ item.id } layer={ layer } item={ item } scene={ scene } catalog={ catalog } /> )
      }
      {
        vertices
          .valueSeq()
          .filter( v => v.selected )
          .map( vertex => <Vertex key={ vertex.id } layer={ layer } vertex={ vertex } /> )
      }
      {
        groups
          .valueSeq()
          .filter( g => g.hasIn( [ 'elements', layerID ] ) && g.get( 'selected' ) )
          .map( group => <Group key={ group.get( 'id' ) } layer={ layer } group={ group } scene={ scene } catalog={ catalog } /> )
      }
    </g>
  );

}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
