import "babel-polyfill";
import "whatwg-fetch"
import $ from 'jquery';
// import './util/GA';
import './util/Viewport';
import './util/Gototop';
import UA from './util/UA';
import WindowScroller from './util/WindowScroller';
import loadImage from './util/loadImage';
import preloadImages from './util/preloadImages';
import banPinchInOut from './util/banPinchInOut';
import banDoubleTap from './util/banDoubleTap';
import checkOrientation from './util/checkOrientation';
import './lib/Youtube';
import Cookie from './lib/Cookie';
import Gnav from './lib/Gnav';
import Modal from './lib/Modal';
import myCanvas from './lib/my-canvas';
import soundManager from './lib/SoundManager';
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
  // banPinchInOut();
  // banDoubleTap(document.documentElement);
  // checkOrientation();
}

// -------------------------------------------
// Preload
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

preloadImages(`data-preload='1'`,onProgress).then((assets) => {
  console.log(assets);
})
function onProgress(count) {
  console.log("loading ... ", count);
}

// -------------------------------------------
// init
// -------------------------------------------
function init() {

  // gnav
  new Gnav();
  // initial-visit
  if ( !cookie.getUserSiteVisited() ) {
    new Modal({
      type: 'initial-visit',
      isAutoOpen: true,
      fadeDuration: 0
    });
  }
  cookie.setUserSiteVisited(1);
  // sound-check
  new Modal({
    type: 'sound-check',
    // isAutoOpen: true,
    fadeDuration: 0
  });
  // youtube
  new Modal({type: 'youtube'});
  // modal on modal
  new Modal({type: 'on-modal'});

  myCanvas();

  // sound
  const $muteBtn = $('.sound__mute');
  soundManager.setSound('se1', {
    src: ['/sounds/se1.mp3'],
    onend: () => {
      console.log("se1 end!");
    }
  })
  soundManager.setSound('se2', {
    src: ['/sounds/se2.mp3']
  })
  soundManager.setSound('bgm', {
    src: ['/sounds/bgm.mp3'],
    loop: true,
  })

  $('.sound__se1').on('click', () => {
    soundManager.play('se1');
  })
  $('.sound__se2').on('click', () => {
    soundManager.stop('se2');
    soundManager.play('se2');
  })
  soundManager.play('bgm');

  start();
  $muteBtn.on('click', toggle);

  function start() {
    (soundManager.isMute)
      ? soundManager.mute()
      : soundManager.unmute()
    $muteBtn.attr('data-mute',soundManager.isMute);
  }
  function toggle() {
    (soundManager.isMute)
    ? soundManager.unmute()
    : soundManager.mute()
    $muteBtn.attr('data-mute',soundManager.isMute);
  }


}
