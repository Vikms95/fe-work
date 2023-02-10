import React, { useState, useEffect, useRef } from 'react';
import * as SharedStyle from '../../shared-style';
import imageFurniture from './Fussion_Chrome_800_2_cajones.jpg';
import { ObjectOptionsAcabados } from './object-options-acabados';
import { ObjectOptionsOpciones } from './object-options-opciones';


const STYLE_OBJECT_OPTIONS = {
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid white',
  borderRight: 'none',
  borderColor: SharedStyle.PRIMARY_COLOR.master
};

const STYLE_TITLE_BAR = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
  padding: '0.25em 1em'
};

const STYLE_BREADCRUMB = {
  fontSize: '0.75em',
  fontWeigth: '900'
};

const STYLE_IMAGE_WRAPPER = {
  border: '1.5px solid rgb(191, 191, 191)',
  margin: '0.75em'
};

const STYLE_IMAGE = {
  minHeight: '5em',
  maxWidth: '9em',
  padding: '0 2em'
};

const STYLE_BUTTON = {
  boxSizing: 'border-box',
  background: 'white',
  borderTop: '1px solid' + SharedStyle.PRIMARY_COLOR.master,
  borderBottom: '1px solid' + SharedStyle.PRIMARY_COLOR.master,
  borderLeft: 'none',
  borderRight: 'none',
  textAlign: 'left',
  padding: '0.6em 1.2em',
  fontSize: '8px'
};

export default function MenuObjectOptions ( {
  image,
  name,
  propertiesFormData,
  selectedPart,
  setSelectedPart
} ) {

  let isFirstKey = true;

  return (
    <div style={ STYLE_OBJECT_OPTIONS }>
      <div style={ { ...STYLE_TITLE_BAR, ...STYLE_BREADCRUMB } }>Ref. { name }</div>
      <div style={ STYLE_IMAGE_WRAPPER }>
        <img style={ STYLE_IMAGE } src={ image } />
      </div>

      { propertiesFormData.entrySeq().map( ( [ propertyName, data ] ) => {
        if ( propertyName.includes( 'texture' ) ) {

          let configs = data.get( 'configs' );

          return (
            <button
              className='part-button'
              style={ {
                ...STYLE_BUTTON,
                borderTop: isFirstKey ? 'none' : '1px solid' + SharedStyle.PRIMARY_COLOR.master,
                backgroundColor: selectedPart === propertyName && 'rgb(220,220,220)',
                fontFamily: 'Calibri'
              } }
              onClick={ () => setSelectedPart( propertyName ) }
            >
              { configs.label }
              { isFirstKey = false }
            </button>
          );
        }
      } ) }

      <ObjectOptionsAcabados></ObjectOptionsAcabados>
      <ObjectOptionsOpciones></ObjectOptionsOpciones>


    </div>
  );
}