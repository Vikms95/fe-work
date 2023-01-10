import { useState, useEffect } from 'react';
import { Auth } from '../proxies/export';

export function useAuthenticateUser ( state, projectActions ) {
  const [ nombre, setNombre ] = useState( 'Nombre Apellido' );

  const callGetUser = () => {
    const proxy = new Auth.AutenticateProxy();
    return proxy.getUserAuthenticated().then( data => setNombre( data.name ) );
  };

  useEffect( () => {
    callGetUser();

  }, [] );

  useEffect( () => {
    const userAuthenticated = state.get( 'userAuthenticated' );

    if ( userAuthenticated )
      callGetUser().then( data => projectActions.SetUserAuthenticated( false ) );

  }, [ state ] );


  return nombre;
}