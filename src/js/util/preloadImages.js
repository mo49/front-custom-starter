// 闇の画像プリローダ
import "whatwg-fetch"
import _ from "lodash"
import css from "css"

const cacheContainer = document.createElement("div")
document.body.appendChild(cacheContainer)

// 画像をロードするだけPromise
const image_loaded = {}
function loadImage(url, randomDelay = 0) {
  if(image_loaded[url] === true) {
    return Promise.resolve()
  }
  image_loaded[url] = true
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener("load", function(){
      resolve(image)
    })
    image.addEventListener("error", function(){
      resolve()
    })
    setTimeout(e => image.src = url, Math.random() * randomDelay | 0)
  })
}

// data-preload="1" を付与したlinkの中から
// background-imageが指定されているセレクタのリストを得る
let loadBackgroundImageListPromise = null
function loadBackgroundImageList() {
  if(loadBackgroundImageListPromise) {
    return loadBackgroundImageListPromise
  }
  const style_promises = _(document.getElementsByTagName("link"))
  .filter(dom => dom.getAttribute("rel") === "stylesheet" && dom.getAttribute("data-preload") === "1")
  .map(({href}) => fetch(href, {credentials: 'same-origin'}).then(res => res.text()))
  .value()

  loadBackgroundImageListPromise = Promise.all(style_promises)
  .then(e => {
    const css_text = e.join(" ")
    const css_obj = css.parse(css_text)
    const {stylesheet: {rules}} = css_obj
    return _(rules)
      .filter("selectors")
      .flatMap(({selectors, declarations}) => {
        return _.map(declarations, ({property, value}) => {
          if(property === "background") {
            return {selectors, value}
          }
          if(property === "background-image") {
            return {selectors, value}
          }
          return false
        })
      })
      .compact()
      .filter(({value}) => value.indexOf("base64") < 0)
      .filter(({value}) => value.indexOf("png") >= 0 || value.indexOf("jpg") >= 0)
      .map(({selectors, value}) => {
        return {
          selectors,
          url: value.replace("url(", "").replace(")", "").replace("'", "")
        }
      })
      .uniq()
      .value()
  })

  return loadBackgroundImageListPromise
}

// 指定のクエリに一致するセレクタの画像をプリロードする
// （シングルクォートとダブルクォートは別物なので注意）
const query_promises = {}
export default function preloadImages(query, onProgress) {
  query_promises[query] = query_promises[query] || loadBackgroundImageList()
    .then(urls => {
      const filtered_urls = _(urls)
        .filter(({selectors}) => {
          return _.some(selectors, selector => selector.indexOf(query) >= 0)
        })
        .map(({url}) => url)
        .uniq()
        .value()

      let progress = 0
      return Promise.all(_.map(filtered_urls, url => {
        return loadImage(url)
        .then(arg =>{
          progress += 1
          if(onProgress) {
            onProgress(progress / filtered_urls.length)
          }
          return arg
        })
      }))
    })
    .then(imgs => _.forEach(imgs))
  return query_promises[query]
}
