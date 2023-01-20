import { proxyResponse } from './proxy.js'
import { addOptionsAuth } from './auth'

class MenuProxy {
  constructor(host) {
    this.url = `${host || ''}/api/menu`;
  }

  getMenu(p) {
    return proxyResponse(fetch(this.url + '/getmenu', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })))
  }
}

export { MenuProxy }
export default { MenuProxy }
