import { CONFIG } from '../config.js'

const TIPS = {
  1: '抱歉，出现了一个错误',
  1005: 'APPKEY无效',
  3000: '期刊不存在'
}

const promisic = (func) => {
  return (params = {}) => {
    new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export class HTTP {
  request({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: CONFIG.API_BASE_URL + url,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'appkey': CONFIG.API_KEY
        },
        success: (res) => {
          const code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res)
          } else {
            this.showError(res.data.error_code)
            reject()
          }
        },
        fail: (err) => {
          this.showError(1)
          reject()
        }
      })
    })
  }
  showError (errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    const tip = TIPS[errorCode]
    wx.showToast({
      title: tip ? tip : TIPS[1],
      duration: 2000
    })
  }
}