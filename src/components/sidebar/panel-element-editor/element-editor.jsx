import React, { Component, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import AttributesEditor from './attributes-editor/attributes-editor';
import { GeometryUtils, MathUtils } from '../../../utils/export';
import * as SharedStyle from '../../../shared-style';
import convert from 'convert-units';
// import from '../../../assets/';

import flecha from './../../../assets/generalItems/flecha.png';
import puertas from './../../../assets/construccion/puertas.png';
import { Line } from '../../../class/export';
import { MODE_DRAWING_LINE } from '../../../constants';
import { PropertyLengthMeasure } from '../../../catalog/properties/export';
import { getCacheAngulo, isMultipleSelection } from '../../../selectors/selectors';
import { Context } from '../../../context/context';
import { useFormData } from '../../../hooks/useFormData';
import { useToggle } from '../../../hooks/useToggle';
import MenuOptions from '../../menu-options/menu-options';

import { ElementPrice } from './element-price';
import { ElementEditorIcons } from './element-editor-icons';
import { ElementInfo } from './element-info';
import { PropertiesEditor } from './properties-editor/properties-editor';
import { PropertiesMenuButton } from './properties-editor/properties-menu-button';
import { ElementTextureDisplay } from './properties-editor/element-texture-display';


const PRECISION = 2;

// const STYLE_ATTR_PROP_SEPARATOR = {
//   margin: '0.5em 0.25em 0.5em 0',
//   border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
//   position: 'relative',
//   height: '2.5em',
//   borderRadius: '2px'
// };

// const STYLE_HEAD_ACTION = {
//   position: 'absolute',
//   right: '0.5em',
//   top: '0.5em'
// };

// const STYLE_ICON_HEAD = {
//   float: 'right',
//   margin: '-3px 4px 0px 0px',
//   padding: 0,
//   cursor: 'pointer',
//   fontSize: '1.4em'
// };

// export default function ElementEditor ( props ) {
//   const { state, element } = props;
//   const mode = props.state.getIn( [ 'mode' ] );

//   const context = useContext( Context );
//   const { projectActions, catalog } = context;

//   const data = useFormData( props, context );
//   const { formData, attributes, properties } = data;
//   const { updateAttribute, updateProperty } = data;

//   const { isSelectAcabado, handleAcabado } = useToggle();

//   return (
//     <div style={ { marginTop: '2em' } }>
//       <div style={ { display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', marginBottom: '45px' } }>
//         <img style={ { height: '80px', width: '80px', paddingTop: '10px' } } src={ element.image } />
//         <p style={ { margin: '0', padding: '10px 0', fontSize: '0.8em', textAlign: 'center', color: SharedStyle.PRIMARY_COLOR.master, /*fontWeight: 'bold'*/ } }>

//           { element.name }

//         </p>
//         <p style={ { margin: '0', fontSize: '0.7em', textAlign: 'center' } }>

//           { element.description }

//         </p>
//       </div>

//       { console.log( 'test', attributes ) }
//       <AttributesEditor
//         mode={ mode }
//         position={ 1 }
//         state={ state }
//         element={ element }
//         onUpdate={ updateAttribute }
//         attributeFormData={ attributes }
//         projectActions={ projectActions }
//         unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//       />

//       { properties.entrySeq()
//         .map( ( [ propertyName, data ] ) => {
//           if ( propertyName.includes( 'texture' ) === false ) {
//             const configs = data.get( 'configs' );
//             const currentValue = data.get( 'currentValue' );
//             const label = properties.getIn( [ propertyName, 'configs' ] ).label;

//             if ( configs.type === 'length-measure' ) {
//               return (
//                 <PropertyLengthMeasure
//                   mode={ mode }
//                   key={ propertyName }
//                   stateRedux={ state }
//                   state={ properties }
//                   sourceElement={ element }
//                   attributeName={ propertyName }
//                   projectActions={ projectActions }
//                   unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//                   configs={ { label: label, min: 0, max: Infinity, precision: 2 } }
//                   value={ properties.getIn( [ propertyName, "currentValue" ] ) }
//                   onUpdate={ ( value, isEnter ) => updateProperty( propertyName, value, isEnter ) }
//                 />
//               );

//             } else {
//               let { Editor } = catalog.getPropertyType( configs.type );

//               return (
//                 <Editor
//                   configs={ configs }
//                   key={ propertyName }
//                   value={ currentValue }
//                   stateRedux={ state }
//                   sourceElement={ element }
//                   internalState={ formData }
//                   propertyName={ propertyName }
//                   unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//                   onUpdate={ value => updateProperty( propertyName, value ) }
//                 />
//               );
//             }
//           }
//         } ) }

//       <AttributesEditor
//         mode={ mode }
//         position={ 2 }
//         state={ state }
//         element={ element }
//         onUpdate={ updateAttribute }
//         attributeFormData={ attributes }
//         projectActions={ projectActions }
//         unit={ state.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
//       />

//       <div style={ { marginTop: '6px' } }>
//         <div>
//           <div
//             onClick={ handleAcabado }
//             style={ { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer', paddingBottom: '34px' } }>
//             <p style={ {
//               margin: '0',
//               fontSize: '0.75em',
//               color: SharedStyle.PRIMARY_COLOR.master,
//             } }>Acabado</p>
//             <img style={ { height: '0.70em', marginLeft: '1.8em', marginTop: '1px' } } src={ flecha } />
//           </div>

//           <div id={ 'panelAcabado' }
//             style={ ( isSelectAcabado )
//               ? { display: 'block', width: '100%', height: '100%', paddingBottom: '10px' }
//               : { /*width: '100%', height: '100%',*/ display: 'none' } }>

//             { properties.entrySeq()
//               .map( ( [ propertyName, data ] ) => {

//                 if ( propertyName.includes( 'texture' ) ) {
//                   let currentValue = data.get( 'currentValue' ), configs = data.get( 'configs' );

//                   let { Editor } = catalog.getPropertyType( configs.type );

//                   return (
//                     <Editor
//                       state={ state }
//                       configs={ configs }
//                       key={ propertyName }
//                       value={ currentValue }
//                       sourceElement={ element }
//                       internalState={ formData }
//                       propertyName={ propertyName }
//                       onUpdate={ value => updateProperty( propertyName, value ) }
//                     />
//                   );
//                 }
//               } )
//             }
//           </div>

//           <div style={ { display: 'flex', justifyItems: 'center', height: '25px', width: '5.5em', cursor: 'pointer' } }>
//             <p style={ {
//               margin: '0',
//               fontSize: '0.75em',
//               color: SharedStyle.PRIMARY_COLOR.master,
//             } }>Opciones</p>
//             <img style={ { height: '0.70em', marginLeft: '1.6em', marginTop: '1px' } } src={ flecha } />
//           </div>
//         </div>
//       </div >
//     </div >
//   );
// }

export default class ElementEditor extends Component {
  constructor ( props, context ) {
    super( props, context );

    this.state = {
      isSelectAcabado: false,
      attributesFormData: this.initAttrData( this.props.element, this.props.layer, this.props.state ),
      propertiesFormData: this.initPropData( this.props.element, this.props.layer, this.props.state ),
      isOptionsMenuActive: false,
      price: this.context.catalog.getElement( this.props.element.type ).info.price
    };

    this.save = this.save.bind( this );
    this.initAttrData = this.initAttrData.bind( this );
    this.initPropData = this.initPropData.bind( this );
    this.updateAttribute = this.updateAttribute.bind( this );
    this.updateProperty = this.updateProperty.bind( this );
    this.closeOptionsMenu = this.closeOptionsMenu.bind( this );
    this.toggleOptionsMenu = this.toggleOptionsMenu.bind( this );
  }

  //FIXME this has been commented bc it was preventing the lower components from getting    
  //the updated state

  // shouldComponentUpdate ( nextProps, nextState ) {
  //   return (
  //     this.state.isSelectAcabado !== nextState.isSelectAcabado ||
  //     this.props.state.isElementSelected !== nextProps.state.isElementSelected ||
  //     this.state.attributesFormData.hashCode() !== nextState.attributesFormData.hashCode() ||
  //     this.state.propertiesFormData.hashCode() !== nextState.propertiesFormData.hashCode() ||
  //     this.props.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode()
  //   );
  // }

  UNSAFE_componentWillReceiveProps ( { element, layer, state } ) {
    let { prototype, id } = element;
    let scene = this.props.state.get( 'scene' );
    let selectedLayer = scene.getIn( [ 'layers', scene.get( 'selectedLayer' ) ] );
    let selected = selectedLayer.getIn( [ prototype, id ] );

    /* //TODO Figure out what's the logic behind checking whether the
     layer passed as props is different from the selected ones */
    if ( selectedLayer.hashCode() !== layer.hashCode() ) {
      this.setState( {
        attributesFormData: this.initAttrData( element, layer, state ),
        propertiesFormData: this.initPropData( element, layer, state )
      } );
    }
  }


  initAttrData ( element, layer ) {

    element = ( typeof element.misc === 'object' )
      ? element.set( 'misc', new Map( element.misc ) )
      : element;

    switch ( element.prototype ) {
      case 'items': {
        return new Map( { element } );
        // let depth = element.depth;
        // let height = element.depth;
        // let _unit = element.misc.get( '_unitLength' ) || this.context.catalog.unit;
        // let _depthLength = convert( depth ).from( this.context.catalog.unit ).to( _unit );
        // let _depthHeight = convert( height ).from( this.context.catalog.unit ).to( _unit );

        // console.log( element );
        // return new Map( {
        //   id: element.id,
        //   type: element.type,
        //   prototype: element.prototype,
        //   name: element.name,
        //   description: element.description,
        //   image: element.image,
        //   misc: element.misc,
        //   selected: element.selected,
        //   properties: element.properties,
        //   visible: element.visible,
        //   x: element.x,
        //   y: element.y,
        //   rotation: element.rotation,
        //   width: element.width,
        //   depth: new Map( { length: depth, _length: _depthLength, _unit } ),
        //   height: new Map( { length: height, _length: _depthHeight, _unit } ),
        // } );
      }
      case 'lines': {

        let v2First = element.v2First;
        let v_a = layer.vertices.get( element.vertices.get( !v2First ? 0 : 1 ) );
        let v_b = layer.vertices.get( element.vertices.get( 1 ) );

        let distance = GeometryUtils.pointsDistance( v_a.x, v_a.y, v_b.x, v_b.y );
        let _unit = element.misc.get( '_unitLength' ) || this.context.catalog.unit;
        let _length = convert( distance ).from( this.context.catalog.unit ).to( _unit );
        let _angleLine = Line.getAngleV0_pcl( layer, element );

        //TODO test when pressing enter and creating a new line
        // use the cached angulo for this new line 
        if ( distance === 0 && getCacheAngulo( this.props.state ) ) {
          _angleLine.angle = getCacheAngulo( this.props.state );
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

        let _unitA = element.misc.get( '_unitA' ) || this.context.catalog.unit;
        let _lengthA = convert( startAt ).from( this.context.catalog.unit ).to( _unitA );

        let endAt = lineLength - lineLength * element.offset - element.properties.get( 'width' ).get( 'length' ) / 2;
        let _unitB = element.misc.get( '_unitB' ) || this.context.catalog.unit;
        let _lengthB = convert( endAt ).from( this.context.catalog.unit ).to( _unitB );

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
  }

  initPropData ( element ) {
    let { catalog } = this.context;
    let catalogElement = catalog.getElement( element.type );

    let mapped = {};

    if ( catalogElement.info.price )
      this.setState( { price: catalogElement.info.price } );

    for ( let name in catalogElement.properties ) {
      mapped[ name ] = new Map( {
        currentValue: element.properties.has( name )
          ? element.properties.get( name )
          : fromJS( catalogElement.properties[ name ].defaultValue ),

        configs: catalogElement.properties[ name ]
      } );
    }

    return new Map( mapped );
  }


  updateAttribute ( attributeName, value, isEnter ) {
    let { attributesFormData } = this.state;

    switch ( this.props.element.prototype ) {
      case 'items': {
        attributesFormData = attributesFormData.set( attributeName, value );
        // this.setState( { attributesFormData } );
        break;
      }
      case 'lines':

        attributesFormData = attributesFormData.set( attributeName, value );
        this.setState( { attributesFormData } );

        if ( isEnter && !isMultipleSelection( this.props.state ) ) {
          const cachedAngulo = document.querySelector( '.lineAngle' ).value;
          this.context.linesActions.cacheAngulo( cachedAngulo );
        }
        break;

      //case 'lineLength':
      //  {
      //    let v_0 = attributesFormData.get('vertexOne');
      //    let v_1 = attributesFormData.get('vertexTwo');

      //    let [v_a, v_b] = GeometryUtils.orderVertices([v_0, v_1]);

      //    let v_b_new = GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);

      //    attributesFormData = attributesFormData.withMutations(attr => {
      //      attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
      //      attr.set('lineLength', value);
      //    });
      //    break;
      //  }
      //case 'vertexOne':
      //case 'vertexTwo':
      //  {
      //    attributesFormData = attributesFormData.withMutations(attr => {
      //      attr.set(attributeName, attr.get(attributeName).merge(value));

      //      let newDistance = GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

      //      attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
      //        'length': newDistance,
      //        '_length': convert(newDistance).from(this.context.catalog.unit).to(attr.get('lineLength').get('_unit'))
      //      }));
      //    });
      //    break;
      //  }
      case 'holes': {
        switch ( attributeName ) {
          case 'offsetA':
            {
              let line = this.props.layer.lines.get( this.props.element.line );

              let orderedVertices = GeometryUtils.orderVertices( [
                this.props.layer.vertices.get( line.vertices.get( 0 ) ),
                this.props.layer.vertices.get( line.vertices.get( 1 ) )
              ] );

              let [ { x: x0, y: y0 }, { x: x1, y: y1 } ] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints( x0, y0, x1, y1 );
              let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
              let widthLength = this.props.element.properties.get( 'width' ).get( 'length' );
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
                _length: convert( endAt ).from( this.context.catalog.unit ).to( offsetUnit ),
                _unit: offsetUnit
              } );

              attributesFormData = attributesFormData.set( 'offsetB', offsetB ).set( 'offset', offset );

              let offsetAttribute = new Map( {
                length: MathUtils.toFixedFloat( lengthValue, PRECISION ),
                _unit: value.get( '_unit' ),
                _length: MathUtils.toFixedFloat( convert( lengthValue ).from( this.context.catalog.unit ).to( value.get( '_unit' ) ), PRECISION )
              } );

              attributesFormData = attributesFormData.set( attributeName, offsetAttribute );

              break;
            }
          case 'offsetB':
            {
              let line = this.props.layer.lines.get( this.props.element.line );

              let orderedVertices = GeometryUtils.orderVertices( [
                this.props.layer.vertices.get( line.vertices.get( 0 ) ),
                this.props.layer.vertices.get( line.vertices.get( 1 ) )
              ] );

              let [ { x: x0, y: y0 }, { x: x1, y: y1 } ] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints( x0, y0, x1, y1 );
              let lineLength = GeometryUtils.pointsDistance( x0, y0, x1, y1 );
              let widthLength = this.props.element.properties.get( 'width' ).get( 'length' );
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
                _length: convert( startAt ).from( this.context.catalog.unit ).to( offsetUnit ),
                _unit: offsetUnit
              } );

              attributesFormData = attributesFormData.set( 'offsetA', offsetA ).set( 'offset', offset );

              let offsetAttribute = new Map( {
                length: MathUtils.toFixedFloat( lengthValue, PRECISION ),
                _unit: value.get( '_unit' ),
                _length: MathUtils.toFixedFloat( convert( lengthValue ).from( this.context.catalog.unit ).to( value.get( '_unit' ) ), PRECISION )
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

    this.setState( { attributesFormData } );
    this.save( { attributesFormData, isEnter } );
  }

  updateProperty ( propertyName, value, isEnter ) {
    let { state: { propertiesFormData } } = this;

    propertiesFormData = propertiesFormData.setIn( [ propertyName, 'currentValue' ], value );
    this.setState( { propertiesFormData } );
    this.save( { propertiesFormData, isEnter: isEnter || false } );

  }


  // Here the values taken from the form data are saved in state
  save ( { propertiesFormData, attributesFormData, isEnter } ) {
    if ( propertiesFormData ) {
      let properties = propertiesFormData.map( data => {
        return data.get( 'currentValue' );
      } );

      this.context.projectActions.setProperties( properties );
    }

    if ( attributesFormData ) {
      switch ( this.props.element.prototype ) {
        case 'items': {
          this.context.projectActions.setItemsAttributes( attributesFormData );
          break;
        }
        case 'lines': {
          this.context.projectActions.setLinesAttributes( attributesFormData );
          break;
        }
        case 'holes': {
          this.context.projectActions.setHolesAttributes( attributesFormData );
          break;
        }
      }
    }

    if ( this.props.state.mode == MODE_DRAWING_LINE && isEnter )
      this.context.projectActions.next_Drawing_Item();
  }

  //reset () {
  //  this.setState( { propertiesFormData: this.initPropData( this.props.element, this.props.layer, this.props.state ) } );
  //}

  //copyProperties ( properties ) {
  //  this.context.projectActions.copyProperties( properties );
  //}

  //pasteProperties () {
  //  this.context.projectActions.pasteProperties();
  //}

  closeOptionsMenu () {
    this.setState( { isOptionsMenuActive: false } );
  }

  toggleOptionsMenu () {
    this.setState( { isOptionsMenuActive: !this.state.isOptionsMenuActive } );
  }

  render () {
    let mode = this.props.state.getIn( [ 'mode' ] );
    let {
      props: { state: appState, element },
      context: { projectActions, catalog },
      state: { propertiesFormData, attributesFormData },
    } = this;


    const showAndHideAcabado = () => {
      if ( this.state.isSelectAcabado ) {
        this.setState( { ...this.state, isSelectAcabado: false } );
      } else {
        this.setState( { ...this.state, isSelectAcabado: true } );
      }
    };



    return (
      <div style={ { marginTop: '2em' } }>
        <ElementPrice price={ this.state.price } />

        <ElementInfo element={ element } />

        <ElementEditorIcons />

        <AttributesEditor
          mode={ mode }
          position={ 1 }
          state={ appState }
          element={ element }
          onUpdate={ this.updateAttribute }
          attributeFormData={ attributesFormData }
          projectActions={ this.context.projectActions }
          unit={ appState.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
        />

        <PropertiesEditor
          mode={ mode }
          appState={ appState }
          element={ element }
          catalog={ catalog }
          internalState={ this.state }
          projectActions={ projectActions }
          propertiesFormData={ propertiesFormData }
          updateProperty={ this.updateProperty }
        />

        <AttributesEditor
          mode={ mode }
          position={ 2 }
          state={ appState }
          element={ element }
          onUpdate={ this.updateAttribute }
          attributeFormData={ attributesFormData }
          projectActions={ this.context.projectActions }
          unit={ appState.getIn( [ "prefs", "UNIDADMEDIDA" ] ) }
        />

        <div style={ { marginTop: '6px' } }>
          <PropertiesMenuButton
            toggleOptionsMenu={ this.toggleOptionsMenu }
          />

          <MenuOptions
            state={ appState }
            element={ element }
            propertiesFormData={ propertiesFormData }
            closeOptionsMenu={ this.closeOptionsMenu }
            updateProperty={ this.updateProperty }
            isOptionsMenuActive={ this.state.isOptionsMenuActive }
          />

          <ElementTextureDisplay
            element={ element }
          />

        </div >
      </div >
    );
  }
}


ElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

ElementEditor.contextType = Context;

// ElementEditor.contextTypes = {
//   projectActions: PropTypes.object.isRequired,
//   linesActions: PropTypes.object.isRequired,
//   catalog: PropTypes.object.isRequired,
//   translator: PropTypes.object.isRequired,
// };