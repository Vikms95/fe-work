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

const STYLE_BUTTON = {
  boxSizing: 'border-box',
  background: 'white',
  borderTop: '1px solid' + SharedStyle.PRIMARY_COLOR.master,
  borderBottom: '1px solid' + SharedStyle.PRIMARY_COLOR.master,
  borderLeft: 'none',
  borderRight: 'none',
  textAlign: 'left',
  padding: '0.6em 1.2em',
  fontSize: '12px',
  fontFamily: 'Calibri'

};

export function ObjectOptionsOpciones ( {
  propertiesFormData
} ) {

  return (
    <React.Fragment>
      <div style={ {
        ...STYLE_TITLE_BAR, ...STYLE_BREADCRUMB
      } }>
        Opciones
      </div>

      { propertiesFormData.entrySeq().map( ( [ propertyName, data ] ) => {
        if ( propertyName.includes( 'texture' ) ) {

          let configs = data.get( 'configs' );

          return (
            <button
              key={ propertyName }
              className='part-button'
              style={ {
                ...STYLE_BUTTON,
                // borderTop: isFirstKey ? 'none' : '1px solid' + SharedStyle.PRIMARY_COLOR.master,
                // backgroundColor: selectedPart === propertyName ? 'rgb(220,220,220)' : 'white',
              } }
            >
              { configs.label }
            </button>
          );
        }
      } )
      }
    </React.Fragment>
  );
}

