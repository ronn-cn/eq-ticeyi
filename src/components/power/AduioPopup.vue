<style scoped lang="scss">
.popup_close {
  position: fixed;
  left: 26vw;
  top: 25vh;
  z-index: 999;
  width: 42vw;
  height: 26vh;
  padding: 0.4rem 0.2rem;
  border-radius: 15px;
  background-color: #fff;
  .close_p1 {
    color: #000;
    font-size: 42px;
    margin: 0.4rem 0 0.5rem 0;
  }
  .btn_list {
    padding: 0 10%;
    display: flex;
    justify-content: space-between;
  }
  .close_btn1,
  .close_btn2 {
    color: #000;
    display: inline-block;
    margin: 0 10px;
    padding: 20px 0.3rem;
    border-radius: 4px;
    border: 1px solid #000;
  }
  .close_btn2 {
    background-color: #000;
    color: #fff;
    // padding: 20px 10px;
  }
}
</style>

<template>
  <div class="popup_close">
    <p class="close_p1">
      {{
        endType == 2 ? '您的训练时间过短,是否退出当前训练' : '是否退出当前训练'
      }}
    </p>
    <section class="btn_list">
      <div class="close_btn1" @touchstart="popupbtn(0), click_effects()">
        结束训练
      </div>
      <div class="close_btn2" @touchstart="popupbtn(1), click_effects()">
        再练一会
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    endType: {
      type: [Number, String],
    },
    timevalue: String,
  },
  watch: {},
  data() {
    return {
      popuo_audio: null,
    }
  },
  computed: {
    ...mapGetters(['publicPath', 'projecttype']),
  },
  created() {},
  mounted() {
    if (this.endType == 1) {
      this.popuo_audio = new Audio()
      this.popuo_audio.src = `${this.publicPath}powerStatic/audio/课程结束/e02.mp3`
      this.popuo_audio.play()
    } else if (this.endType == 2) {
      this.popuo_audio = new Audio()
      this.popuo_audio.src = `${this.publicPath}powerStatic/audio/课程结束/e01.mp3`
      this.popuo_audio.play()
    }
  },
  //离开页面
  unmounted() {},
  destroyed: function () {
    if (this.popuo_audio) {
      this.popuo_audio.pause()
      this.popuo_audio = null
    }
  },
  methods: {
    ...mapActions(['click_effects']),
    //弹框事件
    popupbtn(type) {
      if (type == 0) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else {
        this.$emit('closepopup')
      }
    },
  },
}
</script>
