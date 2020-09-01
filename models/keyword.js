import { HTTP } from "../util/http"

export class KeywordModel extends HTTP {
  key = 'keywords'
  maxLength = 10

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    const keywords = this.getHistory()
    if (!keywords.includes(keyword)) {
      if (keywords.length >= this.maxLength) {
        keywords.pop()
      }
      keywords.unshift(keyword)
      wx.setStorageSync(this.key, keywords)
    }
  }
}