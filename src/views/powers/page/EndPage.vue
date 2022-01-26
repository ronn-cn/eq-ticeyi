<style scoped lang="scss">
.end_page {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  &_right {
    color: #000;
    width: 100%;
    background: #f2f2f2;
    position: relative;
    .rignt_head {
      display: flex;
      align-items: center;
      padding-left: 5%;
      margin-top: 0.31rem;
      position: relative;
      &_badge {
        width: 75%;
        height: 0.84rem;
        background-position: left;
        background-repeat: repeat-y;
        border-bottom: 1px solid #000;
        display: flex;
        align-items: center;
        .plan_text {
          font-size: 0.22rem;
          letter-spacing: 0.04rem;
        }
      }
      &_grade {
        position: absolute;
        top: -0.5rem;
        right: 2.4rem;
        img {
          width: 1.3rem;
          height: 1.5rem;
        }
      }
    }
    .right_type {
      margin: 0.34rem 0;
      ul {
        width: 80%;
        display: flex;
        // justify-content: space-between;
        padding-left: 5%;
        li {
          position: relative;
          text-align: left;
          padding-bottom: 0.2rem;
          margin-left: 0.3rem;
          margin-right: 0.9rem;
          .type_icon {
            position: absolute;
            top: 0.1rem;
            left: -0.35rem;
            width: 45px;
            height: 45px;
            // background-color: aqua;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right_type_value {
            width: 35%;
            font-size: 0.28rem;
            font-weight: bold;
          }
          .right_type_title {
            font-size: 0.2rem;
            font-weight: 400;
          }
        }
      }
    }
    .right_echart {
      width: 100%;
      margin-top: 0.2rem 0;
      h3 {
        font-size: 0.16rem;
        font-weight: 600;
        text-align: left;
        padding: 0 0 0rem 5%;
        margin-bottom: 0.3rem;
      }
      .echart_size {
        width: 90%;
        height: 2.6rem;
      }
    }
  }
  .right_foot {
    width: 100%;
    height: 0.8rem;
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    display: flex;
    .btn_btn {
      margin-left: 5%;
      margin-right: 2%;
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: rgb(31, 172, 74);
    }
    .btn_btn1,
    .btn_btn2 {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(237, 77, 113);
      position: relative;
      .btn_end1 {
        position: absolute;
        left: 0;
        // animation: backTo 30s linear;
        height: 100%;
        background-color: rgba(214, 199, 199, 0.753);
      }
      .btn_end2 {
        position: absolute;
        left: 0;
        // animation: backTo2 30s linear;
        height: 100%;
        background-color: rgba(167, 167, 167, 0.753);
      }
    }
    .btn_btn2 {
      width: 70%;
      margin-left: 5%;
    }
  }
}
@keyframes backTo {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes backTo2 {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
.login_qr {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  // background-color: bisque;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  p {
    font-size: 0.12rem;
    font-weight: bold;
  }
}
.login_activer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 0.2rem;
  // background-color: bisque;
  .user_text1 {
    margin-left: 15px;
    font-size: 0.18rem;
  }
  .user_text2 {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    font-size: 0.12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .user_img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }
}
</style>

<template>
  <div class="end_page">
    <section class="end_page_right" v-if="!recommstate">
      <div class="rignt_head">
        <div class="rignt_head_badge">
          <div class="login_activer">
            <img
              :src="userInfo.user_avatar"
              v-if="loginState"
              class="user_img"
            />
            <span v-if="loginState" class="user_text1"
              >{{ userInfo.user_name }},</span
            >
            <span v-else class="user_text2">未登录</span>
          </div>
          <span class="plan_text">{{
            reneging == 0 ? '恭喜你完成本次训练!' : '你已结束本次训练'
          }}</span>
        </div>
        <div class="rignt_head_grade">
          <img :src="scoreimg" alt="" />
        </div>
      </div>
      <div class="right_type">
        <ul>
          <li v-for="item of typeList" :key="item.title">
            <div class="type_icon">
              <img :src="`/common/images/end/${item.url}.png`" alt="" />
            </div>
            <div class="right_type_title">{{ item.title }}</div>
            <div class="right_type_value">{{ item.value }}</div>
          </li>
        </ul>
      </div>
      <div class="right_echart">
        <h3>训练完成度</h3>
        <echarts class="echart_size"></echarts>
      </div>
      <!-- <div class="right_echart">
        <h3>训练节奏</h3>
        <EchartsLine class="echart_size" />
      </div> -->
      <div class="right_foot">
        <div class="btn_btn" @click="footbtn(0)" v-if="loginState">
          推荐课程
        </div>
        <div
          :class="[loginState ? 'btn_btn1' : 'btn_btn2']"
          @click="footbtn(1)"
        >
          <!-- <div :class="loginState ? 'btn_end1' : 'btn_end2'"></div> -->
          <span>退出课程({{ timenum }}s)</span>
        </div>
      </div>
      <div class="login_qr" v-if="!loginState">
        <QRCode
          ref="qrcode1"
          v-if="qrstate"
          class="vx_qr"
          :qrwidth="157"
          :qrheight="157"
          codeid="3"
          :codeTest="Qrcode"
        ></QRCode>
        <p style="padding-top: 0.15rem">微信扫码后可同步训练数据</p>
      </div>
    </section>
    <section class="end_page_right" v-if="recommstate">
      <recomm-courses :courseList="courseList" />
    </section>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue'
