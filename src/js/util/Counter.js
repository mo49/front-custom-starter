export default class Counter {
  constructor(opts = {}) {
    this.max = opts.max;
    this.min = isNaN( opts.min ) ? 0 : opts.min ;
    this.index = opts.index || this.min;
    this.type = opts.type || 'loop';
  }
  prev() {
    this.index--;
    this._check();
  }
  next() {
    this.index++;
    this._check();
  }
  _check() {
    if (this.type === 'loop') this._checkLoop();
    if (this.type === 'stop') this._checkStop();
  }
  _checkLoop() {
    if(this.index > this.max) this.index = this.min;
    if(this.index < this.min) this.index = this.max;
  }
  _checkStop() {
    if(this.index > this.max) this.index = this.max;
    if(this.index < this.min) this.index = this.min;
  }
  getCurrentIndex() {
    return this.index;
  }
  getNextIndex() {
    let result;
    if (this.type === 'loop'){
      result = (this.index >= this.max) ? this.min : this.index + 1 ;
    }
    if (this.type === 'stop'){
      result = Math.min(this.max, this.index + 1);
    }
    return result;
  }
  getPrevIndex() {
    let result;
    if (this.type === 'loop'){
      result = (this.index <= this.min) ? this.max : this.index - 1 ;
    }
    if (this.type === 'stop'){
      result = Math.max(this.min, this.index - 1);
    }
    return result;
  }
}
