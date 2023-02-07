var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CSG = function () {
  function CSG() {
    _classCallCheck(this, CSG);

    this.polygons = [];
  }

  _createClass(CSG, [{
    key: "clone",
    value: function clone() {
      var csg = new CSG();
      csg.polygons = this.polygons.map(function (polygon) {
        return polygon.clone();
      });
      return csg;
    }
  }, {
    key: "toPolygons",
    value: function toPolygons() {
      return this.polygons;
    }
  }, {
    key: "union",
    value: function union(csg) {
      var nodeA = new Node(this.clone().polygons);
      var nodeB = new Node(csg.clone().polygons);

      nodeA.clipTo(nodeB);
      nodeB.clipTo(nodeA);
      nodeB.invert();
      nodeB.clipTo(nodeA);
      nodeB.invert();
      nodeA.build(nodeB.allPolygons());

      return CSG.fromPolygons(nodeA.allPolygons());
    }
  }, {
    key: "subtract",
    value: function subtract(csg) {
      var a = new Node(this.clone().polygons);
      var b = new Node(csg.clone().polygons);
      a.invert();
      a.clipTo(b);
      b.clipTo(a);
      b.invert();
      b.clipTo(a);
      b.invert();
      a.build(b.allPolygons());
      a.invert();
      return CSG.fromPolygons(a.allPolygons());
    }
  }, {
    key: "intersect",
    value: function intersect(csg) {
      var nodeA = new Node(this.clone().polygons);
      var nodeB = new Node(csg.clone().polygons);

      nodeA.invert();
      nodeB.clipTo(nodeA);
      nodeB.invert();
      nodeA.clipTo(nodeB);
      nodeB.clipTo(nodeA);
      nodeA.build(nodeB.allPolygons());
      nodeA.invert();

      return CSG.fromPolygons(nodeA.allPolygons());
    }

    // Return a new CSG solid with solid and empty space switched. This solid is
    // not modified.

  }, {
    key: "inverse",
    value: function inverse() {
      var csg = this.clone();
      csg.polygons.forEach(function (polygon) {
        return polygon.flip();
      });

      return csg;
    }
  }]);

  return CSG;
}();

// Construct a CSG solid from a list of `Polygon` instances.


CSG.fromPolygons = function (polygons) {
  var csg = new CSG();
  csg.polygons = polygons;

  return csg;
};

// # class Vector

// Represents a 3D vector.
// 
// Example usage:
// 
//     new CSG.Vector(1, 2, 3);


var Vector = function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Vector, [{
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y, this.z);
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      return this;
    }
  }, {
    key: "add",
    value: function add(a) {
      this.x += a.x;
      this.y += a.y;
      this.z += a.z;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(a) {
      this.x -= a.x;
      this.y -= a.y;
      this.z -= a.z;
      return this;
    }
  }, {
    key: "times",
    value: function times(a) {
      this.x *= a;
      this.y *= a;
      this.z *= a;
      return this;
    }
  }, {
    key: "dividedBy",
    value: function dividedBy(a) {
      this.x /= a;
      this.y /= a;
      this.z /= a;
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(a, t) {
      return this.add(temporaryVector0.copy(a).sub(this).times(t));
    }
  }, {
    key: "unit",
    value: function unit() {
      return this.dividedBy(this.length());
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.unit();
    }
  }, {
    key: "cross",
    value: function cross(b) {
      var a = this;
      var ax = a.x,
          ay = a.y,
          az = a.z;
      var bx = b.x,
          by = b.y,
          bz = b.z;

      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;

      return this;
    }
  }, {
    key: "dot",
    value: function dot(b) {
      return this.x * b.x + this.y * b.y + this.z * b.z;
    }
  }]);

  return Vector;
}();

//Temporaries used to avoid internal allocation..


var temporaryVector0 = new Vector();
var temporaryVector1 = new Vector();

// # class Vertex

// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property and `clone()`,
// `flip()`, and `interpolate()` methods that behave analogous to the ones
// defined by `CSG.Vertex`. This class provides `normal` so convenience
// functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
// is not used anywhere else.

