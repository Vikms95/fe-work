import React, { Component } from 'react';

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
import { MODE_DRAWING_LINE, MODE_WAITING_DRAWING_LINE } from './../../constants';

let STYLE = {
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
  /*justifyContent: 'center',*/
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

export default class MenuRooms extends Component {

  constructor ( props, context ) {
    super( props, context );
    this.projectActions = props.projectActions;
    this.rooms = {
      cuandrada: { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "QxiT9e8xUS": { "id": "QxiT9e8xUS", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 299, "y": 1398, "lines": [ "DFYGWb3nO", "g_BqZIvuT" ], "areas": [] }, "yzWEBtD8p8": { "id": "yzWEBtD8p8", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 299, "y": 1899, "lines": [ "DFYGWb3nO", "isD-OgpkVK" ], "areas": [] }, "yWkihQYpdK": { "id": "yWkihQYpdK", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 800, "y": 1398, "lines": [ "g_BqZIvuT", "fA3Awp3xx0c" ], "areas": [] }, "BHqa1bJkEEx": { "id": "BHqa1bJkEEx", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 800, "y": 1899, "lines": [ "fA3Awp3xx0c", "isD-OgpkVK" ], "areas": [] } }, "lines": { "DFYGWb3nO": { "id": "DFYGWb3nO", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "QxiT9e8xUS", "yzWEBtD8p8" ], "holes": [] }, "g_BqZIvuT": { "id": "g_BqZIvuT", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "QxiT9e8xUS", "yWkihQYpdK" ], "holes": [] }, "fA3Awp3xx0c": { "id": "fA3Awp3xx0c", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "yWkihQYpdK", "BHqa1bJkEEx" ], "holes": [] }, "isD-OgpkVK": { "id": "isD-OgpkVK", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "yzWEBtD8p8", "BHqa1bJkEEx" ], "holes": [] } }, "holes": {}, "areas": { "uG5kJ9QHDU": { "id": "uG5kJ9QHDU", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "BHqa1bJkEEx", "yzWEBtD8p8", "QxiT9e8xUS", "yWkihQYpdK" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } }
    };

    this.state = { dibujar: false };

    this.drawWalls = this.drawWalls.bind( this );
    this.closeMenuRooms = this.closeMenuRooms.bind( this );
    this.loadProjectFromFile = this.loadProjectFromFile.bind( this );
  }

  UNSAFE_componentWillReceiveProps () {
    if ( this.props.state.getIn( [ 'react-planner', 'mode' ] ) === MODE_WAITING_DRAWING_LINE
      || this.props.state.getIn( [ 'react-planner', 'mode' ] ) === MODE_DRAWING_LINE ) {
      this.setState( { dibujar: true } );
    } else {
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
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "aHMkx0hjAV": { "id": "aHMkx0hjAV", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": [ "vEJGJ3sPR", "_VpNUB9tl" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "vEJGJ3sPR", "1yeT8oh2B" ], "areas": [] }, "ZycFvSLkdr": { "id": "ZycFvSLkdr", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": [ "kbj5k3nhtx", "_VpNUB9tl" ], "areas": [] }, "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "kbj5k3nhtx", "1yeT8oh2B" ], "areas": [] } }, "lines": { "vEJGJ3sPR": { "id": "vEJGJ3sPR", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "aHMkx0hjAV", "qf2PKq0EMC" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "kbj5k3nhtx": { "id": "kbj5k3nhtx", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZycFvSLkdr", "M1j2fOu0V81" ], "holes": [] }, "_VpNUB9tl": { "id": "_VpNUB9tl", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "aHMkx0hjAV", "ZycFvSLkdr" ], "holes": [] } }, "holes": {}, "areas": { "T3xVal5ZSi": { "id": "T3xVal5ZSi", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "M1j2fOu0V81", "qf2PKq0EMC", "aHMkx0hjAV", "ZycFvSLkdr" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
    } else if ( roomName === 'Lderecha1' ) {
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "kbj5k3nhtx", "1yeT8oh2B" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B", "jIzrL6KWD" ], "areas": [] }, "ZycFvSLkdr": { "id": "ZycFvSLkdr", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1198, "lines": [ "kbj5k3nhtx", "LKCOuzUlN" ], "areas": [] }, "mxSDebILvF": { "id": "mxSDebILvF", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1541, "lines": [ "jIzrL6KWD", "rIme0Aylc" ], "areas": [] }, "ZJnPB0o5sB": { "id": "ZJnPB0o5sB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1198, "lines": [ "LKCOuzUlN", "-5Wdy4iW5" ], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": [ "-5Wdy4iW5", "rIme0Aylc" ], "areas": [] } }, "lines": { "kbj5k3nhtx": { "id": "kbj5k3nhtx", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZycFvSLkdr", "M1j2fOu0V81" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "jIzrL6KWD": { "id": "jIzrL6KWD", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "mxSDebILvF", "qf2PKq0EMC" ], "holes": [] }, "LKCOuzUlN": { "id": "LKCOuzUlN", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "ZycFvSLkdr" ], "holes": [] }, "-5Wdy4iW5": { "id": "-5Wdy4iW5", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "r3FmLG5V6W" ], "holes": [] }, "rIme0Aylc": { "id": "rIme0Aylc", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "mxSDebILvF", "r3FmLG5V6W" ], "holes": [] } }, "holes": {}, "areas": { "pE8k5KlOUs": { "id": "pE8k5KlOUs", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "mxSDebILvF", "r3FmLG5V6W", "ZJnPB0o5sB", "ZycFvSLkdr", "M1j2fOu0V81", "qf2PKq0EMC" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
    } else if ( roomName === 'Lizquierda1' ) {
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "1yeT8oh2B", "3zklMmOgLwQ" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B", "T81BnHW-U" ], "areas": [] }, "l78nLaVhPa2": { "id": "l78nLaVhPa2", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1541, "lines": [ "3zklMmOgLwQ", "qkwbQWGvPDq" ], "areas": [] }, "RXWhbgzwFa": { "id": "RXWhbgzwFa", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1198, "lines": [ "S4DAubf66", "T81BnHW-U" ], "areas": [] }, "ZJnPB0o5sB": { "id": "ZJnPB0o5sB", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1198, "lines": [ "-5Wdy4iW5", "S4DAubf66" ], "areas": [] }, "r3FmLG5V6W": { "id": "r3FmLG5V6W", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 748, "y": 1541, "lines": [ "-5Wdy4iW5", "qkwbQWGvPDq" ], "areas": [] } }, "lines": { "qkwbQWGvPDq": { "id": "qkwbQWGvPDq", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "r3FmLG5V6W", "l78nLaVhPa2" ], "holes": [] }, "3zklMmOgLwQ": { "id": "3zklMmOgLwQ", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "M1j2fOu0V81", "l78nLaVhPa2" ], "holes": [] }, "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "T81BnHW-U": { "id": "T81BnHW-U", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "qf2PKq0EMC" ], "holes": [] }, "-5Wdy4iW5": { "id": "-5Wdy4iW5", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "ZJnPB0o5sB", "r3FmLG5V6W" ], "holes": [] }, "S4DAubf66": { "id": "S4DAubf66", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB" ], "holes": [] } }, "holes": {}, "areas": { "herBcT0Ml-": { "id": "herBcT0Ml-", "type": "area", "prototype": "areas", "name": "Area", "misc": {}, "selected": false, "properties": { "patternColor": "#F5F4F4", "thickness": { "length": 0 }, "texture": "none" }, "visible": true, "vertices": [ "RXWhbgzwFa", "ZJnPB0o5sB", "r3FmLG5V6W", "l78nLaVhPa2", "M1j2fOu0V81", "qf2PKq0EMC" ], "holes": [] } }, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
    } else if ( roomName === 'L1' ) {
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "M1j2fOu0V81": { "id": "M1j2fOu0V81", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1902, "lines": [ "1yeT8oh2B", "ZXvGzzfo0" ], "areas": [] }, "qf2PKq0EMC": { "id": "qf2PKq0EMC", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "1yeT8oh2B" ], "areas": [] }, "wtCv5ARBzk": { "id": "wtCv5ARBzk", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1105, "y": 1193.6366228327465, "lines": [ "ZXvGzzfo0" ], "areas": [] } }, "lines": { "1yeT8oh2B": { "id": "1yeT8oh2B", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "qf2PKq0EMC", "M1j2fOu0V81" ], "holes": [] }, "ZXvGzzfo0": { "id": "ZXvGzzfo0", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "wtCv5ARBzk", "M1j2fOu0V81" ], "holes": [] } }, "holes": {}, "areas": {}, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
    } else if ( roomName === 'Recta' ) {
      roomSelected = { "unit": "cm", "layers": { "layer-1": { "id": "layer-1", "altitude": 0, "order": 0, "opacity": 1, "name": "default", "visible": true, "vertices": { "9n2oyhX_mW": { "id": "9n2oyhX_mW", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 398, "y": 1902, "lines": [ "lNNxbv3nT" ], "areas": [] }, "oY6cnSVG5P": { "id": "oY6cnSVG5P", "type": "", "prototype": "vertices", "name": "Vertex", "misc": {}, "selected": false, "properties": {}, "visible": true, "x": 1100.139397855395, "y": 1902, "lines": [ "lNNxbv3nT" ], "areas": [] } }, "lines": { "lNNxbv3nT": { "id": "lNNxbv3nT", "type": "wall", "prototype": "lines", "name": "Wall", "misc": {}, "selected": false, "properties": { "height": { "length": 300 }, "thickness": { "length": 20 }, "textureA": "bricks", "textureB": "bricks" }, "visible": true, "vertices": [ "9n2oyhX_mW", "oY6cnSVG5P" ], "holes": [] } }, "holes": {}, "areas": {}, "items": {}, "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] } } }, "grids": { "h1": { "id": "h1", "type": "horizontal-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } }, "v1": { "id": "v1", "type": "vertical-streak", "properties": { "step": 20, "colors": [ "#808080", "#ddd", "#ddd", "#ddd", "#ddd" ] } } }, "selectedLayer": "layer-1", "groups": {}, "width": 3000, "height": 2000, "meta": {}, "guides": { "horizontal": {}, "vertical": {}, "circular": {} } };
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
                src={ rectangulo }
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
            onClick={ ( e ) => {
              return this.loadProjectFromFile;
            } }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '10px', paddingRight: '20px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo recta'
                src={ rectangulo }
                style={ { marginLeft: '-1.3em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  e.stopPropagation();
                } }
              />
              <img src={ Recta } />
              <p style={ STYLE_NAME }>Pared Recta</p>
            </div>
          </div>

          <div roomjson={ 'L1' } onClick={ ( e ) => {
            return this.loadProjectFromFile;
          } }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '20px', paddingRight: '10px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lEstandar'
                src={ rectangulo }
                style={ { marginLeft: '-1.5em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  e.stopPropagation();
                } }
              />
              <img src={ L1 } />
              <p style={ STYLE_NAME }>Dos paredes en L</p>
            </div>
          </div>

          <div roomjson={ 'Lizquierda1' } onClick={ ( e ) => {
            return this.loadProjectFromFile;
          } }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '10px', paddingRight: '20px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lIzquierda'
                src={ rectangulo }
                style={ { marginLeft: '-1.3em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  e.stopPropagation();
                } }
              />
              <img src={ Lizquierda1 } />
              <p style={ STYLE_NAME }>Habitación en forma de L</p>
            </div>
          </div>

          <div roomjson={ 'Lderecha1' } onClick={ ( e ) => {
            return this.loadProjectFromFile;
          } }
            style={ { cursor: 'pointer', paddingTop: '10px', paddingLeft: '20px', paddingRight: '10px' } }>
            <div style={ { position: 'relative' } }>
              <img
                className='rectangulo lDerecha'
                src={ rectangulo }
                style={ { marginLeft: '-1.5em', minHeight: '100%' } }
                onClick={ ( e ) => {
                  e.stopPropagation();
                } }
              />
              <img src={ Lderecha1 } />
              <p style={ STYLE_NAME }>Habitación en forma de L</p>
            </div>
          </div>

          <div onClick={ () => {
            this.drawWalls();
            document.querySelector( '.rectangulo.dibujar' ).style.opacity = 0.2;
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
