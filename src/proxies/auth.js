import { proxyResponse } from './proxy.js';

const tokenKey = 'access_token';
const rememberSessionKey = "remember_session";

function setAuthToken ( token ) {
  sessionStorage.setItem( tokenKey, token );
}
function cleanAuthToken () {
  sessionStorage.removeItem( tokenKey );
}

function setRememberSession ( token ) {
  localStorage.setItem( rememberSessionKey, token );
}
function cleanRememberSession () {
  localStorage.removeItem( rememberSessionKey );
}

function getParamsForNewSession () {
  let p = {};
  let token = localStorage.getItem( rememberSessionKey );

  if ( token )
    p.rememberToken = token;

  return p;
}

function setRemeberSession () {
  let token = localStorage.getItem( rememberSessionKey );

  if ( !token )
    cleanAuthToken();
  else
    setAuthToken( token );
}

function addOptionsAuth ( p ) {
  let p1 = p || {};
  let token = sessionStorage.getItem( tokenKey );

  if ( token != null ) {
    if ( !p1.headers )
      p1.headers = {};
    p1.headers.Authorization = 'Ninpo ' + token;
  }

  return p1;
}

class AutenticateProxy {
  constructor ( host ) {
    this.url = `${ host || '' }/api/auth`;
  }

  isAutenticated () {
    return proxyResponse( fetch( this.url + '/isAuthenticated', addOptionsAuth() ) );
  }

  getUserAuthenticated () {
    console.log( "Hi auth" );
    return proxyResponse( fetch( this.url + '/getUserAuthenticated', addOptionsAuth() ) );
  }

  newSession () {
    setRemeberSession();

    return proxyResponse( fetch( this.url + '/newSession', addOptionsAuth() ) ).
      //let p = getParamsForNewSession();

      //return proxyResponse(fetch(this.url + '/newSession', addOptionsAuth({ method: 'POST', body: JSON.stringify(p), headers: { 'Content-Type': 'application/json' } }))).
      then( data => {
        if ( data.token )
          setAuthToken( data.token );
        if ( data.cleanRembemberToken )
          cleanRememberSession();

        return data;
      } );
  }

  autenticate ( p ) {
    return proxyResponse( fetch( this.url + '/authenticate', { method: 'POST', body: JSON.stringify( p ), headers: { 'Content-Type': 'application/json' } } ) ).
      then( data => {
        if ( data.token )
          setAuthToken( data.token );
        if ( data.rememberToken )
          setRememberSession( data.rememberToken );

        return data;
      } );
  }

  register ( p ) {
    return proxyResponse( fetch( this.url + '/register', addOptionsAuth( { method: 'POST', body: JSON.stringify( p ), headers: { 'Content-Type': 'application/json' } } ) ) );
  }

  logOff () {
    cleanAuthToken();
  }
}

export { setAuthToken, cleanAuthToken, addOptionsAuth, setRememberSession, cleanRememberSession, AutenticateProxy };
export default { setAuthToken, cleanAuthToken, setRememberSession, cleanRememberSession, addOptionsAuth, AutenticateProxy };
