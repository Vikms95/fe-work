import React from 'react';
import * as SharedStyle from '../../shared-style';

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


export function ObjectOptionsOpciones () {
  return (
    <div style={ { ...STYLE_TITLE_BAR, ...STYLE_BREADCRUMB } }>Opciones</div>
  );
}