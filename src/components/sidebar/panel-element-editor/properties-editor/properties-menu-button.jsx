import React from 'react';
import * as SharedStyle from '../../../../shared-style';
import flechaIco from '../../../../assets/sidebar/Flecha.jpg';

const STYLE_MENU_BUTTON = {
  display: 'flex',
  justifyItems: 'center',
  height: '25px',
  width: '5.5em',
  cursor: 'pointer'
};

const STYLE_BUTTON_TEXT = {
  margin: '0',
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
};

const STYLE_ARROW_ICON = {
  height: '0.4em',
  marginLeft: '0.5em',
  marginTop: '5px'
};


export function PropertiesMenuButton ( { toggleOptionsMenu } ) {
  return (
    <div
      onClick={ toggleOptionsMenu }
      style={ STYLE_MENU_BUTTON }
    >

      <p style={ STYLE_BUTTON_TEXT }> Opciones </p>
      <img style={ STYLE_ARROW_ICON } src={ flechaIco } />

    </div>
  );
}