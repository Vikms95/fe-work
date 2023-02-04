import React, { Component } from 'react';
import { MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE } from '../../constants';
import * as SharedStyle from '../../shared-style';
import './style.css';

// Imports de imagenes
import cuadrada from './../../assets/rooms/cuadrada.png';
import Lderecha1 from './../../assets/rooms/Lderecha1.png';
import Lizquierda1 from './../../assets/rooms/Lizquierda1.png';
import L1 from './../../assets/rooms/L1.png';
import Recta from './../../assets/rooms/Recta.png';
import lapiz from './../../assets/rooms/Lapiz2.png';
import close from './../../assets/generalItems/deleteCross.png';
import rectangulo from './../../assets/salgar/rectangulo.png';

import { useDrawMode } from '../../hooks/useDrawMode';

const STYLE = {
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

const STYLE_TITLE_BAR = {
  height: '1.5em',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: SharedStyle.PRIMARY_COLOR.master,
  color: SharedStyle.COLORS.white,

};

const STYLE_TITLE = {
  margin: '0 0 0 20px',
  paddingTop: '0.3em',
  fontSize: '0.75em',
};

const STYLE_BUTTON_CLOSE = {
  margin: '0.3em 3px 0 0',
  height: '0.6em',
  cursor: 'pointer'
};

const STYLE_CONT_IMAGE = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'column',
  display: 'flex',
  padding: '0px 10px 0px 20px',
  cursor: 'pointer',
};

const STYLE_NAME = {
  margin: '10px 0',
  fontSize: '0.75em',
  color: SharedStyle.PRIMARY_COLOR.master,
};

// export default function MenuRooms ( props ) {
//   const isDrawMode = useDrawMode( props.state );

//   const loadProjectFromFile = ( event ) => {
//     event.preventDefault();

//     let roomSelected = '';
//     const roomName = event.target.getAttribute( 'roomjson' );

//     if ( roomName === 'cuadrada' ) {
//       roomSelected = {
//         "unit": "mm",
//         "layers": {
//           "layer-1": {
//             "id": "layer-1",
//             "altitude": 0,
//             "order": 0,
//             "opacity": 1,
//             "name": "default",
//             "visible": true,
//             "vertices": {
//               "y7NDSNW0PK": {
//                 "id": "y7NDSNW0PK",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 302.7593085106383,
//                 "y": 1597.807845744681,
//                 "lines": [
//                   "aQ9sVf8m3",
//                   "aQ9sVf8m3",
//                   "w1CafL0qmF"
//                 ],
//                 "areas": []
//               },
//               "whjvk8A36A": {
//                 "id": "whjvk8A36A",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 1312.7593085106382,
//                 "y": 1607.807845744681,
//                 "lines": [
//                   "aQ9sVf8m3",
//                   "HQcfEH4Y2L"
//                 ],
//                 "areas": []
//               },
//               "pOMnRtY5l": {
//                 "id": "pOMnRtY5l",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 1302.759308510638,
//                 "y": 597.8078457446809,
//                 "lines": [
//                   "HQcfEH4Y2L",
//                   "fRwmTiE_pT",
//                   "fRwmTiE_pT"
//                 ],
//                 "areas": []
//               },
//               "Rxjm9KWHHO": {
//                 "id": "Rxjm9KWHHO",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 292.7593085106383,
//                 "y": 1607.807845744681,
//                 "lines": [
//                   "w1CafL0qmF",
//                   "aQ9sVf8m3"
//                 ],
//                 "areas": []
//               },
//               "nNdBliFIZp": {
//                 "id": "nNdBliFIZp",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 1312.759308510638,
//                 "y": 587.8078457446809,
//                 "lines": [
//                   "HQcfEH4Y2L",
//                   "fRwmTiE_pT"
//                 ],
//                 "areas": []
//               },
//               "hDwSQdxAJ": {
//                 "id": "hDwSQdxAJ",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 1302.7593085106382,
//                 "y": 1597.807845744681,
//                 "lines": [
//                   "aQ9sVf8m3",
//                   "HQcfEH4Y2L",
//                   "HQcfEH4Y2L"
//                 ],
//                 "areas": []
//               },
//               "3UY5UQmVZ": {
//                 "id": "3UY5UQmVZ",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 302.759308510638,
//                 "y": 597.807845744681,
//                 "lines": [
//                   "fRwmTiE_pT",
//                   "w1CafL0qmF",
//                   "w1CafL0qmF"
//                 ],
//                 "areas": []
//               },
//               "UJ3Wr1AAcD": {
//                 "id": "UJ3Wr1AAcD",
//                 "type": "",
//                 "prototype": "vertices",
//                 "name": "Vertex",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "x": 292.759308510638,
//                 "y": 587.807845744681,
//                 "lines": [
//                   "fRwmTiE_pT",
//                   "w1CafL0qmF"
//                 ],
//                 "areas": []
//               }
//             },
//             "lines": {
//               "aQ9sVf8m3": {
//                 "id": "aQ9sVf8m3",
//                 "type": "wall",
//                 "prototype": "lines",
//                 "name": "Wall",
//                 "description": "Wall with bricks or painted",
//                 "image": "catalog/lines/wall/wall.png",
//                 "misc": {
//                   "_unitLength": "mm"
//                 },
//                 "selected": false,
//                 "properties": {
//                   "height": {
//                     "length": 250
//                   },
//                   "thickness": {
//                     "length": 10
//                   },
//                   "textureA": "bricks",
//                   "textureB": "bricks"
//                 },
//                 "visible": true,
//                 "vertices": [
//                   "y7NDSNW0PK",
//                   "hDwSQdxAJ",
//                   "Rxjm9KWHHO",
//                   "whjvk8A36A"
//                 ],
//                 "holes": [],
//                 "perimeter": "4vqPpWATtT",
//                 "v2First": false
//               },
//               "HQcfEH4Y2L": {
//                 "id": "HQcfEH4Y2L",
//                 "type": "wall",
//                 "prototype": "lines",
//                 "name": "Wall",
//                 "description": "Wall with bricks or painted",
//                 "image": "catalog/lines/wall/wall.png",
//                 "misc": {
//                   "_unitLength": "mm"
//                 },
//                 "selected": false,
//                 "properties": {
//                   "height": {
//                     "length": 250
//                   },
//                   "thickness": {
//                     "length": 10
//                   },
//                   "textureA": "bricks",
//                   "textureB": "bricks"
//                 },
//                 "visible": true,
//                 "vertices": [
//                   "hDwSQdxAJ",
//                   "pOMnRtY5l",
//                   "whjvk8A36A",
//                   "nNdBliFIZp"
//                 ],
//                 "holes": [],
//                 "perimeter": "4vqPpWATtT",
//                 "v2First": false
//               },
//               "fRwmTiE_pT": {
//                 "id": "fRwmTiE_pT",
//                 "type": "wall",
//                 "prototype": "lines",
//                 "name": "Wall",
//                 "description": "Wall with bricks or painted",
//                 "image": "catalog/lines/wall/wall.png",
//                 "misc": {
//                   "_unitLength": "mm"
//                 },
//                 "selected": false,
//                 "properties": {
//                   "height": {
//                     "length": 250
//                   },
//                   "thickness": {
//                     "length": 10
//                   },
//                   "textureA": "bricks",
//                   "textureB": "bricks"
//                 },
//                 "visible": true,
//                 "vertices": [
//                   "pOMnRtY5l",
//                   "3UY5UQmVZ",
//                   "nNdBliFIZp",
//                   "UJ3Wr1AAcD"
//                 ],
//                 "holes": [],
//                 "perimeter": "4vqPpWATtT",
//                 "v2First": false
//               },
//               "w1CafL0qmF": {
//                 "id": "w1CafL0qmF",
//                 "type": "wall",
//                 "prototype": "lines",
//                 "name": "Wall",
//                 "description": "Wall with bricks or painted",
//                 "image": "catalog/lines/wall/wall.png",
//                 "misc": {
//                   "_unitLength": "mm"
//                 },
//                 "selected": false,
//                 "properties": {
//                   "height": {
//                     "length": 250
//                   },
//                   "thickness": {
//                     "length": 10
//                   },
//                   "textureA": "bricks",
//                   "textureB": "bricks"
//                 },
//                 "visible": true,
//                 "vertices": [
//                   "3UY5UQmVZ",
//                   "y7NDSNW0PK",
//                   "UJ3Wr1AAcD",
//                   "Rxjm9KWHHO"
//                 ],
//                 "holes": [],
//                 "perimeter": "4vqPpWATtT",
//                 "v2First": false
//               }
//             },
//             "holes": {},
//             "areas": {
//               "PZeCOVP48g": {
//                 "id": "PZeCOVP48g",
//                 "type": "area",
//                 "prototype": "areas",
//                 "name": "Area",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {
//                   "patternColor": "#F5F4F4",
//                   "thickness": {
//                     "length": 0
//                   },
//                   "texture": "none"
//                 },
//                 "visible": true,
//                 "vertices": [
//                   "y7NDSNW0PK",
//                   "3UY5UQmVZ",
//                   "pOMnRtY5l",
//                   "hDwSQdxAJ"
//                 ],
//                 "holes": []
//               }
//             },
//             "perimeters": {
//               "4vqPpWATtT": {
//                 "id": "4vqPpWATtT",
//                 "type": "",
//                 "prototype": "perimeter",
//                 "name": "Perimeter",
//                 "description": "",
//                 "image": "",
//                 "misc": {},
//                 "selected": false,
//                 "properties": {},
//                 "visible": true,
//                 "lines": [
//                   "aQ9sVf8m3",
//                   "HQcfEH4Y2L",
//                   "fRwmTiE_pT",
//                   "w1CafL0qmF"
//                 ],
//                 "isClosed": true
//               }
//             },
//             "items": {},
//             "selected": {
//               "vertices": [],
//               "lines": [],
//               "holes": [],
//               "areas": [],
//               "items": []
//             }
//           }
//         },
//         "grids": {
//           "h1": {
//             "id": "h1",
//             "type": "horizontal-streak",
//             "properties": {
//               "step": 20,
//               "colors": [
//                 "#808080",
//                 "#ddd",
//                 "#ddd",
//                 "#ddd",
//                 "#ddd"
//               ]
//             }
//           },
//           "v1": {
//             "id": "v1",
//             "type": "vertical-streak",
//             "properties": {
//               "step": 20,
//               "colors": [
//                 "#808080",
//                 "#ddd",
//                 "#ddd",
//                 "#ddd",
//                 "#ddd"
//               ]
//             }
//           }
//         },
//         "selectedLayer": "layer-1",
//         "groups": {},
//         "width": 3000,
//         "height": 2000,
//         "meta": {},
//         "guides": {
//           "horizontal": {},
//           "vertical": {},
//           "circular": {}
//         }
//       };
//     } else if ( roomName === 'Lderecha1' ) {
//       roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "kbj5k3nhtx", "1yeT8oh2B" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B", "jIzrL6KWD" ], "areas": [] }, "ZycFvSLkdr": { "id": "ZycFvSLkdr", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": [ "kbj5k3nhtx", "LKCOuzUlN" ], "areas": [] }, "mxSDebILvF": { "id": "mxSDebILvF", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1541, "lines": [ "jIzrL6KWD", "rIme0Aylc" ], "areas": [] }, "ZJnPB0o5sB": { "id": "ZJnPB0o5sB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1198, "lines": [ "LKCOuzUlN", "-5Wdy4iW5" ], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": [ "-5Wdy4iW5", "rIme0Aylc" ], "areas": [] } }, "lines": { "kbj5k3nhtx": { "id": "kbj5k3nhtx", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZycFvSLkdr", "M1j2fOu0V81" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "jIzrL6KWD": { "id": "jIzrL6KWD", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "mxSDebILvF", "qf2PKq0EMC" ], "holes": [] }, "LKCOuzUlN": { "id": "LKCOuzUlN", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "ZycFvSLkdr" ], "holes": [] }, "-5Wdy4iW5": { "id": "-5Wdy4iW5", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "r3FmLG5V6W" ], "holes": [] }, "rIme0Aylc": { "id": "rIme0Aylc", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "mxSDebILvF", "r3FmLG5V6W" ], "holes": [] } }, "holes": {}, "areas": { "pE8k5KlOUs": { "id": "pE8k5KlOUs", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "mxSDebILvF", "r3FmLG5V6W", "ZJnPB0o5sB", "ZycFvSLkdr", "M1j2fOu0V81", "qf2PKq0EMC" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
//     } else if ( roomName === 'Lizquierda1' ) {
//       roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "1yeT8oh2B", "3zklMmOgLwQ" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B", "T81BnHW-U" ], "areas": [] }, "l78nLaVhPa2": { "id": "l78nLaVhPa2", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1541, "lines": [ "3zklMmOgLwQ", "qkwbQWGvPDq" ], "areas": [] }, "RXWhbgzwFa": { "id": "RXWhbgzwFa", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": [ "S4DAubf66", "T81BnHW-U" ], "areas": [] }, "ZJnPB0o5sB": { "id": "ZJnPB0o5sB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1198, "lines": [ "-5Wdy4iW5", "S4DAubf66" ], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": [ "-5Wdy4iW5", "qkwbQWGvPDq" ], "areas": [] } }, "lines": { "qkwbQWGvPDq": { "id": "qkwbQWGvPDq", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "r3FmLG5V6W", "l78nLaVhPa2" ], "holes": [] }, "3zklMmOgLwQ": { "id": "3zklMmOgLwQ", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "M1j2fOu0V81", "l78nLaVhPa2" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "T81BnHW-U": { "id": "T81BnHW-U", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "qf2PKq0EMC" ], "holes": [] }, "-5Wdy4iW5": { "id": "-5Wdy4iW5", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "r3FmLG5V6W" ], "holes": [] }, "S4DAubf66": { "id": "S4DAubf66", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB" ], "holes": [] } }, "holes": {}, "areas": { "herBcT0Ml-": { "id": "herBcT0Ml-", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB", "r3FmLG5V6W", "l78nLaVhPa2", "M1j2fOu0V81", "qf2PKq0EMC" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
//     } else if ( roomName === 'L1' ) {
//       roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "1yeT8oh2B", "ZXvGzzfo0" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B" ], "areas": [] }, "wtCv5ARBzk": { "id": "wtCv5ARBzk", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1193.6366228327465, "lines": [ "ZXvGzzfo0" ], "areas": [] } }, "lines": { "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "ZXvGzzfo0": { "id": "ZXvGzzfo0", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "wtCv5ARBzk", "M1j2fOu0V81" ], "holes": [] } }, "holes": {}, "areas": {}, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
//     } else if ( roomName === 'Recta' ) {
//       roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "9n2oyhX_mW": { "id": "9n2oyhX_mW", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "lNNxbv3nT" ], "areas": [] }, "oY6cnSVG5P": { "id": "oY6cnSVG5P", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1100.139397855395, "y": 1902, "lines": [ "lNNxbv3nT" ], "areas": [] } }, "lines": { "lNNxbv3nT": { "id": "lNNxbv3nT", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "9n2oyhX_mW", "oY6cnSVG5P" ], "holes": [] } }, "holes": {}, "areas": {}, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
//     }

