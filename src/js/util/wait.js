// -----------------------------------
// 待つだけpromise
// -----------------------------------

export const wait = (duration = 0) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  }
}
