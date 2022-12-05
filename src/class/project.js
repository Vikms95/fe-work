import { Map, List } from 'immutable';
import {
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
  MODE_IDLE,
  UNIDADMEDIDA
} from '../constants';
import { State, Catalog } from '../models';
import { history } from '../utils/export';
import {
  Layer,
  Group,
  Line,
  Hole,
  Perimeter,
  Item,
  HorizontalGuide,
  VerticalGuide
} from '../class/export';
import layer from './layer';
import { Prefs } from '../proxies/export';
import { projectActions } from '../actions/export';
import { getSelectedElements } from '../selectors/selectors';

class Project {

  static setAlterate ( state ) {
    return { updatedState: state.set( 'alterate', !state.alterate ) };
  }

  static openCatalog ( state ) {
    state = this.setMode( state, MODE_VIEWING_CATALOG ).updatedState;

    return { updatedState: state };
  }

  static SetUserAuthenticated ( state, value ) {

    state = state.set( 'userAuthenticated', value );

    return { updatedState: state };
  }

  static setPreference ( state, prefs, prefsInfo ) {
    let _prefs = new Map( prefs );
    let unit = _prefs.get( UNIDADMEDIDA );

    if ( prefsInfo )
      Prefs.setPrefsInfo( prefsInfo );
    state = state.setIn( [ 'prefs' ], new Map( prefs ) );
    state = state.set( 'prefs', _prefs );
    state = state.setIn( [ 'scene', 'prefs' ], _prefs );
    if ( unit && state.scene.unit != unit )
      state = state.setIn( [ 'scene', 'unit' ], unit );

    return { updatedState: state };
  }

  static updatePreference ( state, nombre, valor ) {
    /*
    let proxy = new Prefs.PrefsProxy();
    let p =
    {
      nombre: nombre,
      valor: valor
    };
    let proxyState = (store, stateExtractor) => proxy.updatePreference(p).then(data => {
      //let state = stateExtractor(store.getState());

      //state = this.updateStatePreferencePostAsync(state, p.nombre, p.valor).updatedState;

      //store.dispatch(state);
      store.dispatch({
        type: "SET_USER_AUTHENTICATED", value: true
      });
    }).catch(error => {
      alert(error.detail || error.statusText || error.status || error);
    });

    window.PostProxy(proxyState);

    return { updatedState: state };
    */

    return {
      updatedState: dispatch => {
        let proxy = new Prefs.PrefsProxy();
        let p =
        {
          nombre: nombre,
          valor: valor
        };

        proxy.updatePreference( p ).then( data => dispatch( projectActions.updatePreferenceCompleted( p.nombre, p.valor ) ) ).catch( error => dispatch( projectActions.updatePreferenceFailed( p.nombre, p.valor, error ) ) );

        return state;
      }
    };
  }

  static updatePreferenceCompleted ( state, nombre, value ) {
    state = state.setIn( [ 'prefs', nombre ], value );

    let _prefs = state.get( 'prefs' );
    //let prefs = state.getIn('scene', 'prefs');
    state = state.setIn( [ 'scene', 'prefs' ], _prefs );
    if ( name == UNIDADMEDIDA )
      state = state.setIn( [ 'scene', 'unit' ], value );

    return { updatedState: state };
  }

  static updatePreferenceFailed ( state, nombre, value, error ) {
    alert( error.detail || error.statusText || error.status || error );

    return { updatedState: state };
  }

  static newProject ( state ) {
    let prefs = state.get( 'prefs' );

    state = new State( { 'viewer2D': state.get( 'viewer2D' ) } );
    state = Project.setPreference( state, prefs ).updatedState;

    return { updatedState: state };
  }

  static loadProject ( state, sceneJSON ) {
    let prefs = state.get( 'prefs' );

    state = new State( { scene: sceneJSON, catalog: state.catalog.toJS() } );
    state = Project.setPreference( state, prefs ).updatedState;

    return { updatedState: state };
  }

  static setProperties ( state, layerID, properties ) {
    state = Layer.setPropertiesOnSelected( state, layerID, properties ).updatedState;

    return { updatedState: state };
  }

  static next_Drawing_Item ( state, layerID ) {
    state = Layer.next_Drawing_ItemOnSelected( state, layerID ).updatedState;

    return { updatedState: state };
  }

