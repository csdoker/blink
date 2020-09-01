// components/search/index.js
import { KeywordModel } from '../../models/keyword'
const keywordModel = new KeywordModel()
 
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeywords: [],
    hotKeywords: []
  },

  attached() {
    this.setData({
      historyKeywords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotKeywords: res.data.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel')
    },

    onConfirm(event) {
      const keyword = event.detail.value
      keywordModel.addToHistory(keyword)
    }
  }
})
