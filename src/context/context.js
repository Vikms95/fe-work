import { objectsMap } from '../utils/objects-utils';
import Translator from '../translator/translator';
// import Catalog from '../catalog/catalog';
import actions from '../actions/export';
import { createContext } from 'react';
import PropTypes, { instanceOf } from 'prop-types';

export const Context = createContext( {
  ...objectsMap( actions, () => PropTypes.object ),
  translator: new Translator(),
  catalog: {}
} );

export const ContextConsumer = Context.Consumer;
export const ContextProvider = Context.Provider;


