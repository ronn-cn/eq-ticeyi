<style scoped lang="scss">
@import "~assets/css/end_page.scss";
</style>

<template>
  <div class="end_page">
    <section class="end_page_right"
             v-if="!recommstate">
      <div class="rignt_head">
        <div class="rignt_head_badge">
          <div class="login_activer">
            <img :src="userInfo.user_avatar"
                 v-if="loginState"
                 class="user_img" />
            <span v-if="loginState"
                  class="user_text1">{{ userInfo.user_name }},</span>
            <span v-else
                  class="user_text2">未登录</span>
          </div>
          <span class="plan_text">{{
            reneging == 0 ? '恭喜你完成本次训练!' : '你已结束本次训练'
          }}</span>
        </div>
        <div class="right_user_evaluate">
          <div>
            <p class="ep1">{{ powerEndData.combinedscore >= 100 ? 100:powerEndData.combinedscore|| 21 }}</p>
            <p class="ep2">课程评分</p>
          </div>
          <div class="evaluate_item">
            <p class="ep1">{{ evaluateText }}</p>
            <p class="ep2">课程评分</p>
          </div>
        </div>
      </div>

      <div class="right_type">
        <ul>
          <li v-for="item of typeList"
              :key="item.title">
            <div class="type_icon">
              <img :src="`${publicPath}common/images/end/${item.url}.svg`" />
            </div>
            <div class="right_type_title">{{ item.title }}</div>
            <div class="right_type_value">{{ item.value }}</div>
          </li>
        </ul>
      </div>
      <div class="echart_cover">
        <section class="echart_item">
          <h3>训练完成度</h3>
          <echarts class="echart_size"></echarts>
        </section>
        <section class="echart_item">
          <!-- <h3>训练完成度</h3> -->
          <!-- <echarts class="echart_size"></echarts> -->
        </section>
      </div>

      <div class="right_foot">
        <div class="btn_btn1"
             @click="footbtn(1), click_effects()">
          <span>返回首页({{ timenum }}s)</span>
        </div>
        <div class="btn_btn"
             @click="footbtn(0), click_effects()">推荐课程</div>
      </div>

      <van-overlay :show="showQR"
                   @click="showQR = false">
        <div class="wrapper">
          <div class="block">
            <QRCode ref="qrcode1"
                    v-if="qrstate"
                    class="vx_qr"
                    :qrwidth="220"
                    :qrheight="220"
                    codeid="3"
                    :codeTest="Qrcode"></QRCode>
            <p style="padding-top: 0.15rem">微信扫码查看推荐课程</p>
          </div>
        </div>
      </van-overlay>
    </section>
    <section class="end_page_right"
             v-if="recommstate">
      <recomm-courses :courseList="courseList" />
    </section>
  </div>
</template>

<script>
import { Overlay } from 'vant'
import Echarts from '@/components/Echarts.vue'
import EchartsLine from '@/components/power/echartsLine.vue'
import { mapGetters, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
import RecommCourses from '@/components/RecommCourses.vue'
import RecommUser from '@/components/RecommUser.vue'
export default {
  components: {
    Echarts,
    EchartsLine,
    RecommCourses,
    RecommUser,
    QRCode,
    VanOverlay: Overlay,
  },
  data () {
    return {
      typeList: [
        {
          title: '运动时间',
          url: 'endpage_icon1',
          value: '00:00',
        },
        {
          title: '总负重',
          url: 'endpage_icon2',
          value: '1',
        },
        {
          title: '平均负重',
          url: 'endpage_icon3',
          value: '1',
        },
        {
          title: '训练量',
          url: 'endpage_icon4',
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
      evaluateText: 'B',
      audio_a: null,
      showQR: false,
    }
  },
  created () {
    if (this.$route.query.reneging) {
      this.reneging = this.$route.query.reneging
    }
    if (this.$route.query.timevalue) {
      this.typeList[0].value = this.$route.query.timevalue
    }
    //this.combinedscore = this.powerEndData.combinedscore //综合评分
    this.typeList[1].value = this.powerEndData.totalweight //总负重
    this.typeList[2].value = this.powerEndData.averagescore //平均负重
    this.typeList[3].value = this.powerEndData.amount //平均负重
  },
  mounted () {
    if (!this.loginState) {
      this.init_qrcode()
    }
    this.set_scoreimg()

    if (process.env.NODE_ENV !== 'development') {
      this.setdowntimer()
    }
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
      'userInfo',
      'lesson_id',
      'publicPath',
      'powerEndData',
    ]),
  },
  watch: {
    loginState: {
      handler (val, oldval) {
        if (!val) {
          this.init_qrcode()
        } else {
          this.recommstate = true
        }
      },
      recommstate (val) {
        clearInterval(this.downtimer)
      },
      // immediate: true,
    },
  },
  methods: {
    ...mapActions(['logout', 'svseEndData', 'click_effects']),
    async init_qrcode (text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    //评分图片
    set_scoreimg () {
      const value = this.powerEndData.combinedscore
      if (value > 80) {
        this.endAudio('e06', 'A')
      } else if (value < 80 && value > 60) {
        this.endAudio('e05', 'B')
      } else if (value < 60 && value > 40) {
        this.endAudio('e04', 'C')
      } else if (value < 40 && value > 20) {
        this.endAudio('e03', 'D')
      } else if (value < 20 && value >= 0) {
        this.endAudio('e03', 'E')
      } else {
        this.endAudio('e03', 'D')
        // this.scoreimg = `${this.publicPath}common/images/end_imgD.png`
      }
    },
    endAudio (num, evaluate) {
      this.evaluateText = evaluate
      this.audio_a = new Audio()
      this.audio_a.src = `${this.publicPath}powerStatic/audio/课程结束/${num}.mp3`
      this.audio_a.play()
    },
    setdowntimer () {
      if (this.downtimer) {
        clearInterval(this.downtimer)
        this.timenum = 60
      }

      // if (process.env.NODE_ENV !== 'development') {
      this.downtimer = setInterval(() => {
        let num = (this.timenum -= 1)
        if (num !== 0) {
          this.timenum = num
        } else {
          clearInterval(this.downtimer)
          this.$router.push('/')
        }
      }, 1000)
      //}
    },
    //推荐结束
    async footbtn (index) {
      if (index == 0) {
        if (this.loginState) {
          this.recommstate = true
          clearInterval(this.downtimer)
        } else {
          this.showQR = true
        }
      } else {
        clearInterval(this.downtimer)
        this.$router.push('/')
      }
    },
  },
}
</script>
