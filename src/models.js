import { Record, List, Map, fromJS } from 'immutable';
import { MODE_IDLE } from './constants';
import { SNAP_MASK } from './utils/snap';

let safeLoadMapList = ( mapList, Model, defaultMap ) => {
  return mapList
    ? new Map( mapList ).map( m => new Model( m ) ).toMap()
    : ( defaultMap || new Map() );
};


export class Grid extends Record( {
  id: '',
  type: '',
  properties: Map()
}, 'Grid' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} )
    } );
  }
}

export const DefaultGrids = new Map( {
  'h1': new Grid( {
    id: 'h1',
    type: 'horizontal-streak',
    properties: {
      step: 20,
      colors: [
        // '#808080',
        '#e0dede',
        '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2' ]
    }
  } ),
  'v1': new Grid( {
    id: 'v1',
    type: 'vertical-streak',
    properties: {
      step: 20,
      colors: [
        // '#808080',
        '#e0dede',
        '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2' ]
    }
  } )
} );


export class ElementsSet extends Record( {
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List(),
  items: new List(),
}, 'ElementsSet' ) {
  constructor ( json = {} ) {
    super( {
      vertices: new List( json.vertices || [] ),
      lines: new List( json.lines || [] ),
      holes: new List( json.holes || [] ),
      areas: new List( json.areas || [] ),
      items: new List( json.items || [] )
    } );
  }
}

const sharedAttributes = {
  id: '',
  type: '',
  prototype: '',
  name: '',
  description: '',
  image: '',
  misc: new Map(),
  selected: false,
  properties: new Map(),
  visible: true
};

export class Vertex extends Record( {
  ...sharedAttributes,
  x: -1,
  y: -1,
  prototype: 'vertices',
  lines: new List(),
  areas: new List()
}, 'Vertex' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      lines: new List( json.lines || [] ),
      areas: new List( json.areas || [] )
    } );
  }
}

export class Perimeter extends Record( {
  ...sharedAttributes,
  prototype: 'perimeter',
  lines: new List(),
  isClosed: false,
}, "Perimeter" ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      lines: new List( json.lines || [] )
    } );
  }
}

export class Line extends Record( {
  ...sharedAttributes,
  prototype: 'lines',
  vertices: new List(),
  holes: new List(),
  perimeter: null,
  v2First: false
}, 'Line' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} ),
      vertices: new List( json.vertices || [] ),
      holes: new List( json.holes || [] ),
    } );
  }
}

export class Hole extends Record( {
  ...sharedAttributes,
  prototype: 'holes',
  offset: -1,
  line: '',
  // value o { min,max }
  width: 0,
  depth: 0,
  height: 0,
}, 'Hole' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} )
    } );
  }
}

export class Area extends Record( {
  ...sharedAttributes,
  prototype: 'areas',
  vertices: new List(),
  holes: new List()
}, 'Area' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} ),
      vertices: new List( json.vertices || [] )
    } );
  }
}

export class Item extends Record( {
  ...sharedAttributes,
  prototype: 'items',
  x: 0,
  y: 0,
  rotation: 0,
  // value o { min,max }
  width: 200,
  depth: 10,
  height: 100,
}, 'Item' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} )
    } );
  }
}

export class Layer extends Record( {
  id: '',
  altitude: 0,
  order: 0,
  opacity: 1,
  name: '',
  visible: true,
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  perimeters: new Map(),
  items: new Map(),
  selected: new ElementsSet(),
}, 'Layer' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      vertices: safeLoadMapList( json.vertices, Vertex ),
      lines: safeLoadMapList( json.lines, Line ),
      holes: safeLoadMapList( json.holes, Hole ),
      areas: safeLoadMapList( json.areas, Area ),
      perimeters: safeLoadMapList( json.perimeters, Perimeter ),
      items: safeLoadMapList( json.items, Item ),
      selected: new ElementsSet( json.selected )
    } );
  }
}

export class Group extends Record( {
  ...sharedAttributes,
  prototype: 'groups',
  x: 0,
  y: 0,
  rotation: 0,
  elements: new Map()
}, 'Group' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      properties: fromJS( json.properties || {} ),
      elements: fromJS( json.elements || {} )
    } );
  }
}

