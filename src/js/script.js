import $ from 'jquery';
// import './util/GA';
import './util/Viewport';
import './util/Gototop';
import UA from './util/UA';
import PreloadImage from './util/PreloadImage';
import WindowScroller from './util/WindowScroller';
import './lib/Gnav';
import './lib/Youtube';
import Cookie from './lib/Cookie';
import Modal from './lib/Modal';
import { initialVisit } from './lib/initialVisit';
import { IMAGES_SRC } from './data/imagesSrc';

// -------------------------------------------
// 初期設定
// -------------------------------------------
const cookie = new Cookie();
const ua = new UA();
const windowScroller = new WindowScroller();

ua.initSetting();
windowScroller.stop();

// -------------------------------------------
// Promise
// --------------------------------------------
const p_loadDOM = new Promise((resolve,reject) => {
  window.addEventListener("load", resolve, false);
})

const p_preloadImage = new Promise((resolve,reject) => {
  const preloadImage = new PreloadImage(IMAGES_SRC);
  preloadImage.on(preloadImage.EVENT.ALL_LOADED, () => {
    resolve();
  });
})

Promise.all([p_loadDOM, p_preloadImage]).then((val) => {
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
