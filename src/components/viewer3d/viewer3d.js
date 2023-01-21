'use strict';

import React, { Component, useContext, useEffect, useRef } from 'react';
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
import { usePrevProps } from '../../hooks/usePrevProps';

export default function Scene3DViewer ( props ) {
  let camera;
  let renderer;
  let planData;
  let lastMousePosition = {};
  const rulerSize = 15; //px
  let width = props.width - rulerSize;

  let height = props.height - rulerSize;
  let renderingID = 0;

  window.__threeRenderer = renderer;

  renderer =
    window.__threeRenderer || new THREE.WebGLRenderer( {
      antialias: true
    } );

  const prevScene = usePrevProps( props.state.scene );
  const context = useContext( Context );
  const canvasRef = useRef( null );


  const update3DZoom = ( event ) => {
    const canvas = document.querySelector( 'canvas' );
    const isSelected = getIsElementSelected( props.state );

    if ( !isSelected && canvas ) switch ( event.keyCode ) {
      case 187:
      case 107:
        dispatch3DZoomIn( canvas ); break;
      case 189:
      case 109:
        dispatch3DZoomOut( canvas ); break;
    }
  };

  useEffect( () => {
    document.addEventListener( 'keydown', update3DZoom );

    let actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };

    let { state } = props;

    let data = state.scene;
    let scene3D = new THREE.Scene();

    renderer.setClearColor( new THREE.Color( SharedStyle.COLORS.white ) );
    renderer.setSize( width, height );

    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.encoding = THREE.sRGBEncoding;
    renderer.toneMapping = Number( THREE.LinearToneMapping );
    renderer.toneMappingExposure = Math.pow( 2, 0 );

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    scene3D.environment = pmremGenerator.fromScene( environment, 0.04 ).texture;

    planData = parseData( state, data, actions, context.catalog );
    scene3D.add( planData.plan );
    scene3D.add( planData.grid );

    const aspectRatio = width / height;
    camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );

    scene3D.add( camera );

    const cameraPositionX = -( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 2;
    const cameraPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) / 2 * 10;
    const cameraPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 2;

    camera.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
    camera.up = new THREE.Vector3( 0, 1, 0 );

    let toIntersect = [ planData.plan ];
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();

    const mouseDownEvent = ( event ) => {
      lastMousePosition.x = event.offsetX / width * 2 - 1;
      lastMousePosition.y = -event.offsetY / height * 2 + 1;
    };

    const mouseUpEvent = ( event ) => {
      event.preventDefault();

      mouse.x = ( event.offsetX / width ) * 2 - 1;
      mouse.y = -( event.offsetY / height ) * 2 + 1;

      if ( Math.abs( mouse.x - lastMousePosition.x ) <= 0.02 && Math.abs( mouse.y - lastMousePosition.y ) <= 0.02 ) {

        raycaster.setFromCamera( mouse, camera );
        let intersects = raycaster.intersectObjects( toIntersect, true );

        if ( intersects.length > 0 && !( isNaN( intersects[ 0 ].distance ) ) ) {
          intersects[ 0 ].object.interact && intersects[ 0 ].object.interact();
        } else {
          context.projectActions.unselectAll();
        }
      }
    };

    renderer.domElement.addEventListener( 'mousedown', mouseDownEvent );
    renderer.domElement.addEventListener( 'mouseup', mouseUpEvent );
    renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvasRef.current.appendChild( renderer.domElement );

    // create orbit controls
    let orbitController = new OrbitControls( camera, renderer.domElement );

    let spotLightTarget = new THREE.Object3D();

    spotLightTarget.name = 'spotLightTarget';

    // Sets spotlight position to the target of orbitControll
    spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );

    // spotLight1.target = spotLightTarget;
    scene3D.add( spotLightTarget );

    let render = () => {
      orbitController.update();
      // spotLight1.position.set( camera.position.x, camera.position.y, camera.position.z );
      spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );
      camera.updateMatrix();
      camera.updateMatrixWorld();

      for ( let elemID in planData.sceneGraph.LODs ) {
        planData.sceneGraph.LODs[ elemID ].update( camera );
      }

      renderer.render( scene3D, camera );
      renderingID = requestAnimationFrame( render );
    };

    render();

    let orbitControls = orbitController;

    return () => {
      document.removeEventListener( 'keydown', update3DZoom );
      cancelAnimationFrame( renderingID );

      orbitControls.dispose();

      renderer.domElement.removeEventListener( 'mousedown', mouseDownEvent );
      renderer.domElement.removeEventListener( 'mouseup', mouseUpEvent );

      disposeScene( scene3D );
      scene3D.remove( planData.plan );
      scene3D.remove( planData.grid );

      scene3D = null;
      planData = null;
      camera = null;
      orbitControls = null;
      renderer.renderLists.dispose();
    };
  }, [] );

  useEffect( () => {
    if ( prevScene === null ) return;
    let { width, height } = props;

    let actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };


    width = width;
    height = height;

    console.log( camera );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    console.log( 'test', prevScene );
    console.log( 'test', props.state.scene );

    let changedValues = diff( prevScene, props.state.scene );

    updateScene(
      planData,
      props.state.scene,
      prevScene,
      changedValues.toJS(),
      actions,
      context.catalog
    );

    renderer.setSize( width, height );
  }, [ prevScene ] );


  return React.createElement( 'div', { ref: canvasRef } );
}

