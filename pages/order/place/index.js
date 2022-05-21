import { config } from '../../../config/index'
import { checkLocationAuth } from '../../../utils/location'
import { getBase64Url } from '../../../utils/util'
const app = getApp()
const QQMapWX = require('../../../libs/qqmap-wx-jssdk.js')
let qqmapsdk;

Page({
  data: {
    hasLocationAuth: null,
    goods: {},
    address: '',
    svgPosition: ''
  },
  async init() {
    this.getPositionSvg()
    const hasLocationAuth =  await checkLocationAuth(this)
    this.setData({ hasLocationAuth })
    qqmapsdk =  new QQMapWX({ key: config.mapKey })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel && eventChannel.on('acceptDataFromOpenerPage', (goods) => {
      this.setData({ goods })
    })
    this.getLocation()
  },
  getPositionSvg() {
    // console.log(app.require('/assets/icons/position'))
    wx.getFileSystemManager().readFile({
      filePath: '../../../assets/icons/position.svg',
      success: res=> {
        console.log(res)
        const svgPosition = getBase64Url(res)
        console.log(svgPosition)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getLocation(){
    const context = this
    qqmapsdk.reverseGeocoder({
      success(r){
        const { address } = r.result
        context.setData({
          address
        })
      },
      fail: function(error) {
        console.error(error);
      },
    })
  },
  onLoad() {
    this.init()
  },
  onShow() {

  },
})
