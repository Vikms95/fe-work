import { Box3, BoxHelper } from 'three';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './mtl-loader-new';
// import OBJLoader from './obj-loader';
// import { GLTFLoader } from './gltf-loader-new';

export function loadObjWithMaterial ( mtlFile, objFile, imgPath, mapImages, tocm, normalizeOrigin ) {
  let mtlLoader = new MTLLoader();
  console.log( "mtloader is being used" );
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

export function loadGLTF ( input ) {
  let gltfLoader = new GLTFLoader();
  console.log( "gltfloader is being used" );

  return new Promise( ( resolve, reject ) => {
    gltfLoader.load( input.gltfFile, glt => {
      let object = glt.scene;

      if ( input.tocm ) {
        // esta en mm
        object.scale.set( 10, 10, 10 );
      }
      if ( object.children[ 0 ].name === "Columna" ) {
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
