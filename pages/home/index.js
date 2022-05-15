import { fetchHome } from '../../services/home'
import { fetchGoodsList } from '../../services/goods'

Page({
  data: {
    pageLoading: false,
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
  init() {
    this.loadHomePage()
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

      this.loadGoodsList(true)
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
      console.log('-err--nextList--', err)

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
  scroll(e) {
    console.log(e)
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  imageLoadError(e){
    console.log(e)
  }
})
