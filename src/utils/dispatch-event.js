export const dispatch3DZoomIn = ( canvas ) => {
  const evt = new Event( 'wheel', { bubbles: true, cancelable: true } );
  evt.deltaY = -240;
  canvas.dispatchEvent( evt );
};
export const dispatch3DZoomOut = ( canvas ) => {
  const evt = new Event( 'wheel', { bubbles: true, cancelable: true } );
  evt.deltaY = +240;
  canvas.dispatchEvent( evt );
};
export const dispatch3DMoveLeft = () => {
  const evtDown = new KeyboardEvent( 'keydown', { bubbles: true, cancelable: true, key: 'ArrowLeft', keyCode: 37 } );
  const evtUp = new KeyboardEvent( 'keyup', { bubbles: true, cancelable: true, key: 'ArrowLeft', keyCode: 37 } );
  document.dispatchEvent( evtDown );
  document.dispatchEvent( evtUp );
};
export const dispatch3DMoveRight = () => {
  const evtDown = new KeyboardEvent( 'keydown', { bubbles: true, cancelable: true, key: 'ArrowRight', keyCode: 39 } );
  const evtUp = new KeyboardEvent( 'keyup', { bubbles: true, cancelable: true, key: 'ArrowRight', keyCode: 39 } );
  document.dispatchEvent( evtDown );
  document.dispatchEvent( evtUp );
};
export const dispatch3DMoveUp = () => {
  const evtDown = new KeyboardEvent( 'keydown', { bubbles: true, cancelable: true, key: 'ArrowUp', keyCode: 38 } );
  const evtUp = new KeyboardEvent( 'keyup', { bubbles: true, cancelable: true, key: 'ArrowUp', keyCode: 38 } );
  document.dispatchEvent( evtDown );
  document.dispatchEvent( evtUp );
};
export const dispatch3DMoveDown = () => {
  const evtDown = new KeyboardEvent( 'keydown', { bubbles: true, cancelable: true, key: 'ArrowDown', keyCode: 40 } );
  const evtUp = new KeyboardEvent( 'keyup', { bubbles: true, cancelable: true, key: 'ArrowDown', keyCode: 40 } );
  console.log( evtDown );
  document.dispatchEvent( evtDown );
  document.dispatchEvent( evtUp );
};

export const dispatch2DZoomIn = ( grid ) => {
  const evt = new Event( 'wheel', { bubbles: true, cancelable: true } );
  evt.deltaY = -240;
  //evt.pageX = window.pageXOffset / 2;
  //evt.pageX = window.pageYOffset / 2;
  window.dispatchEvent( evt );
};

export const dispatch2DZoomOut = ( grid ) => {
  const evt = new Event( 'wheel', { bubbles: true, cancelable: true } );
  evt.deltaY = -240;
  window.dispatchEvent( evt );
};
