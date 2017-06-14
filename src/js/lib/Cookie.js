// https://www.npmjs.com/package/js-cookie

import $ from 'jquery';
import Cookies from 'js-cookie';

export default class Cookie {

  constructor() {

    this.expires = 365;
    this.path = '/';

    this.key = {
      visit : {
        top : 'userSiteVisited',
        about : 'userAboutVisited',
      },
      words : 'userWords',
    }

    this.default = {
      words: ["hoge", "huga"]
    }

  }

  // set
  setUserSiteVisited(value) {
    // boolean型は禁止
    Cookies.set(this.key.visit.top, value, { expires: this.expires, path: this.path });
  }
  setUserWords(value) {
    Cookies.set(this.key.words, value, { expires: this.expires, path: this.path });
  }

  // get
  getUserSiteVisited() {
    return parseInt( Cookies.get(this.key.visit.top) ) || 0;
  }
  getUserWords() {
    // array,objectにはgetJSON
    return Cookies.getJSON(this.key.words) || this.default.words;
  }

  // remove
  removeAll() {
    const ans = confirm("Cookieを削除します。よろしいですか？")
    if ( !ans ) return;
    Cookies.remove(this.key.visit.top);
    Cookies.remove(this.key.words);
  }


}
