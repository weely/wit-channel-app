import { formatPrice } from '../../utils/util'

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
        if (this.properties.thresholds?.length) {
          this.createIntersectionObserverHandle()
        }
      },
    },
    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return
        }
        let isValidityLinePrice = true
        if (data.originPrice && data.price && data.originPrice < data.price) {
          isValidityLinePrice = false
        }
        const priceArr = formatPrice(data.price)
        const originPriceArr = formatPrice(data.originPrice)
        this.setData({
          goods: data,
          isValidityLinePrice,
          priceArr: priceArr,
          originPriceArr: originPriceArr
        })
      },
    },
    currency: {
      type: String,
      value: '¥',
    },

    thresholds: {
      type: Array,
      value: [],
      observer(thresholds) {
        if (thresholds && thresholds.length) {
          this.createIntersectionObserverHandle()
        } else {
          this.clearIntersectionObserverHandle()
        }
      },
    },
  },

  data: {
    independentID: '',
    goods: { id: '' },
    isValidityLinePrice: false,
    priceArr: [],
    originPriceArr: []
  },

  lifetimes: {
    ready() {
      this.init()
    },
    detached() {
      this.clear()
    },
  },

  pageLifeTimes: {},

  methods: {
    clickHandle() {
      this.triggerEvent('click', { goods: this.data.goods })
    },

    clickThumbHandle() {
      this.triggerEvent('thumb', { goods: this.data.goods })
    },

    placeOrderHandle(e) {
      const { id } = e.currentTarget
      const { id: cardID } = e.currentTarget.dataset
      this.triggerEvent('place-order', {
        ...e.detail,
        id,
        cardID,
        goods: this.data.goods,
      })
    },

    genIndependentID(id) {
      let independentID
      if (id) {
        independentID = id
      } else {
        independentID = `goods-card-${~~(Math.random() * 10 ** 8)}`
      }
      this.setData({ independentID })
    },

    init() {
      const { thresholds, id } = this.properties
      this.genIndependentID(id);
      if (thresholds && thresholds.length) {
        this.createIntersectionObserverHandle()
      }
    },

    clear() {
      this.clearIntersectionObserverHandle()
    },

    intersectionObserverContext: null,

    createIntersectionObserverHandle() {
      if (this.intersectionObserverContext || !this.data.independentID) {
        return;
      }
      this.intersectionObserverContext = this.createIntersectionObserver({
        thresholds: this.properties.thresholds,
      }).relativeToViewport()

      this.intersectionObserverContext.observe(
        `#${this.data.independentID}`,
        (res) => {
          this.intersectionObserverCB(res)
        },
      );
    },

    intersectionObserverCB() {
      this.triggerEvent('ob', {
        goods: this.data.goods,
        context: this.intersectionObserverContext,
      })
    },

    clearIntersectionObserverHandle() {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect()
        } catch (e) {}
        this.intersectionObserverContext = null
      }
    },

  },
})
