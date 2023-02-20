import { BoxHelper } from 'three';

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

export function getMorphObject3d ( object, element, differences ) {
  let morphs = [];

  //** Los GLB generales tienen que desenvolverse en todos los casos de Morph en una dirección */
  //** Hay que determinar el mínimo y máximo de cada uno de los morph */

  object.traverse( o => {
    if ( o.isMesh && o.morphTargetInfluences ) {
      Object.keys( o.morphTargetDictionary ).forEach( key => {

        //** Si 'differences' incluye solo el valor de ancho */
        if ( key.includes( 'ANCHO' ) || key.includes( 'Ancho' ) || key.includes( 'width' ) ) {
          if ( element.properties.has( 'width' ) && element.width && element.width.min && element.width.max )
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'width' ).get( 'length' ),
              min: element.width.min,
              max: element.width.max
            } );
          if ( differences && differences[ 1 ] === 'width' ) return morphs;
        }

        //** Si 'differences' incluye el valor de la derecha */
        // if ( differences && differences[ 1 ] === 'widthRight' )
        if ( key.includes( "Ancho derecha" ) ) {
          if ( element.properties.has( 'widthRight' ) && element.width && element.width.min && element.width.max ) {
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'width' ).get( 'length' ),
              min: element.width.min,
              max: element.width.max
            } );
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ 'Ancho derecha' ],
              length: element.properties.get( 'widthRight' ).get( 'length' ),
              min: element.widthRight.min,
              max: element.widthRight.max
            } );

            return morphs;
          }

        }

        // if ( differences && differences[ 1 ] === 'widthCenter' )
        if ( key.includes( "Ancho central" ) ) {
          if ( element.properties.has( 'widthCenter' ) && element.width && element.width.min && element.width.max ) {
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'width' ).get( 'length' ),
              min: element.width.min,
              max: element.width.max
            } );
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ 'Ancho central' ],
              length: element.properties.get( 'widthCenter' ).get( 'length' ),
              min: element.widthCenter.min,
              max: element.widthCenter.max
            } );

            return morphs;
          }
        }

        // if ( differences && differences[ 1 ] === 'widthLeft' )
        if ( key.includes( "Ancho izquierda" ) ) {
          if ( element.properties.has( 'widthLeft' ) && element.width && element.width.min && element.width.max ) {
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'width' ).get( 'length' ),
              min: element.width.min,
              max: element.width.max
            } );
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ 'Ancho izquierda' ],
              length: element.properties.get( 'widthLeft' ).get( 'length' ),
              min: element.widthLeft.min,
              max: element.widthLeft.max
            } );

            return morphs;
          }

        }

        if ( key.includes( "ALTO" ) || key.includes( 'Alto' ) || key.includes( "height" ) ) {
          if ( element.properties.has( 'height' ) && element.height && element.height.min && element.height.max )
            morphs.push( {
              mesh: o,
              idx: o.morphTargetDictionary[ key ],
              length: element.properties.get( 'height' ).get( 'length' ),
              min: element.height.min,
              max: element.height.max
            } );
        }

        if ( key.includes( "FONDO" ) || key.includes( 'Fondo' ) || key.includes( "depth" ) ) {
          if ( element.properties.has( 'depth' ) && element.depth && element.depth.min && element.depth.max )
            morphs.push( {
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

  return morphs;
}

export function sizeParametricObject3d ( object, element ) {
  let morph = getMorphObject3d( object, element );
  let hasMorph = false;


  morph.forEach( m => {
    if ( m.length >= m.min && m.length <= m.max ) {
      let value;

      if ( element.type === '87978' )
        value = 1 - ( m.length - m.min ) / ( m.max - m.min );
      else
        value = ( m.length - m.min ) / ( m.max - m.min );


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