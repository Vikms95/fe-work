import { Menu, Texturas } from '../../src/proxies/export';

export function Test() {
  TestMenuProxies();
  TestTexturas();
}

function TestMenuProxies() {
  let proxy = new Menu.MenuProxy();

  proxy.getMenu({ clavemenu: 'PRINCIPAL' })
    .then(data => {
      console.log('menu PRINCIPAL', data);
    })
    .catch(error => {
      alert(error.detail || error.statusText || error.status || error);
    });

  proxy.getMenu({ clavemenu: 'PAREDESMENU' })
    .then(data => {
      console.log('menu PAREDESMENU', data);
    })
    .catch(error => {
      alert(error.detail || error.statusText || error.status || error);
    });
}

function TestTexturas() {
  let proxy = new Texturas.TexturasProxy();

  proxy.getGruposTexturas({ universal: true })
    .then(data => {
      console.log('grupo Texturas universal', data);
      data.forEach(textura => {
        proxy.getTexturas({ idGruposDeTexturas: textura.idGruposDeTexturas })
          .then(data2 => {
            console.log(`grupo: ${textura.nombreEs} texturas`, data2);
          })
          .catch(error => {
            alert(error.detail || error.statusText || error.status || error);
          });
      });
    })
    .catch(error => {
      alert(error.detail || error.statusText || error.status || error);
    });
}
