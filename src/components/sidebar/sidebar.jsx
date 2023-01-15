import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import close from './../../assets/generalItems/deleteCross.png';

import { getIsElementSelected, isMultiplePrototypeSelection } from '../../selectors/selectors';


const STYLE = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
  width: '100%',
  backgroundColor: SharedStyle.COLORS.white,
  borderLeftWidth: '2px',
  borderLeftStyle: 'solid',
  borderLeftColor: SharedStyle.PRIMARY_COLOR.master,
  borderRightWidth: '2px',
  borderRightStyle: 'solid',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
};

const STYLE_TITLE_BAR = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
  height: '1.5em',
  display: 'flex',
  justifyContent: 'space-between',
};

const STYLE_TITLE = {
  margin: '0 0 0 1em',
  paddingTop: '0.3em',
  fontSize: '0.75em',
};

const STYLE_CLOSE = {
  marginLeft: '8em',
  margin: '0.3em 0.4em 0 0',
  height: '0.6em',
  cursor: 'pointer',
};

const STYLE_SELECTED = {
  display: 'block',
  position: 'absolote',
  width: '257px',
  buttom: '0',
  Zindex: '9002',
};

const STYLE_NOT_SELECTED = {
  display: 'none',
  position: 'absolute',
  width: '257px',
  buttom: '0',
  Zindex: '9002',
};

//const sortButtonsCb = ( a, b ) => {
//  if ( a.index === undefined || a.index === null ) {
//    a.index = Number.MAX_SAFE_INTEGER;
//  }

//  if ( b.index === undefined || b.index === null ) {
//    b.index = Number.MAX_SAFE_INTEGER;
//  }

//  return a.index - b.index;
//};

//const mapButtonsCb = ( el, ind ) => <If key={ ind } condition={ el.condition } style={ { position: 'relative' } }>{ el.dom }</If>;

function Sidebar ( {
  state,
  width,
  height,
  projectActions,
  catalog,
  linesActions
} ) {

  const isElementSelected = getIsElementSelected( state );

  const hideSideBar = () => {
    projectActions.unselectAll();
    document.getElementById( 'sideBar' ).style.display = 'none';
  };

  if ( isMultiplePrototypeSelection( state ) ) return null;

  return (
    <div id='sideBar'
      style={ ( isElementSelected )
        ? { ...STYLE_SELECTED, left: width, height }
        : { ...STYLE_NOT_SELECTED, height: height }
      }>
      <aside
        style={ STYLE }
        className="sidebar"
        onKeyDown={ event => event.stopPropagation() }
        onKeyUp={ event => event.stopPropagation() }
      >

        <div style={ STYLE_TITLE_BAR }>
          <p style={ STYLE_TITLE }>Propiedades</p>
          <img
            src={ close }
            style={ STYLE_CLOSE }
            onClick={ hideSideBar } />
        </div>

        <div style={ { margin: '0 20px' } }>
          <PanelElementEditor
            state={ state }
            projectActions={ projectActions }
            catalog={ catalog }
            linesActions={ linesActions }
          />
        </div>
      </aside>
    </div >
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};


export default Sidebar;
