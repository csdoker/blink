import { HTTP } from '../util/http'

export class LikeModel extends HTTP {
  like(status, artID, category) {
    const url = status ? '/like' : '/like/cancel'
    return new Promise((resolve, reject) => {
      this.request({
        url,
        method: 'POST',
        data: {
          art_id: artID,
          type: category
        }
      }).then(res => {
        resolve(res)
      })
    })
  }

  getLike(artID, category) {
    return new Promise((resolve, reject) => {
      this.request({
        url: `/classic/${category}/${artID}/favor`,
        method: 'GET'
      }).then(res => {
        resolve(res.data)
      })
    })
  }
}