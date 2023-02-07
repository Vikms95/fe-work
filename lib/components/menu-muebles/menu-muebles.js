'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Muebles baño


// Lavabos y Encimeras


// Compakt


// Mamparas


// Platos de ducha


// Accesorios


exports.default = MenuMuebles;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

require('./style.css');

var _deleteCross = require('./../../assets/generalItems/deleteCross.png');

var _deleteCross2 = _interopRequireDefault(_deleteCross);

var _flecha = require('./../../assets/generalItems/flecha.png');

var _flecha2 = _interopRequireDefault(_flecha);

var _rectangulo = require('./../../assets/salgar/rectangulo.png');

var _rectangulo2 = _interopRequireDefault(_rectangulo);

var _mueblesBanyo = require('./../../assets/salgar/mueblesBanyo/mueblesBanyo.png');

var _mueblesBanyo2 = _interopRequireDefault(_mueblesBanyo);

var _fussionChrome = require('./../../assets/salgar/mueblesBanyo/fussionChrome.png');

var _fussionChrome2 = _interopRequireDefault(_fussionChrome);

var _fussionLine = require('./../../assets/salgar/mueblesBanyo/fussionLine.png');

var _fussionLine2 = _interopRequireDefault(_fussionLine);

var _mam = require('./../../assets/salgar/mueblesBanyo/mam.png');

var _mam2 = _interopRequireDefault(_mam);

var _monterrey = require('./../../assets/salgar/mueblesBanyo/monterrey.png');

var _monterrey2 = _interopRequireDefault(_monterrey);

var _spirit = require('./../../assets/salgar/mueblesBanyo/spirit.png');

var _spirit2 = _interopRequireDefault(_spirit);

var _uniiq = require('./../../assets/salgar/mueblesBanyo/uniiq.png');

var _uniiq2 = _interopRequireDefault(_uniiq);

var _ = require('./../../assets/salgar/mueblesBanyo/23275.png');

var _2 = _interopRequireDefault(_);

var _lavabos = require('./../../assets/salgar/lavabos/lavabos.png');

var _lavabos2 = _interopRequireDefault(_lavabos);

var _lavabos3 = require('./../../assets/salgar/lavabos/lavabos2.png');

var _lavabos4 = _interopRequireDefault(_lavabos3);

var _lavabosPosar = require('./../../assets/salgar/lavabos/lavabosPosar.png');

var _lavabosPosar2 = _interopRequireDefault(_lavabosPosar);

var _encimeras = require('./../../assets/salgar/lavabos/encimeras.png');

var _encimeras2 = _interopRequireDefault(_encimeras);

var _3 = require('./../../assets/salgar/lavabos/18687.png');

var _4 = _interopRequireDefault(_3);

var _compakt = require('./../../assets/salgar/compakt/compakt.png');

var _compakt2 = _interopRequireDefault(_compakt);

var _compaktFondo_ = require('./../../assets/salgar/compakt/compaktFondo_46.png');

var _compaktFondo_2 = _interopRequireDefault(_compaktFondo_);

var _compaktFondo_3 = require('./../../assets/salgar/compakt/compaktFondo_51.png');

var _compaktFondo_4 = _interopRequireDefault(_compaktFondo_3);

var _5 = require('./../../assets/salgar/compakt/24471.png');

var _6 = _interopRequireDefault(_5);

var _mamparas = require('./../../assets/salgar/mamparas/mamparas.png');

var _mamparas2 = _interopRequireDefault(_mamparas);

var _angular = require('./../../assets/salgar/mamparas/angular.png');

var _angular2 = _interopRequireDefault(_angular);

var _frontal = require('./../../assets/salgar/mamparas/frontal.png');

var _frontal2 = _interopRequireDefault(_frontal);

var _pasoLibre = require('./../../assets/salgar/mamparas/pasoLibre.png');

var _pasoLibre2 = _interopRequireDefault(_pasoLibre);

var _semicircular = require('./../../assets/salgar/mamparas/semicircular.png');

var _semicircular2 = _interopRequireDefault(_semicircular);

var _7 = require('./../../assets/salgar/mamparas/22443.png');

