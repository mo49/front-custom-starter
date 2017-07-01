import $ from 'jquery';
import TimeAccumulator from '../util/TimeAccumulator';
import TimeSkipper from '../util/TimeSkipper';

module.exports = () => {

  const FPS = 60;

  const timeAccumulator = new TimeAccumulator(update,FPS);
  const timeSkipper = new TimeSkipper(render,FPS);

  const $update = $('.update');
  const $render = $('.render');
  // 座標更新
  function update(time,delta) {
    $update.text(`time:${time.toFixed(5)} | delta:${delta.toFixed(5)}`)
  }
  // 描画
  function render(time,delta) {
    $render.text(`time:${time.toFixed(5)} | delta:${delta.toFixed(5)}`)
    drawRect(time,delta)
  }

  let loopId;
  tick();
  function tick(time) {
    const currentTime = time / 1000; // sec

    timeAccumulator.exec(currentTime);
    timeSkipper.exec(currentTime);

    loopId = requestAnimationFrame(tick);
  }
  function stop() {
    cancelAnimationFrame(loopId);
  }
  function restart() {
    // deltaのズレを補正
    const currentTime = performance.now() / 1000;
    timeAccumulator.reset(currentTime);
    timeSkipper.reset(currentTime);
    tick();
  }

  $('.js-restart').on('click',restart)
  $('.js-stop').on('click',stop)


  /* ======================================
   * canvas
   * ====================================== */

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  $('#canvasArea').append(canvas)

  /*
  * 中身が多くなってきたら、
  * 座標更新(update)と描画(render)をわける
  */
  let move_x = 0;
  function drawRect(time,delta) {
    // delta依存で座標を更新する
    move_x += delta * 100;
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    ctx.fillRect(move_x,0,100,100);
    if(move_x > window.innerWidth){
      move_x = 0;
    }
  }

}
