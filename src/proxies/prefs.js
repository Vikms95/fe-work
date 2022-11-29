import { proxyResponse } from './proxy.js'
import { addOptionsAuth } from './auth'

let prefsInfo = {};

function setPrefsInfo(_prefsInfo) {
  prefsInfo = _prefsInfo;
}

function getPrefsInfo() {
  return prefsInfo;
}
class PrefsProxy {
  constructor(host) {
    this.url = `${host || ''}/api/prefs`;
  }

  updatePreference(p) {
    return proxyResponse(fetch(this.url + '/updatePreference', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } })))
  }
}

export { setPrefsInfo, getPrefsInfo, PrefsProxy }
export default { setPrefsInfo, getPrefsInfo, PrefsProxy }
