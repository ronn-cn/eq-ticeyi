<style scoped lang="scss">
@import "~assets/css/trainpage.scss";
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
      font-size: 32px;
      position: relative;
      top: 80px;
      z-index: 9;
    }
  }
  .fixed_right {
    width: 50%;
    height: 100%;
    background: #303445;
    position: relative;
    .fixed_title {
      position: relative;
      top: 70px;
      z-index: 9;
      .fixed_h1 {
        font-size: 48px;
      }
      .fixed_h11 {
        color: #aaaaaa;
        margin-top: 20px;
      }
    }
  }
}
</style>

<template>
  <div class="page">
    <div class="page_mo">
      <div class="fixed_left">
        <h1>演示参考</h1>
        <div class="progress_rotate_left">
          <k-progress :percent="moloopval"
                      :show-text="false"
                      :line-height="50"
                      :border="false"
                      :color="['#09FBD3', '#FE53BB']"></k-progress>
        </div>
        <div class="progress_test_left">
          <p class="text_p1">{{ plannum.weight }}KG</p>
          <p class="text_p2">目标重量</p>
        </div>
      </div>
      <div class="fixed_right">
        <div class="fixed_title">
          <h1 class="fixed_h1">{{ planText[this.planstate] }}</h1>
          <h1 class="fixed_h11">{{ userInfo.user_name || "" }}</h1>
        </div>
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
                      :color="['#09FBD3', '#FE53BB']"></k-progress>
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
          <div v-if="index == 1 && planstate !== 1"
               class="stop_skip"
               @click="skipstop"></div>
          <p class="foot_li_p1">{{ footvalue(index) }}</p>
          <p class="foot_li_p2">{{ item }}</p>
        </li>
      </ul>
    </footer>
    <!-- 休息 -->
    <section class="page_action">
      <rest-page v-if="reststate"
                 ref="restpage"
                 @endrest="reststate = false"
                 :planstate="planstate"
                 :restinfo="plannum"
                 :upGroup="upGroup"></rest-page>
      <div class="end_test_btn"
           v-if="endTest"
           @touchstart="StartTrain()">
        结束测试&nbsp;{{TestTime}}s
      </div>
    </section>

    <div @click="btn_click(0), click_effects()"
         class="end_btn"></div>

    <aduio-popup v-if="showPopup"
                 :endType="endType"
                 :timevalue="timevalue"
                 @closepopup="closepopup"></aduio-popup>
    <cue-tone ref="ctone"
              :planstate="planstate"
              :restnum="restnum"
              :currentNum="plannum.currentNum"
              :recordScore="recordScore"
              @setAudioText="setAudioText"></cue-tone>
  </div>
</template>

<script>
import { Dialog, Circle } from 'vant'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import RestPage from './RestPage.vue'
import KProgress from 'k-progress'
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
import AduioPopup from '@/components/power/AduioPopup.vue'
import CueTone from '@/components/power/CueTone.vue'
// import power from '@/assets/js/power.json'

