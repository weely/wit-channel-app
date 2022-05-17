import { updateUser } from '../../../services/userCenter'
const app = getApp()

Page({
  data: {
    key: '',
    userInfo: {
      id: '',
      userName: '',
      mobile: '',
    }
  },
  bindKeyInput(e) {
    const { key } = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [key]: value
    })
  },
  onSave() {
    const params = { ...this.data.userInfo }
    console.log('------', params)
    updateUser(params).then((res) => {
      if (res.data.code === 200) {
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
  onLoad(query) {
    const { key } = query
    this.setData({ key: key })

    console.log('--app.globalData.userInfo----', app.globalData.userInfo )
    this.setData({
      userInfo: {
        ...app.globalData.userInfo
      }
    })
  },
})
