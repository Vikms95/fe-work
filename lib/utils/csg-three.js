"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _csgLib = require("./csg-lib.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var BufferGeometry = THREE.BufferGeometry;


_csgLib.CSG.fromGeometry = function (geom, objectIndex) {
  var polygons = [];
  if (geom.isGeometry) {

    var geometryFaces = geom.faces;
    var geometryVertices = geom.vertices;
    var faceIndexes = ['a', 'b', 'c'];

    for (var i = 0; i < geometryFaces.length; i++) {
      var face = geometryFaces[i];
      var vertices = [];
      for (var j = 0; j < 3; j++) {
        vertices.push(new _csgLib.Vertex(geometryVertices[face[faceIndexes[j]]], face.vertexNormals[j], geom.faceVertexUvs[0][i][j]));
      }

      polygons.push(new _csgLib.Polygon(vertices, objectIndex));
    }
  } else if (geom.isBufferGeometry) {
    var index = void 0;
    var positionAttr = geom.attributes.position;
    var normalAttr = geom.attributes.normal;
    var uvAttr = geom.attributes.uv;
    var colorAttr = geom.attributes.color;

    if (geom.index) index = geom.index.array;else {
      index = new Array(positionAttr.array.length / positionAttr.itemSize | 0);
      for (var _i = 0; _i < index.length; _i++) {
        index[_i] = _i;
      }
    }

    var triCount = index.length / 3 | 0;
    polygons = new Array(triCount);

    for (var _i2 = 0, pli = 0, l = index.length; _i2 < l; _i2 += 3, pli++) {
      var _vertices = new Array(3);
      for (var _j = 0; _j < 3; _j++) {
        var vi = index[_i2 + _j];
        var vp = vi * 3;
        var vt = vi * 2;
        var x = positionAttr.array[vp];
        var y = positionAttr.array[vp + 1];
        var z = positionAttr.array[vp + 2];
        var nx = normalAttr.array[vp];
        var ny = normalAttr.array[vp + 1];
        var nz = normalAttr.array[vp + 2];
        //let u = uvattr.array[vt]
        //let v = uvattr.array[vt + 1]
        _vertices[_j] = new _csgLib.Vertex({ x: x, y: y, z: z }, { x: nx, y: ny, z: nz }, uvAttr && { x: uvAttr.array[vt], y: uvAttr.array[vt + 1], z: 0 }, colorAttr && { x: colorAttr.array[vt], y: colorAttr.array[vt + 1], z: colorAttr.array[vt + 2] });
      }

      polygons[pli] = new _csgLib.Polygon(_vertices, objectIndex);
    }
  } else console.error("Unsupported CSG input type:" + geom.type);

  return _csgLib.CSG.fromPolygons(polygons);
};

var placeholderVector = new THREE.Vector3();
var referenceMatrix = new THREE.Matrix3();

_csgLib.CSG.fromMesh = function (mesh, objectIndex) {
  var csg = _csgLib.CSG.fromGeometry(mesh.geometry, objectIndex);
  referenceMatrix.getNormalMatrix(mesh.matrix);

  for (var i = 0; i < csg.polygons.length; i++) {
    var polygon = csg.polygons[i];

    for (var j = 0; j < polygon.vertices.length; j++) {
      var vertex = polygon.vertices[j];
      vertex.pos.copy(placeholderVector.copy(vertex.pos).applyMatrix4(mesh.matrix));
      vertex.normal.copy(placeholderVector.copy(vertex.normal).applyMatrix3(referenceMatrix));
    }
  }

  return csg;
};

var nbuf3 = function nbuf3(ct) {
  return {
    top: 0,
    array: new Float32Array(ct),
    write: function write(v) {
      this.array[this.top++] = v.x;
      this.array[this.top++] = v.y;
      this.array[this.top++] = v.z;
    }
  };
};

var nbuf2 = function nbuf2(ct) {
  return {
    top: 0,
    array: new Float32Array(ct),
    write: function write(v) {
      this.array[this.top++] = v.x;
      this.array[this.top++] = v.y;
    }
  };
};

