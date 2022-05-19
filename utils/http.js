import { config } from '../config/index'

const http = (options) => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    const header = {
      'Authorization': 'Bearer ' + app.globalData.access_token,
      ...options.header
    }
    wx.request({
      url: config.apiHost + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: header,
      success: resolve,
      fail: reject
    })
  })
}

export default http