//     confirm( 'Are you sure?' )
//       ? props.projectActions.loadProject( roomSelected )
//       : null;

//     closeMenuRooms( event );
//   };

//   const closeMenuRooms = () => {
//     document.getElementById( 'menuRooms' ).style.display = 'none';
//   };

//   const drawWalls = () => {
//     props.linesActions.selectToolDrawingLine( props.catalog.elements.wall.name );
//   };

//   const styleDrawMode = () => {
//     document.querySelector( '.rectangulo.dibujar' ).style.opacity = 0.2;
//   };

//   return (
//     <aside id='menuRooms' style={ STYLE }>
//       <div style={ STYLE_TITLE_BAR }>
//         <p style={ STYLE_TITLE }>Paredes</p>
//         <img
//           style={ STYLE_BUTTON_CLOSE }
//           src={ close }
//           onClick={ closeMenuRooms } />
//       </div>

//       <div
//         style={ {
//           marginTop: '20px',
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           textAlign: 'center',
//           columnGap: '20px'
//         } }
//       >
//         <div
//           roomjson={ 'cuadrada' }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '20px',
//             paddingRight: '10px'
//           } }
//         >
//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo cuadrada'
//               src={ rectangulo }
//               style={ {
//                 marginLeft: '-1.5em',
//                 minHeight: '100%'
//               } }
//             />
//             <img src={ cuadrada } />
//             <p style={ STYLE_NAME }>Habitación Cuadrada</p>
//           </div>
//         </div>

//         <div
//           roomjson={ 'Recta' }
//           onClick={ loadProjectFromFile }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '10px',
//             paddingRight: '20px'
//           } }
//         >
//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo recta'
//               src={ rectangulo }
//               style={ { marginLeft: '-1.3em', minHeight: '100%' } }
//             />
//             <img src={ Recta } />
//             <p style={ STYLE_NAME }>Pared Recta</p>
//           </div>
//         </div>

//         <div
//           roomjson={ 'L1' }
//           onClick={ loadProjectFromFile }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '20px',
//             paddingRight: '10px'
//           } }>
//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo lEstandar'
//               src={ rectangulo }
//               style={ { marginLeft: '-1.5em', minHeight: '100%' } }
//             />
//             <img src={ L1 } />
//             <p style={ STYLE_NAME }>Dos paredes en L</p>
//           </div>
//         </div>

//         <div
//           roomjson={ 'Lizquierda1' }
//           onClick={ loadProjectFromFile }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '10px',
//             paddingRight: '20px'
//           } }
//         >
//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo lIzquierda'
//               src={ rectangulo }
//               style={ { marginLeft: '-1.3em', minHeight: '100%' } }
//               onClick={ ( e ) => {
//                 e.stopPropagation();
//               } }
//             />
//             <img src={ Lizquierda1 } />
//             <p style={ STYLE_NAME }>Habitación en forma de L</p>
//           </div>
//         </div>

//         <div
//           roomjson={ 'Lderecha1' }
//           onClick={ loadProjectFromFile }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '20px',
//             paddingRight: '10px'
//           } }
//         >
//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo lDerecha'
//               src={ rectangulo }
//               style={ { marginLeft: '-1.5em', minHeight: '100%' } }
//             />
//             <img src={ Lderecha1 } />
//             <p style={ STYLE_NAME }>Habitación en forma de L</p>
//           </div>
//         </div>

//         <div
//           onClick={ () => {
//             drawWalls();
//             styleDrawMode();
//           } }
//           style={ {
//             cursor: 'pointer',
//             paddingTop: '10px',
//             paddingLeft: '10px',
//             paddingRight: '20px'

//           } }>

//           <div style={ { position: 'relative' } }>
//             <img
//               className='rectangulo dibujar'
//               src={ rectangulo }
//               style={ {
//                 marginLeft: '-1.3em',
//                 minHeight: '100%',
//                 opacity: isDrawMode ? 0.2 : null
//               } } />
//             <img src={ lapiz } />
//             <p style={ STYLE_NAME }>Dibujar paredes</p>
//           </div>
//         </div>
//       </div >
//     </aside >
//   );
// };

export default class MenuRooms extends Component {

