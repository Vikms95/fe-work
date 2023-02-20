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

const pushHeightMorphs = ( key, element, object, morphs ) => {
  if ( element.properties.has( 'height' ) && element.width && element.width.min && element.width.max )
    morphs.push( {
      mesh: object,
      idx: object.morphTargetDictionary[ key ],
      length: element.properties.get( 'height' ).get( 'length' ),
      min: element.height.min,
      max: element.height.max
    } );
};


const pushDepthMorphs = ( key, element, object, morphs ) => {
  if ( element.properties.has( 'depth' ) && element.width && element.width.min && element.width.max )
    morphs.push( {
      mesh: object,
      idx: object.morphTargetDictionary[ key ],
      length: element.properties.get( 'depth' ).get( 'length' ),
      min: element.depth.min,
      max: element.depth.max
    } );

  return morphs;
};

const pushWidthMorphs = ( key, element, object, morphs ) => {
  if ( element.properties.has( 'width' ) && element.width && element.width.min && element.width.max )
    morphs.push( {
      mesh: object,
      idx: object.morphTargetDictionary[ key ],
      length: element.properties.get( 'width' ).get( 'length' ),
      min: element.width.min,
      max: element.width.max
    } );

  let individualMorph;

  switch ( key ) {
    case 'Ancho derecha':
      individualMorph = 'widthRight'; break;
    case 'Ancho central':
      individualMorph = 'widthCenter'; break;
    case 'Ancho izquierda':
      individualMorph = 'widthLeft'; break;
    default:
      return morphs;
  }

  if ( element.properties.has( individualMorph ) && element.width && element.width.min && element.width.max )
    morphs.push( {
      mesh: object,
      idx: object.morphTargetDictionary[ key ],
      length: element.properties.get( individualMorph ).get( 'length' ),
      min: element[ individualMorph ].min,
      max: element[ individualMorph ].max
    } );

  return morphs;
};




export function getMorphObject3d ( object, element, differences ) {
  let morphs = [];

  object.traverse( obj => {
    if ( obj.isMesh && obj.morphTargetInfluences ) {
      const morphKeys = Object.keys( obj.morphTargetDictionary );

      morphKeys.forEach( key => {

        if ( key.includes( "Ancho" ) )
          morphs = pushWidthMorphs( key, element, obj, morphs );

        if ( key.includes( "Alto" ) )
          morphs = pushHeightMorphs( key, element, obj, morphs );

        if ( key.includes( "Fondo" ) )
          morphs = pushDepthMorphs( key, element, obj, morphs );

      } );
    }
  } );

  return morphs;
}

//** Para identificar caso especial en el que la encimera tiene los valores de morph invertidos */
const elementIsEncimera = ( element ) => element.type === '87978';

export function sizeParametricObject3d ( object, element, differences ) {
  let morph = getMorphObject3d( object, element, differences );
  let hasMorph = false;

  morph.forEach( m => {
    if ( m.length >= m.min && m.length <= m.max ) {
      let value;

      if ( elementIsEncimera( element ) )
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