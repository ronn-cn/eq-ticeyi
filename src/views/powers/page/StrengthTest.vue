<style scoped lang="scss">
@import "~assets/css/trainpage.scss";
.test_page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #797979;
  z-index: 999;
  .test_p1 {
    font-size: 0.36rem;
    margin-top: 1.3rem;
  }
  .test_p2 {
    font-size: 0.28rem;
    margin: 0.8rem 0;
  }
  .test_p3 {
    font-size: 0.7rem;
  }
  .test_p4 {
    margin-top: 250px;
    font-size: 72px;
  }
  .test_page_btn {
    padding: 0.1rem;
    position: absolute;
    bottom: 0;
    display: flex;
    .test_btn1 {
      width: 455px;
      height: 131px;
      background: #007aff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        inset 15px 15px 10px rgba(255, 255, 255, 0.09);
      border-radius: 20px;

      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
    }
    .test_btn2 {
      width: 1405px;
      height: 131px;
      background: #28cd41;
      box-shadow: inset 15px 15px 10px rgba(255, 255, 255, 0.09);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
    }
  }
}
.page_mo {
  width: 1920px;
  height: 919px;
  display: flex;
  .fixed_left {
    width: 50%;
    height: 100%;
    background: #161616;
    position: relative;
    h1 {
      color: #aaaaaa;
      position: absolute;
      left: 444px;
      top: 80px;
      z-index: 9;
    }
  }
  .fixed_right {
    width: 50%;
    height: 100%;
    background: #303445;
    position: relative;
    h1 {
      position: absolute;
      left: 444px;
      top: 80px;
      z-index: 9;
    }
  }
}
</style>

<template>
  <div class="page">
    <!-- 重新测试页面 -->
    <section class="test_page"
             v-if="testShow">
      <div class="test_back"
           @click="backHome"></div>
      <p class="test_p1">当前器械1RM测定值</p>
      <div v-if="traininfo.Weight">
        <p class="test_p2">当前器械能举起的最大重量为</p>
        <p class="test_p3">{{ maxRm || 0 }}KG</p>
      </div>
      <div v-else>
        <p class="test_p4">未完成测试,暂无记录</p>
      </div>
      <div class="test_page_btn">
        <div class="test_btn1"
             @click="testBtn(0)">重新测试</div>
        <div class="test_btn2"
             @click="testBtn(1)"
             v-if="traininfo.Weight">继续训练</div>
        <div class="test_btn2"
             @click="testBtn(2)"
             v-else>自由训练</div>
      </div>
    </section>

    <div v-if="!testShow">
      <section class="page_action">
        <rest-page v-if="reststate"
                   ref="restpage"
                   @endrest="reststate = false"
                   :planstate="planstate"
                   :restinfo="plannum"
                   :pagetype="1"
                   :firstdown="firstdown"
                   :upGroup="upGroup"></rest-page>
        <div class="end_test_btn"
             v-if="endTest"
             @touchstart="testShow = true">
          结束测试&nbsp;{{TestTime}}
        </div>
      </section>

      <div class="page_mo">
        <div class="fixed_left">
          <h1>Al演示参考</h1>
          <div class="progress_rotate_left">
            <k-progress :percent="moloopval"
                        :show-text="false"
                        :line-height="50"
                        :border="false"
                        :color="['#f5af19', '#fa0a74']"></k-progress>
          </div>
          <div class="progress_test_left">
            <p class="text_p1">{{ plannum.weight }}KG</p>
            <p class="text_p2">目标重量</p>
          </div>
        </div>
        <div class="fixed_right">
          <h1>{{ planText2[this.planstate] }}</h1>
          <transition name="jojo"
                      appear>
            <div class="audio_text"
                 v-if="audioText">{{ audioText }}</div>
          </transition>
          <div class="progress_rotate_right">
            <k-progress :percent="completePercent"
                        :show-text="false"
                        :line-height="50"
                        :border="false"
                        :color="['#f5af19', '#fa0a74']"></k-progress>
          </div>
          <div class="progress_test_right"
               :class="showActiva">
            <p class="text_p1">{{ traininfo.Weight || 0 }}KG</p>
            <p class="text_p2">完成重量</p>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <footer class="page_footer">
        <ul>
          <li v-for="(item, index) of footlist"
              :key="item">
            <div class="stop_skip"
                 v-if="index == 1 && planstate !== 0"
                 @click="skipstop"></div>
            <p class="foot_li_p1">{{ footvalue(index) }}</p>
            <p class="foot_li_p2">{{ item }}</p>
          </li>
        </ul>
      </footer>
    </div>

    <div @click="btn_click(0), click_effects()"
         class="end_btn"></div>

    <strength-aduio v-if="showPopup"
                    :endType="endType"
                    @closepopup="closepopup"></strength-aduio>

    <CueTone :planstate="planstate"
             :currentNum="plannum.currentNum"
             :pagetype="2"
             :recordScore="recordScore"
             @setAudioText="setAudioText"></CueTone>
  </div>
