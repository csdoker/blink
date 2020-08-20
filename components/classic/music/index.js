// components/classic/music/index.js
import { ClassicBehavior } from '../ClassicBehavior'

const musicManager = wx.getBackgroundAudioManager()

Component({
  behaviors: [ClassicBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        musicManager.title = this.properties.title
        musicManager.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        musicManager.pause()
      }
    },

    _recoverStatus() {
      if (musicManager.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (musicManager.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch() {
      musicManager.onPlay(() => {
        this._recoverStatus()
      })
      musicManager.onPause(() => {
        this._recoverStatus()
      })
      musicManager.onStop(() => {
        this._recoverStatus()
      })
      musicManager.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
