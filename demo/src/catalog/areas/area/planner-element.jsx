import { ElementsFactories } from 'react-planner';

const info = {
  title: 'area',
  tag: [ 'area' ],
  description: 'Generic room',
  image: require( './area.png' )
};

const textures = {
  hidraulico: {
    name: 'Hidraulico',
    uri: require( './textures/Hidraulico 9.jpg' ),
    lengthRepeatScale: 0.00002,
    heightRepeatScale: 0.00002,
  },
  marmol: {
    name: 'Marmol',
    uri: require( './textures/Marmol blanco.jpg' ),
    lengthRepeatScale: 0.00001,
    heightRepeatScale: 0.00001,
  },
  parquet: {
    name: 'Parquet',
    uri: require( './textures/Suelo (35).jpg' ),
    lengthRepeatScale: 0.00002,
    heightRepeatScale: 0.00002
  },
  parquet4K: {
    name: 'Parquet HQ',
    uri: require( './textures/WoodFloor034_4K_Color.jpg' ),
    lengthRepeatScale: 0.00002,
    heightRepeatScale: 0.00002,
    normal: {
      uri: require( './textures/WoodFloor034_4K_NormalGL.jpg' ),
      lengthRepeatScale: 0.02,
      heightRepeatScale: 0.02,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    },
    roughness: {
      uri: require( './textures/WoodFloor034_4K_Roughness.jpg' ),
      lengthRepeatScale: 0.02,
      heightRepeatScale: 0.02,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    },
    displacement: {
      uri: require( './textures/WoodFloor034_4K_Displacement.jpg' )

    }
  }
};

export default ElementsFactories.AreaFactory( 'area', info, textures );
