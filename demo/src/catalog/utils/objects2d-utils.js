import React from 'react';

export function render2DSimple ( element, layer, scene ) {
  let width = ( typeof ( element.width ) == 'object' ) ? element.properties.get( 'width' ).get( 'length' ) : element.width;
  let depth = ( typeof ( element.depth ) == 'object' ) ? element.properties.get( 'depth' ).get( 'length' ) : element.depth;

  let angle = element.rotation + 90;
  let textRotation = Math.sin( angle * Math.PI / 180 ) < 0 ? 180 : 0;

  let style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };
  let arrow_style = { stroke: element.selected ? '#0096fd' : null, strokeWidth: '2px', fill: '#84e1ce' };

  return (
    <g transform={ `translate(0,${ -depth })` }>
      {/*<g transform={`translate(${-width / 2},${-depth / 2})`}>*/ }
      <rect x="0" y="0" width={ width } height={ depth } style={ style } />
      {/*<line x1={width / 2} x2={width / 2} y1={depth} y2={1.5 * depth} style={arrow_style} />*/ }
      <line x1={ width / 2 } x2={ width / 2 } y1="0" y2={ -depth / 2 } style={ arrow_style } />
      {/*<line*/ }
      {/*  x1={.35 * width}*/ }
      {/*  x2={width / 2}*/ }
      {/*  y1={1.2 * depth}*/ }
      {/*  y2={1.5 * depth}*/ }
      {/*  style={arrow_style}*/ }
      {/*/>*/ }
      <line
        x1={ .35 * width }
        x2={ width / 2 }
        y1={ -depth / 5 }
        y2={ -depth / 2 }
        style={ arrow_style }
      />
      {/*<line*/ }
      {/*  x1={width / 2}*/ }
      {/*  x2={.65 * width}*/ }
      {/*  y1={1.5 * depth}*/ }
      {/*  y2={1.2 * depth}*/ }
      {/*  style={arrow_style}*/ }
      {/*/>*/ }
      <line
        x1={ width / 2 }
        x2={ .65 * width }
        y1={ -depth / 2 }
        y2={ -depth / 5 }
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
}
