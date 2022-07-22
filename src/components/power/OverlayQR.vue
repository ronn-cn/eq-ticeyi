<style scoped lang="scss">
.qr_view {
  // position: relative;
  // z-index: 999;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 890px;
  height: 390px;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #000;
    margin-top: 30px;
  }
}
</style>

<template>
  <div class="qr_view"
       @click="$emit('closeqr')">
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <QRCode ref="qrcode1"
                  class="vx_qr"
                  :qrwidth="206"
                  :qrheight="206"
                  codeid="3"
                  :codeTest="Qrcode"></QRCode>
          <p>请扫码登录账号，开启当前器械训练</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
import { Overlay } from 'vant'
export default {
  props: {

  },
  components: {
    VanOverlay: Overlay,
    QRCode
  },
  watch: {},
  data () {
    return {
      popuo_audio: null,
      show: true
    }
  },
  computed: {
    ...mapGetters(['Qrcode'])
  },
  created () { },
  mounted () {

  },
  //离开页面
  unmounted () { },
  destroyed: function () {

  },
  methods: {
    closevan () {
      console.log('1')
    }
  },
}
</script>
