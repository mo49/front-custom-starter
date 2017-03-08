// http://qiita.com/d2cs-kimura/items/b51ef73528fa66a35a9d

import AudioObject from './audioObjects/AudioObject';

export default (() => {

  /**
   * visibilityChange判定
   */
  let hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  /**
   * バックグランド遷移判定に何を使うか
   */
  let available;
  if(typeof document.hidden === "undefined" && typeof document.webkitHidden === "undefined"){
    available = 'blur';
  } else {
    available = 'visibilityChange';
  }

  /**
   * 監視
   */
  if(available === 'blur'){
    window.addEventListener('blur', mute, false);
    window.addEventListener('focus', unmute, false);
  } else {
    if(available === 'visibilityChange'){
      document.addEventListener(visibilityChange, () => {
        if (document.hidden || document.webkitHidden) {
          mute();
        } else {
          unmute();
        }
      }, false);
    }
  }

  function mute() {
    AudioObject.setMute();
  }
  function unmute() {
    AudioObject.setMute(false);
  }

})()
