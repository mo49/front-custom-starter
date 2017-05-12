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
import IMAGE_SRCES from './data/imageSrces';

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

const p_loadDOM = new Promise((resolve,reject) => {
  window.addEventListener("load", resolve, false);
})

const preloadImageLoaders = IMAGE_SRCES.map(src => loadImage(src));
const p_loadImages = Promise.all(preloadImageLoaders.map(loader => loader()));

Promise.all([p_loadDOM, p_loadImages]).then((val) => {
  $('#loading').fadeOut(function(){$(this).remove()});
  windowScroller.start();
  setTimeout(() => {
    init();
  }, 500)
}, (reason) => {
  console.error(`error : ${reason}`);
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
