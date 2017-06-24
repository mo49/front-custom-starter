// http://qiita.com/butchi_y/items/7f0a3c8f1b9a75ecbb1a

import $ from 'jquery';

// 横表示不可
export default () => {

  const HTML = document.documentElement;

  $(window).on('orientationchange', (evt) => {

    // -------------------------------------------
    // youtubeモーダルを使う場合
    // -------------------------------------------
    // const isOpen = parseInt( document.getElementsByClassName('wrapper')[0].getAttribute('data-youtube-open') );
    // if(isOpen) return;

    const angle = (screen && screen.orientation && screen.orientation.angle) || window.orientation || 0;
    if(angle % 180 !== 0) {
      HTML.setAttribute('data-orientaion', 'landscape');
    } else {
      HTML.setAttribute('data-orientaion', 'portrait');
    }
  }).trigger('orientationchange');

}
