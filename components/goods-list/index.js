Component({
  externalClasses: ['wr-class'],

  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {
    onClickGoods(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('click', { ...e.detail, index })
    },

    onPLaceOrder(e) {
      const { index } = e.currentTarget.dataset
      console.log('--index--', index, e.detail)
      this.triggerEvent('place-order', { ...e.detail, index })
    },

    onClickGoodsThumb(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('thumb', { ...e.detail, index })
    },

    init() {
      this.genIndependentID(this.id || '')
    },

    genIndependentID(id) {
      if (id) {
        this.setData({ independentID: id })
      } else {
        this.setData({
          independentID: `goods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
