
Page({
  data: {
    key: '',
    userInfo: {

    }
  },
  onSave() {

  },
  onLoad(query) {
    const { key } = query
    this.setData({ key: key })
    // wx.setNavigationBarTitle({
    //   title: userMap[key] || '修改个人资料',
    // })
  },
})
