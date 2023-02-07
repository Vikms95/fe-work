'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import OrbitControls from './libs/orbit-controls';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import diff from 'immutablediff';
import * as SharedStyle from '../../shared-style';
import { dispatch3DZoomIn, dispatch3DZoomOut } from '../../utils/dispatch-event';
import { getIsElementSelected } from '../../selectors/selectors';
import { Context } from '../../context/context';

// export default function Scene3DViewer ( props ) {
//   let camera;
//   let renderer;
//   let planData;
//   const rulerSize = 15; //px
//   let lastMousePosition = {};
//   let width = props.width - rulerSize;

//   let height = props.height - rulerSize;
//   let renderingID = 0;

//   window.__threeRenderer = renderer;

//   renderer =
//     window.__threeRenderer ||
//     new THREE.WebGLRenderer( {
//       antialias: true
//     } );

//   const context = useContext( Context );

//   const update3DZoom = ( event ) => {
//     const canvas = document.querySelector( 'canvas' );
//     const isSelected = getIsElementSelected( this.props.state );

//     if ( !isSelected && canvas ) switch ( event.keyCode ) {
//       case 187:
//       case 107:
//         dispatch3DZoomIn( canvas ); break;
//       case 189:
//       case 109:
//         dispatch3DZoomOut( canvas ); break;
//     }
//   };

//   useEffect( () => {
//     document.addEventListener( 'keydown', update3DZoom );

//     let actions = {
//       areaActions: context.areaActions,
//       holesActions: context.holesActions,
//       itemsActions: context.itemsActions,
//       linesActions: context.linesActions,
//       projectActions: context.projectActions
//     };

//     let { state } = props;

//     let data = state.scene;
//     let canvasWrapper = ReactDOM.findDOMNode( refs.canvasWrapper );
//     let scene3D = new THREE.Scene();

//     renderer.setClearColor( new THREE.Color( SharedStyle.COLORS.white ) );
//     renderer.setSize( width, height );

//     renderer.physicallyCorrectLights = true;
//     renderer.setPixelRatio( window.devicePixelRatio );

//     renderer.encoding = THREE.sRGBEncoding;
//     renderer.toneMapping = Number( THREE.LinearToneMapping );
//     renderer.toneMappingExposure = Math.pow( 2, 0 );

//     const environment = new RoomEnvironment();
//     const pmremGenerator = new THREE.PMREMGenerator( renderer );
//     scene3D.environment = pmremGenerator.fromScene( environment, 0.04 ).texture;

//     planData = parseData( state, data, actions, context.catalog );
//     scene3D.add( planData.plan );
//     scene3D.add( planData.grid );

//     const aspectRatio = width / height;
//     let camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );

//     scene3D.add( camera );

//     const cameraPositionX = -( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 2;
//     const cameraPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) / 2 * 10;
//     const cameraPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 2;

//     camera.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
//     camera.up = new THREE.Vector3( 0, 1, 0 );

//     let toIntersect = [ planData.plan ];
//     let mouse = new THREE.Vector2();
//     let raycaster = new THREE.Raycaster();

//     const mouseDownEvent = ( event ) => {
//       lastMousePosition.x = event.offsetX / width * 2 - 1;
//       lastMousePosition.y = -event.offsetY / height * 2 + 1;
//     };

//     const mouseUpEvent = ( event ) => {
//       event.preventDefault();

//       mouse.x = ( event.offsetX / width ) * 2 - 1;
//       mouse.y = -( event.offsetY / height ) * 2 + 1;

//       if ( Math.abs( mouse.x - lastMousePosition.x ) <= 0.02 && Math.abs( mouse.y - lastMousePosition.y ) <= 0.02 ) {

//         raycaster.setFromCamera( mouse, camera );
//         let intersects = raycaster.intersectObjects( toIntersect, true );

//         if ( intersects.length > 0 && !( isNaN( intersects[ 0 ].distance ) ) ) {
//           intersects[ 0 ].object.interact && intersects[ 0 ].object.interact();
//         } else {
//           context.projectActions.unselectAll();
//         }
//       }
//     };

//     renderer.domElement.addEventListener( 'mousedown', mouseDownEvent );
//     renderer.domElement.addEventListener( 'mouseup', mouseUpEvent );
//     renderer.domElement.style.display = 'block';

//     // add the output of the renderer to the html element
//     canvasWrapper.appendChild( renderer.domElement );

//     // create orbit controls
//     let orbitController = new OrbitControls( camera, renderer.domElement );

//     let spotLightTarget = new THREE.Object3D();

//     spotLightTarget.name = 'spotLightTarget';

