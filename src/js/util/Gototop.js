import $ from 'jquery';
import { userClick } from './userEvent';

class Gototop {

  constructor (opts = {}) {

    this.$btn = opts.$btn || $(document.createElement("div"));
    this.isSP = opts.isSP || false;

    this.initListener();

  }

  initListener() {

    this._onScroll();
    this._onClick();

  }

  _onScroll() {

    const THRESHOLD = 100;
    this.$btn.hide();

    $(window).on('scroll', () => {
      if (this.isSP) return;

      const scrollTop = $(window).scrollTop();
      (scrollTop > THRESHOLD) ? this.$btn.fadeIn() : this.$btn.fadeOut() ;

    })

  }

  _onClick() {

    this.$btn.on(userClick, () => {
      $('html,body').animate({
        scrollTop: 0 + 'px'
      }, 1000);
    })

  }


};



(() => {

  const gototop = new Gototop({
    $btn: $('.js-gototopButton')
  });

})();
