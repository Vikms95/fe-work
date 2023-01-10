import React, { useState } from "react";
import * as SharedStyle from '../../shared-style';
import { Auth } from '../../proxies/export';

const STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  zIndex: '9006',
  width: '28em',
  height: '32em',
  border: '1px solid black',
  top: '-0.5em',
  right: '2em',
  textAlign: 'left',
};

const STYLE_LABEL = {
  fontSize: '0.8em',
  color: 'black',
  fontWeight: 'bold'
};

const STYLE_INPUT = {
  height: '1.8em',
  width: '13em',
};

const STYLE_FIRST_COLUMN = {
  marginTop: '0.1em',
};

const STYLE_SECOND_COLUMN = {
  marginTop: '0.1em',
  marginLeft: '2.8em',
};

export default function RegisterComponent () {
  const [ state, setState ] = useState( {
    nombre: '',
    apellidos: '',
    direccion: '',
    cpostal: '',
    telefono: '',
    correo: '',
    correoConfirmar: '',
    password: '',
    passwordConfirmar: '',
    confirmarTerminos: false,
  } );


  const register = () => {
    let proxy = new Auth.AutenticateProxy();

    proxy.register( {
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
    }
    ).then( data => {
      document.getElementById( 'userRegister' ).style.display = 'none';
      alert( data.message );
    }
    ).catch( error => {
      alert( error.detail || error.statusText || error.status || error );
    } );
  };

  const showLogin = () => {
    document.getElementById( 'userRegister' ).style.display = 'none';
    document.getElementById( 'userLogin' ).style.display = 'block';
  };

  return (
    <aside id='userRegister' style={ STYLE }>
      <div style={ { height: '1.5em', margin: '1.4em', borderBottom: '1px solid black', } }>
        <span style={ { fontWeight: 'bold', color: 'black', fontSize: '1.25em', letterSpacing: '-0.05em' } }>
          Registrate
        </span>
      </div>

      <div style={ { position: 'absolute', top: '4em', left: '1.4em', width: '17.5em' } }>
        <table style={ { width: '25em' } }>
          <tbody style={ { boxSizing: 'border-box' } }>
            <tr>
              <td>
                <div style={ STYLE_FIRST_COLUMN }>
                  <span style={ STYLE_LABEL }>Nombre</span>
                  <input
                    style={ STYLE_INPUT }
                    maxLength={ 50 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, nombre: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
              <td>
                <div style={ STYLE_SECOND_COLUMN }>
                  <span style={ STYLE_LABEL }>Apellidos</span>
                  <input
                    style={ STYLE_INPUT }
                    maxLength={ 50 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, apellidos: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={ STYLE_FIRST_COLUMN }>
                  <span style={ STYLE_LABEL }>Dirección</span>
                  <input
                    style={ STYLE_INPUT }
                    maxLength={ 50 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, direccion: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
              <td>
                <div style={ STYLE_SECOND_COLUMN }>
                  <span style={ STYLE_LABEL }>Código postal</span>
                  <input
                    style={ STYLE_INPUT }
                    type={ 'number' }
                    maxLength={ 5 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, cpostal: e.target.value } )
                    ) } />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={ STYLE_FIRST_COLUMN }>
                  <span style={ STYLE_LABEL }>Teléfono</span>
                  <input
                    style={ STYLE_INPUT }
                    type={ 'number' }
                    maxLength={ 15 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, telefono: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={ STYLE_FIRST_COLUMN }>
                  <span style={ STYLE_LABEL }>Correo</span>
                  <input
                    style={ STYLE_INPUT }
                    maxLength={ 274 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, correo: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={ STYLE_FIRST_COLUMN }>
                  <span style={ STYLE_LABEL }>Contraseña</span>
                  <input
                    type={ "password" }
                    style={ STYLE_INPUT }
                    minLength={ 6 }
                    maxLength={ 20 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, password: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
              <td>
                <div style={ STYLE_SECOND_COLUMN }>
                  <span style={ STYLE_LABEL }>Confirma la contraseña</span>
                  <input
                    style={ STYLE_INPUT }
                    type={ "password" }
                    minLength={ 6 }
                    maxLength={ 20 }
                    onChange={ e => setState( ( prevState ) => (
                      { ...prevState, passwordConfirmar: e.target.value }
                    ) ) }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>

        {/* Accept use conditions */ }
        <div style={ { marginTop: '0.3em', borderTop: '1px solid black', width: '25em' } }>
          <div style={ { marginTop: '0.7em' } }>
            <input
              type={ "checkbox" }
              checked={ state.confirmarTerminos }
              onChange={ e => setState( ( prevState ) => (
                { ...prevState, confirmarTerminos: e.target.checked }
              ) ) }
            />
            <a>
              <span style={ { fontSize: '0.7em' } }>Se aplican nuestros</span>
            </a>
            <a style={ { color: 'blue', cursor: 'pointer' } } href={ 'http://google.com' } target={ "_blank" }>
              <span style={ { fontSize: '0.7em' } }>Términos y Condiciones </span>
            </a>
            <span style={ { fontSize: '0.7em' } }>y la </span>
            <a style={ { color: 'blue', cursor: 'pointer' } } href={ 'http://google.com' }>
              <span style={ { fontSize: '0.7em' } }>Política de Privacidad</span>
            </a>
            <span style={ { fontSize: '0.7em' } }> confirmé los términos</span>
          </div>
        </div>

        <div style={ { marginLeft: '8.5%', marginTop: '1.5em', width: '22em', height: '2.5em', textAlign: 'center', backgroundColor: '#dce8f3', cursor: 'pointer', borderRadius: '5px' } }>
          <span onClick={ register } style={ { fontSize: '1.2em', display: 'inline-block', marginTop: '0.5em' } } >Registrarse</span>
        </div>
      </div>
      <div style={ { position: 'absolute', bottom: '1.5em', left: '38.5%' } }>
        <span onClick={ showLogin } style={ { color: 'black', cursor: 'pointer', fontSize: '0.8em' } } >Ya estas registrado?</span>
      </div>
    </aside >
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