//     // Sets spotlight position to the target of orbitControll
//     spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );

//     // spotLight1.target = spotLightTarget;
//     scene3D.add( spotLightTarget );

//     let render = () => {
//       orbitController.update();
//       // spotLight1.position.set( camera.position.x, camera.position.y, camera.position.z );
//       spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );
//       camera.updateMatrix();
//       camera.updateMatrixWorld();

//       for ( let elemID in planData.sceneGraph.LODs ) {
//         planData.sceneGraph.LODs[ elemID ].update( camera );
//       }

//       renderer.render( scene3D, camera );
//       renderingID = requestAnimationFrame( render );
//     };

//     render();

//     let orbitControls = orbitController;

//     return () => {
//       document.removeEventListener( 'keydown', update3DZoom );
//       cancelAnimationFrame( renderingID );

//       orbitControls.dispose();

//       renderer.domElement.removeEventListener( 'mousedown', mouseDownEvent );
//       renderer.domElement.removeEventListener( 'mouseup', mouseUpEvent );

//       disposeScene( scene3D );
//       scene3D.remove( planData.plan );
//       scene3D.remove( planData.grid );

//       scene3D = null;
//       planData = null;
//       camera = null;
//       orbitControls = null;
//       renderer.renderLists.dispose();
//     };
//   }, [] );

//   useEffect( () => {
//     let { width, height } = props;

//     let actions = {
//       areaActions: context.areaActions,
//       holesActions: context.holesActions,
//       itemsActions: context.itemsActions,
//       linesActions: context.linesActions,
//       projectActions: context.projectActions
//     };


//     width = width;
//     height = height;

//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();

//     if ( nextProps.state.scene !== props.state.scene ) {
//       let changedValues = diff( props.state.scene, nextProps.state.scene );
//       updateScene( planData, nextProps.state.scene, props.state.scene, changedValues.toJS(), actions, context.catalog );
//     }

//     renderer.setSize( width, height );
//   }, [ props.width, props.height ] );


//   return React.createElement( 'div', { ref: 'canvasWrapper' } );
// }

