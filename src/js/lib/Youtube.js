// https://developers.google.com/youtube/iframe_api_reference?hl=ja

// spでタップなしの自動再生はできない
// http://www.yoheim.net/blog.php?q=20130816
// pcでもクリックなしの自動再生をやると2回目が読み込めなくなる

import $ from 'jquery';
import userEvent from '../util/userEvent';
import YOUTUBE_DATA from '../data/Youtube';

class Youtube {
  constructor(data) {
    this.players = [];
    this.$wrapper = $('.wrapper');

    this._setData(data);
    this._init(data);
    this._initListener(data);
  }

  _setData(data) {
    data.forEach((val,index) => {
      const $ytplayer  = val.$ytplayer || $(`.ytplayer[data-youtube-type="${val.type}"]`);
      val.videoId      = val.videoId || $ytplayer.attr('data-youtube-id');
      val.elementId    = val.elementId || $ytplayer.prop('id');
      val.$startButton = val.$startButton || $(`.js-start-youtube[data-youtube-type="${val.type}"]`)
      val.$stopButton  = val.$stopButton || $(`.js-stop-youtube[data-youtube-type="${val.type}"]`)
      val.isAutoPlay = isNaN(val.isAutoPlay) ? 0 : val.isAutoPlay;
      val.isCustomizedButton = isNaN(val.isCustomizedButton) ? 0 : val.isCustomizedButton;
    })
  }

  _init(data) {
    // 複数個追加したくないので１回
    $('body').append('<script src="//www.youtube.com/iframe_api">');

    const that = this;

    function onPlayerReady(event) {
      data.forEach((val,index) => {
        if (!val.isCustomizedButton) val.$startButton.hide();
      })
    }

    function onPlayerStateChange(event) {
      data.forEach((val,index) => {
        if (event.target.h.id === val.elementId) {
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
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ja
      data.forEach((val,index) => {
        const player = new YT.Player(val.elementId, {
          videoId: val.videoId,
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
        this.players[`${val.type}`] = player;
      })
    };

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  }

  _initListener(data) {
    data.forEach((val,index) => {
      val.$startButton.on(userEvent.click, () => {
        this.playVideo(val.type);
      });
      val.$stopButton.on(userEvent.click, () => {
        this.stopVideo(val.type);
      });
    })
  }

  playVideo(type) {
    this.players[type].playVideo();
  }
  stopVideo(type) {
    this.players[type].stopVideo();
  }
  mute(type) {
    this.players[type].mute();
  }
  unMute(type) {
    this.players[type].unMute();
  }
  getVolume(type) {
    return this.players[type].getVolume();
  }
  setVolume(type,volume=100) {
    this.players[type].setVolume(volume);
  }

}

(() => {

  const youtube = new Youtube(YOUTUBE_DATA);

  // test
  $('#top').on(userEvent.click, () => {
    youtube.playVideo('sao');
    youtube.mute('sao');
    // youtube.setVolume('sao',50);
  })
  $('#about').on(userEvent.click, () => {
    youtube.stopVideo('perfume');
    console.log(youtube.getVolume('perfume'));
  })
  $('.modal[data-modal="youtube"] .js-modal-close').on('click',() => {
    youtube.stopVideo('koi');
  })

})()
