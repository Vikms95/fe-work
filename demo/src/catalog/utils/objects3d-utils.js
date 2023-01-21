import { BoxHelper } from 'three';

export let cacheLoadingObjects = new Map();
export let cacheLoadedObjects = new Map();
export let cacheLoadedTextures = {};

export function getObject3d ( name, loadObj ) {
  let object = cacheLoadedObjects.get( name );

  //todo this is returning when the texture is lost
  if ( object ) {
    return Promise.resolve( object.clone() );
  }

  let promise = cacheLoadingObjects.get( name );

  if ( promise == null ) {
    promise = loadObj().then( object => {
      cacheLoadedObjects.set( name, object );
      cacheLoadingObjects.delete( name );

      return object.clone();

    } );
  }
  else {
    promise = promise.then( object => object.clone() );
  }

  cacheLoadingObjects.set( name, promise );



  return promise;
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
