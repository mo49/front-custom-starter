import 'babel-polyfill';
import $ from 'jquery';
// import './util/GA';
import './util/Viewport';
import './util/Gototop';
import UA from './util/UA';
import WindowScroller from './util/WindowScroller';
import loadImage from './util/loadImage';
import { banPinchInOut } from './util/banPinchInOut';
import { banDoubleTap } from './util/banDoubleTap';
import { checkOrientation } from './util/checkOrientation';
import './lib/Gnav';
import './lib/Youtube';
import Cookie from './lib/Cookie';
import Modal from './lib/Modal';
import { initialVisit } from './lib/initialVisit';
import IMAGE_SRCS from './data/imageSrcs';

// -------------------------------------------
// 初期設定
// -------------------------------------------
const cookie = new Cookie();
const ua = new UA();
const isSP = ua.get().Mobile;
const windowScroller = new WindowScroller();

ua.initSetting();
windowScroller.stop();

if (isSP) {
  banPinchInOut();
  banDoubleTap(document.documentElement);
  checkOrientation();
}

// -------------------------------------------
// Promise
// --------------------------------------------
const loadImages = Promise.all(IMAGE_SRCS.map(loadImage));

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([loadImages /* , loadFonts, loadSVGs, ...and so on */])
    .then((assets) => {
      console.log(assets[0]) // Loaded images!
      $('#loading').fadeOut(function(){$(this).remove()});
      windowScroller.start();
      setTimeout(init, 500);
    })
    .catch(console.error)
})

// -------------------------------------------
// init
// -------------------------------------------
function init() {

// 初回モーダル
if ( !cookie.getUserSiteVisited() ) initialVisit();
cookie.setUserSiteVisited(1);

// サウンドチェックモーダル
new Modal({
  $modal: $('#soundCheckModal'),
  $openButton: $('.js-soundCheckModalOpenButton'),
  $toggleButton: $('.js-soundCheckModalToggleButton'),
  isAutoOpen: true,
  fadeDuration: 0
});

// youtubeモーダル
new Modal({
  $modal: $('#youtubeModal'),
  $openButton: $('.js-youtubeModalOpenButton'),
  $toggleButton: $('.js-youtubeModalToggleButton')
});


}
