<style scoped lang='scss'>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    color: #000;
    width: 650px;
    height: 400px;
    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>

<template>
  <div class="wrapper_cover">
    <van-overlay :show="true"
                 @click="$emit('showover')">
      <div class="wrapper">
        <div class="block">
          <QRCode ref="qrcode1"
                  class="vx_qr"
                  :qrwidth="220"
                  :qrheight="220"
                  :codeTest="Qrcode"></QRCode>
          <p style="padding-top: 0.15rem">微信扫码查看推荐课程</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant'
import QRCode from '@/components/QRCode.vue'
import { mapGetters } from "vuex"
export default {
  data () {
    return {

    };
  },
  components: {
    VanOverlay: Overlay,
    QRCode
  },
  computed: {
    ...mapGetters(['Qrcode']),
  },
  created () {
    console.log(23)
  },
  mounted () {

  },
  methods: {

  }
};
</script>
