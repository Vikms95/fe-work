import { useEffect, useState } from 'react';

export function useResetMultiSelection ( state, props ) {


  useEffect( () => {
    const isEmptyInputAndSingleSelection = () => {
      return state.showedValue === 'null' && !state.isMultiSelection;
    };

    if ( isEmptyInputAndSingleSelection() ) {
      setState( ( prevState ) => ( { ...prevState, showedValue: props.value } ) );
    }
  }, [ props, state.showedValue, state.isMultiSelection ] );

}