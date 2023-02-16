import React from 'react';

import bloquearIco from '../../../assets/sidebar/Bloquear.jpg';
import borrarIco from '../../../assets/sidebar/Borrar.jpg';
import duplicarIco from '../../../assets/sidebar/Duplicar.jpg';
import infoIco from '../../../assets/sidebar/Info.jpg';
import likeIco from '../../../assets/sidebar/Like.jpg';


const STYLE_ICONS_CONTAINER = {
  display: 'flex',
  alignSelf: 'center',
  columnGap: '12px',
  marginTop: '-22px',
  marginBottom: '25px',
  paddingLeft: '35px'
};

export function ElementEditorIcons () {
  return (
    <div style={ STYLE_ICONS_CONTAINER }>
      <img src={ borrarIco } />
      <img src={ duplicarIco } />
      <img src={ bloquearIco } />
      <img src={ infoIco } />
      <img src={ likeIco } />
    </div>
  );
}
