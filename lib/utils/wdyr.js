'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'development') {
  var whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(_react2.default, {
    // trackAllPureComponents: true,
  });
}