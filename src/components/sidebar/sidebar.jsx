import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
//import PanelGroupEditor from './panel-group-editor';
//import PanelMultiElementsEditor from './panel-element-editor/panel-multi-elements-editor';
//import PanelLayers from './panel-layers';
//import PanelGuides from './panel-guides';
//import PanelGroups from './panel-groups';
//import PanelLayerElements from './panel-layer-elements';
import * as SharedStyle from '../../shared-style';
//import If from '../../utils/react-if';

import close from './../../assets/generalItems/deleteCross.png';
import { getIsElementSelected } from '../../selectors/selectors';

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

function Sidebar ( { state, width, height, sidebarComponents, projectActions } ) {
  //TODO change in multi-layer check
  //let selected = state.getIn( [ 'scene', 'layers', selectedLayer, 'selected' ] );

  //let multiselected =
  //  selected.lines.size > 1 ||
  //  selected.items.size > 1 ||
  //  selected.holes.size > 1 ||
  //  selected.areas.size > 1 ||
  //  selected.lines.size + selected.items.size + selected.holes.size + selected.areas.size > 1;


  //let selectedGroup = state.getIn( [ 'scene', 'groups' ] ).findEntry( g => g.get( 'selected' ) );

  //let sorter = [
  //  { index: 0, condition: true, dom: <PanelGuides state={state} /> },
  //  { index: 1, condition: true, dom: <PanelLayers state={state} /> },
  //  { index: 2, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
  //  { index: 3, condition: true, dom: <PanelGroups mode={state.mode} groups={state.scene.groups} layers={state.scene.layers} /> },
  //  { index: 4, condition: !multiselected, dom: <PanelElementEditor state={state} /> },
  //  { index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
  //  { index: 6, condition: !!selectedGroup, dom: <PanelGroupEditor state={state} groupID={selectedGroup ? selectedGroup[0] : null} /> }
  //];

  //sorter = sorter.concat( sidebarComponents.map( ( Component, key ) => {

  //  return Component.prototype ? //if is a react component
  //    {
  //      condition: true,
  //      dom: React.createElement( Component, { state, key } )
  //    } :
  //    {                           //else is a sortable toolbar button
  //      index: Component.index,
  //      condition: Component.condition,
  //      dom: React.createElement( Component.dom, { state, key } )
  //    };
  //} ) );

  const isSelected = getIsElementSelected( state );

  const hideSideBar = () => {
    projectActions.unselectAll();
    document.getElementById( 'sideBar' ).style.display = 'none';
  };

  return (
    <div id='sideBar'
      style={ ( isSelected )
        ? { ...STYLE_SELECTED, left: width, height }
        : { ...STYLE_NOT_SELECTED, height: height }
      }>
      <aside
        style={ STYLE }
        className="sidebar"
        onKeyDown={ event => event.stopPropagation() }
        onKeyUp={ event => event.stopPropagation() }
      >

        {/* Barra Inicial */ }
        <div style={ STYLE_TITLE_BAR }>
          <p style={ STYLE_TITLE }>Propiedades</p>
          <img
            src={ close }
            style={ STYLE_CLOSE }
            onClick={ hideSideBar } />
        </div>

        {/* Elements */ }
        <div style={ { margin: '0 20px' } }>
          <PanelElementEditor state={ state } />
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
