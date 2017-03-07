//w3g.jp/blog/js_browser_sniffing2015

export default class {

  constructor(opts={}) {

    this.HTML = document.documentElement;
    this.BODY = document.body;

  }

  get() {

    const ua = window.navigator.userAgent.toLowerCase();
    const ver = window.navigator.appVersion.toLowerCase();

    const isMSIE = (ua.indexOf('msie') != -1) && (ua.indexOf('opera') == -1);
    const isIE11 = (ua.indexOf('trident/7') != -1);

    return {
      Tablet:(ua.indexOf("windows") != -1 && ua.indexOf("touch") != -1 && ua.indexOf("tablet pc") == -1)
      || ua.indexOf("ipad") != -1
      || (ua.indexOf("android") != -1 && ua.indexOf("mobile") == -1)
      || (ua.indexOf("firefox") != -1 && ua.indexOf("tablet") != -1)
      || ua.indexOf("kindle") != -1
      || ua.indexOf("silk") != -1
      || ua.indexOf("playbook") != -1,
      Mobile:(ua.indexOf("windows") != -1 && ua.indexOf("phone") != -1)
      || ua.indexOf("iphone") != -1
      || ua.indexOf("ipod") != -1
      || (ua.indexOf("android") != -1 && ua.indexOf("mobile") != -1)
      || (ua.indexOf("firefox") != -1 && ua.indexOf("mobile") != -1)
      || ua.indexOf("blackberry") != -1,
      iOS: (ua.indexOf("iphone") != -1) || (ua.indexOf("ipod") != -1) || (ua.indexOf("ipad") != -1),
      iPad: ua.indexOf("ipad") != -1,
      iPhone: ua.indexOf("iphone") != -1,
      Android: ua.indexOf("android") != -1,
      MSIE : isMSIE, // IE11以外
      IE6 : isMSIE && (ver.indexOf('msie 6.') != -1),
      IE7 : isMSIE && (ver.indexOf('msie 7.') != -1),
      IE8 : isMSIE && (ver.indexOf('msie 8.') != -1),
      IE9 : isMSIE && (ver.indexOf('msie 9.') != -1),
      IE10 : isMSIE && (ver.indexOf('msie 10.') != -1),
      IE11 : isIE11,
      IE : isMSIE || isIE11,
      Edge : (ua.indexOf('edge') != -1),
      Chrome : (ua.indexOf('chrome') != -1) && (ua.indexOf('edge') == -1),
      Firefox : (ua.indexOf('firefox') != -1),
      Safari : (ua.indexOf('safari') != -1) && (ua.indexOf('chrome') == -1),
      Opera : (ua.indexOf('opera') != -1)
    }

  }

  initSetting() {

    const _ua  = this.get();

    if (_ua.Mobile) {
      this.HTML.setAttribute('data-env', 'sp');
    } else if (_ua.Tablet) {
      this.HTML.setAttribute('data-env', 'tablet');
    } else {
      this.HTML.setAttribute('data-env', 'pc');
    }

    if (_ua.iPad) this.HTML.setAttribute('data-device', 'ipad');
    if (_ua.iPhone) this.HTML.setAttribute('data-device', 'iphone');
    if (_ua.Android) this.HTML.setAttribute('data-device', 'android');

    if (_ua.iOS) this.HTML.setAttribute('data-os', 'ios');
    if (_ua.Android) this.HTML.setAttribute('data-os', 'android');
    if (_ua.IE) this.HTML.setAttribute('data-os', 'ie');

    if (_ua.IE) this.HTML.setAttribute('data-browser', 'ie');
    if (_ua.Edge) this.HTML.setAttribute('data-browser', 'edge');
    if (_ua.Chrome) this.HTML.setAttribute('data-browser', 'chrome');
    if (_ua.Firefox) this.HTML.setAttribute('data-browser', 'firefox');
    if (_ua.Safari) this.HTML.setAttribute('data-browser', 'safari');
    if (_ua.Opera) this.HTML.setAttribute('data-browser', 'opera');

  }

}
