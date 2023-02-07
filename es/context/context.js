var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import Translator from '../translator/translator';
// import Catalog from '../catalog/catalog';
import { createContext } from 'react';
import { objectsMap } from '../utils/objects-utils';
import actions from '../actions/export';

export var Context = createContext(_extends({}, objectsMap(actions, function () {
  return PropTypes.object;
}), {
  translator: new Translator(),
  catalog: {}
}));

export var ContextConsumer = Context.Consumer;
export var ContextProvider = Context.Provider;