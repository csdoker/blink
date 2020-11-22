// pages/book/book.js
import { BookModel } from '../../models/book'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // bookModel.getHotList().then(res => {
    //   this.setData({
    //     books: res.data
    //   })
    // })
    const res = await bookModel.getHotList()
    this.setData({
      books: res.data
    })
  },

  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    this.setData({
      more: this.data.more + 1
    })
  }
})