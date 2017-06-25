// http://qiita.com/gonshi_com/items/5a86fc415dcccfb04e2a

import $ from 'jquery';
import Modal from './Modal';
import UA from '../util/UA';
import { userEvent } from '../util/userEvent';

export default class Gnav extends Modal {

  constructor(opts={}) {
    super({
      type: 'gnav',
      $openButton: $('.js-gnav-open'),
      $closeButton: $('.js-gnav-close'),
      fadeDuration: opts.fadeDuration,
      isAutoOpen: opts.isAutoOpen,
      unlockBG: opts.unlockBG,
    });

    this.$gnav = opts.$gnav || $('#gnav');
    this.$toggleButton = opts.$toggleButton || $('.gnav__toggleButton');
    this.$link_smoothScroll = this.$modal.find('.modal__linksItem a[data-link-type="smooth-scroll"]');
    this.$link_otherPage = this.$modal.find('.modal__linksItem a[data-link-type="other-page"]');
    this.$link_modalOnGnav = this.$modal.find('.modal__linksItem a[data-link-type="modal-on-gnav"]');

    super.initListener();
  }

  initListener() {
    // if (!window.is_sp) return;
    this.$openButton.on(userEvent.click, () => {
      this._open();
    })
    this.$closeButton.on(userEvent.click, () => {
      this._close();
    })
    this._onScroll();
  }

  _open() {
    this.$gnav.attr('data-gnav-open',1);
  }

  _close() {
    this.$gnav.removeAttr('data-gnav-open');
  }

  // スクロールで表示される
  _onScroll() {
    let isOpened = false;
    $(window).on('scroll', () => {
      // gnavを開いた瞬間のlockでscrollが発生するが無効
      if( parseInt(this.$gnav.attr('data-gnav-open')) ) {
        return;
      }
      if ( $(window).scrollTop() > 100 ) {
        if (!isOpened) {
          isOpened = true;
          this.$toggleButton.fadeIn();
        }
      } else {
        if (isOpened) {
          isOpened = false;
          this.$toggleButton.fadeOut();
        }
      }
    })
  }

}
