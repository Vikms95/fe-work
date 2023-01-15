import PropTypes from 'prop-types';
import Translator from '../translator/translator';
// import Catalog from '../catalog/catalog';
import { createContext } from 'react';
import { objectsMap } from '../utils/objects-utils';
import actions from '../actions/export';

export const Context = createContext( {
  ...objectsMap( actions, () => PropTypes.object ),
  translator: new Translator(),
  catalog: {}
} );

export const ContextConsumer = Context.Consumer;
export const ContextProvider = Context.Provider;


