'use strict';

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
import { HalfFloatType, MeshBasicMaterial, MeshStandardMaterial, PointLight, SpotLight, Vector3 } from 'three';
import { cubeCamera } from '../../../demo/src/catalog/utils/load-obj';
import {
  PathTracingSceneGenerator,
  PathTracingRenderer,
  PhysicalPathTracingMaterial,
} from 'three-gpu-pathtracer';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

const AMBIENT_LIGHT_INTENSITY = 1;
const SPOT_LIGHT_INTENSITY = 0.25;
const DIRECTIONAL_LIGHT_INTENSITY = 0.5;
const REFLECTOR_RESOLUTION = 2048;
const SHADOW_RESOLUTION = 2048;
let cacheCameraPosition = null;

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
    this.delaySamples = 0;
    this.tilesX = 2;
    this.tilesY = 2;

    this.update3DZoom = this.update3DZoom.bind( this );
    this.enableLightShadow = this.enableLightShadow.bind( this );
    this.enableRendererShadows = this.enableRendererShadows.bind( this );
    this.enableMeshCastAndReceiveShadow = this.enableMeshCastAndReceiveShadow.bind( this );
    this.configureRendererPBR = this.configureRendererPBR.bind( this );
    this.createAndAddCamera = this.createAndAddCamera.bind( this );
    this.addLightOnTop = this.addLightOnTop.bind( this );
    this.setupPathTracing = this.setupPathTracing.bind( this );
    this.updateSceneElements = this.updateSceneElements.bind( this );
    this.renderWithThree = this.renderWithThree.bind( this );
    this.renderWithPathTracing = this.renderWithPathTracing.bind( this );
    this.removeGridFromRender = this.removeGridFromScene.bind( this );
    this.addGridToScene = this.addGridToScene.bind( this );
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
      // light.shadow.bias = 0.0001;
    }
    if ( light.isPointLight ) {
      // light.shadow.bias = 0.0001;
    }

    if ( light.isDirectionalLight ) {
      // light.shadow.bias = 0.0001;
    }

    if ( !light.isSpotLight ) {
      light.shadow.radius = 10;
      light.shadow.camera.fov = 90;

      light.shadow.camera.top = 500;
      light.shadow.camera.bottom = -500;
      light.shadow.camera.left = -500;
      light.shadow.camera.right = 500;
      // light.shadow.camera.near = 0.5;
      // light.shadow.camera.far = 450;
    }

    light.shadow.mapSize.width = SHADOW_RESOLUTION;
    light.shadow.mapSize.height = SHADOW_RESOLUTION;

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
    const aspectRatio = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 300000 );

    if ( cacheCameraPosition instanceof Vector3 ) {
      const { x, y, z } = cacheCameraPosition;
      this.camera.position.set( x, y, z );

    } else {

      const initialPositionX = - ( planData.boundingBox.max.x - planData.boundingBox.min.x ) / 150;
      const initialPositionY = ( planData.boundingBox.max.y - planData.boundingBox.min.y ) * 10;
      const initialPositionZ = ( planData.boundingBox.max.z - planData.boundingBox.min.z ) / 11;

      this.camera.position.set( initialPositionX, initialPositionY, initialPositionZ );
      this.camera.up = new THREE.Vector3( 0, 1, 0 );

    }

    scene.add( this.camera );
  }

  configureRendererPBR ( renderer ) {

    renderer.setClearColor( new THREE.Color( SharedStyle.COLORS.white ) );
    renderer.setSize( this.width, this.height );
    renderer.physicallyCorrectLights = false;
    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
    // renderer.encoding = THREE.sRGBEncoding;

  }

  addLightOnTop ( light, scene ) {
    light.position.y += 250;
    light.position.x -= 5;

    //todo showcase purposes
    if ( light.isPointLight ) {
      light.position.y -= 150;
      light.position.z += 150;
      light.position.x -= 125;
      light.decay = 1.5;
    }
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
    this.ptRenderer.alpha = true;
    this.ptMaterial.backgroundAlpha = 0.0;

    this.ptRenderer.setSize( window.innerWidth, window.innerHeight );
    this.ptRenderer.camera = this.camera;
    this.ptRenderer.material = this.ptMaterial;
    this.ptRenderer.tiles.set( this.tilesX, this.tilesY );

    this.fsQuad = new FullScreenQuad( new MeshBasicMaterial( {
      map: this.ptRenderer.target.texture,
      blending: THREE.CustomBlending,
    } ) );

    this.scene3D.updateMatrixWorld();

    new RGBELoader()
      .setDataType( HalfFloatType )
      .loadAsync(
        'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/hdri/photo_studio_01_2k.hdr'

      ).then( ( texture ) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.ptRenderer.material.envMapInfo.updateFrom( texture );
      }
      ).then( () => {

        this.generator = new PathTracingSceneGenerator();
        const { bvh, textures, materials, lights } = this.generator.generate( this.scene3D );
        const geometry = bvh.geometry;

        this.ptMaterial.bvh.updateFrom( bvh );

        this.ptMaterial.attributesArray.updateFrom(
          geometry.attributes.normal,
          geometry.attributes.tangent,
          geometry.attributes.uv,
          geometry.attributes.color,
        );

        this.ptMaterial.materialIndexAttribute.updateFrom( geometry.attributes.materialIndex );
        this.ptMaterial.textures.setTextures( this.renderer, 2048, 2048, textures );
        this.ptMaterial.materials.updateFrom( materials, textures );

        this.ptMaterial.lights.updateFrom( lights );

        window.addEventListener( "resize", this.onResize );

        this.onResize();
      } );
  };

  onResize () {
    let resolutionScale = Math.max( 1 / window.devicePixelRatio, 0.5 );

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = resolutionScale;
    const dpr = window.devicePixelRatio;

    this.ptRenderer.setSize( w * scale * dpr, h * scale * dpr );
    this.ptRenderer.reset();

    this.renderer.setSize( w, h );
    this.renderer.setPixelRatio( window.devicePixelRatio * scale );

    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  updateSceneElements ( orbitController, planData ) {

    orbitController.update();
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld();

    for ( let elemID in planData.sceneGraph.LODs ) {
      planData.sceneGraph.LODs[ elemID ].update( this.camera );
    }

  }

  addGridToScene () {
    if ( this.scene3D === null || this.scene3D === undefined ) return;
    let isGrid = false;

    this.scene3D.traverse( child => {
      if ( child.name === 'grid' ) {
        isGrid = true;
      }
    } );

    if ( !isGrid )
      this.scene3D.add( this.planData.grid );
  }

  renderWithThree () {
    this.renderer.toneMapping = THREE.NoToneMapping;
    // this.addGridToScene();
    cubeCamera.update( this.renderer, this.scene3D );
    return this.renderer.render( this.scene3D, this.camera );

  }

  removeGridFromScene () {
    if ( this.scene3D === null || this.scene3D === undefined ) return;

    this.scene3D.traverse( child => {
      if ( child.name === 'grid' ) {
        child.removeFromParent();
      }
    } );

  }

  renderWithPathTracing () {

    if ( this.ptRenderer === null || this.ptMaterial === null ) {
      this.setupPathTracing();
      // this.removeGridFromScene();
    }
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    if ( this.props.isPathTracing ) this.ptRenderer.update();

    if ( this.ptRenderer.samples < 1 ) {
      this.renderer.render( this.scene3D, this.camera );
    }

    this.renderer.autoClear = false;
    this.fsQuad.material.map = this.ptRenderer.target.texture;
    this.fsQuad.render( this.renderer );
    this.renderer.autoClear = true;
  }

  componentDidMount () {
    let { state } = this.props;

    let actions = {
      areaActions: this.context.areaActions,
      holesActions: this.context.holesActions,
      itemsActions: this.context.itemsActions,
      linesActions: this.context.linesActions,
      projectActions: this.context.projectActions
    };

    this.scene3D = new THREE.Scene();
    let canvasWrapper = ReactDOM.findDOMNode( this.refs.canvasWrapper );

    // const environment = new RoomEnvironment();
    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    // this.scene3D.environment = pmremGenerator.fromScene( environment ).texture;

    // new RGBELoader()
    //   .loadAsync( 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/hdri/photo_studio_01_2k.hdr' )
    //   .then( texture => {
    //     texture.mapping = THREE.EquirectangularReflectionMapping;
    //     console.log( 'texture' );
    //     this.scene3D.environment = texture;
    //     // this.scene3D.background = texture;
    //   } );


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
    this.scene3D.add( planData.grid );

    //** CREATE CAMERA */
    this.createAndAddCamera( this.scene3D, planData );

    //** ORBIT CONTROLS */
    let orbitController = new OrbitControls( this.camera, this.renderer.domElement );

    orbitController.addEventListener( "change", () => {
      if ( this.ptRenderer && this.props.isPathTracing ) {
        this.ptRenderer.reset();
      }
    } );

    //** AMBIENT LIGHT */
    let light = new THREE.AmbientLight( 0xafafaf, AMBIENT_LIGHT_INTENSITY ); // soft white light
    this.scene3D.add( light );


    // //** ADD TEST LIGHT */
    this.addLightOnTop(
      new THREE.SpotLight( 'white', SPOT_LIGHT_INTENSITY, undefined, 180 ),
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

    //todo da problemas con el PATH TRACING
    // const reflector = new Reflector(
    //   new THREE.PlaneGeometry( 61, 80 ),
    //   {
    //     textureWidth: REFLECTOR_RESOLUTION,
    //     textureHeight: REFLECTOR_RESOLUTION,
    //     recursive: 1,
    //     multisample: 1,
    //   }
    // );

    // reflector.position.z -= 161; //161
    // reflector.position.y += 36.5;
    // reflector.position.x += 45;

    // this.scene3D.add( reflector );


    const render = () => {

      this.renderingID = requestAnimationFrame( render );
      this.updateSceneElements( orbitController, planData );

      if ( !this.props.isPathTracing )
        this.renderWithThree();

      else
        this.renderWithPathTracing();

    };

    render();

    this.orbitControls = orbitController;
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

    cacheCameraPosition = new Vector3();
    cacheCameraPosition.set(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    );

    this.scene3D = null;
    this.planData = null;
    this.camera = null;
    this.orbitControls = null;
    this.renderer.renderLists.dispose();
    this.renderer = null;
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