import {
  formatPrice
} from '../../utils/util'

Component({
  externalClasses: ['wr-class', 'symbol-class', 'decimal-class'],
  useStore: [],
  properties: {
    priceUnit: {
      type: String,
      value: 'fen',
    }, // 价格单位，分 | 元, fen，yuan
    price: {
      type: null,
      value: '',
      observer(price) {
        this.format(price)
      },
    }, // 价格, 以分为单位
    type: {
      type: String,
      value: '', //
    }, //  main 粗体, lighter 细体, mini 黑色, del 中划线, delthrough 中划线，包括货币符号
    label: {
      type: String,
      value: '', // '合计：',
    },
    symbol: {
      type: String,
      value: '¥', // '￥',
    }, // 货币符号，默认是人民币符号￥
    fill: Boolean, // 是否自动补齐两位小数
    decimalSmaller: Boolean, // 小数字号小一点
    lineThroughWidth: {
      type: null,
      value: '0.12em',
    }, // 划线价线条高度
  },

  data: {
    priceArr: [],
  },

  methods: {
    format(price) {
      const priceArr = formatPrice(price)

      this.setData({
        priceArr
      })
    },
  },
});