import EchartsLine from '@/components/power/echartsLine.vue'
import { mapGetters, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
import RecommCourses from '@/components/RecommCourses.vue'
import RecommUser from '@/components/RecommUser.vue'
import api from '@/api/api.js'
export default {
  components: {
    Echarts,
    EchartsLine,
    RecommCourses,
    RecommUser,
    QRCode,
  },
  data() {
    return {
      typeList: [
        {
          title: '综合评分',
          url: 'pingfen',
          value: 19,
        },
        {
          title: '运动时间',
          url: 'shijian',
          value: '00:00',
        },
        {
          title: '总负重',
          url: 'zongfuzhong',
          value: '1',
        },
        {
          title: '平均负重',
          url: 'fuzhong',
          value: '1',
        },
        {
          title: '训练量',
          url: 'xunlianliang',
          value: '1',
        },
      ],
      reneging: 0,
      recommstate: false,
      qrstate: false,
      courseList: [],
      timenum: 60,
      downtimer: null,
      scoreimg: '',
      audio_a: null,
    }
  },
  created() {
    if (this.$route.query.reneging) {
      this.reneging = this.$route.query.reneging
    }
    if (this.$route.query.timevalue) {
      this.typeList[1].value = this.$route.query.timevalue
    }
    this.typeList[0].value = this.powerEndData.combinedscore //综合评分
    this.typeList[2].value = this.powerEndData.totalweight //总负重
    this.typeList[3].value = this.powerEndData.averagescore //平均负重
    this.typeList[4].value = this.powerEndData.amount //平均负重
  },
  mounted() {
    console.log(this.completion)
    if (!this.loginState) {
      this.init_qrcode()
    }
    this.set_scoreimg()
  },
  //离开页面
  destroyed: function () {
    if (this.audio_a) {
      this.audio_a.pause()
    }
    this.svseEndData() //结束提交
    clearInterval(this.downtimer)
    this.$store.commit('set_recommendid', '') //离开设置课程为空
    this.$store.dispatch('clientEnd')
    // this.logout()
    if (this.lesson_id) {
      this.$store.commit('set_lesson_id', '')
    }
    this.$store.commit('clear_powerEndData')
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'ouid',
      'userInfo',
      'lesson_id',
      'publicPath',
      'powerEndData',
      'completion',
    ]),
  },
  watch: {
    loginState: {
      handler(val, oldval) {
        if (!val) {
          this.init_qrcode()
        }
        this.setdowntimer()
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['logout', 'svseEndData']),
    async init_qrcode(text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    //评分图片
    set_scoreimg() {
      const value = this.typeList[0].value
      if (value > 80) {
        this.endAudio('e06')
        this.scoreimg = `${this.publicPath}common/images/end_imgA.png`
      } else if (value < 80 && value > 60) {
        this.endAudio('e05')
        this.scoreimg = `${this.publicPath}common/images/end_imgB.png`
      } else if (value < 60 && value > 40) {
        this.endAudio('e04')
        this.scoreimg = `${this.publicPath}common/images/end_imgC.png`
      } else if (value < 40 && value > 20) {
        this.endAudio('e03')
        this.scoreimg = `${this.publicPath}common/images/end_imgD.png`
      } else if (value < 20 && value >= 0) {
        this.endAudio('e03')
        this.scoreimg = `${this.publicPath}common/images/end_imgE.png`
      } else {
        this.endAudio('e03')
        this.scoreimg = `${this.publicPath}common/images/end_imgD.png`
      }
    },
    endAudio(num) {
      this.audio_a = new Audio()
      this.audio_a.src = `${this.publicPath}powerStatic/audio/课程结束/${num}.mp3`
      this.audio_a.play()
    },
    setdowntimer() {
      if (this.downtimer) {
        clearInterval(this.downtimer)
        this.timenum = 60
      }

      if (process.env.NODE_ENV !== 'development') {
        this.downtimer = setInterval(() => {
          let num = (this.timenum -= 1)
          if (num !== 0) {
            this.timenum = num
          } else {
            clearInterval(this.downtimer)
            this.$router.push('/')
          }
        }, 1000)
      }
    },
    //推荐结束
    async footbtn(index) {
      if (index == 0) {
        this.recommstate = true
        clearInterval(this.downtimer)
      } else {
        clearInterval(this.downtimer)
        this.$router.push('/')
      }
    },
  },
}
</script>
