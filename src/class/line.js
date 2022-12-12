import { Map, List, fromJS } from 'immutable';

import {
  Group,
  Layer,
  Hole,
  Vertex,
  Perimeter,
  Project
} from './export';

import {
  IDBroker,
  NameGenerator,
  GeometryUtils,
  SnapUtils,
  SnapSceneUtils,
} from '../utils/export';

import {
  MODE_IDLE,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAGGING_LINE,
  _2_PI,
  PI_2,
  _3_PI_2,
  ALTOPARED,
  FONDOPARED
} from '../constants';

import {
  getCacheAlto,
  getCacheFondo,
  getPrefsAlto,
  getPrefsFondo,
  setCacheAlto,
  setCacheFondo,
  setCacheAngulo
} from '../selectors/selectors';

const cthicknessDefault = 20;

class Line {
  static isHasAreaFromLine ( state, layerID, line ) {
    let areas = state.getIn( [ 'scene', 'layers', layerID, 'areas' ] );
    let vertex0ID = line.vertices.get( 0 );
    let hasArea = false;

    areas.forEach( area => {
      area.vertices.forEach( vertex => {
        hasArea |= vertex == vertex0ID;
      } );
    } );

    return hasArea;
  }
  static isHasArea ( state, layerID, lineID ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    return isHasAreaFromLine( state, layerID, line );
  }
  // ret => 1 (line1ID+line2ID), -1 => (line2ID+line1ID), 0=> no unido
  static isLinesJoin ( state, layerID, line1ID, line2ID ) {
    let v2First1 = state.getIn( [ 'scene', 'layers', layerID, 'lines', line1ID, 'v2First' ] ) || false;
    let v2First2 = state.getIn( [ 'scene', 'layers', layerID, 'lines', line2ID, 'v2First' ] ) || false;
    let vertex11Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line1ID, 'vertices', !v2First1 ? 1 : 0 ] );
    let vertex20Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line2ID, 'vertices', !v2First2 ? 0 : 1 ] );
    let vertex11 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', vertex11Id ] );
    let vertex20 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', vertex20Id ] );

    if ( vertex11.id == vertex20.id || GeometryUtils.samePoints( vertex11, vertex20 ) )
      return 1;

    let vertex21Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line1ID, 'vertices', !v2First1 ? 0 : 1 ] );
    let vertex10Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line2ID, 'vertices', !v2First2 ? 1 : 0 ] );
    let vertex21 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', vertex21Id ] );
    let vertex10 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', vertex10Id ] );

    if ( vertex21.id == vertex10.id || GeometryUtils.samePoints( vertex21, vertex10 ) )
      return -1;

    return 0;
  }
  static getLine01 ( v, lineID ) {
    let line01ID = v.lines.find( id => id != lineID );
    return line01ID;
  }
  static getLines0_1_pcl ( layer, line ) {
    let v2First = line.v2First || false;
    let v0ID = line.vertices.get( !v2First ? 0 : 1 );
    let v1ID = line.vertices.get( !v2First ? 1 : 0 );
    let vertices = layer.vertices;
    let v0 = vertices.get( v0ID );
    let v1 = vertices.get( v1ID );
    let line0ID = Line.getLine01( v0, line.id );
    let line1ID = Line.getLine01( v1, line.id );

    return { line0ID, line1ID };
  }
  static getLine2IDV0_pcl ( layer, line ) {
    let v2First1 = line.v2First || false;
    let v10ID = line.vertices.get( !v2First1 ? 0 : 1 );
    let vertices = layer.vertices;
    let v10 = vertices.get( v10ID );
    let line2ID = Line.getLine01( v10, line.id );

    return line2ID;
  }

  static getAngleV0_pcl ( layer, line ) {
    let v2First1 = line.v2First || false;
    let v10ID = line.vertices.get( !v2First1 ? 0 : 1 );
    let v11ID = line.vertices.get( !v2First1 ? 1 : 0 );
    let vertices = layer.vertices;

    if ( !vertices ) return;

    let v10 = vertices.get( v10ID );
    let v11 = vertices.get( v11ID );
    let line2ID = Line.getLine01( v10, line.id );

    if ( line2ID ) {
      let line2 = layer.lines.get( line2ID );
      let l_angle = Line.getAngleAndArcL11L20_pcl( layer, line2, 1 );

      if ( l_angle != null )
        return {
          angle_rad: l_angle.angle_rad,
          angle: l_angle.angle
        };
    }

    let u = GeometryUtils.diffVector( v10, v11 );
    let angle_u = GeometryUtils.fixAngleRadNeg( PI_2 - GeometryUtils.angleVector( u ) );

    return {
      angle_rad: angle_u,
      angle: Math.round( angle_u * 180 / Math.PI )
    };
  }
  static getAngleRadV0ByAngle_pcl ( layer, line, angleDegree ) {
    let lineIDV0 = Line.getLine2IDV0_pcl( layer, line );
    let angleRad = angleDegree * Math.PI / 180;

    if ( !lineIDV0 )
      return PI_2 - angleRad;

    let line0 = layer.lines.get( lineIDV0 );
    let v2First1 = line0.v2First || false;
    let v10ID = line0.vertices.get( !v2First1 ? 0 : 1 );
    let v11ID = line0.vertices.get( !v2First1 ? 1 : 0 );
    let vertices = layer.vertices;
    let v10 = vertices.get( v10ID );
    let v11 = vertices.get( v11ID );
    let u1 = GeometryUtils.diffVector( v11, v10 );
    let angle_u1 = GeometryUtils.angleVector( u1 );
    let startAngle = GeometryUtils.fixAngleRadNeg( angle_u1 );

    return startAngle + angleRad;
  }

  static getAngleAndArcL11L20_pcl ( layer, line, dist ) {
    // BORRAR, NULL CHECK SOLO PARA DEPURAR
    if ( !line ) return null;

    let vertices = layer.vertices;
    let v2First1 = line.v2First || false;
    let v10ID = line.vertices.get( !v2First1 ? 0 : 1 );
    let v11ID = line.vertices.get( !v2First1 ? 1 : 0 );
    let v10 = vertices.get( v10ID );
    let v11 = vertices.get( v11ID );
    let line2ID = Line.getLine01( v11, line.id );

    if ( !line2ID ) return null;
    let line2 = layer.lines.get( line2ID );

    // BORRAR, NULL CHECK SOLO PARA DEPURAR
    if ( !line2 ) return null;

    let v2First2 = line2.v2First || false;
    let v20ID = line2.vertices.get( !v2First2 ? 0 : 1 );
    let v21ID = line2.vertices.get( !v2First2 ? 1 : 0 );
    let v20 = vertices.get( v20ID );
    let v21 = vertices.get( v21ID );
    let u1 = GeometryUtils.diffVector( v11, v10 );
    let u2 = GeometryUtils.diffVector( v20, v21 );
    let angle_u1 = GeometryUtils.angleVector( u1 );
    //let u11 = GeometryUtils.diffVector(v10, v11);
    //let u22 = GeometryUtils.diffVector(v21, v20);
    //let angle = GeometryUtils.fixAngleRadNeg(GeometryUtils.angleVectors(u11, u22));
    let startAngle = GeometryUtils.fixAngleRadNeg( angle_u1 + PI_2 );
    let endAngle = GeometryUtils.fixAngleRadNeg( GeometryUtils.angleVector( u2 ) + PI_2 );
    //let endAngle = GeometryUtils.fixAngleRadNeg(startAngle + angle)
    let angle = ( startAngle <= endAngle ) ? endAngle - startAngle : _2_PI - startAngle + endAngle;

    //let angle = endAngle - startAngle;
    let radius = ( dist / 2 ) * Math.tan( angle / 2 );

    return {
      cx: v20.x, cy: v20.y,
      radius: radius,
      angle_rad: angle,
      angle: Math.round( angle * 180 / Math.PI ),
      startAngle: Math.round( startAngle * 180 / Math.PI ),
      endAngle: Math.round( endAngle * 180 / Math.PI )
    };
  }
  static createVertexAndVectorsB ( x0, y0, x1, y1, v2First, thickness ) {
    let v00 = { x: x0, y: y0 };
    let v11 = { x: x1, y: y1 };
    let v0 = !v2First ? v00 : v11;
    let v1 = !v2First ? v11 : v00;
    let v = GeometryUtils.diffVector( v0, v1 );

    if ( v.x == 0 && v.y == 0 )
      v.x = 0.1;

    let vu = GeometryUtils.normalizeVector( v );
    let u = GeometryUtils.orthoVector( vu );
    let unew = GeometryUtils.multScalarVector( thickness, u );
    let v2 = GeometryUtils.addVector( v0, unew );
    let v3 = GeometryUtils.addVector( v1, unew );

    return { vv2: v2, vv3: v3, vu, u, unew };
  }

  static cacheFondo ( state, fondo ) {
    state = setCacheFondo( state, fondo );
    return { updatedState: state };
  }

  static cacheAlto ( state, alto ) {
    state = setCacheAlto( state, alto );
    return { updatedState: state };
  }

  static cacheAngulo ( state, angulo ) {
    state = setCacheAngulo( state, angulo );
    return { updatedState: state };
  }

  static create ( state, layerID, type, x0, y0, x1, y1, properties, argsEx ) {
    let p = fromJS( properties || {} );
    let alto = getCacheAlto( state ) || getPrefsAlto( state );
    let fondo = getCacheFondo( state ) || getPrefsFondo( state );

    if ( alto ) {
      p = p.set( 'height', new Map( { length: alto / 10/*, unit: 'mm'*/ } ) );
    }
    if ( fondo ) {
      p = p.set( 'thickness', new Map( { length: fondo / 10/*, unit: 'mm'*/ } ) );
    }

    let a = argsEx || {};
    let lineID = IDBroker.acquireID();
    let v2First = a.v2First || false;
    let { vv2, vv3 } = this.createVertexAndVectorsB( x0, y0, x1, y1, v2First, cthicknessDefault );

    let { updatedState: stateV0, vertex: v0 } = Vertex.add( state, layerID, x0, y0, 'lines', lineID );
    let { updatedState: stateV1, vertex: v1 } = Vertex.add( stateV0, layerID, x1, y1, 'lines', lineID );
    let { updatedState: stateV2, vertex: v2 } = Vertex.add( stateV1, layerID, vv2.x, vv2.y, 'lines', lineID );
    let { updatedState: stateV3, vertex: v3 } = Vertex.add( stateV2, layerID, vv3.x, vv3.y, 'lines', lineID );
    state = stateV3;

    let line = state.catalog.factoryElement( type, {
      id: lineID,
      name: NameGenerator.generateName( 'lines', state.catalog.getIn( [ 'elements', type, 'info', 'title' ] ) ),
      description: state.catalog.getIn( [ 'elements', type, 'info', 'description' ] ),
      image: state.catalog.getIn( [ 'elements', type, 'info', 'image' ] ),
      vertices: new List( [ v0.id, v1.id, v2.id, v3.id ] ),
      v2First: v2First,
      type
    }, p );

    state = state.setIn( [ 'scene', 'layers', layerID, 'lines', lineID ], line );

    return { updatedState: state, line };
  }

  static select ( state, layerID, lineID ) {
    state = Layer.select( state, layerID ).updatedState;

    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    state = Layer.selectElement( state, layerID, 'lines', lineID ).updatedState;
    state = Layer.selectElement( state, layerID, 'vertices', line.vertices.get( 0 ) ).updatedState;
    state = Layer.selectElement( state, layerID, 'vertices', line.vertices.get( 1 ) ).updatedState;
    state = Project.setIsElementSelected( state ).updatedState;

    return { updatedState: state };
  }

  static remove ( state, layerID, lineID ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    if ( line ) {
      state = this.unselect( state, layerID, lineID ).updatedState;
      line.holes.forEach( holeID => state = Hole.remove( state, layerID, holeID ).updatedState );
      if ( line.perimeter != null )
        state = Perimeter.removeElement( state, layerID, line.perimeter, 'lines', lineID ).updatedState;
      state = Layer.removeElement( state, layerID, 'lines', lineID ).updatedState;
      line.vertices.forEach( vertexID => state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState );
      state.getIn( [ 'scene', 'groups' ] ).forEach( group => state = Group.removeElement( state, group.id, layerID, 'lines', lineID ).updatedState );
      state = Project.setIsElementSelected( state ).updatedState;
    }

    return { updatedState: state };
  }

  static unselect ( state, layerID, lineID ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    if ( line ) {
      state = Layer.unselect( state, layerID, 'vertices', line.vertices.get( 0 ) ).updatedState;
      state = Layer.unselect( state, layerID, 'vertices', line.vertices.get( 1 ) ).updatedState;
      state = Layer.unselect( state, layerID, 'lines', lineID ).updatedState;
      state = Project.setIsElementSelected( state ).updatedState;
    }

    return { updatedState: state };
  }

  static split ( state, layerID, lineID, x, y ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );
    let v0 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 0 ) ] );
    let v1 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 1 ) ] );
    let { x: x0, y: y0 } = v0;
    let { x: x1, y: y1 } = v1;

    let { updatedState: stateL1, line: line0 } = Line.create( state, layerID, line.type, x0, y0, x, y, line.get( 'properties' ) );
    let { updatedState: stateL2, line: line1 } = Line.create( stateL1, layerID, line.type, x1, y1, x, y, line.get( 'properties' ) );
    state = stateL2;

    let splitPointOffset = GeometryUtils.pointPositionOnLineSegment( x0, y0, x1, y1, x, y );
    let minVertex = GeometryUtils.minVertex( v0, v1 );

    line.holes.forEach( holeID => {
      let hole = state.getIn( [ 'scene', 'layers', layerID, 'holes', holeID ] );

      let holeOffset = hole.offset;
      if ( minVertex.x === x1 && minVertex.y === y1 ) {
        splitPointOffset = 1 - splitPointOffset;
        holeOffset = 1 - hole.offset;
      }

      if ( holeOffset < splitPointOffset ) {
        let offset = holeOffset / splitPointOffset;
        if ( minVertex.x === x1 && minVertex.y === y1 ) {
          offset = 1 - offset;
        }
        state = Hole.create( state, layerID, hole.type, line0.id, offset, hole.properties ).updatedState;
      } else {
        let offset = ( holeOffset - splitPointOffset ) / ( 1 - splitPointOffset );
        if ( minVertex.x === x1 && minVertex.y === y1 ) {
          offset = 1 - offset;
        }
        state = Hole.create( state, layerID, hole.type, line1.id, offset, hole.properties ).updatedState;
      }
    } );

    //add splitted lines to the original line's group
    let lineGroups = state
      .getIn( [ 'scene', 'groups' ] )
      .filter( group => {
        const lines = group.getIn( [ 'elements', layerID, 'lines' ] );
        return lines && lines.contains( lineID );
      } );

    lineGroups.forEach( group => {
      state = Group.addElement( state, group.id, layerID, 'lines', line0.id ).updatedState;
      state = Group.addElement( state, group.id, layerID, 'lines', line1.id ).updatedState;
    } );

    state = Line.remove( state, layerID, lineID ).updatedState;

    return { updatedState: state, lines: new List( [ line0, line1 ] ) };
  }

  static addFromPoints ( state, layerID, type, points, properties, holes ) {
    let v0 = points[ 0 ];

    points = new List( points )
      .sort( ( { x: x1, y: y1 }, { x: x2, y: y2 } ) => x1 === x2 ? y1 - y2 : x1 - x2 );

    let pointsPair = points.zip( points.skip( 1 ) )
      .filterNot( ( [ { x: x1, y: y1 }, { x: x2, y: y2 } ] ) => x1 === x2 && y1 === y2 );

    let lines = [];

    pointsPair.forEach( ( [ { x: x1, y: y1 }, { x: x2, y: y2 } ] ) => {
      let v2First = !GeometryUtils.samePoints( v0, { x: x1, y: y1 } );
      let { updatedState: stateL, line } = this.create( state, layerID, type, x1, y1, x2, y2, properties, { v2First } );
      state = stateL;

      if ( holes ) {
        holes.forEach( holeWithOffsetPoint => {
          let { x: xp, y: yp } = holeWithOffsetPoint.offsetPosition;

          if ( GeometryUtils.isPointOnLineSegment( x1, y1, x2, y2, xp, yp ) ) {

            let newOffset = GeometryUtils.pointPositionOnLineSegment( x1, y1, x2, y2, xp, yp );

            if ( newOffset >= 0 && newOffset <= 1 ) {
              state = Hole.create( state, layerID, holeWithOffsetPoint.hole.type, line.id, newOffset, holeWithOffsetPoint.hole.properties ).updatedState;
            }
          }
        } );
      }

      lines.push( line );
    } );

    return { updatedState: state, lines: new List( lines ) };
  }

  static createAvoidingIntersections ( state, layerID, type, x0, y0, x1, y1, oldProperties, oldHoles ) {
    let points = [ { x: x0, y: y0 }, { x: x1, y: y1 } ];

    state = state.getIn( [ 'scene', 'layers', layerID, 'lines' ] ).reduce( ( reducedState, line ) => {
      let [ v0, v1 ] = line.vertices.map( vertexID => reducedState.getIn( [ 'scene', 'layers', layerID, 'vertices' ] ).get( vertexID ) ).toArray();

      let hasCommonEndpoint = (
        GeometryUtils.samePoints( v0, points[ 0 ] ) ||
        GeometryUtils.samePoints( v0, points[ 1 ] ) ||
        GeometryUtils.samePoints( v1, points[ 0 ] ) ||
        GeometryUtils.samePoints( v1, points[ 1 ] )
      );

      let intersection = GeometryUtils.twoLineSegmentsIntersection( points[ 0 ], points[ 1 ], v0, v1 );

      if ( intersection.type === 'colinear' ) {
        if ( !oldHoles ) { oldHoles = []; }

        let orderedVertices = GeometryUtils.orderVertices( points );

        reducedState.getIn( [ 'scene', 'layers', layerID, 'lines', line.id, 'holes' ] ).forEach( holeID => {
          let hole = reducedState.getIn( [ 'scene', 'layers', layerID, 'holes', holeID ] );
          let oldLineLength = GeometryUtils.pointsDistance( v0.x, v0.y, v1.x, v1.y );
          let offset = GeometryUtils.samePoints( orderedVertices[ 1 ], line.vertices.get( 1 ) ) ? ( 1 - hole.offset ) : hole.offset;
          let offsetPosition = GeometryUtils.extendLine( v0.x, v0.y, v1.x, v1.y, oldLineLength * offset );

          oldHoles.push( { hole, offsetPosition } );
        } );

        reducedState = this.remove( reducedState, layerID, line.id ).updatedState;

        points.push( v0, v1 );
      }

      if ( intersection.type === 'intersecting' && ( !hasCommonEndpoint ) ) {
        reducedState = this.split( reducedState, layerID, line.id, intersection.point.x, intersection.point.y ).updatedState;
        points.push( intersection.point );
      }

      return reducedState;

    }, state );

    let { updatedState, lines } = Line.addFromPoints( state, layerID, type, points, oldProperties, oldHoles );

    return { updatedState, lines };
  }

  static replaceVertex ( state, layerID, lineID, vertexIndex, x, y ) {
    let vertexID = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex ] );

    state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState;
    let { updatedState: stateV, vertex } = Vertex.add( state, layerID, x, y, 'lines', lineID );
    state = stateV;

    state = state.setIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex ], vertex.id );
    state = state.setIn( [ 'scene', 'layers', layerID, 'lines', lineID ], state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] ) );

    return { updatedState: state, line: state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] ), vertex };
  }

  static selectToolDrawingLine ( state, sceneComponentType ) {
    state = state.merge( {
      mode: MODE_WAITING_DRAWING_LINE,
      drawingSupport: new Map( {
        type: sceneComponentType
      } )
    } );

    return { updatedState: state };
  }

  static calcLineVertexsBInit ( state, layerID, lineID ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );
    let v2First = line.v2First || false;
    let thickness = line.getIn( [ 'properties', 'thickness', 'length' ] ) || cthicknessDefault;
    let v0 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 0 ) ] );
    let v1 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 1 ) ] );
    let { x: x0, y: y0 } = v0;
    let { x: x1, y: y1 } = v1;
    let { vv2, vv3, vu, u, unew } = this.createVertexAndVectorsB( x0, y0, x1, y1, v2First, thickness );

    return { updatedState: state, vv2, vv3, vu, u, unew };
  }

  static reCalcVertexsB ( state, layerID, lineID ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );
    let v2First = line.v2First || false;
    let thickness = line.getIn( [ 'properties', 'thickness', 'length' ] ) || cthicknessDefault;
    let v0 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 0 ) ] );
    let v1 = state.getIn( [ 'scene', 'layers', layerID, 'vertices', line.vertices.get( 1 ) ] );
    let { x: x0, y: y0 } = v0;
    let { x: x1, y: y1 } = v1;
    let { vv2, vv3, vu, u, unew } = this.createVertexAndVectorsB( x0, y0, x1, y1, v2First, thickness );
    let { updatedState: stateLV2, vertex2 } = Line.replaceVertex( state, layerID, lineID, 2, vv2.x, vv2.y );
    let { updatedState: stateLV3, vertex3 } = Line.replaceVertex( stateLV2, layerID, lineID, 3, vv3.x, vv3.y );
    state = stateLV3;

    return { updatedState: state, vv2, vv3, vu, u, unew };
  }

  // [ line1ID , line2ID ] en el sentido de las agujas del reloj
  static calcVertex5By2Lines ( state, layerID, line1ID, line2ID ) {

    console.log( `calcVertex5By2Lines line1ID: ${ line1ID } line2ID: ${ line2ID } ` );

    let vertex13Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line1ID, 'vertices', 3 ] );
    let vertex22Id = state.getIn( [ 'scene', 'layers', layerID, 'lines', line2ID, 'vertices', 2 ] );
    let stateL1 = Line.calcLineVertexsBInit( state, layerID, line1ID );
    let stateL2 = Line.calcLineVertexsBInit( state, layerID, line2ID );
    let { x: x14, y: y14 } = stateL1.vv3;
    let { x: x22, y: y22 } = stateL2.vv2;
    let m1 = stateL1.vu.x == 0 ? 0 : stateL1.vu.y / stateL1.vu.x;
    let m2 = stateL2.vu.x == 0 ? 0 : stateL2.vu.y / stateL2.vu.x;

    /*
        y - y0 = m(x-x0)
        y - y0 = mx -mx0
        y - mx = y0 - m x0

      1:
        . si m1 = inf
          x = x14
        . si m1 = 0
          y = y14
        . sino
          y - m1x = y14 - m1x14
       2:
        . si m2 = inf
          x = x22
        . si m2 = 0
          y = y22
        . sino
          y - m2x = y22 - m2x22

        a1x + b1y = c1
        a2x + b2y = c2

        M  = [  a1, b1,
                a2, b2 ]
        MA = [ a1, b1, c1,
               a2, b2, c2 ]

        Mx = [ c1, b1,
               c2, b2 ]

        My = [ a1, c1
               a2, c2 ]

        detM  = a1b2 - b1a2
        detMx = c1b2 - b1c2
        detMy = a1c2 - c1a2

        x = detMx / detM
        y = detMy / detM
     */

    let { a1, b1, c1 } = ( stateL1.vu.x == 0 ) ? { a1: 1, b1: 0, c1: x14 } : ( m1 == 0 ) ? { a1: 0, b1: 1, c1: y14 } : { a1: - m1, b1: 1, c1: y14 - m1 * x14 };
    let { a2, b2, c2 } = ( stateL2.vu.x == 0 ) ? { a2: 1, b2: 0, c2: x22 } : ( m2 == 0 ) ? { a2: 0, b2: 1, c2: y22 } : { a2: - m2, b2: 1, c2: y22 - m2 * x22 };
    let detM = a1 * b2 - b1 * a2;

    if ( detM != 0 ) {
      let x5 = ( c1 * b2 - b1 * c2 ) / detM;
      let y5 = ( a1 * c2 - c1 * a2 ) / detM;

      console.log( `interseccion stateL1.vu.x: ${ stateL1.vu.x } stateL2.vu.x: ${ stateL2.vu.x } m1 : ${ m1 } a1 : ${ a1 } b1 : ${ b1 } c1: ${ c1 } m2 : ${ m2 } a2 : ${ a2 } b2 : ${ b2 } c2: ${ c2 } x5: ${ x5 } y5: ${ y5 }` );
      console.log( `line1 '${ line1ID }' vertex3 '${ vertex13Id }' se ha cambiado sus coordenadas : (${ x5 }, ${ y5 })` );

      let { updatedState: stateLV1, vertex: newVertex13 } = Line.replaceVertex( state, layerID, line1ID, 3, x5, y5 );

      state = stateLV1;

      if ( newVertex13 != vertex22Id )
        state = Line.replaceVertex( state, layerID, line2ID, 2, x5, y5 ).updatedState;
    }

    return { updatedState: state };
  }

  static beginDrawingLine ( state, layerID, x, y ) {
    let snapElements = SnapSceneUtils.sceneSnapElements( state.scene, new List(), state.snapMask );
    let snap = null;

    if ( state.snapMask && !state.snapMask.isEmpty() ) {
      snap = SnapUtils.nearestSnap( snapElements, x, y, state.snapMask );
      if ( snap ) ( { x, y } = snap.point );

      snapElements = snapElements.withMutations( snapElements => {
        let a, b, c;
        ( { a, b, c } = GeometryUtils.horizontalLine( y ) );
        SnapUtils.addLineSnap( snapElements, a, b, c, 10, 3, null );
        ( { a, b, c } = GeometryUtils.verticalLine( x ) );
        SnapUtils.addLineSnap( snapElements, a, b, c, 10, 3, null );
      } );
    }

    let drawingSupport = state.get( 'drawingSupport' ).set( 'layerID', layerID );

    state = Layer.unselectAll( state, layerID ).updatedState;

    let { updatedState: stateL, line } = Line.create( state, layerID, drawingSupport.get( 'type' ), x, y, x, y );
    state = Line.select( stateL, layerID, line.id ).updatedState;

    state = state.merge( {
      mode: MODE_DRAWING_LINE,
      snapElements,
      activeSnapElement: snap ? snap.snap : null,
      drawingSupport
    } );

    return { updatedState: state };
  }

  static updateDrawingLine ( state, x, y ) {
    let snap = null;
    if ( state.snapMask && !state.snapMask.isEmpty() ) {
      snap = SnapUtils.nearestSnap( state.snapElements, x, y, state.snapMask );
      if ( snap ) ( { x, y } = snap.point );
    }

    let layerID = state.getIn( [ 'drawingSupport', 'layerID' ] );
    let lineID = state.getIn( [ 'scene', 'layers', layerID, 'selected', 'lines' ] ).first();
    //let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
    //let v2First = line.v2First || false;


    let { updatedState: stateLV, vertex } = Line.replaceVertex( state, layerID, lineID, 1, x, y );
    state = stateLV;

    //state = Line.reCalcVertexsB(state, layerID, lineID).updatedState;

    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 0 ) ).updatedState;
    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 1 ) ).updatedState;

    state = Layer.detectAndUpdatePerimeters( state, layerID ).updatedState;
    state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;

    state = this.select( state, layerID, lineID ).updatedState;
    state = state.merge( { activeSnapElement: snap ? snap.snap : null } );

    return { updatedState: state };
  }

  static endDrawingLine ( state, x, y, continuous ) {
    if ( state.snapMask && !state.snapMask.isEmpty() ) {
      let snap = SnapUtils.nearestSnap( state.snapElements, x, y, state.snapMask );
      if ( snap ) ( { x, y } = snap.point );
    }

    let layerID = state.getIn( [ 'drawingSupport', 'layerID' ] );
    let layer = state.getIn( [ 'scene', 'layers', layerID ] );

    let lineID = state.getIn( [ 'scene', 'layers', layerID, 'selected', 'lines' ] ).first();
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    /*

    let v0 = layer.vertices.get(line.vertices.get(0));

    state = Line.remove(state, layerID, lineID).updatedState;

    let { updatedState: stateLines, lines } = Line.createAvoidingIntersections(state, layerID, line.type, v0.x, v0.y, x, y);

    state = stateLines;
    line = lines.first();

*/

    if ( !line.vertices ) return;
    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 0 ) ).updatedState;
    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 1 ) ).updatedState;

    state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;
    state = Layer.detectAndUpdatePerimeters( state, layerID ).updatedState;
    state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;

    //state = state.merge({
    //  mode: MODE_WAITING_DRAWING_LINE,
    //  snapElements: new List(),
    //  activeSnapElement: null
    //});

    /*

    state.viewer2D.isArea = Line.isHasAreaFromLine(state, layerID, line);
    
    state = (!state.viewer2D.isArea)
      ? state.merge({
        mode: MODE_WAITING_DRAWING_LINE,
        snapElements: new List(),
        activeSnapElement: null
      })
      : state.merge({
        mode: MODE_IDLE,
        drawingSupport: null,
        activeSnapElement: null,
        snapElements: new List()
      });
    */
    if ( continuous ) {
      let isArea = Line.isHasAreaFromLine( state, layerID, line );

      if ( !isArea ) {
        state = state.merge( {
          mode: MODE_WAITING_DRAWING_LINE,
          snapElements: new List(),
          activeSnapElement: null
        } );
        state = Line.beginDrawingLine( state, layerID, x, y ).updatedState;
      }
      else
        state = state.merge( {
          mode: MODE_IDLE,
          drawingSupport: new Map(),
          activeSnapElement: null,
          snapElements: new List()
        } );
    }
    else {
      state = state.merge( {
        mode: MODE_WAITING_DRAWING_LINE,
        snapElements: new List(),
        activeSnapElement: null
      } );
    }


    return { updatedState: state };
  }

  static beginDraggingLine ( state, layerID, lineID, x, y ) {

    let snapElements = SnapSceneUtils.sceneSnapElements( state.scene, new List(), state.snapMask );

    let layer = state.scene.layers.get( layerID );
    let line = layer.lines.get( lineID );

    let vertex0 = layer.vertices.get( line.vertices.get( 0 ) );
    let vertex1 = layer.vertices.get( line.vertices.get( 1 ) );
    let oldHoles = Hole.calcOldHolesByLineID( state, layerID, lineID );

    state = state.merge( {
      mode: MODE_DRAGGING_LINE,
      snapElements,
      draggingSupport: Map( {
        layerID, lineID,
        startPointX: x,
        startPointY: y,
        startVertex0X: vertex0.x,
        startVertex0Y: vertex0.y,
        startVertex1X: vertex1.x,
        startVertex1Y: vertex1.y,
        oldHoles,
      } )
    } );

    return { updatedState: state };
  }

  static updateDraggingLine ( state, x, y ) {
    let draggingSupport = state.draggingSupport;
    let snapElements = state.snapElements;

    let layerID = draggingSupport.get( 'layerID' );
    let lineID = draggingSupport.get( 'lineID' );
    let oldHoles = draggingSupport.get( 'oldHoles' );
    let diffX = x - draggingSupport.get( 'startPointX' );
    let diffY = y - draggingSupport.get( 'startPointY' );
    let newVertex0X = draggingSupport.get( 'startVertex0X' ) + diffX;
    let newVertex0Y = draggingSupport.get( 'startVertex0Y' ) + diffY;
    let newVertex1X = draggingSupport.get( 'startVertex1X' ) + diffX;
    let newVertex1Y = draggingSupport.get( 'startVertex1Y' ) + diffY;
    let vertices = state.scene.getIn( [ 'layers', layerID, 'lines', lineID, 'vertices' ] );
    let oldVertex0X = state.scene.getIn( [ 'layers', layerID, 'vertices', vertices.get( 0 ), 'x' ] );
    let oldVertex0Y = state.scene.getIn( [ 'layers', layerID, 'vertices', vertices.get( 0 ), 'y' ] );
    let oldVertex1X = state.scene.getIn( [ 'layers', layerID, 'vertices', vertices.get( 1 ), 'x' ] );
    let oldVertex1Y = state.scene.getIn( [ 'layers', layerID, 'vertices', vertices.get( 1 ), 'y' ] );

    let activeSnapElement = null;
    let curSnap0 = null, curSnap1 = null;
    if ( state.snapMask && !state.snapMask.isEmpty() ) {
      curSnap0 = SnapUtils.nearestSnap( snapElements, newVertex0X, newVertex0Y, state.snapMask );
      curSnap1 = SnapUtils.nearestSnap( snapElements, newVertex1X, newVertex1Y, state.snapMask );
    }

    let deltaX = 0, deltaY = 0;
    if ( curSnap0 && curSnap1 ) {
      if ( curSnap0.point.distance < curSnap1.point.distance ) {
        deltaX = curSnap0.point.x - newVertex0X;
        deltaY = curSnap0.point.y - newVertex0Y;
        activeSnapElement = curSnap0.snap;
      } else {
        deltaX = curSnap1.point.x - newVertex1X;
        deltaY = curSnap1.point.y - newVertex1Y;
        activeSnapElement = curSnap1.snap;
      }
    } else {
      if ( curSnap0 ) {
        deltaX = curSnap0.point.x - newVertex0X;
        deltaY = curSnap0.point.y - newVertex0Y;
        activeSnapElement = curSnap0.snap;
      }
      if ( curSnap1 ) {
        deltaX = curSnap1.point.x - newVertex1X;
        deltaY = curSnap1.point.y - newVertex1Y;
        activeSnapElement = curSnap1.snap;
      }
    }

    newVertex0X += deltaX;
    newVertex0Y += deltaY;
    newVertex1X += deltaX;
    newVertex1Y += deltaY;

    state = state.merge( {
      activeSnapElement,
      scene: state.scene.updateIn( [ 'layers', layerID ], layer => layer.withMutations( layer => {
        let lineVertices = layer.getIn( [ 'lines', lineID, 'vertices' ] );
        layer.updateIn( [ 'vertices', lineVertices.get( 0 ) ], vertex => vertex.merge( { x: newVertex0X, y: newVertex0Y } ) );
        layer.updateIn( [ 'vertices', lineVertices.get( 1 ) ], vertex => vertex.merge( { x: newVertex1X, y: newVertex1Y } ) );
        return layer;
      } ) )
    } );

    let newHoles = Hole.calcNewHolesFromOldHoles( state, layerID, oldHoles );

    if ( !newHoles.valid ) {
      state = state.merge( {
        activeSnapElement: null,
        scene: state.scene.updateIn( [ 'layers', layerID ], layer => layer.withMutations( layer => {
          let lineVertices = layer.getIn( [ 'lines', lineID, 'vertices' ] );
          layer.updateIn( [ 'vertices', lineVertices.get( 0 ) ], vertex => vertex.merge( { x: oldVertex0X, y: oldVertex0Y } ) );
          layer.updateIn( [ 'vertices', lineVertices.get( 1 ) ], vertex => vertex.merge( { x: oldVertex1X, y: oldVertex1Y } ) );
          return layer;
        } ) )
      } );
    }
    else {
      state = Hole.updateHolesFromNewHoles( state, layerID, newHoles ).updatedState;
      state = Layer.detectAndUpdatePerimeters( state, layerID ).updatedState;
      state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;
    }

    return { updatedState: state };
  }

  static endDraggingLine ( state, x, y ) {
    let { draggingSupport } = state;
    let layerID = draggingSupport.get( 'layerID' );
    let layer = state.scene.layers.get( layerID );
    let lineID = draggingSupport.get( 'lineID' );
    let line = layer.lines.get( lineID );
    let oldHoles = draggingSupport.get( 'oldHoles' );

    let vertex0 = layer.vertices.get( line.vertices.get( 0 ) );
    let vertex1 = layer.vertices.get( line.vertices.get( 1 ) );

    let maxV = GeometryUtils.maxVertex( vertex0, vertex1 );
    let minV = GeometryUtils.minVertex( vertex0, vertex1 );

    let lineLength = GeometryUtils.verticesDistance( minV, maxV );
    let alpha = Math.atan2( maxV.y - minV.y, maxV.x - minV.x );

    let holesWithOffsetPosition = [];
    layer.lines.get( lineID ).holes.forEach( holeID => {
      let hole = layer.holes.get( holeID );
      let pointOnLine = lineLength * hole.offset;

      let offsetPosition = {
        x: pointOnLine * Math.cos( alpha ) + minV.x,
        y: pointOnLine * Math.sin( alpha ) + minV.y
      };

      holesWithOffsetPosition.push( { hole, offsetPosition } );
    } );

    let diffX = x - draggingSupport.get( 'startPointX' );
    let diffY = y - draggingSupport.get( 'startPointY' );
    let newVertex0X = draggingSupport.get( 'startVertex0X' ) + diffX;
    let newVertex0Y = draggingSupport.get( 'startVertex0Y' ) + diffY;
    let newVertex1X = draggingSupport.get( 'startVertex1X' ) + diffX;
    let newVertex1Y = draggingSupport.get( 'startVertex1Y' ) + diffY;

    if ( state.snapMask && !state.snapMask.isEmpty() ) {

      let curSnap0 = SnapUtils.nearestSnap( state.snapElements, newVertex0X, newVertex0Y, state.snapMask );
      let curSnap1 = SnapUtils.nearestSnap( state.snapElements, newVertex1X, newVertex1Y, state.snapMask );

      let deltaX = 0, deltaY = 0;
      if ( curSnap0 && curSnap1 ) {
        if ( curSnap0.point.distance < curSnap1.point.distance ) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
        } else {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
        }
      } else {
        if ( curSnap0 ) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
        }
        if ( curSnap1 ) {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
        }
      }

      newVertex0X += deltaX;
      newVertex0Y += deltaY;
      newVertex1X += deltaX;
      newVertex1Y += deltaY;
    }

    //let lineGroups = state   //get groups membership if present
    //  .getIn(['scene', 'groups'])
    //  .filter(group => {
    //    const lines = group.getIn(['elements', layerID, 'lines']);
    //    return lines && lines.contains(lineID);
    //  });

    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 0 ) ).updatedState;
    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get( 1 ) ).updatedState;

    let newHoles = Hole.calcNewHolesFromOldHoles( state, layerID, oldHoles );

    state = Hole.updateHolesFromNewHoles( state, layerID, newHoles ).updatedState;
    state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;

    /*
  
    state = Line.remove(state, layerID, lineID).updatedState;
  
    if (!GeometryUtils.samePoints({ newVertex0X, newVertex0Y }, { newVertex1X, newVertex1Y })) {
      let ret = Line.createAvoidingIntersections(
        state,
        layerID,
        line.type,
        newVertex0X,
        newVertex0Y,
        newVertex1X,
        newVertex1Y,
        line.properties,
        holesWithOffsetPosition
      );
  
      state = ret.updatedState;
  
      //re-add to old line's groups if present
      ret.lines.forEach(addedLine => {
        lineGroups.forEach(oldLineGroup => {
          state = Group.addElement(state, oldLineGroup.id, layerID, 'lines', addedLine.id).updatedState;
        });
      });
    }
  */
    state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;
    state = Layer.detectAndUpdatePerimeters( state, layerID ).updatedState;
    state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;

    state = state.merge( {
      mode: MODE_IDLE,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new List()
    } );

    return { updatedState: state };
  }

  static modifyCoordsOnKeyDown ( x1, x2, y1, y2, value, keyCode ) {
    switch ( keyCode ) {
      case 39:
        //Right
        y2 = y1;
        x2 = x1 + ( value / 10 );
        break;

      case 37:
        //Left
        y2 = y1;
        x2 = x1 - ( value / 10 );
        break;

      case 38:
        //Up
        x2 = x1;
        y2 = y1 + ( value / 10 );
        break;

      case 40:
        // Down
        x2 = x1;
        y2 = y1 - ( value / 10 );
        break;

      default:
        return;
    }
    return { modifiedX: x2, modifiedY: y2 };
  }

  // angle
  static setProperties ( state, layerID, lineID, properties ) {
    state = state.mergeIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'properties' ], properties );

    state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;

    return { updatedState: state };
  }

  static setJsProperties ( state, layerID, lineID, properties ) {
    return this.setProperties( state, layerID, lineID, fromJS( properties ) );
  }

  static updateProperties ( state, layerID, lineID, properties ) {
    properties.forEach( ( v, k ) => {
      if ( state.hasIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'properties', k ] ) )
        state = state.mergeIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'properties', k ], v );
    } );

    return { updatedState: state };
  }

  static updateJsProperties ( state, layerID, lineID, properties ) {
    return this.updateProperties( state, layerID, lineID, fromJS( properties ) );
  }

  // lineLenth
  static setAttributes ( state, layerID, lineID, lineAttributes ) {
    let lAttr = lineAttributes.toJS();

    let { lineLength, lineAngle, lineAlto, isEndLine } = lAttr;

    delete lAttr[ 'vertexOne' ];
    delete lAttr[ 'vertexTwo' ];
    delete lAttr[ 'lineLength' ];
    delete lAttr[ 'lineAngle' ];
    delete lAttr[ 'lineAlto' ];
    delete lAttr[ 'lineAngleRad' ];
    delete lAttr[ 'isEndLine' ];

    state = state
      .mergeIn( [ 'scene', 'layers', layerID, 'lines', lineID ], fromJS( lAttr ) )
      //  .mergeIn(['scene', 'layers', layerID, 'vertices', vertexOne.id], { x: vertexOne.x, y: vertexOne.y })
      //  .mergeIn(['scene', 'layers', layerID, 'vertices', vertexTwo.id], { x: vertexTwo.x, y: vertexTwo.y })
      .mergeIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'misc' ], new Map( { '_unitLength': lineLength._unit } ) );

    let layer = state.getIn( [ 'scene', 'layers', layerID ] );
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );

    //let angle_degree = (Line.getLine2IDAngleV0_pcl(layer, line) == null) ? 90 - lineAngle : 360 - lineAngle;
    //let angle = angle_degree * Math.PI / 180;
    let angle = Line.getAngleRadV0ByAngle_pcl( layer, line, lineAngle );
    let v2First = line.v2First;
    let v0id = line.vertices.get( !v2First ? 0 : 1 );
    let v1id = line.vertices.get( !v2First ? 1 : 0 );
    let { x, y } = layer.vertices.get( v0id );
    //let { x: x1, y: y1 } = layer.vertices.get(v1id);
    //let angle = GeometryUtils.angleBetweenTwoPoints(x, y, x1, y1);
    let x1new = x + lineLength.length * Math.cos( angle );
    let y1new = y + lineLength.length * Math.sin( angle );

    if ( v0id == v1id ) {
      let { updatedState: stateV0, vertex: v1new } = Vertex.add( state, layerID, x1new, y1new, 'lines', lineID );
      state = stateV0;
      state = state.setIn( [ 'scene', 'layers', layerID, 'lines', lineID, 'vertices', !v2First ? 1 : 0 ], v1new.id );
    }
    else
      state = state.mergeIn( [ 'scene', 'layers', layerID, 'vertices', v1id ], { x: x1new, y: y1new } );

    if ( !isEndLine ) {
      state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;
      state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;
      state = Layer.detectAndUpdatePerimeters( state, layerID ).updatedState;
      state = Layer.reCalcVertexsBByLineId( state, layerID, lineID ).updatedState;
    }
    else {
      state = Line.endDrawingLine( state, x1new, y1new, true ).updatedState;
    }

    return { updatedState: state };
  }

  static setVerticesCoords ( state, layerID, lineID, x1, y1, x2, y2 ) {
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );
    state = Vertex.setAttributes( state, layerID, line.vertices.get( 0 ), new Map( { x: x1, y: y1 } ) ).updatedState;
    state = Vertex.setAttributes( state, layerID, line.vertices.get( 1 ), new Map( { x: x2, y: y2 } ) ).updatedState;

    return { updatedState: state };
  }

  static next_Drawing_Item ( state, layerID, lineID ) {
    let layer = state.getIn( [ 'scene', 'layers', layerID ] );
    let line = state.getIn( [ 'scene', 'layers', layerID, 'lines', lineID ] );
    let v2First = line.v2First;
    let v1id = line.vertices.get( !v2First ? 1 : 0 );
    let { x: x1, y: y1 } = layer.vertices.get( v1id );

    state = Line.endDrawingLine( state, x1, y1, true ).updatedState;

    return { updatedState: state };
  }

}

export { Line as default };
