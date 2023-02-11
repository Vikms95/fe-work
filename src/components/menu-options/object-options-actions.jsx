import React from 'react';
import * as SharedStyle from '../../shared-style';
import likeIco from '../../assets/sidebar/Like.jpg';
import duplicarIco from '../../assets/sidebar/Duplicar.jpg';
import infoIco from '../../assets/sidebar/Info.jpg';

const STYLE = {
  display: 'flex',
  borderTop: '2px solid' + SharedStyle.PRIMARY_COLOR.master,
  marginTop: 'auto',
  padding: '0.5em',
};

const STYLE_INPUT_CONTAINER = {
  display: 'flex',
  width: '75%',
};

const STYLE_INPUT = {
  width: '90%',
  height: '1.5em',
  color: SharedStyle.COLORS.grey,
  border: '1px solid' + SharedStyle.PRIMARY_COLOR.master,
  fontSize: '12px',
  fontFamily: 'Calibri',
  fontWidth: 'lighter',
};

const STYLE_ICON_CONTAINER = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  columnGap: '5px'
};

export function ObjectOptionsActions ( props ) {
  return (
    <div style={ STYLE }>
      <div style={ STYLE_INPUT_CONTAINER } >
        <input
          style={ STYLE_INPUT }
          type="text"
          placeholder='Buscar...'
        />
      </div>

      <div style={ STYLE_ICON_CONTAINER }>
        <img src={ likeIco } style={ { height: '12px' } } />
        <img src={ duplicarIco } style={ { height: '12px' } } />
        <img src={ infoIco } style={ { height: '12px' } } />
      </div>
    </div>

  );
}