var Vertex = function () {
  function Vertex(pos, normal, uv, color) {
    _classCallCheck(this, Vertex);

    this.pos = new Vector().copy(pos);
    this.normal = new Vector().copy(normal);
    uv && (this.uv = new Vector().copy(uv)) && (this.uv.z = 0);
    color && (this.color = new Vector().copy(color));
  }

  _createClass(Vertex, [{
    key: "clone",
    value: function clone() {
      return new Vertex(this.pos, this.normal, this.uv, this.color);
    }

    // Invert all orientation-specific data (e.g. vertex normal). Called when the
    // orientation of a polygon is flipped.

  }, {
    key: "flip",
    value: function flip() {
      this.normal.negate();
    }

    // Create a new vertex between this vertex and `other` by linearly
    // interpolating all properties using a parameter of `t`. Subclasses should
    // override this to interpolate additional properties.

  }, {
    key: "interpolate",
    value: function interpolate(other, t) {
      return new Vertex(this.pos.clone().lerp(other.pos, t), this.normal.clone().lerp(other.normal, t), this.uv && other.uv && this.uv.clone().lerp(other.uv, t), this.color && other.color && this.color.clone().lerp(other.color, t));
    }
  }]);

  return Vertex;
}();

;
// # class Plane

// Represents a plane in 3D space.

var Plane = function () {
  function Plane(normal, w) {
    _classCallCheck(this, Plane);

    this.normal = normal;
    this.w = w;
  }

  _createClass(Plane, [{
    key: "clone",
    value: function clone() {
      return new Plane(this.normal.clone(), this.w);
    }
  }, {
    key: "flip",
    value: function flip() {
      this.normal.negate();
      this.w = -this.w;
    }

    // Split `polygon` by this plane if needed, then put the polygon or polygon
    // fragments in the appropriate lists. Coplanar polygons go into either
    // `coplanarFront` or `coplanarBack` depending on their orientation with
    // respect to this plane. Polygons in front or in back of this plane go into
    // either `front` or `back`.

  }, {
    key: "splitPolygon",
    value: function splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
      var COPLANAR = 0;
      var FRONT = 1;
      var BACK = 2;
      var SPANNING = 3;

      // Classify each point as well as the entire polygon into one of the above
      // four classes.
      var types = [];
      var polygonType = 0;

      for (var i = 0; i < polygon.vertices.length; i++) {
        var t = this.normal.dot(polygon.vertices[i].pos) - this.w;
        var type = t < -Plane.EPSILON ? BACK : t > Plane.EPSILON ? FRONT : COPLANAR;

        polygonType |= type;
        types.push(type);
      }

      // Put the polygon in the correct list, splitting it when necessary.
      switch (polygonType) {
        case COPLANAR:
          (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
          break;

        case FRONT:
          front.push(polygon);
          break;

        case BACK:
          back.push(polygon);
          break;

        case SPANNING:
          var f = [];
          var b = [];

          for (var _i = 0; _i < polygon.vertices.length; _i++) {
            var j = (_i + 1) % polygon.vertices.length;
            var ti = types[_i];
            var tj = types[j];
            var vi = polygon.vertices[_i];
            var vj = polygon.vertices[j];

            if (ti != BACK) {
              f.push(vi);
            }

            if (ti != FRONT) {
              b.push(ti != BACK ? vi.clone() : vi);
            }

            if ((ti | tj) == SPANNING) {
              var _t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(temporaryVector0.copy(vj.pos).sub(vi.pos));
              var v = vi.interpolate(vj, _t);

              f.push(v);
              b.push(v.clone());
            }
          }

          if (f.length >= 3) {
            front.push(new Polygon(f, polygon.shared));
          }

          if (b.length >= 3) {
            back.push(new Polygon(b, polygon.shared));
          }

          break;
      }
    }
  }]);

  return Plane;
}();

// `Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
// point is on the plane.


Plane.EPSILON = 1e-5;

Plane.fromPoints = function (a, b, c) {
  var n = temporaryVector0.copy(b).sub(a).cross(temporaryVector1.copy(c).sub(a)).normalize();
  return new Plane(n.clone(), n.dot(a));
};

// # class Polygon

// Represents a convex polygon. The vertices used to initialize a polygon must
// be coplanar and form a convex loop. They do not have to be `Vertex`
// instances but they must behave similarly (duck typing can be used for
// customization).
// 
// Each convex polygon has a `shared` property, which is shared between all
// polygons that are clones of each other or were split from the same polygon.
// This can be used to define per-polygon properties (such as surface color).

