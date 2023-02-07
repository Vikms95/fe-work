'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = RegisterComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _export = require('../../proxies/export');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  zIndex: '9006',
  width: '28em',
  height: '32em',
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
  height: '1.8em',
  width: '13em'
};

var STYLE_FIRST_COLUMN = {
  marginTop: '0.1em'
};

var STYLE_SECOND_COLUMN = {
  marginTop: '0.1em',
  marginLeft: '2.8em'
};

function RegisterComponent() {
  var _useState = (0, _react.useState)({
    nombre: '',
    apellidos: '',
    direccion: '',
    cpostal: '',
    telefono: '',
    correo: '',
    correoConfirmar: '',
    password: '',
    passwordConfirmar: '',
    confirmarTerminos: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var register = function register() {
    var proxy = new _export.Auth.AutenticateProxy();

    proxy.register({
      nombre: state.nombre,
      apellidos: state.apellidos,
      direccion: state.direccion,
      cpostal: state.cpostal,
      telefono: state.telefono,
      correo: state.correo,
      correoConfirmar: state.correoConfirmar,
      password: state.password,
      passwordConfirmar: state.passwordConfirmar,
      confirmarTerminos: state.confirmarTerminos
    }).then(function (data) {
      document.getElementById('userRegister').style.display = 'none';
      alert(data.message);
    }).catch(function (error) {
      alert(error.detail || error.statusText || error.status || error);
    });
  };

  var showLogin = function showLogin() {
    document.getElementById('userRegister').style.display = 'none';
    document.getElementById('userLogin').style.display = 'block';
  };

  return _react2.default.createElement(
    'aside',
    { id: 'userRegister', style: STYLE },
    _react2.default.createElement(
      'div',
      { style: { height: '1.5em', margin: '1.4em', borderBottom: '1px solid black' } },
      _react2.default.createElement(
        'span',
        { style: { fontWeight: 'bold', color: 'black', fontSize: '1.25em', letterSpacing: '-0.05em' } },
        'Registrate'
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { position: 'absolute', top: '4em', left: '1.4em', width: '17.5em' } },
      _react2.default.createElement(
        'table',
        { style: { width: '25em' } },
        _react2.default.createElement(
          'tbody',
          { style: { boxSizing: 'border-box' } },
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_FIRST_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Nombre'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  maxLength: 50,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { nombre: e.target.value });
                    });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_SECOND_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Apellidos'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  maxLength: 50,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { apellidos: e.target.value });
                    });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_FIRST_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Direcci\xF3n'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  maxLength: 50,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { direccion: e.target.value });
                    });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_SECOND_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'C\xF3digo postal'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  type: 'number',
                  maxLength: 5,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { cpostal: e.target.value });
                    });
                  } })
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_FIRST_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Tel\xE9fono'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  type: 'number',
                  maxLength: 15,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { telefono: e.target.value });
                    });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_FIRST_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Correo'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  maxLength: 274,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { correo: e.target.value });
                    });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_FIRST_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Contrase\xF1a'
                ),
                _react2.default.createElement('input', {
                  type: "password",
                  style: STYLE_INPUT,
                  minLength: 6,
                  maxLength: 20,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { password: e.target.value });
                    });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { style: STYLE_SECOND_COLUMN },
                _react2.default.createElement(
                  'span',
                  { style: STYLE_LABEL },
                  'Confirma la contrase\xF1a'
                ),
                _react2.default.createElement('input', {
                  style: STYLE_INPUT,
                  type: "password",
                  minLength: 6,
                  maxLength: 20,
                  onChange: function onChange(e) {
                    return setState(function (prevState) {
                      return _extends({}, prevState, { passwordConfirmar: e.target.value });
                    });
                  }
                })
              )
            )
          )
        )
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'div',
        { style: { marginTop: '0.3em', borderTop: '1px solid black', width: '25em' } },
        _react2.default.createElement(
          'div',
          { style: { marginTop: '0.7em' } },
          _react2.default.createElement('input', {
            type: "checkbox",
            checked: state.confirmarTerminos,
            onChange: function onChange(e) {
              return setState(function (prevState) {
                return _extends({}, prevState, { confirmarTerminos: e.target.checked });
              });
            }
          }),
          _react2.default.createElement(
            'a',
            null,
            _react2.default.createElement(
              'span',
              { style: { fontSize: '0.7em' } },
              'Se aplican nuestros'
            )
          ),
          _react2.default.createElement(
            'a',
            { style: { color: 'blue', cursor: 'pointer' }, href: 'http://google.com', target: "_blank" },
            _react2.default.createElement(
              'span',
              { style: { fontSize: '0.7em' } },
              'T\xE9rminos y Condiciones '
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { fontSize: '0.7em' } },
            'y la '
          ),
          _react2.default.createElement(
            'a',
            { style: { color: 'blue', cursor: 'pointer' }, href: 'http://google.com' },
            _react2.default.createElement(
              'span',
              { style: { fontSize: '0.7em' } },
              'Pol\xEDtica de Privacidad'
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { fontSize: '0.7em' } },
            ' confirm\xE9 los t\xE9rminos'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { style: { marginLeft: '8.5%', marginTop: '1.5em', width: '22em', height: '2.5em', textAlign: 'center', backgroundColor: '#dce8f3', cursor: 'pointer', borderRadius: '5px' } },
        _react2.default.createElement(
          'span',
          { onClick: register, style: { fontSize: '1.2em', display: 'inline-block', marginTop: '0.5em' } },
          'Registrarse'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { position: 'absolute', bottom: '1.5em', left: '38.5%' } },
      _react2.default.createElement(
        'span',
        { onClick: showLogin, style: { color: 'black', cursor: 'pointer', fontSize: '0.8em' } },
        'Ya estas registrado?'
      )
    )
  );
}

