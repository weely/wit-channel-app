import { fetchHome } from '../../services/home'
import { fetchGoodsList } from '../../services/goods'
import { checkLocationAuth } from '../../utils/location'

const app = getApp()
Page({
  data: {
    hasLocationAuth: null,
    pageLoading: true,
    swiperOptions: [],
    goodsList: [],
    goodListPagination: {
      index: 0,
      num: 20,
    },
  },
  onLoad() {
    this.init()
  },
  onShow() {
    this.getTabBar().init();
  },
  async init() {
    this.loadHomePage()
    const hasLocationAuth = await checkLocationAuth(this)
    this.setData({ hasLocationAuth })
    if (hasLocationAuth) {
      this.loadGoodsList(true)
    }
  },
  loadHomePage() {
    wx.stopPullDownRefresh()
    this.setData({
      pageLoading: true,
    })
    fetchHome().then((res) => {
      const { swiper } = res
      this.setData({
        swiperOptions: swiper,
        pageLoading: false,
      })
    })
  },
  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({ scrollTop: 0 })
    }
    this.setData({ goodsListLoadStatus: 1 })
    const pageSize = this.data.goodListPagination.num
    let pageNo = this.data.goodListPagination.index + 1
    if (fresh) pageNo = 0

    try {
      const nextList = await fetchGoodsList(pageNo, pageSize)
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
        ['goodListPagination.index']: pageNo,
        ['goodListPagination.num']: pageSize
      })
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 })
    }
  },
  goodListClickHandle(e) {
    const { index } = e.detail
    const { id } = this.data.goodsList[index]
    wx.navigateTo({
      url: `/pages/goods/details/index?id=${id}`,
    })
  },
  goodListPlaceOrderHandle(e) {
    const { goods } = e.detail
    wx.navigateTo({
      url: `/pages/order/place/index?id=${goods.id}`,
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { ...goods })
      }
    })
    // wx.showToast({
    //   title: '下单',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  imageLoadError(e){
    console.log(e)
  },
  setLocationAuth() {
    const context = this
    wx.openSetting({
      withSubscriptions: true,
      success(res) {
        const hasLocationAuth = res.authSetting['scope.userLocation']
        context.setData({ hasLocationAuth })
        if (hasLocationAuth) {
          context.loadGoodsList(true)
        }
      },
      fail(err){
        console.log(err)
        context.setData({ hasLocationAuth: false })
      },
    })
  }
})
