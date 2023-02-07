'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @description Determines the distance between two points
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} x0 Vertex 0 x
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} y0 Vertex 0 y
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} x1 Vertex 1 x
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} y1 Vertex 1 y
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @return {number}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.compareVertices = compareVertices;
exports.minVertex = minVertex;
exports.maxVertex = maxVertex;
exports.orderVertices = orderVertices;
exports.addVector = addVector;
exports.addVector3D = addVector3D;
exports.multScalarVector = multScalarVector;
exports.multScalarVector3D = multScalarVector3D;
exports.diffVector = diffVector;
exports.diffVector3D = diffVector3D;
exports.distanceVector = distanceVector;
exports.distanceVector3D = distanceVector3D;
exports.normalizeVector = normalizeVector;
exports.normalizeVector3D = normalizeVector3D;
exports.orthoVector = orthoVector;
exports.orthoNormalizeVector = orthoNormalizeVector;
exports.angleVectorAndOrigin = angleVectorAndOrigin;
exports.angleVector = angleVector;
exports.dotScalarVectors = dotScalarVectors;
exports.crossVectors = crossVectors;
exports.angleVectors = angleVectors;
exports.pointsDistance = pointsDistance;
exports.verticesDistance = verticesDistance;
exports.horizontalLine = horizontalLine;
exports.verticalLine = verticalLine;
exports.linePassingThroughTwoPoints = linePassingThroughTwoPoints;
exports.distancePointFromLine = distancePointFromLine;
exports.closestPointFromLine = closestPointFromLine;
exports.twoLinesIntersection = twoLinesIntersection;
exports.twoLineSegmentsIntersection = twoLineSegmentsIntersection;
exports.twoPointsVectosIntersection = twoPointsVectosIntersection;
exports.distancePointFromLineSegment = distancePointFromLineSegment;
exports.isPointOnLineSegment = isPointOnLineSegment;
exports.closestPointFromLineSegment = closestPointFromLineSegment;
exports.pointPositionOnLineSegment = pointPositionOnLineSegment;
exports.mapRange = mapRange;
exports.angleBetweenTwoPointsAndOrigin = angleBetweenTwoPointsAndOrigin;
exports.angleBetweenTwoPoints = angleBetweenTwoPoints;
exports.absAngleBetweenTwoPoints = absAngleBetweenTwoPoints;
exports.samePoints = samePoints;
exports.fixAngleRadNeg = fixAngleRadNeg;
exports.extendLine = extendLine;
exports.roundVertex = roundVertex;
exports.ContainsPoint = ContainsPoint;
exports.cosWithThreshold = cosWithThreshold;
exports.sinWithThreshold = sinWithThreshold;
exports.midPoint = midPoint;
exports.verticesMidPoint = verticesMidPoint;
exports.rotatePointAroundPoint = rotatePointAroundPoint;
exports.polarToCartesian = polarToCartesian;
exports.describeArc = describeArc;
exports.describeArcArray = describeArcArray;

var _math = require('./math.js');

var _constants = require('../constants');

function compareVertices(v0, v1) {
  return v0.x === v1.x ? v0.y - v1.y : v0.x - v1.x;
}

function minVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v1 : v0;
}

function maxVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v0 : v1;
}

function orderVertices(vertices) {
  return vertices.sort(compareVertices);
}

function addVector(v0, v1) {
  return { x: v1.x + v0.x, y: v1.y + v0.y };
}

function addVector3D(v0, v1) {
  return { x: v1.x + v0.x, y: v1.y + v0.y, z: v1.z + v0.z };
}

function multScalarVector(s, v) {
  return { x: v.x * s, y: v.y * s };
}

