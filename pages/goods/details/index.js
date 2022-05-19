import {
  fetchGood
} from '../../../services/goods'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    details: {},
    minSalePrice: 0,
    maxSalePrice: 0,
    current: 1
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    const { id } = query
    this.setData({
      id: id
    })
    this.getDetail(id)
  }
})