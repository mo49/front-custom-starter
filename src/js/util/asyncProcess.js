// -----------------------------------
// アニメーションの順番を制御
// -----------------------------------

export const asyncProcess = (func, duration = 0) => {
  return () => {
    return new Promise((resolve, reject) => {
      if ( func === undefined || null ) {
        reject()
      } else {
        func()
        setTimeout(resolve, duration)
      }
    })
  }
}
