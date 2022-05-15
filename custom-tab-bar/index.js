import data from './data'

Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [...data]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      // this.setData({ selected: data.index })
    },
    init() {
      const page = getCurrentPages().pop()
      const route = page ? page.route.split('?')[0] : ''
      const selected = this.data.list.findIndex(
        (item) =>
        (item.pagePath.startsWith('/') ? item.pagePath.substr(1) : item.pagePath) ===
        `${route}`,
      );
      this.setData({
        selected
      })
    },
  },
})