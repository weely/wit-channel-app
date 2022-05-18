export function wxLogin(context, cb = null) {
  // 登录
  wx.login({
    success: res => {
      wx.request({
        url: `https://weely.cc/api/auth/wxLogin?code=${res.code}`,
        method: 'post',
        success(r) {
          const {
            openid,
            unionid,
            access_token,
            userInfo = {
              id: '',
              userName: '',
              mobile: ''
            }
          } = r.data
          context.globalData.openid = openid
          context.globalData.unionid = unionid
          context.globalData.userInfo = userInfo
          context.globalData.access_token = access_token

          cb && cb()
        },
        fail() {
          cb && cb()
          // wx.showModal({
          //   title: '登陆微信失败' + '(' + err + ')',
          //   content: '登陆失败,请检查您的网络设置，稍后重试'
          // })
        }
      })
    }
  })
}
