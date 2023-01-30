'use strict';

import React, { Component, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import OrbitControls from './libs/orbit-controls';
// import { OrbitControls } from './libs/orbit-controls-new';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import diff from 'immutablediff';
import * as SharedStyle from '../../shared-style';
import { dispatch3DZoomIn, dispatch3DZoomOut } from '../../utils/dispatch-event';
import { getIsElementSelected } from '../../selectors/selectors';
import { Context } from '../../context/context';
import { MeshPhysicalMaterial, MeshStandardMaterial, PlaneGeometry, PointLight, SpotLight } from 'three';
import { cubeCamera } from '../../../demo/src/catalog/utils/load-obj';
import { Reflector } from 'three/examples/jsm/objects/Reflector';


const AMBIENT_LIGHT = 3;

export default class Scene3DViewer extends React.Component {

  constructor ( props ) {
    super( props );
    let rulerSize = 15; //px
    this.lastMousePosition = {};
    this.width = props.width - rulerSize;

    this.height = props.height - rulerSize;
    this.renderingID = 0;

    window.__threeRenderer = this.renderer;

    this.renderer =
      window.__threeRenderer ||
      new THREE.WebGLRenderer( {
        antialias: true
      } );

    this.update3DZoom = this.update3DZoom.bind( this );
    this.enableLightShadow = this.enableLightShadow.bind( this );
    this.enableRendererShadows = this.enableRendererShadows.bind( this );
    this.enableMeshCastAndReceiveShadow = this.enableMeshCastAndReceiveShadow.bind( this );
    this.configureRendererPBR = this.configureRendererPBR.bind( this );
    this.createAndAddCamera = this.createAndAddCamera.bind( this );
    this.addLightOnTop = this.addLightOnTop.bind( this );
    // this.transitionLight = this.transitionLight.bind( this );
  }

  update3DZoom ( event ) {
    const canvas = document.querySelector( 'canvas' );
    const isSelected = getIsElementSelected( this.props.state );

    if ( !isSelected && canvas ) switch ( event.keyCode ) {
      case 187:
      case 107:
        dispatch3DZoomIn( canvas ); break;
      case 189:
      case 109:
        dispatch3DZoomOut( canvas ); break;
    }
  }

  enableLightShadow ( light, scene ) {
    light.castShadow = true;

    if ( light.isSpotLight ) {
      // light.shadow.bias = - 0.0005;
    }
    if ( light.isPointLight ) {
      // light.shadow.bias = 0.0001;
    }

    if ( light.isDirectionalLight ) {
      // light.shadow.bias = 0.0001;
    }

    if ( light.isDirectionalLight ) {
      light.shadow.radius = 10;
      light.shadow.camera.fov = 90;

      light.shadow.camera.top = 500;
      light.shadow.camera.bottom = -500;
      light.shadow.camera.left = -500;
      light.shadow.camera.right = 500;
      // light.shadow.camera.near = 0.5;
      // light.shadow.camera.far = 450;
    }

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    // const helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );
  };

  enableRendererShadows ( renderer ) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  };

  enableMeshCastAndReceiveShadow ( mesh ) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  };

  createAndAddCamera ( scene, planData ) {
    let aspectRatio = this.width / this.height;
    let camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );
    scene.add( camera );

    let cameraPositionX = -( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 2;
    let cameraPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) / 2 * 10;
    let cameraPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 2;

    camera.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
    camera.up = new THREE.Vector3( 0, 1, 0 );

    return { camera, cameraPositionX, cameraPositionY, cameraPositionZ };
  }

  configureRendererPBR ( renderer ) {

    renderer.setClearColor( new THREE.Color( SharedStyle.COLORS.white ) );
    renderer.setSize( this.width, this.height );
    renderer.physicallyCorrectLights = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.encoding = THREE.sRGBEncoding;

  }

  addLightOnTop ( light, scene ) {
    light.position.y += 300;
    // light.position.z += 200;
    scene.add( light );

    this.enableLightShadow( light, scene );

  }

  transitionLight ( light, ascendDirectional ) {
    if ( ascendDirectional ) {
      light.position.z += 1;
      if ( light.position.z > 500 ) {
        ascendDirectional = false;
      }

    } else if ( !ascendDirectional ) {
      light.position.z -= 1;
      if ( light.position.z < -500 ) {
        ascendDirectional = true;
      }
    }

  };

  componentDidMount () {

    let actions = {
      areaActions: this.context.areaActions,
      holesActions: this.context.holesActions,
      itemsActions: this.context.itemsActions,
      linesActions: this.context.linesActions,
      projectActions: this.context.projectActions
    };

    let { state } = this.props;

    let ascendDirectional = false;
    let data = state.scene;
    let scene3D = new THREE.Scene();
    let canvasWrapper = ReactDOM.findDOMNode( this.refs.canvasWrapper );


    // const environment = new RoomEnvironment();
    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    // scene3D.environment = pmremGenerator.fromScene( environment ).texture;


    //** MAKE RENDERER HIGH QUALITY */
    this.configureRendererPBR( this.renderer );
    this.enableRendererShadows( this.renderer );
    canvasWrapper.appendChild( this.renderer.domElement );


    //** PARSE CATALOG */
    const planData = parseData( state, data, actions, this.context.catalog );

    let toIntersect = [ planData.plan ];
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    scene3D.add( planData.plan );
    scene3D.add( planData.grid );

    //** CREATE CAMERA */
    const { camera, cameraPositionX, cameraPositionY, cameraPositionZ } =
      this.createAndAddCamera( scene3D, planData );


    //** ORBIT CONTROLS */
    let orbitController = new OrbitControls( camera, this.renderer.domElement );


    //** AMBIENT LIGHT */
    let light = new THREE.AmbientLight( 0xafafaf, 0.3 ); // soft white light
    scene3D.add( light );


    //** ADD TEST LIGHT */
    this.addLightOnTop(
      new THREE.SpotLight( 'white', 0.5 ),
      // new THREE.PointLight( 'white', 0.5 ),
      // new THREE.DirectionalLight( 'white', 0.5 ),
      scene3D
    );

    // let spotLight1 = new THREE.SpotLight( 'white', 0.5 );
    // spotLight1.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
    // scene3D.add( spotLight1 );

    // let spotLightTarget = new THREE.Object3D();

    // spotLightTarget.name = 'spotLightTarget';

    // // Sets spotlight position to the target of orbitControll
    // spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );

    // spotLight1.target = spotLightTarget;
    // scene3D.add( spotLightTarget );

    console.log( 'test', scene3D );

    //** EVENT LISTENERS */
    this.mouseDownEvent = ( event ) => {
      this.lastMousePosition.x = event.offsetX / this.width * 2 - 1;
      this.lastMousePosition.y = -event.offsetY / this.height * 2 + 1;
    };

    this.mouseUpEvent = ( event ) => {
      event.preventDefault();

      mouse.x = ( event.offsetX / this.width ) * 2 - 1;
      mouse.y = -( event.offsetY / this.height ) * 2 + 1;

      if ( Math.abs( mouse.x - this.lastMousePosition.x ) <= 0.02 && Math.abs( mouse.y - this.lastMousePosition.y ) <= 0.02 ) {

        raycaster.setFromCamera( mouse, camera );
        let intersects = raycaster.intersectObjects( toIntersect, true );

        if ( intersects.length > 0 && !( isNaN( intersects[ 0 ].distance ) ) ) {
          intersects[ 0 ].object.interact && intersects[ 0 ].object.interact();
        } else {
          this.context.projectActions.unselectAll();
        }
      }
    };

    this.renderer.domElement.addEventListener( 'mousedown', this.mouseDownEvent );
    this.renderer.domElement.addEventListener( 'mouseup', this.mouseUpEvent );
    this.renderer.domElement.style.display = 'block';
    document.addEventListener( 'keydown', this.update3DZoom );


    const reflector = new THREE.Mesh(
      new PlaneGeometry( 50, 50 ),
      {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        encoding: THREE.sRGBEncoding

      },
      new MeshPhysicalMaterial( {
        thickness: -1,
        transmission: 1,
        roughness: 0,
        metalness: 1
      } )
    );
    // scene3D.add( reflector );


    //** TEST CUBES */
    // const geo1 = new THREE.BoxGeometry( 100, 50, 50 );
    // const mat1 = new THREE.MeshStandardMaterial();
    // const mesh1 = new THREE.Mesh( geo1, mat1 );
    // scene3D.add( mesh1 );

    // const geo2 = new THREE.BoxGeometry( 100, 50, 50 );
    // const mat2 = new THREE.MeshStandardMaterial();
    // const mesh2 = new THREE.Mesh( geo2, mat2 );
    // mesh2.position.y += 200;
    // scene3D.add( mesh2 );


    //** ENABLE SHADOWS */
    // this.enableMeshCastAndReceiveShadow( mesh1 );
    // this.enableMeshCastAndReceiveShadow( mesh2 );


    let render = () => {
      // spotLight1.position.set( camera.position.x, camera.position.y, camera.position.z );
      // spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );


      //** UPDATE CAMERAS */
      orbitController.update();
      camera.updateMatrix();
      camera.updateMatrixWorld();
      cubeCamera.update( this.renderer, scene3D );


      for ( let elemID in planData.sceneGraph.LODs ) {
        planData.sceneGraph.LODs[ elemID ].update( camera );
      }

      this.renderer.render( scene3D, camera );
      this.renderingID = requestAnimationFrame( render );
    };

    render();

    this.orbitControls = orbitController;
    this.camera = camera;
    this.scene3D = scene3D;
    this.planData = planData;
  }

  componentWillUnmount () {
    document.removeEventListener( 'keydown', this.update3DZoom );
    cancelAnimationFrame( this.renderingID );

    this.orbitControls.dispose();

    this.renderer.domElement.removeEventListener( 'mousedown', this.mouseDownEvent );
    this.renderer.domElement.removeEventListener( 'mouseup', this.mouseUpEvent );

    disposeScene( this.scene3D );
    this.scene3D.remove( this.planData.plan );
    this.scene3D.remove( this.planData.grid );

    this.scene3D = null;
    this.planData = null;
    this.camera = null;
    this.orbitControls = null;
    this.renderer.renderLists.dispose();
  }

  UNSAFE_componentWillReceiveProps ( nextProps ) {
    let { width, height } = nextProps;

    let actions = {
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

    if ( nextProps.state.scene !== this.props.state.scene ) {
      let changedValues = diff( this.props.state.scene, nextProps.state.scene );
      updateScene( this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, this.context.catalog );
    }

    this.renderer.setSize( width, height );
  }

  render () {
    return React.createElement( 'div', { ref: 'canvasWrapper' } );
  }
}

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



    //** ANIMATE LIGHTS */
    // const clock = new THREE.Clock();
    // const rotateLight = ( light ) => {
    //   const elapsedTime = clock.getElapsedTime();
    //   const angle = elapsedTime;
    //   light.position.x = Math.cos( angle ) * 180;
    //   light.position.z = Math.sin( angle ) * 180;

    // };

