// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImgSrc: 'images/like.png',
    unlikeImgSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLikeTap(event) {
      let { like, count } = this.properties
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count
      })
      this.triggerEvent('like', {
        status: this.properties.like
      })
    }
  }
})
