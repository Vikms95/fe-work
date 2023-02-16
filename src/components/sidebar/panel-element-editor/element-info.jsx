import React from 'react';
import * as SharedStyle from '../../../shared-style';
import areaIco from './area.png';

const STYLE_ELEMENT_INFO = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  marginBottom: '45px'
};

const STYLE_NAME = {
  margin: '0',
  padding: '10px 0',
  fontSize: '0.8em',
  textAlign: 'center',
  color: SharedStyle.PRIMARY_COLOR.master,
};

const STYLE_DESCRIPTION = {
  margin: '0',
  fontSize: '0.7em',
  textAlign: 'center'
};

export function ElementInfo ( { element } ) {
  console.log( element );
  return (
    <div style={ STYLE_ELEMENT_INFO }>
      <img
        src={ element.image }
        style={ { height: '80px' } }
      />

      <p style={ STYLE_NAME }>
        { element.name }
      </p>

      <p style={ STYLE_DESCRIPTION }>
        { element.description }
      </p>
    </div>
  );
}
