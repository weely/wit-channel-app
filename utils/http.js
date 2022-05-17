import { config } from '../config/index'
const app = getApp()

const http = (options) => {
  return new Promise((resolve, reject) => {
    const header = {
      'Authorization': 'Bearer ' + app.globalData.access_token,
      ...options.header
    }
    console.log('access_token', app.globalData.access_token)
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