var Polygon = function () {
  function Polygon(vertices, shared) {
    _classCallCheck(this, Polygon);

    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
  }

  _createClass(Polygon, [{
    key: "clone",
    value: function clone() {
      return new Polygon(this.vertices.map(function (v) {
        return v.clone();
      }), this.shared);
    }
  }, {
    key: "flip",
    value: function flip() {
      this.vertices.reverse().forEach(function (v) {
        return v.flip();
      });
      this.plane.flip();
    }
  }]);

  return Polygon;
}();

// # class Node

// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
// by picking a polygon to split along. That polygon (and all other coplanar
// polygons) are added directly to that node and the other polygons are added to
// the front and/or back subtrees. This is not a leafy BSP tree since there is
// no distinction between internal and leaf nodes.

var Node = function () {
  function Node(polygons) {
    _classCallCheck(this, Node);

    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygons = [];
    if (polygons) this.build(polygons);
  }

  _createClass(Node, [{
    key: "clone",
    value: function clone() {
      var node = new Node();
      node.plane = this.plane && this.plane.clone();
      node.front = this.front && this.front.clone();
      node.back = this.back && this.back.clone();
      node.polygons = this.polygons.map(function (p) {
        return p.clone();
      });
      return node;
    }

    // Convert solid space to empty space and empty space to solid space.

  }, {
    key: "invert",
    value: function invert() {
      for (var i = 0; i < this.polygons.length; i++) {
        this.polygons[i].flip();
      }this.plane && this.plane.flip();
      this.front && this.front.invert();
      this.back && this.back.invert();
      var temp = this.front;
      this.front = this.back;
      this.back = temp;
    }

    // Recursively remove all polygons in `polygons` that are inside this BSP
    // tree.

  }, {
    key: "clipPolygons",
    value: function clipPolygons(polygons) {
      if (!this.plane) return polygons.slice();
      var front = [],
          back = [];
      for (var i = 0; i < polygons.length; i++) {
        this.plane.splitPolygon(polygons[i], front, back, front, back);
      }
      if (this.front) front = this.front.clipPolygons(front);
      if (this.back) back = this.back.clipPolygons(back);else back = [];
      //return front;
      return front.concat(back);
    }

    // Remove all polygons in this BSP tree that are inside the other BSP tree
    // `bsp`.

  }, {
    key: "clipTo",
    value: function clipTo(bsp) {
      this.polygons = bsp.clipPolygons(this.polygons);
      if (this.front) this.front.clipTo(bsp);
      if (this.back) this.back.clipTo(bsp);
    }

    // Return a list of all polygons in this BSP tree.

  }, {
    key: "allPolygons",
    value: function allPolygons() {
      var polygons = this.polygons.slice();
      if (this.front) polygons = polygons.concat(this.front.allPolygons());
      if (this.back) polygons = polygons.concat(this.back.allPolygons());
      return polygons;
    }

    // Build a BSP tree out of `polygons`. When called on an existing tree, the
    // new polygons are filtered down to the bottom of the tree and become new
    // nodes there. Each set of polygons is partitioned using the first polygon
    // (no heuristic is used to pick a good split).

  }, {
    key: "build",
    value: function build(polygons) {
      if (!polygons.length) return;
      if (!this.plane) this.plane = polygons[0].plane.clone();
      var front = [],
          back = [];
      for (var i = 0; i < polygons.length; i++) {
        this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
      }
      if (front.length) {
        if (!this.front) this.front = new Node();
        this.front.build(front);
      }
      if (back.length) {
        if (!this.back) this.back = new Node();
        this.back.build(back);
      }
    }
  }]);

  return Node;
}();

// Inflate/deserialize a vanilla struct into a CSG structure webworker.


CSG.fromJSON = function (json) {
  return CSG.fromPolygons(json.polygons.map(function (polygon) {
    new Polygon(polygon.vertices.map(function (vertex) {
      new Vertex(vertex.pos, vertex.normal, vertex.uv);
    }), polygon.shared);
  }));
};

export { CSG, Vertex, Vector, Polygon, Plane };