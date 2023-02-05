import {
  TextureLoader,
  Mesh,
  RepeatWrapping,
  BoxGeometry,
  MeshBasicMaterial,
  Group,
  Vector2,
  FrontSide
} from 'three';

import CSG from '../../utils/csg-three';
import { verticesDistance } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';
import { MeshStandardMaterial } from 'three';

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
  let vertex0 = layer.vertices.get( element.vertices.get( 0 ) );
  let vertex1 = layer.vertices.get( element.vertices.get( 1 ) );
  let inverted = false;

  // The first vertex is the smaller one
  if ( vertex0.x > vertex1.x ) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
    inverted = true;
  }

  // Get height and thickness of the wall converting them into the current scene units
  let height = element.properties.getIn( [ 'height', 'length' ] );
  let thickness = element.properties.getIn( [ 'thickness', 'length' ] );
  let halfThickness = thickness / 2;
  let faceThickness = 0.2;
  let faceDistance = 1;

  let distance = verticesDistance( vertex0, vertex1 );
  let halfDistance = distance / 2;

  let soulMaterial = new MeshStandardMaterial( { color: ( element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 ) } );
  let soulGeometry = new BoxGeometry( distance, height, thickness );
  soulMaterial.name = 'wallMaterial';
  soulGeometry.name = 'wallGeometry';


  let soulMesh = new Mesh( soulGeometry, soulMaterial );
  soulMesh.name = 'soulMesh';

  let alpha = Math.asin( ( vertex1.y - vertex0.y ) / ( distance ) );

  let sinAlpha = Math.sin( alpha );
  let cosAlpha = Math.cos( alpha );

  soulMesh.position.y += height / 2;
  soulMesh.position.x += halfDistance * cosAlpha;
  soulMesh.position.z -= halfDistance * sinAlpha;

  soulMesh.rotation.y = alpha;

  element.holes.forEach( holeID => {
    let holeData = layer.holes.get( holeID );

    let holeWidth = holeData.properties.getIn( [ 'width', 'length' ] );
    let holeHeight = holeData.properties.getIn( [ 'height', 'length' ] );
    let holeAltitude = holeData.properties.getIn( [ 'altitude', 'length' ] ) || 0;
    let offset = inverted ? 1 - holeData.offset : holeData.offset;
    let holeDistance = offset * distance;

    let holeGeometry = new BoxGeometry( holeWidth, holeHeight, thickness );
    let holeMesh = new Mesh( holeGeometry );

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance * cosAlpha;
    holeMesh.position.z -= holeDistance * sinAlpha;

    holeMesh.rotation.y = alpha;

    soulMesh.updateMatrix();
    holeMesh.updateMatrix();

    let wallCSG = CSG.fromMesh( soulMesh );
    let holeCSG = CSG.fromMesh( holeMesh );
    let wallWithHoleCSG = wallCSG.subtract( holeCSG );

    soulMesh.updateMatrix();

    soulMesh = CSG.toMesh( wallWithHoleCSG, soulMesh.matrix );
    soulMesh.material = soulMaterial;
    soulMesh.name = 'soulMesh';

  } );

  soulMesh.receiveShadow = true;
  soulMesh.material.side = FrontSide;

  let frontMaterial = new MeshStandardMaterial();
  let backMaterial = new MeshStandardMaterial();

  frontMaterial.side = FrontSide;
  backMaterial.side = FrontSide;

  applyTexture( frontMaterial, textures[ element.properties.get( 'textureB' ) ], distance, height );
  applyTexture( backMaterial, textures[ element.properties.get( 'textureA' ) ], distance, height );

  let scaleFactor = faceThickness / thickness;
  let texturedFaceDistance = halfThickness + faceDistance;

  let frontFace = soulMesh.clone();
  frontFace.material = frontMaterial;
  frontFace.scale.set( 1, 1, scaleFactor );
  frontFace.position.x += texturedFaceDistance * Math.cos( alpha - ( halfPI ) );
  frontFace.position.z -= texturedFaceDistance * Math.sin( alpha - ( halfPI ) );
  frontFace.name = 'frontFace';

  let backFace = soulMesh.clone();
  backFace.material = backMaterial;
  backFace.scale.set( 1, 1, scaleFactor );
  backFace.position.x += texturedFaceDistance * Math.cos( alpha + ( halfPI ) );
  backFace.position.z -= texturedFaceDistance * Math.sin( alpha + ( halfPI ) );
  backFace.name = 'backFace';

  let merged = new Group();
  merged.add( soulMesh, frontFace, backFace );

  return Promise.resolve( merged );
}

export function updatedWall ( element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild ) {
  let noPerf = () => { selfDestroy(); return selfBuild(); };
  let soulMesh = mesh.getObjectByName( 'soulMesh' );
  let frontFace = mesh.getObjectByName( 'frontFace' );
  let backFace = mesh.getObjectByName( 'backFace' );

  if ( differences[ 0 ] == 'selected' ) {
    soulMesh.material = new MeshStandardMaterial( { color: ( element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 ) } );
    soulMesh.receiveShadow = true;
    soulMesh.material.side = FrontSide;
    soulMesh.material.name = 'updatedSoulMaterial';
  }
  else if ( differences[ 0 ] == 'properties' ) {

    if ( differences[ 1 ] == 'thickness' ) {
      let newThickness = element.getIn( [ 'properties', 'thickness', 'length' ] );
      let oldThickness = oldElement.getIn( [ 'properties', 'thickness', 'length' ] );
      let halfNewThickness = newThickness / 2;
      let texturedFaceDistance = halfNewThickness + 1;
      let originalThickness = oldThickness / soulMesh.scale.z;
      let alpha = soulMesh.rotation.y;

      let xTemp = texturedFaceDistance * Math.cos( alpha - ( halfPI ) );
      let zTemp = texturedFaceDistance * Math.sin( alpha - ( halfPI ) );

      soulMesh.scale.set( 1, 1, ( newThickness / originalThickness ) );

      frontFace.position.x = soulMesh.position.x + ( xTemp );
      frontFace.position.z = soulMesh.position.z + ( zTemp );

      backFace.position.x = soulMesh.position.x - ( xTemp );
      backFace.position.z = soulMesh.position.z - ( zTemp );
    }
    else return noPerf();
  }
  else return noPerf();

  return Promise.resolve( mesh );
}
