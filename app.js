// app.js
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
    const context = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // const data = {
        //   "session_key": "UYWr222Jh04oHjOLtxw+Og==",
        //   "openid": "oejIM5CcufcOh0iZqMt22Nw6yUAw",
        //   "unionid": "o2K4C5zqKpzvka4R_BbcUt0TFvsc"
        // }
        console.log(res)
        wx.request({
          url: `https://weely.cc/api/auth/wxLogin?code=${res.code}`,
          method: 'post',
          success(r) {
            console.log(r)
            const { openid,unionid, access_token, userInfo={id: '', userName: '', mobile: ''} } = r.data
            context.globalData.openid = openid
            context.globalData.unionid = unionid
            context.globalData.userInfo = userInfo
            context.globalData.access_token = access_token
          },
          fail(err) {
            wx.showModal({
              title: '登陆微信失败' + '(' + err + ')',
              content: '登陆失败,请检查您的网络设置，稍后重试'
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