export const DefaultLayers = new Map( {
  'layer-1': new Layer( {
    "id": "layer-1",
    "altitude": 0,
    "order": 0,
    "opacity": 1,
    "name": "default",
    "visible": true,
    "vertices": {
      "oto60Vc2tS": {
        "id": "oto60Vc2tS",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 709.9792220744681,
        "y": 1651.207737699468,
        "lines": [
          "Vgrsygpuq",
          "7n_WfEon96"
        ],
        "areas": []
      },
      "et7LXtFrM": {
        "id": "et7LXtFrM",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 699.979222074468,
        "y": 1241.207737699468,
        "lines": [
          "7n_WfEon96",
          "dPqKTtks__",
          "dPqKTtks__"
        ],
        "areas": []
      },
      "7t_jP0ZB7K": {
        "id": "7t_jP0ZB7K",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 709.979222074468,
        "y": 1231.207737699468,
        "lines": [
          "7n_WfEon96",
          "dPqKTtks__"
        ],
        "areas": []
      },
      "ZHPKquxXRj": {
        "id": "ZHPKquxXRj",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 299.9792220744681,
        "y": 1641.207737699468,
        "lines": [
          "Vgrsygpuq",
          "Vgrsygpuq",
          "bI6CgyM0m0"
        ],
        "areas": []
      },
      "h78ib04O3": {
        "id": "h78ib04O3",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 299.979222074468,
        "y": 1241.207737699468,
        "lines": [
          "dPqKTtks__",
          "bI6CgyM0m0",
          "bI6CgyM0m0"
        ],
        "areas": []
      },
      "kRYa8rg4Wl": {
        "id": "kRYa8rg4Wl",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 289.979222074468,
        "y": 1231.207737699468,
        "lines": [
          "dPqKTtks__",
          "bI6CgyM0m0"
        ],
        "areas": []
      },
      "HVQXDN4Z3": {
        "id": "HVQXDN4Z3",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 699.9792220744681,
        "y": 1641.207737699468,
        "lines": [
          "Vgrsygpuq",
          "7n_WfEon96",
          "7n_WfEon96"
        ],
        "areas": []
      },
      "FN73bot9iQ": {
        "id": "FN73bot9iQ",
        "type": "",
        "prototype": "vertices",
        "name": "Vertex",
        "description": "",
        "image": "",
        "misc": {},
        "selected": false,
        "properties": {},
        "visible": true,
        "x": 289.9792220744681,
        "y": 1651.207737699468,
        "lines": [
          "bI6CgyM0m0",
          "Vgrsygpuq"
        ],
        "areas": []
      }
    },
    "lines": {
      "Vgrsygpuq": {
        "id": "Vgrsygpuq",
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
          "textureA": "marmol",
          "textureB": "marmol"
        },
        "visible": true,
        "vertices": [
          "ZHPKquxXRj",
          "HVQXDN4Z3",
          "FN73bot9iQ",
          "oto60Vc2tS"
        ],
        "holes": [],
        "perimeter": "zZ6fOZowWD",
        "v2First": false
      },
      "7n_WfEon96": {
        "id": "7n_WfEon96",
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
          "textureA": "marmol",
          "textureB": "marmol"
        },
        "visible": true,
        "vertices": [
          "HVQXDN4Z3",
          "et7LXtFrM",
          "oto60Vc2tS",
          "7t_jP0ZB7K"
        ],
        "holes": [],
        "perimeter": "zZ6fOZowWD",
        "v2First": false
      },
      "dPqKTtks__": {
        "id": "dPqKTtks__",
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
          "textureA": "marmol",
          "textureB": "marmol"
        },
        "visible": true,
        "vertices": [
          "et7LXtFrM",
          "h78ib04O3",
          "7t_jP0ZB7K",
          "kRYa8rg4Wl"
        ],
        "holes": [],
        "perimeter": "zZ6fOZowWD",
        "v2First": false
      },
      "bI6CgyM0m0": {
        "id": "bI6CgyM0m0",
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
          "textureA": "marmol",
          "textureB": "marmol"
        },
        "visible": true,
        "vertices": [
          "h78ib04O3",
          "ZHPKquxXRj",
          "kRYa8rg4Wl",
          "FN73bot9iQ"
        ],
        "holes": [],
        "perimeter": "zZ6fOZowWD",
        "v2First": false
      }
    },
    "holes": {},
    "areas": {
      "zsfNv4DzlE": {
        "id": "zsfNv4DzlE",
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
          "texture": "hidraulico"
        },
        "visible": true,
        "vertices": [
          "HVQXDN4Z3",
          "ZHPKquxXRj",
          "h78ib04O3",
          "et7LXtFrM"
        ],
        "holes": []
      }
    },
    "perimeters": {
      "zZ6fOZowWD": {
        "id": "zZ6fOZowWD",
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
          "Vgrsygpuq",
          "7n_WfEon96",
          "dPqKTtks__",
          "bI6CgyM0m0"
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
  } )
} );

