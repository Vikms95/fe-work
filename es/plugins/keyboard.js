import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW, MODE_SNAPPING, KEYBOARD_BUTTON_CODE } from '../constants';

// import {
//   rollback,
//   undo,
//   remove,
//   toggleSnap,
//   copyProperties,
//   pasteProperties,
//   setAlterateState,
//   unselectAll,
//   setMode
// } from '../actions/project-actions';

export default function keyboard() {

  return function (state, stateExtractor, projectActions) {

    window.addEventListener('keydown', function (event) {

      var extractedState = stateExtractor(state);
      var mode = extractedState.get('mode');

      switch (event.keyCode) {
        case KEYBOARD_BUTTON_CODE.BACKSPACE:
        case KEYBOARD_BUTTON_CODE.DELETE:
          {
            if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode)) projectActions.remove();
            // store.dispatch( remove() );
            break;
          }
        case KEYBOARD_BUTTON_CODE.ESC:
          {
            // TODO set remove for the furniture
            projectActions.rollback();
            projectActions.unselectAll();
            // store.dispatch( rollback() );
            // store.dispatch( unselectAll() );
            break;
          }
        case KEYBOARD_BUTTON_CODE.Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) projectActions.undo();
            // store.dispatch( undo() );
            break;
          }
        case KEYBOARD_BUTTON_CODE.ALT:
          {
            if (MODE_SNAPPING.includes(mode)) projectActions.toggleSnap(extractedState.snapMask.merge({
              SNAP_POINT: false,
              SNAP_LINE: false,
              SNAP_SEGMENT: false,
              SNAP_GRID: false,
              SNAP_GUIDE: false,
              tempSnapConfiguartion: extractedState.snapMask.toJS()
            }));
            // store.dispatch( toggleSnap( state.snapMask.merge( {
            //   SNAP_POINT: false,
            //   SNAP_LINE: false,
            //   SNAP_SEGMENT: false,
            //   SNAP_GRID: false,
            //   SNAP_GUIDE: false,
            //   tempSnapConfiguartion: state.snapMask.toJS()
            // } ) ) );
            break;
          }
        case KEYBOARD_BUTTON_CODE.C:
          {
            var selectedLayer = extractedState.getIn(['scene', 'selectedLayer']);
            var selected = extractedState.getIn(['scene', 'layers', selectedLayer, 'selected']);

            if ((mode === MODE_IDLE || mode === MODE_3D_VIEW) && (selected.holes.size || selected.areas.size || selected.items.size || selected.lines.size)) {
              if (selected.holes.size) {
                var hole = extractedState.getIn(['scene', 'layers', selectedLayer, 'holes', selected.holes.get(0)]);
                projectActions.copyProperties(hole.get('properties'));
                // store.dispatch( copyProperties( hole.get( 'properties' ) ) );
              } else if (selected.areas.size) {
                var area = extractedState.getIn(['scene', 'layers', selectedLayer, 'areas', selected.areas.get(0)]);
                projectActions.copyProperties(area.properties);
                // store.dispatch( copyProperties( area.properties ) );
              } else if (selected.items.size) {
                var item = extractedState.getIn(['scene', 'layers', selectedLayer, 'items', selected.items.get(0)]);

                projectActions.copyProperties(item.properties);
                // store.dispatch( copyProperties( item.properties ) );
              } else if (selected.lines.size) {
                var line = extractedState.getIn(['scene', 'layers', selectedLayer, 'lines', selected.lines.get(0)]);
                projectActions.copyProperties(line.properties);
                // store.dispatch( copyProperties( line.properties ) );
              }
            }
            break;
          }
        case KEYBOARD_BUTTON_CODE.V:
          {
            projectActions.pasteProperties();
            // store.dispatch( pasteProperties() );
            break;
          }
        case KEYBOARD_BUTTON_CODE.CTRL:
          {
            projectActions.setAlterateState();
            // store.dispatch( setAlterateState() );
            break;
          }
      }
    });

    window.addEventListener('keyup', function (event) {

      var extractedState = stateExtractor(state);
      var mode = extractedState.get('mode');

      switch (event.keyCode) {
        case KEYBOARD_BUTTON_CODE.ALT:
          {
            if (MODE_SNAPPING.includes(mode)) projectActions.toggleSnap(extractedState.snapMask.merge(extractedState.snapMask.get('tempSnapConfiguartion')));
            // store.dispatch( toggleSnap( state.snapMask.merge( state.snapMask.get( 'tempSnapConfiguartion' ) ) ) );
            break;
          }
        case KEYBOARD_BUTTON_CODE.CTRL:
          {
            projectActions.setAlterateState();
            // store.dispatch( setAlterateState() );
            break;
          }
      }
    });
  };
}