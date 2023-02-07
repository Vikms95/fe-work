'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disposeScene = disposeScene;
exports.disposeObject = disposeObject;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function disposeGeometry(geometry) {
  geometry.dispose();
}

function disposeTexture(texture) {
  if (!texture) return;

  texture.dispose();
}

//**POSIBLE CULPRIT OF TEXTURE BUG? */
var isEmptyNestedMaterialArray = function isEmptyNestedMaterialArray(material) {
  return typeof material.materials === 'undefined' || typeof material.materials.length === 'undefined';
};

function disposeMultimaterial(material) {
  if (isEmptyNestedMaterialArray(material)) return;
  console.log(material.materials);
  material.materials.forEach(function (material) {
    disposeMaterial(material);
  });
}

function disposeMaterial(material) {
  if (!(material instanceof Three.Material)) return;

  disposeTexture(material.map);
  material.map = null;
  material.dispose();
}

function disposeMesh(mesh) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper || mesh instanceof Three.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);

  mesh.geometry = null;
  mesh.material = null;
}

function disposeScene(scene3D) {
  scene3D.traverse(function (child) {
    disposeMesh(child);
    child = null;
  });
}

function disposeObject(object) {
  object.traverse(function (child) {
    disposeMesh(child);
    child = null;
  });
}