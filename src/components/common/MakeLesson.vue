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
.make_conver {
  color: #000;
  height: 100%;
  h2 {
    display: inline-block;
    width: 900px;
    font-size: 36px;
    line-height: 55px;
    margin-top: 100px;
    padding-left: 30px;
    background: url("~assets/images/common/lock.png") no-repeat;
    background-size: 30px 30px;
    background-position-y: 13px;
  }
  p {
    display: inline-block;
    font-size: 24px;
    margin-top: 50px;
    padding-left: 30px;
    background: url("~assets/images/common/remind.png") no-repeat;
    background-size: 21px 24px;
  }
  .countdown{
    color: #FF3A2F;
    font-size: 96px;
    margin-top: 20px;
  }
  .conver_img {
    padding: 40px 0 80px 0;
    position: relative;
    .disable_img{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left:-100px;
      margin-top:-90px;
    }
  }

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
    border-radius: 0 0 20px 0;
  }
}
.breathing_lamp_left{
  width: 20%;
  height: 100%;
  position: absolute;
  left: 0;
}
.breathing_lamp_right{
  width: 20%;
  height: 100%;
  position: absolute;
  right: 0;
}
</style>

<template>
  <div class="make_page" :style="{'--afterc':MakelampColor,'--backc':backcolor}">
    <div :style="breathing_lamp_left_style" class="breathing_lamp_left"></div>
    <div :style="breathing_lamp_right_style" class="breathing_lamp_right"></div>
    <div class="make_conver" v-if="PAGETYPE == 0">
      <h2>当前设备（{{MakeClientName}}）预约中，（{{userInfo.user_name}}）即将开始训练</h2>
      <div class="countdown">{{completedSteps-90}}</div>
      <div class="conver_img">
        <!-- <img :src="`${publicPath}powerStatic/images/${projecttype}.png`" style="width: 350px" /> -->
        <img class="disable_img" src="~assets/images/common/disable.png" />
        <img :src="`${publicPath}common/images/equipment/${projecttype}.png`" style="height: 480px" />
      </div>
      <p>非预约用户可前往智能指导镜查看今日训练计划，更好的打造完美身材哦~</p>
    </div>
    <div v-else>
      <!-- <van-overlay :show="true"> -->
        <div class="wrapper" @click.stop>
          <div class="block">
            <div class="qrcode_avatar">
              <div class="avatar_img">
                <img :src="userInfo.user_avatar || ''" alt="头像" />
              </div>
              <p class="p2">{{ userInfo.user_name || '' }}</p>
            </div>
            <p class="close_p1"> 你已预约{{MakeClientName}}，确认信息并开启训练 </p>
            <section class="btn_list">
              <div class="close_btn1" @click="exit(),click_effects()"> 退出 {{completedSteps}}s </div>
              <div class="close_btn2" @click="start(),click_effects()"> 立即开课 </div>
            </section>
          </div>
        </div>
      <!-- </van-overlay> -->
    </div>
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
      completedSteps: 100,
      // totalSteps: 90,
      timer: null,
      makeStyle: {},
      aftercolor: '#ff3b30',
      backcolor: '#fff',
      breathing_lamp_opacity: 1,
      PAGETYPE: 0
    }
  },
  computed: {
    ...mapGetters([
      'MakeCareTitle',
      'MakeCareDesc',
      'MakelampColor',
      'MakeClientName',
      'loginState',
      'publicPath',
      "projecttype",
      'userInfo'
    ]),
    breathing_lamp_left_style(){
      var obj = {
        'background': 'linear-gradient(to right, rgba('+this.MakelampColor+', 1), rgba(255, 255, 255, 0))',
        'opacity': this.breathing_lamp_opacity
      }
      return obj
    },
    breathing_lamp_right_style(){
      var obj = {
        'background': 'linear-gradient(to left, rgba('+this.MakelampColor+', 1), rgba(255, 255, 255, 0))',
        'opacity': this.breathing_lamp_opacity
      }
      return obj
    }
  },
  created () { 
    console.log("预约 created:")
  },
  mounted () {
    this.breathing_lamp_change()
    this.loaddown()
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
          this.exit();
        } else {
          this.completedSteps -= 1
          if (this.completedSteps == 90) {
            let audio = new Audio()
            audio.src = `${this.publicPath}powerStatic/audio/首页/03您已预约，请点击开始课程.mp3`
            audio.play()
            this.backcolor = '#000'
            this.PAGETYPE = 1
          }
        }
      }, 1000)
    },
    breathing_lamp_change() {
      var sw = false;
      setInterval(() => {
        // console.log("我看看呼吸的数据：",this.breathing_lamp_opacity)
        if(sw){
          this.breathing_lamp_opacity += 0.01
        } else {
          this.breathing_lamp_opacity -= 0.01
        }
        if (this.breathing_lamp_opacity>=1) {
          sw = false
        }
        if (this.breathing_lamp_opacity<=0) {
          sw = true
        }
      }, 10);
    },
    exit() {
      console.log("退出了预约页面")
      clearInterval(this.timer)
      this.set_userMakeState(false)
      if (this.loginState) {
        this.$store.dispatch('logout')
      }
    },
    start() {
      // 这就是开始预约的课程了
      clearInterval(this.timer)
      this.set_userMakeState(false)
      //开始测试接口
      this.$store.dispatch('clientstart', {
        lesson_id: '445dab66e033da6f0000000000000001',
        lesson_name: '体测仪',
      })
      this.$router.push('/datadetection')
    }
  },
}
</script>