// export default class Scene3DViewer extends React.Component {

//   constructor ( props ) {
//     super( props );
//     let rulerSize = 15; //px
//     this.lastMousePosition = {};
//     this.width = props.width - rulerSize;

//     this.height = props.height - rulerSize;
//     this.renderingID = 0;

//     window.__threeRenderer = this.renderer;

//     this.renderer =
//       window.__threeRenderer ||
//       new THREE.WebGLRenderer( {
//         antialias: true
//       } );

//     this.update3DZoom = this.update3DZoom.bind( this );
//   }

//   update3DZoom ( event ) {
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
//   }

//   componentDidMount () {
//     document.addEventListener( 'keydown', this.update3DZoom );

//     let actions = {
//       areaActions: this.context.areaActions,
//       holesActions: this.context.holesActions,
//       itemsActions: this.context.itemsActions,
//       linesActions: this.context.linesActions,
//       projectActions: this.context.projectActions
//     };

//     let { state } = this.props;

//     let data = state.scene;
//     let canvasWrapper = ReactDOM.findDOMNode( this.refs.canvasWrapper );
//     let scene3D = new THREE.Scene();

//     this.renderer.setClearColor( new THREE.Color( SharedStyle.COLORS.white ) );
//     this.renderer.setSize( this.width, this.height );

//     this.renderer.physicallyCorrectLights = true;
//     this.renderer.setPixelRatio( window.devicePixelRatio );

//     this.renderer.encoding = THREE.sRGBEncoding;
//     this.renderer.toneMapping = Number( THREE.LinearToneMapping );
//     this.renderer.toneMappingExposure = Math.pow( 2, 0 );

//     const environment = new RoomEnvironment();
//     const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
//     scene3D.environment = pmremGenerator.fromScene( environment, 0.04 ).texture;

//     const planData = parseData( state, data, actions, this.context.catalog );
//     console.log( 'plandata', planData );
//     planData.plan.position.x += 100;
//     planData.grid.position.x += 100;
//     scene3D.add( planData.plan );
//     scene3D.add( planData.grid );

//     const aspectRatio = this.width / this.height;
//     const camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );

//     scene3D.add( camera );

//     const cameraPositionX = -( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 2;
//     const cameraPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) / 2 * 10;
//     const cameraPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 2;

//     camera.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
//     camera.up = new THREE.Vector3( 0, 1, 0 );


//     // let light = new THREE.AmbientLight( 0xafafaf ); // soft white light
//     // scene3D.add( light );

