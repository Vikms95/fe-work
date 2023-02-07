import { useEffect, useState } from 'react';
import { Menu } from '../proxies/export';


export function useFetchMenu ( key ) {
  const [ menuData, setMenuData ] = useState();

  useEffect( () => {

    const menuProxy = new Menu.MenuProxy();
    menuProxy.getMenu( { clavemenu: key } ).then( data => setMenuData( () => data ) );

  }, [] );

  return { menuData };
}
