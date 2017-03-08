// https://developers.google.com/youtube/iframe_api_reference?hl=ja

import $ from 'jquery';
import { userClick } from '../util/userEvent';

class Youtube {
  constructor() {
    this.YOUTUBE_DATA = [
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
    ];
    this.players = [];
    this._init();
  }

  _init() {

    const that = this;

    // 複数個追加したくないので、これは１回
    $('body').append('<script src="//www.youtube.com/iframe_api">');

    function onPlayerReady(event) {

      that.YOUTUBE_DATA.forEach((val,index) => {

        if (!val.isCustomizedButton) val.$startButton.hide();

      })

    }

    function onPlayerStateChange(event) {

      that.YOUTUBE_DATA.forEach((val,index) => {

        if (event.target.h.id === val.ytplayer) {
          val.$startButton.hide();

          if (event.data == YT.PlayerState.PLAYING) {

          }
          if (event.data == YT.PlayerState.PAUSED) {

          }
          if (event.data == YT.PlayerState.ENDED) {
            if (val.isCustomizedButton) val.$startButton.show();
          }

        }

      })

    }

    const onYouTubeIframeAPIReady = () => {

      that.YOUTUBE_DATA.forEach((val,index) => {

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
        that.players[index] = player;

      })

    };

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    that.YOUTUBE_DATA.forEach((val,index) => {

      val.$startButton.on(userClick, () => {
        that.players[index].playVideo();
      });
      val.$stopButton.on(userClick, () => {
        that.players[index].stopVideo();
      });

    })

  }

  playVideo(index=0) {
    this.players[index].playVideo();
  }
  stopVideo(index=0) {
    this.players[index].stopVideo();
  }
  mute(index=0) {
    this.players[index].mute();
  }
  unMute(index=0) {
    this.players[index].unMute();
  }
  getVolume(index=0) {
    return this.players[index].getVolume();
  }
  setVolume(index=0,volume=100) {
    this.players[index].setVolume(volume);
  }

}

(() => {

  const youtube = new Youtube();
  // test
  $('.box').on(userClick, () => {
    // youtube.playVideo();
    // youtube.mute();
    // youtube.setVolume(0,50);
  })
  $('.wrapper').on(userClick, () => {
    // youtube.stopVideo(1);
    // console.log(youtube.getVolume());
  })

})()
