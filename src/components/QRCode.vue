<style scoped lang="scss"></style>

<template>
  <div>
    <div :id="'vx_qrcode' + codeid"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  props: {
    qrwidth: {
      type: Number,
      default: 157,
    },
    qrheight: {
      type: Number,
      default: 157,
    },
    codeTest: {
      type: String,
    },
    codeid: {
      type: String,
      default: "1"
    },
  },
  data () {
    return {
      qrcode: null,
    };
  },
  created () { },
  mounted () {
    this.init_qrcode();
  },
  methods: {
    async init_qrcode () {
      //这里是调用的方法
      const qrid = await document.getElementById("vx_qrcode" + this.codeid);
      if (qrid) {
        if (qrid.hasChildNodes()) {
          console.log("有");
        } else {
          this.qrcode = new QRCode(qrid, {
            width: this.qrheight, // 设置宽度
            height: this.qrheight, // 设置高度
            text: this.codeTest,
          });
        }
      }
    },
  },
};
</script>
