import { HTTP } from '../util/http'

export class ClassicModel extends HTTP {
  getLatest() {
    return new Promise((resolve, reject) => {
      this.request({
        url: '/classic/latest',
        method: 'GET'
      }).then(res => {
        this._setLatestIndex(res.data.index)
        resolve(res)
      })
    })
  }

  getClassic(index, type) {
    return new Promise((resolve, reject) => {
      this.request({
        url: `/classic/${index}/${type}`,
        method: 'GET'
      }).then(res => {
        resolve(res)
      })
    })
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