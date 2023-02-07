import { TextureLoader, Mesh, RepeatWrapping, BoxGeometry, MeshBasicMaterial, Group, Vector2, Vector3, MeshStandardMaterial, BufferGeometry, PolyhedronBufferGeometry, Float32BufferAttribute, SphereGeometry, DoubleSide, FrontSide, BackSide, SceneUtils } from 'three';

import ThreeBSP from '../../utils/threeCSG.es6';
import { verticesDistance, angleVector } from '../../utils/geometry';
import * as SharedStyle from '../../shared-style';
import { Line } from '../../class/export';
import { GeometryUtils, Box8P } from '../../utils/export';
// import { Geometry } from '../../../node_modules/three/src/core/Geometry';
import vertex from '../../class/vertex';

var halfPI = Math.PI / 2;

/**
 * Apply a texture to a wall face
 * @param material: The material of the face
 * @param texture: The texture to load
 * @param length: The lenght of the face
 * @param height: The height of the face
 */
var applyTexture = function applyTexture(material, texture, length, height) {
  var loader = new TextureLoader();
  if (texture) {
    material.map = loader.load(texture.uri);
    material.needsUpdate = true;
    material.map.wrapS = RepeatWrapping;
    material.map.wrapT = RepeatWrapping;
    material.map.repeat.set(length * texture.lengthRepeatScale, height * texture.heightRepeatScale);
    material.name = 'wallTexture';

    // TODO This snippet breaks when 3D view is loaded
    // if ( texture.normal ) {
    //   material.normalMap = loader.load( texture.normal.uri );
    //   material.normalMap.wrapS = RepeatWrapping;
    //   material.normalMap.wrapT = RepeatWrapping;

    //   material.normalScale =
    //     new Vector2(
    //       texture.normal.normalScaleX,
    //       texture.normal.normalScaleY
    //     );

    //   material
    //     .normalMap
    //     .repeat
    //     .set(
    //       length * texture.normal.lengthRepeatScale,
    //       height * texture.normal.heightRepeatScale
    //     );
    // }
  }
};

export function buildWall(element, layer, scene, textures) {
  // Get the two vertices of the wall
  var v2First = element.v2First;
  var vertex0 = layer.vertices.get(element.vertices.get(!v2First ? 0 : 1));
  var vertex1 = layer.vertices.get(element.vertices.get(!v2First ? 1 : 0));
  var vertex2 = layer.vertices.get(element.vertices.get(2));
  var vertex3 = layer.vertices.get(element.vertices.get(3));
  // Get height and thickness of the wall converting them into the current scene units
  var height = element.properties.getIn(['height', 'length']);
  var thickness = element.properties.getIn(['thickness', 'length']);
  var v01 = GeometryUtils.diffVector(vertex0, vertex1);
  var v02 = GeometryUtils.diffVector(vertex0, vertex2);
  var v03 = GeometryUtils.diffVector(vertex0, vertex3);

  var _Line$createVertexAnd = Line.createVertexAndVectorsB(vertex0.x, vertex0.y, vertex1.x, vertex1.y, v2First, thickness),
      vv2 = _Line$createVertexAnd.vv2;

  var distance = verticesDistance(vertex0, vertex1);
  var distance23 = verticesDistance(vertex2, vertex3);
  var distance2 = verticesDistance(vv2, vertex2);
  var p0 = new Vector3();
  var p1 = new Vector3(v01.x, 0, -v01.y);
  var p2 = new Vector3(v02.x, 0, -v02.y);
  var pv2 = new Vector3(vv2.x, 0, -vv2.y);
  var p3 = new Vector3(v03.x, 0, -v03.y);
  var vh = new Vector3(0, height, 0);
  var p0h = new Vector3().addVectors(p0, vh);
  var p1h = new Vector3().addVectors(p1, vh);
  var p2h = new Vector3().addVectors(p2, vh);
  var p3h = new Vector3().addVectors(p3, vh);
  var vu = new Vector3().subVectors(p1, p0).normalize();
  var v2v2 = new Vector3().subVectors(pv2, p2);

  var soulMaterial = new MeshBasicMaterial({ color: element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3, side: DoubleSide /*, wireframe: true*/ });
  var frontMaterial = new MeshBasicMaterial({ /*color: 0xFF0000,*/side: DoubleSide /*, wireframe: true*/ });
  var backMaterial = new MeshBasicMaterial({ /*color: 0x00FF00,*/side: DoubleSide /*, wireframe: true*/ });

  applyTexture(frontMaterial, textures[element.properties.get('textureB')], distance23, height);
  applyTexture(backMaterial, textures[element.properties.get('textureA')], distance, height);

  var wallMaterials = [soulMaterial, soulMaterial, soulMaterial, soulMaterial, backMaterial, frontMaterial];
  var wall = Box8P.buildBox8P(p0, p1, p0h, p1h, p2, p3, p2h, p3h, wallMaterials);

  element.holes.forEach(function (holeID) {
    var holeData = layer.holes.get(holeID);

    var holeWidth = holeData.properties.getIn(['width', 'length']);
    var holeHeight = holeData.properties.getIn(['height', 'length']);
    var holeAltitude = holeData.properties.getIn(['altitude', 'length']) || 0;
    var offset = v2First ? 1 - holeData.offset : holeData.offset;
    var holeDistance = offset * distance + distance2;
    var vho = new Vector3().addScaledVector(vu, holeDistance);
    var vhw = new Vector3().addScaledVector(vu, holeWidth);
    var vha = new Vector3(0, holeAltitude, 0);
    var vhh = new Vector3(0, holeHeight, 0);
    var h0 = new Vector3().addVectors(p0, vho).add(vha);
    var h1 = new Vector3().addVectors(h0, vhw);
    var h2 = new Vector3().addVectors(h0, v2v2);
    var h3 = new Vector3().addVectors(h1, v2v2);
    var h0h = new Vector3().addVectors(h0, vhh);
    var h1h = new Vector3().addVectors(h1, vhh);
    var h2h = new Vector3().addVectors(h2, vhh);
    var h3h = new Vector3().addVectors(h3, vhh);

    var holeMesh = Box8P.buildBox8P(h0, h1, h0h, h1h, h2, h3, h2h, h3h, wallMaterials);

    var wallBSP = new ThreeBSP(wall);
    var holeBSP = new ThreeBSP(holeMesh);

    var wallWithHoleBSP = wallBSP.subtract(holeBSP);
    wall = wallWithHoleBSP.toMesh(wallMaterials);
  });

  wall.name = "wall";

  return Promise.resolve(wall);
}

