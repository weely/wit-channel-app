import { config } from '../../../config/index'
import { checkLocationAuth, geocoder, getDistance } from '../../../utils/location'
const app = getApp()
const QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js')
let qqmapsdk;

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
        const { formatted_addresses } = r.result
        console.log(r.result)
        context.setData({
          address: formatted_addresses.recommend,
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
          address: address
        })
        wx.setStorageSync('receivingAdress', {
          ...result,
          address: address
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  async toSumbitOrder() {
    try {
      qqmapsdk = qqmapsdk || (new QQMapWX({ key: config.mapKey }))
      const res = await geocoder(qqmapsdk, this.data.address)
      const res2 = await geocoder(qqmapsdk, '深圳市')

      const { location } = res.result
      const { location2 } = res2.result
      console.log(location,location2)

      // const distance = getDistance(location.lat,location.lng,location2.lat,location2.lng)
    } catch(err) {
      console.log(err)
    }
    // wx.showToast({
    //   title: '下单成功',
    // })
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (goods) => {
      this.setData({ goods })
    });
    const {address, ...rest} = wx.getStorageSync('receivingAdress') || {}
    this.setData({
      receiveAddr: { ...rest },
      address: address
    })
    if (!address) {
      this.initLocation()
    }
  }
})
