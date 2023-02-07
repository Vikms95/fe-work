var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

var BASE_STYLE = {
  display: "inline-block",
  fontWeight: "400",
  lineHeight: "1.25",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  cursor: "pointer",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  userSelect: "none",
  padding: "5px 14px",
  fontSize: "14px",
  color: SharedStyle.COLORS.black,
  fonWeight: "400px",
  transition: "background-color 175ms ease, border 175ms ease",
  outline: "none",
  borderRadius: "2px",
  borderWidth: "1px",
  borderType: "solid",
  width: '100%'
};

var BASE_STYLE_SIZE = {
  small: {
    fontSize: "12px",
    padding: "3px 8px"
  },
  normal: {},
  large: {
    padding: "8px 20px"
  }
};

export default function Button(_ref) {
  var type = _ref.type,
      customStyle = _ref.style,
      customStyleHover = _ref.styleHover,
      children = _ref.children,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, ['type', 'style', 'styleHover', 'children', 'size']);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hover = _useState2[0],
      setHover = _useState2[1];

  var styleMerged = Object.assign({}, BASE_STYLE, BASE_STYLE_SIZE[size], hover ? customStyleHover : customStyle);

  return React.createElement(
    'button',
    _extends({
      type: type,
      style: styleMerged,
      onMouseEnter: function onMouseEnter() {
        return setHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(false);
      }
    }, rest),
    children
  );
}

// export default class Button extends Component {

//   constructor ( props ) {
//     super( props );
//     this.state = { hover: false };
//   }

//   render () {
//     let { hover } = this.state;
//     let { type, style: customStyle, styleHover: customStyleHover, children, size, ...rest } = this.props;
//     let styleMerged = Object.assign( {}, BASE_STYLE, BASE_STYLE_SIZE[ size ], hover ? customStyleHover : customStyle );

//     return <button
//       type={ type }
//       onMouseEnter={ e => this.setState( { hover: true } ) }
//       onMouseLeave={ e => this.setState( { hover: false } ) }
//       style={ styleMerged }
//       { ...rest }>{ children }</button>;
//   }
// }

Button.defaultProps = {
  type: "button",
  size: "normal",
  style: {
    backgroundColor: "#e6e6e6",
    borderColor: "#adadad"
  },
  styleHover: {
    backgroundColor: "#d4d4d4",
    borderColor: "#8c8c8c"
  }
};

Button.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  styleHover: PropTypes.object,
  size: PropTypes.oneOf(['large', 'normal', 'small'])
};