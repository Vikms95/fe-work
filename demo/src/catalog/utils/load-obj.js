import * as THREE from 'three';
import { Box3, BoxHelper, Loader, MeshStandardMaterial } from 'three';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './mtl-loader-new';
// import OBJLoader from './obj-loader';
// import { GLTFLoader } from './gltf-loader-new';
import blueTextureFile from '../items/_Victor-Cubo-Azul-Mate/RAL 5017.jpg';
import woodTextureFile from '../items/_Victor-Cubo-Azul-Mate/34232 Arizona Pine s.jpg';
import woodRoughnessFile from '../items/_Victor-Cubo-Azul-Mate/34232 Arizona Pine s bump.jpg';


let cubeRenderTarget;
cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256, {
  // format: THREE.RGBAFormat,
  // generateMipmaps: true,
  // magFilter: THREE.NearestFilter,
  // minFilter: THREE.LinearFilter
} );
cubeRenderTarget.texture.type = THREE.HalfFloatType;
export const cubeCamera = new THREE.CubeCamera( 1, 5000, cubeRenderTarget );




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

//todo input == glbInfo
export function loadGLTF ( input ) {
  let gltfLoader = new GLTFLoader();

  return new Promise( ( resolve, reject ) => {
    gltfLoader.load( input.gltfFile, gltf => {
      let object = gltf.scene;
      //*apply effects to all materials

      const mateValues = {
        roughness: 0.75,
        metallnes: 0
      };

      const brilloValues = {
        roughness: 0.50,
        metallnes: 0

      };

      const brilloAltoValues = {
        roughness: 0.30,
        metallnes: 0

      };

      //Cubo

      if ( object.name === 'Scene_Cube_Blue_Mate' ) {
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

        object.children[ 0 ].children[ 0 ].material.roughness = 0.75;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.75;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;

      }
      else if ( object.name === 'Scene_Cube_Blue_Brillo' ) {
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

        object.children[ 0 ].children[ 0 ].material.roughness = 0.4;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.4;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;

      }
      else if ( object.name === 'Scene_Cube_Blue_BrilloAlto' ) {
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

        object.children[ 0 ].children[ 0 ].material.roughness = 0.3;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.3;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;

      }
      else if ( object.name === "Scene_Cube_Wood_Mate" ) {
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

        object.children[ 0 ].children[ 0 ].material.roughness = 0.75;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.75;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;


      }
      else if ( object.name === "Scene_Cube_Wood_Brillo" ) {
        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        const loader = new THREE.TextureLoader();
        const colorTexture = loader.load( woodTextureFile );

        firstMesh.castShadow = true;
        firstMesh.receiveShadow = true;
        secondMesh.castShadow = true;
        secondMesh.receiveShadow = true;


        if ( firstMesh.material.map !== null ) {
          const colorTexture1 = firstMesh.material.map;
          colorTexture1.wrapT = THREE.RepeatWrapping;
          colorTexture1.wrapS = THREE.RepeatWrapping;

          const textSizes = {
            width: colorTexture1.source.data.width,
            height: colorTexture1.source.data.height,
          };


          const morphValues1 = {
            width: firstMesh.morphTargetInfluences[ 0 ],
            height: firstMesh.morphTargetInfluences[ 1 ],
          };


          colorTexture1.repeat.set(
            colorTexture.lengthRepeatScale,
            colorTexture.heightRepeatScale
          );

          colorTexture1.needsUpdate = true;
          firstMesh.material.map = colorTexture1;
        };


        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();

        const newMaterial1 = new MeshStandardMaterial( {
          map: colorTexture,
        }
        ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          map: colorTexture,
        }
        ).clone( oldMaterialParams2 );

        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

        object.children[ 0 ].children[ 0 ].material.roughness = 0.7;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.7;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;
      }
      else if ( object.name === "Scene_prueba" ) {
        // const firstMesh = object.children[ 0 ].clone();
        // const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        // const loader = new THREE.TextureLoader();
        // const colorTexture = loader.load( woodTextureFile );


        // if ( firstMesh.material.map !== null ) {
        //   const colorTexture1 = firstMesh.material.map;
        //   colorTexture1.wrapT = THREE.RepeatWrapping;
        //   colorTexture1.wrapS = THREE.RepeatWrapping;

        //   const textSizes = {
        //     width: colorTexture1.source.data.width,
        //     height: colorTexture1.source.data.height,
        //   };


        //   const morphValues1 = {
        //     width: firstMesh.morphTargetInfluences[ 0 ],
        //     height: firstMesh.morphTargetInfluences[ 1 ],
        //   };

        //   colorTexture1.repeat.set(
        //     colorTexture.lengthRepeatScale,
        //     colorTexture.heightRepeatScale
        //   );

        //   colorTexture1.needsUpdate = true;
        //   firstMesh.material.map = colorTexture1;
        // };


        // const oldMaterialParams1 = firstMesh.material.clone();
        // const oldGeoParams1 = firstMesh.geometry.clone();

        // const newMaterial1 = new MeshStandardMaterial( {
        //   map: colorTexture,
        // }
        // ).clone( oldMaterialParams1 );

        // const oldMaterialParams2 = secondMesh.material.clone();
        // const oldGeoParams2 = secondMesh.geometry.clone();

        // const newMaterial2 = new MeshStandardMaterial( {
        //   map: colorTexture,
        // }
        // ).clone( oldMaterialParams2 );

        object.children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        // object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

      }
      else if ( object.name === "Scene_Cube_Wood_BrilloAlto" ) {
        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();

        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();

        const newMaterial1 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,
        } ).clone( oldMaterialParams2 );

        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

        object.children[ 0 ].children[ 0 ].material.roughness = 0.3;
        object.children[ 0 ].children[ 0 ].material.metalness = 0;
        object.children[ 0 ].children[ 1 ].material.roughness = 0.3;
        object.children[ 0 ].children[ 1 ].material.metalness = 0;

      }
      else if ( object.name === "Scene_Cube_Wood_BrilloAlto" ) {

        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        // const loader = new THREE.TextureLoader();

        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();

        const newMaterial1 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,
          roughness: 0,
          metalness: 1
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,

        } ).clone( oldMaterialParams2 );

        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

        // object.children[ 0 ].children[ 0 ].material.roughness = 0.3;
        // object.children[ 0 ].children[ 0 ].material.metalness = 0;
        // object.children[ 0 ].children[ 1 ].material.roughness = 0.3;
        // object.children[ 0 ].children[ 1 ].material.metalness = 0;

      }
      else if ( object.name === "Scene_BAÑO" ) {

        const firstMesh = object.children[ 0 ].children[ 0 ].clone();
        const secondMesh = object.children[ 0 ].children[ 1 ].clone();
        firstMesh.castShadow = true;
        firstMesh.receiveShadow = true;
        secondMesh.castShadow = true;
        secondMesh.receiveShadow = true;

        const oldMaterialParams1 = firstMesh.material.clone();
        const oldGeoParams1 = firstMesh.geometry.clone();

        const newMaterial1 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,
          roughness: 0,
          metalness: 1
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          envMap: cubeRenderTarget.texture,
          roughness: 0,
          metalness: 1
        } ).clone( oldMaterialParams2 );


        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

        object.children[ 0 ].children[ 2 ].material.roughness = 0;
        object.children[ 0 ].children[ 2 ].material.metalness = 1;
        object.children[ 0 ].children[ 3 ].material.roughness = 0;
        object.children[ 0 ].children[ 3 ].material.metalness = 1;


      }
      else if ( object.name === "Scene_Cube_Wood_Rough_Brillo" ) {
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

        object.children[ 0 ].children[ 0 ].material.roughness = brilloValues.roughness;
        object.children[ 0 ].children[ 0 ].material.metalness = brilloValues.metallnes;
        object.children[ 0 ].children[ 1 ].material.roughness = brilloValues.roughness;
        object.children[ 0 ].children[ 1 ].material.metalness = brilloValues.metallnes;


      }
      else if ( object.name === "Scene_Cube_Wood_Rough_BrilloAlto" ) {
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
        } ).clone( oldMaterialParams1 );

        const oldMaterialParams2 = secondMesh.material.clone();
        const oldGeoParams2 = secondMesh.geometry.clone();

        const newMaterial2 = new MeshStandardMaterial( {
          map: colorTexture,
          roughnessMap: roughnessTexture,
        } ).clone( oldMaterialParams2 );


        object.children[ 0 ].children[ 0 ] = new THREE.Mesh( oldGeoParams1, newMaterial1 );
        object.children[ 0 ].children[ 1 ] = new THREE.Mesh( oldGeoParams2, newMaterial2 );

        object.children[ 0 ].children[ 0 ].material.roughness = brilloAltoValues.roughness;
        object.children[ 0 ].children[ 0 ].material.metalness = brilloAltoValues.metallnes;
        object.children[ 0 ].children[ 1 ].material.roughness = brilloAltoValues.roughness;
        object.children[ 0 ].children[ 1 ].material.metalness = brilloAltoValues.metallnes;

      }
      else {
        object.traverse( node => {
          if ( node instanceof THREE.Mesh && node.material ) {
            //Mampara
            if ( node.material.name === "Cromado" ) {
              node.material.emissive = new THREE.Color( 'gray' );
              // node.material.emissiveIntensity = ;
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
              node.material.roughness = 0;
              node.material.metalness = 0;
              node.material.clearcoat = 1;

            } else if ( object.name === 'Scene_Brillo' ) {
              // node.material.roughness = 0.5;
              // node.material.metalness = 0;
              // node.castShadow = true;
              node.receiveShadow = true;
              console.log( 'nodo armario', node );
              if ( node.material.map !== null ) {
                const colorTexture = node.material.map;
                colorTexture.wrapT = THREE.RepeatWrapping;
                colorTexture.wrapS = THREE.RepeatWrapping;

                const textSizes = {
                  width: colorTexture.source.data.width,
                  height: colorTexture.source.data.height,
                };

                const morphValues = {
                  width: node.morphTargetInfluences[ 0 ],
                  height: node.morphTargetInfluences[ 1 ],
                };

                colorTexture.repeat.set(
                  ( 1 + morphValues.width ) * 1.05,
                  ( 1 + morphValues.height ) * 1.05
                );

                colorTexture.needsUpdate = true;
                node.material.map = colorTexture;
              };
            }
          }
        } );

      }


      if ( input.tocm ) {
        // esta en mm
        object.scale.set( 100, 100, 100 );
      }

      // todo solo para testear mueble armario
      // const nodeName = object.name;
      // if ( nodeName === "Scene_Atilla" ) {

      //   object.scale.set( 100, 100, 100 );
      // }

      // if ( input.scale )
      //   object.scale.set( input.scale.x, input.scale.y, input.scale.z );

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
