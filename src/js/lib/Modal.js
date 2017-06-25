import $ from 'jquery';
import Lock from './Lock';
import { userEvent } from '../util/userEvent';

export default class Modal extends Lock {

  constructor(opts={}) {
    super();
    this.type = opts.type;
    this.$modal = opts.$modal || $(`.modal[data-modal="${this.type}"]`);
    this.$openButton = opts.$openButton || $(`.js-modal-open[data-modal="${this.type}"]`);
    this.$closeButton = opts.$closeButton || this.$modal.find(`.js-modal-close`);
    this.fadeDuration = isNaN(opts.fadeDuration) ? 500 : opts.fadeDuration;
    this.isAutoOpen = opts.isAutoOpen || false;
    this.unlockBG = opts.unlockBG || false;

    this.initListener();
  }

  initListener() {
    console.log('initListener',this.type);
    if(this.isAutoOpen) {
      this.open();
    }
    this.$openButton.on(userEvent.click, () => {
      this.open();
    })
    this.$closeButton.on(userEvent.click, () => {
      this.close();
    })
  }

  open() {
    this.$modal.fadeIn(this.fadeDuration);
    if (this.unlockBG) {
      return;
    }
    this.lock();
  }

  close() {
    this.$modal.fadeOut(this.fadeDuration);
    if (this.unlockBG) {
      return;
    }
    this.unlock();
  }

}
