export default (src) => {
  const img = new Image();
  img.src = src;

  return new Promise(resolve => {
    img.addEventListener("load", function(){
      resolve(img)
    })
  })
}