var _8 = _interopRequireDefault(_7);

var _platosDucha = require('./../../assets/salgar/platosDucha/platosDucha.png');

var _platosDucha2 = _interopRequireDefault(_platosDucha);

var _pompeya = require('./../../assets/salgar/platosDucha/pompeya.png');

var _pompeya2 = _interopRequireDefault(_pompeya);

var _rioja = require('./../../assets/salgar/platosDucha/rioja.png');

var _rioja2 = _interopRequireDefault(_rioja);

var _9 = require('./../../assets/salgar/platosDucha/23425.png');

var _10 = _interopRequireDefault(_9);

var _accesorios = require('./../../assets/salgar/accesorios/accesorios.png');

var _accesorios2 = _interopRequireDefault(_accesorios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  backgroundColor: SharedStyle.COLORS.white,
  display: 'none',
  position: 'absolute',
  height: '100%',
  width: '238px',
  borderRightStyle: 'solid',
  borderRightWidth: '2px',
  borderRightColor: SharedStyle.PRIMARY_COLOR.master,
  zIndex: '9005',
  overflow: 'hidden'
};

var STYLE_TITLE_BAR = {
  minHeight: '1.5em',
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white
};

var STYLE_TITLE = {
  margin: '0 0 0 20px',
  paddingTop: '0.3em',
  fontSize: '0.75em'
};

var STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

var STYLE_IMAGE = {
  cursor: 'pointer',
  width: '80px',
  height: '80px'
};

var STYLE_NAME = {
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
  margin: '0',
  marginTop: '10px',
  minHeight: '20px'

};

var STYLE_BREADCRUMB = {
  margin: '0 10px 0 20px',
  paddingTop: '0.25em',
  fontSize: '0.75em',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};