var Scene3DViewer = function (_React$Component) {
    _inherits(Scene3DViewer, _React$Component);

    function Scene3DViewer(props) {
        _classCallCheck(this, Scene3DViewer);

        var _this = _possibleConstructorReturn(this, (Scene3DViewer.__proto__ || Object.getPrototypeOf(Scene3DViewer)).call(this, props));

        var rulerSize = 15; //px
        _this.lastMousePosition = {};
        _this.width = props.width - rulerSize;

        _this.height = props.height - rulerSize;
        _this.renderingID = 0;

        window.__threeRenderer = _this.renderer;

        _this.renderer = window.__threeRenderer || new THREE.WebGLRenderer({
            antialias: true
        });

        _this.update3DZoom = _this.update3DZoom.bind(_this);
        return _this;
    }

    _createClass(Scene3DViewer, [{
        key: 'update3DZoom',
        value: function update3DZoom(event) {
            var canvas = document.querySelector('canvas');
            var isSelected = getIsElementSelected(this.props.state);

            if (!isSelected && canvas) switch (event.keyCode) {
                case 187:
                case 107:
                    dispatch3DZoomIn(canvas);break;
                case 189:
                case 109:
                    dispatch3DZoomOut(canvas);break;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            document.addEventListener('keydown', this.update3DZoom);

            var actions = {
                areaActions: this.context.areaActions,
                holesActions: this.context.holesActions,
                itemsActions: this.context.itemsActions,
                linesActions: this.context.linesActions,
                projectActions: this.context.projectActions
            };

            var state = this.props.state;


            var data = state.scene;
            var canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);
            var scene3D = new THREE.Scene();

            this.renderer.setClearColor(new THREE.Color(SharedStyle.COLORS.white));
            this.renderer.setSize(this.width, this.height);

            this.renderer.physicallyCorrectLights = true;
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.encoding = THREE.sRGBEncoding;

            this.renderer.toneMapping = Number(THREE.LinearToneMapping);
            this.renderer.toneMappingExposure = Math.pow(2, 0);

            var environment = new RoomEnvironment();
            var pmremGenerator = new THREE.PMREMGenerator(this.renderer);

            var _pmremGenerator$fromS = pmremGenerator.fromScene(environment),
                texture = _pmremGenerator$fromS.texture;

            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene3D.environment = texture;

            var planData = parseData(state, data, actions, this.context.catalog);
            scene3D.add(planData.plan);
            scene3D.add(planData.grid);

            var aspectRatio = this.width / this.height;
            var camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 300000);

            scene3D.add(camera);

            // Set position for the camera
            var cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
            var cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
            var cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

            camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
            camera.up = new THREE.Vector3(0, 1, 0);

            // HELPER AXIS
            // let axisHelper = new THREE.AxisHelper( 100 );
            // scene3D.add( axisHelper );

            // LIGHT
            var light = new THREE.AmbientLight(0xafafaf); // soft white light
            scene3D.add(light);

            // Add another light

            var spotLight1 = new THREE.SpotLight('white', 1050.0);
            spotLight1.position.copy(camera.position);
            spotLight1.decay = 1;
            scene3D.add(spotLight1);

            // const spotLightHelper = new THREE.SpotLightHelper( spotLight1 );
            // scene3D.add( spotLightHelper );

            // OBJECT PICKING
            var toIntersect = [planData.plan];
            var mouse = new THREE.Vector2();
            var raycaster = new THREE.Raycaster();

            this.mouseDownEvent = function (event) {
                _this2.lastMousePosition.x = event.offsetX / _this2.width * 2 - 1;
                _this2.lastMousePosition.y = -event.offsetY / _this2.height * 2 + 1;
            };

            this.mouseUpEvent = function (event) {
                event.preventDefault();

                mouse.x = event.offsetX / _this2.width * 2 - 1;
                mouse.y = -(event.offsetY / _this2.height) * 2 + 1;

                if (Math.abs(mouse.x - _this2.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - _this2.lastMousePosition.y) <= 0.02) {

                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(toIntersect, true);

                    if (intersects.length > 0 && !isNaN(intersects[0].distance)) {
                        intersects[0].object.interact && intersects[0].object.interact();
                    } else {
                        _this2.context.projectActions.unselectAll();
                    }
                }
            };

            this.renderer.domElement.addEventListener('mousedown', this.mouseDownEvent);
            this.renderer.domElement.addEventListener('mouseup', this.mouseUpEvent);
            this.renderer.domElement.style.display = 'block';

            // add the output of the renderer to the html element
            canvasWrapper.appendChild(this.renderer.domElement);

            // create orbit controls
            var orbitController = new OrbitControls(camera, this.renderer.domElement);
            var spotLightTarget = new THREE.Object3D();

            spotLightTarget.name = 'spotLightTarget';
            spotLightTarget.position.copy(orbitController.target);

            scene3D.add(spotLightTarget);
            spotLight1.target = spotLightTarget;

            var render = function render() {
                orbitController.update();
                spotLight1.position.copy(camera.position);
                spotLightTarget.position.copy(orbitController.target);
                camera.updateMatrix();
                camera.updateMatrixWorld();

                for (var elemID in planData.sceneGraph.LODs) {
                    planData.sceneGraph.LODs[elemID].update(camera);
                }

                _this2.renderer.render(scene3D, camera);
                _this2.renderingID = requestAnimationFrame(render);
            };

            render();

            this.orbitControls = orbitController;
            this.camera = camera;
            this.scene3D = scene3D;
            this.planData = planData;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keydown', this.update3DZoom);
            cancelAnimationFrame(this.renderingID);

            this.orbitControls.dispose();

            this.renderer.domElement.removeEventListener('mousedown', this.mouseDownEvent);
            this.renderer.domElement.removeEventListener('mouseup', this.mouseUpEvent);

            disposeScene(this.scene3D);
            this.scene3D.remove(this.planData.plan);
            this.scene3D.remove(this.planData.grid);

            this.scene3D = null;
            this.planData = null;
            this.camera = null;
            this.orbitControls = null;
            this.renderer.renderLists.dispose();
        }
    }, {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
            var width = nextProps.width,
                height = nextProps.height;


            var actions = {
                areaActions: this.context.areaActions,
                holesActions: this.context.holesActions,
                itemsActions: this.context.itemsActions,
                linesActions: this.context.linesActions,
                projectActions: this.context.projectActions
            };

            this.width = width;
            this.height = height;

            this.camera.aspect = width / height;

            this.camera.updateProjectionMatrix();

            if (nextProps.state.scene !== this.props.state.scene) {
                var changedValues = diff(this.props.state.scene, nextProps.state.scene);
                updateScene(this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, this.context.catalog);
            }

            this.renderer.setSize(width, height);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { ref: 'canvasWrapper' });
        }
    }]);

    return Scene3DViewer;
}(React.Component);

export default Scene3DViewer;


Scene3DViewer.propTypes = {
    state: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Scene3DViewer.contextType = Context;

// Scene3DViewer.contextTypes = {
//   areaActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   projectActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object
// };