// export default class RegisterComponent extends Component {

//   constructor ( props, context ) {
//     super( props, context );
//     this.state = {
//       nombre: '',
//       apellidos: '',
//       direccion: '',
//       cpostal: '',
//       telefono: '',
//       correo: '',
//       correoConfirmar: '',
//       password: '',
//       passwordConfirmar: '',
//       confirmarTerminos: false,
//     };
//   }

//   render () {
//     const register_click = () => {
//       let proxy = new Auth.AutenticateProxy();

//       proxy.register( {
//         nombre: this.state.nombre,
//         apellidos: this.state.apellidos,
//         direccion: this.state.direccion,
//         cpostal: this.state.cpostal,
//         telefono: this.state.telefono,
//         correo: this.state.correo,
//         correoConfirmar: this.state.correoConfirmar,
//         password: this.state.password,
//         passwordConfirmar: this.state.passwordConfirmar,
//         confirmarTerminos: this.state.confirmarTerminos
//       } )
//         .then( data => {
//           document.getElementById( 'userRegister' ).style.display = 'none';
//           alert( data.message );
//         } )
//         .catch( error => {
//           alert( error.detail || error.statusText || error.status || error );
//         } );
//     };
//     const showLogin = () => {
//       document.getElementById( 'userRegister' ).style.display = 'none';
//       document.getElementById( 'userLogin' ).style.display = 'block';
//     };