export default {
  components: {
    CueTone,
    RestPage,
    KProgress,
    AduioPopup,
    VanCircle: Circle,
  },
  mixins: [train, Trainaudio],
  data () {
    return {
      traininfo: {}, //回调的部分参数
      //次数
      plannum: {
        times: 20, //每组总次数
        currentNum: 0, //当前次数
        groups: 1, //总组数
        groups_currentNum: 0, //当前组数
        pyramid: 0, //
        weight: 12, //没组重量
        rest: 30, //休息时间
      },
      weightgroup: [], //负重组
      pyramidgroup: [], //金字塔组
      auxiliarygroup: [], //辅助组
      planstate: 0, //0热身组 1极限组 2负重组 3金字塔组 4.辅助组
      restnum: 0, //休息话术
      audioText: '',
      downTest: null,
      TestTime: 30
    }
  },
  computed: {
    ...mapGetters([
      //'loginState',
      'publicPath',
      'moloopval',
      //'user_rmvalue',
      'powerHieght', //器械下压最大高度
      'temporary', //选择的啥
    ]),
    endTest () {
      if (this.planstate == 1 && !this.reststate) {
        return true
      }
      return false
    }
  },
  watch: {
    //监听步骤
    planstate (val, oldval) {
      if (this.audio_1) {
        this.audio_1.pause()
      }
      this.$store.commit('add_total_group')
      if (val == 1) {
        this.$refs.ctone.playRMAudio()
        // this.plannum.weight = this.traininfo.Weight || 12
        this.set_plannum(
          ['groups', 'groups_currentNum', 'times', 'currentNum'],
          [1, 0, 1, 0]
        )
      }
      if (val == 2 || val == 3 || val == 4) {
        let data = val == 2 ? this.weightgroup : val == 3 ? this.pyramidgroup : this.auxiliarygroup
        this.plannum = data[0]
        this.set_plannum(
          ['currentNum', 'groups_currentNum', 'pyramid'],
          [0, 0, 0]
        )
        // this.plannum.currentNum = data[0].times - 2  //测试用
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
            this.traininfo.Weight ? this.StartTrain() : this.StartTrain(12)
          }
        }, 1000);
      } else {
        clearInterval(this.downTest)
        this.TestTime = 30
      }
    }
  },
  created () { },
  mounted () {
    this.loadTrain()
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    ...mapActions(['click_effects']),
    //设置参数
    set_plannum (key, value) {
      for (let i in key) {
        this.plannum[key[i]] = value[i]
      }
    },
    //热身组
    warmup (e) {
      this.plannum.currentNum += 1
      if (this.plannum.currentNum == this.plannum.times) {
        this.isInComplete() //判断是否全部完成
        if (!this.user_rmvalue.state) {
          setTimeout(() => {
            this.planstate = 1
            this.reststate = true
            // this.plannum.weight = e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
          }, 1000)
        } else {
          this.StartTrain(this.user_rmvalue.user_rm)
        }
      }
    },
    //极限组
    limit (e) {
      this.$refs.ctone.playRMAudio()
      this.plannum.currentNum += 1
      // this.plannum.groups_currentNum = 0
      // this.plannum.currentNum = 0
      setTimeout(() => {
        this.plannum.currentNum = 0
        if (e.Weight < this.plannum.weight) {
          //如果压的小了，以最大值开启训练
          this.StartTrain(this.plannum.weight)
        } else {
          // let num = this.upGroup.weight
          // this.plannum.weight = num % 6 == 0 ? num + 6 : num - 3 + 6
          this.plannum.weight = e.Weight % 6 == 0 ? e.Weight : e.Weight - 3  //比上一组做的重量大才赋值
          this.plannum.groups_currentNum += 1
          this.recordUpGroup()
          //this.plannum.weight =  e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
          this.reststate = true
          this.plannum.rest = 15 //休息时长
        }
      }, 1000)
    },
    //其他联系
    otherPlan (e) {
      this.plannum['currentNum'] += 1
      if (this.plannum.currentNum == this.plannum.times) {
        this.isInComplete() //判断是否全部完成
        // this.plannum.currentNum = this.plannum.times - 3
        this.plannum.currentNum = 0
        this.plannum.groups_currentNum += 1
        setTimeout(() => {
          this.wuhu()
        }, 1500)
        if (this.plannum.groups_currentNum == this.plannum.groups) {
          var data = []
          data =
            this.planstate == 2
              ? this.weightgroup
              : this.planstate == 3
                ? this.pyramidgroup
                : this.auxiliarygroup
          if (this.plannum.pyramid < data.length - 1) {
            this.plannum.pyramid += 1
            let i = this.plannum.pyramid
            this.plannum = data[i]
            this.plannum.currentNum = 0
            this.plannum.groups_currentNum = 0
          } else {
            // console.log('这里是压到头了', this.planstatez,)
            if (
              (this.planstate == 2 &&
                this.pyramidgroup.length == 0 &&
                this.auxiliarygroup.length == 0) ||
              (this.planstate == 3 && this.auxiliarygroup.length == 0) ||
              this.planstate == 4
            ) {
              this.$router.push({
                path: '/endpage',
                query: { timevalue: this.timevalue },
              })
            } else {
              this.wuhu(1)
            }
          }
        }
      }
    },
    //开始课程
    StartTrain (value) {
      this.recordUpGroup('!ok')

      let rmkg = 0
      if (value) {
        rmkg = value % 6 == 0 ? value : value - 3
      } else {
        rmkg = this.traininfo.Weight % 6 == 0 ? this.traininfo.Weight : this.traininfo.Weight - 3
        // rmkg = 30
        if (this.loginState && rmkg) {
          this.$store.dispatch('updateRM', rmkg)
        }
      }
      if (rmkg != 0) {
        let level = 5
        this.$axios.get(`${this.publicPath}common/js/power.json`).then((res) => {
          // console.log('都打印一下吧', rmkg, this.temporary.text)
          res.data.forEach((item) => {
            if (item['aim'] === this.temporary.text) {
              for (let stage of item.stages) {
                if (stage.level == level && stage.rm == rmkg) {
                  this.$store.commit('set_resGenerateLesson', stage)
                  return
                }
              }
              for (let stage of item.stages) {
                if (stage.rm !== 0 && stage.level == level) {
                  if (stage['负重组'].length || stage['金字塔组'].length || stage['辅助组'].length) {
                    // console.log('给课了吗', stage, 'rrr')
                    this.$store.commit('set_resGenerateLesson', stage)
                    return
                  }
                }
              }
            }
          })
        })
      } else {
        Dialog({
          width: '550px',
          message: '您还没有测定RM值，请测试RM或者选择自由训练',
        })
      }
    },
  },
}
</script>
