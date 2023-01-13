const localStorage = window.hasOwnProperty( 'localStorage' ) ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave ( autosaveKey, delay ) {

  return ( store, stateExtractor, projectActions, state ) => {

    delay = delay || TIMEOUT_DELAY;

    if ( !autosaveKey ) return;
    if ( !localStorage ) return;

    //revert
    if ( localStorage.getItem( autosaveKey ) !== null ) {
      let data = localStorage.getItem( autosaveKey );
      let json = JSON.parse( data );

      //TODO Probar a usar la acción projectActions.loadProject(json)?
      projectActions.loadProject( json );
      // store.dispatch( loadProject( json ) );
    }

    //update
    store.subscribe( () => {
      if ( timeout ) clearTimeout( timeout );

      timeout = setTimeout( () => {
        const extractedState = stateExtractor( state );
        localStorage.setItem( autosaveKey, JSON.stringify( extractedState.scene.toJS() ) );

        // TODO this was accessing the store directly from legacy context, causing incompabilities with React 18
        // let state = stateExtractor( store.getState() );
        // localStorage.setItem( autosaveKey, JSON.stringify( state.scene.toJS() ) );

        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay );
    } );
  };
}
