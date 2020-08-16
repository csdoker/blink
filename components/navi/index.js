// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    lastest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNext(event) {
      if (!this.properties.lastest) {
        this.triggerEvent('next')
      }
    },
    onPrev(event) {
      if (!this.properties.first) {
        this.triggerEvent('prev')
      }
    }
  }
})
