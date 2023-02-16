import React from 'react';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';

export function PropertiesEditor ( {
  mode,
  appState,
  internalState,
  element,
  catalog,
  projectActions,
  propertiesFormData,
  updateProperty
} ) {

  return (
    <React.Fragment>
      { propertiesFormData.entrySeq()
        .map( ( [ propertyName, data ] ) => {

          // For a line, this would be applied to height and thickness
          if ( propertyName.includes( 'texture' ) === false ) {

            const configs = data.get( 'configs' );
            const currentValue = data.get( 'currentValue' );
            const label = propertiesFormData.getIn( [ propertyName, 'configs' ] ).label;

            if ( configs.type === 'length-measure' ) {

              return (
                <PropertyLengthMeasure
                  mode={ mode }
                  key={ propertyName }
                  stateRedux={ appState }
                  state={ propertiesFormData }
                  sourceElement={ element }
                  attributeName={ propertyName }
                  projectActions={ projectActions }
                  unit={ appState.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
                  configs={ { label: label, min: 0, max: Infinity, precision: 2 } }
                  value={ propertiesFormData.getIn( [ propertyName, "currentValue" ] ) }
                  onUpdate={ ( value, isEnter ) => updateProperty( propertyName, value, isEnter ) }
                /> );

            } else {
              let { Editor } = catalog.getPropertyType( configs.type );

              return <Editor
                configs={ configs }
                key={ propertyName }
                value={ currentValue }
                stateRedux={ appState }
                sourceElement={ element }
                internalState={ internalState }
                propertyName={ propertyName }
                unit={ appState.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
                onUpdate={ value => updateProperty( propertyName, value ) }
              />;

            }
          }
        } )
      }
    </React.Fragment>
  );
}
