// -----------------------------------
// user event 振り分け
// -----------------------------------

// import UA from './UA';
//
// const isSP = new UA().get().Mobile;

const supportTouch = 'ontouchend' in document;

export const userClick = (supportTouch) ? 'touchstart' : 'click';
