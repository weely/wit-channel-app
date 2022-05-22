import {
  fetchGood, parseGoodItem
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
    current: 1,
    goods: {},
  },

  getDetail(id) {
    fetchGood(id).then((details) => {
      const { primaryImage, minSalePrice, maxSalePrice } = details

      this.setData({
        details,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
        primaryImage,
        goods: { ...parseGoodItem(details) }
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
    wx.navigateTo({
      url: `/pages/order/place/index?id=${this.data.id}`,
      success: (res) => {
        console.log(this.data.goods)
        res.eventChannel.emit('acceptDataFromOpenerPage', { ...this.data.goods })
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
  }
})