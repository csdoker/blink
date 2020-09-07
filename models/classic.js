import { HTTP } from '../util/http'

export class ClassicModel extends HTTP {
  getLatest() {
    return new Promise((resolve, reject) => {
      this.request({
        url: '/classic/latest',
        method: 'GET'
      }).then(res => {
        this._setLatestIndex(res.data.index)
        wx.setStorageSync(this._getKey(res.data.index), res.data)
        resolve(res.data)
      })
    })
  }

  getClassic(index, type) {
    const _index = type === 'next' ? index + 1 : index - 1
    const key = this._getKey(_index)
    const classic = wx.getStorageSync(key)
    return new Promise((resolve, reject) => {
      if (!classic) {
        this.request({
          url: `/classic/${index}/${type}`,
          method: 'GET'
        }).then(res => {
          wx.setStorageSync(this._getKey(res.data.index), res.data)
          resolve(res.data)
        })
      } else {
        resolve(classic)
      }
    })
  }

  getMyFavor() {
    return this.request({
      url: '/classic/favor'
    })
  }

  _getKey(index) {
    return `classic-${index}`
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  isFirst(index) {
    return index === 1
  }

  isLastest(index) {
    const latestIndex = this._getLatestIndex()
    return latestIndex === index && index !== 1
  }
}