import React, { useState, useEffect, useRef } from 'react';
import MenuObjectOptions from './menu-object-options';
import MenuObjectThree from './menu-object-three-container';

const STYLE_TRANSPARENCY_WRAPPER = {

};

const STYLE_WRAPPER = {
  display: 'block',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-47%, -50%)',
  zIndex: '9999',
  backgroundColor: 'white'
};
const STYLE_OPTIONS = {
  minHeight: '35em',
  minWidth: '60em',
  display: 'grid',
  gridTemplateColumns: '1fr 3fr'
};


export default function MenuOptions ( {
  element,
  state,
  propertiesFormData,
  updateProperty,
  closeOptionsMenu,
  isOptionsMenuActive
} ) {
  if ( !isOptionsMenuActive ) return;

  const [ selectedPart, setSelectedPart ] = useState();

  useEffect( () => {
    propertiesFormData.entrySeq().reverse().forEach( ( [ propertyName, data ] ) => {
      if ( propertyName.includes( 'texture' ) )
        setSelectedPart( propertyName );
    } );
  }, [] );

  return (
    <div id='options' style={ STYLE_WRAPPER }
    >
      <div style={ STYLE_OPTIONS }>
        <MenuObjectOptions
          element={ element }
          name={ element.name }
          image={ element.image }
          propertiesFormData={ propertiesFormData }
          selectedPart={ selectedPart }
          setSelectedPart={ setSelectedPart }
        />

        <MenuObjectThree
          state={ state }
          element={ element }
          selectedPart={ selectedPart }
          propertiesFormData={ propertiesFormData }
          updateProperty={ updateProperty }
          closeOptionsMenu={ closeOptionsMenu }
        />
      </div>
    </div>

  );
};