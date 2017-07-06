// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a
import $ from 'jquery';

export default class {

  constructor(opts={}) {
    this.$wrapper = $(".wrapper");
  }

  lock() {
    // modal on modal の対策
    // 1枚目のモーダルが開かれるときだけロックする
    const currentCount = Math.max(parseInt(this.$wrapper.attr('data-lock-bg')), 0) || 0;
    this.$wrapper.attr('data-lock-bg',currentCount+1);
    if ( currentCount !== 0 ) {
      return;
    };

    const current_scrollY = $( window ).scrollTop();
    this.original_scrollY = current_scrollY;

    this.$wrapper.css( {
      position: 'fixed',
      width: '100%',
      top: -1 * current_scrollY
    } );
  }

  unlock() {
    // 最後の1枚が閉じられたときに元に戻す
    const currentCount = Math.max(parseInt(this.$wrapper.attr('data-lock-bg')), 0) || 0;
    this.$wrapper.attr('data-lock-bg',currentCount-1);
    if ( currentCount !== 1 ) {
      return;
    };

    this.$wrapper.removeAttr('data-lock-bg');
    this.$wrapper.attr( { style: '' } );
    $( 'html, body' ).prop( { scrollTop: this.original_scrollY } );
  }

}
