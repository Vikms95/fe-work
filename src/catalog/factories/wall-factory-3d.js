import {
  TextureLoader,
  Mesh,
  RepeatWrapping,
  BoxGeometry,
  MeshBasicMaterial,
  Group,
  Vector2,
  Vector3,
  MeshStandardMaterial,
  BufferGeometry,
  PolyhedronBufferGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  DoubleSide,
  FrontSide,
  BackSide,
  SceneUtils
} from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import { verticesDistance, angleVector } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';
import { Line } from '../../class/export';
import { GeometryUtils, Box8P } from '../../utils/export';
// import { Geometry } from '../../../node_modules/three/src/core/Geometry';
import vertex from '../../class/vertex';

const halfPI = Math.PI / 2;

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */

const applyTexture = ( material, texture, length, height ) => {
  let loader = new TextureLoader();
  console.log( 'Cambiando textura' );
  if ( texture ) {
    material.map = loader.load( texture.uri );
    material.needsUpdate = true;
    material.map.wrapS = RepeatWrapping;
    material.map.wrapT = RepeatWrapping;

    material.map.repeat.set( length * texture.lengthRepeatScale, height * texture.heightRepeatScale );
    material.name = 'wallTexture';
  }
};

export function buildWall ( element, layer, scene, textures ) {
  // Get the two vertices of the wall
  let v2First = element.v2First;
  let vertex0 = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
  let vertex1 = layer.vertices.get( element.vertices.get( !v2First ? 1 : 0 ) );
  let vertex2 = layer.vertices.get( element.vertices.get( 2 ) );
  let vertex3 = layer.vertices.get( element.vertices.get( 3 ) );
  // Get height and thickness of the wall converting them into the current scene units
  let height = element.properties.getIn( [ 'height', 'length' ] );
  let thickness = element.properties.getIn( [ 'thickness', 'length' ] );
  let v01 = GeometryUtils.diffVector( vertex0, vertex1 );
  let v02 = GeometryUtils.diffVector( vertex0, vertex2 );
  let v03 = GeometryUtils.diffVector( vertex0, vertex3 );
  let { vv2 } = Line.createVertexAndVectorsB( vertex0.x, vertex0.y, vertex1.x, vertex1.y, v2First, thickness );
  let distance = verticesDistance( vertex0, vertex1 );
  let distance23 = verticesDistance( vertex2, vertex3 );
  let distance2 = verticesDistance( vv2, vertex2 );
  let p0 = new Vector3();
  let p1 = new Vector3( v01.x, 0, -v01.y );
  let p2 = new Vector3( v02.x, 0, -v02.y );
  let pv2 = new Vector3( vv2.x, 0, -vv2.y );
  let p3 = new Vector3( v03.x, 0, -v03.y );
  let vh = new Vector3( 0, height, 0 );
  let p0h = new Vector3().addVectors( p0, vh );
  let p1h = new Vector3().addVectors( p1, vh );
  let p2h = new Vector3().addVectors( p2, vh );
  let p3h = new Vector3().addVectors( p3, vh );
  const vu = new Vector3().subVectors( p1, p0 ).normalize();
  const v2v2 = new Vector3().subVectors( pv2, p2 );

  let soulMaterial = new MeshStandardMaterial( { color: ( element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 ), side: DoubleSide/*, wireframe: true*/ } );
  let frontMaterial = new MeshStandardMaterial( { /*color: 0xFF0000,*/ side: DoubleSide/*, wireframe: true*/ } );
  let backMaterial = new MeshStandardMaterial( { /*color: 0x00FF00,*/ side: DoubleSide /*, wireframe: true*/ } );

  applyTexture( frontMaterial, textures[ element.properties.get( 'textureB' ) ], distance23, height );
  applyTexture( backMaterial, textures[ element.properties.get( 'textureA' ) ], distance, height );

  let wallMaterials = [ soulMaterial, soulMaterial, soulMaterial, soulMaterial, backMaterial, frontMaterial ];
  let wall = Box8P.buildBox8P( p0, p1, p0h, p1h, p2, p3, p2h, p3h, wallMaterials );

  element.holes.forEach( holeID => {
    let holeData = layer.holes.get( holeID );

    let holeWidth = holeData.properties.getIn( [ 'width', 'length' ] );
    let holeHeight = holeData.properties.getIn( [ 'height', 'length' ] );
    let holeAltitude = holeData.properties.getIn( [ 'altitude', 'length' ] ) || 0;
    let offset = v2First ? 1 - holeData.offset : holeData.offset;
    let holeDistance = offset * distance + distance2;
    let vho = new Vector3().addScaledVector( vu, holeDistance );
    let vhw = new Vector3().addScaledVector( vu, holeWidth );
    let vha = new Vector3( 0, holeAltitude, 0 );
    let vhh = new Vector3( 0, holeHeight, 0 );
    let h0 = new Vector3().addVectors( p0, vho ).add( vha );
    let h1 = new Vector3().addVectors( h0, vhw );
    let h2 = new Vector3().addVectors( h0, v2v2 );
    let h3 = new Vector3().addVectors( h1, v2v2 );
    let h0h = new Vector3().addVectors( h0, vhh );
    let h1h = new Vector3().addVectors( h1, vhh );
    let h2h = new Vector3().addVectors( h2, vhh );
    let h3h = new Vector3().addVectors( h3, vhh );

    let holeMesh = Box8P.buildBox8P( h0, h1, h0h, h1h, h2, h3, h2h, h3h, wallMaterials );


    let wallBSP = new ThreeBSP( wall );
    let holeBSP = new ThreeBSP( holeMesh );

    let wallWithHoleBSP = wallBSP.subtract( holeBSP );
    wall = wallWithHoleBSP.toMesh( wallMaterials );
  } );

  wall.name = "wall";

  wall.receiveShadow = true;
  // wall.castShadow = true;

  return Promise.resolve( wall );
}

