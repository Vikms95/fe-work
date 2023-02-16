import { useState, useEffect } from 'react';

import convert from 'convert-units';
import { Line } from '../class/export';
import { Map, fromJS } from 'immutable';
import { MODE_DRAWING_LINE } from '../constants';
import { GeometryUtils, MathUtils } from '../utils/export';
import { getCacheAngulo, isMultipleSelection } from '../selectors/selectors';

export function useFormData ( props, context ) {
  const PRECISION = 2;

  const [ formData, setFormData ] = useState( {
    attributesFormData: initAttrData( props.element, props.layer ),
    propertiesFormData: initPropData( props.element ),
  } );


  useEffect( () => {
    let { element, layer } = props;
    const attributesFormData = initAttrData( element, layer );
    const propertiesFormData = initPropData( element, );

    setFormData( () => ( { attributesFormData, propertiesFormData } ) );
  }, [ props ] );


  function initAttrData ( element, layer ) {
    element = ( typeof element.misc === 'object' )
      ? element.set( 'misc', new Map( element.misc ) )
      : element;

    switch ( element.prototype ) {
      case 'items': {
        return new Map( element );
      }
      case 'lines': {

        let v2First = element.v2First;
        let v_a = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
        let v_b = layer.vertices.get( element.vertices.get( 1 ) );

        let distance = GeometryUtils.pointsDistance( v_a.x, v_a.y, v_b.x, v_b.y );
        let _unit = element.misc.get( '_unitLength' ) || context.catalog.unit;
        let _length = convert( distance ).from( context.catalog.unit ).to( _unit );
        let _angleLine = Line.getAngleV0_pcl( layer, element );

        //TODO test when pressing enter and creating a new line
        // use the cached angulo for this new line 
        if ( distance === 0 && getCacheAngulo( props.state ) ) {
          _angleLine.angle = getCacheAngulo( props.state );
        }

        return new Map( {
          lineLength: new Map( { length: distance, _length, _unit } ),
          lineAngle: _angleLine.angle,
          isEndLine: false
        } );
      }

      case 'holes': {
        let line = layer.lines.get( element.line );
        let { x: x0, y: y0 } = layer.vertices.get( line.vertices.get( 0 ) );
        let { x: x1, y: y1 } = layer.vertices.get( line.vertices.get( 1 ) );
        let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
        let startAt = lineLength * element.offset - element.properties.get( 'width' ).get( 'length' ) / 2;

        let _unitA = element.misc.get( '_unitA' ) || context.catalog.unit;
        let _lengthA = convert( startAt ).from( context.catalog.unit ).to( _unitA );

        let endAt = lineLength - lineLength * element.offset - element.properties.get( 'width' ).get( 'length' ) / 2;
        let _unitB = element.misc.get( '_unitB' ) || context.catalog.unit;
        let _lengthB = convert( endAt ).from( context.catalog.unit ).to( _unitB );

        return new Map( {
          offset: element.offset,
          offsetA: new Map( {
            length: MathUtils.toFixedFloat( startAt, PRECISION ),
            _length: MathUtils.toFixedFloat( _lengthA, PRECISION ),
            _unit: _unitA
          } ),
          offsetB: new Map( {
            length: MathUtils.toFixedFloat( endAt, PRECISION ),
            _length: MathUtils.toFixedFloat( _lengthB, PRECISION ),
            _unit: _unitB
          } )
        } );
      }
      case 'areas': {
        return new Map( {} );
      }
      default:
        return null;
    }
  };

  function initPropData ( element ) {
    let { catalog } = context;
    let catalogElement = catalog.getElement( element.type );

    let mapped = {};
    for ( let name in catalogElement.properties ) {
      mapped[ name ] = new Map( {
        currentValue: element.properties.has( name )
          ? element.properties.get( name )
          : fromJS( catalogElement.properties[ name ].defaultValue ),

        configs: catalogElement.properties[ name ]
      } );
    }
    return new Map( mapped );
  };

  const updateAttribute = ( attributeName, value, isEnter ) => {
    let { attributesFormData } = formData;

    switch ( props.element.prototype ) {
      case 'items': {
        attributesFormData = attributesFormData.set( attributeName, value );
        break;
      }
      case 'lines':

        attributesFormData = attributesFormData.set( attributeName, value );
        setFormData( ( prevState ) => ( { ...prevState, attributesFormData } ) );

        if ( isEnter && !isMultipleSelection( props.state ) ) {
          const cachedAngulo = document.querySelector( '.lineAngle' ).value;
          context.linesActions.cacheAngulo( cachedAngulo );
        }
        break;

      case 'holes': {
        switch ( attributeName ) {
          case 'offsetA':
            {
              let line = props.layer.lines.get( props.element.line );

              let orderedVertices = GeometryUtils.orderVertices( [
                props.layer.vertices.get( line.vertices.get( 0 ) ),
                props.layer.vertices.get( line.vertices.get( 1 ) )
              ] );

              let [ { x: x0, y: y0 }, { x: x1, y: y1 } ] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints( x0, y0, x1, y1 );
              let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
              let widthLength = props.element.properties.get( 'width' ).get( 'length' );
              let halfWidthLength = widthLength / 2;

              let lengthValue = value.get( 'length' );
              lengthValue = Math.max( lengthValue, 0 );
              lengthValue = Math.min( lengthValue, lineLength - widthLength );

              let xp = ( lengthValue + halfWidthLength ) * Math.cos( alpha ) + x0;
              let yp = ( lengthValue + halfWidthLength ) * Math.sin( alpha ) + y0;

              let offset = GeometryUtils.pointPositionOnLineSegment( x0, y0, x1, y1, xp, yp );

              let endAt = MathUtils.toFixedFloat( lineLength - ( lineLength * offset ) - halfWidthLength, PRECISION );
              let offsetUnit = attributesFormData.getIn( [ 'offsetB', '_unit' ] );

              let offsetB = new Map( {
                length: endAt,
                _length: convert( endAt ).from( context.catalog.unit ).to( offsetUnit ),
                _unit: offsetUnit
              } );

              attributesFormData = attributesFormData.set( 'offsetB', offsetB ).set( 'offset', offset );

              let offsetAttribute = new Map( {
                length: MathUtils.toFixedFloat( lengthValue, PRECISION ),
                _unit: value.get( '_unit' ),
                _length: MathUtils.toFixedFloat( convert( lengthValue ).from( context.catalog.unit ).to( value.get( '_unit' ) ), PRECISION )
              } );

              attributesFormData = attributesFormData.set( attributeName, offsetAttribute );

              break;
            }
          case 'offsetB':
            {
              let line = props.layer.lines.get( props.element.line );

              let orderedVertices = GeometryUtils.orderVertices( [
                props.layer.vertices.get( line.vertices.get( 0 ) ),
                props.layer.vertices.get( line.vertices.get( 1 ) )
              ] );

              let [ { x: x0, y: y0 }, { x: x1, y: y1 } ] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints( x0, y0, x1, y1 );
              let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
              let widthLength = props.element.properties.get( 'width' ).get( 'length' );
              let halfWidthLength = widthLength / 2;

              let lengthValue = value.get( 'length' );
              lengthValue = Math.max( lengthValue, 0 );
              lengthValue = Math.min( lengthValue, lineLength - widthLength );

              let xp = x1 - ( lengthValue + halfWidthLength ) * Math.cos( alpha );
              let yp = y1 - ( lengthValue + halfWidthLength ) * Math.sin( alpha );

              let offset = GeometryUtils.pointPositionOnLineSegment( x0, y0, x1, y1, xp, yp );

              let startAt = MathUtils.toFixedFloat( ( lineLength * offset ) - halfWidthLength, PRECISION );
              let offsetUnit = attributesFormData.getIn( [ 'offsetA', '_unit' ] );

              let offsetA = new Map( {
                length: startAt,
                _length: convert( startAt ).from( context.catalog.unit ).to( offsetUnit ),
                _unit: offsetUnit
              } );

              attributesFormData = attributesFormData.set( 'offsetA', offsetA ).set( 'offset', offset );

              let offsetAttribute = new Map( {
                length: MathUtils.toFixedFloat( lengthValue, PRECISION ),
                _unit: value.get( '_unit' ),
                _length: MathUtils.toFixedFloat( convert( lengthValue ).from( context.catalog.unit ).to( value.get( '_unit' ) ), PRECISION )
              } );

              attributesFormData = attributesFormData.set( attributeName, offsetAttribute );

              break;
            }
          default:
            {
              attributesFormData = attributesFormData.set( attributeName, value );
              break;
            }
        };
        break;
      }
      default:
        break;
    }

    setFormData( ( prevState ) => ( { ...prevState, attributesFormData } ) );
    save( { attributesFormData, isEnter } );
  };

  const updateProperty = ( propertyName, value, isEnter ) => {
    let { propertiesFormData } = formData;

    propertiesFormData = propertiesFormData.setIn( [ propertyName, 'currentValue' ], value );
    setFormData( ( prevState ) => ( { ...prevState, propertiesFormData } ) );
    save( { propertiesFormData, isEnter: isEnter || false } );

  };

  const save = ( { propertiesFormData, attributesFormData, isEnter } ) => {
    if ( propertiesFormData ) {
      let properties = propertiesFormData.map( data => {
        return data.get( 'currentValue' );
      } );
      context.projectActions.setProperties( properties );
    }

    if ( attributesFormData ) {
      switch ( props.element.prototype ) {
        case 'items': {
          context.projectActions.setItemsAttributes( attributesFormData );
          break;
        }
        case 'lines': {
          context.projectActions.setLinesAttributes( attributesFormData );
          break;
        }
        case 'holes': {
          context.projectActions.setHolesAttributes( attributesFormData );
          break;
        }
      }
    }

    if ( props.state.mode == MODE_DRAWING_LINE && isEnter )
      context.projectActions.next_Drawing_Item();
  };

  const { attributesFormData, propertiesFormData } = formData;
  return {
    formData,
    attributes: attributesFormData,
    properties: propertiesFormData,
    updateAttribute,
    updateProperty
  };

}