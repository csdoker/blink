// components/search/index.js
import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

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
    hotKeywords: [],
    books: [],
    searching: false,
    keyword: ''
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

    onDelete() {
      this.setData({
        searching: false
      })
    },

    onConfirm(event) {
      this.setData({
        searching: true
      })
      const keyword = event.detail.value || event.detail.text
      bookModel.search(0, keyword).then(res => {
        this.setData({
          books: res.data.books,
          keyword
        })
        keywordModel.addToHistory(keyword)
      })
    }
  }
})
