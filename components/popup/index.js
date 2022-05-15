Component({
  externalClasses: ['popup-class'],
  useStore: [],
  properties: {
    /** 关闭按钮，值类型为 Boolean 时表示是否显示关闭按钮。也可以自定义关闭按钮 */
    closeBtn: {
      type: Boolean,
    },
    /** 点击遮罩层是否关闭 */
    closeOnOverlayClick: {
      type: Boolean,
      value: true
    },
    /** 是否显示遮罩层 */
    showOverlay: {
      type: Boolean,
      value: true,
    },
    /** 是否显示popup */
    visible: {
      type: Boolean,
      value: false,
    },
    zIndex: {
      type: Number,
      value: 1500
    },
  },

  methods: {
    onOverlayClick() {
      const {
        closeOnOverlayClick
      } = this.properties
      if (closeOnOverlayClick) {
        this.triggerEvent('visible-change', {
          visible: false
        })
      }
    },
    onCloseClick() {
      this.triggerEvent('visible-change', {
        visible: false
      });
    }
  },
})