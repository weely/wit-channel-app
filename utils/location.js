export async function checkLocationAuth(context) {
  try {
    const res = await wx.getSetting()
    if (res.authSetting['scope.userLocation']) {
      return Promise.resolve(true)
    } else {
      await wx.authorize({scope: 'scope.userLocation'})
      return Promise.resolve(true)
    }
  } catch (err) {
    console.log('地理位置未授权，错误信息', err)
    return Promise.resolve(false)
  }
}
