import { fetchHome } from '../../services/home'
import { fetchGoodsList } from '../../services/goods'

Page({
  data: {
    noLocationAuth: false,
    hasLocationAuth: false,
    pageLoading: true,
    swiperOptions: [],
    goodsList: []
  },
  goodListPagination: {
    index: 0,
    num: 20,
  },

  onLoad() {
    this.init()
  },
  onShow() {
    this.getTabBar().init();
  },
  async init() {
    this.loadHomePage()
    await this.checkLocationAuth()
    if (this.data.hasLocationAuth) {
      this.loadGoodsList(true)
    }
  },
  async checkLocationAuth() {
    const context = this
    try {
      const res = await wx.getSetting()
      if (res.authSetting['scope.userLocation']) {
        context.switchLocationAuth(true)
      } else {
        await wx.authorize({scope: 'scope.userLocation'})
        context.switchLocationAuth(true)
      }
    } catch (err) {
      console.log('地理位置未授权，错误信息', err)
      context.switchLocationAuth(false)
    }
  },
  loadHomePage() {
    wx.stopPullDownRefresh()
    this.setData({
      pageLoading: true,
    })
    fetchHome().then(({ swiper }) => {
      this.setData({
        swiperOptions: swiper,
        pageLoading: false,
      })
    })
  },
  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }

    this.setData({ goodsListLoadStatus: 1 })

    const pageSize = this.goodListPagination.num
    let pageIndex = this.goodListPagination.index + 1
    if (fresh) {
      pageIndex = 0
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize)
      
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      })

      this.goodListPagination.index = pageIndex
      this.goodListPagination.num = pageSize
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 })
    }
  },
  goodListClickHandle(e) {
    const { index } = e.detail
    const { goodId } = this.data.goodsList[index]
    wx.navigateTo({
      url: `/pages/goods/details/index?goodId=${goodId}`,
    })
  },
  goodListPlaceOrderHandle(e) {
    const { goods } = e.detail

    console.log('--index--', goods)

    wx.showToast({
      title: '下单',
      icon: 'success',
      duration: 2000
    })
  },
  imageLoadError(e){
    console.log(e)
  },
  setLocationAuth() {
    const context = this
    wx.openSetting({
      withSubscriptions: true,
      success(res) {
        context.switchLocationAuth(res.authSetting['scope.userLocation'])
        if (res.authSetting['scope.userLocation']) {
          context.loadGoodsList(true)
        }
      },
      fail(err){
        console.log(err)
        context.switchLocationAuth(false)
      },
    })
  },
  switchLocationAuth(hasAuth){
    this.setData({
      hasLocationAuth: hasAuth,
      noLocationAuth: !hasAuth
    })
  }
})