function buildWall0(element, layer, scene, textures) {
  // Get the two vertices of the wall
  var v2First = element.v2First;
  var vertex0 = layer.vertices.get(element.vertices.get(!v2First ? 0 : 1));
  var vertex1 = layer.vertices.get(element.vertices.get(!v2First ? 1 : 0));
  var vertex2 = layer.vertices.get(element.vertices.get(2));
  var vertex3 = layer.vertices.get(element.vertices.get(3));
  // Get height and thickness of the wall converting them into the current scene units
  var height = element.properties.getIn(['height', 'length']);
  var thickness = element.properties.getIn(['thickness', 'length']);

  var _Line$createVertexAnd2 = Line.createVertexAndVectorsB(vertex0.x, vertex0.y, vertex1.x, vertex1.y, v2First, thickness),
      vv2 = _Line$createVertexAnd2.vv2,
      vv3 = _Line$createVertexAnd2.vv3,
      vu = _Line$createVertexAnd2.vu;

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

  var halfThickness = thickness / 2;
  var faceThickness = 0.2;
  var halfFaceThickness = faceThickness / 2;
  var faceDistance = 1;

  /*
  let dist = 20;
  let l_angle1 = line2v0 ? Line.getAngleAndArcL11L20_pcl(layer, line2v0, dist) : null;
  let l_angle2 = Line.getAngleAndArcL11L20_pcl(layer, element, dist);
  let fusionV2 = l_angle1 && l_angle1.angle_rad > Math.PI;
  let fusionV3 = l_angle2 && l_angle2.angle_rad > Math.PI;
  */
  var distance = verticesDistance(vertex0, vertex1);
  var distance23 = verticesDistance(vertex2, vertex3);
  var distance2 = verticesDistance(vv2, vertex2);
  var distance3 = verticesDistance(vertex3, vv3);
  var distanceSoulFace = distance;
  var despSoulFace = 0;

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

  var halfDistance = distance / 2;
  var halfDistance23 = distance23 / 2;
  var halfDistance2 = distance2 / 2;
  var halfDistance3 = distance3 / 2;
  var halfDistanceSoulFace = distanceSoulFace / 2;

  var soulMaterial = new MeshBasicMaterial({ color: element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 });
  var soul = new Mesh(new BoxGeometry(distanceSoulFace, height, thickness - 2 * faceThickness), soulMaterial);
  var backFace = new Mesh(new BoxGeometry(distance, height, faceThickness), soulMaterial);
  var frontFace = new Mesh(new BoxGeometry(distance23, height, faceThickness), soulMaterial);

  //const alpha = Math.asin((vertex1.y - vertex0.y) / (distance));
  var alpha = angleVector(vu);

  console.log('alpha = ' + alpha + ' ' + alpha * 180 / Math.PI);
  console.log('distance2 = ' + distance2);

  var sinAlpha = Math.sin(alpha);
  var cosAlpha = Math.cos(alpha);
  //const dist = 20;
  //const l_angle = Line.getAngleAndArcL11L20_pcl(layer, element, dist);
  //const frontFacedistance2 = (l_angle && l_angle.angle >= 270) ? distance2 : -distance2;
  var frontFacedistance2 = -distance2;

  soul.position.y += height / 2;
  soul.position.x += (halfDistanceSoulFace + despSoulFace) * cosAlpha;
  soul.position.z -= (halfDistanceSoulFace + despSoulFace) * sinAlpha;

  backFace.position.y += height / 2;
  backFace.position.x += halfDistance * cosAlpha;
  backFace.position.z -= halfDistance * sinAlpha;

  frontFace.position.y = soul.position.y;
  frontFace.position.x += (frontFacedistance2 + halfDistance23) * cosAlpha;
  frontFace.position.z -= (frontFacedistance2 + halfDistance23) * sinAlpha;

  soul.rotation.y = alpha;
  backFace.rotation.y = soul.rotation.y;
  frontFace.rotation.y = soul.rotation.y;

  element.holes.forEach(function (holeID) {
    var holeData = layer.holes.get(holeID);

    var holeWidth = holeData.properties.getIn(['width', 'length']);
    var holeHeight = holeData.properties.getIn(['height', 'length']);
    var holeAltitude = holeData.properties.getIn(['altitude', 'length']) || 0;
    //let offset = inverted ? 1 - holeData.offset : holeData.offset;
    var offset = v2First ? 1 - holeData.offset : holeData.offset;
    var holeDistance = offset * distance;

    var holeGeometry = new BoxGeometry(holeWidth, holeHeight, thickness);
    var holeMesh = new Mesh(holeGeometry);

    holeMesh.position.y += holeHeight / 2 + holeAltitude;
    holeMesh.position.x += holeDistance;
    holeMesh.position.z -= holeDistance;

    holeMesh.rotation.y = alpha;

    var wallBSP = new ThreeBSP(soul);
    var holeBSP = new ThreeBSP(holeMesh);

    var wallWithHoleBSP = wallBSP.subtract(holeBSP);
    soul = wallWithHoleBSP.toMesh(soulMaterial);

    holeMesh.position.x += distance2;

    wallBSP = new ThreeBSP(frontFace);
    wallWithHoleBSP = wallBSP.subtract(holeBSP);
    frontFace = wallWithHoleBSP.toMesh(soulMaterial);
  });

  soul.name = 'soul';

  soul.rotation.y = alpha;

  /*
  
  if (distance2 != 0 || distance3 != 0) {
    let wallBSP = new ThreeBSP(soul);
  }
  
  */

  //soul2 = soul;

  var frontMaterial = new MeshBasicMaterial();
  var backMaterial = new MeshBasicMaterial();

  applyTexture(frontMaterial, textures[element.properties.get('textureB')], distance23, height);
  applyTexture(backMaterial, textures[element.properties.get('textureA')], distance, height);

  var scaleFactor = faceThickness / thickness;
  //let texturedFaceDistance = halfThickness + faceDistance;
  var texturedFaceDistance = halfThickness + halfFaceThickness;
  var texturedFaceDistance2 = halfThickness - halfFaceThickness;

  //let frontFace = soul.clone();
  //let frontFace = soul2.clone();
  frontFace.material = frontMaterial;
  //frontFace.scale.set(1, 1, scaleFactor);
  frontFace.position.x += texturedFaceDistance2 * Math.cos(alpha + halfPI);
  frontFace.position.z -= texturedFaceDistance2 * Math.sin(alpha + halfPI);
  frontFace.name = 'frontFace';

  //let backFace = soul.clone();
  backFace.material = backMaterial;
  //backFace.scale.set(1, 1, scaleFactor);
  backFace.position.x += texturedFaceDistance2 * Math.cos(alpha - halfPI);
  backFace.position.z -= texturedFaceDistance2 * Math.sin(alpha - halfPI);
  backFace.name = 'backFace';

  var merged = new Group();
  merged.add(soul, frontFace, backFace);
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

  merged.position.x -= texturedFaceDistance * Math.cos(alpha - halfPI);
  merged.position.z += texturedFaceDistance * Math.sin(alpha - halfPI);

  return Promise.resolve(merged);
}

export function updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild) {
  var noPerf = function noPerf() {
    selfDestroy();return selfBuild();
  };
  var wall = mesh.getObjectByName("wall");

  if (differences[0] == 'selected') {
    wall.material.fill(new MeshBasicMaterial({ color: element.selected ? SharedStyle.MESH_SELECTED : 0xD3D3D3 }), 0, 3);
  }
}