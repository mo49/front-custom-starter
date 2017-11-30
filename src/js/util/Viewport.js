// http://www.bricoleur.co.jp/blog/archives/2985

import ua from './UA';

export default (() => {

  const SP_BASE_WIDTH = 375; // デザイナー作成サイズ
  const PC_MAX_WIDTH = 1280; // タブレット内に収めたいPCデザインのサイズ

  const iOSviewportW = (ua.info.iOS) ? document.documentElement.clientWidth : 0;

  function updateMetaViewport(){

    const ww = (ua.info.iOS) ? iOSviewportW : window.outerWidth;
    let viewportContent;

    if (ua.info.Tablet) {
      // タブレットの場合はpcを縮小した感じにする
      viewportContent = `width=${PC_MAX_WIDTH}, user-scalable=no, shrink-to-fit=no`;
    } else {
      // spの基準サイズ（デザイナー作成サイズ）以下はよしなに縮小する
      // ※ iphone7などのデザイナー作成サイズ以上のときも拡大表示したい場合は、
      //    条件分岐をなくし、width=デザイナー作成サイズ を適応する。
      viewportContent = (ww < SP_BASE_WIDTH)
        ? `width=${SP_BASE_WIDTH}, user-scalable=no, shrink-to-fit=no`
        : `width=device-width, user-scalable=no, shrink-to-fit=no` ;
    }

    document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
  }

  window.addEventListener("resize", updateMetaViewport, false);
  window.addEventListener("orientationchange", updateMetaViewport, false);

  const evt = document.createEvent("UIEvent");
  evt.initEvent("resize", true, true);
  window.dispatchEvent(evt);

})();
