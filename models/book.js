import { HTTP } from '../util/http'

export class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
}