//     // Add another light

//     // let spotLight1 = new THREE.DirectionalLight( 'white', 0.5 );
//     // spotLight1.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
//     // scene3D.add( spotLight1 );


//     let toIntersect = [ planData.plan ];
//     let mouse = new THREE.Vector2();
//     let raycaster = new THREE.Raycaster();

//     this.mouseDownEvent = ( event ) => {
//       this.lastMousePosition.x = event.offsetX / this.width * 2 - 1;
//       this.lastMousePosition.y = -event.offsetY / this.height * 2 + 1;
//     };

//     this.mouseUpEvent = ( event ) => {
//       event.preventDefault();

//       mouse.x = ( event.offsetX / this.width ) * 2 - 1;
//       mouse.y = -( event.offsetY / this.height ) * 2 + 1;

//       if ( Math.abs( mouse.x - this.lastMousePosition.x ) <= 0.02 && Math.abs( mouse.y - this.lastMousePosition.y ) <= 0.02 ) {

//         raycaster.setFromCamera( mouse, camera );
//         let intersects = raycaster.intersectObjects( toIntersect, true );

//         if ( intersects.length > 0 && !( isNaN( intersects[ 0 ].distance ) ) ) {
//           intersects[ 0 ].object.interact && intersects[ 0 ].object.interact();
//         } else {
//           this.context.projectActions.unselectAll();
//         }
//       }
//     };

//     this.renderer.domElement.addEventListener( 'mousedown', this.mouseDownEvent );
//     this.renderer.domElement.addEventListener( 'mouseup', this.mouseUpEvent );
//     this.renderer.domElement.style.display = 'block';

//     // add the output of the renderer to the html element
//     canvasWrapper.appendChild( this.renderer.domElement );

//     // create orbit controls
//     let orbitController = new OrbitControls( camera, this.renderer.domElement );

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

//       this.renderer.render( scene3D, camera );
//       this.renderingID = requestAnimationFrame( render );
//     };

//     render();

//     this.orbitControls = orbitController;
//     this.camera = camera;
//     this.scene3D = scene3D;
//     this.planData = planData;
//   }

//   componentWillUnmount () {
//     document.removeEventListener( 'keydown', this.update3DZoom );
//     cancelAnimationFrame( this.renderingID );

//     this.orbitControls.dispose();

//     this.renderer.domElement.removeEventListener( 'mousedown', this.mouseDownEvent );
//     this.renderer.domElement.removeEventListener( 'mouseup', this.mouseUpEvent );

//     disposeScene( this.scene3D );
//     this.scene3D.remove( this.planData.plan );
//     this.scene3D.remove( this.planData.grid );

//     this.scene3D = null;
//     this.planData = null;
//     this.camera = null;
//     this.orbitControls = null;
//     this.renderer.renderLists.dispose();
//   }

//   UNSAFE_componentWillReceiveProps ( nextProps ) {
//     let { width, height } = nextProps;

//     let actions = {
//       areaActions: this.context.areaActions,
//       holesActions: this.context.holesActions,
//       itemsActions: this.context.itemsActions,
//       linesActions: this.context.linesActions,
//       projectActions: this.context.projectActions
//     };


//     this.width = width;
//     this.height = height;

//     this.camera.aspect = width / height;

//     this.camera.updateProjectionMatrix();

//     if ( nextProps.state.scene !== this.props.state.scene ) {
//       let changedValues = diff( this.props.state.scene, nextProps.state.scene );
//       updateScene( this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, this.context.catalog );
//     }

//     this.renderer.setSize( width, height );
//   }

//   render () {
//     return React.createElement( 'div', { ref: 'canvasWrapper' } );
//   }
// }

Scene3DViewer.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

// Scene3DViewer.contextType = Context;

// Scene3DViewer.contextTypes = {
//   areaActions: PropTypes.object.isRequired,
//   holesActions: PropTypes.object.isRequired,
//   itemsActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   projectActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object
// };
