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
import { MeshBasicMaterial, MeshStandardMaterial, PointLight, SpotLight } from 'three';
import { cubeCamera } from '../../../demo/src/catalog/utils/load-obj';
import {
  PathTracingSceneGenerator,
  PathTracingRenderer,
  PhysicalPathTracingMaterial,
  DynamicPathTracingSceneGenerator,
} from 'three-gpu-pathtracer';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
// import hdr from './royal_esplanade_2k.hdr';

export default class Scene3DViewer extends React.Component {

  constructor ( props ) {
    super( props );
    let rulerSize = 15; //px
    this.renderingID = 0;
    this.lastMousePosition = {};
    this.width = props.width - rulerSize;
    this.height = props.height - rulerSize;

    //** VARIABLES THREE */
    window.__threeRenderer = this.renderer;
    this.renderer = window.__threeRenderer || new THREE.WebGLRenderer( { antialias: true } );
    this.camera = null;
    this.scene3D = null;

    //** VARIABLES PATH TRACER */
    this.ptMaterial = null;
    this.ptRenderer = null;
    this.fsQuad = null;
    this.generator = null;


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
    light.castShadow = {
      shadows: true,
      exposure: 0.68,
      // bulbPower: 1700,
      // hemiIrradiance: 4000
    };

    if ( light.isSpotLight ) {
      console.log( 'spotlight' );
      // light.shadow.bias = 0.0001;
    }
    if ( light.isPointLight ) {
      console.log( 'pointlight' );
      // light.shadow.bias = 0.0001;
    }

    if ( light.isDirectionalLight ) {
      console.log( 'directionallight' );
      // light.shadow.bias = 0.0001;
    }

    if ( !light.isSpotLight ) {
      light.shadow.radius = 10;
      light.shadow.camera.fov = 90;

      light.shadow.camera.top = 500;
      light.shadow.camera.bottom = -500;
      light.shadow.camera.left = -500;
      light.shadow.camera.right = 500;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 450;
    }

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    // const helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );
  };

