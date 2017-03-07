import AbstractAudioObject from "./AbstractAudioObject"
import _ from "lodash"

/*
  Web Audio API Audio Object
*/

let mute_count = 0
const caches = {}
const _AudioContext = window.AudioContext || window.webkitAudioContext
const _context = _AudioContext ? new _AudioContext() : null
let _muteNode = null
if(_context) {
  _muteNode = _context.createGain()
  _muteNode.connect(_context.destination)
}

  // スマホで任意のタイミングで砕石できるようになる魔法
  function onFirstPointerDown() {
    document.body.removeEventListener("touchstart", onFirstPointerDown)
    document.body.removeEventListener("mousedown", onFirstPointerDown)
    _context.createBufferSource().start(0)
  }
  document.body.addEventListener("touchstart", onFirstPointerDown)
  document.body.addEventListener("mousedown", onFirstPointerDown)

export default class WebAudioAPIAudioObject extends AbstractAudioObject {
  constructor(url) {
    super(url, caches)
    this._isDisposed = false
  }

  _createSource(_buffer) {
    this._gainNode = _context.createGain()
    this._gainNode.connect(_muteNode)
    const _source = _context.createBufferSource()
    _source.buffer = _buffer
    _source.connect(this._gainNode)
    return _source
  }

  _copy(another) {
    if(another._loadPromise) {
      this._loadPromise = another._loadPromise.then(_source => {
        return this._createSource(_source.buffer)
      })
    } else {
      this._loadPromise = another.load().then(_source => {
        return this._createSource(_source.buffer)
      })
    }
  }

  load() {
    this._loadPromise = this._loadPromise || new Promise(resolve => {
      const _request = new XMLHttpRequest()
      _request.open("GET", this.url, true)
      _request.responseType = "arraybuffer"
      _request.onload = () => {
        _context.decodeAudioData(_request.response, _buffer => {
          resolve(this._createSource(_buffer))
        })
      }
      _request.send()
    })
    return this._loadPromise
  }

  isEnded() {
    return this._isDisposed
  }

  start() {
    if(this._isDisposed) {
      return
    }
    return this.load().then(_source => new Promise(resolve => {
      _source.start(0)
      _source.onended = () => {
        this._dispose()
        resolve()
      }
    }))
  }

  stop() {
    if(this._isDisposed) {
      return
    }
    this._dispose()
  }

  setLoop(isLoop) {
    if(this._isDisposed) {
      return
    }
    this.load().then(_source => {
      _source.loop = isLoop
    })
  }

  setVolume(volume) {
    if(this._isDisposed) {
      return
    }
    this._volume = volume
    this.load().then(_tag => {
      this._gainNode.gain.value = volume
    })
  }

  getVolume() {
    return this._volume
  }

  _dispose() {
    this._isDisposed = true
    this.load().then(_source => {
      try {
        _source.disconnect()
        _source.stop(0)
      } catch(e) {
        console.log(e)
      } finally {
        if(this._gainNode) {
          this._gainNode.disconnect()
          this._gainNode = null
        }
      }
      if(!this._isFirstObject) {
        this._loadPromise = null
      }
    })
  }
}

WebAudioAPIAudioObject.setMute = function(isMute = true) {
  if(isMute) {
    mute_count += 1
  } else {
    mute_count -= 1
  }
  if(mute_count < 0) {
    mute_count = 0
  }

  if(mute_count > 0) {
    _muteNode.gain.value = 0
  } else {
    _muteNode.gain.value = 1
  }
}

WebAudioAPIAudioObject.canUse = _context != null
