import * as THREE from 'three';
import { Box3, BoxHelper, Loader, MeshStandardMaterial } from 'three';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './mtl-loader-new';
// import OBJLoader from './obj-loader';
// import { GLTFLoader } from './gltf-loader-new';
import blueTextureFile from '../items/Fussion_Chrome_800_2_cajones_6/RAL 5017.jpg';
import woodTextureFile from '../items/Fussion_Chrome_800_2_cajones_6/34232 Arizona Pine s.jpg';
import woodRoughnessFile from '../items/Fussion_Chrome_800_2_cajones_6/34232 Arizona Pine s bump.jpg';

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


      //Cubo
      if ( object.name === 'Scene_Cube_Blue' ) {
        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        const texture = new THREE.TextureLoader().load( blueTextureFile );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();
        const newMaterial1 = new MeshStandardMaterial( { map: texture } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();
        const newMaterial2 = new MeshStandardMaterial( { map: texture } ).clone( oldMaterialParams2 );


        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

      } else if ( object.name === 'Scene_Cube_Wood' ) {
        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        const loader = new THREE.TextureLoader();

        const colorTexture = loader.load( woodTextureFile );
        colorTexture.wrapS = THREE.RepeatWrapping;
        colorTexture.wrapT = THREE.RepeatWrapping;

        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();

        const newMaterial1 = new MeshStandardMaterial( {
          map: colorTexture,
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          map: colorTexture,
        } ).clone( oldMaterialParams2 );


        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

      } else if ( object.name === 'Scene_Cube_Wood_Roughness' ) {
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
          transparent: true,
          roughnessMap: roughnessTexture
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          map: colorTexture,
          roughnessMap: roughnessTexture,
          transparent: true,
        } ).clone( oldMaterialParams2 );


        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

      } else {
        object.traverse( node => {
          if ( node instanceof THREE.Mesh && node.material ) {
            //Mampara
            if ( node.material.name === "Cromado" ) {
              node.material.roughness = 0.3;
              node.material.metalness = 1;
            }

            if ( node.material.name === 'Cristal' ) {
              node.material.roughness = 0.25;
              node.material.metalness = 0;
              node.material.opacity = 0.05;

            }

            //Armarios
            if ( object.name === 'Scene_Mate' ) {
              node.material.roughness = 0.75;
              node.material.metalness = 0;

            } else if ( object.name === 'Scene_Brillo' ) {
              node.material.roughness = 0.5;
              node.material.metalness = 0;
              console.log( 'test', node );

            }

          }
        } );

      }
      //*apply effects to all materials


      if ( input.tocm ) {
        // esta en mm
        object.scale.set( 10, 10, 10 );
      }

      //todo solo para testear mueble armario
      const nodeName = object.children[ 0 ].name;
      if ( nodeName === "Columna" ||
        nodeName === "Mampara_HELSINKI_1000-1040" ||
        nodeName === "Cube" ) {

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
