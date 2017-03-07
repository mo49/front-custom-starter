// http://blog.cror.net/iso10-user-scalable.html

// ピンチイン・アウトを無効
export function banPinchInOut() {
  document.documentElement.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);

  let lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}
