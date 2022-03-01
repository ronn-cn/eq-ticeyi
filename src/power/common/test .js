export default {
  data () {
    return {

    }
  },
  mounted () {
    window.addEventListener('beforeunload', (e) => this.beforeunloadHandler(e))
    window.addEventListener('unload', (e) => this.unloadHandler(e))
  },
  //离开页面
  destroyed: function () {
    window.removeEventListener('beforeunload', (e) =>
      this.beforeunloadHandler(e)
    )
    window.removeEventListener('unload', (e) => this.unloadHandler(e))
  },
  methods: {
    beforeunloadHandler () {
      this._beforeUnload_time = new Date().getTime()
    },
    //前端窗口关闭
    unloadHandler (e) {
      // alert('开了')
      this._gap_time = new Date().getTime() - this._beforeUnload_time
      // debugger
      //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        this.send_askLedState({ r: 0, g: 0, b: 0 })
      }
    },
  }
}