function multScalarVector3D(s, v) {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

function diffVector(v0, v1) {
  return { x: v1.x - v0.x, y: v1.y - v0.y };
}

function diffVector3D(v0, v1) {
  return { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
}

function distanceVector(v) {
  var len = Math.sqrt(v.x * v.x + v.y * v.y);

  return len;
}

function distanceVector3D(v) {
  var len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

  return len;
}

function normalizeVector(v) {
  var len = distanceVector(v);

  return { x: v.x / len, y: v.y / len };
}

function normalizeVector3D(v) {
  var len = distanceVector3D(v);

  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function orthoVector(v) {
  return { x: -v.y, y: v.x };
}

function orthoNormalizeVector(v) {
  return orthoVector(normalizeVector(v));
}

function angleVectorAndOrigin(v) {
  return -Math.atan2(v.y, v.x) * 180 / Math.PI;
}

function angleVector(v) {
  return Math.atan2(v.y, v.x);
}

function dotScalarVectors(u, v) {
  return u.x * v.x + u.y * v.y;
}

/*
             | i   j   k  |
             | ux  uy  uz |      | uy  uz |     | ux  uz |    | ux  uy  |
    u x v =  | vx  vy  vz | = i  | vy  vz | -j  | vx  vz | +k | vx  vy  | = (uyvz-uzvy)i - (uxvz-uzvx)j + (uxvy-uyvx) = (uyvz-uzvy)i + (uzvx-uxvz)j + (uxvy-uyvx)
 */

function crossVectors(u, v) {
  return { x: u.y * v.z - u.z * v.y, y: u.z * v.x - u.x * v.z, z: u.x * v.y - u.y * v.x };
}

function angleVectors(u, v) {
  var cos_value = dotScalarVectors(u, v) / (distanceVector(u) * distanceVector(v));

  return Math.acos(cos_value);
}

function pointsDistance(x0, y0, x1, y1) {
  var diff_x = x0 - x1;
  var diff_y = y0 - y1;

  return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
}

function verticesDistance(v1, v2) {
  var x0 = v1.x,
      y0 = v1.y;
  var x1 = v2.x,
      y1 = v2.y;


  return pointsDistance(x0, y0, x1, y1);
}

function horizontalLine(y) {
  return { a: 0, b: 1, c: -y };
}

function verticalLine(x) {
  return { a: 1, b: 0, c: -x };
}

function linePassingThroughTwoPoints(x1, y1, x2, y2) {
  if (x1 === x2 && y1 == y2) throw new Error('Geometry error');
  if (x1 === x2) return verticalLine(x);
  if (y1 === y2) return horizontalLine(y1);

  return {
    a: y1 - y2,
    b: x2 - x1,
    c: y2 * x1 - x2 * y1
  };
}

function distancePointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  return (0, _math.fAbs)(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  var denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: (a * -b * x + a * y - b * c) / denom
  };
}

/** @description Get point of intersection between two lines using ax+by+c line's equation
 *  @param {number} a x coefficent of first line
 *  @param {number} b y coefficent of first line
 *  @param {number} c costant of first line
 *  @param {number} j x coefficent of second line
 *  @param {number} k y coefficent of second line
 *  @param {number} l costant of second line
 *  @return {object} {x,y} point's coordinates
 */
function twoLinesIntersection(a, b, c, j, k, l) {
  var angularCoefficientsDiff = b * j - a * k;

  if (angularCoefficientsDiff === 0) return undefined; //no intersection

  var y = (a * l - c * j) / angularCoefficientsDiff;
  var x = (c * k - b * l) / angularCoefficientsDiff;
  return { x: x, y: y };
}

function twoLineSegmentsIntersection(p1, p2, p3, p4) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  var x1 = p1.x,
      y1 = p1.y;
  var x2 = p2.x,
      y2 = p2.y;
  var x3 = p3.x,
      y3 = p3.y;
  var x4 = p4.x,
      y4 = p4.y;


  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if ((0, _math.fAbs)(denom) <= _constants.EPSILON) {
    if ((0, _math.fAbs)(numA) <= _constants.EPSILON && (0, _math.fAbs)(numB) <= _constants.EPSILON) {

      var comparator = function comparator(pa, pb) {
        return pa.x === pb.x ? pa.y - pb.y : pa.x - pb.x;
      };
      var line0 = [p1, p2].sort(comparator);
      var line1 = [p3.toJS(), p4.toJS()].sort(comparator);

      var _sort = [line0, line1].sort(function (lineA, lineB) {
        return comparator(lineA[0], lineB[0]);
      }),
          _sort2 = _slicedToArray(_sort, 2),
          lineSX = _sort2[0],
          lineDX = _sort2[1];

      if (lineSX[1].x === lineDX[0].x) {
        return { type: lineDX[0].y <= lineSX[1].y ? 'colinear' : 'none' };
      } else {
        return { type: lineDX[0].x <= lineSX[1].x ? 'colinear' : 'none' };
      }
    }
    return { type: 'parallel' };
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 - _constants.EPSILON && uA <= 1 + _constants.EPSILON && uB >= 0 - _constants.EPSILON && uB <= 1 + _constants.EPSILON) {
    var point = {
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1)
    };
    return { type: 'intersecting', point: point };
  }

  return { type: 'none' };
}

