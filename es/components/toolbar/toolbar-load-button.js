import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';
import { Context } from '../../context/context';

export default function ToolbarLoadButton() {
  var _useContext = useContext(Context),
      translator = _useContext.translator,
      projectActions = _useContext.projectActions;

  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    browserUpload().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    React.createElement(IconLoad, null)
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired
};

// ToolbarLoadButton.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };