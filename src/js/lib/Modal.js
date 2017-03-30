// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a

import $ from 'jquery';
import { userEvent } from '../util/userEvent';

export default class {

  constructor(opts={}) {

    this.$modal = opts.$modal || $(document.createElement("div"));
    this.$toggleButton = opts.$toggleButton || $(document.createElement("div"));
    this.$openButton = opts.$openButton || $(document.createElement("div"));
    this.isAutoOpen = opts.isAutoOpen || false;
    this.fadeDuration = isNaN(opts.fadeDuration) ? 500 : opts.fadeDuration;
    // this.canLock = opts.canLock || false;

    this.wrapper = document.getElementsByClassName('wrapper')[0];
    this.$wrapper = $(this.wrapper);

    this.initListener();

  }

  initListener() {

    let canClick = true;

    this.$toggleButton.on(userEvent.click, () => {

      if ( !canClick ) return;

      const state = this.$modal.css('display');
      (state === 'none') ? this.open() : this.close() ;

      this.$modal.stop().fadeToggle(this.fadeDuration);

      canClick = false;
      setTimeout(() => canClick = true, this.fadeDuration )

    })

    if (this.isAutoOpen) setTimeout(() => this.$openButton.click(), 0 );

  }

  open() {

    this.lockBG();

  }

  close() {

    this.unlockBG();

  }

  lockBG() {

    // modal on modal の対策
    // 0のときだけ通す
    const currentCount = parseInt(this.wrapper.getAttribute('data-lock-bg')) || 0;
    this.wrapper.setAttribute('data-lock-bg',currentCount+1);
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
    const currentCount = parseInt(this.wrapper.getAttribute('data-lock-bg'));
    this.wrapper.setAttribute('data-lock-bg',currentCount-1);
    if ( currentCount !== 1 ) return;

    this.$wrapper.attr( { style: '' } );
    $( 'html, body' ).prop( { scrollTop: this.original_scrollY } );

  }

}