function MenuMuebles(props) {
  var _useState = (0, _react.useState)({
    currentShowElement: null,
    filterShowElement: null,
    breadcrumb: null,
    hoverBreadcrumb: false,
    matchString: '',
    mueblesBanyo: null,
    lavabos: null,
    mamparas: null,
    platosDucha: null,
    accesorios: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  //TODO Refactor into custom hook


  var matcharray = function matcharray(text) {
    if (text != '' && state.currentShowElement !== null) {
      var filtered = [];
      var array = state.currentShowElement;
      var regexp = new RegExp(text, 'i');

      for (var i = 0; i < array.length; i++) {
        if (regexp.test(array[i].info.title)) {
          filtered.push(array[i]);
        }
      }

      setState(function (prevState) {
        return _extends({}, prevState, {
          matchString: text,
          filterShowElement: filtered
        });
      });
    } else {
      setState(function (prevState) {
        return _extends({}, prevState, {
          filterShowElement: null
        });
      });
    }
  };

  var closeMenuMuebles = function closeMenuMuebles() {
    document.getElementById('menuMuebles').style.display = 'none';
  };

  var printItems = function printItems(elements) {
    return _react2.default.createElement(
      'div',
      {
        style: {
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          textAlign: 'center',
          columnGap: '20px'
        }
      },
      elements && elements.map(function (element, key) {
        return _react2.default.createElement(
          'div',
          {
            key: key,
            style: { cursor: 'pointer', paddingTop: '10px' },
            onClick: element.action ? element.action : null
          },
          _react2.default.createElement(
            'div',
            { style: { position: 'relative' } },
            _react2.default.createElement('img', {
              className: 'rectangulo',
              src: _rectangulo2.default,
              style: { marginLeft: key % 2 === 0 ? '-1.5em' : '-0.9em', minHeight: '100%' }
            }),
            _react2.default.createElement('img', { src: element.image, style: STYLE_IMAGE }),
            _react2.default.createElement(
              'p',
              { style: STYLE_NAME },
              element.name
            )
          )
        );
      })
    );
  };

  var selectFusionChrome = function selectFusionChrome() {
    // TODO: Cambiar idioma
    var newBreadcrumb = function newBreadcrumb() {
      var simbol = ' > ';
      var text1 = 'Muebles baño';
      var text2 = 'Fusion Chrome';

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          { className: 'breadcrumb2',
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: elementsMueblesBanyo,
                  breadcrumb: ' > Muebles baño'
                });
              });
            }
          },
          text1
        ),
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          null,
          text2
        )
      );
    };

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: newBreadcrumb(),
        currentShowElement: [{ image: _2.default, name: '23275' }]
      });
    });
  };

  var selectMueblesBanyo = function selectMueblesBanyo() {
    // TODO: Cambiar idioma
    var text = ' > Muebles baño';

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: elementsMueblesBanyo
      });
    });
  };

  var selectLavabo2 = function selectLavabo2() {
    // TODO: Cambiar idioma
    var newBreadcrumb = function newBreadcrumb() {
      var simbol = ' > ';
      var text1 = 'Lavabos y Encimeras';
      var text2 = 'Lavabos';

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          { className: 'breadcrumb2',
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: elementsLavabo,
                  breadcrumb: ' > Lavabos'
                });
              });
            }
          },
          text1
        ),
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          null,
          text2
        )
      );
    };

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: newBreadcrumb(),
        currentShowElement: [{ image: _4.default, name: '18687' }]
      });
    });
  };

  var selectLavabo = function selectLavabo() {
    // TODO: Cambiar idioma
    var text = ' > Lavabos y Encimeras';

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: elementsLavabo
      });
    });
  };

  var selectCompakt46 = function selectCompakt46() {
    // TODO: Cambiar idioma
    var newBreadcrumb = function newBreadcrumb() {
      var simbol = ' > ';
      var text1 = 'Compakt';
      var text2 = 'Compakt 46';

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          { className: 'breadcrumb2',
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: elementsCompakt,
                  breadcrumb: ' > Compakt'
                });
              });
            }
          },
          text1
        ),
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          null,
          text2
        )
      );
    };

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: newBreadcrumb(),
        currentShowElement: [{ image: _6.default, name: '24471' }]
      });
    });
  };

  var selectCompakt = function selectCompakt() {
    // TODO: Cambiar idioma
    var text = ' > Compakt';
    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: elementsCompakt
      });
    });
  };

  var selectFrontal = function selectFrontal() {
    // TODO: Cambiar idioma
    var newBreadcrumb = function newBreadcrumb() {
      var simbol = ' > ';
      var text1 = 'Mamparas';
      var text2 = 'Frontal';

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          { className: 'breadcrumb2',
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: elementsMamparas,
                  breadcrumb: ' > Mamparas',
                  hoverBreadcrumb2: false
                });
              });
            }
          },
          text1
        ),
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          null,
          text2
        )
      );
    };

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: newBreadcrumb(),
        currentShowElement: [{ image: _8.default, name: '22443' }]
      });
    });
  };

  var selectMamparas = function selectMamparas() {
    // TODO: Cambiar idioma
    var text = ' > Mamparas';

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: elementsMamparas
      });
    });
  };

  // SECTION PLATOS DUCHA
  var selectRioja = function selectRioja() {
    // TODO: Cambiar idioma
    var newBreadcrumb = function newBreadcrumb() {
      var simbol = ' > ';
      var text1 = 'Platos de ducha';
      var text2 = 'Rioja';

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          {
            className: 'breadcrumb2',
            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: elementsPlatosDucha,
                  breadcrumb: ' > Platos de ducha',
                  hoverBreadcrumb2: false
                });
              });
            }
          },
          text1
        ),
        _react2.default.createElement(
          'span',
          null,
          simbol
        ),
        _react2.default.createElement(
          'span',
          null,
          text2
        )
      );
    };

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: newBreadcrumb(),
        currentShowElement: [{ image: _10.default, name: '23425' }]
      });
    });
  };

  var selectPlatosDucha = function selectPlatosDucha() {
    // TODO: Cambiar idioma
    var text = ' > Platos de ducha';

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: elementsPlatosDucha
      });
    });
  };

  var selectAccesorios = function selectAccesorios() {
    // TODO: Cambiar idioma
    var text = ' > Accesorios';

    setState(function (prevState) {
      return _extends({}, prevState, {
        breadcrumb: _react2.default.createElement(
          'span',
          null,
          text
        ),
        currentShowElement: []
      });
    });
  };

  var elementsMueblesBanyo = [{ image: _fussionChrome2.default, name: 'Fusion Chrome', action: selectFusionChrome }, { image: _fussionLine2.default, name: 'Fussion Line' }, { image: _mam2.default, name: 'Mam' }, { image: _monterrey2.default, name: 'Monterrey' }, { image: _spirit2.default, name: 'Spirit' }, { image: _uniiq2.default, name: 'UNiiq' }];

  var elementsLavabo = [{ image: _lavabos4.default, name: 'Lavabos', action: selectLavabo2 }, { image: _lavabosPosar2.default, name: 'Lavabos de posar' }, { image: _encimeras2.default, name: 'Encimeras' }];

  var elementsCompakt = [{ image: _compaktFondo_2.default, name: 'Compakt Fondo 46', action: selectCompakt46 }, { image: _compaktFondo_4.default, name: 'Compakt Fondo 51' }];

  var elementsMamparas = [{ image: _frontal2.default, name: 'Frontal', action: selectFrontal }, { image: _angular2.default, name: 'Angular' }, { image: _pasoLibre2.default, name: 'Paso Libre' }, { image: _semicircular2.default, name: 'Semicircular' }];

  var elementsPlatosDucha = [{ image: _rioja2.default, name: 'Rioja', action: selectRioja }, { image: _pompeya2.default, name: 'Pompeya' }];

  return _react2.default.createElement(
    'aside',
    { id: 'menuMuebles', style: STYLE },
    _react2.default.createElement(
      'div',
      { style: STYLE_TITLE_BAR },
      state.breadcrumb === null ? _react2.default.createElement(
        'p',
        { style: STYLE_BREADCRUMB },
        'Ba\xF1o Salgar'
      ) : _react2.default.createElement(
        'p',
        { style: STYLE_BREADCRUMB },
        _react2.default.createElement(
          'span',
          {
            style: state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {},

            onMouseEnter: function onMouseEnter() {
              return setState(function (prevState) {
                return _extends({}, prevState, { hoverBreadcrumb: true });
              });
            },

            onMouseLeave: function onMouseLeave() {
              return setState(function (prevState) {
                return _extends({}, prevState, { hoverBreadcrumb: false });
              });
            },

            onClick: function onClick() {
              setState(function (prevState) {
                return _extends({}, prevState, {
                  currentShowElement: null,
                  breadcrumb: null,
                  hoverBreadcrumb: false
                });
              });
            }
          },
          'Ba\xF1o Salgar'
        ),
        state.breadcrumb
      ),
      _react2.default.createElement('img', {
        style: STYLE_BUTTON_CLOSE,
        src: _deleteCross2.default,
        onClick: closeMenuMuebles
      })
    ),
    _react2.default.createElement(
      'div',
      { style: { margin: '0 20px' } },
      _react2.default.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', marginTop: '10px' } },
        _react2.default.createElement('input', {
          style: { width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' },
          type: 'text',
          placeholder: 'Buscar...',
          onChange: function onChange(e) {
            matcharray(e.target.value);
          }
        }),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer' } },
          _react2.default.createElement(
            'p',
            { style: {
                fontSize: '0.75em',
                color: SharedStyle.PRIMARY_COLOR.master,
                width: '10em'
              }
            },
            'B\xFAsqueda Avanzada'
          ),
          _react2.default.createElement('img', { style: { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em' }, src: _flecha2.default })
        ),
        state.currentShowElement === null ? _react2.default.createElement(
          'div',
          { style: { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } },
          _react2.default.createElement(
            'div',
            { onClick: selectMueblesBanyo, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-1.5em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _mueblesBanyo2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Muebles Ba\xF1o'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: selectLavabo, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-0.9em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _lavabos2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Lavabos y Encimeras'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: selectCompakt, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-1.5em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _compakt2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Compakt'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: selectMamparas, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-0.9em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _mamparas2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Mamparas'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: selectPlatosDucha, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-1.5em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _platosDucha2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Platos de ducha'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: selectAccesorios, style: { cursor: 'pointer', paddingTop: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { position: 'relative' } },
              _react2.default.createElement('img', { className: 'rectangulo', src: _rectangulo2.default, style: { marginLeft: '-0.9em', minHeight: '100%' } }),
              _react2.default.createElement('img', { src: _accesorios2.default, style: STYLE_IMAGE }),
              _react2.default.createElement(
                'p',
                { style: STYLE_NAME },
                'Accesorios'
              )
            )
          )
        ) : state.filterShowElement === null ? printItems(state.currentShowElement) : printItems(state.filterShowElement)
      )
    )
  );
}

// export default class MenuMuebles extends Component {

//   constructor ( props ) {
//     super( props );
//     const mueblesElements = this.props.catalog.getCategory( 'muebles' ).elements.filter( element => element.info.visibility ? element.info.visibility.catalog : true );
//     /*this.state = {
//       currentShowElement: mueblesElements,
//       filterShowElement: null,
//       matchString: '',
//     }*/
//     this.state = {
//       currentShowElement: null,
//       filterShowElement: null,
//       breadcrumb: null,
//       hoverBreadcrumb: false,
//       matchString: '',
//       mueblesBanyo: null,
//       lavabos: null,
//       mamparas: null,
//       platosDucha: null,
//       accesorios: null,
//     };
//   }


//   render () {
//     const matcharray = ( text ) => {
//       if ( text != '' && this.state.currentShowElement !== null ) {
//         console.log( 'enter' );
//         let array = this.state.currentShowElement;
//         let filtered = [];
//         let regexp = new RegExp( text, 'i' );
//         for ( let i = 0; i < array.length; i++ ) {
//           if ( regexp.test( array[ i ].info.title ) ) {
//             filtered.push( array[ i ] );
//           }
//         }

//         this.setState( {
//           matchString: text,
//           filterShowElement: filtered
//         } );
//       } else {
//         this.setState( {
//           filterShowElement: null
//         } );

//       }

//     };

//     const closeMenuMuebles = () => {
//       document.getElementById( 'menuMuebles' ).style.display = 'none';
//     };

//     /*  const printItems = (elements) => {
//         return <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' }}>
//           {
//             elements.map((element, key) => {
//               return <div
//                 key={key}
//                 style={{ cursor: 'pointer', width: '80px' }}
//                 onClick={() => {
//                   this.props.itemsActions.selectToolDrawingItem(element.name);
//                 }}
//               >
//                 <img src={element.info.image} style={STYLE_IMAGE} />
//                 <p style={STYLE_NAME}>{element.name}</p>
//               </div>
//             })
//           }
//         </div>
//       }*/

//     const printItems = ( elements ) => {
//       return <div style={ {
//         marginTop: '20px',
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         textAlign: 'center',
//         columnGap: '20px',
//       } }>
//         {
//           elements.map( ( element, key ) => {
//             return <div
//               key={ key }
//               style={ { cursor: 'pointer', paddingTop: '10px' } }
//               onClick={ element.action ? element.action : null }
//             >
//               <div style={ { position: 'relative' } }>
//                 <img
//                   className='rectangulo'
//                   src={ img_rectangulo }
//                   style={ { marginLeft: key % 2 === 0 ? '-1.5em' : '-0.9em', minHeight: '100%' } }
//                 />

//                 <img src={ element.image } style={ STYLE_IMAGE } />
//                 <p style={ STYLE_NAME }>{ element.name }</p>
//               </div>
//             </div>;
//           } )
//         }
//       </div>;
//     };


//     // SECTION MUEBLES
//     const selectFusionChrome = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Muebles baño';
//         const text2 = 'Fusion Chrome';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsMueblesBanyo, breadcrumb: ' > Muebles baño', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_23275, name: '23275', },
//         ],
//       } );
//     };

//     const elementsMueblesBanyo = [
//       { image: img_fusionChrome, name: 'Fusion Chrome', action: selectFusionChrome },
//       { image: img_fussionLine, name: 'Fussion Line', },
//       { image: img_mam, name: 'Mam', },
//       { image: img_monterrey, name: 'Monterrey', },
//       { image: img_spirit, name: 'Spirit', },
//       { image: img_uniiq, name: 'UNiiq', },
//     ];

//     const selectMueblesBanyo = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Muebles baño';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsMueblesBanyo
//       } );
//     };

//     // SECTION LAVABO
//     const selectLavabo2 = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Lavabos y Encimeras';
//         const text2 = 'Lavabos';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsLavabo, breadcrumb: ' > Lavabos', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_18687, name: '18687', },
//         ],
//       } );
//     };

//     const elementsLavabo = [
//       { image: img_lavabos2, name: 'Lavabos', action: selectLavabo2 },
//       { image: img_lavabosPosar, name: 'Lavabos de posar', },
//       { image: img_encimeras, name: 'Encimeras', },
//     ];

//     const selectLavabo = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Lavabos y Encimeras';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsLavabo
//       } );
//     };

//     // SECTION COMPAKT
//     const selectCompakt46 = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Compakt';
//         const text2 = 'Compakt 46';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsCompakt, breadcrumb: ' > Compakt', } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_24471, name: '24471', },
//         ],
//       } );
//     };

//     const elementsCompakt = [
//       { image: img_compaktFondo46, name: 'Compakt Fondo 46', action: selectCompakt46 },
//       { image: img_compaktFondo51, name: 'Compakt Fondo 51', },
//     ];

//     const selectCompakt = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Compakt';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsCompakt
//       } );
//     };

//     // SECTION MAMPARAS
//     const selectFrontal = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Mamparas';
//         const text2 = 'Frontal';
//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsMamparas, breadcrumb: ' > Mamparas', hoverBreadcrumb2: false } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_22443, name: '22443', },
//         ],
//       } );
//     };

//     const elementsMamparas = [
//       { image: img_frontal, name: 'Frontal', action: selectFrontal },
//       { image: img_angular, name: 'Angular', },
//       { image: img_pasoLibre, name: 'Paso Libre', },
//       { image: img_semicircular, name: 'Semicircular', },
//     ];

//     const selectMamparas = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Mamparas';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsMamparas
//       } );
//     };

//     // SECTION PLATOS DUCHA
//     const selectRioja = () => {
//       // TODO: Cambiar idioma
//       let newBreadcrumb = () => {
//         const simbol = ' > ';
//         const text1 = 'Platos de ducha';
//         const text2 = 'Rioja';

//         return <span>
//           <span>{ simbol }</span>
//           <span className={ 'breadcrumb2' }
//             onClick={ () => { this.setState( { currentShowElement: elementsPlatosDucha, breadcrumb: ' > Platos de ducha', hoverBreadcrumb2: false } ); } }
//           >
//             { text1 }
//           </span>
//           <span>{ simbol }</span>
//           <span>{ text2 }</span>
//         </span>;
//       };

//       this.setState( {
//         breadcrumb: newBreadcrumb(),
//         currentShowElement: [
//           { image: img_23425, name: '23425', },
//         ],
//       } );
//     };

//     const elementsPlatosDucha = [
//       { image: img_rioja, name: 'Rioja', action: selectRioja },
//       { image: img_pompeya, name: 'Pompeya', },
//     ];

//     const selectPlatosDucha = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Platos de ducha';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: elementsPlatosDucha
//       } );
//     };

//     const selectAccesorios = () => {
//       // TODO: Cambiar idioma
//       const text = ' > Accesorios';
//       this.setState( {
//         breadcrumb: <span>{ text }</span>,
//         currentShowElement: []
//       } );
//     };

//     return (
//       /* <aside id='menuMuebles' style={STYLE}>
//          {*//* Initial Bar *//*}
// <div style={STYLE_TITLE_BAR}>
// <p style={STYLE_TITLE}>
// Muebles
// </p>
// <img style={STYLE_BUTTON_CLOSE} src={close} onClick={closeMenuMuebles} />
// </div>
// {*//* Search *//*}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <div style={{ margin: '0 20px 0 20px' }}>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.4em' }} >
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <input
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         style={{ width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' }}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         type="text"
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         placeholder='Buscar...'
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         onChange={(e) => { matcharray(e.target.value) }}
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       />
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <div style={{ display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer' }}>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <p style={{
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           fontSize: '0.75em',
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           color: SharedStyle.PRIMARY_COLOR.master,
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           width: '10em',
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }}>Búsqueda Avanzada</p>
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <img style={{ height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', }} src={flecha} />
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       </div>

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       {*//* Objects *//*}
// {
// this.state.filterShowElement === null ?
// printItems(this.state.currentShowElement)
// :
// printItems(this.state.filterShowElement)

// }
// </div>
// </div>
// </aside >*/
//       <aside id='menuMuebles' style={ STYLE }>
//         {/* Barra Inicial */ }
//         <div style={ STYLE_TITLE_BAR }>
//           {
//             this.state.breadcrumb === null ?
//               <p style={ STYLE_BREADCRUMB }>
//                 Baño Salgar
//               </p>
//               :
//               <p style={ STYLE_BREADCRUMB }>
//                 <span
//                   style={ this.state.hoverBreadcrumb ? { textDecoration: 'underline', cursor: 'pointer' } : {} }
//                   onMouseEnter={ () => this.setState( { hoverBreadcrumb: true } ) }
//                   onMouseLeave={ () => this.setState( { hoverBreadcrumb: false } ) }
//                   onClick={ () => { this.setState( { currentShowElement: null, breadcrumb: null, hoverBreadcrumb: false } ); } }
//                 >
//                   Baño Salgar
//                 </span>
//                 { this.state.breadcrumb }
//               </p>
//           }
//           <img
//             style={ STYLE_BUTTON_CLOSE }
//             src={ img_close }
//             onClick={ ( e ) => {
//               closeMenuMuebles();
//             } }
//           />
//         </div>
//         {/* Search */ }
//         <div style={ { margin: '0 20px' } }>
//           <div style={ { display: 'flex', flexDirection: 'column', marginTop: '10px' } } >
//             <input
//               style={ { width: 'auto', height: '1.8em', color: SharedStyle.COLORS.grey, fontFamily: 'Calibri', fontWidth: 'lighter' } }
//               type="text"
//               placeholder='Buscar...'
//               onChange={ ( e ) => { matcharray( e.target.value ); } }
//             />
//             <div style={ { display: 'flex', justifyItems: 'center', width: '10em', height: '25px', cursor: 'pointer', } }>
//               <p style={ {
//                 fontSize: '0.75em',
//                 color: SharedStyle.PRIMARY_COLOR.master,
//                 width: '10em',
//               } }>Búsqueda Avanzada</p>
//               <img style={ { height: '0.65em', marginTop: '0.85em', marginLeft: '0.2em', } } src={ img_flecha } />
//             </div>

//             {/* Objects */ }
//             {
//               this.state.currentShowElement === null ?
//                 <div style={ { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', columnGap: '20px' } }>
//                   <div onClick={ selectMueblesBanyo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_mueblesBanyo } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Muebles Baño</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectLavabo } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_lavabos } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Lavabos y Encimeras</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectCompakt } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_compakt } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Compakt</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectMamparas } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_mamparas } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Mamparas</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectPlatosDucha } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-1.5em', minHeight: '100%' } } />
//                       <img src={ img_platosDucha } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Platos de ducha</p>
//                     </div>
//                   </div>
//                   <div onClick={ selectAccesorios } style={ { cursor: 'pointer', paddingTop: '10px' } }>
//                     <div style={ { position: 'relative' } }>
//                       <img className={ 'rectangulo' } src={ img_rectangulo } style={ { marginLeft: '-0.9em', minHeight: '100%' } } />
//                       <img src={ img_accesorios } style={ STYLE_IMAGE } />
//                       <p style={ STYLE_NAME }>Accesorios</p>
//                     </div>
//                   </div>
//                 </div>
//                 :
//                 (
//                   this.state.filterShowElement === null ?
//                     printItems( this.state.currentShowElement )
//                     :
//                     printItems( this.state.filterShowElement )
//                 )
//             }
//           </div>
//         </div>
//       </aside >
//     );
//   }
// }