  enableRendererShadows ( renderer ) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
  };

  enableMeshCastAndReceiveShadow ( mesh ) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  };

  createAndAddCamera ( scene, planData ) {
    let aspectRatio = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );
    scene.add( this.camera );

    let cameraPositionX = -( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 2;
    let cameraPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) / 2 * 10;
    let cameraPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 2;

    this.camera.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
    this.camera.up = new THREE.Vector3( 0, 1, 0 );

    return { cameraPositionX, cameraPositionY, cameraPositionZ };
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

  setupPathTracing () {
    this.ptMaterial = new PhysicalPathTracingMaterial();
    this.ptRenderer = new PathTracingRenderer( this.renderer );
    this.ptRenderer.setSize( window.innerWidth, window.innerHeight );
    this.ptRenderer.camera = this.camera;
    this.ptRenderer.material = this.ptMaterial;

    this.fsQuad = new FullScreenQuad( new MeshBasicMaterial( {
      map: this.ptRenderer.target.texture
    } ) );

    this.scene3D.updateMatrixWorld();
    this.generator = new PathTracingSceneGenerator();
    // this.generator = new DynamicPathTracingSceneGenerator();



    const { bvh, textures, materials, lights } = this.generator.generate( this.scene3D );
    const geometry = bvh.geometry;

    this.ptMaterial.bvh.updateFrom( bvh );

    // update bvh and geometry attribute textures
    this.ptMaterial.bvh.updateFrom( bvh );
    this.ptMaterial.attributesArray.updateFrom(
      geometry.attributes.normal,
      geometry.attributes.tangent,
      geometry.attributes.uv,
      geometry.attributes.color,
    );

    // update materials and texture arrays
    this.ptMaterial.materialIndexAttribute.updateFrom( geometry.attributes.materialIndex );
    this.ptMaterial.textures.setTextures( this.renderer, 2048, 2048, textures );
    this.ptMaterial.materials.updateFrom( materials, textures );
    // update the lights
    this.ptMaterial.lights.updateFrom( lights );

  };


  renderWithPathTracing () {
    this.ptRenderer.reset();

    this.camera.updateMatrixWorld();
    this.ptRenderer.update();

    console.log( this.ptRenderer.samples );
    if ( this.ptRenderer.samples < 1 ) {

      this.renderer.render( this.scene3D, this.camera );

    }

    // if using alpha = true then the target texture will change every frame
    // so we must retrieve it before render.
    this.fsQuad.material.map = this.ptRenderer.target.texture;

    // copy the current state of the path tracer to canvas to display
    this.fsQuad.render( this.renderer );
  };


  componentDidMount () {
    console.log( 'mount' );

    let { state } = this.props;

    let actions = {
      areaActions: this.context.areaActions,
      holesActions: this.context.holesActions,
      itemsActions: this.context.itemsActions,
      linesActions: this.context.linesActions,
      projectActions: this.context.projectActions
    };

    let ascendDirectional = false;
    this.scene3D = new THREE.Scene();
    let canvasWrapper = ReactDOM.findDOMNode( this.refs.canvasWrapper );

    // const environment = new RoomEnvironment();
    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    // this.scene3D.environment = pmremGenerator.fromScene( environment ).texture;

    //** MAKE RENDERER HIGH QUALITY */
    this.configureRendererPBR( this.renderer );
    this.enableRendererShadows( this.renderer );
    canvasWrapper.appendChild( this.renderer.domElement );


    //** PARSE CATALOG */
    const data = state.scene;
    const planData = parseData( state, data, actions, this.context.catalog );

    let toIntersect = [ planData.plan ];
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    this.scene3D.add( planData.plan );
    // scene3D.add( planData.grid );
    console.log( planData.plan );

    //** CREATE CAMERA */
    this.createAndAddCamera( this.scene3D, planData );


    //** ORBIT CONTROLS */
    let orbitController = new OrbitControls( this.camera, this.renderer.domElement );


    //** AMBIENT LIGHT */
    let light = new THREE.AmbientLight( 0xafafaf, 0.3 ); // soft white light
    this.scene3D.add( light );


    //** ADD TEST LIGHT */
    this.addLightOnTop(
      new THREE.SpotLight( 'white', 0.5 ),
      // new THREE.PointLight( 'white', 0.5 ),
      // new THREE.DirectionalLight( 'white', 0.5 ),
      this.scene3D
    );

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

        raycaster.setFromCamera( mouse, this.camera );
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


    let render = () => {


      //** UPDATE CAMERAS */
      orbitController.update();
      this.camera.updateMatrix();
      this.camera.updateMatrixWorld();
      // cubeCamera.update( this.renderer, this.scene3D );

      for ( let elemID in planData.sceneGraph.LODs ) {
        planData.sceneGraph.LODs[ elemID ].update( this.camera );
      }

      if ( this.props.isPathTracing ) {
        if ( this.ptRenderer === null || this.ptMaterial === null ) {
          console.log( 'setting up' );
          this.setupPathTracing();
        }

        console.log( 'render with path tracing' );
        this.renderWithPathTracing();

      } else {

        console.log( 'normal render' );
        this.renderer.render( this.scene3D, this.camera );

      }
      this.renderingID = requestAnimationFrame( render );
    };

    render();

    this.orbitControls = orbitController;
    this.planData = planData;
  }

  componentWillUnmount () {
    console.log( 'unmount' );
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
    this.renderer = null;
  }

  UNSAFE_componentWillReceiveProps ( nextProps ) {
    console.log( 'update' );

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


        // let spotLight1 = new THREE.SpotLight( 'white', 0.5 );
    // spotLight1.position.set( cameraPositionX, cameraPositionY, cameraPositionZ );
    // scene3D.add( spotLight1 );

    // let spotLightTarget = new THREE.Object3D();

    // spotLightTarget.name = 'spotLightTarget';

    // // Sets spotlight position to the target of orbitControll
    // spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );

    // spotLight1.target = spotLightTarget;
    // scene3D.add( spotLightTarget );




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

          // spotLight1.position.set( camera.position.x, camera.position.y, camera.position.z );
      // spotLightTarget.position.set( orbitController.target.x, orbitController.target.y, orbitController.target.z );
