const paginationBehavior = Behavior({
  data: {
    datas: [],
    total: null,
    noneResult: false
  },
  methods: {
    setMoreData(moreDatas) {
      const newDatas = this.data.datas.concat(moreDatas)
      this.setData({
        datas: newDatas
      })
    },
    getCurrentStart() {
      return this.data.datas.length
    },
    setTotal(total) {
      this.setData({
        total,
        noneResult: total === 0
      })
    },
    hasMore() {
      return !(this.data.datas.length >= this.data.total)
    },
    initialize() {
      this.setData({
        datas: [],
        total: null,
        noneResult: false
      })
    }
  }
})

export { paginationBehavior }