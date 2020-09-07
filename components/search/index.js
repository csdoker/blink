// components/search/index.js
import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'

import { paginationBehavior } from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Number,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeywords: [],
    hotKeywords: [],
    searching: false,
    keyword: '',
    pageLoading: false
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
    loadMore() {
      if (!this.data.keyword) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.keyword).then(res => {
          this.setMoreData(res.data.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }
    },

    onCancel() {
      this.initialize()
      this.triggerEvent('cancel')
    },

    onDelete() {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showPageLoading()
      const keyword = event.detail.value || event.detail.text
      this.setData({
        keyword
      })
      bookModel.search(0, keyword).then(res => {
        const { books, total } = res.data
        this.setMoreData(books)
        this.setTotal(total)
        keywordModel.addToHistory(keyword)
        this._hidePageLoading()
      })
    },

    _showPageLoading() {
      this.setData({
        pageLoading: true
      })
    },

    _hidePageLoading() {
      this.setData({
        pageLoading: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        keyword: ''
      })
    }
  }
})
