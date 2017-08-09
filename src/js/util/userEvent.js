// -----------------------------------
// user event 振り分け
// -----------------------------------

const supportTouch = 'ontouchend' in document;

module.exports = {
  touchstart : (window.is_sp && supportTouch) ? 'touchstart' : 'mousedown',
  touchmove  : (window.is_sp && supportTouch) ? 'touchmove' : 'mousemove',
  touchend   : (window.is_sp && supportTouch) ? 'touchend' : 'mouseup',
}
