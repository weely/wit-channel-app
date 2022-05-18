Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openLocation() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 18
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
})