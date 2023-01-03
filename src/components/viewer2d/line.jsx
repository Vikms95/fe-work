import React from 'react';
import PropTypes from 'prop-types';
import { GeometryUtils } from '../../utils/export';
import Ruler from './ruler';
import Angle from './angle';
import { Line as CL_LINE } from '../../class/export';
import { VERANGULOS, VER90, PI_2 } from '../../constants';

export default function Line ( { line, layer, scene, catalog } ) {
  let vertex0 = layer.vertices.get( line.vertices.get( 0 ) );
  let vertex1 = layer.vertices.get( line.vertices.get( 1 ) );

  if ( vertex0.id === vertex1.id || GeometryUtils.samePoints( vertex0, vertex1 ) ) return null; //avoid 0-length lines

  let thickness = line.getIn( [ 'properties', 'thickness', 'length' ] );
  let v2First = line.v2First;
  let { x: x1, y: y1 } = vertex0;
  let { x: x2, y: y2 } = vertex1;
  let v0 = !v2First ? vertex0 : vertex1;
  let v1 = !v2First ? vertex1 : vertex0;
  //let v2 = line.vertices.has(2) ? layer.vertices.get(line.vertices.get(2)) : vertex0;
  //let v3 = line.vertices.has(3) ? layer.vertices.get(line.vertices.get(3)) : vertex1;
  let { vv2: v2, vv3: v3 } = CL_LINE.createVertexAndVectorsB( x1, y1, x2, y2, v2First, thickness );

  if ( !v2 || !v3 ) {
    v2 = vertex0;
    v3 = vertex1;
  }

  let pr = !v2First ? v2 : v3;

  if ( x1 > x2 ) {
    ( { x: x1, y: y1 } = vertex1 );
    ( { x: x2, y: y2 } = vertex0 );
    pr = !v2First ? v3 : v2;
  }

  let length = GeometryUtils.pointsDistance( x1, y1, x2, y2 );
  let angle = GeometryUtils.angleBetweenTwoPointsAndOrigin( x1, y1, x2, y2 );
  let v = GeometryUtils.diffVector( v1, v3 );
  let u = GeometryUtils.normalizeVector( v );

  let renderedHoles = line.holes.map( holeID => {
    let hole = layer.holes.get( holeID );
    let startAt = length * hole.offset;
    let renderedHole = catalog.getElement( hole.type ).render2D( hole, layer, scene );

    return (
      <g
        key={ holeID }
        transform={ `translate(${ startAt }, 0)` }
        data-element-root
        data-prototype={ hole.prototype }
        data-id={ hole.id }
        data-selected={ hole.selected }
        data-layer={ layer.id }
      >
        { renderedHole }
      </g>
    );
  } );

  let half_thickness = thickness / 2;
  let ur = GeometryUtils.multScalarVector( half_thickness + 5, u );
  let vr = GeometryUtils.addVector( pr, ur );
  let u_angle = GeometryUtils.angleVector( u );

  let dist = 20;
  let l_angle = CL_LINE.getAngleAndArcL11L20_pcl( layer, line, dist );
  let verAngulos = scene.getIn( [ 'prefs', VERANGULOS ] );
  let ver90 = scene.getIn( [ 'prefs', VER90 ] );
  //console.log(`line.jsx l_angle : ${l_angle}`)
  let arc = verAngulos && l_angle && ( ver90 || ( l_angle.angle % 90 ) != 0 )
    ? <Angle cx={ l_angle.cx } cy={ l_angle.cy } radius={ l_angle.radius } startAngle={ l_angle.startAngle } endAngle={ l_angle.endAngle } angle={ l_angle.angle } dist={ dist } />
    : null;
  //let arc = null;

  //console.log(`line.jsx: u_angle : ${u_angle}`);

  let renderedLine = catalog.getElement( line.type ).render2D( line, layer, scene );
  //let renderedRuler = line.selected ?
  //  <Ruler unit={scene.unit} length={length} transform={`translate(0, ${half_thickness + 10} )`} /> : null;
  //let renderedRuler =
  //  <Ruler unit={scene.unit} length={length} transform={`translate(0, ${half_thickness + 10} )`} /> ;
  // u_angle == 0 => para evitar: Si haces un resctángulo en las paredes, la cota de la derecha se queda por dentro
  let renderedRuler =
    /*<Ruler unit={scene.unit} upText={u.y > 0} length={length} transform={`translate(${vr.x}, ${vr.y} ) rotate(${angle}, 0, 0) `} />;*/
    <Ruler scene={ scene } unit={ scene.unit } upText={ u_angle >= 0 && u_angle <= Math.PI } length={ length } transform={ `translate(${ vr.x }, ${ vr.y } ) rotate(${ angle }, 0, 0) ` } />;

  //console.log(`line.jsx: u.x: ${u.x} u.y: ${u.y} u_angle: ${u_angle}`);

  return (
    <g>
      <g
        data-element-root
        data-prototype={ line.prototype }
        data-id={ line.id }
        data-selected={ line.selected }
        data-layer={ layer.id }
        style={ line.selected ? { cursor: 'move' } : {} }
      >
        { renderedRuler }
        { renderedLine }
        { arc }
      </g>
      <g
        transform={ `translate(${ x1 }, ${ y1 }) rotate(${ angle }, 0, 0)` }
        data-element-root
        data-prototype={ line.prototype }
        data-id={ line.id }
        data-selected={ line.selected }
        data-layer={ layer.id }
        style={ line.selected ? { cursor: 'move' } : {} }
      >
        { renderedHoles }
      </g>
    </g >
  );

  //return (
  //  <g>
  //    <g
  //      transform={`translate(${x1}, ${y1}) rotate(${angle}, 0, 0)` }
  //      data-element-root
  //      data-prototype={line.prototype}
  //      data-id={line.id}
  //      data-selected={line.selected}
  //      data-layer={layer.id}
  //      style={line.selected ? { cursor: 'move' } : {}}
  //    >
  //      {renderedRuler}
  //      {renderedLine}
  //      {renderedHoles}
  //    </g>
  //    {renderedHoles}
  //  </g >
  //);

}

Line.propTypes = {
  line: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
