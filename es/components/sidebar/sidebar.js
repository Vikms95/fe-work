var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import close from './../../assets/generalItems/deleteCross.png';

import { getIsElementSelected, isMultiplePrototypeSelection } from '../../selectors/selectors';

var STYLE = {
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
  borderRightColor: SharedStyle.PRIMARY_COLOR.master
};

var STYLE_TITLE_BAR = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,
  height: '1.5em',
  display: 'flex',
  justifyContent: 'space-between'
};

var STYLE_TITLE = {
  margin: '0 0 0 1em',
  paddingTop: '0.3em',
  fontSize: '0.75em'
};

var STYLE_CLOSE = {
  marginLeft: '8em',
  margin: '0.3em 0.4em 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

var STYLE_SELECTED = {
  display: 'block',
  position: 'absolote',
  width: '257px',
  buttom: '0',
  Zindex: '9002'
};

var STYLE_NOT_SELECTED = {
  display: 'none',
  position: 'absolute',
  width: '257px',
  buttom: '0',
  Zindex: '9002'
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

function Sidebar(_ref) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      projectActions = _ref.projectActions,
      catalog = _ref.catalog,
      linesActions = _ref.linesActions;


  var isElementSelected = getIsElementSelected(state);

  var hideSideBar = function hideSideBar() {
    projectActions.unselectAll();
    document.getElementById('sideBar').style.display = 'none';
  };

  if (isMultiplePrototypeSelection(state)) return null;

  return React.createElement(
    'div',
    { id: 'sideBar',
      style: isElementSelected ? _extends({}, STYLE_SELECTED, { left: width, height: height }) : _extends({}, STYLE_NOT_SELECTED, { height: height }) },
    React.createElement(
      'aside',
      {
        style: STYLE,
        className: 'sidebar',
        onKeyDown: function onKeyDown(event) {
          return event.stopPropagation();
        },
        onKeyUp: function onKeyUp(event) {
          return event.stopPropagation();
        }
      },
      React.createElement(
        'div',
        { style: STYLE_TITLE_BAR },
        React.createElement(
          'p',
          { style: STYLE_TITLE },
          'Propiedades'
        ),
        React.createElement('img', {
          src: close,
          style: STYLE_CLOSE,
          onClick: hideSideBar })
      ),
      React.createElement(
        'div',
        { style: { margin: '0 20px' } },
        React.createElement(PanelElementEditor, {
          state: state,
          projectActions: projectActions,
          catalog: catalog,
          linesActions: linesActions
        })
      )
    )
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Sidebar;