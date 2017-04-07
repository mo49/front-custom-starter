// -----------------------------------
// user event 振り分け
// -----------------------------------

import UA from './UA';

const isSP = new UA().get().Mobile;

const supportTouch = 'ontouchend' in document;

export const userEvent = {
  click      : 'click',
  touchstart : (isSP && supportTouch) ? 'touchstart' : 'mousedown',
  touchmove  : (isSP && supportTouch) ? 'touchmove' : 'mousemove',
  touchend   : (isSP && supportTouch) ? 'touchend' : 'mouseup',
}
