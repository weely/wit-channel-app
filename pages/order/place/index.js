import {
  config
} from '../../../config/index'
import {
  checkLocationAuth
} from '../../../utils/location'
import { getDistance } from '../../../utils/util'
const app = getApp()
const QQMapWX = require('../../../libs/qqmap-wx-jssdk.js')
let qqmapsdk;

Page({
  data: {
    hasLocationAuth: null,
    goods: {},
    adInfo: {
      name: '获取定位中...',
      address: '',
      latitude: '',
      longitude: ''
    },
  },
  async init() {
    const hasLocationAuth = await checkLocationAuth(this)
    this.setData({
      hasLocationAuth
    })
    qqmapsdk = new QQMapWX({
      key: config.mapKey
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel && eventChannel.on && eventChannel.on('acceptDataFromOpenerPage', (goods) => {
      this.setData({
        goods
      })
    })
    this.getLocation()
  },
  getLocation() {
    const context = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const {
          latitude,
          longitude
        } = res
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success(r) {
            const {
              address,
              formatted_addresses
            } = r.result
            console.log(r.result)
            context.setData({
              adInfo: {
                address: address,
                name: formatted_addresses.recommend,
                latitude,
                longitude
              }
            })
          },
          fail: function (error) {
            console.error(error)
          },
        })
      }
    })
  },
  toChooseLocation() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
      },
      fail: (err) => {
        console.log(err)
      }
    })
    // const context = this
    // wx.chooseLocation({
    //   success: (res) => {
    //     context.setData({
    //       adInfo: {
    //         name: res.name,
    //         address: res.address,
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       }
    //     })
    //   },
    //   fail: (err) => {
    //     console.log('---', err)
    //   }
    // })
  },
  onLoad() {
    this.init()
  },
  onShow() {

  },
})