import React from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';

const STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

export default function Item ( { layer, item, scene, catalog } ) {

  let { x, y, rotation } = item;

  console.log( item );
  let renderedItem = catalog.getElement( item.type ).render2D( item, layer, scene );
  let width = ( typeof ( item.width ) == 'object' ) ? item.properties.get( 'width' ).get( 'length' ) : item.width;
  //todo commented this bc cubes have depth on attributes
  // let depth = ( typeof ( item.depth ) == 'object' ) ? item.properties.get( 'depth' ).get( 'length' ) : item.depth;
  let depth = ( typeof ( item.depth ) == 'object' ) && item.depth;

  return (
    <g
      data-element-root
      data-prototype={ item.prototype }
      data-id={ item.id }
      data-selected={ item.selected }
      data-layer={ layer.id }
      style={ item.selected ? { cursor: "move" } : {} }
      transform={ `translate(${ x },${ y }) rotate(${ rotation })` }>

      { renderedItem }
      <If condition={ item.selected }>
        <g data-element-root
          data-prototype={ item.prototype }
          data-id={ item.id }
          data-selected={ item.selected }
          data-layer={ layer.id }
          data-part="rotation-anchor"
        >
          <circle cx={ width / 2 } cy={ 150 + ( depth / 2 ) } r="10" style={ STYLE_CIRCLE } />
          <circle cx={ width / 2 } cy={ depth / 2 } r="150" style={ STYLE_CIRCLE2 } />
        </g>
      </If>
    </g>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};