function twoPointsVectosIntersection(p1, v1, p2, v2) {
  var x14 = p1.x,
      y14 = p1.y;
  var x22 = p2.x,
      y22 = p2.y;

  var m1 = v1.x == 0 ? 0 : v1.y / v1.x;
  var m2 = v2.x == 0 ? 0 : v2.y / v2.x;

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

  var _ref = stateL1.vu.x == 0 ? { a1: 1, b1: 0, c1: x14 } : m1 == 0 ? { a1: 0, b1: 1, c1: y14 } : { a1: -m1, b1: 1, c1: y14 - m1 * x14 },
      a1 = _ref.a1,
      b1 = _ref.b1,
      c1 = _ref.c1;

  var _ref2 = stateL2.vu.x == 0 ? { a2: 1, b2: 0, c2: x22 } : m2 == 0 ? { a2: 0, b2: 1, c2: y22 } : { a2: -m2, b2: 1, c2: y22 - m2 * x22 },
      a2 = _ref2.a2,
      b2 = _ref2.b2,
      c2 = _ref2.c2;

  var detM = a1 * b2 - b1 * a2;

  return detM == 0 ? null : { x: (c1 * b2 - b1 * c2) / detM, y: (a1 * c2 - c1 * a2) / detM };
}

function distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  //http://stackoverflow.com/a/6853926/1398836

  var A = xp - x1;
  var B = yp - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx = void 0,
      yy = void 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = xp - xx;
  var dy = yp - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param x1 {number} x for first vertex of the segment
 * @param y1 {number} y for first vertex of the segment
 * @param x2 {number} x for second vertex of the segment
 * @param y2 {number} y for second vertex of the segment
 * @param xp {number} x for point we want to verify
 * @param yp {number} y for point we want to verify
 * @param maxDistance {number} the epsilon value used for comparisons
 * @returns {boolean} true if the point lies on the line segment false otherwise
 */
function isPointOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var maxDistance = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _constants.EPSILON;

  return distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) <= maxDistance;
}

function closestPointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  if (x1 === x2) return { x: x1, y: yp };
  if (y1 === y2) return { x: xp, y: y1 };

  var m = (y2 - y1) / (x2 - x1);
  var q = y1 - m * x1;

  var mi = -1 / m;
  var qi = yp - mi * xp;

  var x = (qi - q) / (m - mi);
  var y = m * x + q;

  return { x: x, y: y };
}

function pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var length = pointsDistance(x1, y1, x2, y2);
  var distance = pointsDistance(x1, y1, xp, yp);

  var offset = distance / length;
  if (x1 > x2) offset = mapRange(offset, 0, 1, 1, 0);

  return offset;
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  return -Math.atan2(y1 - y2, x2 - x1) * 180 / Math.PI;
}

function angleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function absAngleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(Math.abs(y2 - y1), Math.abs(x2 - x1));
}

function samePoints(_ref3, _ref4) {
  var x1 = _ref3.x,
      y1 = _ref3.y;
  var x2 = _ref4.x,
      y2 = _ref4.y;

  return (0, _math.fAbs)(x1 - x2) <= _constants.EPSILON && (0, _math.fAbs)(y1 - y2) <= _constants.EPSILON;
}

function fixAngleRadNeg(ang) {
  while (ang < 0) {
    ang += _constants._2_PI;
  }while (ang >= _constants._2_PI) {
    ang -= _constants._2_PI;
  }return ang;
}