export class Scene extends Record( {
  unit: 'mm',
  layers: new Map(),
  grids: new Map(),
  selectedLayer: null,
  groups: new Map(),
  width: 3000,
  height: 2000,
  meta: new Map(),   //additional info
  guides: new Map(),
  prefs: new Map(),
  isElementSelected: false,
  selectedElementsHistory: new List()
}, 'Scene' ) {
  constructor ( json = {} ) {
    let layers = safeLoadMapList( json.layers, Layer, DefaultLayers );
    super( {
      ...json,
      grids: safeLoadMapList( json.grids, Grid, DefaultGrids ),
      layers,
      selectedLayer: layers.first().id,
      groups: safeLoadMapList( json.groups || {}, Group ),
      meta: json.meta ? fromJS( json.meta ) : new Map(),
      guides: json.guides ? fromJS( json.guides ) : new Map( { horizontal: new Map(), vertical: new Map(), circular: new Map() } ),
      prefs: new Map( json.prefs || {} )
    } );
  }
}

export class CatalogElement extends Record( {
  name: '',
  prototype: '',
  info: new Map(),
  properties: new Map(),
}, 'CatalogElement' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      info: fromJS( json.info ),
      properties: fromJS( json.properties )
    } );
  }
}

export class Catalog extends Record( {
  ready: false,
  page: 'root',
  path: new List(),
  elements: new Map(),
}, 'Catalog' ) {
  constructor ( json = {} ) {
    let elements = safeLoadMapList( json.elements, CatalogElement );
    super( {
      elements,
      ready: !elements.isEmpty()
    } );
  }

  factoryElement ( type, options, initialProperties ) {
    if ( !this.elements.has( type ) ) {
      let catList = this.elements.map( element => element.name ).toArray();
      throw new Error( `Element ${ type } does not exist in catalog ${ catList }` );
    }

    let element = this.elements.get( type );
    let properties = element.properties.map( ( value, key ) => initialProperties && initialProperties.has( key ) ? initialProperties.get( key ) : value.get( 'defaultValue' ) );

    switch ( element.prototype ) {
      case 'lines':
        return new Line( options ).merge( { properties } );

      case 'holes':
        return new Hole( options ).merge( { properties } );

      case 'areas':
        return new Area( options ).merge( { properties } );

      case 'items':
        return new Item( options ).merge( { properties } );

      default:
        throw new Error( 'prototype not valid' );
    }
  }
}

export class HistoryStructure extends Record( {
  list: new List(),
  first: null,
  last: null
}, 'HistoryStructure' ) {
  constructor ( json = {} ) {
    super( {
      list: fromJS( json.list || [] ),
      first: new Scene( json.scene ),
      last: new Scene( json.last || json.scene )
    } );
  }
}

export class State extends Record( {
  mode: MODE_IDLE,
  scene: new Scene(),
  sceneHistory: new HistoryStructure(),
  catalog: new Catalog(),
  viewer2D: new Map(),
  prefs: new Map(),
  mouse: new Map( { x: 0, y: 0 } ),
  zoom: 0,
  snapMask: SNAP_MASK,
  snapElements: new List(),
  activeSnapElement: null,
  drawingSupport: new Map(),
  draggingSupport: new Map(),
  rotatingSupport: new Map(),
  errors: new List(),
  warnings: new List(),
  clipboardProperties: new Map(),
  alterate: false,
  userAuthenticated: false,
  misc: new Map()   //additional info
}, 'State' ) {
  constructor ( json = {} ) {
    super( {
      ...json,
      scene: new Scene( json.scene ),
      sceneHistory: new HistoryStructure( json ),
      catalog: new Catalog( json.catalog || {} ),
      viewer2D: new Map( json.viewer2D || {} ),
      prefs: new Map( json.prefs || {} ),
      drawingSupport: new Map( json.drawingSupport || {} ),
      draggingSupport: new Map( json.draggingSupport || {} ),
      rotatingSupport: new Map( json.rotatingSupport || {} ),
      misc: json.misc ? fromJS( json.misc ) : new Map(),
      actions: new List( json.actions || [] )
    } );
  }
}



