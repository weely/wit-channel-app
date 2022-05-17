const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      id: '',
      userName: '',
      mobile: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.setData({
      userInfo: {
        ...app.globalData.userInfo
      }
    })
  },
  toModify(e) {
    const { key } = e.currentTarget.dataset
    const url = `../../user-center/user-modify/index?key=${key}`
    wx.navigateTo({
      url: url
    })
  }
})