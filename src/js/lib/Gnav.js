// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a

import $ from 'jquery';
import Lock from './Lock';
import UA from '../util/UA';
import { userEvent } from '../util/userEvent';

class Gnav extends Lock {

  constructor(opts={}) {
    super();
    this.$toggleButton = opts.$toggleButton || $(document.createElement("div"));
    this.gnav = opts.gnav || $(document.createElement("div"));
    this.$gnav = $(this.gnav);
    this.$folding = this.$gnav.find('.gnav__folding');
    this.$link_smoothScroll = this.$gnav.find('.gnav__linksItem a[data-link-type="smooth-scroll"]');
    this.$link_otherPage = this.$gnav.find('.gnav__linksItem a[data-link-type="other-page"]');
    this.$link_modalOnGnav = this.$gnav.find('.gnav__linksItem a[data-link-type="modal-on-gnav"]');
    this.isSP = opts.isSP || false;

    this.wrapper = document.getElementsByClassName('wrapper')[0];
    this.$wrapper = $(this.wrapper);

    this.initListener();

  }

  initListener() {

    // if (!this.isSP) return;

    this._onClick( this.$toggleButton )
    this._onClick( this.$link_smoothScroll, 'smoothScroll' )
    this._onClick( this.$link_otherPage, 'otherPage', false )
    this._onClick( this.$link_modalOnGnav, 'modalOnGnav', false )

    this._onScroll();

  }

  _onClick($elm, type='default', canToggle=true) {

    const DURATION = 500;
    let canClick = true;

    $elm.on(userEvent.click, (e) => {

      if ( !canClick ) return;

      switch (type) {
        case 'otherPage':
          e.stopPropagation(); break;
        default:
          // バブリングを止める -> デリゲート無効
          // バブリングを止めない -> モーダル自体が閉じる
          // ということでgnav上でデリゲートするような必要が生じたら別途対応
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

  _onScroll() {

    this.$gnav.hide();
    let isOpened = false;
    $(window).on('scroll', () => {
      // gnavを開いた瞬間のlockはscrollとみなさない
      if( parseInt(this.gnav.getAttribute('data-gnav-open')) === 1 ) return;
      if ( $(window).scrollTop() > 100 ) {
        if (!isOpened) {
          isOpened = true;
          this.$gnav.show();
        }
      } else {
        if (isOpened) {
          isOpened = false;
          this.$gnav.hide();
        }
      }
    })

  }

  toggleGnav() {

    const state = this.$folding.css('display');
    if (state === 'none') {
      this.gnav.setAttribute('data-gnav-open',1)
      setTimeout( () => this.open(), 50 )
    } else {
      this.gnav.setAttribute('data-gnav-open',0)
      setTimeout( () => this.close(), 50 )
    }

    this.$toggleButton.stop().fadeToggle();

  }

  open() {

    const current_scrollY = $( window ).scrollTop();

    // lockするとページ内スムーススクロールがおかしくなる
    //（setTimeoutでスムーススクロールの方を遅らせて直した）
    this.lockBG();

    // iOS実機だとlock直後にスクロールが発生（上部のバーの幅が変わる）
    // スクロール後でないと、window.innerHeightが正しく取れない
    setTimeout(() => {
      this.$folding.addClass('is-gnav-open');
      this.$folding.css({
        height: window.innerHeight, // height が決まっていないと overflow-y:scroll できない
        marginTop: current_scrollY
      });
    },50)

  }

  close() {

    this.unlockBG();
    setTimeout(() => {
      this.$folding.removeClass('is-gnav-open');
      this.$gnav.attr( { style: '' } );
    },50)

  }

}

// gnavを何個もつくることはないから、外に持ち出す必要性低い
(() => {

  const isSP = new UA().get().Mobile;

  const gnav = new Gnav({
    gnav: document.getElementById('gnav'),
    $toggleButton: $('.js-gnavToggleButton'),
    isSP: isSP
  });

})()
