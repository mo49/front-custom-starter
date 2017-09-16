// https://github.com/goldfire/howler.js#documentation

import EventEmitter from 'events';
import { Howler, Howl } from 'howler';

import Cookie from './Cookie';

const BGM_VOLUME = 0.2;
const BGM_KEY = 'bgm';
const cookie = new Cookie();

class SoundManager extends EventEmitter {
    constructor (opts = {}) {
        super();
        this.isMute = (cookie.getMute() === 'true') || false;
        this.sounds = {};
    }

    get EVENT() {
        return {
            TOGGLE_MUTE: 'toggle-mute',
        }
    }

    unmute () {
        this.isMute = false;
        cookie.setMute(this.isMute);
        Howler.mute(false);
        this.emit(this.EVENT.TOGGLE_MUTE, this.isMute);
    }

    mute () {
        this.isMute = true;
        cookie.setMute(this.isMute);
        Howler.mute(true);
        this.emit(this.EVENT.TOGGLE_MUTE, this.isMute);
    }

    /**
     * @param {String} key 識別キー
     * @param {*} opts 以下のような設定で初期化できる
     * {
     *   src: [ '/sound/top_bgm.mp3' ],
     *   volume: 0.2,
     *   preload: true,
     *   loop: true
     * }
     */
    setSound (key, opts = {}) {
        this.sounds[key] = new Howl(opts);
    }

    play (key, opts = {}) {
        const sound = this.sounds[key];
        if (!sound) return;
        sound.play();

        if (opts.fade) {
            sound.fade(
                opts.fade.from || 0,
                opts.fade.to || 1,
                opts.fade.duration || 0
            );
        }

        if (opts.cb) {
            sound.once('end', opts.cb);
        }
    }

    stop (key, opts = {}) {
        const sound = this.sounds[key];
        if (!sound) return;
        if (opts.fade) {
            sound.fade(
                opts.fade.from || 1,
                opts.fade.to || 0,
                opts.fade.duration || 0
            );
            sound.once('fade', () => {
                sound.stop();
            });
        } else {
            sound.stop();
        }
    }

    startBgm (duration = 0) {
        this.play(BGM_KEY, {
            fade: duration ? {
                from: 0,
                to: BGM_VOLUME,
                duration
            } : null
        });
    }

    stopBgm (duration = 0) {
        this.stop(BGM_KEY, {
            fade: duration ? {
                from: BGM_VOLUME,
                to: 0,
                duration
            } : null
        });
    }
};

// 別タブに移動した際など、強制ミュートにする
document.addEventListener('visibilitychange', (e) => {
    Howler.mute(document.visibilityState !== 'visible');
});

export default new SoundManager();
