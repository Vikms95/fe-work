import React from 'react';
import * as SharedStyle from '../../../shared-style';

const STYLE_PRICE = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  fontFamily: 'Calibri',
  fontSize: '14px',
  color: SharedStyle.PRIMARY_COLOR.master,
  fontWeight: '900',
  marginBottom: '10px'
};


export function ElementPrice ( { price } ) {

  if ( !price || price === 0 ) return;

  return <div style={ STYLE_PRICE }>{ 'Precio ' + price + '.00 €' } </div>;

}