</template>

<script>
import { Dialog, Circle } from 'vant'
import StrengthAduio from '@/components/power/AduioPopup.vue'
import CueTone from '../../../components/power/CueTone.vue'
import RestPage from './TestRest.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import KProgress from 'k-progress'
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
export default {
  components: {
    RestPage,
    KProgress,
    StrengthAduio,
    CueTone,
    VanCircle: Circle,
  },
  mixins: [train, Trainaudio],
  data () {
    return {
      traininfo: {},
      maxRm: 0,
      //totalSteps: 30, //休息时长
      startstate: false,
      //次数
      plannum: {
        times: 1,
        currentNum: 0,
        groups: 1,
        groups_currentNum: 0,
        pyramid: 0,
        weight: 12,
        rest: 30,
      },
      //组数
      weightgroup: [], //负重组
      pyramidgroup: [], //金字塔组
      auxiliarygroup: [], //辅助组
      planstate: 0, //极限组 1热身组 2负重组 3金字塔组 4.辅助组
      testShow: false,
      userRM: 0,
      firstdown: false,
      downTest: null,
      TestTime: 30
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'publicPath',
      'userInfo',
      'user_rmvalue',
      'moloopval',
      'powerHieght',
      'temporary'
    ]),
    endTest () {
      if (this.planstate == 0 && !this.reststate) {
        return true
      }
      return false
    }
  },
  watch: {
    //监听步骤
    planstate (val, oldval) {
      this.$store.commit('add_total_group')

      if (val == 1) {
        this.plannum.groups = 1
        this.plannum.groups_currentNum = 0
        this.plannum.times = 20
        this.plannum.currentNum = 0
        this.plannum.weight = 12
      }
      if (val == 2 || val == 3 || val == 4) {
        let data = val == 2 ? this.weightgroup : val == 3 ? this.pyramidgroup : this.auxiliarygroup
        this.plannum = data[0]
        this.plannum.currentNum = 0
        this.plannum.groups_currentNum = 0
        this.plannum.pyramid = 0
      }
    },
    //监听
    endTest (val) {
      if (val) {
        this.downTest = setInterval(() => {
          this.TestTime -= 1
          if (this.TestTime == 0) {
            clearInterval(this.downTest)
            this.TestTime = 30
            this.maxRm == 0 ? this.testShow = true : this.StartTrain()
            // this.traininfo.Weight ? this.StartTrain() : this.StartTrain()
          }
        }, 1000);
      } else {
        clearInterval(this.downTest)
        this.TestTime = 30
      }
    }
  },
  created () {
    if (this.$route.query.state) {
      this.userRM = this.$route.query.value
      this.planstate = 1
    }
  },
  mounted () {
    this.loadTrain() //初始化开始课程
    console.log('很奇怪啊', this.temporary)
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    ...mapActions(['click_effects']),
    //返回首页
    async backHome () {
      if (this.loginState) {
        this.$store.dispatch('updateRM', this.traininfo.Weight || 0)
      }
      this.$router.push('/')
    },
    //极限
    warmup (e) {
      this.recordUpGroup('no')
      this.plannum.currentNum = 1
      setTimeout(() => {
        if (e.Weight < this.plannum.weight) {
          this.testShow = true
        } else {
          // let num = this.upGroup.weight
          // this.plannum.weight = num % 6 == 0 ? num + 6 : num - 3 + 6
          this.plannum.weight = e.Weight % 6 == 0 ? e.Weight : e.Weight - 3  //比上一组做的重量大才赋值
          this.plannum.groups_currentNum += 1
          this.maxRm = e.Weight
          this.recordUpGroup()
          //this.plannum.weight = e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
          this.reststate = true
          this.plannum.rest = 15 //休息时长

        }
        this.plannum.currentNum = 0
      }, 1000)
    },
    //热身
    limit (e) {
      this.plannum['currentNum'] += 1
      if (this.plannum.currentNum == this.plannum.times) {
        this.plannum.groups_currentNum = 1
        setTimeout(() => {
          this.StartTrain()
        }, 1000)
      }
    },
    //其他
    otherPlan (e) {
      this.plannum['currentNum'] += 1
      if (this.plannum['currentNum'] == this.plannum.times) {
        this.plannum['currentNum'] = 0
        this.plannum['groups_currentNum'] += 1
        setTimeout(() => {
          this.wuhu()
        }, 1500)
        if (this.plannum['groups_currentNum'] == this.plannum['groups']) {
          var data = []
          if (this.planstate == 2) {
            data = this.weightgroup
          } else if (this.planstate == 3) {
            data = this.pyramidgroup
          } else if (this.planstate == 4) {
            data = this.auxiliarygroup
          }
          if (this.plannum.pyramid < data.length - 1) {
            this.plannum.pyramid += 1
            let i = this.plannum.pyramid
            this.plannum = data[i]
            this.plannum.currentNum = 0
            this.plannum.groups_currentNum = 0
          } else {
            // console.log(this.planstate)
            if (this.planstate == 3) {
              if (this.auxiliarygroup.length == 0) {
                this.$router.push('/endpage')
              }
            } else if (this.planstate == 4) {
              this.$router.push('/endpage')
            } else {
              this.planstate += 1
              this.wuhu()
            }
          }
        }
      }
    },
    //开始课程
    StartTrain () {
      let rmkg = 0
      if (this.userRM !== 0) {
        rmkg = this.user_rmvalue.user_rm
      } else {
        rmkg = this.maxRm
        // rmkg = 30
      }
      this.$store.commit('set_weight_rm', rmkg)

      if (rmkg) {
        let level = 5
        this.$axios.get(`${this.publicPath}common/js/power.json`).then((res) => {
          console.log('别问，进来了', this.temporary.text)
          res.data.forEach((item) => {
            if (item['aim'] === this.temporary.text) {
              for (let stage of item.stages) {
                if (stage.level == level && stage.rm == rmkg) {
                  this.$store.commit('set_resGenerateLesson', stage)
                  return
                }
              }
              //如果没有对应的课程则找一节有最低rm值的课程
              for (let stage of item.stages) {
                if (stage.rm !== 0) {
                  this.$store.commit('set_resGenerateLesson', stage)
                  return
                }
              }
            }
          })
        })

      }
    },
    testBtn (index) {
      if (index == 0) {
        this.plannum.groups_currentNum = 0
        this.plannum.weight = 12
        this.traininfo = {}
        this.reststate = true
        this.firstdown = false
        this.testShow = false
      } else if (index == 1) {
        if (this.loginState) {
          this.$store.dispatch('updateRM', this.traininfo.Weight || 0)
        }
        this.testShow = false
        this.planstate = 1
        this.reststate = true
        this.recordUpGroup('no')
      } else if (index == 2) {
        this.$router.push('/freeplan')
      }
    },

  },
}
</script>
