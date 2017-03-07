import AbstractAudioObject from "./AbstractAudioObject"
import _ from "lodash"

/*
  HTML5 Audio Object
*/

const caches = {}
const all_objects = []
let mute_count = 0

export default class HTML5AudioObject extends AbstractAudioObject {
  constructor(url) {
    super(url, caches)
    all_objects.push(this)
    this._isEnded = false
  }

  _copy(another) {
    if(another._loadPromise) {
      this._loadPromise = another._loadPromise.then(_tag => _tag.cloneNode())
      return
    }
  }

  isEnded() {
    return this._isEnded
  }

  load() {
    this._loadPromise = this._loadPromise || new Promise(resolve => {
      const _tag = new Audio(this.url)
      _tag.addEventListener("loadeddata", () => resolve(_tag))
      setTimeout(() => resolve(_tag), 400 + Math.random() * 200 | 0) // IEでバグるので強制にresolveする
    })
    return this._loadPromise
  }

  start() {
    console.log(this.url)
    if(this._isEnded) {
      return
    }
    return this.load().then(_tag => new Promise(resolve => {
      _tag.muted = mute_count > 0
      _tag.play()
      _tag.addEventListener("ended", () => {
        this._isEnded = true
        resolve()
      })
    }))
  }

  stop() {
    return this.load().then(_tag => new Promise(resolve => {
      this._isEnded = true
      _tag.pause()
    }))
  }

  setLoop(isLoop) {
    this.load().then(_tag => {
      _tag.loop = isLoop
    })
  }

  setVolume(volume) {
    this._volume = volume
    this.load().then(_tag => {
      _tag.volume = volume
    })
  }

  getVolume() {
    return this._volume
  }

  _updateMute() {
    const muted = mute_count > 0
    this.load().then(_tag => {
      _tag.muted = muted
    })
  }
}

HTML5AudioObject.setMute = function(isMute = true) {
  if(isMute) {
    mute_count += 1
  } else {
    mute_count -= 1
  }
  if(mute_count < 0) {
    mute_count = 0
  }
  _.forEach(all_objects, cache => cache._updateMute())
}
