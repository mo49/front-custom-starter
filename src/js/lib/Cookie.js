// https://www.npmjs.com/package/js-cookie

import $ from 'jquery';
import Cookies from 'js-cookie';

export default class Cookie {

  constructor() {

    this.expires = 365;
    this.path = '/';

    this.default = {
      words: ["hoge", "huga"]
    }

  }

  // set
  setUserSiteVisited(value) {
    // boolean型は禁止
    Cookies.set('userSiteVisited', value, { expires: this.expires, path: this.path });
  }
  setUserWords(value) {
    Cookies.set('userWords', value, { expires: this.expires, path: this.path });
  }

  // get
  getUserSiteVisited() {
    return parseInt( Cookies.get('userSiteVisited') ) || 0;
  }
  getUserWords() {
    // array,objectにはgetJSON
    return Cookies.getJSON('userWords') || this.default.words;
  }

  // remove
  removeAll() {
    const ans = confirm("Cookieを削除します。よろしいですか？")
    if ( !ans ) return;
    Cookies.remove('userSiteVisited');
    Cookies.remove('userWords');
  }


}
