import { fetchUserCenter } from '../../services/userCenter'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    customerServiceInfo: {},
    showKefu: false,
    showCustomerService: false
  },
  // 事件处理函数
  toPersonInfo() {
    wx.navigateTo({
      url: '../user-center/person-info/index'
    })
  },
  toCarManage() {
    wx.navigateTo({
      url: '../user-center/car/index'
    })
  },
  toOrderManage () {
    wx.switchTab({
      url: '/pages/order/index',
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toShowCustomerService() {
    this.setData({
      showCustomerService: true
    })
  },
  toCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    })
  },
  closeCustomerService() {
    this.setData({
      showCustomerService: false
    })
  },
  fetchUserCenterData(){
    fetchUserCenter().then((res) => {
      const { customerServiceInfo } = res
      this.setData({
        customerServiceInfo
      })
    })
  },
  init () {
    this.fetchUserCenterData()
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    this.init()
    this.getTabBar().init();
  }
})
