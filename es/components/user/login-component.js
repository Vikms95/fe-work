var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

import { Auth } from '../../proxies/export';
import { Context } from '../../context/context';

var STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  zIndex: '9006',
  width: '21em',
  height: '21.3em',
  border: '1px solid black',
  top: '-0.5em',
  right: '2em',
  textAlign: 'left'
};

var STYLE_LABEL = {
  fontSize: '0.8em',
  color: 'black',
  fontWeight: 'bold'
};

var STYLE_INPUT = {
  width: '100%',
  height: '2em',
  border: '1px solid #ccc'
};

export default function LoginComponent(_ref) {
  _objectDestructuringEmpty(_ref);

  var _useContext = useContext(Context),
      projectActions = _useContext.projectActions;

  var _useState = useState({
    correo: '',
    password: '',
    remember: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var login = function login() {
    var proxy = new Auth.AutenticateProxy();

    proxy.autenticate({
      correo: state.correo,
      password: state.password,
      remember: state.remember
    }).then(function (data) {
      projectActions.SetUserAuthenticated(true);
      projectActions.SetPreference(data.prefs, data.prefsInfo);

      document.getElementById('userLogin').style.display = 'none';
    }).catch(function (error) {
      alert(error.detail || error.statusText || error.status || error);
    });
  };

  var showRegister = function showRegister() {
    document.getElementById('userLogin').style.display = 'none';
    document.getElementById('userRegister').style.display = 'block';
  };

  return React.createElement(
    'aside',
    { id: 'userLogin', style: STYLE },
    React.createElement(
      'div',
      { style: { height: '1.5em', margin: '1.4em', borderBottom: '1px solid black' } },
      React.createElement(
        'span',
        { style: { fontWeight: 'bold', color: 'black', fontSize: '1.25em', letterSpacing: '-0.05em' } },
        'Iniciar Sesi\xF3n'
      )
    ),
    React.createElement(
      'div',
      { style: {
          position: 'absolute',
          top: '4em',
          left: '1.4em',
          width: '17.5em'
        }
      },
      React.createElement(
        'div',
        { style: { marginTop: '0.2em' } },
        React.createElement(
          'span',
          { style: STYLE_LABEL },
          'Correo'
        ),
        React.createElement('input', {
          maxLength: 254,
          style: STYLE_INPUT,
          onChange: function onChange(e) {
            return setState(function (prevState) {
              return _extends({}, prevState, { correo: e.target.value });
            });
          }
        })
      ),
      React.createElement(
        'div',
        { style: { marginTop: '1em' } },
        React.createElement(
          'span',
          { style: STYLE_LABEL },
          'Contrase\xF1a'
        ),
        React.createElement('input', {
          type: 'password',
          maxLength: 20,
          style: STYLE_INPUT,
          onChange: function onChange(e) {
            return setState(function (prevState) {
              return _extends({}, prevState, { password: e.target.value });
            });
          }
        })
      ),
      React.createElement(
        'span',
        { style: { fontSize: '0.8em', color: 'black', cursor: 'pointer' } },
        '\xBFOlvidaste tu contrase\xF1a?'
      ),
      React.createElement(
        'div',
        { style: { height: '3.5em', textAlign: 'left', cursor: 'pointer', lineHeight: '3.5em', verticalAlign: 'middle' } },
        React.createElement('input', {
          type: 'checkbox',
          value: 'Remember Me',
          id: 'remember',
          checked: state.remember,
          onChange: function onChange(e) {
            return setState(function (prevState) {
              return _extends({}, prevState, { remember: e.target.checked });
            });
          }
        }),
        React.createElement(
          'label',
          { style: { fontSize: '0.9em', color: 'black', display: 'inline-block', maxWidth: '100%', marginBottom: '0.8em', fontWeight: '550' } },
          'Recordar sesi\xF3n'
        )
      ),
      React.createElement(
        'div',
        { style: { width: '102%', height: '2.5em', textAlign: 'center', backgroundColor: '#dce8f3', cursor: 'pointer', borderRadius: '5px' } },
        React.createElement(
          'span',
          {
            onClick: login,
            className: "loginspan",
            style: { fontSize: '1.2em', color: 'black', display: 'inline-block', marginTop: '0.5em' }
          },
          'Iniciar sesi\xF3n'
        )
      ),
      React.createElement('span', { style: { fontSize: '2em', color: 'black', display: 'inline-block', marginTop: '1em' } })
    ),
    React.createElement(
      'div',
      { className: "popuploginalt", style: { position: 'absolute', bottom: '1.3em', left: '41%' } },
      React.createElement(
        'span',
        {
          onClick: showRegister,
          style: { color: 'black', cursor: 'pointer', fontSize: '0.8em' }
        },
        'Registrarse'
      )
    )
  );
}

// export default class LoginComponent extends Component {

//   constructor(props, context) {
//     super(props, context);
//     this.projectActions = props.projectActions;
//     this.state = {
//       correo: '',
//       password: '',
//       remember: false
//     };
//   }

//   render() {
//     const login_click = () => {
//       let proxy = new Auth.AutenticateProxy();

//       proxy.autenticate({ correo: this.state.correo, password: this.state.password, remember: this.state.remember })
//         .then(data => {
//           this.projectActions.SetUserAuthenticated(true);
//           this.projectActions.SetPreference(data.prefs, data.prefsInfo);
//           document.getElementById('userLogin').style.display = 'none';
//         })
//         .catch(error => {
//           alert(error.detail || error.statusText || error.status || error);
//         })
//     }
//     const showRegister = () => {
//       document.getElementById('userLogin').style.display = 'none'
//       document.getElementById('userRegister').style.display = 'block'
//     }

//     return (
//       <aside id={'userLogin'} style={STYLE}>
//         <div style={{ height: '1.5em', margin: '1.4em', borderBottom: '1px solid black', }}>
//           <span style={{ fontWeight: 'bold', color: 'black', fontSize: '1.25em', letterSpacing: '-0.05em' }}>
//             Iniciar Sesión
//           </span>
//         </div>
//         <div style={{ position: 'absolute', top: '4em', left: '1.4em', width: '17.5em' }}>
//           <div style={{ marginTop: '0.2em' }}>
//             <span style={STYLE_LABEL}>Correo</span>
//             <input maxLength={254} style={STYLE_INPUT} onChange={e => this.setState({ correo: e.target.value })} />
//           </div>
//           <div style={{ marginTop: '1em' }}>
//             <span style={STYLE_LABEL}>Contraseña</span>
//             <input type="password" maxLength={20} style={STYLE_INPUT} onChange={e => this.setState({ password: e.target.value })} />
//           </div>
//           <span style={{ fontSize: '0.8em', color: 'black', cursor: 'pointer' }}>¿Olvidaste tu contraseña?</span>

//           <div style={{ height: '3.5em', textAlign: 'left', cursor: 'pointer', lineHeight: '3.5em', verticalAlign: 'middle' }}>
//             <input type={'checkbox'} value="Remember Me" id={"remember"} checked={this.state.remember} onChange={e => this.setState({ remember: e.target.checked })} />
//             <label style={{ fontSize: '0.9em', color: 'black', display: 'inline-block', maxWidth: '100%', marginBottom: '0.8em', fontWeight: '550' }}>Recordar sesión</label>
//           </div>
//           <div style={{ width: '102%', height: '2.5em', textAlign: 'center', backgroundColor: '#dce8f3', cursor: 'pointer', borderRadius: '5px' }}>
//             <span onClick={login_click} className={"loginspan"} style={{ fontSize: '1.2em', color: 'black', display: 'inline-block', marginTop: '0.5em' }}>Iniciar sesión</span>
//           </div>
//           <span style={{ fontSize: '2em', color: 'black', display: 'inline-block', marginTop: '1em' }}></span>
//         </div>
//         <div className={"popuploginalt"} style={{ position: 'absolute', bottom: '1.3em', left: '41%' }}>
//           <span onClick={showRegister} style={{ color: 'black', cursor: 'pointer', fontSize: '0.8em' }}>Registrarse</span>
//         </div>
//       </aside >
//     )
//   }
// }

LoginComponent.propTypes = {
  state: PropTypes.object.isRequired
  //width: PropTypes.number.isRequired,
  //height: PropTypes.number.isRequired,
  //allowProjectFileSupport: PropTypes.bool.isRequired,
  //toolbarButtons: PropTypes.array
};

// LoginComponent.contextTypes = {
// projectActions: PropTypes.object.isRequired,
//viewer2DActions: PropTypes.object.isRequired,
//viewer3DActions: PropTypes.object.isRequired,
//linesActions: PropTypes.object.isRequired,
//holesActions: PropTypes.object.isRequired,
//itemsActions: PropTypes.object.isRequired,
//translator: PropTypes.object.isRequired,
// };