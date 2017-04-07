// 便利関数まとめ

export function removeSpecificClass($elm, str) {
  const regexp = new RegExp(`\\b${str}\\S+`, 'g');
  console.log(regexp)
  $elm.removeClass(function(index, className) {
    return (className.match(regexp) || []).join(' ');
  });
}
