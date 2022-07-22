<style scoped lang="scss">
.introduce_title {
  padding-top: 1rem;
  &_p1 {
    font-size: 0.36rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;

    margin-bottom: 0.36rem;
  }
  &_p2 {
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.32rem;
    text-align: center;
    padding: 0 0.3rem;
  }
}
.careradia {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  color: #fff;
}

//翻新
.make_page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--backc);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.make_page::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 500px;
  height: 100%;
  z-index: 9999;
  background: linear-gradient(
    90deg,
    rgb(var(--afterc)) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.make_page::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  z-index: 9999;
  background: linear-gradient(
    270deg,
    rgb(var(--afterc)) 0%,
    rgba(255, 255, 255, 0) 98.18%
  );
}
.make_conver {
  color: #000;
}
.conver_img {
  padding: 40px 0 80px 0;
}
//已登录
.qrcode_avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  .avatar_img {
    img {
      width: 139px;
      height: 139px;
      border-radius: 50%;
    }
  }
  .p2 {
    color: #000;
    margin-top: 10px;
    font-size: 36px;
    font-weight: 400;
  }
}

//简直了
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 890px;
  border-radius: 20px;
  background-color: #fff;
  .close_p1 {
    color: #000;
    font-size: 32px;
    line-height: 54px;
    width: 85%;
    margin: 0 auto 0.5rem;
  }
  .btn_list {
    border-top: 1px solid #555555;
    display: flex;
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
  <div class="make_page"
       :style="{'--afterc':MakelampColor,'--backc':backcolor}">

    <div class="make_conver"
         v-if="PAGETYPE == 0">
      <h2>当前训练器械（B03-坐姿腹肌训练器）已预约，请选择其他器械进行锻炼</h2>
      <div class="conver_img">
        <img :src="`${publicPath}powerStatic/images/${projecttype}.png`"
             style="width: 350px" />
      </div>
      <p>你可前往智能指导镜查看今日训练计划，更好的打造完美身材哦~</p>
    </div>
    <div v-else>
      <van-overlay :show="true">
        <div class="wrapper"
             @click.stop>
          <div class="block">
            <div class="qrcode_avatar">
              <div class="avatar_img">
                <img :src="userInfo.user_avatar || ''"
                     alt="" />
              </div>
              <p class="p2">{{ userInfo.user_name || '' }}</p>
            </div>
            <p class="close_p1">
              你已预约B03-坐姿腹肌训练器，确认信息并开启训练
            </p>
            <section class="btn_list">
              <div class="close_btn1"
                   @click="logout(),click_effects()">
                退出
              </div>
              <div class="close_btn2"
                   @click="click_effects()">
                立即开课 {{completedSteps}}s
              </div>
            </section>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- <div class="introduce_title">
      <p class="introduce_title_p1">
        {{ MakeCareTitle || '力量器械' }}
      </p>
      <p class="introduce_title_p2">
        {{ MakeCareDesc || '' }}
      </p>
    </div> -->
    <!-- <div class="careradia">
      <RadialProgressBar :diameter="barinfo.diameter"
                         :stopColor="barinfo.stopColor"
                         :startColor="barinfo.startColor"
                         :strokeWidth="barinfo.strokeWidth"
                         :innerStrokeWidth="barinfo.innerStrokeWidth"
                         :completed-steps="completedSteps"
                         :total-steps="totalSteps">
        <p style="font-size: 0.84rem; margin-bottom: 0.05rem">
          {{ completedSteps }}
        </p>
      </RadialProgressBar>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import { Overlay } from 'vant'
export default {
  components: {
    RadialProgressBar,
    VanOverlay: Overlay,
  },
  data () {
    return {
      barinfo: {
        diameter: 280,
        stopColor: '#ffffff',
        startColor: '#ffffff',
        strokeWidth: 15,
        innerStrokeWidth: 15,
      },
      completedSteps: 90,
      totalSteps: 90,
      timer: null,
      makeStyle: {},
      aftercolor: '#ff3b30',
      backcolor: '#000',
      PAGETYPE: 1
    }
  },
  computed: {
    ...mapGetters([
      'MakeCareTitle',
      'MakeCareDesc',
      'MakelampColor',
      'loginState',
      'publicPath',
      "projecttype",
      'userInfo'
    ]),
  },
  created () { },
  mounted () {
    //this.loaddown()
  },
  destroyed: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.set_userMakeState(false)
  },
  methods: {
    ...mapActions(['set_userMakeState', 'logout', 'click_effects']),
    loaddown () {
      this.timer = setInterval(() => {
        if (this.completedSteps == 0) {
          clearInterval(this.timer)
          this.set_userMakeState(false)
          this.$store.commit(
            'set_lesson_id',
            '445dab66e033da6f0000000000000003'
          )
          this.completedSteps = 90
          this.totalSteps = 90
          if (this.loginState) {
            this.$store.dispatch('logout')
          }
        } else {
          this.completedSteps -= 1
          if (this.completedSteps == 40) {
            let audio = new Audio()
            audio.src = `${this.publicPath}powerStatic/audio/首页/03您已预约，请点击开始课程.mp3`
            audio.play()
          }
        }
      }, 1000)
    },
  },
}
</script>
