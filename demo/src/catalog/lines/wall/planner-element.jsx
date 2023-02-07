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
  bricks: {
    name: 'Bricks',
    uri: require( './textures/bricks.jpg' ),
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02,
    normal: {
      //TODO buscar como aplicar esta propiedad al resto de objetos
      uri: require( './textures/bricks-normal.jpg' ),
      lengthRepeatScale: 0.02,
      heightRepeatScale: 0.02,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
  painted: {
    name: 'Painted',
    uri: require( './textures/painted.jpg' ),
    lengthRepeatScale: 0.07,
    heightRepeatScale: 0.07,
    normal: {
      uri: require( './textures/painted-normal.jpg' ),
      lengthRepeatScale: 0.005,
      heightRepeatScale: 0.005,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
};

export default ElementsFactories.WallFactory( 'wall', info, textures );