  static updateProperties ( state, layerID, properties ) {
    state = Layer.updatePropertiesOnSelected( state, layerID, properties ).updatedState;

    return { updatedState: state };
  }

  static setItemsAttributes ( state, attributes ) {
    //TODO apply only to items
    state.getIn( [ 'scene', 'layers' ] ).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static setLinesAttributes ( state, attributes ) {
    //TODO apply only to lines
    state.getIn( [ 'scene', 'layers' ] ).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static setHolesAttributes ( state, attributes ) {
    //TODO apply only to holes
    state.getIn( [ 'scene', 'layers' ] ).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static unselectAll ( state ) {
    state.getIn( [ 'scene', 'layers' ] ).forEach( ( { id: layerID } ) => { state = Layer.unselectAll( state, layerID ).updatedState; } );
    state.getIn( [ 'scene', 'groups' ] ).forEach( group => { state = Group.unselect( state, group.get( 'id' ) ).updatedState; } );
    state = this.setIsElementSelected( state ).updatedState;

    return { updatedState: state };
  }

  static remove ( state ) {
    let selectedLayer = state.getIn( [ 'scene', 'selectedLayer' ] );
    let {
      lines: selectedLines,
      holes: selectedHoles,
      items: selectedItems
    } = state.getIn( [ 'scene', 'layers', selectedLayer, 'selected' ] );

    state = Layer.unselectAll( state, selectedLayer ).updatedState;

    selectedLines.forEach( lineID => { state = Line.remove( state, selectedLayer, lineID ).updatedState; } );
    selectedHoles.forEach( holeID => { state = Hole.remove( state, selectedLayer, holeID ).updatedState; } );
    selectedItems.forEach( itemID => { state = Item.remove( state, selectedLayer, itemID ).updatedState; } );

    state = Layer.detectAndUpdateAreas( state, selectedLayer ).updatedState;
    state = Layer.detectAndUpdatePerimeters( state, selectedLayer ).updatedState;
    state = Perimeter.reCalcAllVertexsB( state, selectedLayer ).updatedState;
    state = this.setIsElementSelected( state ).updatedState;

    return { updatedState: state };
  }

  static undo ( state ) {
    let newSceneHistory = null;
    let sceneHistory = state.sceneHistory;
    if ( state.scene === sceneHistory.last && sceneHistory.list.size > 1 ) {
      sceneHistory = history.historyPop( sceneHistory );
    }

    //if ( fondo || alto ) {
    //  const layerID = sceneHistory.last.get( 'selectedLayer' );
    //  const lines = sceneHistory.last.getIn( [ 'layers', layerID, 'lines' ] );
    //  const formattedLines = Object.entries( lines.toJS() );
    //  const lineID = formattedLines.find( key => {
    //    if ( key[ 1 ].selected === true ) return key[ 0 ];
    //  } );

    //  newSceneHistory =
    //    sceneHistory.last.setIn( [ 'layers', layerID, 'lines', lineID[ 0 ], 'properties', 'thickness', 'length' ],
    //      fondo && fondo / 10
    //    );

    //  newSceneHistory =
    //    sceneHistory.last.setIn( [ 'layers', layerID, 'lines', lineID[ 0 ], 'properties', 'height', 'length' ],
    //      alto && alto / 10
    //    );
    //}

    state = state.merge( {
      mode: MODE_IDLE,
      scene: newSceneHistory || sceneHistory.last,
      sceneHistory: history.historyPop( sceneHistory )
    } );

    return { updatedState: state };
  }

  static rollback ( state ) {
    let sceneHistory = state.sceneHistory;

    if ( !sceneHistory.last && sceneHistory.list.isEmpty() ) {
      return { updatedState: state };
    }

    state = this.unselectAll( state ).updatedState;
    state = Project.setIsElementSelected( state ).updatedState;

    state = state.merge( {
      mode: MODE_IDLE,
      scene: sceneHistory.last,
      sceneHistory: history.historyPush( sceneHistory, sceneHistory.last ),
      snapElements: new List(),
      activeSnapElement: null,
      drawingSupport: new Map(),
      draggingSupport: new Map(),
      rotatingSupport: new Map(),
    } );

    return { updatedState: state };
  }

  static setProjectProperties ( state, properties ) {
    let scene = state.scene.merge( properties );
    state = state.merge( {
      mode: MODE_IDLE,
      scene
    } );

    return { updatedState: state };
  }

  static openProjectConfigurator ( state ) {
    state = state.merge( {
      mode: MODE_CONFIGURING_PROJECT,
    } );

    return { updatedState: state };
  }

  static initCatalog ( state, catalog ) {
    state = state.set( 'catalog', new Catalog( catalog ) );

    return { updatedState: state };
  }

  static updateMouseCoord ( state, coords ) {
    state = state.set( 'mouse', new Map( coords ) );

    return { updatedState: state };
  }

  static updateZoomScale ( state, scale ) {
    state = state.set( 'zoom', scale );

    return { updatedState: state };
  }

  static toggleSnap ( state, mask ) {
    state = state.set( 'snapMask', mask );
    return { updatedState: state };
  }

  static throwError ( state, error ) {
    state = state.set( 'errors', state.get( 'errors' ).push( {
      date: Date.now(),
      error
    } ) );

    return { updatedState: state };
  }

  static throwWarning ( state, warning ) {
    state = state.set( 'warnings', state.get( 'warnings' ).push( {
      date: Date.now(),
      warning
    } ) );

    return { updatedState: state };
  }

  static copyProperties ( state, properties ) {
    state = state.set( 'clipboardProperties', properties );

    return { updatedState: state };
  }

  static pasteProperties ( state ) {
    state = this.updateProperties(
      state, state.getIn( [ 'scene', 'selectedLayer' ] ),
      state.get( 'clipboardProperties' ) ).updatedState;

    return { updatedState: state };
  }

  static pushLastSelectedCatalogElementToHistory ( state, element ) {
    let currHistory = state.selectedElementsHistory;

    let previousPosition = currHistory.findIndex( el => el.name === element.name );
    if ( previousPosition !== -1 ) {
      currHistory = currHistory.splice( previousPosition, 1 );
    }
    currHistory = currHistory.splice( 0, 0, element );

    state = state.set( 'selectedElementsHistory', currHistory );
    return { updatedState: state };
  }

  static changeCatalogPage ( state, oldPage, newPage ) {
    state = state.setIn( [ 'catalog', 'page' ], newPage )
      .updateIn( [ 'catalog', 'path' ], path => path.push( oldPage ) );

    return { updatedState: state };
  }

  static goBackToCatalogPage ( state, newPage ) {
    let pageIndex = state.catalog.path.findIndex( page => page === newPage );
    state = state.setIn( [ 'catalog', 'page' ], newPage )
      .updateIn( [ 'catalog', 'path' ], path => path.take( pageIndex ) );

    return { updatedState: state };
  }

  static setMode ( state, mode ) {
    state = state.set( 'mode', mode );
    state = this.setIsElementSelected( state ).updatedState;

    return { updatedState: state };
  }

  static addHorizontalGuide ( state, coordinate ) {
    state = HorizontalGuide.create( state, coordinate ).updatedState;

    return { updatedState: state };
  }

  static addVerticalGuide ( state, coordinate ) {
    state = VerticalGuide.create( state, coordinate ).updatedState;

    return { updatedState: state };
  }

  static addCircularGuide ( state, x, y, radius ) {
    console.log( 'adding horizontal guide at', x, y, radius );

    return { updatedState: state };
  }

  static removeHorizontalGuide ( state, guideID ) {
    state = HorizontalGuide.remove( state, guideID ).updatedState;

    return { updatedState: state };
  }

  static removeVerticalGuide ( state, guideID ) {
    state = VerticalGuide.remove( state, guideID ).updatedState;

    return { updatedState: state };
  }

  static removeCircularGuide ( state, guideID ) {
    console.log( 'removing horizontal guide ', guideID );

    return { updatedState: state };
  }

  static setIsElementSelected ( state ) {
    const selectedElements = getSelectedElements( state );
    const isElementSelected =
      selectedElements.some( key => typeof key[ 1 ][ 0 ] !== 'undefined' );

    state = state.set( 'isElementSelected', isElementSelected );
    return { updatedState: state };
  }
}

export { Project as default };
