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
    this.canLock = opts.canLock || false;

    this.initListener();
  }

  initListener() {

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

    this.lockBG();

  }

  close() {

    this.$modal.fadeOut(this.fadeDuration);

    this.unlockBG();

  }

}
