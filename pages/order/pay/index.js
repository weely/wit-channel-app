import { getOrderApi } from '../../../services/orders'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails: {},
    goodName: ''
  },
  toPay() {
    const timeStamp = new Date().getTime() + ''
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success (res) { 
        console.log('----', res)
      },
      fail (res) {
        console.log('--error--', res)
       }
    })
  },

  onLoad(options) {
    const { orderId, goodName='' } = options
    this.setData({
      goodName
    })
    getOrderApi(orderId).then((res) => {
      this.setData({
        orderDetails: {...res}
      })
    })
  }
})