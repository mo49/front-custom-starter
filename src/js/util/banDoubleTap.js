// http://kimizuka.hatenablog.com/entry/2016/07/29/110931

// ダブルタップを無効
export default (dom) => {

  let tapFlag = false;
  let timer;

  dom.addEventListener("touchstart", (evt) => {
    if (tapFlag) evt.preventDefault();
  }, true);

  dom.addEventListener("touchend", (evt) => {
    tapFlag = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      tapFlag = false;
    }, 200);
  }, true);

}
