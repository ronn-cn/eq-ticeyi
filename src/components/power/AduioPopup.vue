<style scoped lang="scss">
.popup_close {
  position: relative;
  z-index: 999;
  // position: fixed;
  // left: 26vw;
  // top: 25vh;
  // z-index: 999;
  // width: 42vw;
  // height: 26vh;
  // padding: 0.4rem 0.2rem;
  // border-radius: 15px;
  // background-color: #fff;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 890px;
  // height: 390px;
  border-radius: 20px;
  background-color: #fff;
  .close_p1 {
    color: #000;
    font-size: 36px;
    line-height: 54px;
    width: 80%;
    margin: 0.5rem auto;
  }
  .btn_list {
    border-top: 1px solid #555555;
    display: flex;
    // justify-content: space-between;
  }
  .close_btn1 {
    color: #ff3b30;
    display: inline-block;
    width: 343px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #555555;
  }
  .close_btn2 {
    display: inline-block;
    color: #fff;
    background: rgba(40, 205, 65, 0.87);
    width: 547px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div class="popup_close">
    <van-overlay :show="show"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <p class="close_p1">
            {{overTitle}}
          </p>
          <section class="btn_list">
            <div class="close_btn1"
                 @touchstart="popupbtn(0), click_effects()">
              {{overCancelText}}
            </div>
            <div class="close_btn2"
                 @touchstart="popupbtn(1), click_effects()">
              {{overConfirmText}}
            </div>
          </section>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Overlay } from 'vant'
export default {
  props: {
    endType: {
      type: [Number, String],
    },
    overTitle: String,
    overConfirmText: String,
    overCancelText: String,
    overIndex: {
      type: [Number, String],
    },
    timevalue: String,
    timeMeter: Number
  },
  components: {
    VanOverlay: Overlay,
  },
  watch: {},
  data () {
    return {
      popuo_audio: null,
      show: true
    }
  },
  computed: {
    ...mapGetters(['publicPath', 'projecttype']),
  },
  created () { },
  mounted () {
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
  unmounted () { },
  destroyed: function () {
    if (this.popuo_audio) {
      this.popuo_audio.pause()
      this.popuo_audio = null
    }
  },
  methods: {
    ...mapActions(['click_effects']),
    //弹框事件
    popupbtn (type) {
      if (type == 0) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 0, timevalue: this.timevalue, timeMeter: this.timeMeter },
        })
      } else {
        this.$emit('closepopup')
      }
    },
  },
}
</script>
