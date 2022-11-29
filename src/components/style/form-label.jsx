import React from 'react';
import * as SharedStyle from './../../shared-style';

const BASE_STYLE = {
  display: "block",
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  /*fontWeight: 'bold',*/
};

export default function FormLabel({children, style, ...rest}) {
  return <label style={{...BASE_STYLE, style}} {...rest}>{children}</label>
}
