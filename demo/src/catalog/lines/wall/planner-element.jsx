import { ElementsFactories } from 'react-planner';

const info = {
  title: 'wall',
  tag: [ 'wall' ],
  description: 'Wall with bricks or painted',
  image: require( './wall.png' ),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {
  bohemianBlue: {
    name: 'Bohemian Blue',
    uri: require( './textures/Bohemian Blue.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
  },
  greenMosaic: {
    name: 'Green Mosaic',
    uri: require( './textures/Green Mosaic.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
  },
  green: {
    name: 'Green',
    uri: require( './textures/Green.jpg' ),
    lengthRepeatScale: 0.0075,
    heightRepeatScale: 0.0075,
  },
  marmol: {
    name: 'Marmol',
    uri: require( './textures/Marmol.jpg' ),
    lengthRepeatScale: 0.004,
    heightRepeatScale: 0.004,
  },
  greenMosaic: {
    name: 'Green Mosaic',
    uri: require( './textures/Green Mosaic.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
  },
  ral5010: {
    name: 'RAL 5010',
    uri: require( './textures/RAL 5010.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
  },
  ral9016: {
    name: 'RAL 9016',
    uri: require( './textures/RAL 9016.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
  },
};

export default ElementsFactories.WallFactory( 'wall', info, textures );

