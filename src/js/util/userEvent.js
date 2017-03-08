// -----------------------------------
// user event 振り分け
// -----------------------------------

import UA from './UA';

const isSP = new UA().get().Mobile;

export const userClick = (isSP) ? 'touchstart' : 'click';
