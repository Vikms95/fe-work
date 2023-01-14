import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';
import { Context } from '../../context/context';

export default function ToolbarLoadButton () {

  const { translator, projectActions } = useContext( Context );

  let loadProjectFromFile = event => {
    event.preventDefault();
    browserUpload().then( ( data ) => {
      projectActions.loadProject( JSON.parse( data ) );
    } );
  };

  return (
    <ToolbarButton active={ false } tooltip={ translator.t( "Load project" ) } onClick={ loadProjectFromFile }>
      <IconLoad />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

// ToolbarLoadButton.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };
