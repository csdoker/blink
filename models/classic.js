import { HTTP } from '../util/http'

export class ClassicModel extends HTTP {
  getLatest() {
    return new Promise((resolve, reject) => {
      this.request({
        url: '/classic/latest',
        method: 'GET'
      }).then(res => {
        resolve(res)
      })
    })
  }
}