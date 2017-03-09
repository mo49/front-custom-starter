// -----------------------------------
// user event 振り分け
// -----------------------------------

import UA from './UA';

const isSP = new UA().get().Mobile;

const supportTouch = 'ontouchend' in document;

export const userEvent = {
  click      : (isSP && supportTouch) ? 'touchstart' : 'click',
  touchstart : supportTouch ? 'touchstart' : 'mousedown',
  touchmove  : supportTouch ? 'touchmove' : 'mousemove',
  touchend   : supportTouch ? 'touchend' : 'mouseup',
}
