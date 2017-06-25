// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a
import $ from 'jquery';

export default class {

  constructor(opts={}) {
    this.$wrapper = $(".wrapper");
  }

  lockBG() {
    // modal on modal の対策
    // 0のときだけ通す
    const currentCount = parseInt(this.$wrapper.attr('data-lock-bg')) || 0;
    this.$wrapper.attr('data-lock-bg',currentCount+1);
    if ( currentCount !== 0 ) return;

    const current_scrollY = $( window ).scrollTop();
    this.original_scrollY = current_scrollY;

    this.$wrapper.css( {
      position: 'fixed',
      width: '100%',
      top: -1 * current_scrollY
    } );
  }

  unlockBG() {
    // 1のときだけ通す
    const currentCount = parseInt(this.$wrapper.attr('data-lock-bg'));
    this.$wrapper.attr('data-lock-bg',currentCount-1);
    if ( currentCount !== 1 ) return;

    this.$wrapper.attr( { style: '' } );
    $( 'html, body' ).prop( { scrollTop: this.original_scrollY } );
  }

}
