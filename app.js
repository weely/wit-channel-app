// app.js
import { wxLogin } from './services/login'

App({
  globalData: {
    userInfo: {
      id: '',
      userName: '',
      mobile: '',
    },
    openid: '',
    unionid: '',
    access_token: ''
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wxLogin(this)
  }
})