function buildWall0 ( element, layer, scene, textures ) {
  // Get the two vertices of the wall
  let v2First = element.v2First;
  let vertex0 = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
  let vertex1 = layer.vertices.get( element.vertices.get( !v2First ? 1 : 0 ) );
  let vertex2 = layer.vertices.get( element.vertices.get( 2 ) );
  let vertex3 = layer.vertices.get( element.vertices.get( 3 ) );
  // Get height and thickness of the wall converting them into the current scene units
  let height = element.properties.getIn( [ 'height', 'length' ] );
  let thickness = element.properties.getIn( [ 'thickness', 'length' ] );
  let { vv2, vv3, vu } = Line.createVertexAndVectorsB( vertex0.x, vertex0.y, vertex1.x, vertex1.y, v2First, thickness );

  //let inverted = false;

  //// The first vertex is the smaller one
  //if (vertex0.x > vertex1.x) {
  //  let app = vertex0;

  //  vertex0 = vertex1;
  //  vertex1 = app;

  //  //app = vertex2;
  //  //vertex2 = vertex3;
  //  //vertex3 = app;

  //  //app = vv2;
  //  //vv2 = vv3;
  //  //vv3 = app;

  //  inverted = true;
  //}

  /*
 
  let linesID = Line.getLines0_1_pcl(layer, element);
  let line2v0 = linesID.line0ID ? layer.lines.get(linesID.line0ID) : null;
  let line2v1 = linesID.line1ID ? layer.lines.get(linesID.line1ID) : null;
 
  let v2FirstV3;
  let vertexV30;
  let vertexV31;
  let vertexV32;
  let vertexV33;
 
  let vertexV333;
 
  if (line2v1) {
    v2FirstV3 = line2v1.v2First;
    vertexV30 = layer.vertices.get(element.vertices.get(!v2FirstV3 ? 0 : 1));
    vertexV31 = layer.vertices.get(element.vertices.get(!v2FirstV3 ? 1 : 0));
    vertexV32 = layer.vertices.get(line2v1.vertices.get(2));
    vertexV33 = layer.vertices.get(line2v1.vertices.get(3));
 
    const V333 = GeometryUtils.twoLineSegmentsIntersection(vertex2, vertex3, vertexV32, vertexV33);
 
    if (V333.point)
      vertexV333 = V333.point;
  }
 
*/

  let halfThickness = thickness / 2;
  let faceThickness = 0.2;
  let halfFaceThickness = faceThickness / 2;
  let faceDistance = 1;

  /*
  let dist = 20;
  let l_angle1 = line2v0 ? Line.getAngleAndArcL11L20_pcl(layer, line2v0, dist) : null;
  let l_angle2 = Line.getAngleAndArcL11L20_pcl(layer, element, dist);
  let fusionV2 = l_angle1 && l_angle1.angle_rad > Math.PI;
  let fusionV3 = l_angle2 && l_angle2.angle_rad > Math.PI;
  */
  let distance = verticesDistance( vertex0, vertex1 );
  let distance23 = verticesDistance( vertex2, vertex3 );
  let distance2 = verticesDistance( vv2, vertex2 );
  let distance3 = verticesDistance( vertex3, vv3 );
  let distanceSoulFace = distance;
  let despSoulFace = 0;

  /*
  if (fusionV2) {
    if (fusionV3) {
      distanceSoulFace = GeometryUtils.verticesDistance(vertex2, vertexV333);
      despSoulFace = (distance - distanceSoulFace);
      distance2 = distance23 - distance;
    }
    else {
      distanceSoulFace = distance23;
      despSoulFace = (distance - distanceSoulFace);
      distance2 = distance23 - distance;
    }
  }
  else if (fusionV3) {
    distanceSoulFace = GeometryUtils.verticesDistance(vertex2, vertexV32);
  }
 
*/

  const halfDistance = distance / 2;
  const halfDistance23 = distance23 / 2;
  const halfDistance2 = distance2 / 2;
  const halfDistance3 = distance3 / 2;
  const halfDistanceSoulFace = distanceSoulFace / 2;

  let soulMaterial = new MeshStandardMaterial( { color: ( element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 ) } );
  let soul = new Mesh( new BoxGeometry( distanceSoulFace, height, thickness - 2 * faceThickness ), soulMaterial );
  let backFace = new Mesh( new BoxGeometry( distance, height, faceThickness ), soulMaterial );
  let frontFace = new Mesh( new BoxGeometry( distance23, height, faceThickness ), soulMaterial );

  //const alpha = Math.asin((vertex1.y - vertex0.y) / (distance));
  const alpha = angleVector( vu );

  console.log( `alpha = ${ alpha } ${ alpha * 180 / Math.PI }` );
  console.log( `distance2 = ${ distance2 }` );

  const sinAlpha = Math.sin( alpha );
  const cosAlpha = Math.cos( alpha );
  //const dist = 20;
  //const l_angle = Line.getAngleAndArcL11L20_pcl(layer, element, dist);
  //const frontFacedistance2 = (l_angle && l_angle.angle >= 270) ? distance2 : -distance2;
  const frontFacedistance2 = -distance2;

  soul.position.y += height / 2;
  soul.position.x += ( halfDistanceSoulFace + despSoulFace ) * cosAlpha;
  soul.position.z -= ( halfDistanceSoulFace + despSoulFace ) * sinAlpha;

  backFace.position.y += height / 2;
  backFace.position.x += halfDistance * cosAlpha;
  backFace.position.z -= halfDistance * sinAlpha;

  frontFace.position.y = soul.position.y;
  frontFace.position.x += ( frontFacedistance2 + halfDistance23 ) * cosAlpha;
  frontFace.position.z -= ( frontFacedistance2 + halfDistance23 ) * sinAlpha;

  soul.rotation.y = alpha;
  backFace.rotation.y = soul.rotation.y;
  frontFace.rotation.y = soul.rotation.y;

  element.holes.forEach( holeID => {
    let holeData = layer.holes.get( holeID );

    let holeWidth = holeData.properties.getIn( [ 'width', 'length' ] );
    let holeHeight = holeData.properties.getIn( [ 'height', 'length' ] );
    let holeAltitude = holeData.properties.getIn( [ 'altitude', 'length' ] ) || 0;
    //let offset = inverted ? 1 - holeData.offset : holeData.offset;
    let offset = v2First ? 1 - holeData.offset : holeData.offset;
    let holeDistance = offset * distance;

    let holeGeometry = new BoxGeometry( holeWidth, holeHeight, thickness );
    let holeMesh = new Mesh( holeGeometry );

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance;
    holeMesh.position.z -= holeDistance;

    holeMesh.rotation.y = alpha;

    let wallBSP = new ThreeBSP( soul );
    let holeBSP = new ThreeBSP( holeMesh );

    let wallWithHoleBSP = wallBSP.subtract( holeBSP );
    soul = wallWithHoleBSP.toMesh( soulMaterial );

    holeMesh.position.x += distance2;

    wallBSP = new ThreeBSP( frontFace );
    wallWithHoleBSP = wallBSP.subtract( holeBSP );
    frontFace = wallWithHoleBSP.toMesh( soulMaterial );


  } );

  soul.name = 'soul';

  soul.rotation.y = alpha;

  let frontMaterial = new MeshStandardMaterial();
  let backMaterial = new MeshStandardMaterial();

  applyTexture( frontMaterial, textures[ element.properties.get( 'textureB' ) ], distance23, height );
  applyTexture( backMaterial, textures[ element.properties.get( 'textureA' ) ], distance, height );

  let scaleFactor = faceThickness / thickness;
  //let texturedFaceDistance = halfThickness + faceDistance;
  let texturedFaceDistance = halfThickness + halfFaceThickness;
  let texturedFaceDistance2 = halfThickness - halfFaceThickness;

  //let frontFace = soul.clone();
  //let frontFace = soul2.clone();
  frontFace.material = frontMaterial;
  //frontFace.scale.set(1, 1, scaleFactor);
  frontFace.position.x += texturedFaceDistance2 * Math.cos( alpha + ( halfPI ) );
  frontFace.position.z -= texturedFaceDistance2 * Math.sin( alpha + ( halfPI ) );
  frontFace.name = 'frontFace';

  //let backFace = soul.clone();
  backFace.material = backMaterial;
  //backFace.scale.set(1, 1, scaleFactor);
  backFace.position.x += texturedFaceDistance2 * Math.cos( alpha - ( halfPI ) );
  backFace.position.z -= texturedFaceDistance2 * Math.sin( alpha - ( halfPI ) );
  backFace.name = 'backFace';

  let merged = new Group();
  merged.add( soul, frontFace, backFace );
  //merged.add(soul2, frontFace, backFace);

  /*
  const geometry1 = new SphereGeometry(2, 32, 16);
  const material1 = new MeshBasicMaterial({ color: 0xffff00 });
  const sphere1 = new Mesh(geometry1, material1);
  const sphere2 = sphere1.clone();
  const sphere3 = sphere1.clone();
  const sphere4 = sphere1.clone();
 
  sphere1.position.x = (vertex2.x - vertex0.x) * cosAlpha;
  sphere1.position.y = height;
  sphere1.position.z = -(vertex2.y - vertex0.y) * sinAlpha;
  sphere2.position.x = (vertex3.x - vertex0.x) * cosAlpha;
  sphere2.position.y = height;
  sphere2.position.z = -(vertex3.y - vertex0.y) * sinAlpha;
  sphere3.position.x = 0;
  sphere3.position.y = height;
  sphere3.position.z = 0;
  sphere4.position.x = (vertex1.x - vertex0.x) * cosAlpha;
  sphere4.position.y = height;
  sphere4.position.z = -(vertex1.y - vertex0.y) * sinAlpha;
  merged.add(sphere1, sphere2, sphere3, sphere4);
  */

  merged.position.x -= texturedFaceDistance * Math.cos( alpha - ( halfPI ) );
  merged.position.z += texturedFaceDistance * Math.sin( alpha - ( halfPI ) );

  return Promise.resolve( merged );
}

export function updatedWall ( element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild ) {
  let noPerf = () => { selfDestroy(); return selfBuild(); };
  let wall = mesh.getObjectByName( "wall" );
  wall.receiveShadow = true;
  // wall.castShadow = true;

  if ( differences[ 0 ] == 'selected' ) {
    wall.material.fill( new MeshStandardMaterial( { color: ( element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 ) } ), 0, 3 );
    return;
  }

  else if ( differences[ 0 ] == 'properties' ) {
    if ( differences[ 1 ].includes( 'texture' ) ) {
      return noPerf();
    }
  }

  // return noPerf();
}