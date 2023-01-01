"use strict";

import * as THREE from "three";

const { BufferGeometry } = THREE;

import { CSG, Vertex, Polygon } from "./csg-lib.js";

CSG.fromGeometry = function ( geom, objectIndex ) {
  let polygons = [];
  if ( geom.isGeometry ) {

    const geometryFaces = geom.faces;
    const geometryVertices = geom.vertices;
    const faceIndexes = [ 'a', 'b', 'c' ];

    for ( let i = 0; i < geometryFaces.length; i++ ) {
      const face = geometryFaces[ i ];
      const vertices = [];
      for ( let j = 0; j < 3; j++ ) {
        vertices.push( new Vertex( geometryVertices[ face[ faceIndexes[ j ] ] ], face.vertexNormals[ j ], geom.faceVertexUvs[ 0 ][ i ][ j ] ) );
      }

      polygons.push( new Polygon( vertices, objectIndex ) );
    }

  } else if ( geom.isBufferGeometry ) {
    let index;
    const positionAttr = geom.attributes.position;
    const normalAttr = geom.attributes.normal;
    const uvAttr = geom.attributes.uv;
    const colorAttr = geom.attributes.color;

    if ( geom.index )
      index = geom.index.array;
    else {
      index = new Array( ( positionAttr.array.length / positionAttr.itemSize ) | 0 );
      for ( let i = 0; i < index.length; i++ )
        index[ i ] = i;
    }

    const triCount = ( index.length / 3 ) | 0;
    polygons = new Array( triCount );

    for ( let i = 0, pli = 0, l = index.length; i < l; i += 3, pli++ ) {
      let vertices = new Array( 3 );
      for ( let j = 0; j < 3; j++ ) {
        let vi = index[ i + j ];
        let vp = vi * 3;
        let vt = vi * 2;
        let x = positionAttr.array[ vp ];
        let y = positionAttr.array[ vp + 1 ];
        let z = positionAttr.array[ vp + 2 ];
        let nx = normalAttr.array[ vp ];
        let ny = normalAttr.array[ vp + 1 ];
        let nz = normalAttr.array[ vp + 2 ];
        //let u = uvattr.array[vt]
        //let v = uvattr.array[vt + 1]
        vertices[ j ] = new Vertex(
          { x, y, z },
          { x: nx, y: ny, z: nz },
          uvAttr && { x: uvAttr.array[ vt ], y: uvAttr.array[ vt + 1 ], z: 0 },
          colorAttr && { x: colorAttr.array[ vt ], y: colorAttr.array[ vt + 1 ], z: colorAttr.array[ vt + 2 ] } );
      }

      polygons[ pli ] = new Polygon( vertices, objectIndex );
    }
  } else
    console.error( "Unsupported CSG input type:" + geom.type );

  return CSG.fromPolygons( polygons );
};

const placeholderVector = new THREE.Vector3();
const referenceMatrix = new THREE.Matrix3();

CSG.fromMesh = function ( mesh, objectIndex ) {
  const csg = CSG.fromGeometry( mesh.geometry, objectIndex );
  referenceMatrix.getNormalMatrix( mesh.matrix );

  for ( let i = 0; i < csg.polygons.length; i++ ) {
    const polygon = csg.polygons[ i ];

    for ( let j = 0; j < polygon.vertices.length; j++ ) {
      const vertex = polygon.vertices[ j ];
      vertex.pos.copy( placeholderVector.copy( vertex.pos ).applyMatrix4( mesh.matrix ) );
      vertex.normal.copy( placeholderVector.copy( vertex.normal ).applyMatrix3( referenceMatrix ) );
    }
  }

  return csg;
};

const nbuf3 = ( ct ) => {
  return {
    top: 0,
    array: new Float32Array( ct ),
    write: function ( v ) {
      ( this.array[ this.top++ ] = v.x );
      ( this.array[ this.top++ ] = v.y );
      ( this.array[ this.top++ ] = v.z );
    }
  };
};

const nbuf2 = ( ct ) => {
  return {
    top: 0,
    array: new Float32Array( ct ),
    write: function ( v ) {
      ( this.array[ this.top++ ] = v.x );
      ( this.array[ this.top++ ] = v.y );
    }
  };
};