//     return (
//       <aside id='userRegister' style={ STYLE }>
//         <div style={ { height: '1.5em', margin: '1.4em', borderBottom: '1px solid black', } }>
//           <span style={ { fontWeight: 'bold', color: 'black', fontSize: '1.25em', letterSpacing: '-0.05em' } }>
//             Registrate
//           </span>
//         </div>
//         <div style={ { position: 'absolute', top: '4em', left: '1.4em', width: '17.5em' } }>
//           <table style={ { width: '25em' } }>
//             <tbody style={ { boxSizing: 'border-box' } }>
//               <tr>
//                 <td>
//                   <div style={ STYLE_FIRST_COLUMN }>
//                     <span style={ STYLE_LABEL }>Nombre</span>
//                     <input style={ STYLE_INPUT } maxLength={ 50 } onChange={ e => this.setState( { nombre: e.target.value } ) } />
//                   </div>
//                 </td>
//                 <td>
//                   <div style={ STYLE_SECOND_COLUMN }>
//                     <span style={ STYLE_LABEL }>Apellidos</span>
//                     <input style={ STYLE_INPUT } maxLength={ 50 } onChange={ e => this.setState( { apellidos: e.target.value } ) } />
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <div style={ STYLE_FIRST_COLUMN }>
//                     <span style={ STYLE_LABEL }>Dirrección</span>
//                     <input style={ STYLE_INPUT } maxLength={ 50 } onChange={ e => this.setState( { direccion: e.target.value } ) } />
//                   </div>
//                 </td>
//                 <td>
//                   <div style={ STYLE_SECOND_COLUMN }>
//                     <span style={ STYLE_LABEL }>Código postal</span>
//                     <input style={ STYLE_INPUT } type={ 'number' } maxLength={ 5 } onChange={ e => this.setState( { cpostal: e.target.value } ) } />
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <div style={ STYLE_FIRST_COLUMN }>
//                     <span style={ STYLE_LABEL }>Teléfono</span>
//                     <input style={ STYLE_INPUT } type={ 'number' } maxLength={ 15 } onChange={ e => this.setState( { telefono: e.target.value } ) } />
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <div style={ STYLE_FIRST_COLUMN }>
//                     <span style={ STYLE_LABEL }>Correo</span>
//                     <input style={ STYLE_INPUT } maxLength={ 274 } onChange={ e => this.setState( { correo: e.target.value } ) } />
//                   </div>
//                 </td>
//                 {/*<td>*/ }
//                 {/*  <div style={STYLE_SECOND_COLUMN}>*/ }
//                 {/*    <span style={STYLE_LABEL}>Confirma el correo</span>*/ }
//                 {/*    <input style={STYLE_INPUT} maxLength={274} onChange={e => this.setState({ correoConfirmar: e.target.value })} />*/ }
//                 {/*  </div>*/ }
//                 {/*</td>*/ }
//               </tr>
//               <tr>
//                 <td>
//                   <div style={ STYLE_FIRST_COLUMN }>
//                     <span style={ STYLE_LABEL }>Contraseña</span>
//                     <input type={ "password" } style={ STYLE_INPUT } minLength={ 6 } maxLength={ 20 } onChange={ e => this.setState( { password: e.target.value } ) } />
//                   </div>
//                 </td>
//                 <td>
//                   <div style={ STYLE_SECOND_COLUMN }>
//                     <span style={ STYLE_LABEL }>Confirma la contraseña</span>
//                     <input style={ STYLE_INPUT } type={ "password" } minLength={ 6 } maxLength={ 20 } onChange={ e => this.setState( { passwordConfirmar: e.target.value } ) } />
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <br></br>
//           {/* Accept use conditions */ }
//           <div style={ { marginTop: '0.3em', borderTop: '1px solid black', width: '25em' } }>
//             <div style={ { marginTop: '0.7em' } }>
//               <input type={ "checkbox" } checked={ this.state.confirmarTerminos } onChange={ e => this.setState( { confirmarTerminos: e.target.checked } ) } />
//               <a>
//                 <span style={ { fontSize: '0.7em' } }>Se aplican nuestros</span>
//               </a>,
//               <a style={ { color: 'blue', cursor: 'pointer' } } href={ 'http://google.com' } target={ "_blank" }>
//                 <span style={ { fontSize: '0.7em' } }>Términos y Condiciones </span>
//               </a>
//               <span style={ { fontSize: '0.7em' } }>y la </span>
//               <a style={ { color: 'blue', cursor: 'pointer' } } href={ 'http://google.com' }>
//                 <span style={ { fontSize: '0.7em' } }>Política de Privacidad</span>
//               </a>
//               <span style={ { fontSize: '0.7em' } }> confirmé los términos</span>
//             </div>
//           </div>

//           {/* Button SingUp */ }
//           <div style={ { marginLeft: '8.5%', marginTop: '1.5em', width: '22em', height: '2.5em', textAlign: 'center', backgroundColor: '#dce8f3', cursor: 'pointer', borderRadius: '5px' } }>
//             <span onClick={ register_click } style={ { fontSize: '1.2em', display: 'inline-block', marginTop: '0.5em' } } >Registrarse</span>
//           </div>
//         </div>
//         <div style={ { position: 'absolute', bottom: '1.5em', left: '38.5%' } }>
//           <span onClick={ showLogin } style={ { color: 'black', cursor: 'pointer', fontSize: '0.8em' } } >Ya estas registrado?</span>
//         </div>
//       </aside >
//     );
//   }
// }