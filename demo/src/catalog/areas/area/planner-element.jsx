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
  }
};

export default ElementsFactories.AreaFactory( 'area', info, textures );
