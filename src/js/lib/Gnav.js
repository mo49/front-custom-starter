// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a

import $ from 'jquery';
import UA from '../util/UA';
import { userEvent } from '../util/userEvent';

class Gnav {

  constructor(opts={}) {

    this.$toggleButton = opts.$toggleButton || $(document.createElement("div"));
    this.$gnav = opts.$gnav || $(document.createElement("div"));
    this.$folding = this.$gnav.find('.gnav__folding');
    this.$link_smoothScroll = this.$gnav.find('.gnav__linksItem a[data-link-type="smooth-scroll"]');
    this.$link_otherPage = this.$gnav.find('.gnav__linksItem a[data-link-type="other-page"]');
    this.$link_modalOnGnav = this.$gnav.find('.gnav__linksItem a[data-link-type="modal-on-gnav"]');
    this.isSP = opts.isSP || false;

    this.$wrapper = $('.wrapper');

    this.initListener();

  }

  initListener() {

    if (!this.isSP) return;

    this.onClick( this.$toggleButton )
    this.onClick( this.$link_smoothScroll, 'smoothScroll' )
    this.onClick( this.$link_otherPage, 'otherPage', false )
    this.onClick( this.$link_modalOnGnav, 'modalOnGnav', false )

  }

  onClick($elm, type='default', canToggle=true) {

    const DURATION = 500;
    let canClick = true;

    $elm.on(userEvent.click, (e) => {

      if ( !canClick ) return;

      switch (type) {
        case 'otherPage':
          e.stopPropagation(); break;
        default:
          e.stopPropagation();
          e.preventDefault();
      }

      if (canToggle) {

        this.toggleGnav()

        canClick = false;
        setTimeout(() => canClick = true, DURATION )

      }

    })

  }

  toggleGnav() {

    const state = this.$folding.css('display');
    (state === 'none') ? this.open() : setTimeout( () => this.close(), 50 ) ;

    this.$toggleButton.stop().fadeToggle();

  }

  open() {

    const current_scrollY = $( window ).scrollTop();

    // lockするとページ内スムーススクロールがおかしくなる
    //（setTimeoutでスムーススクロールの方を遅らせたら直った）
    this.lockBG();
    this.$folding.addClass('is-gnav-open');
    this.$folding.css({
      height: window.innerHeight, // height が決まっていないと overflow-y:scroll できない
      marginTop: current_scrollY
    });

  }

  close() {

    this.unlockBG();
    this.$gnav.removeClass('is-gnav-open');
    this.$gnav.attr( { style: '' } );

  }

  lockBG() {

    const current_scrollY = $( window ).scrollTop();
    this.original_scrollY = current_scrollY;

    this.$wrapper.css( {
      position: 'fixed',
      width: '100%',
      top: -1 * current_scrollY
    } );

  }

  unlockBG() {

    this.$wrapper.attr( { style: '' } );
    $( 'html, body' ).prop( { scrollTop: this.original_scrollY } );

  }


}

// gnavを何個もつくることはないから、外に持ち出す必要性低い
(() => {

  const isSP = new UA().get().Mobile;

  const gnav = new Gnav({
    $gnav: $('#gnav'),
    $toggleButton: $('.js-gnavToggleButton'),
    isSP: isSP
  });

})()
