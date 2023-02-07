var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';
import * as SharedStyle from '../../shared-style';
import { Prefs } from '../../proxies/export';

var STYLE = {
  display: 'none',
  width: '800px',
  height: '600px',
  backgroundColor: 'white',
  position: 'absolute',
  top: '10%',
  right: '32%',
  zIndex: '9006',
  border: '2px solid ' + SharedStyle.PRIMARY_COLOR.master,
  overflow: 'auto'
};

var BASE_STYLE_LABEL = {
  display: "block",
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master
};

var STYLE_INPUT = {
  display: 'block',
  height: '1.8em',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.COLORS.grey,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid ' + SharedStyle.PRIMARY_COLOR.master,
  outline: 'none',
  textAlign: 'right',
  width: '15%'
};

export default function MenuPreferencias(props) {
  var _useState = useState({
    prefs: [],
    prefsState: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    setState({ prefs: Prefs.getPrefsInfo(), prefsState: props.prefs });
  }, []);

  var _onChange = function _onChange(name, value) {
    var newPrefsState = state.prefsState;
    newPrefsState[name] = value;

    setState(function (prevState) {
      return _extends({}, prevState, { prefsState: newPrefsState });
    });

    props.projectActions.updatePreference(name, value);
  };

  return React.createElement(
    'div',
    { id: 'menuPreferencias', style: STYLE },
    React.createElement(
      'div',
      { style: { margin: '1em 2.5em' } },
      React.createElement(
        'h4',
        null,
        'Menu de Preferencias'
      ),
      React.createElement(
        'div',
        null,
        state.prefs.map(function (pref, i) {
          if (pref.typeValor === 'Texto') {
            return React.createElement(
              'div',
              { key: i },
              React.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', alignItems: 'center' } },
                React.createElement(
                  'label',
                  { style: _extends({}, BASE_STYLE_LABEL, { margin: '20px', width: '7em' }) },
                  pref.nombre
                ),
                React.createElement('input', { style: STYLE_INPUT, type: 'text',
                  onChange: function onChange(e) {
                    return _onChange(pref.nombre, e.target.value);
                  },
                  value: state.prefsState[pref.nombre],
                  name: pref.nombre
                }),
                React.createElement(
                  'p',
                  { style: _extends({}, BASE_STYLE_LABEL, { marginLeft: '1.5em' }) },
                  pref.descripcion
                )
              )
            );
          } else if (pref.typeValor === 'Booleano') {
            return React.createElement(
              'div',
              { key: i },
              React.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', alignItems: 'center' } },
                React.createElement(
                  'label',
                  { style: _extends({}, BASE_STYLE_LABEL, { margin: '20px', width: '7em' }) },
                  pref.nombre
                ),
                React.createElement(
                  'div',
                  { style: { display: 'flex' } },
                  React.createElement('input', { style: _extends({}, STYLE_INPUT, { width: '2em', margin: '0' }), type: 'checkbox',
                    onChange: function onChange(e) {
                      return _onChange(pref.nombre, e.target.checked);
                    },
                    checked: state.prefsState[pref.nombre],
                    name: pref.nombre
                  })
                ),
                React.createElement(
                  'p',
                  { style: _extends({}, BASE_STYLE_LABEL, { marginLeft: '1.5em' }) },
                  pref.descripcion
                )
              )
            );
          } else if (pref.typeValor === 'Entero') {
            return React.createElement(
              'div',
              { key: i },
              React.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', alignItems: 'center' } },
                React.createElement(
                  'label',
                  { style: _extends({}, BASE_STYLE_LABEL, { margin: '20px', width: '7em' }) },
                  pref.nombre
                ),
                React.createElement('input', { style: STYLE_INPUT, type: 'number',
                  onChange: function onChange(e) {
                    return _onChange(pref.nombre, e.target.value);
                  },
                  value: state.prefsState[pref.nombre],
                  name: pref.nombre
                }),
                React.createElement(
                  'p',
                  { style: _extends({}, BASE_STYLE_LABEL, { marginLeft: '1.5em' }) },
                  pref.descripcion
                )
              )
            );
          }
        })
      )
    )
  );
}

// export default class MenuPreferencias extends Component {

//   constructor ( props ) {
//     super( props );
//     this.state = {
//       prefs: [],
//       prefsState: {},
//     };
//     this.onChange = this.onChange.bind( this );
//     this.onChangeCheckbox = this.onChangeCheckbox.bind( this );
//   }

//   componentDidMount () {
//     this.setState( {
//       prefs: Prefs.getPrefsInfo(),
//       prefsState: this.props.prefs,
//     } );
//   }

//   onChange ( name, value ) {
//     let newPrefsState = this.state.prefsState;
//     newPrefsState[ name ] = value;

//     this.setState( {
//       ...this.state,
//       prefsState: newPrefsState
//     } );

//     this.props.projectActions.updatePreference( name, value );
//   }

//   onChangeCheckbox ( name, value ) {
//     let newPrefsState = this.state.prefsState;
//     newPrefsState[ name ] = value;

//     this.setState( {
//       ...this.state,
//       prefsState: newPrefsState
//     } );

//     this.props.projectActions.updatePreference( name, value );
//     /*console.log('newPrefs', this.state.prefsState)*/
//   }

//   render () {
//     return (
//       <div id={ 'menuPreferencias' } style={ STYLE }>
//         <div style={ { margin: '1em 2.5em' } }>
//           <h4>Menu de Preferencias</h4>
//           <div>
//             { this.state.prefs.map( ( pref, i ) => {
//               // let valueInput = this.state.prefsState[ pref.nombre ];

//               if ( pref.typeValor === 'Texto' ) {
//                 return <div key={ i }>
//                   <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
//                     <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
//                     <input style={ STYLE_INPUT } type={ 'text' } onChange={ ( e ) => this.onChange( pref.nombre, e.target.value ) } value={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
//                     <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
//                   </div>
//                 </div>;

//               } else if ( pref.typeValor === 'Booleano' ) {
//                 return <div key={ i }>
//                   <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
//                     <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
//                     <div style={ { display: 'flex' } }>
//                       <input style={ { ...STYLE_INPUT, width: '2em', margin: '0' } } type={ 'checkbox' } onChange={ ( e ) => this.onChangeCheckbox( pref.nombre, e.target.checked ) } checked={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
//                     </div>
//                     <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
//                   </div>
//                 </div>;

//               } else if ( pref.typeValor === 'Entero' ) {
//                 return <div key={ i }>
//                   <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
//                     <label style={ { ...BASE_STYLE_LABEL, margin: '20px', width: '7em' } }>{ pref.nombre }</label>
//                     <input style={ STYLE_INPUT } type={ 'number' } onChange={ ( e ) => this.onChange( pref.nombre, e.target.value ) } value={ this.state.prefsState[ pref.nombre ] } name={ pref.nombre } />
//                     <p style={ { ...BASE_STYLE_LABEL, marginLeft: '1.5em' } }>{ pref.descripcion }</p>
//                   </div>
//                 </div>;
//               }
//             } ) }
//           </div>
//         </div >
//       </ div >
//     );
//   }
// }