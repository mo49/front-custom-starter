// https://developers.google.com/youtube/iframe_api_reference?hl=ja

import $ from 'jquery';

const YOUTUBE_DATA = [
  {
    videoID: '4slt_lQ8fPc',
    ytplayer: 'ytplayer1',
    $startButton: $('.js-youtube01StartButton'),
    $stopButton: $('.js-youtube01StopButton'),
    isCustomizedButton: 1,
    isAutoPlay: 0
  },
  {
    videoID: '9pjtVUZNfWY',
    ytplayer: 'ytplayer2',
    $startButton: $('.js-youtube02StartButton'),
    $stopButton: $('.js-youtube02StopButton'),
    isCustomizedButton: 0,
    isAutoPlay: 0
  },
]

export default (() => {

  let players = [];

  // 複数個追加したくないので、これは１回
  $('body').append('<script src="//www.youtube.com/iframe_api">');

  function onPlayerReady(event) {

    YOUTUBE_DATA.forEach((val,index) => {

      if (!val.isCustomizedButton) val.$startButton.hide();

    })

  }

  function onPlayerStateChange(event) {

    YOUTUBE_DATA.forEach((val,index) => {

      if (event.target.h.id === val.ytplayer) {
        val.$startButton.hide();

        if (event.data == YT.PlayerState.PLAYING) {

        }
        if (event.data == YT.PlayerState.PAUSED) {

        }
        if (event.data == YT.PlayerState.ENDED) {
          if (!val.isCustomizedButton) val.$startButton.show();
        }

      }

    })

  }

  const onYouTubeIframeAPIReady = () => {

    YOUTUBE_DATA.forEach((val,index) => {

      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ja
      const player = new YT.Player(val.ytplayer, {
        videoId: val.videoID,
        playerVars: {
          'controls': 1,
          'enablejsapi': 1,
          'iv_load_policy': 3, // アノテーション
          'disablekb': 1,
          'showinfo': 1,
          'loop': 0,
          'autoplay': val.isAutoPlay,
          'rel': 0, // 関連動画
          'fs': 1 // 全画面
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      players[index] = player;

    })

  };

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  YOUTUBE_DATA.forEach((val,index) => {

    val.$startButton.on('click', () => {
      players[index].playVideo();
    });
    val.$stopButton.on('click', () => {
      players[index].stopVideo();
    });

  })


})();
