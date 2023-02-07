"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = consoleDebugger;

var _export = require("../actions/export");

var _export2 = _interopRequireDefault(_export);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function consoleDebugger() {

    //TODO añadir la store como primer parámetro para testear esto
    return function (state, stateExtractor) {
        // window.ReactPlanner = {
        //   ...actions,

        //   getStore () {
        //     return store;
        //   },

        //   getState () {
        //     return stateExtractor( store.getState() );
        //   },

        //   do ( actions, delay = 300 ) {
        //     actions = actions.reverse();
        //     let dispatch = store.dispatch;
        //     let dispatchAction = () => {
        //       console.info( `There are other ${ actions.length } actions on stack` );
        //       if ( actions.length === 0 ) return;
        //       dispatch( actions.pop() );
        //       if ( actions.length === 0 ) return;
        //       setTimeout( dispatchAction, delay );
        //     };
        //     setTimeout( dispatchAction, 0 );
        //   }
        // };

        console.groupCollapsed("ReactPlanner");
        console.info("ReactPlanner is ready");
        console.info("console.log(ReactPlanner)");
        console.log(window.ReactPlanner);
        console.groupEnd();
    };
}