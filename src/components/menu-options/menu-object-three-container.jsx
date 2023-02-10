import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/context';
import * as SharedStyle from '../../shared-style';
import close from './../../assets/generalItems/deleteCross.png';
import MenuPropertyThree from './menu-property-three';

const STYLE_OBJECT_OPTIONS = {
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid ' + SharedStyle.PRIMARY_COLOR.master,

};

const STYLE_TITLE_BAR = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
  padding: '0.25em 1em',
  paddingRight: '0.2em'
};

const STYLE_BREADCRUMB = {
  fontSize: '0.75em',
  fontWeigth: '900'
};

const STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};


export default function MenuObjectThree ( {
  element,
  state,
  selectedPart,
  propertiesFormData,
  updateProperty,
  closeOptionsMenu,
} ) {

  const { catalog } = useContext( Context );

  // const texture = textures[element.properties.get( 'textureA' )];

  return (
    <div style={ STYLE_OBJECT_OPTIONS } >
      <div style={ { ...STYLE_TITLE_BAR, ...STYLE_BREADCRUMB } }>
        Estilo | { selectedPart }
        <img style={ STYLE_BUTTON_CLOSE } src={ close } onClick={ closeOptionsMenu } />
      </div>

      { propertiesFormData.entrySeq().map( ( [ propertyName, data ] ) => {
        if ( propertyName === selectedPart ) {
          return (
            <MenuPropertyThree
              propertyName={ propertyName }
              data={ data }
              updateProperty={ updateProperty }
            />
          );


        }
      } ) }

    </div>

  );
}

// return <Editor
//   // state={ appState }
//   configs={ configs }
//   key={ propertyName }
//   value={ currentValue }
//   sourceElement={ element }
//   internalState={ this.state }
//   propertyName={ propertyName }
//   onUpdate={ value => this.updateProperty( propertyName, value ) }
// />;