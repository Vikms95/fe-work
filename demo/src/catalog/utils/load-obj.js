import * as THREE from 'three';
import { Box3, Mesh, Matrix3, Matrix4, MeshPhysicalMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import MTLLoader from './mtl-loader';
// import glbAltiro from '/altiro.glb';

import { cacheLoadedObjects } from './objects3d-utils';

import blueTextureFile from '../items/_Victor-Cubo-Azul-Mate/RAL 5017.jpg';
import woodTextureFile from '../items/_Victor-Cubo-Azul-Mate/34232 Arizona Pine s.jpg';
import woodRoughnessFile from '../items/_Victor-Cubo-Azul-Mate/34232 Arizona Pine s bump.jpg';
import intenseTexture from '../items/Salgar_Pilar/textures/Intense.jpg';
import pureTexture from '../items/Salgar_Pilar/textures/Pure.jpg';
import realTexture from '../items/Salgar_Pilar/textures/Real.jpg';
import riojaTexture from './Plato_Rioja_blanco.jpg';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { LoadingManager } from 'three';
import { object } from 'prop-types';
import { Group } from 'three';

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 1024,
  {
    // generateMipmaps: true,
    // magFilter: THREE.NearestFilter,
    encoding: THREE.sRGBEncoding
  }
);
cubeRenderTarget.texture.type = THREE.HalfFloatType;
export const cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );


export function loadObjWithMaterial ( mtlFile, objFile, imgPath, mapImages, tocm, normalizeOrigin ) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setResourcePath( imgPath );

  if ( mapImages )
    mtlLoader.setMapImages( mapImages );

  let url = mtlFile;

  return new Promise( ( resolve, reject ) => {
    mtlLoader.load( url, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.load( objFile, object => {
        // if ( tocm ) {
        //   // esta en m
        //   object.scale.set( 100, 100, 100 );
        // }


        if ( normalizeOrigin ) {
          let boundingBox = new Box3().setFromObject( object );

          let center = [
            ( boundingBox.max.x - boundingBox.min.x ) / 2 + boundingBox.min.x,
            ( boundingBox.max.y - boundingBox.min.y ) / 2 + boundingBox.min.y,
            ( boundingBox.max.z - boundingBox.min.z ) / 2 + boundingBox.min.z ];

          // object.position.x -= center[ 0 ];
          object.position.y -= center[ 1 ] - ( boundingBox.max.y - boundingBox.min.y ) / 2;
          object.position.z -= center[ 2 ];
        }

        return resolve( object );
      } );
    } );
  } );
}


const addPorcelainLook = ( object, node ) => {
  switch ( node.material.name ) {
    case 'Porcelain_Glossy':
    case 'Porcelana.001':
    case 'Blanco Brillo':
    case 'Porcelana':
    case 'Sanitary_Bath-Spas_Roca_BEYOND-SURFEXR-oval-bathtub-  th-dr_1':
    case 'SolidSurface':
    case 'MineralMarmo':
      const newMaterial = new MeshPhysicalMaterial( {
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.1,
        roughness: 0.4,
        metalness: 0,
        // clearcoat: 1,
      } );
      node.material = newMaterial;
  }

};

const applyPropToAllMesh = ( object ) => {
  object.traverse( child => {
    if ( child instanceof THREE.Mesh ) {
      // child.material.wireframe = true;
    }
  } );
};

