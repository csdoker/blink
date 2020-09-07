// pages/classic/classic.js
import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({
  properties: {
    cid: Number,
    type: Number
  },

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    lastest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },


  attached(options) {
    const { cid, type } = this.properties
    if (!cid) {
      classicModel.getLatest().then(data => {
        this.setData({
          classic: data,
          likeCount: data.fav_nums,
          likeStatus: data.like_status
        })
      })
    }
    else{
      classicModel.getById(cid, type).then(res=>{
        const { id, type, index } = res.data
        this._getLike(id, type)
        this.setData({
          classic: res.data,
          latest: classicModel.isLastest(index),
          first: classicModel.isFirst(index)
        })
      })
    }
  },

  methods: {
    onlike(event) {
      const { status } = event.detail
      const { id, type } = this.data.classic
      likeModel.like(status, id, type)
    },
  
    onNext() {
      this._updateClassic('next')
    },
  
    onPrev() {
      this._updateClassic('previous')
    },
  
    _updateClassic(type) {
      const index = this.data.classic.index
      classicModel.getClassic(index, type).then(data => {
        this._getLike(data.id, data.type)
        this.setData({
          // ...data
          classic: data,
          lastest: classicModel.isLastest(data.index),
          first: classicModel.isFirst(data.index)
        })
      })
    },
  
    _getLike(artID, category) {
      likeModel.getLike(artID, category).then(data => {
        this.setData({
          likeCount: data.fav_nums,
          likeStatus: data.like_status
        })
      })
    }
  }
})