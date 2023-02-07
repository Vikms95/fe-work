'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panelElementEditor = require('./panel-element-editor/panel-element-editor');

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _deleteCross = require('./../../assets/generalItems/deleteCross.png');

var _deleteCross2 = _interopRequireDefault(_deleteCross);

var _selectors = require('../../selectors/selectors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


  var isElementSelected = (0, _selectors.getIsElementSelected)(state);

  var hideSideBar = function hideSideBar() {
    projectActions.unselectAll();
    document.getElementById('sideBar').style.display = 'none';
  };

  if ((0, _selectors.isMultiplePrototypeSelection)(state)) return null;

  return _react2.default.createElement(
    'div',
    { id: 'sideBar',
      style: isElementSelected ? _extends({}, STYLE_SELECTED, { left: width, height: height }) : _extends({}, STYLE_NOT_SELECTED, { height: height }) },
    _react2.default.createElement(
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
      _react2.default.createElement(
        'div',
        { style: STYLE_TITLE_BAR },
        _react2.default.createElement(
          'p',
          { style: STYLE_TITLE },
          'Propiedades'
        ),
        _react2.default.createElement('img', {
          src: _deleteCross2.default,
          style: STYLE_CLOSE,
          onClick: hideSideBar })
      ),
      _react2.default.createElement(
        'div',
        { style: { margin: '0 20px' } },
        _react2.default.createElement(_panelElementEditor2.default, {
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
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

exports.default = Sidebar;