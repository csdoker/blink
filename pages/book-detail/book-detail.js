// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    comments: [],
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    const detail = bookModel.getDetail(id)
    const likeStatus = bookModel.getLikeStatus(id)
    const comments = bookModel.getComments(id)
    detail.then(res => {
      this.setData({
        book: res.data
      })
    })
    likeStatus.then(res => {
      this.setData({
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums
      })
    })
    comments.then(res => {
      this.setData({
        comments: res.data.comments
      })
    })
  },

  onLike(event) {
    const likeStatus = event.detail.status
    likeModel.like(likeStatus, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  }
})