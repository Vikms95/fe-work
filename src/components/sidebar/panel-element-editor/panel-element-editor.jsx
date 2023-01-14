
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Seq, fromJS } from 'immutable';
import ElementEditor from './element-editor';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../../constants';
import { Context } from '../../../context/context';


const validModesToShowPanel =
  [
    MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN,
    MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
    MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM,
    MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE,
    MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE
  ];

export default function PanelElementEditor ( {
  state,
  // catalog,
  // projectActions,
  // linesActions
} ) {

  const { catalog, projectActions, linesActions } = useContext( Context );

  let { scene, mode } = state;
  if ( validModesToShowPanel.includes( mode ) === false ) return null;

  const componentRenderer = ( element, layer ) => {
    return (
      <div key={ element.id }>
        <ElementEditor
          element={ element }
          layer={ layer }
          state={ state }
          catalog={ catalog }
          projectActions={ projectActions }
          linesActions={ linesActions }
        />
      </div> );
  };

  const lastElementSelectedID = fromJS( state.getIn( [ 'scene', 'selectedElementsHistory' ] ) ).first();

  const layerRenderer = layer => Seq()
    .concat( layer.lines, layer.holes, layer.areas, layer.items )
    .filter( element => element.id === lastElementSelectedID )
    .map( element => componentRenderer( element, layer ) )
    .valueSeq();

  //let selectedLayer = state.getIn( [ 'scene', 'selectedLayer' ] );
  //let layerRenderer2 = ( layer ) => {
  //  const elements = layer.getIn( [ selectedLayer, 'lines' ] ).concat( layer.getIn( [ selectedLayer, 'holes' ] ) ).concat( layer.getIn( [ selectedLayer, 'areas' ] ) ).concat( layer.getIn( [ selectedLayer, 'items' ] ) );
  //  const elementsFilter = elements.filter( element => element.selected );
  //  return elementsFilter;
  //};

  //const elementsSelected = layerRenderer2( scene.layers );
  //let i = 0;

  return (
    <div>{ scene.layers.valueSeq().map( layerRenderer ) }</div>
    /*<div>
      {
        elementsSelected.map((e) => {
          return componentRenderer(e, scene.layers.valueSeq())
        })
      }
    </div>*/
  );

}

PanelElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
};

// PanelElementEditor.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired
// };
