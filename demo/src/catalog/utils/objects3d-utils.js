import { Texture } from 'three';
import { Box3, BoxHelper } from 'three';

export let cacheLoadingObjects = new Map();
export let cacheLoadedObjects = new Map();
export let cacheLoadedTextures = {};


export function getObject3d ( name, loadObj ) {
  let object = cacheLoadedObjects.get( name );

  if ( object ) {
    setTextures( name, object );
    return Promise.resolve( object.clone() );
  }

  let promise = cacheLoadingObjects.get( name );

  if ( promise == null ) {
    promise = loadObj().then( object => {
      cacheTextures( name, object );
      return object.clone();
    } );
  } else {
    promise = promise.then( object => object.clone() );
  }

  cacheLoadingObjects.set( name, promise );

  return promise;
}

function cacheTextures ( name, object ) {
  let textures = [];

  object.traverse( child => {
    if ( child.isMesh ) {
      child.traverse( node => {
        textures.push( node.material.map );
      } );
    }
  } );

  cacheLoadedTextures[ `${ name }` ] = textures;
  cacheLoadedObjects.set( name, object );
  cacheLoadingObjects.delete( name );
}

function setTextures ( name, object ) {
  const textures = cacheLoadedTextures[ `${ name }` ];
  let index = 0;

  object.traverse( node => {
    if ( node.isMesh ) {
      node.material.map = textures[ index ];
      index++;
    }
  } );
}

export function selectedObject3d ( object, selected ) {
  object.traverse( ( child ) => {
    if ( child instanceof BoxHelper ) {
      child.visible = selected;
    }
  } );
}

export function getMorphObject3d ( object, element ) {
  let morph = [];

  object.traverse( o => {
    if ( o.isMesh && o.morphTargetInfluences ) {
      Object.keys( o.morphTargetDictionary ).forEach( key => {
        if ( key.includes( "ANCHO" ) || key.includes( 'Ancho' ) || key.includes( "width" ) || key.includes( '0' ) ) {
          if ( element.properties.has( 'width' ) && element.width && element.width.min && element.width.max )
            //
            morph.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'width' ).get( 'length' ),
              min: element.width.min,
              max: element.width.max
            } );
        }
        if ( key.includes( "ALTO" ) || key.includes( 'Alto' ) || key.includes( "height" ) || key.includes( '1' ) ) {
          if ( element.properties.has( 'height' ) && element.height && element.height.min && element.height.max )
            morph.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'height' ).get( 'length' ),
              min: element.height.min,
              max: element.height.max
            } );
        }
        if ( key.includes( "FONDO" ) || key.includes( 'Fondo' ) || key.includes( "depth" ) || key.includes( '2' ) ) {
          if ( element.properties.has( 'depth' ) && element.depth && element.depth.min && element.depth.max )
            morph.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'depth' ).get( 'length' ),
              min: element.depth.min,
              max: element.depth.max
            } );
        }
      } );
    }
  } );

  return morph;
}

export function sizeParametricObject3d ( object, element ) {
  let morph = getMorphObject3d( object, element );
  let hasMorph = false;

  morph.forEach( m => {
    if ( m.length >= m.min && m.length <= m.max ) {
      let value = ( m.length - m.min ) / ( m.max - m.min );
      m.mesh.morphTargetInfluences[ m.idx ] = value;
      hasMorph = true;
    }
  } );

  return hasMorph;
}

//Se hará con un `traverse`, pero de momento, ese método hace
//que se pierda la textura al actualizar el visor 3D
export function repeatTexturesOnMorph ( mesh ) {
  const targetMesh = mesh.children[ 0 ].children[ 0 ].children[ 0 ];
  const texture = targetMesh.material.map;
  targetMesh.castShadow = true; //default is false
  targetMesh.receiveShadow = true; //default


  if ( targetMesh && texture ) {
    const morphValues = {
      width: targetMesh.morphTargetInfluences[ 0 ],
      height: targetMesh.morphTargetInfluences[ 1 ],
    };

    texture.repeat.set(
      texture.lengthRepeatScale,
      texture.heightRepeatScale
    );

    texture.needsUpdate = true;
    mesh.children[ 0 ].children[ 0 ].children[ 0 ].material.map = texture;
  }
};
