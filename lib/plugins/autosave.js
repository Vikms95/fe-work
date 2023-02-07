'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = autosave;

var _projectActions = require('../actions/project-actions');

var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;


var TIMEOUT_DELAY = 500;

var timeout = null;

function autosave(autosaveKey, delay) {

    return function (state, stateExtractor, projectActions) {

        delay = delay || TIMEOUT_DELAY;

        if (!autosaveKey) return;
        if (!localStorage) return;

        //revert
        if (localStorage.getItem(autosaveKey) !== null) {
            var data = localStorage.getItem(autosaveKey);
            var json = JSON.parse(data);

            projectActions.loadProject(json);
            // store.dispatch( loadProject( json ) );
        }

        //update
        // store.subscribe( () => {
        //   if ( timeout ) clearTimeout( timeout );

        //   timeout = setTimeout( () => {
        //     const extractedState = stateExtractor( state );
        //     localStorage.setItem( autosaveKey, JSON.stringify( extractedState.scene.toJS() ) );

        //     // TODO this was accessing the store directly from legacy context, causing incompabilities with React 18
        //     // let state = stateExtractor( store.getState() );
        //     // localStorage.setItem( autosaveKey, JSON.stringify( state.scene.toJS() ) );

        //     /*let scene = state.sceneHistory.last;
        //     if (scene) {
        //       let json = JSON.stringify(scene.toJS());
        //       localStorage.setItem(autosaveKey, json);
        //     }*/
        //   }, delay );
        // } );
    };
}