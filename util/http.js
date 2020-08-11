import { CONFIG } from '../config.js'

const TIPS = {
  1: '抱歉，出现了一个错误',
  1005: 'APPKEY无效',
  3000: '期刊不存在'
}

export class HTTP {
  request(params) {
    const { url, method = 'GET', data } = params
    return new Promise((resolve, reject) => {
      wx.request({
        url: CONFIG.API_BASE_URL + url,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'appkey': CONFIG.APPKEY
        },
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res)
          } else {
            this.showError(res.data.error_code)
            reject(res)
          }
        },
        fail: (err) => {
          this.showError(1)
          reject(err)
        }
      })
    })
  }
  showError (errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    wx.showToast({
      title: TIPS[errorCode],
      duration: 2000
    })
  }
}