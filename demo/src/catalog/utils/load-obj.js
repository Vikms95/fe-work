import * as THREE from 'three';
import { Box3, BoxHelper } from 'three';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './mtl-loader-new';
// import OBJLoader from './obj-loader';
// import { GLTFLoader } from './gltf-loader-new';

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
        if ( tocm ) {
          // esta en m
          object.scale.set( 100, 100, 100 );
        }


        if ( normalizeOrigin ) {
          let boundingBox = new Box3().setFromObject( object );

          let center = [
            ( boundingBox.max.x - boundingBox.min.x ) / 2 + boundingBox.min.x,
            ( boundingBox.max.y - boundingBox.min.y ) / 2 + boundingBox.min.y,
            ( boundingBox.max.z - boundingBox.min.z ) / 2 + boundingBox.min.z ];

          object.position.x -= center[ 0 ];
          object.position.y -= center[ 1 ] - ( boundingBox.max.y - boundingBox.min.y ) / 2;
          object.position.z -= center[ 2 ];
        }

        return resolve( object );
      } );
    } );
  } );
}

//todo input == glbInfo
export function loadGLTF ( input ) {
  let gltfLoader = new GLTFLoader();

  return new Promise( ( resolve, reject ) => {
    gltfLoader.load( input.gltfFile, gltf => {
      let object = gltf.scene;

      //*apply effects to all materials
      object.traverse( node => {
        if ( node instanceof THREE.Mesh && node.material ) {
          if ( node.material.name === "Cromado" ) {
            node.material.emissive = new THREE.Color( 'grey' );
            node.material.emissiveIntensity = 0.5;
            node.material.roughness = 0;
            node.material.metalness = 1;
          }

          if ( node.material.name === 'Cristal' ) {
            node.material.roughness = 0.25;
            node.material.metalness = 0;
            node.material.opacity = 0.05;

          }
          // if ( object.name === 'Scene_Mate' ) {
          //   node.material.roughness = 0.75;
          //   node.material.metalness = 0;

          // } else if ( object.name === 'Scene_Brillo' ) {
          // let paramMaterialMap;


          // if ( node.material.map ) {
          //   paramMaterialMap = node.material.map.clone();
          //   paramMaterialMap.needsUpdate = true;

          // }

          // const paramPhysical = {
          //   clearcoat: 1.0,
          //   clearcoatMap: paramMaterialMap ? paramMaterialMap : null,
          //   clearcoatNormalMap: paramMaterialMap ? paramMaterialMap : null,
          //   clearcoatRoughness: 0.1,
          //   alphaMap: paramMaterialMap ? paramMaterialMap : null,
          // };

          // const paramGeo = node.geometry.clone();
          // const paramMaterial = node.material.clone();
          // const newMaterial = new THREE.MeshPhysicalMaterial( paramPhysical ).clone( paramMaterial );

          // if ( paramMaterialMap ) {
          //   newMaterial.map = paramMaterialMap;
          // }

          // node = new THREE.Mesh( paramGeo, newMaterial );

          // node.material.roughness = 0.25;
          // node.material.metalness = 0;

          // console.log( 'test', node.material );

          // } else if ( object.name === 'Scene_Mate_Rugoso' ) {

          // } else if ( object.name === 'Scene_Brillo_Rugoso' ) {

          // }
        };
      } );


      if ( input.tocm ) {
        // esta en mm
        object.scale.set( 10, 10, 10 );
      }

      //todo solo para testear mueble armario
      const nodeName = object.children[ 0 ].name;
      console.log( nodeName );
      if ( nodeName === "Columna" || nodeName === "Mampara_HELSINKI_1000-1040" ) {
        object.scale.set( 100, 100, 100 );
      }

      if ( input.scale )
        object.scale.set( input.scale.x, input.scale.y, input.scale.z );

      if ( input.rotation ) {
        if ( input.rotation.x )
          object.rotation.x = input.rotation.x * Math.PI / 180;
        if ( input.rotation.y )
          object.rotation.y = input.rotation.y * Math.PI / 180;
        if ( input.rotation.z )
          object.rotation.z = input.rotation.z * Math.PI / 180;
      }

      if ( input.normalizeOrigin ) {
        let boundingBox = new Box3().setFromObject( object );

        let center = [
          ( boundingBox.max.x - boundingBox.min.x ) / 2 + boundingBox.min.x,
          ( boundingBox.max.y - boundingBox.min.y ) / 2 + boundingBox.min.y,
          ( boundingBox.max.z - boundingBox.min.z ) / 2 + boundingBox.min.z ];

        object.position.x -= center[ 0 ];
        object.position.y -= center[ 1 ] - ( boundingBox.max.y - boundingBox.min.y ) / 2;
        object.position.z -= center[ 2 ];
      }

      return resolve( object );
    } );
  } );
}
