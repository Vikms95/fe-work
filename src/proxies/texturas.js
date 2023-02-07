import { proxyResponse } from './proxy.js'
import { addOptionsAuth } from './auth'

class TexturasProxy {
  constructor(host) {
    this.url = `${host || ''}/api/texturas`;
  }

  getGruposTexturas(p) {
    return proxyResponse(fetch(this.url + '/getgrupostexturas', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })))
  }
  getTexturas(p) {
    return proxyResponse(fetch(this.url + '/gettexturas', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })))
  }
}

export { TexturasProxy }
export default { TexturasProxy }
