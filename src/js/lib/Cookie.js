// https://www.npmjs.com/package/js-cookie

import $ from 'jquery';
import cookie from 'js-cookie';

class Cookie {

  constructor() {

    this.expires = 365;
    this.path = '/';

    this.key = {
      visit : {
        top : 'userSiteVisited',
        about : 'userAboutVisited',
      },
      words : 'userWords',
      mute : 'mute',
    }

    this.default = {
      words: ["hoge", "huga"]
    }

  }

  // set
  setUserSiteVisited(value) {
    // boolean型は禁止
    cookie.set(this.key.visit.top, value, { expires: this.expires, path: this.path });
  }
  setUserWords(value) {
    cookie.set(this.key.words, value, { expires: this.expires, path: this.path });
  }
  setMute(value) {
    cookie.set(this.key.mute, value, { expires: this.expires, path: this.path });
  }

  // get
  getUserSiteVisited() {
    return parseInt( cookie.get(this.key.visit.top) ) || 0;
  }
  getUserWords() {
    // array,objectにはgetJSON
    return cookie.getJSON(this.key.words) || this.default.words;
  }
  getMute() {
    return cookie.get(this.key.mute);
  }

  // remove
  removeAll() {
    const ans = confirm("Cookieを削除します。よろしいですか？")
    if ( !ans ) return;
    cookie.remove(this.key.visit.top);
    cookie.remove(this.key.words);
  }

}

module.exports = new Cookie();
