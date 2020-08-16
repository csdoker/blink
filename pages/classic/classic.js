// pages/classic/classic.js
import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    lastest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest().then(res => {
      this.setData({
        classic: res.data
      })
    })
  },

  onlike(event) {
    const { status } = event.detail
    const { id, type } = this.data.classic
    likeModel.like(status, id, type)
  },

  onNext() {
    this._updateClassic('next')
  },

  onPrev() {
    this._updateClassic('prev')
  },

  _updateClassic(type) {
    const index = this.data.classic.index
    classicModel.getClassic(index, type).then(res => {
      this.setData({
        classic: res.data,
        lastest: classicModel.isLastest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})