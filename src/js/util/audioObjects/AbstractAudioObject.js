// Web Audio APIとHTML5 Audioのフォールバック
// IE11はWeb Audio APIが使えません:scream:
// できることは少なくしたい・・・

// 基本的にAudioObjectは使い捨てること！（2度startを呼ばない）

const v="?v=2"

export default class AbstractAudioObject {
  constructor(url, cache) {
    // URLを決める
    this.url = url+v

    if(cache[this.url]) {
      // キャッシュがあったらそれをコピー
      this._copy(cache[this.url])
      this._isFirstObject = false
    } else {
      // なければキャッシュを登録
      cache[this.url] = this
      this._isFirstObject = true
    }

  }

  _copy(another) {
    // constructorで使う
    // 通信量を減らすため
    throw "AbstractAudioObject._copy is not implemented"
  }

  load() {
    // ロードされたらresolveするPromiseを返す
    throw "AbstractAudioObject.load is not implemented"
  }

  isEnded() {
    throw "AbstractAudioObject.isEnded is not implemented"
  }

  start() {
    // 再生が止まったらresolveするPromiseを返す
    // startは二度呼ばない！！！（重要）
    throw "AbstractAudioObject.start is not implemented"
  }

  stop() {
    // 止める
    // 止めたら二度と再開しない！！！（重要）
    // なので止めたら再生リストからは取り除いてよい
    throw "AbstractAudioObject.stop is not implemented"
  }

  setVolume(time) {
    // ボリュームをセットする
    throw "AbstractAudioObject.setVolume is not implemented"
  }

  getVolume() {
    // ボリュームをゲットする
    throw "AbstractAudioObject.getVolume is not implemented"
  }
}

AbstractAudioObject.setMute = function() {
  // ミュートする
  // そのミュートをアンミュートする関数を返す（多重にミュートされることを想定しておく）
  // 全てのミュートが解除されるまでアンミュートされない
  throw "AbstractAudioObject.setMute is not implemented"
}
