import $ from 'jquery';

export default class WindowScroller {

    constructor() {
    }

    start() {
      this.resetPos();
      this.restart();
      this.onClickLink();
    }

    resetPos() {
      $( 'html,body' ).animate( {scrollTop:0} , 50 ) ;
    }

    // スクロール禁止
    stop(){
      // pc
      let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
      $(document).on(scroll_event,function(e){e.preventDefault();});
      // sp
      $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
    }

    // スクロール復活
    restart(){
      // pc
      let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
      $(document).off(scroll_event);
      // sp
      $(document).off('.noScroll');
    }

    // ページ内スムーススクロール
    onClickLink(TIME = 1000, BUFFER = 30) {

      $('a[href^="#"]').on('click', function(e) {

        e.preventDefault();

        // modal,gnavなどのoverlayが消える際、
        // 背景をunlockしたあとにスクロールするため50msずらす
        setTimeout(() => {

          const target = $(this.hash);
          if (!target.length) return ;

          // const zm = parseInt( $('body').css('zoom') ) || 1; // zoom対策
          // const targetY = $(target).offset().top - BUFFER; // bugあり
          const targetY = $(target).get(0).offsetTop - BUFFER;
          $('html,body').stop().animate({scrollTop: targetY}, TIME, 'swing');

          // ハッシュ書き換え（ URLにハッシュがつく ）
          // window.history.pushState(null, null, this.hash);

          // デフォルトの処理はキャンセル
          return false;

        },50)

      });

    }

}
