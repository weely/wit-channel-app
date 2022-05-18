import { updateUser } from '../../../services/userCenter'
const app = getApp()

Page({
  data: {
    key: '',
    userInfo: {
      id: '',
      userName: '',
      mobile: '',
    },
    primeval: {
      userName: '',
      mobile: '',
    }
  },
  bindKeyInput: function(e) {
    const { key } = e.currentTarget.dataset
    const value = e.detail.value
    this.data[key] = value
    this.setData({
      [key]: value
    })
  },
  onSave() {
    const params = { ...this.data.userInfo }
    updateUser(params).then((res) => {
      if (res.data.code === 200) {
        app.globalData.userInfo.username = params.username
        app.globalData.userInfo.mobile = params.mobile
        wx.navigateBack({
          delta: 0,
        })
      } else {
        wx.showToast({
          title: '更新失败',
        })
      }
    })
  },
  onLoad() {
  },
  onShow() {
    this.setData({
      userInfo: {
        ...app.globalData.userInfo
      },
      primeval : {
        ...app.globalData.userInfo
      }
    })
  }
})
