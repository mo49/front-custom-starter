// コードが動く前からキーが決まっていて、動いている間も固定されている場合はObject、
// コードを動かしてみるまでどんなキーがくるかわからない場合はMapを選択する

const cacheMap = new Map();

export default function requestURL(url) {
  // キャッシュにヒットしたらその内容を返す
  if (cacheMap.has(url)) {
    return cacheMap.get(url);
  }

  const response = httpGetURL(url);

  // レスポンスをキャッシュに格納
  cacheMap.set(url, response);

  return response;
}