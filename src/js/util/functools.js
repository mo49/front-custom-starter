// 便利関数まとめ

// 特定のクラスを削除
export function removeSpecificClass($elm, str) {
  const regexp = new RegExp(`\\b${str}\\S+`, 'g');
  console.log(regexp)
  $elm.removeClass(function(index, className) {
    return (className.match(regexp) || []).join(' ');
  });
}

// position:fixed; の状態で横スクロール
export function scrollHorizontal(target_id) {
  const elm = document.getElementById(target_id);
  window.addEventListener('scroll', _handleScroll, false);
  function _handleScroll() {
    elm.style.left = -window.scrollX + "px";
  }
}
