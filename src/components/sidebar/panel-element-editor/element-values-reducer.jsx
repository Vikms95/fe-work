import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElementEditor from './element-editor';

export default class ElementValuesReducer extends Component {
  // Get the values of all the selected elements
  constructor ( props, context ) {
    super( props, context );

    //this.state = {
    //  isSelectAcabado: false,
    //  attributesFormData: this.initAttrData( this.props.element, this.props.layer, this.props.state ),
    //  propertiesFormData: this.initPropData( this.props.element, this.props.layer, this.props.state ),
    //};

    //this.save = this.save.bind( this );
    //this.initAttrData = this.initAttrData.bind( this );
    //this.initPropData = this.initPropData.bind( this );
  }


  //initAttrData ( element, layer, state ) {

  //  element = ( typeof element.misc === 'object' )
  //    ? element.set( 'misc', new Map( element.misc ) )
  //    : element;

  //  switch ( element.prototype ) {
  //    case 'items': {
  //      return new Map( element );
  //    }
  //    case 'lines': {
  //      let v2First = element.v2First;
  //      let v_a = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
  //      let v_b = layer.vertices.get( element.vertices.get( 1 ) );

  //      let distance = GeometryUtils.pointsDistance( v_a.x, v_a.y, v_b.x, v_b.y );
  //      let _unit = element.misc.get( '_unitLength' ) || this.context.catalog.unit;
  //      let _length = convert( distance ).from( this.context.catalog.unit ).to( _unit );
  //      let _angleLine = Line.getAngleV0_pcl( layer, element );

  //      return new Map( {
  //        lineLength: new Map( { length: distance, _length, _unit } ),
  //        lineAngle: _angleLine.angle,
  //        isEndLine: false
  //      } );
  //    }
  //    case 'holes': {
  //      let line = layer.lines.get( element.line );
  //      let { x: x0, y: y0 } = layer.vertices.get( line.vertices.get( 0 ) );
  //      let { x: x1, y: y1 } = layer.vertices.get( line.vertices.get( 1 ) );
  //      let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
  //      let startAt = lineLength * element.offset - element.properties.get( 'width' ).get( 'length' ) / 2;

  //      let _unitA = element.misc.get( '_unitA' ) || this.context.catalog.unit;
  //      let _lengthA = convert( startAt ).from( this.context.catalog.unit ).to( _unitA );

  //      let endAt = lineLength - lineLength * element.offset - element.properties.get( 'width' ).get( 'length' ) / 2;
  //      let _unitB = element.misc.get( '_unitB' ) || this.context.catalog.unit;
  //      let _lengthB = convert( endAt ).from( this.context.catalog.unit ).to( _unitB );

  //      return new Map( {
  //        offset: element.offset,
  //        offsetA: new Map( {
  //          length: MathUtils.toFixedFloat( startAt, PRECISION ),
  //          _length: MathUtils.toFixedFloat( _lengthA, PRECISION ),
  //          _unit: _unitA
  //        } ),
  //        offsetB: new Map( {
  //          length: MathUtils.toFixedFloat( endAt, PRECISION ),
  //          _length: MathUtils.toFixedFloat( _lengthB, PRECISION ),
  //          _unit: _unitB
  //        } )
  //      } );
  //    }
  //    case 'areas': {
  //      return new Map( {} );
  //    }
  //    default:
  //      return null;
  //  }
  //}

  //initPropData ( element, layer, state ) {
  //  let { catalog } = this.context;
  //  let catalogElement = catalog.getElement( element.type );

  //  let mapped = {};
  //  for ( let name in catalogElement.properties ) {
  //    mapped[ name ] = new Map( {
  //      currentValue: element.properties.has( name )
  //        ? element.properties.get( name )
  //        : fromJS( catalogElement.properties[ name ].defaultValue ),

  //      configs: catalogElement.properties[ name ]
  //    } );
  //  }
  //}

  //componentDidMount () {

  //}

  render () {
    console.log( this.props.elements.toJS() );

    if ( !this.props.elements.toJS()[ 0 ] ) return null;
    return (
      <ElementEditor
        key={ this.props.elements.toJS()[ 0 ].id }
        element={ this.props.elements.toJS()[ 0 ] }
        layer={ this.props.layer }
        state={ this.props.state }
      />
    );
  }
}


ElementValuesReducer.propTypes = {
  elements: PropTypes.object.isRequired,
};
