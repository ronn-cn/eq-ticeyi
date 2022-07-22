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
    .count {
      position: absolute;
      top: 20px;
      left: 20px;
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
        <div class="progress_test_left">
          <p class="text_p1">{{ plannum.weight }}KG</p>
          <p class="text_p2">目标重量</p>
        </div>
        <div class="count"
             v-if="!reststate && countState">
          <TrantCount @set_count="set_count" />
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
          <p class="rotate_p1">EC</p>
          <k-progress :percent="completePercent"
                      :show-text="false"
                      :line-height="50"
                      :border="false"
                      bg-color="#4E505A"
                      :color="['#09FBD3', '#FE53BB']">
          </k-progress>
          <p class="rotate_p2">CC</p>
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
          <div v-if="index == 1 && planstate !== 0"
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
                 :firstdown="firstdown"
                 :upGroup="upGroup">
      </rest-page>
      <div class="end_test_btn"
           v-if="endTest"
           @touchstart="endLiem()">
        结束测试，继续训练
      </div>
    </section>

    <div @click="btn_click(), click_effects()"
         class="end_btn"></div>

    <aduio-popup v-if="showPopup"
                 :overTitle="overTitle"
                 :overConfirmText="overConfirmText"
                 :overCancelText="overCancelText"
                 :overIndex="overIndex"
                 :timevalue="timevalue"
                 :timeMeter="Math.ceil(timeMeter)"
                 @closepopup="closepopup" />

    <cue-tone ref="ctone"
              :planstate="planstate"
              :restnum="restnum"
              :currentNum="plannum.currentNum"
              :recordScore="recordScore"
              @setAudioText="setAudioText">
    </cue-tone>
  </div>
</template>
 
<script>
import { Dialog, Circle } from 'vant'
import RestPage from './RestPage.vue'
import KProgress from 'k-progress'
import TrantCount from "@/components/power/TrantCount.vue"
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
import AduioPopup from '@/components/power/AduioPopup.vue'
import CueTone from '@/components/power/CueTone.vue'

export default {
  components: {
    CueTone,
    RestPage,
    KProgress,
    AduioPopup,
    VanCircle: Circle,
    TrantCount
  },
  mixins: [train, Trainaudio],
  data () {
    return {
      traininfo: {}, //回调的部分参数
      //次数
      plannum: {
        times: 1, //每组总次数
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
      TestTime: 30,
      //弹框相关
      firstdown: false,
      overTitle: '',
      overConfirmText: '',
      overCancelText: '',
      overIndex: null,
      barinfo: {
        diameter: 192,
        stopColor: 'rgb(116,96,196)',
        startColor: 'rgb(116,96,196)',
        innerStrokeColor: 'rgb(39,38,56)',
        strokeWidth: 15,
        innerStrokeWidth: 15,
        strokeLinecap: 'line',
      },
      //计数
      countState: false,
      currentCount: 0,
      groupCount: 0,
      //
      userRM: 0
    }
  },
  computed: {},
  watch: {
    //监听步骤
    planstate (val, oldval) {
      if (this.audio_1) {
        this.audio_1.pause()
      }
      this.$store.commit('add_total_group')
      if (val == 1) {
        this.plannum.groups = 1
        this.plannum.groups_currentNum = 0
        this.plannum.times = 20
        this.plannum.currentNum = 0
        this.plannum.weight = 12
      } else if (val == 2 || val == 3 || val == 4) {
        let data = val == 2 ? this.weightgroup : val == 3 ? this.pyramidgroup : this.auxiliarygroup
        this.plannum = data[0]
        this.set_plannum(
          ['currentNum', 'groups_currentNum', 'pyramid'],
          [0, 0, 0]
        )
        // this.plannum.currentNum = data[0].times - 2  //测试用
      } else {
        this.$router.push({
          path: '/endpage',
          query: { timevalue: this.timevalue, timeMeter: Math.ceil(this.timeMeter) },
        })
      }
    },
  },
  created () {
    if (this.loginState && this.loginState) {
      if (this.user_rmvalue.state) {
        this.planstate = 1
      }
    }
  },
  methods: {
    set_count () {
      if (this.planstate == 0) {

      } else {
        if (this.currentCount == 3) {
          if (this.planstate == 1) {
            this.skipstop()
            this.groupCount = 0
            this.currentCount = 0
          } else {
            this.groupCount += 1
            if (this.groupCount == 2) {
              this.wuhu(1)
            } else {
              this.currentCount = 0 //当前次数清零
              this.skipstop() //跳过下一组
            }
          }
        } else {
          this.currentCount += 1
          this.plannum.currentNum += 1
          this.countState = false
          this.$nextTick(() => {
            this.countState = true
          })
        }
      }
    },
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
        this.plannum.groups_currentNum = 1
        setTimeout(() => {
          this.StartTrain()
        }, 1000)
      }
    },
    //极限组
    limit (e) {
      this.$refs.ctone.playRMAudio()
      this.plannum.currentNum += 1
      setTimeout(() => {
        this.plannum.currentNum = 0
        if (e.Weight < this.plannum.weight) {
          //如果压的小了，以最大值开启训练
          //this.StartTrain(this.plannum.weight)
          this.planstate = 1
        } else {
          this.plannum.weight = e.Weight % 6 == 0 ? e.Weight : e.Weight - 3  //比上一组做的重量大才赋值
          this.plannum.groups_currentNum += 1
          this.recordUpGroup()
          this.reststate = true
          this.plannum.rest = 30 //休息时长
        }
      }, 1000)
    },
    endLiem () {
      if (this.weight_rm) {
        this.planstate = 1;
        this.plannum.rest = 60
        setTimeout(() => {
          this.reststate = true
        }, 500);
      }else{
        console.log('确认一下')
      }
    },
    //其他联系
    otherPlan (e) {
      this.plannum['currentNum'] += 1
      if (this.plannum.currentNum == this.plannum.times) {
        this.isInComplete() //判断是否全部完成
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
                query: { timevalue: this.timevalue, timeMeter: Math.ceil(this.timeMeter) },
              })
            } else {
              this.wuhu(1)
            }
          }
        }
      }
    },
    //开始课程
    StartTrain () {
      this.recordUpGroup('!ok')
      let rmkg = 0

      if (this.user_rmvalue.state && this.loginState) {
        rmkg = this.user_rmvalue.value % 6 == 0 ? this.user_rmvalue.value : this.user_rmvalue.value - 3
      } else {
        rmkg = this.weight_rm % 6 == 0 ? this.weight_rm : this.weight_rm - 3
      }
      console.log('呃呃呃', rmkg)
      if (rmkg) {
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
