import { ElementsFactories } from 'react-planner';
import areaIco from './area.png';

let info = {
  title: 'area',
  tag: [ 'area' ],
  description: 'Generic Room',
  image: areaIco
};

let textures = {
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
  // strand_porcelain: {
  //   name: 'Strand Porcelain Tile',
  //   uri: require( './textures/strand-porcelain.jpg' ),
  //   lengthRepeatScale: 0.02,
  //   heightRepeatScale: 0.02
  // },
  // grass: {
  //   name: 'Grass',
  //   uri: require( './textures/grass.jpg' ),
  //   lengthRepeatScale: 0.01,
  //   heightRepeatScale: 0.01,
  // }
};

export default ElementsFactories.AreaFactory( 'area', info, textures );
