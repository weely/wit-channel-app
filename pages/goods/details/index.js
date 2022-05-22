import {
  fetchGood
} from '../../../services/goods'
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

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    details: {},
    minSalePrice: 0,
    maxSalePrice: 0,
    current: 1,
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
    address: '获取定位中...',
  },

  getDetail(id) {
    fetchGood(id).then((details) => {
      const { primaryImage, minSalePrice, maxSalePrice } = details

      this.setData({
        details,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
        primaryImage,
      })
    })
  },

  onSwiperChange(e){
    const { current } = e.detail
    this.setData({
      current: current + 1
    })
  },

  toOrder() {
    wx.showToast({
      title: '下单',
      icon: 'success',
      duration: 2000
    })
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
        const { latitude, longitude } = res
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success(r) {
            const { formatted_addresses } = r.result
            console.log(r.result)
            context.setData({
              address: formatted_addresses.recommend,
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
        console.log(result)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    const { id } = query
    this.setData({
      id: id
    })
    this.getDetail(id)
    this.init()
  }
})