// 動的に設定するシェア周り
module.exports = {
  tweetLink: function (opts = {}) {
    return `//twitter.com/intent/tweet?text=${encodeURI(opts.text)}&amp;url=${encodeURI(opts.url)}`;
  },
  lineLink: function (opts = {}) {
    return `//line.me/R/msg/text/?${encodeURI(opts.text)} ${encodeURI(opts.url)}`;
  },
  setFacebookListener: function ($el, url) {
    $el.on('click', () => {
      FB.ui(
        {
          method: 'share',
          href: url,
        }
      );
    });
  }
};
