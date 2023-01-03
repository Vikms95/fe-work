import {
  Mesh,
  Vector2,
  Vector3,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Group,
  BufferGeometry,
  BoxGeometry,
  PolyhedronBufferGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  DoubleSide,
  FrontSide,
  BackSide,
  SceneUtils
} from 'three';

/*
   https://r105.threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html
   
          p2      p3
          ---------
          |       |
      v   |       |
          |-------
          p0      p1
              u

    The order we specify the vertices is important. To be pointing toward the outside of the cube they must be specified in a counter clockwise direction when that triangle is facing the camera.

    Triangles:
      1. p0-p1-p3
      2. p0-p3-p2

    https://r105.threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html

       6----7
      /|   /|
     2----3 |
     | |  | |
     | 4--|-5
     |/   |/
     0----1

    0 (-1, -1,  1)
    1 ( 1, -1,  1)
    2 (-1,  1,  1)
    3 ( 1,  1,  1)
    4 (-1, -1, -1)
    5 ( 1, -1, -1)
    6 (-1,  1, -1)
    7 ( 1,  1, -1)
  
  */

export function buildBox ( p0, p1, p2, p3, v02, v13, mat ) {
  const p4 = new Vector3().addVectors( p0, v02 );
  const p5 = new Vector3().addVectors( p1, v02 );
  const p6 = new Vector3().addVectors( p2, v13 );
  const p7 = new Vector3().addVectors( p3, v13 );

  return buildBox8P( p0, p1, p2, p3, p4, p5, p6, p7, mat );
}

export function buildBox8P ( p0, p1, p2, p3, p4, p5, p6, p7, mat ) {
  const positions = [
    // plane px
    p3.x, p3.y, p3.z,
    p7.x, p7.y, p7.z,
    p1.x, p1.y, p1.z,
    p5.x, p5.y, p5.z,
    // plane nx
    p6.x, p6.y, p6.z,
    p2.x, p2.y, p2.z,
    p4.x, p4.y, p4.z,
    p0.x, p0.y, p0.z,
    // plane py
    p6.x, p6.y, p6.z,
    p7.x, p7.y, p7.z,
    p2.x, p2.y, p2.z,
    p3.x, p3.y, p3.z,
    // plane ny
    p0.x, p0.y, p0.z,
    p1.x, p1.y, p1.z,
    p4.x, p4.y, p4.z,
    p5.x, p5.y, p5.z,
    // plane pz
    p2.x, p2.y, p2.z,
    p3.x, p3.y, p3.z,
    p0.x, p0.y, p0.z,
    p1.x, p1.y, p1.z,
    // plane nz
    p7.x, p7.y, p7.z,
    p6.x, p6.y, p6.z,
    p5.x, p5.y, p5.z,
    p4.x, p4.y, p4.z,
  ];
  const normals = [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 ];
  const uvs = [ 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0 ];
  const indices = [ 0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21 ];

  let buffer = new BufferGeometry();

  // para que se esconda las cara segun como la mira la cámara
  for ( var i = 0; i < 6; i++ )
    buffer.addGroup( 6 * i, 6, i );

  buffer.setIndex( indices );
  buffer.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
  //buffer.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  buffer.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );
  buffer.computeVertexNormals();
  console.log( 'test', new Mesh( buffer, mat ) );


  return new Mesh( buffer, mat );
  //return SceneUtils.createMultiMaterialObject(buffer, mat);

}

export function buildBox2 ( p0, p1, p2, p3, v02, v13, mat ) {
  let buffer = new BufferGeometry();
  //const u = GeometryUtils.diffVector3D(p0, p1);
  //const v = GeometryUtils.diffVector3D(p0, p2);
  //const n = GeometryUtils.crossVectors(u, v);
  //const nn = GeometryUtils.normalizeVector3D(n);
  //const nn2 = GeometryUtils.multScalarVector3D(-1, GeometryUtils.normalizeVector3D(n));
  //const nn = { x: 0, y: 0, z: 1 };
  const indices = [];
  const vertices = [];
  const normals = [];
  const uvs = [];

  const p20 = new Vector2().addVectors( p0, v02 );
  const p21 = new Vector2().addVectors( p1, v02 );
  const p22 = new Vector2().addVectors( p2, v13 );
  const p23 = new Vector2().addVectors( p3, v13 );

  buildVertPlane( p0, p1, p2, p3 );
  buildVertPlane( p1, p21, p3, p23 );
  //buildVertPlane(p21, p20, p23, p22);
  buildVertPlane( p20, p21, p22, p23 );
  buildVertPlane( p20, p0, p22, p2 );
  buildVertPlane( p20, p21, p22, p23 );
  //buildVertPlane(p1, p0, p3, p2);
  buildVertPlane( p0, p1, p2, p3 );

  buffer.setIndex( indices );
  buffer.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
  //buffer.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  buffer.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );
  buffer.computeVertexNormals();

  return new Mesh( buffer, mat );

  function buildVertPlane ( p0, p1, p2, p3 ) {
    // left bottom
    vertices.push( p0.x, p0.y, p0.z );
    //normals.push(nn.x, nn.y, nn.z);
    uvs.push( 0, 1 );
    // right botton
    vertices.push( p1.x, p1.y, p1.z );
    //normals.push(nn.x, nn.y, nn.z);
    uvs.push( 1, 1 );
    // left top
    vertices.push( p2.x, p2.y, p2.z );
    //normals.push(nn.x, nn.y, nn.z);
    uvs.push( 0, 0 );
    // right top
    vertices.push( p3.x, p3.y, p3.z );
    //normals.push(nn.x, nn.y, nn.z);
    uvs.push( 1, 0 );

    indices.push( 0, 1, 3, 0, 3, 2 );
  }
}
