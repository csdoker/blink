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
    historyKeywords: []
  },

  attached() {
    const historyKeywords = keywordModel.getHistory()
    this.setData({
      historyKeywords
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel')
    },

    onConfirm() {
      const keyword = event.detail.value
      keywordModel.addToHistory(keyword)
    }
  }
})
