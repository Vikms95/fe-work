'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dispatch3DZoomIn = exports.dispatch3DZoomIn = function dispatch3DZoomIn(canvas) {
  var evt = new Event('wheel', { bubbles: true, cancelable: true });
  evt.deltaY = -240;
  canvas.dispatchEvent(evt);
};
var dispatch3DZoomOut = exports.dispatch3DZoomOut = function dispatch3DZoomOut(canvas) {
  var evt = new Event('wheel', { bubbles: true, cancelable: true });
  evt.deltaY = +240;
  canvas.dispatchEvent(evt);
};
var dispatch3DMoveLeft = exports.dispatch3DMoveLeft = function dispatch3DMoveLeft() {
  var evtDown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'ArrowLeft', keyCode: 37 });
  var evtUp = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'ArrowLeft', keyCode: 37 });
  document.dispatchEvent(evtDown);
  document.dispatchEvent(evtUp);
};
var dispatch3DMoveRight = exports.dispatch3DMoveRight = function dispatch3DMoveRight() {
  var evtDown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'ArrowRight', keyCode: 39 });
  var evtUp = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'ArrowRight', keyCode: 39 });
  document.dispatchEvent(evtDown);
  document.dispatchEvent(evtUp);
};
var dispatch3DMoveUp = exports.dispatch3DMoveUp = function dispatch3DMoveUp() {
  var evtDown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'ArrowUp', keyCode: 38 });
  var evtUp = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'ArrowUp', keyCode: 38 });
  document.dispatchEvent(evtDown);
  document.dispatchEvent(evtUp);
};
var dispatch3DMoveDown = exports.dispatch3DMoveDown = function dispatch3DMoveDown() {
  var evtDown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'ArrowDown', keyCode: 40 });
  var evtUp = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'ArrowDown', keyCode: 40 });
  console.log(evtDown);
  document.dispatchEvent(evtDown);
  document.dispatchEvent(evtUp);
};

var dispatch2DZoomIn = exports.dispatch2DZoomIn = function dispatch2DZoomIn(grid) {
  var evt = new Event('wheel', { bubbles: true, cancelable: true });
  evt.deltaY = -240;
  //evt.pageX = window.pageXOffset / 2;
  //evt.pageX = window.pageYOffset / 2;
  window.dispatchEvent(evt);
};

var dispatch2DZoomOut = exports.dispatch2DZoomOut = function dispatch2DZoomOut(grid) {
  var evt = new Event('wheel', { bubbles: true, cancelable: true });
  evt.deltaY = -240;
  window.dispatchEvent(evt);
};