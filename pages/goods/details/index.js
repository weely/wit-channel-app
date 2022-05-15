import {
  fetchGood
} from '../../../services/goods'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodId: '',
    details: {},
    maxLinePrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
    current: 1
  },

  getDetail(goodId) {
    fetchGood(goodId).then((details) => {
      const {
        primaryImage,
        minSalePrice,
        maxSalePrice,
        maxLinePrice,
      } = details

      this.setData({
        details,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        maxLinePrice: maxLinePrice ? parseInt(maxLinePrice) : 0,
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
    console.log('--index--', this.data.goodId)
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
    const {
      goodId
    } = query
    this.setData({
      goodId: goodId
    })
    this.getDetail(goodId);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})