_csgLib.CSG.toGeometry = function (csg) {
  var buffered = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var polygons = csg.polygons;
  var geometry = void 0;
  var g2 = void 0;

  if (!buffered) //Old geometry path...
    {
      geometry = new BufferGeometry();
      var vs = geometry.vertices;
      var fvuv = geometry.faceVertexUvs[0];
      for (var i = 0; i < polygons.length; i++) {
        var p = polygons[i];
        var pvs = p.vertices;
        var v0 = vs.length;
        var pvlen = pvs.length;

        for (var j = 0; j < pvlen; j++) {
          vs.push(new THREE.Vector3().copy(pvs[j].pos));
        }for (var _j2 = 3; _j2 <= pvlen; _j2++) {
          var fc = new THREE.Face3();
          var fuv = [];
          fvuv.push(fuv);
          var fnml = fc.vertexNormals;
          fc.a = v0;
          fc.b = v0 + _j2 - 2;
          fc.c = v0 + _j2 - 1;

          fnml.push(new THREE.Vector3().copy(pvs[0].normal));
          fnml.push(new THREE.Vector3().copy(pvs[_j2 - 2].normal));
          fnml.push(new THREE.Vector3().copy(pvs[_j2 - 1].normal));
          fuv.push(new THREE.Vector3().copy(pvs[0].uv));
          fuv.push(new THREE.Vector3().copy(pvs[_j2 - 2].uv));
          fuv.push(new THREE.Vector3().copy(pvs[_j2 - 1].uv));

          fc.normal = new THREE.Vector3().copy(p.plane.normal);
          geometry.faces.push(fc);
        }
      }
      geometry = new THREE.BufferGeometry().fromGeometry(geometry);
      geometry.verticesNeedUpdate = geometry.elementsNeedUpdate = geometry.normalsNeedUpdate = true;
    } else {
    //BufferGeometry path
    var triCount = 0;
    polygons.forEach(function (polygon) {
      return triCount += polygon.vertices.length - 2;
    });
    geometry = new THREE.BufferGeometry();

    var vertices = nbuf3(triCount * 3 * 3);
    var normals = nbuf3(triCount * 3 * 3);
    var grps = [];
    var uvs = void 0; // = nbuf2(triCount * 2 * 3)
    var colors = void 0;

    polygons.forEach(function (polygon) {
      var polygonVertices = polygon.vertices;
      var polygonVerticesLength = polygonVertices.length;
      if (polygon.shared !== undefined) {
        if (!grps[polygon.shared]) grps[polygon.shared] = [];
      }
      if (polygonVerticesLength) {
        if (polygonVertices[0].color !== undefined) {
          if (!colors) colors = nbuf3(triCount * 3 * 3);
        }
        if (polygonVertices[0].uv !== undefined) {
          if (!uvs) uvs = nbuf2(triCount * 2 * 3);
        }
      }
      for (var _j3 = 3; _j3 <= polygonVerticesLength; _j3++) {
        polygon.shared !== undefined && grps[polygon.shared].push(vertices.top / 3, vertices.top / 3 + 1, vertices.top / 3 + 2);
        vertices.write(polygonVertices[0].pos);
        vertices.write(polygonVertices[_j3 - 2].pos);
        vertices.write(polygonVertices[_j3 - 1].pos);
        normals.write(polygonVertices[0].normal);
        normals.write(polygonVertices[_j3 - 2].normal);
        normals.write(polygonVertices[_j3 - 1].normal);
        uvs && polygonVertices[0].uv && (uvs.write(polygonVertices[0].uv) || uvs.write(polygonVertices[_j3 - 2].uv) || uvs.write(polygonVertices[_j3 - 1].uv));
        colors && (colors.write(polygonVertices[0].color) || colors.write(polygonVertices[_j3 - 2].color) || colors.write(polygonVertices[_j3 - 1].color));
      }
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices.array, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals.array, 3));
    uvs && geometry.setAttribute('uv', new THREE.BufferAttribute(uvs.array, 2));
    colors && geometry.setAttribute('color', new THREE.BufferAttribute(colors.array, 3));

    if (grps.length) {
      var index = [];
      var geometryBase = 0;
      for (var gi = 0; gi < grps.length; gi++) {
        geometry.addGroup(geometryBase, grps[gi].length, gi);
        geometryBase += grps[gi].length;
        index = index.concat(grps[gi]);
      }
      geometry.setIndex(index);
    }

    g2 = geometry;
  }
  return geometry;
};

_csgLib.CSG.toMesh = function (csg, toMatrix, toMaterial) {
  var geometry = _csgLib.CSG.toGeometry(csg);
  var invertexMatrix = new THREE.Matrix4().copy(toMatrix).invert();
  geometry.applyMatrix4(invertexMatrix);
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  var mesh = new THREE.Mesh(geometry, toMaterial);
  mesh.matrix.copy(toMatrix);
  mesh.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
  mesh.rotation.setFromQuaternion(mesh.quaternion);
  mesh.updateMatrixWorld();
  mesh.castShadow = mesh.receiveShadow = true;

  return mesh;
};

exports.default = _csgLib.CSG;