import { config } from '../../../config/index'
import { checkLocationAuth } from '../../../utils/location'
import { wxLogin } from '../../../services/login'
const QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js')
const app = getApp()
let qqmapsdk;
const allowOrderCity = '广州'

Page({
  data: {
    hasLocationAuth: null,
    goods: {},
    receiveAddr: {
      cityName: '',
      countyName: '',
      detailInfo:  '',
      nationalCode: '',
      postalCode: '',
      provinceName: '',
      telNumber: '',
      userName: '请补充联系方式'
    },
    address: '',
    canBuy: null,
  },
  async initLocation() {
    const hasLocationAuth =  await checkLocationAuth(this)
    this.setData({ hasLocationAuth })
    this.getLocation()
  },
  getLocation(){
    const context = this
    qqmapsdk =  new QQMapWX({ key: config.mapKey })
    qqmapsdk.reverseGeocoder({
      async success(r){
        const { formatted_addresses, ad_info } = r.result
        context.setData({
          address: formatted_addresses.recommend,
          canBuy: ad_info.city && ad_info.city.includes(allowOrderCity)
        })
      },
      fail: function(error) {
        console.error(error);
      },
    })
  },
  toChooseLocation() {
    const context = this
    wx.chooseAddress({
      success: (result) => {
        const { provinceName,cityName,countyName ,detailInfo} = result
        const address = `${provinceName} ${cityName} ${countyName} ${detailInfo}`
        context.setData({
          receiveAddr: {
            ...result
          },
          address: address,
          canBuy: cityName.includes(allowOrderCity)
        })
        wx.setStorageSync('receivingAdress', {
          ...result,
          address: address
        })
      },
      fail: (err) => {
        console.log(err)
        wx.setStorageSync('receivingAdress', {})
      }
    })
  },
  async toSumbitOrder() {
    try {
      if (!app.globalData.openid){
        wx.showModal({
          title: '提示',
          content: '未登录，请点击登录后下单',
          showCancel: false,
          confirmText: '登录',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
              wxLogin(app)
            }
          }
        })
        return
      }
      if (!this.data.address || !this.data.receiveAddr.telNumber) {
        wx.showToast({
          title: '请补充收货地址',
          icon: 'error'
        })
        return
      }
      // TODO 下单
    } catch(err) {
      console.log(err)
    }
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (goods) => {
      this.setData({ goods })
    });
    const {address, ...rest} = wx.getStorageSync('receivingAdress') || {}
    const canBuy = rest.cityName && rest.cityName.includes(allowOrderCity)
    this.setData({
      receiveAddr: { ...rest },
      address: address,
      canBuy: canBuy
    })
    if (!address) {
      this.initLocation()
    }
  }
})
