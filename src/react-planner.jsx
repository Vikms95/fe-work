import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { getIsElementSelected, isMultipleSelection } from './selectors/selectors';
import { objectsMap } from './utils/objects-utils';

import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents,
  TopbarComponents,
  DirectionComponent,
  MenuRoomsComponent,
  LoginComponent,
  RegisterComponent,
  MainComponent,
  MenuConstruccion,
  MenuMuebles,
  MenuPreferencias
} from './components/export';

import { VERSION } from './version';
import './styles/export';

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;
const { TopBar } = TopbarComponents;
const { Direction } = DirectionComponent;
const { MenuRooms } = MenuRoomsComponent;

const toolbarW = 122;
const sidebarW = 280;
const footerBarH = 20;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

class ReactPlanner extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      contentW: props.width - toolbarW + 14.6,
      contentH: props.height - footerBarH,
      toolbarH: props.height - 72, // 72 from topBar Height
      sideBarW: props.width - 257, // 257 from sideBar Width
      sideBarH: props.height - ( 82 + 120 ), // 72 from topBar Height and 130 from direction Height con los px de los borders
      directionW: props.width - 257, // 257 from direction Width

      // Change them together instead of iterating
      menus: {
        menuRooms: false,
        menuMuebles: false,
        menuConstruccion: false,
      }
    };

    this.refViewer = React.createRef();

    this.panUp = this.panUp.bind( this );
    this.zoomIn = this.zoomIn.bind( this );
    this.panDown = this.panDown.bind( this );
    this.zoomOut = this.zoomOut.bind( this );
    this.panLeft = this.panLeft.bind( this );
    this.panRight = this.panRight.bind( this );

    this.update2DView = this.update2DView.bind( this );
    this.update2DViewObject = this.update2DViewObject.bind( this );
    this.update2DViewOnState = this.update2DViewOnState.bind( this );
    this.handleToolbarButtons = this.handleToolbarButtons.bind( this );

    this.getState = this.getState.bind( this );
  }

  getChildContext () {
    return {
      ...objectsMap( actions, actionNamespace => this.props[ actionNamespace ] ),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  componentWillMount () {
    let { store } = this.context;
    let {
      projectActions,
      catalog,
      stateExtractor,
      plugins,
      prefs,
      prefsInfo,
      state
    } = this.props;
    plugins.forEach( plugin => plugin( store, stateExtractor ) );
    projectActions.initCatalog( catalog );
    projectActions.SetPreference( prefs, prefsInfo );
  }

  componentWillReceiveProps ( nextProps ) {
    let { stateExtractor, state, projectActions, catalog } = nextProps;
    let plannerState = stateExtractor( state );
    let catalogReady = plannerState.getIn( [ 'catalog', 'ready' ] );
    if ( !catalogReady ) {
      projectActions.initCatalog( catalog );
    }
  }


  getState () {
    return this.props.stateExtractor( this.props.state );
  }

  isElementSelected () {
    const { state } = this.props;
    const plannerState = this.getState( state );
    return getIsElementSelected( plannerState );
  }

  panUp ( value ) {
    return { ...value, f: value.f + 50 };
  }

  panDown ( value ) {
    return { ...value, f: value.f - 50 };
  }

  panLeft ( value ) {
    return { ...value, e: value.e + 50 };
  }

  panRight ( value ) {
    return { ...value, e: value.e - 50 };
  }

  zoomIn () {
    this.refViewer.current.zoomOnViewerCenter( 1.03 );
  }

  zoomOut () {
    this.refViewer.current.zoomOnViewerCenter( 0.97 );
  }

  update2DView ( value, event ) {
    const isKeystroke = this.getEventType( event );
    const direction = this.getEventDirection( event, isKeystroke );

    if ( this.isClickWithoutSelection( direction ) ) {
      value = this.update2DViewObject( value, direction );
    }

    return this.update2DViewOnState( value );
  }

  getEventDirection ( event, isKeyStroke ) {
    if ( !event ) return;
    if ( isKeyStroke ) return event.key;
    return event.target.id;
  }

  getEventType ( event ) {
    if ( !event ) return;
    return typeof event.key === 'string';
  }

  isClickWithoutSelection ( input, isKeyStroke ) {
    const isSelected = this.isElementSelected();
    return input && !isKeyStroke && !isSelected;
  }

  update2DViewObject ( value, directionPressed ) {
    switch ( directionPressed ) {
      case 'ArrowUp':
        return this.panUp( value );
      case 'ArrowDown':
        return this.panDown( value );
      case 'ArrowRight':
        return this.panRight( value );
      case 'ArrowLeft':
        return this.panLeft( value );

      case '+':
      case 'ZoomIn':
        return this.zoomIn();

      case '-':
      case 'ZoomOut':
        return this.zoomOut();

      default:
        return value;
    }
  }

  update2DViewOnState ( value ) {
    if ( !value ) return;
    this.props.projectActions.updateZoomScale( value.a );
    return this.props.viewer2DActions.updateCameraView( value );
  }

  handleToolbarButtons ( menu ) {
    const menus = {
      menuRooms: false,
      menuMuebles: false,
      MenuConstruccion: false
    };

    if ( menu ) {
      menus[ menu ] = true;
    }

    this.setState( { menus: menus } );
  }

  render () {
    const { update2DView } = this;
    const { width, height, state, stateExtractor, ...props } = this.props;
    const { contentH, contentW, directionW, sideBarH, sideBarW, toolbarH } = this.state;
    let extractedState = stateExtractor( state );

    const unselectAllSubmenuButtons = () => (
      Array.from(
        document.querySelectorAll( '.rectangulo.active' ) )
        .forEach( el => el.classList.remove( 'active' ) )
    );

    return (
      // <div>
      //   <TopBar />
      //   <div style={{ ...wrapperStyle, height }}>
      //     <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...props} />
      //     <div style={{ position: 'relative' }}>
      //       <MenuRooms state={state} {...props} />
      //       <Content style={{ position: 'absolute', zIndex: '0' }} width={contentW} height={contentH} state={extractedState} {...props} onWheel={event => event.preventDefault()} />
      //     </div>
      //     <Sidebar state={extractedState} {...props} />
      //   </div>
      //   <div style={{ position: 'absolute', left: '84%', bottom: '0', width: '16%', height: '11.5em', Zindex: '9002' }}>
      //     <Direction state={extractedState} />
      //   </div>
      //   {/*<FooterBar width={width} height={footerBarH} state={extractedState} {...props} />*/}
      // </div>
      <div>
        <MainComponent state={ state } { ...props } />

        <TopBar state={ extractedState } { ...props } />

        <div style={ { ...wrapperStyle, height } }>

          <Toolbar
            width={ toolbarW }
            height={ toolbarH }
            state={ extractedState }
            menus={ this.state.menus }
            handleToolbarButtons={ this.handleToolbarButtons }
            unselectAllSubmenuButtons={ unselectAllSubmenuButtons }
            { ...props }
          />

          <div style={ { position: 'relative' } }>

            <MenuRooms
              state={ state }
              handleToolbarButtons={ this.handleToolbarButtons }
              unselectAllSubmenuButtons={ unselectAllSubmenuButtons }
              { ...props }
            />
            <MenuConstruccion
              state={ state }
              handleToolbarButtons={ this.handleToolbarButtons }
              unselectAllSubmenuButtons={ unselectAllSubmenuButtons }
              { ...props }
            />
            <MenuMuebles
              state={ state }
              handleToolbarButtons={ this.handleToolbarButtons }
              unselectAllSubmenuButtons={ unselectAllSubmenuButtons }
              { ...props }
            />
            <LoginComponent state={ extractedState } { ...props } />
            <RegisterComponent state={ state } { ...props } />
            <MenuPreferencias state={ state } { ...props } />

            <Content
              style={ { position: 'absolute', zIndex: '0' } }
              width={ contentW }
              height={ contentH }
              state={ extractedState }
              refViewer2D={ this.refViewer }
              update2DView={ update2DView }
              onWheel={ event => event.preventDefault() }
              { ...props }
            />

          </div>


          <Sidebar
            state={ extractedState }
            width={ sideBarW }
            height={ sideBarH }
            { ...props }
          />

          {
            this.refViewer && (
              <Direction
                width={ directionW }
                state={ extractedState }
                refViewer2D={ this.refViewer }
                handleZoom2D={ this.handleZoom2D }
                update2DView={ update2DView }
                { ...props }

              />
            )
          }
        </div>
        {/* <FooterBar width={width} height={footerBarH} state={extractedState} {...props} /> */ }
      </div>
    );
  }
}

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf( Translator ),
  catalog: PropTypes.instanceOf( Catalog ),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf( PropTypes.func ),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string,
  //prefsInfo: PropTypes.object,
  //prefs: PropTypes.object,
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
  ...objectsMap( actions, () => PropTypes.object ),
  translator: PropTypes.object,
  catalog: PropTypes.object,
};

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `For2Home ${ VERSION }`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
  prefsInfo: {},
  prefs: {},
};

//redux connect
function mapStateToProps ( reduxState ) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps ( dispatch ) {
  return objectsMap( actions, actionNamespace => bindActionCreators( actions[ actionNamespace ], dispatch ) );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReactPlanner );
