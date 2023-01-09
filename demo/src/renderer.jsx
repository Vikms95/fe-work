import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import ContainerDimensions from 'react-container-dimensions';
import Immutable, { Map } from 'immutable';
import installDevTools from 'immutable-devtools';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as actionCreators from '../../src/actions/export';

import MyCatalog from './catalog/mycatalog';

import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';

import {
  ReactPlanner,
  Models as PlannerModels,
  reducer as PlannerReducer,
  Plugins as PlannerPlugins,
} from 'react-planner'; //react-planner

//define state
let AppState = Map( {
  'react-planner': new PlannerModels.State()
} );

let getPlannerState = ( state, action ) => PlannerReducer( state, action );
let getState = getPlannerState;

//define reducer
let reducer = ( state, action ) => {
  state = state || AppState;
  state = state.update( 'react-planner', plannerState => getState( plannerState, action ) );

  return state;
};

let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if ( !isProduction ) {
  console.info( 'Environment is in development and these actions will be blacklisted', blackList );
  console.info( 'Enable Chrome custom formatter for Immutable pretty print' );
  installDevTools( Immutable );
}

//init store
let store = createStore(
  reducer,
  null,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__( {
    actionCreators,
    trace: true,
  } )
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave( 'react-planner_v0' ),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];

let dispatch = store.dispatch;

getState = ( state, action ) => {
  state = getPlannerState( state, action );

  if ( typeof state === 'function' )
    state = state( dispatch );

  return state;
};

// Mock prefs to simulate backend fetch
const data = {

  "prefsInfo": [
    {
      "nombre": "GUIA2D",
      "descripcion": "Visualizar o no la guia que se muestra en la vista 2D",
      "typeValor": "Booleano"
    },
    {
      "nombre": "GUIA3D",
      "descripcion": "Visualizar o no la guia que se muestra en la vista 3D",
      "typeValor": "Booleano"
    },
    {
      "nombre": "UNIDADMEDIDA",
      "descripcion": "Unidad de longitud en la que se expresará la aplicación por defecto (cm, mm, ...)",
      "typeValor": "Texto"
    },
    {
      "nombre": "VERANGULOS",
      "descripcion": "Permitirá que en la planta se visualicen o no los ángulos entre las paredes",
      "typeValor": "Booleano"
    },
    {
      "nombre": "C/LISOPARED2D",
      "descripcion": "Detallará el valor del color de relleno en las paredes al dibujarlas en 2D",
      "typeValor": "Texto"
    },
    {
      "nombre": "C/LISOPARED3D",
      "descripcion": "Detallará el valor del color de relleno en las paredes al dibujarlas en 2D",
      "typeValor": "Texto"
    },
    {
      "nombre": "C/LINEASCOTA",
      "descripcion": "Detallará color con el que se dibujarán las líneas de las cotas en planta",
      "typeValor": "Texto"
    },
    {
      "nombre": "C/COTA",
      "descripcion": "Detallará el valor del color de las cotas al dibujarlas en 2D",
      "typeValor": "Texto"
    },
    {
      "nombre": "ALTOPARED",
      "descripcion": "Determinará la altura por defecto en la que se crea las paredes expresado en mm",
      "typeValor": "Entero"
    },
    {
      "nombre": "FONDOPARED",
      "descripcion": "Determinará el fondo por defecto de las nuevas paredes expresado en mm",
      "typeValor": "Entero"
    },
    {
      "nombre": "T/REJILLA2D",
      "descripcion": "Tamaño de la rejilla de la planta (2D),expresado en mm",
      "typeValor": "Entero"
    },
    {
      "nombre": "T/REJILLA3D",
      "descripcion": "Tamaño de la rejilla de la perspectiva (3D),expresado en mm",
      "typeValor": "Entero"
    },
    {
      "nombre": "ZOOM2D",
      "descripcion": "Zoom inicial al acceder a la planta (2D),expresado en mm",
      "typeValor": "Entero"
    },
    {
      "nombre": "VER90",
      "descripcion": "Permitirá decidir si se quieren visualizar o no los ángulos múltiplos de 90º",
      "typeValor": "Booleano"
    },
    {
      "nombre": "FONTS",
      "descripcion": "Fuentes a aplicar en toda la Web",
      "typeValor": "Texto"
    },
    {
      "nombre": "T/REJILLATOTAL2D",
      "descripcion": "Tamaño total de la rejilla de la planta",
      "typeValor": "Entero"
    },
    {
      "nombre": "T/REJILLATOTAL3D",
      "descripcion": "Tamaño total de la rejilla de la perspectiva",
      "typeValor": "Entero"
    }
  ],
  "prefs": {
    "GUIA2D": true,
    "GUIA3D": true,
    "UNIDADMEDIDA": "mm",
    "VERANGULOS": true,
    "C/LISOPARED2D": "#6386A1",
    "C/LISOPARED3D": "#FFFFFF",
    "C/LINEASCOTA": "#aaaaaa",
    "C/COTA": "#aaaaaa",
    "ALTOPARED": 2500,
    "FONDOPARED": 100,
    "T/REJILLA2D": 1000,
    "T/REJILLA3D": 1000,
    "ZOOM2D": 9000,
    "VER90": true,
    "FONTS": "CALIBRI",
    "T/REJILLATOTAL2D": 20000,
    "T/REJILLATOTAL3D": 20000
  }
};

const container = document.getElementById( 'app' );
const root = createRoot( container );

//render
root.render(
  (
    //<FetchData />
    <Provider store={ store }>
      <ContainerDimensions>
        { ( { width, height } ) =>
          <ReactPlanner
            catalog={ MyCatalog }
            width={ width }
            height={ height }
            plugins={ plugins }
            toolbarButtons={ toolbarButtons }
            stateExtractor={ state => state.get( 'react-planner' ) }
            prefsInfo={ data.prefsInfo }
            prefs={ data.prefs }
          />
        }
      </ContainerDimensions>
    </Provider>
  )
);
//} ).catch( error => {
  //alert( error.detail || error.statusText || error.status || error );
//} );

