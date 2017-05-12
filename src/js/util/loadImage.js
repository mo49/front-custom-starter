
export default function loadImage(src) {
  return () => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      }
      img.src = src;
    });
  }
}
