import { useState } from 'react';

//todo refactor into a more generic hook
export function useToggle () {
  const [ isSelectAcabado, setIsSelectAcabado ] = useState( false );

  const handleAcabado = () => {
    if ( isSelectAcabado )
      setIsSelectAcabado( () => false );
    else
      setIsSelectAcabado( () => true );
  };

  return { isSelectAcabado, handleAcabado };
}