const enableMeshCastAndReceiveShadow = ( object ) => {
  object.traverse( child => {
    if ( child instanceof THREE.Mesh ) {
      if ( child.material.name !== 'Cristal Mampara' || child.material.name === 'Cristal' ) {
        child.material.side = THREE.FrontSide;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }
  } );
};


const addGlassLook = ( object, node ) => {
  if ( node.material.name === 'Cristal Mampara' || node.material.name === 'Cristal' ) {
    console.log( "hi" );
    const newMaterial = new MeshStandardMaterial( {
      roughness: 0.25,
      metalness: 0,
      opacity: 0.1,
      depthWrite: false

    } );

    node.material = newMaterial;
  }

};

const addEmissive = ( object, node ) => {
  const newMaterial = new MeshStandardMaterial( {
    emissiveIntensity: 40
  } );

  node.material = newMaterial;
};


const addChromeLook = ( object, node ) => {
  switch ( node.material.name ) {
    case 'Cromado':
    case 'grifo2.001':
    case 'Cromado.001':
    case 'Sanitary_Bath-Spas_Roca_BEYOND-SURFEXR-oval-bathtub-with-dr_2': {
      const newMaterial = new MeshStandardMaterial( {
        envMap: cubeRenderTarget.texture,
        roughness: 0.18,
        metalness: 1,

      } );
      node.material = newMaterial;
      break;
    }
    case 'Perfil': {
      const newMaterial = new MeshStandardMaterial( {
        envMap: cubeRenderTarget.texture,
        roughness: 0.13,
        metalness: 1,

      } );
      node.material = newMaterial;
      break;
    }


  }

};

const addMirrorLook = ( object, node ) => {

  //todo en render habitual usar clase Reflector
  //todo en render con path tracing, usar clase CubeRender
  if ( node.material.name === 'Espejo' ) {
    const newMaterial = new MeshStandardMaterial( {
      envMap: cubeRenderTarget.texture,
      roughness: 0.05,
      metalness: 1,
    } );

    // const newMaterial = new MeshPhysicalMaterial( {
    //   roughness: 0,
    //   metalness: 1,
    //   transmission: 1,
    //   thickness: -1,
    //   reflectivity:

    // } );


    node.material = newMaterial;
  }

};

const addMateLook = ( object, node ) => {
  if ( object.name === 'Mate' ) {
    object.traverse( child => {
      if ( child instanceof THREE.Mesh ) {
        child.material.roughness = mateValues.roughness;
        child.material.metalness = mateValues.metalness;
      }
    } );
  }
};

const addBrightLook = ( object, node ) => {
  if ( object.name === 'Brillo' ) {
    object.traverse( child => {
      if ( child instanceof THREE.Mesh ) {
        child.material.roughness = brilloValues.roughness;
        child.material.metalness = brilloValues.metalness;
      }
    } );
  }
};

const addHighBrightnessLook = ( object, node ) => {
  if ( object.name === 'BrilloAlto' ) {
    object.traverse( child => {
      if ( child instanceof THREE.Mesh ) {
        child.material.roughness = brilloAltoValues.roughness;
        child.material.metalness = brilloAltoValues.metalness;
      }
    } );
  }
};

const addRoughnessLook = ( object ) => {
  if ( object.name === 'Scene_Cube_Wood_Rough_Brillo' ) {
    const firstMesh = object.children[ 0 ].children[ 0 ].clone();
    const secondMesh = object.children[ 0 ].children[ 1 ].clone();

    const loader = new THREE.TextureLoader();
    const colorTexture = loader.load( woodTextureFile );
    const roughnessTexture = loader.load( woodRoughnessFile );

    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.minFilter = THREE.NearestFilter;
    roughnessTexture.wrapS = THREE.RepeatWrapping;
    roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.minFilter = THREE.NearestFilter;

    const oldMaterialParams1 = firstMesh.material.clone();
    const oldGeoParams1 = firstMesh.geometry.clone();
    const newMaterial1 = new MeshStandardMaterial( {
      map: colorTexture,
      roughnessMap: roughnessTexture
    }
    ).clone( oldMaterialParams1 );

    const oldMaterialParams2 = secondMesh.material.clone();
    const oldGeoParams2 = secondMesh.geometry.clone();
    const newMaterial2 = new MeshStandardMaterial( {
      map: colorTexture,
      roughnessMap: roughnessTexture,
    }
    ).clone( oldMaterialParams2 );


    object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
    object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

    object.children[ 0 ].children[ 0 ].material.roughness = brilloValues.roughness;
    object.children[ 0 ].children[ 0 ].material.metalness = brilloValues.metalness;
    object.children[ 0 ].children[ 1 ].material.roughness = brilloValues.roughness;
    object.children[ 0 ].children[ 1 ].material.metalness = brilloValues.metalness;

    // object.children[ 0 ].scale.set( 200, 200, 200 );
  }
};

const normalizeScale = ( objectToAdd, parentObject ) => {
  objectToAdd.traverse( child => {
    if ( child.isMesh )
      parentObject.getWorldScale( child.scale );

    else if ( child.isGroup )
      child.scale.set( 1, 1, 1 );
  } );

};

const addCallToGLBTest = ( parentGroup, loader ) => {
  const parentObject = parentGroup.getObjectByName( "Moment_800_2c" );
  if ( !parentObject ) return;

  const glbAltiro = require( './altiro.glb' );
  // const glbSofia = require( '/SOFIA 800.glb' );
  // const glbMoon = require( '/Espejo moon 1000.glb' );
  // const glbBañera = require( '/Bañera.glb' );
  // const glbRioja = require( '/Rioja.glb' );
  // const glbCalgary = require( '/calgary.glb' );


  const objectCallees = [
    // { glb: glbSofia, y: 54, section: '1' },
    { glb: glbAltiro, y: 55.2, section: '1' },
    // { glb: glbBañera, y: 55.2 },
    // { glb: glbRioja, y: 55.2 },
    // { glb: glbAttila, y: 74 },
    // { glb: glbMoon, y: 74, x: -10, section: '2' },
  ];

  //**Mirar si hay algún GLB del GLB destinatario que tenga la sección del GLB entrante */
  //**Si es el caso, descanlar ese GLB del GLB destinatario */
  //**Anclar el GLB entrante en el GLB destinatario con la referencia de la sección en el nombre */
  //**Ajustar posición de acuerdo con las posiciones que vendrán con GLB entrante */

  objectCallees.forEach( callee => {
    loader.load( callee.glb, ( { scene: objectToAdd } ) => {

      normalizeScale( objectToAdd, parentObject );

      objectToAdd.position.x = callee.x || objectToAdd.position.x;
      objectToAdd.position.y = callee.y || objectToAdd.position.y;
      objectToAdd.position.z = callee.z || objectToAdd.position.z;
      // objectToAdd.name += ' 1 ';

      //**replace any item inside
      parentObject.attach( objectToAdd );

      //**put the object in relation to the old one */
      // object.attach( objectToAdd );
      // childObject.removeFromParent();

    } );
  } );

};

const mateValues = {
  roughness: 0.75,
  metalness: 0
};

const brilloValues = {
  roughness: 0.50,
  metalness: 0
};

const brilloAltoValues = {
  roughness: 0.30,
  metalness: 0
};

export function loadGLTF ( input ) {

  const gltfLoader = new GLTFLoader();

  return new Promise( ( resolve, reject ) => {
    gltfLoader.load( input.gltfFile, ( gltf ) => {
      let object = gltf.scene;

      addCallToGLBTest( object, gltfLoader );

      object.traverse( node => {
        if ( node instanceof THREE.Mesh && node.material ) {
          enableMeshCastAndReceiveShadow( object );
          addGlassLook( object, node );
          addMirrorLook( object, node );
          addChromeLook( object, node );
          addPorcelainLook( object, node );
          addBrightLook( object, node );
          addHighBrightnessLook( object, node );
          addRoughnessLook( object, node );
          applyPropToAllMesh( object );

          const boundingBox = new Box3().setFromObject( object );

          console.log( input.gltfFile, { w: boundingBox.max.x - boundingBox.min.x, h: boundingBox.max.y - boundingBox.min.y, d: boundingBox.max.z - boundingBox.min.z } );

          if ( input.tocm ) {
            object.scale.set( 100, 100, 100 );
          }

          if ( input.rotation ) {
            if ( input.rotation.x )
              object.rotation.x = input.rotation.x * Math.PI / 180;
            if ( input.rotation.y )
              object.rotation.y = input.rotation.y * Math.PI / 180;
            if ( input.rotation.z )
              object.rotation.z = input.rotation.z * Math.PI / 180;
          }

          if ( input.normalizeOrigin ) {
            const boundingBox = new Box3().setFromObject( object );

            const center = [
              ( boundingBox.max.x - boundingBox.min.x ) / 2 + boundingBox.min.x,
              ( boundingBox.max.y - boundingBox.min.y ) / 2 + boundingBox.min.y,
              ( boundingBox.max.z - boundingBox.min.z ) / 2 + boundingBox.min.z ];

            object.position.x -= center[ 0 ];
            object.position.y -= center[ 1 ] - ( boundingBox.max.y - boundingBox.min.y ) / 2;
            object.position.z -= center[ 2 ];
          }

          return resolve( object );
        };

      } );
    } );
  } );
}