CSG.toGeometry = function ( csg, buffered = true ) {
  const polygons = csg.polygons;
  let geometry;
  let g2;

  if ( !buffered ) //Old geometry path...
  {
    geometry = new BufferGeometry();
    let vs = geometry.vertices;
    let fvuv = geometry.faceVertexUvs[ 0 ];
    for ( let i = 0; i < polygons.length; i++ ) {
      let p = polygons[ i ];
      let pvs = p.vertices;
      let v0 = vs.length;
      let pvlen = pvs.length;

      for ( let j = 0; j < pvlen; j++ )
        vs.push( new THREE.Vector3().copy( pvs[ j ].pos ) );

      for ( let j = 3; j <= pvlen; j++ ) {
        let fc = new THREE.Face3();
        let fuv = [];
        fvuv.push( fuv );
        let fnml = fc.vertexNormals;
        fc.a = v0;
        fc.b = v0 + j - 2;
        fc.c = v0 + j - 1;

        fnml.push( new THREE.Vector3().copy( pvs[ 0 ].normal ) );
        fnml.push( new THREE.Vector3().copy( pvs[ j - 2 ].normal ) );
        fnml.push( new THREE.Vector3().copy( pvs[ j - 1 ].normal ) );
        fuv.push( new THREE.Vector3().copy( pvs[ 0 ].uv ) );
        fuv.push( new THREE.Vector3().copy( pvs[ j - 2 ].uv ) );
        fuv.push( new THREE.Vector3().copy( pvs[ j - 1 ].uv ) );

        fc.normal = new THREE.Vector3().copy( p.plane.normal );
        geometry.faces.push( fc );
      }
    }
    geometry = new THREE.BufferGeometry().fromGeometry( geometry );
    geometry.verticesNeedUpdate = geometry.elementsNeedUpdate = geometry.normalsNeedUpdate = true;
  } else { //BufferGeometry path
    let triCount = 0;
    polygons.forEach( polygon => triCount += ( polygon.vertices.length - 2 ) );
    geometry = new THREE.BufferGeometry();

    const vertices = nbuf3( triCount * 3 * 3 );
    const normals = nbuf3( triCount * 3 * 3 );
    const grps = [];
    let uvs; // = nbuf2(triCount * 2 * 3)
    let colors;

    polygons.forEach( polygon => {
      let polygonVertices = polygon.vertices;
      let polygonVerticesLength = polygonVertices.length;
      if ( polygon.shared !== undefined ) {
        if ( !grps[ polygon.shared ] ) grps[ polygon.shared ] = [];
      }
      if ( polygonVerticesLength ) {
        if ( polygonVertices[ 0 ].color !== undefined ) {
          if ( !colors ) colors = nbuf3( triCount * 3 * 3 );
        }
        if ( polygonVertices[ 0 ].uv !== undefined ) {
          if ( !uvs ) uvs = nbuf2( triCount * 2 * 3 );
        }
      }
      for ( let j = 3; j <= polygonVerticesLength; j++ ) {
        ( polygon.shared !== undefined ) && ( grps[ polygon.shared ].push( vertices.top / 3, ( vertices.top / 3 ) + 1, ( vertices.top / 3 ) + 2 ) );
        vertices.write( polygonVertices[ 0 ].pos );
        vertices.write( polygonVertices[ j - 2 ].pos );
        vertices.write( polygonVertices[ j - 1 ].pos );
        normals.write( polygonVertices[ 0 ].normal );
        normals.write( polygonVertices[ j - 2 ].normal );
        normals.write( polygonVertices[ j - 1 ].normal );
        uvs && ( polygonVertices[ 0 ].uv ) && ( uvs.write( polygonVertices[ 0 ].uv ) || uvs.write( polygonVertices[ j - 2 ].uv ) || uvs.write( polygonVertices[ j - 1 ].uv ) );
        colors && ( colors.write( polygonVertices[ 0 ].color ) || colors.write( polygonVertices[ j - 2 ].color ) || colors.write( polygonVertices[ j - 1 ].color ) );
      }
    }
    );

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices.array, 3 ) );
    geometry.setAttribute( 'normal', new THREE.BufferAttribute( normals.array, 3 ) );
    uvs && geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs.array, 2 ) );
    colors && geometry.setAttribute( 'color', new THREE.BufferAttribute( colors.array, 3 ) );

    if ( grps.length ) {
      let index = [];
      let geometryBase = 0;
      for ( let gi = 0; gi < grps.length; gi++ ) {
        geometry.addGroup( geometryBase, grps[ gi ].length, gi );
        geometryBase += grps[ gi ].length;
        index = index.concat( grps[ gi ] );
      }
      geometry.setIndex( index );
    }

    g2 = geometry;
  }
  return geometry;
};

CSG.toMesh = function ( csg, toMatrix, toMaterial ) {
  const geometry = CSG.toGeometry( csg );
  const invertexMatrix = new THREE.Matrix4().copy( toMatrix ).invert();
  geometry.applyMatrix4( invertexMatrix );
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  const mesh = new THREE.Mesh( geometry, toMaterial );
  mesh.matrix.copy( toMatrix );
  mesh.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );
  mesh.rotation.setFromQuaternion( mesh.quaternion );
  mesh.updateMatrixWorld();
  mesh.castShadow = mesh.receiveShadow = true;

  return mesh;
};

export default CSG;