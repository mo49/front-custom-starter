import EventEmitter from 'events';

export default class PreloadImage extends EventEmitter {

  constructor(paths) {
    super();
    this.paths = paths;
    this.init();
    this.EVENT = {
      ALL_LOADED: 'all_loaded'
    };
  }

  init() {
    let loadCount = 0;
    // console.log(this.paths);
    this.paths.forEach((path, index) => {
      let img = new Image();
      img.src = path;
      img.addEventListener('load', () => {
        // console.log(img.src);
        loadCount += 1;
        if (loadCount == this.paths.length) {
          this.emit(this.EVENT.ALL_LOADED);
        }
      })
    })
  }

}
