import React from 'react';
import PropTypes from 'prop-types';
import { Line, Area, Vertex, Item, Group } from './export';

export default function Layer(_ref) {
  var layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var unit = scene.unit,
      groups = scene.groups;
  var lines = layer.lines,
      areas = layer.areas,
      vertices = layer.vertices,
      holes = layer.holes,
      layerID = layer.id,
      items = layer.items,
      opacity = layer.opacity;

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

  return React.createElement(
    'g',
    { opacity: opacity },
    areas.valueSeq().map(function (area) {
      return React.createElement(Area, { key: area.id, layer: layer, area: area, unit: unit, catalog: catalog });
    }),
    lines.valueSeq().map(function (line) {
      return React.createElement(Line, { key: line.id, layer: layer, line: line, scene: scene, catalog: catalog });
    }),
    items.valueSeq().map(function (item) {
      return React.createElement(Item, { key: item.id, layer: layer, item: item, scene: scene, catalog: catalog });
    }),
    vertices.valueSeq().filter(function (v) {
      return v.selected;
    }).map(function (vertex) {
      return React.createElement(Vertex, { key: vertex.id, layer: layer, vertex: vertex });
    }),
    groups.valueSeq().filter(function (g) {
      return g.hasIn(['elements', layerID]) && g.get('selected');
    }).map(function (group) {
      return React.createElement(Group, { key: group.get('id'), layer: layer, group: group, scene: scene, catalog: catalog });
    })
  );
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};