/** @description Extend line based on coordinates and new line length
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @param {number} x2 Vertex 2 x
 *  @param {number} y2 Vertex 2 y
 *  @param {number} newDistance New line length
 *  @return {object}
 */
function extendLine(x1, y1, x2, y2, newDistance) {
  var precision = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6;

  var rad = angleBetweenTwoPoints(x1, y1, x2, y2);

  return {
    x: (0, _math.toFixedFloat)(x1 + Math.cos(rad) * newDistance, precision),
    y: (0, _math.toFixedFloat)(y1 + Math.sin(rad) * newDistance, precision)
  };
}

function roundVertex(vertex) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

  vertex.set('x', (0, _math.toFixedFloat)(vertex.get('x'), precision));
  vertex.set('y', (0, _math.toFixedFloat)(vertex.get('y'), precision));

  return vertex;
}

//https://github.com/MartyWallace/PolyK
function ContainsPoint(polygon, pointX, pointY) {
  var n = polygon.length >> 1;

  var ax = void 0,
      lup = void 0;
  var ay = polygon[2 * n - 3] - pointY;
  var bx = polygon[2 * n - 2] - pointX;
  var by = polygon[2 * n - 1] - pointY;

  if (bx === 0 && by === 0) return false; // point on edge

  // let lup = by > ay;
  for (var ii = 0; ii < n; ii++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * ii] - pointX;
    by = polygon[2 * ii + 1] - pointY;
    if (bx === 0 && by === 0) return false; // point on edge
    if (ay === by) continue;
    lup = by > ay;
  }

  var depth = 0;
  for (var i = 0; i < n; i++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * i] - pointX;
    by = polygon[2 * i + 1] - pointY;
    if (ay < 0 && by < 0) continue; // both 'up' or both 'down'
    if (ay > 0 && by > 0) continue; // both 'up' or both 'down'
    if (ax < 0 && bx < 0) continue; // both points on the left

    if (ay === by && Math.min(ax, bx) < 0) return true;
    if (ay === by) continue;

    var lx = ax + (bx - ax) * -ay / (by - ay);
    if (lx === 0) return false; // point on edge
    if (lx > 0) depth++;
    if (ay === 0 && lup && by > ay) depth--; // hit vertex, both up
    if (ay === 0 && !lup && by < ay) depth--; // hit vertex, both down
    lup = by > ay;
  }
  return (depth & 1) === 1;
}

function cosWithThreshold(alpha, threshold) {
  var cos = Math.cos(alpha);
  return cos < threshold ? 0 : cos;
}

function sinWithThreshold(alpha, threshold) {
  var sin = Math.sin(alpha);
  return sin < threshold ? 0 : sin;
}

function midPoint(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

function verticesMidPoint(verticesArray) {
  var res = verticesArray.reduce(function (incr, vertex) {
    return { x: incr.x + vertex.x, y: incr.y + vertex.y };
  }, { x: 0, y: 0 });
  return { x: res.x / verticesArray.length, y: res.y / verticesArray.length };
}

function rotatePointAroundPoint(px, py, ox, oy, theta) {

  var thetaRad = theta * Math.PI / 180;

  var cos = Math.cos(thetaRad);
  var sin = Math.sin(thetaRad);

  var deltaX = px - ox;
  var deltaY = py - oy;

  return {
    x: cos * deltaX - sin * deltaY + ox,
    y: sin * deltaX + cos * deltaY + oy
  };
}

// Expanding on @wdebeaum's great answer, here's a method for generating an arced path:

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y, "L", x, y, "L", start.x, start.y].join(" ");

  return d;
}

function describeArcArray(x, y, radius, angles) {
  var d = [];

  if (angles.length > 1) {
    var endAngle = angles.pop();
    var start = polarToCartesian(x, y, radius, endAngle);

    d.push("M", start.x, start.y);
    while (angles.length >= 1) {
      var startAngle = angles.pop();
      var end = polarToCartesian(x, y, radius, startAngle);
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

      d.push("A", radius, radius, 0, arcSweep, 0, end.x, end.y);
      endAngle = startAngle;
    }
    d.push("L", x, y, "L", start.x, start.y);
  }

  return d.join(" ");
}