  constructor ( props, context ) {
    super( props, context );
    this.projectActions = props.projectActions;
    this.rooms = {
      cuadrada: {
        "unit": "mm",
        "layers": {
          "layer-1": {
            "id": "layer-1",
            "altitude": 0,
            "order": 0,
            "opacity": 1,
            "name": "default",
            "visible": true,
            "vertices": {
              "y7NDSNW0PK": {
                "id": "y7NDSNW0PK",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 302.7593085106383,
                "y": 1597.807845744681,
                "lines": [
                  "aQ9sVf8m3",
                  "aQ9sVf8m3",
                  "w1CafL0qmF"
                ],
                "areas": []
              },
              "whjvk8A36A": {
                "id": "whjvk8A36A",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 1312.7593085106382,
                "y": 1607.807845744681,
                "lines": [
                  "aQ9sVf8m3",
                  "HQcfEH4Y2L"
                ],
                "areas": []
              },
              "pOMnRtY5l": {
                "id": "pOMnRtY5l",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 1302.759308510638,
                "y": 597.8078457446809,
                "lines": [
                  "HQcfEH4Y2L",
                  "fRwmTiE_pT",
                  "fRwmTiE_pT"
                ],
                "areas": []
              },
              "Rxjm9KWHHO": {
                "id": "Rxjm9KWHHO",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 292.7593085106383,
                "y": 1607.807845744681,
                "lines": [
                  "w1CafL0qmF",
                  "aQ9sVf8m3"
                ],
                "areas": []
              },
              "nNdBliFIZp": {
                "id": "nNdBliFIZp",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 1312.759308510638,
                "y": 587.8078457446809,
                "lines": [
                  "HQcfEH4Y2L",
                  "fRwmTiE_pT"
                ],
                "areas": []
              },
              "hDwSQdxAJ": {
                "id": "hDwSQdxAJ",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 1302.7593085106382,
                "y": 1597.807845744681,
                "lines": [
                  "aQ9sVf8m3",
                  "HQcfEH4Y2L",
                  "HQcfEH4Y2L"
                ],
                "areas": []
              },
              "3UY5UQmVZ": {
                "id": "3UY5UQmVZ",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 302.759308510638,
                "y": 597.807845744681,
                "lines": [
                  "fRwmTiE_pT",
                  "w1CafL0qmF",
                  "w1CafL0qmF"
                ],
                "areas": []
              },
              "UJ3Wr1AAcD": {
                "id": "UJ3Wr1AAcD",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 292.759308510638,
                "y": 587.807845744681,
                "lines": [
                  "fRwmTiE_pT",
                  "w1CafL0qmF"
                ],
                "areas": []
              }
            },
            "lines": {
              "aQ9sVf8m3": {
                "id": "aQ9sVf8m3",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "y7NDSNW0PK",
                  "hDwSQdxAJ",
                  "Rxjm9KWHHO",
                  "whjvk8A36A"
                ],
                "holes": [],
                "perimeter": "4vqPpWATtT",
                "v2First": false
              },
              "HQcfEH4Y2L": {
                "id": "HQcfEH4Y2L",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "hDwSQdxAJ",
                  "pOMnRtY5l",
                  "whjvk8A36A",
                  "nNdBliFIZp"
                ],
                "holes": [],
                "perimeter": "4vqPpWATtT",
                "v2First": false
              },
              "fRwmTiE_pT": {
                "id": "fRwmTiE_pT",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "pOMnRtY5l",
                  "3UY5UQmVZ",
                  "nNdBliFIZp",
                  "UJ3Wr1AAcD"
                ],
                "holes": [],
                "perimeter": "4vqPpWATtT",
                "v2First": false
              },
              "w1CafL0qmF": {
                "id": "w1CafL0qmF",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "3UY5UQmVZ",
                  "y7NDSNW0PK",
                  "UJ3Wr1AAcD",
                  "Rxjm9KWHHO"
                ],
                "holes": [],
                "perimeter": "4vqPpWATtT",
                "v2First": false
              }
            },
            "holes": {},
            "areas": {
              "PZeCOVP48g": {
                "id": "PZeCOVP48g",
                "type": "area",
                "prototype": "areas",
                "name": "Area",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {
                  "patternColor": "#F5F4F4",
                  "thickness": {
                    "length": 0
                  },
                  "texture": "none"
                },
                "visible": true,
                "vertices": [
                  "y7NDSNW0PK",
                  "3UY5UQmVZ",
                  "pOMnRtY5l",
                  "hDwSQdxAJ"
                ],
                "holes": []
              }
            },
            "perimeters": {
              "4vqPpWATtT": {
                "id": "4vqPpWATtT",
                "type": "",
                "prototype": "perimeter",
                "name": "Perimeter",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "lines": [
                  "aQ9sVf8m3",
                  "HQcfEH4Y2L",
                  "fRwmTiE_pT",
                  "w1CafL0qmF"
                ],
                "isClosed": true
              }
            },
            "items": {},
            "selected": {
              "vertices": [],
              "lines": [],
              "holes": [],
              "areas": [],
              "items": []
            }
          }
        },
        "grids": {
          "h1": {
            "id": "h1",
            "type": "horizontal-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          },
          "v1": {
            "id": "v1",
            "type": "vertical-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          }
        },
        "selectedLayer": "layer-1",
        "groups": {},
        "width": 3000,
        "height": 2000,
        "meta": {},
        "guides": {
          "horizontal": {},
          "vertical": {},
          "circular": {}
        }
      }
    };

    this.state = { dibujar: false };

    this.drawWalls = this.drawWalls.bind( this );
    this.closeMenuRooms = this.closeMenuRooms.bind( this );
    this.loadProjectFromFile = this.loadProjectFromFile.bind( this );
  };

  UNSAFE_componentWillReceiveProps () {
    if ( this.props.state.getIn( [ 'react-planner', 'mode' ] ) === MODE_WAITING_DRAWING_LINE
      || this.props.state.getIn( [ 'react-planner', 'mode' ] ) === MODE_DRAWING_LINE ) {

      this.setState( { dibujar: true } );
      document.body.style.cursor = 'crosshair';

    } else {

      document.body.style.cursor = 'auto';
      this.setState( { dibujar: false } );

    }
  }

  closeMenuRooms ( e ) {
    document.getElementById( 'menuRooms' ).style.display = 'none';
  }

  drawWalls () {
    this.props.linesActions.selectToolDrawingLine( this.props.catalog.elements.wall.name );
  }

  loadProjectFromFile ( event ) {
    event.preventDefault();
    let roomName = event.target.getAttribute( 'roomjson' );
    let roomSelected = '';
    if ( roomName === 'cuadrada' ) {
      //TODO ejemplo armarios
      // roomSelected = {
      //   "unit": "mm",
      //   "layers": {
      //     "layer-1": {
      //       "id": "layer-1",
      //       "altitude": 0,
      //       "order": 0,
      //       "opacity": 1,
      //       "name": "default",
      //       "visible": true,
      //       "vertices": {
      //         "bsjAjxjgOBg": {
      //           "id": "bsjAjxjgOBg",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 290.16622340425533,
      //           "y": 1610.6142136632602,
      //           "lines": [
      //             "kdRzYWkBxi",
      //             "0MUa4czct"
      //           ],
      //           "areas": []
      //         },
      //         "Zm4OaJlHy": {
      //           "id": "Zm4OaJlHy",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 1001.3375598909113,
      //           "y": 1600.6142136632602,
      //           "lines": [
      //             "0MUa4czct",
      //             "zqpUU69CrP",
      //             "zqpUU69CrP"
      //           ],
      //           "areas": []
      //         },
      //         "q3cr9qWmk5": {
      //           "id": "q3cr9qWmk5",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 300.16622340425533,
      //           "y": 1600.6142136632602,
      //           "lines": [
      //             "0MUa4czct",
      //             "0MUa4czct",
      //             "kdRzYWkBxi"
      //           ],
      //           "areas": []
      //         },
      //         "3mMkJ0h9b": {
      //           "id": "3mMkJ0h9b",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 1001.3375598909112,
      //           "y": 1098.7428523936169,
      //           "lines": [
      //             "zqpUU69CrP",
      //             "CH51TvpFfR",
      //             "CH51TvpFfR"
      //           ],
      //           "areas": []
      //         },
      //         "GEgKDI84z": {
      //           "id": "GEgKDI84z",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 300.1662234042552,
      //           "y": 1098.7428523936169,
      //           "lines": [
      //             "CH51TvpFfR",
      //             "kdRzYWkBxi",
      //             "kdRzYWkBxi"
      //           ],
      //           "areas": []
      //         },
      //         "Nw_Ou6rsv6": {
      //           "id": "Nw_Ou6rsv6",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 290.1662234042552,
      //           "y": 1088.7428523936169,
      //           "lines": [
      //             "CH51TvpFfR",
      //             "kdRzYWkBxi"
      //           ],
      //           "areas": []
      //         },
      //         "DgVYjGEZV": {
      //           "id": "DgVYjGEZV",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 1011.3375598909113,
      //           "y": 1610.6142136632602,
      //           "lines": [
      //             "0MUa4czct",
      //             "zqpUU69CrP"
      //           ],
      //           "areas": []
      //         },
      //         "lPz2QgWF64": {
      //           "id": "lPz2QgWF64",
      //           "type": "",
      //           "prototype": "vertices",
      //           "name": "Vertex",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "x": 1011.3375598909112,
      //           "y": 1088.7428523936169,
      //           "lines": [
      //             "zqpUU69CrP",
      //             "CH51TvpFfR"
      //           ],
      //           "areas": []
      //         }
      //       },
      //       "lines": {
      //         "0MUa4czct": {
      //           "id": "0MUa4czct",
      //           "type": "wall",
      //           "prototype": "lines",
      //           "name": "Wall",
      //           "description": "Wall with bricks or painted",
      //           "image": "catalog/lines/wall/wall.png",
      //           "misc": {
      //             "_unitLength": "mm"
      //           },
      //           "selected": false,
      //           "properties": {
      //             "height": {
      //               "length": 250
      //             },
      //             "thickness": {
      //               "length": 10
      //             },
      //             "textureA": "bricks",
      //             "textureB": "bricks"
      //           },
      //           "visible": true,
      //           "vertices": [
      //             "q3cr9qWmk5",
      //             "Zm4OaJlHy",
      //             "bsjAjxjgOBg",
      //             "DgVYjGEZV"
      //           ],
      //           "holes": [],
      //           "perimeter": "T-cH9FNi7w",
      //           "v2First": false
      //         },
      //         "zqpUU69CrP": {
      //           "id": "zqpUU69CrP",
      //           "type": "wall",
      //           "prototype": "lines",
      //           "name": "Wall",
      //           "description": "Wall with bricks or painted",
      //           "image": "catalog/lines/wall/wall.png",
      //           "misc": {
      //             "_unitLength": "mm"
      //           },
      //           "selected": false,
      //           "properties": {
      //             "height": {
      //               "length": 250
      //             },
      //             "thickness": {
      //               "length": 10
      //             },
      //             "textureA": "bricks",
      //             "textureB": "bricks"
      //           },
      //           "visible": true,
      //           "vertices": [
      //             "Zm4OaJlHy",
      //             "3mMkJ0h9b",
      //             "DgVYjGEZV",
      //             "lPz2QgWF64"
      //           ],
      //           "holes": [],
      //           "perimeter": "T-cH9FNi7w",
      //           "v2First": false
      //         },
      //         "CH51TvpFfR": {
      //           "id": "CH51TvpFfR",
      //           "type": "wall",
      //           "prototype": "lines",
      //           "name": "Wall",
      //           "description": "Wall with bricks or painted",
      //           "image": "catalog/lines/wall/wall.png",
      //           "misc": {
      //             "_unitLength": "mm"
      //           },
      //           "selected": false,
      //           "properties": {
      //             "height": {
      //               "length": 250
      //             },
      //             "thickness": {
      //               "length": 10
      //             },
      //             "textureA": "bricks",
      //             "textureB": "bricks"
      //           },
      //           "visible": true,
      //           "vertices": [
      //             "3mMkJ0h9b",
      //             "GEgKDI84z",
      //             "lPz2QgWF64",
      //             "Nw_Ou6rsv6"
      //           ],
      //           "holes": [],
      //           "perimeter": "T-cH9FNi7w",
      //           "v2First": false
      //         },
      //         "kdRzYWkBxi": {
      //           "id": "kdRzYWkBxi",
      //           "type": "wall",
      //           "prototype": "lines",
      //           "name": "Wall",
      //           "description": "Wall with bricks or painted",
      //           "image": "catalog/lines/wall/wall.png",
      //           "misc": {
      //             "_unitLength": "mm"
      //           },
      //           "selected": false,
      //           "properties": {
      //             "height": {
      //               "length": 250
      //             },
      //             "thickness": {
      //               "length": 10
      //             },
      //             "textureA": "bricks",
      //             "textureB": "bricks"
      //           },
      //           "visible": true,
      //           "vertices": [
      //             "GEgKDI84z",
      //             "q3cr9qWmk5",
      //             "Nw_Ou6rsv6",
      //             "bsjAjxjgOBg"
      //           ],
      //           "holes": [],
      //           "perimeter": "T-cH9FNi7w",
      //           "v2First": false
      //         }
      //       },
      //       "holes": {},
      //       "areas": {
      //         "ase-10RTsk": {
      //           "id": "ase-10RTsk",
      //           "type": "area",
      //           "prototype": "areas",
      //           "name": "Area",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {
      //             "patternColor": "#F5F4F4",
      //             "thickness": {
      //               "length": 0
      //             },
      //             "texture": "tile1"
      //           },
      //           "visible": true,
      //           "vertices": [
      //             "3mMkJ0h9b",
      //             "Zm4OaJlHy",
      //             "q3cr9qWmk5",
      //             "GEgKDI84z"
      //           ],
      //           "holes": []
      //         }
      //       },
      //       "perimeters": {
      //         "T-cH9FNi7w": {
      //           "id": "T-cH9FNi7w",
      //           "type": "",
      //           "prototype": "perimeter",
      //           "name": "Perimeter",
      //           "description": "",
      //           "image": "",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {},
      //           "visible": true,
      //           "lines": [
      //             "0MUa4czct",
      //             "zqpUU69CrP",
      //             "CH51TvpFfR",
      //             "kdRzYWkBxi"
      //           ],
      //           "isClosed": true
      //         }
      //       },
      //       "items": {
      //         "kGzSVrdRG": {
      //           "id": "kGzSVrdRG",
      //           "type": "Fussion_Chrome_800_2_cajones_2321113",
      //           "prototype": "items",
      //           "name": "Armario_Mate",
      //           "description": "Mueble de entrada para pruebas",
      //           "image": "catalog/items/_Victor-Armario-Mate-Prueba/Fussion_Chrome_800_2_cajones.jpg",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {
      //             "width": {
      //               "length": 100,
      //               "unit": "cm"
      //             },
      //             "depth": {
      //               "length": 50,
      //               "unit": "cm"
      //             },
      //             "height": {
      //               "length": 50,
      //               "unit": "cm"
      //             }
      //           },
      //           "visible": true,
      //           "x": 345.04519458142056,
      //           "y": 1471.3477876321501,
      //           "rotation": 0,
      //           "width": {
      //             "min": 100,
      //             "max": 184
      //           },
      //           "depth": {
      //             "min": 45.2,
      //             "max": 100
      //           },
      //           "height": {
      //             "min": 45.2,
      //             "max": 100
      //           }
      //         },
      //         "P2K-4MBk8": {
      //           "id": "P2K-4MBk8",
      //           "type": "Fussion_Chrome_800_2_cajones_2323",
      //           "prototype": "items",
      //           "name": "Armario_Brillo",
      //           "description": "Mueble de entrada para pruebas",
      //           "image": "catalog/items/_Victor-Armario-Brillo-Prueba/Fussion_Chrome_800_2_cajones.jpg",
      //           "misc": {},
      //           "selected": false,
      //           "properties": {
      //             "width": {
      //               "length": 100,
      //               "unit": "cm"
      //             },
      //             "depth": {
      //               "length": 50,
      //               "unit": "cm"
      //             },
      //             "height": {
      //               "length": 50,
      //               "unit": "cm"
      //             }
      //           },
      //           "visible": true,
      //           "x": 508.987070943542,
      //           "y": 1470.0364094552283,
      //           "rotation": 0,
      //           "width": {
      //             "min": 100,
      //             "max": 184
      //           },
      //           "depth": {
      //             "min": 45.2,
      //             "max": 100
      //           },
      //           "height": {
      //             "min": 45.2,
      //             "max": 100
      //           }
      //         },
      //         "8uQcG7Fbj": {
      //           "id": "8uQcG7Fbj",
      //           "type": "Fussion_Chrome_800_2_cajones_232111113",
      //           "prototype": "items",
      //           "name": "Armario_BrilloAlto",
      //           "description": "Mueble de entrada para pruebas",
      //           "image": "catalog/items/_Victor-Armario-BrilloAlto-Prueba/Fussion_Chrome_800_2_cajones.jpg",
      //           "misc": {},
      //           "selected": true,
      //           "properties": {
      //             "width": {
      //               "length": 100,
      //               "unit": "cm"
      //             },
      //             "depth": {
      //               "length": 50,
      //               "unit": "cm"
      //             },
      //             "height": {
      //               "length": 50,
      //               "unit": "cm"
      //             }
      //           },
      //           "visible": true,
      //           "x": 673.2493780051535,
      //           "y": 1469.8022489490806,
      //           "rotation": 0,
      //           "width": {
      //             "min": 100,
      //             "max": 184
      //           },
      //           "depth": {
      //             "min": 45.2,
      //             "max": 100
      //           },
      //           "height": {
      //             "min": 45.2,
      //             "max": 100
      //           }
      //         }
      //       },
      //       "selected": {
      //         "vertices": [],
      //         "lines": [],
      //         "holes": [],
      //         "areas": [],
      //         "items": [
      //           "8uQcG7Fbj"
      //         ]
      //       }
      //     }
      //   },
      //   "grids": {
      //     "h1": {
      //       "id": "h1",
      //       "type": "horizontal-streak",
      //       "properties": {
      //         "step": 20,
      //         "colors": [
      //           "#808080",
      //           "#ddd",
      //           "#ddd",
      //           "#ddd",
      //           "#ddd"
      //         ]
      //       }
      //     },
      //     "v1": {
      //       "id": "v1",
      //       "type": "vertical-streak",
      //       "properties": {
      //         "step": 20,
      //         "colors": [
      //           "#808080",
      //           "#ddd",
      //           "#ddd",
      //           "#ddd",
      //           "#ddd"
      //         ]
      //       }
      //     }
      //   },
      //   "selectedLayer": "layer-1",
      //   "groups": {},
      //   "width": 3000,
      //   "height": 2000,
      //   "meta": {},
      //   "guides": {
      //     "horizontal": {},
      //     "vertical": {},
      //     "circular": {}
      //   }
      // };
      //TODO ejemplo muebles
      roomSelected = {
        "unit": "mm",
        "layers": {
          "layer-1": {
            "id": "layer-1",
            "altitude": 0,
            "order": 0,
            "opacity": 1,
            "name": "default",
            "visible": true,
            "vertices": {
              "n0ZUgWVUN": {
                "id": "n0ZUgWVUN",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042553,
                "y": 1598.1195146276596,
                "lines": [
                  "vwAPO9_q4",
                  "w7PlqnBZeS",
                  "w7PlqnBZeS"
                ],
                "areas": []
              },
              "S_0WlfOS8": {
                "id": "S_0WlfOS8",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.1662234042552,
                "y": 1098.1195146276596,
                "lines": [
                  "YcEdeqrdma",
                  "Stv4O2LhFi",
                  "Stv4O2LhFi"
                ],
                "areas": []
              },
              "qNNteGMdUc": {
                "id": "qNNteGMdUc",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.16622340425533,
                "y": 1608.1195146276596,
                "lines": [
                  "Stv4O2LhFi",
                  "vwAPO9_q4"
                ],
                "areas": []
              },
              "RKQ1a2O-Vy": {
                "id": "RKQ1a2O-Vy",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042552,
                "y": 1088.1195146276596,
                "lines": [
                  "w7PlqnBZeS",
                  "YcEdeqrdma"
                ],
                "areas": []
              },
              "TQEiLV9X4X": {
                "id": "TQEiLV9X4X",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042553,
                "y": 1608.1195146276596,
                "lines": [
                  "vwAPO9_q4",
                  "w7PlqnBZeS"
                ],
                "areas": []
              },
              "uapkivD6Zl": {
                "id": "uapkivD6Zl",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.1662234042552,
                "y": 1088.1195146276596,
                "lines": [
                  "YcEdeqrdma",
                  "Stv4O2LhFi"
                ],
                "areas": []
              },
              "VEudBPbSZ8": {
                "id": "VEudBPbSZ8",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.16622340425533,
                "y": 1598.1195146276596,
                "lines": [
                  "vwAPO9_q4",
                  "vwAPO9_q4",
                  "Stv4O2LhFi"
                ],
                "areas": []
              },
              "aogWCJXLv": {
                "id": "aogWCJXLv",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042552,
                "y": 1098.1195146276596,
                "lines": [
                  "w7PlqnBZeS",
                  "YcEdeqrdma",
                  "YcEdeqrdma"
                ],
                "areas": []
              }
            },
            "lines": {
              "vwAPO9_q4": {
                "id": "vwAPO9_q4",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "VEudBPbSZ8",
                  "n0ZUgWVUN",
                  "qNNteGMdUc",
                  "TQEiLV9X4X"
                ],
                "holes": [],
                "perimeter": "40z9RRVmJX",
                "v2First": false
              },
              "w7PlqnBZeS": {
                "id": "w7PlqnBZeS",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "n0ZUgWVUN",
                  "aogWCJXLv",
                  "TQEiLV9X4X",
                  "RKQ1a2O-Vy"
                ],
                "holes": [],
                "perimeter": "40z9RRVmJX",
                "v2First": false
              },
              "YcEdeqrdma": {
                "id": "YcEdeqrdma",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "aogWCJXLv",
                  "S_0WlfOS8",
                  "RKQ1a2O-Vy",
                  "uapkivD6Zl"
                ],
                "holes": [],
                "perimeter": "40z9RRVmJX",
                "v2First": false
              },
              "Stv4O2LhFi": {
                "id": "Stv4O2LhFi",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "S_0WlfOS8",
                  "VEudBPbSZ8",
                  "uapkivD6Zl",
                  "qNNteGMdUc"
                ],
                "holes": [],
                "perimeter": "40z9RRVmJX",
                "v2First": false
              }
            },
            "holes": {},
            "areas": {
              "VXDurqY3WW": {
                "id": "VXDurqY3WW",
                "type": "area",
                "prototype": "areas",
                "name": "Area",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {
                  "patternColor": "#F5F4F4",
                  "thickness": {
                    "length": 0
                  },
                  "texture": "tile1"
                },
                "visible": true,
                "vertices": [
                  "VEudBPbSZ8",
                  "S_0WlfOS8",
                  "aogWCJXLv",
                  "n0ZUgWVUN"
                ],
                "holes": []
              }
            },
            "perimeters": {
              "40z9RRVmJX": {
                "id": "40z9RRVmJX",
                "type": "",
                "prototype": "perimeter",
                "name": "Perimeter",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "lines": [
                  "vwAPO9_q4",
                  "w7PlqnBZeS",
                  "YcEdeqrdma",
                  "Stv4O2LhFi"
                ],
                "isClosed": true
              }
            },
            "items": {
              "B867K2xUQ": {
                "id": "B867K2xUQ",
                "type": "Fussion_Chrome_800_2_cajones_6",
                "prototype": "items",
                "name": "Victor_Cubo_Madera_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Víctor_Cubo-Madera-Brillo/Captura.JPG",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 472.83078457446834,
                "y": 1204.793384308511,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 50,
                  "max": 100
                },
                "height": {
                  "min": 50,
                  "max": 100
                }
              },
              "k62gCf2n5": {
                "id": "k62gCf2n5",
                "type": "Fussion_Chrome_800_2_cajones_7",
                "prototype": "items",
                "name": "Victor_Cubo_Madera_BrilloAlto",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Víctor_Cubo-Madera-BrilloAlto/Captura.JPG",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 542.6446143617021,
                "y": 1510.2288896276596,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": 45.2,
                "height": 50
              },
              "mDdKT4WLk": {
                "id": "mDdKT4WLk",
                "type": "Fussion_Chrome_800_2_cajones_2",
                "prototype": "items",
                "name": "Victor_Armario_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Brillo/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 335.6964760638297,
                "y": 1502.7488364361702,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "k8Nt5Sc-D": {
                "id": "k8Nt5Sc-D",
                "type": "Fussion_Chrome_800_2_cajones_5",
                "prototype": "items",
                "name": "Mampara_Victor",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Mampara/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 677.9089095744682,
                "y": 1204.170046542553,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": 45.2,
                "height": 50
              },
              "XFmMQbTLm": {
                "id": "XFmMQbTLm",
                "type": "Fussion_Chrome_800_2_cajones_6",
                "prototype": "items",
                "name": "Victor_Cubo_Madera_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Víctor_Cubo-Madera-Brillo/Captura.JPG",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 331.0388962765958,
                "y": 1264.1294049202127,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 50,
                  "max": 100
                },
                "height": {
                  "min": 50,
                  "max": 100
                }
              }
            },
            "selected": {
              "vertices": [],
              "lines": [],
              "holes": [],
              "areas": [],
              "items": []
            }
          }
        },
        "grids": {
          "h1": {
            "id": "h1",
            "type": "horizontal-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          },
          "v1": {
            "id": "v1",
            "type": "vertical-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          }
        },
        "selectedLayer": "layer-1",
        "groups": {},
        "width": 3000,
        "height": 2000,
        "meta": {},
        "guides": {
          "horizontal": {},
          "vertical": {},
          "circular": {}
        }
      };
    } else if ( roomName === 'Lderecha1' ) {

      roomSelected = {
        "unit": "mm",
        "layers": {
          "layer-1": {
            "id": "layer-1",
            "altitude": 0,
            "order": 0,
            "opacity": 1,
            "name": "default",
            "visible": true,
            "vertices": {
              "XO0Ip7rfsq": {
                "id": "XO0Ip7rfsq",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 809.5428856382979,
                "y": 1609.989527925532,
                "lines": [
                  "E-tp466FB",
                  "gMXL-S1Uru"
                ],
                "areas": []
              },
              "5tAqPp1Yi": {
                "id": "5tAqPp1Yi",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 299.5428856382978,
                "y": 1099.989527925532,
                "lines": [
                  "QdgJ6xsvKd",
                  "WtG_rYDeAY",
                  "WtG_rYDeAY"
                ],
                "areas": []
              },
              "AgGQeZ-2kS": {
                "id": "AgGQeZ-2kS",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 289.5428856382978,
                "y": 1089.989527925532,
                "lines": [
                  "QdgJ6xsvKd",
                  "WtG_rYDeAY"
                ],
                "areas": []
              },
              "KA7il2TDr": {
                "id": "KA7il2TDr",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 799.5428856382978,
                "y": 1099.989527925532,
                "lines": [
                  "gMXL-S1Uru",
                  "QdgJ6xsvKd",
                  "QdgJ6xsvKd"
                ],
                "areas": []
              },
              "EgPtR7QK3C": {
                "id": "EgPtR7QK3C",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 809.5428856382978,
                "y": 1089.989527925532,
                "lines": [
                  "gMXL-S1Uru",
                  "QdgJ6xsvKd"
                ],
                "areas": []
              },
              "5abMKJCPc6": {
                "id": "5abMKJCPc6",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 299.5428856382979,
                "y": 1599.989527925532,
                "lines": [
                  "E-tp466FB",
                  "E-tp466FB",
                  "WtG_rYDeAY"
                ],
                "areas": []
              },
              "yN6QTUSOMv": {
                "id": "yN6QTUSOMv",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 289.5428856382979,
                "y": 1609.989527925532,
                "lines": [
                  "WtG_rYDeAY",
                  "E-tp466FB"
                ],
                "areas": []
              },
              "L1ufpMAiV": {
                "id": "L1ufpMAiV",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 799.5428856382979,
                "y": 1599.989527925532,
                "lines": [
                  "E-tp466FB",
                  "gMXL-S1Uru",
                  "gMXL-S1Uru"
                ],
                "areas": []
              }
            },
            "lines": {
              "E-tp466FB": {
                "id": "E-tp466FB",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "5abMKJCPc6",
                  "L1ufpMAiV",
                  "yN6QTUSOMv",
                  "XO0Ip7rfsq"
                ],
                "holes": [],
                "perimeter": "fqQmfYArak",
                "v2First": false
              },
              "gMXL-S1Uru": {
                "id": "gMXL-S1Uru",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "L1ufpMAiV",
                  "KA7il2TDr",
                  "XO0Ip7rfsq",
                  "EgPtR7QK3C"
                ],
                "holes": [],
                "perimeter": "fqQmfYArak",
                "v2First": false
              },
              "QdgJ6xsvKd": {
                "id": "QdgJ6xsvKd",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "KA7il2TDr",
                  "5tAqPp1Yi",
                  "EgPtR7QK3C",
                  "AgGQeZ-2kS"
                ],
                "holes": [],
                "perimeter": "fqQmfYArak",
                "v2First": false
              },
              "WtG_rYDeAY": {
                "id": "WtG_rYDeAY",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "5tAqPp1Yi",
                  "5abMKJCPc6",
                  "AgGQeZ-2kS",
                  "yN6QTUSOMv"
                ],
                "holes": [],
                "perimeter": "fqQmfYArak",
                "v2First": false
              }
            },
            "holes": {},
            "areas": {
              "0OdBCzO1xV": {
                "id": "0OdBCzO1xV",
                "type": "area",
                "prototype": "areas",
                "name": "Area",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {
                  "patternColor": "#F5F4F4",
                  "thickness": {
                    "length": 0
                  },
                  "texture": "none"
                },
                "visible": true,
                "vertices": [
                  "5abMKJCPc6",
                  "5tAqPp1Yi",
                  "KA7il2TDr",
                  "L1ufpMAiV"
                ],
                "holes": []
              }
            },
            "perimeters": {
              "fqQmfYArak": {
                "id": "fqQmfYArak",
                "type": "",
                "prototype": "perimeter",
                "name": "Perimeter",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "lines": [
                  "E-tp466FB",
                  "gMXL-S1Uru",
                  "QdgJ6xsvKd",
                  "WtG_rYDeAY"
                ],
                "isClosed": true
              }
            },
            "items": {
              "p7bQyPMqI": {
                "id": "p7bQyPMqI",
                "type": "Fussion_Chrome_800_2_cajones_2321113",
                "prototype": "items",
                "name": "Armario_Mate",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Mate-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 330.0864361702128,
                "y": 1392.4180518617022,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "5cgmXv4ip": {
                "id": "5cgmXv4ip",
                "type": "Fussion_Chrome_800_2_cajones_2323",
                "prototype": "items",
                "name": "Armario_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Brillo-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 510.231050531915,
                "y": 1457.2451795212764,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "6m1Wwxm_W": {
                "id": "6m1Wwxm_W",
                "type": "Fussion_Chrome_800_2_cajones_232111113",
                "prototype": "items",
                "name": "Armario_BrilloAlto",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-BrilloAlto-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 649.2353723404257,
                "y": 1376.834607712766,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              }
            },
            "selected": {
              "vertices": [],
              "lines": [],
              "holes": [],
              "areas": [],
              "items": []
            }
          }
        },
        "grids": {
          "h1": {
            "id": "h1",
            "type": "horizontal-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          },
          "v1": {
            "id": "v1",
            "type": "vertical-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          }
        },
        "selectedLayer": "layer-1",
        "groups": {},
        "width": 3000,
        "height": 2000,
        "meta": {},
        "guides": {
          "horizontal": {},
          "vertical": {},
          "circular": {}
        }
      };
    } else if ( roomName === 'Lizquierda1' ) {
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "1yeT8oh2B", "3zklMmOgLwQ" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B", "T81BnHW-U" ], "areas": [] }, "l78nLaVhPa2": { "id": "l78nLaVhPa2", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1541, "lines": [ "3zklMmOgLwQ", "qkwbQWGvPDq" ], "areas": [] }, "RXWhbgzwFa": { "id": "RXWhbgzwFa", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": [ "S4DAubf66", "T81BnHW-U" ], "areas": [] }, "ZJnPB0o5sB": { "id": "ZJnPB0o5sB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1198, "lines": [ "-5Wdy4iW5", "S4DAubf66" ], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": [ "-5Wdy4iW5", "qkwbQWGvPDq" ], "areas": [] } }, "lines": { "qkwbQWGvPDq": { "id": "qkwbQWGvPDq", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "r3FmLG5V6W", "l78nLaVhPa2" ], "holes": [] }, "3zklMmOgLwQ": { "id": "3zklMmOgLwQ", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "M1j2fOu0V81", "l78nLaVhPa2" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "T81BnHW-U": { "id": "T81BnHW-U", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "qf2PKq0EMC" ], "holes": [] }, "-5Wdy4iW5": { "id": "-5Wdy4iW5", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "r3FmLG5V6W" ], "holes": [] }, "S4DAubf66": { "id": "S4DAubf66", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB" ], "holes": [] } }, "holes": {}, "areas": { "herBcT0Ml-": { "id": "herBcT0Ml-", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB", "r3FmLG5V6W", "l78nLaVhPa2", "M1j2fOu0V81", "qf2PKq0EMC" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
    } else if ( roomName === 'L1' ) {
      roomSelected = {
        "unit": "mm",
        "layers": {
          "layer-1": {
            "id": "layer-1",
            "altitude": 0,
            "order": 0,
            "opacity": 1,
            "name": "default",
            "visible": true,
            "vertices": {
              "RLROk17-bQ": {
                "id": "RLROk17-bQ",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.16622340425533,
                "y": 1608.7428523936169,
                "lines": [
                  "kdRzYWkBxi",
                  "0MUa4czct"
                ],
                "areas": []
              },
              "HQmN6HKtZY": {
                "id": "HQmN6HKtZY",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042553,
                "y": 1608.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP"
                ],
                "areas": []
              },
              "Zm4OaJlHy": {
                "id": "Zm4OaJlHy",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042553,
                "y": 1598.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP",
                  "zqpUU69CrP"
                ],
                "areas": []
              },
              "q3cr9qWmk5": {
                "id": "q3cr9qWmk5",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.16622340425533,
                "y": 1598.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "0MUa4czct",
                  "kdRzYWkBxi"
                ],
                "areas": []
              },
              "daALUfnlTp": {
                "id": "daALUfnlTp",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042552,
                "y": 1088.7428523936169,
                "lines": [
                  "zqpUU69CrP",
                  "CH51TvpFfR"
                ],
                "areas": []
              },
              "3mMkJ0h9b": {
                "id": "3mMkJ0h9b",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042552,
                "y": 1098.7428523936169,
                "lines": [
                  "zqpUU69CrP",
                  "CH51TvpFfR",
                  "CH51TvpFfR"
                ],
                "areas": []
              },
              "GEgKDI84z": {
                "id": "GEgKDI84z",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.1662234042552,
                "y": 1098.7428523936169,
                "lines": [
                  "CH51TvpFfR",
                  "kdRzYWkBxi",
                  "kdRzYWkBxi"
                ],
                "areas": []
              },
              "Nw_Ou6rsv6": {
                "id": "Nw_Ou6rsv6",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.1662234042552,
                "y": 1088.7428523936169,
                "lines": [
                  "CH51TvpFfR",
                  "kdRzYWkBxi"
                ],
                "areas": []
              }
            },
            "lines": {
              "0MUa4czct": {
                "id": "0MUa4czct",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "q3cr9qWmk5",
                  "Zm4OaJlHy",
                  "RLROk17-bQ",
                  "HQmN6HKtZY"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "zqpUU69CrP": {
                "id": "zqpUU69CrP",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "Zm4OaJlHy",
                  "3mMkJ0h9b",
                  "HQmN6HKtZY",
                  "daALUfnlTp"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "CH51TvpFfR": {
                "id": "CH51TvpFfR",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "3mMkJ0h9b",
                  "GEgKDI84z",
                  "daALUfnlTp",
                  "Nw_Ou6rsv6"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "kdRzYWkBxi": {
                "id": "kdRzYWkBxi",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "GEgKDI84z",
                  "q3cr9qWmk5",
                  "Nw_Ou6rsv6",
                  "RLROk17-bQ"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              }
            },
            "holes": {},
            "areas": {
              "ase-10RTsk": {
                "id": "ase-10RTsk",
                "type": "area",
                "prototype": "areas",
                "name": "Area",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {
                  "patternColor": "#F5F4F4",
                  "thickness": {
                    "length": 0
                  },
                  "texture": "none"
                },
                "visible": true,
                "vertices": [
                  "3mMkJ0h9b",
                  "Zm4OaJlHy",
                  "q3cr9qWmk5",
                  "GEgKDI84z"
                ],
                "holes": []
              }
            },
            "perimeters": {
              "T-cH9FNi7w": {
                "id": "T-cH9FNi7w",
                "type": "",
                "prototype": "perimeter",
                "name": "Perimeter",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP",
                  "CH51TvpFfR",
                  "kdRzYWkBxi"
                ],
                "isClosed": true
              }
            },
            "items": {
              "kGzSVrdRG": {
                "id": "kGzSVrdRG",
                "type": "Fussion_Chrome_800_2_cajones_2321113",
                "prototype": "items",
                "name": "Armario_Mate",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Mate-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 346.9165558510639,
                "y": 1363.7445146276596,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "P2K-4MBk8": {
                "id": "P2K-4MBk8",
                "type": "Fussion_Chrome_800_2_cajones_2323",
                "prototype": "items",
                "name": "Armario_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Brillo-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 505.24434840425533,
                "y": 1452.2584773936169,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "8uQcG7Fbj": {
                "id": "8uQcG7Fbj",
                "type": "Fussion_Chrome_800_2_cajones_232111113",
                "prototype": "items",
                "name": "Armario_BrilloAlto",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-BrilloAlto-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 651.7287234042554,
                "y": 1344.4210438829787,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              }
            },
            "selected": {
              "vertices": [],
              "lines": [],
              "holes": [],
              "areas": [],
              "items": []
            }
          }
        },
        "grids": {
          "h1": {
            "id": "h1",
            "type": "horizontal-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          },
          "v1": {
            "id": "v1",
            "type": "vertical-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          }
        },
        "selectedLayer": "layer-1",
        "groups": {},
        "width": 3000,
        "height": 2000,
        "meta": {},
        "guides": {
          "horizontal": {},
          "vertical": {},
          "circular": {}
        }
      };
    } else if ( roomName === 'Recta' ) {
      roomSelected = {
        "unit": "mm",
        "layers": {
          "layer-1": {
            "id": "layer-1",
            "altitude": 0,
            "order": 0,
            "opacity": 1,
            "name": "default",
            "visible": true,
            "vertices": {
              "RLROk17-bQ": {
                "id": "RLROk17-bQ",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.16622340425533,
                "y": 1608.7428523936169,
                "lines": [
                  "kdRzYWkBxi",
                  "0MUa4czct"
                ],
                "areas": []
              },
              "HQmN6HKtZY": {
                "id": "HQmN6HKtZY",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042553,
                "y": 1608.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP"
                ],
                "areas": []
              },
              "Zm4OaJlHy": {
                "id": "Zm4OaJlHy",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042553,
                "y": 1598.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP",
                  "zqpUU69CrP"
                ],
                "areas": []
              },
              "q3cr9qWmk5": {
                "id": "q3cr9qWmk5",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.16622340425533,
                "y": 1598.7428523936169,
                "lines": [
                  "0MUa4czct",
                  "0MUa4czct",
                  "kdRzYWkBxi"
                ],
                "areas": []
              },
              "daALUfnlTp": {
                "id": "daALUfnlTp",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 810.1662234042552,
                "y": 1088.7428523936169,
                "lines": [
                  "zqpUU69CrP",
                  "CH51TvpFfR"
                ],
                "areas": []
              },
              "3mMkJ0h9b": {
                "id": "3mMkJ0h9b",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 800.1662234042552,
                "y": 1098.7428523936169,
                "lines": [
                  "zqpUU69CrP",
                  "CH51TvpFfR",
                  "CH51TvpFfR"
                ],
                "areas": []
              },
              "GEgKDI84z": {
                "id": "GEgKDI84z",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 300.1662234042552,
                "y": 1098.7428523936169,
                "lines": [
                  "CH51TvpFfR",
                  "kdRzYWkBxi",
                  "kdRzYWkBxi"
                ],
                "areas": []
              },
              "Nw_Ou6rsv6": {
                "id": "Nw_Ou6rsv6",
                "type": "",
                "prototype": "vertices",
                "name": "Vertex",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "x": 290.1662234042552,
                "y": 1088.7428523936169,
                "lines": [
                  "CH51TvpFfR",
                  "kdRzYWkBxi"
                ],
                "areas": []
              }
            },
            "lines": {
              "0MUa4czct": {
                "id": "0MUa4czct",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "q3cr9qWmk5",
                  "Zm4OaJlHy",
                  "RLROk17-bQ",
                  "HQmN6HKtZY"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "zqpUU69CrP": {
                "id": "zqpUU69CrP",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "Zm4OaJlHy",
                  "3mMkJ0h9b",
                  "HQmN6HKtZY",
                  "daALUfnlTp"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "CH51TvpFfR": {
                "id": "CH51TvpFfR",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "3mMkJ0h9b",
                  "GEgKDI84z",
                  "daALUfnlTp",
                  "Nw_Ou6rsv6"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              },
              "kdRzYWkBxi": {
                "id": "kdRzYWkBxi",
                "type": "wall",
                "prototype": "lines",
                "name": "Wall",
                "description": "Wall with bricks or painted",
                "image": "catalog/lines/wall/wall.png",
                "misc": {
                  "_unitLength": "mm"
                },
                "selected": false,
                "properties": {
                  "height": {
                    "length": 250
                  },
                  "thickness": {
                    "length": 10
                  },
                  "textureA": "bricks",
                  "textureB": "bricks"
                },
                "visible": true,
                "vertices": [
                  "GEgKDI84z",
                  "q3cr9qWmk5",
                  "Nw_Ou6rsv6",
                  "RLROk17-bQ"
                ],
                "holes": [],
                "perimeter": "T-cH9FNi7w",
                "v2First": false
              }
            },
            "holes": {},
            "areas": {
              "ase-10RTsk": {
                "id": "ase-10RTsk",
                "type": "area",
                "prototype": "areas",
                "name": "Area",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {
                  "patternColor": "#F5F4F4",
                  "thickness": {
                    "length": 0
                  },
                  "texture": "none"
                },
                "visible": true,
                "vertices": [
                  "3mMkJ0h9b",
                  "Zm4OaJlHy",
                  "q3cr9qWmk5",
                  "GEgKDI84z"
                ],
                "holes": []
              }
            },
            "perimeters": {
              "T-cH9FNi7w": {
                "id": "T-cH9FNi7w",
                "type": "",
                "prototype": "perimeter",
                "name": "Perimeter",
                "description": "",
                "image": "",
                "misc": {},
                "selected": false,
                "properties": {},
                "visible": true,
                "lines": [
                  "0MUa4czct",
                  "zqpUU69CrP",
                  "CH51TvpFfR",
                  "kdRzYWkBxi"
                ],
                "isClosed": true
              }
            },
            "items": {
              "kGzSVrdRG": {
                "id": "kGzSVrdRG",
                "type": "Fussion_Chrome_800_2_cajones_2321113",
                "prototype": "items",
                "name": "Armario_Mate",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Mate-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 346.9165558510639,
                "y": 1363.7445146276596,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "P2K-4MBk8": {
                "id": "P2K-4MBk8",
                "type": "Fussion_Chrome_800_2_cajones_2323",
                "prototype": "items",
                "name": "Armario_Brillo",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-Brillo-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 505.24434840425533,
                "y": 1452.2584773936169,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              },
              "8uQcG7Fbj": {
                "id": "8uQcG7Fbj",
                "type": "Fussion_Chrome_800_2_cajones_232111113",
                "prototype": "items",
                "name": "Armario_BrilloAlto",
                "description": "Mueble de entrada para pruebas",
                "image": "catalog/items/_Victor-Armario-BrilloAlto-Prueba/Fussion_Chrome_800_2_cajones.jpg",
                "misc": {},
                "selected": false,
                "properties": {
                  "width": {
                    "length": 100,
                    "unit": "cm"
                  },
                  "depth": {
                    "length": 50,
                    "unit": "cm"
                  },
                  "height": {
                    "length": 50,
                    "unit": "cm"
                  }
                },
                "visible": true,
                "x": 651.7287234042554,
                "y": 1344.4210438829787,
                "rotation": 0,
                "width": {
                  "min": 100,
                  "max": 184
                },
                "depth": {
                  "min": 45.2,
                  "max": 100
                },
                "height": {
                  "min": 45.2,
                  "max": 100
                }
              }
            },
            "selected": {
              "vertices": [],
              "lines": [],
              "holes": [],
              "areas": [],
              "items": []
            }
          }
        },
        "grids": {
          "h1": {
            "id": "h1",
            "type": "horizontal-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          },
          "v1": {
            "id": "v1",
            "type": "vertical-streak",
            "properties": {
              "step": 20,
              "colors": [
                "#808080",
                "#ddd",
                "#ddd",
                "#ddd",
                "#ddd"
              ]
            }
          }
        },
        "selectedLayer": "layer-1",
        "groups": {},
        "width": 3000,
        "height": 2000,
        "meta": {},
        "guides": {
          "horizontal": {},
          "vertical": {},
          "circular": {}
        }
      };
    }
    // else if (roomName === 'Lderecha2') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "fF9XqztW4K": { "id": "fF9XqztW4K", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": ["uP6pIAx6k", "hCVAdP7Mp"], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": ["rIme0Aylc", "pudFcJPJmr"], "areas": [] }, "ZycFvSLkdr": { "id": "ZycFvSLkdr", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": ["kbj5k3nhtx", "hCVAdP7Mp"], "areas": [] }, "mxSDebILvF": { "id": "mxSDebILvF", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1541, "lines": ["rIme0Aylc", "uP6pIAx6k"], "areas": [] }, "sE1SMqp245": { "id": "sE1SMqp245", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1902, "lines": ["yugVouR_Uy", "pudFcJPJmr"], "areas": [] }, "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": ["kbj5k3nhtx", "yugVouR_Uy"], "areas": [] } }, "lines": { "uP6pIAx6k": { "id": "uP6pIAx6k", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["fF9XqztW4K", "mxSDebILvF"], "holes": [] }, "yugVouR_Uy": { "id": "yugVouR_Uy", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["M1j2fOu0V81", "sE1SMqp245"], "holes": [] }, "kbj5k3nhtx": { "id": "kbj5k3nhtx", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["ZycFvSLkdr", "M1j2fOu0V81"], "holes": [] }, "hCVAdP7Mp": { "id": "hCVAdP7Mp", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["fF9XqztW4K", "ZycFvSLkdr"], "holes": [] }, "pudFcJPJmr": { "id": "pudFcJPJmr", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["r3FmLG5V6W", "sE1SMqp245"], "holes": [] }, "rIme0Aylc": { "id": "rIme0Aylc", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["mxSDebILvF", "r3FmLG5V6W"], "holes": [] } }, "holes": {}, "areas": { "dumyJZalPQ": { "id": "dumyJZalPQ", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["M1j2fOu0V81", "sE1SMqp245", "r3FmLG5V6W", "mxSDebILvF", "fF9XqztW4K", "ZycFvSLkdr"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // } else if (roomName === 'Lizquierda2') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "fF9XqztW4K": { "id": "fF9XqztW4K", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": ["hCVAdP7Mp", "b7YGP43Qfw"], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": ["pudFcJPJmr", "31dVnBtWe2"], "areas": [] }, "ZycFvSLkdr": { "id": "ZycFvSLkdr", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": ["hCVAdP7Mp", "i-pvQuI5i"], "areas": [] }, "WPw5okWIlK": { "id": "WPw5okWIlK", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": ["8h1kKJfsA", "b7YGP43Qfw"], "areas": [] }, "sE1SMqp245": { "id": "sE1SMqp245", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1902, "lines": ["pudFcJPJmr", "8h1kKJfsA"], "areas": [] }, "IwzLu6JGhq": { "id": "IwzLu6JGhq", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1541, "lines": ["i-pvQuI5i", "31dVnBtWe2"], "areas": [] } }, "lines": { "hCVAdP7Mp": { "id": "hCVAdP7Mp", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["fF9XqztW4K", "ZycFvSLkdr"], "holes": [] }, "8h1kKJfsA": { "id": "8h1kKJfsA", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["WPw5okWIlK", "sE1SMqp245"], "holes": [] }, "pudFcJPJmr": { "id": "pudFcJPJmr", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["r3FmLG5V6W", "sE1SMqp245"], "holes": [] }, "i-pvQuI5i": { "id": "i-pvQuI5i", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["ZycFvSLkdr", "IwzLu6JGhq"], "holes": [] }, "31dVnBtWe2": { "id": "31dVnBtWe2", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["r3FmLG5V6W", "IwzLu6JGhq"], "holes": [] }, "b7YGP43Qfw": { "id": "b7YGP43Qfw", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["fF9XqztW4K", "WPw5okWIlK"], "holes": [] } }, "holes": {}, "areas": { "6hMOrRzRtn": { "id": "6hMOrRzRtn", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["WPw5okWIlK", "fF9XqztW4K", "ZycFvSLkdr", "IwzLu6JGhq", "r3FmLG5V6W", "sE1SMqp245"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // } else if (roomName === 'Formizquierda1') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "aHMkx0hjAV": { "id": "aHMkx0hjAV", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": ["vEJGJ3sPR", "47R-28Zb1"], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": ["vEJGJ3sPR", "1yeT8oh2B"], "areas": [] }, "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": ["1yeT8oh2B", "cdUk0tvn1"], "areas": [] }, "HUfjemSS34": { "id": "HUfjemSS34", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 800, "y": 1198, "lines": ["47R-28Zb1", "Q6KehrXeNI"], "areas": [] }, "ULfMMxqdaK": { "id": "ULfMMxqdaK", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1541, "lines": ["cdUk0tvn1", "Q6KehrXeNI"], "areas": [] } }, "lines": { "vEJGJ3sPR": { "id": "vEJGJ3sPR", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "qf2PKq0EMC"], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["qf2PKq0EMC", "M1j2fOu0V81"], "holes": [] }, "cdUk0tvn1": { "id": "cdUk0tvn1", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["ULfMMxqdaK", "M1j2fOu0V81"], "holes": [] }, "47R-28Zb1": { "id": "47R-28Zb1", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "HUfjemSS34"], "holes": [] }, "Q6KehrXeNI": { "id": "Q6KehrXeNI", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["HUfjemSS34", "ULfMMxqdaK"], "holes": [] } }, "holes": {}, "areas": { "Gi_VMoelLc": { "id": "Gi_VMoelLc", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["ULfMMxqdaK", "M1j2fOu0V81", "qf2PKq0EMC", "aHMkx0hjAV", "HUfjemSS34"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // } else if (roomName === 'Formderecha1') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "DFtZq4jEtk": { "id": "DFtZq4jEtk", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1541, "lines": ["MoLulwdbe2", "ruJwIZjJc4"], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": ["1yeT8oh2B", "MoLulwdbe2"], "areas": [] }, "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": ["1yeT8oh2B", "GOOb-PMb_"], "areas": [] }, "gIH-WhUOzW": { "id": "gIH-WhUOzW", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 728, "y": 1198, "lines": ["ruJwIZjJc4", "pPJ_CI-Eso"], "areas": [] }, "oh2WA-CWD3": { "id": "oh2WA-CWD3", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": ["pPJ_CI-Eso", "GOOb-PMb_"], "areas": [] } }, "lines": { "MoLulwdbe2": { "id": "MoLulwdbe2", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["qf2PKq0EMC", "DFtZq4jEtk"], "holes": [] }, "ruJwIZjJc4": { "id": "ruJwIZjJc4", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["DFtZq4jEtk", "gIH-WhUOzW"], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["qf2PKq0EMC", "M1j2fOu0V81"], "holes": [] }, "pPJ_CI-Eso": { "id": "pPJ_CI-Eso", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["gIH-WhUOzW", "oh2WA-CWD3"], "holes": [] }, "GOOb-PMb_": { "id": "GOOb-PMb_", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["oh2WA-CWD3", "M1j2fOu0V81"], "holes": [] } }, "holes": {}, "areas": { "LLWCHO97Mb": { "id": "LLWCHO97Mb", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["oh2WA-CWD3", "M1j2fOu0V81", "qf2PKq0EMC", "DFtZq4jEtk", "gIH-WhUOzW"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // } else if (roomName === 'Formizquierda2') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "aHMkx0hjAV": { "id": "aHMkx0hjAV", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": ["vEJGJ3sPR", "fl6avPcc0"], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": ["vEJGJ3sPR", "yWNqCCRim7"], "areas": [] }, "6BznmSNANj": { "id": "6BznmSNANj", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1578, "lines": ["qAJ6136Qed", "RxpncU61ci"], "areas": [] }, "WhKIvZIG8l": { "id": "WhKIvZIG8l", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 800, "y": 1902, "lines": ["yWNqCCRim7", "qAJ6136Qed"], "areas": [] }, "Vuqev64jQB": { "id": "Vuqev64jQB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": ["RxpncU61ci", "fl6avPcc0"], "areas": [] } }, "lines": { "vEJGJ3sPR": { "id": "vEJGJ3sPR", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "qf2PKq0EMC"], "holes": [] }, "yWNqCCRim7": { "id": "yWNqCCRim7", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["qf2PKq0EMC", "WhKIvZIG8l"], "holes": [] }, "qAJ6136Qed": { "id": "qAJ6136Qed", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["WhKIvZIG8l", "6BznmSNANj"], "holes": [] }, "RxpncU61ci": { "id": "RxpncU61ci", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["Vuqev64jQB", "6BznmSNANj"], "holes": [] }, "fl6avPcc0": { "id": "fl6avPcc0", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "Vuqev64jQB"], "holes": [] } }, "holes": {}, "areas": { "fmqTR-gZsR": { "id": "fmqTR-gZsR", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["aHMkx0hjAV", "Vuqev64jQB", "6BznmSNANj", "WhKIvZIG8l", "qf2PKq0EMC"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // } else if (roomName === 'Formderecha2') {
    //   roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "aHMkx0hjAV": { "id": "aHMkx0hjAV", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": ["fl6avPcc0", "yySvtkrdLg"], "areas": [] }, "f3pTA0lis7": { "id": "f3pTA0lis7", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 728, "y": 1902, "lines": ["v2ht57Pql6", "g1uNOz2ff"], "areas": [] }, "rgMo7iod7p": { "id": "rgMo7iod7p", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": ["g1uNOz2ff", "er3p-Gibk"], "areas": [] }, "NfbAobrU3S": { "id": "NfbAobrU3S", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1578, "lines": ["yySvtkrdLg", "v2ht57Pql6"], "areas": [] }, "Vuqev64jQB": { "id": "Vuqev64jQB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": ["fl6avPcc0", "er3p-Gibk"], "areas": [] } }, "lines": { "g1uNOz2ff": { "id": "g1uNOz2ff", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["f3pTA0lis7", "rgMo7iod7p"], "holes": [] }, "fl6avPcc0": { "id": "fl6avPcc0", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "Vuqev64jQB"], "holes": [] }, "yySvtkrdLg": { "id": "yySvtkrdLg", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["aHMkx0hjAV", "NfbAobrU3S"], "holes": [] }, "er3p-Gibk": { "id": "er3p-Gibk", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["Vuqev64jQB", "rgMo7iod7p"], "holes": [] }, "v2ht57Pql6": { "id": "v2ht57Pql6", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": ["NfbAobrU3S", "f3pTA0lis7"], "holes": [] } }, "holes": {}, "areas": { "4iYpPa-wR1": { "id": "4iYpPa-wR1", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": ["Vuqev64jQB", "rgMo7iod7p", "f3pTA0lis7", "NfbAobrU3S", "aHMkx0hjAV"], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    // }
    //TODO: Traducir
    console.log( 'cargando' );
    confirm( 'Are you sure?' )
      ? this.projectActions.loadProject( roomSelected )
      : null;

    this.closeMenuRooms( event );
  };

  render () {
    return (
      <aside id='menuRooms' style={ STYLE }>
        {/* Barra Inicial */ }

        <div style={ STYLE_TITLE_BAR }>
          <p style={ STYLE_TITLE }>Paredes</p>
          <img
            style={ STYLE_BUTTON_CLOSE }
            src={ close }
            onClick={ ( e ) => {
              e.stopPropagation();
              this.closeMenuRooms();
            } } />
        </div>

        {/* Estructuras */ }
        {/*style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'auto', height: '100%', }}*/ }
        <div
          style={ {
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            textAlign: 'center',
            columnGap: '20px'
          } }
        >

          <div roomjson={ 'cuadrada' }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '20px', paddingRight: '10px' } }>
            <div style={ { position: 'relative' } }>
              <img
                ref={ this.paredesRef }
                className='rectangulo cuadrada'
                roomjson='cuadrada'
                src={ rectangulo }
                onClick={ ( e ) => {
                  this.closeMenuRooms( e );
                  return this.loadProjectFromFile( e );
                } }
                style={ {
                  marginLeft: '-1.5em',
                  minHeight: '100%'
                } }
              />
              <img src={ cuadrada } />
              <p style={ STYLE_NAME }>Habitación Cuadrada</p>

            </div>
          </div>

          <div roomjson={ 'Recta' }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '10px', paddingRight: '20px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo recta'
                src={ rectangulo }
                style={ { marginLeft: '-1.3em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  this.closeMenuRooms( e );
                  return this.loadProjectFromFile( e );
                } }
              />
              <img src={ Recta } />
              <p style={ STYLE_NAME }>Pared Recta</p>
            </div>
          </div>

          <div roomjson={ 'L1' }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '20px', paddingRight: '10px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lEstandar'
                src={ rectangulo }
                style={ { marginLeft: '-1.5em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  this.closeMenuRooms( e );
                  return this.loadProjectFromFile( e );
                } }
              />
              <img src={ L1 } />
              <p style={ STYLE_NAME }>Dos paredes en L</p>
            </div>
          </div>

          <div roomjson={ 'Lizquierda1' }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '10px', paddingRight: '20px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lIzquierda'
                src={ rectangulo }
                style={ { marginLeft: '-1.3em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  this.closeMenuRooms( e );
                  return this.loadProjectFromFile( e );
                } }
              />
              <img src={ Lizquierda1 } />
              <p style={ STYLE_NAME }>Habitación en forma de L</p>
            </div>
          </div>

          <div roomjson={ 'Lderecha1' }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '20px', paddingRight: '10px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lDerecha'
                src={ rectangulo }
                style={ { marginLeft: '-1.5em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  this.closeMenuRooms( e );
                  return this.loadProjectFromFile( e );
                } }
              />
              <img src={ Lderecha1 } />
              <p style={ STYLE_NAME }>Habitación en forma de L</p>
            </div>
          </div>

          <div onClick={ () => {
            this.drawWalls();
            document.querySelector( '.rectangulo.dibujar' ).style.opacity = 0.2;
            this.closeMenuRooms();
          } }
            style={ {
              cursor: 'pointer',
              paddingTop: '10px',
              paddingLeft: '10px',
              paddingRight: '20px'

            } }>
            <div style={ { position: 'relative' } }>
              <img className='rectangulo dibujar' src={ rectangulo }
                style={ {
                  marginLeft: '-1.3em',
                  minHeight: '100%',
                  opacity: this.state.dibujar ? 0.2 : null
                } } />
              <img src={ lapiz } />
              <p style={ STYLE_NAME }>Dibujar paredes</p>
            </div>
          </div>

        </div >
      </aside >
    );
  }
}
