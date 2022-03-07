<style scoped lang="scss">
@import '~assets/css/trainpage.scss';
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
    <div class="page_mo">
      <div class="fixed_left">
        <h1>Al演示参考</h1>
        <div class="progress_rotate_left">
          <k-progress
            :percent="moloopval"
            :show-text="false"
            :line-height="50"
            :border="false"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_left">
          <van-circle
            v-model="currentRate1"
            :rate="100"
            size="130"
            stroke-width="70"
            color="#C4C4C4"
          />
          <p class="text_p1">{{ plannum.weight }}KG</p>
          <p class="text_p2">目标重量</p>
        </div>
      </div>
      <div class="fixed_right">
        <h1>{{ planText[this.planstate] }}</h1>
        <transition name="jojo" appear>
          <div class="audio_text" v-if="audioText">{{ audioText }}</div>
        </transition>
        <div class="progress_rotate_right">
          <k-progress
            :percent="completePercent"
            :show-text="false"
            :line-height="50"
            :border="false"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_right">
          <van-circle
            v-model="currentRate"
            :rate="100"
            size="130"
            stroke-width="70"
            :color="fin_weight"
          />
          <p class="text_p1">{{ traininfo.Weight || 0 }}KG</p>
          <p class="text_p2">完成重量</p>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <footer class="page_footer">
      <ul>
        <li v-for="(item, index) of footlist" :key="item">
          <div
            v-if="index == 1 && planstate !== 1"
            class="stop_skip"
            @click="skipstop"
          ></div>
          <p class="foot_li_p1">{{ footvalue(index) }}</p>
          <p class="foot_li_p2">{{ item }}</p>
        </li>
      </ul>
    </footer>

    <section class="page_action">
      <rest-page
        v-if="reststate"
        ref="restpage"
        @endrest="reststate = false"
        :planstate="planstate"
        :restweight="restweight"
        :restinfo="plannum"
        :totalSteps="totalSteps"
      ></rest-page>
      <div
        class="end_test_btn"
        v-if="planstate == 1 && !reststate"
        @touchstart="StartTrain()"
      >
        结束测试
      </div>
    </section>

    <div @click="btn_click(0)" class="end_btn"></div>

    <aduio-popup
      v-if="showPopup"
      :endType="endType"
      :timevalue="timevalue"
      @closepopup="closepopup"
    ></aduio-popup>
    <cue-tone
      ref="ctone"
      :planstate="planstate"
      :restnum="restnum"
      :currentNum="plannum.currentNum"
      :recordScore="recordScore"
      @setAudioText="setAudioText"
    ></cue-tone>
  </div>
</template>

<script>
import { Dialog, Circle } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import KProgress from 'k-progress'
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
  },
  mixins: [train, Trainaudio],
  data() {
    return {
      fin_weight: '#C4C4C4',
      currentRate1: 0,
      currentRate: 0,
      // userRMState: {},
      traininfo: {},
      reststate: true, //休息状态
      totalSteps: 30, //休息时长
      restweight: 6, //休息重量
      //次数
      plannum: {
        totalNum: 20,
        currentNum: 0,
        group_totalNum: 1,
        group_currentNum: 0,
        pyramid: 0,
        weight: 12,
      },
      weightgroup: [], //负重组
      pyramidgroup: [], //金字塔组
      auxiliarygroup: [], //辅助组
      planstate: 0, //0热身组 1极限组 2负重组 3金字塔组 4.辅助组
      completePercent: 0,
      addPercent: null,
      downPercent: null,
      restnum: 0, //休息话术
      audioText: '',
      courseStatus: false, //是否已开组
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'actionValue',
      'coursegroup',
      'lesson_id',
      'publicPath',
      'moloopval',
      'powerEndData',
      'user_rmvalue',
      'powerHieght',
    ]),
  },
  watch: {
    audioText(ntext) {
      setTimeout(() => {
        this.audioText = ''
      }, 2500)
    },
    actionValue(val, oldval) {
      this.$store.commit('set_moheight', val.height) //设置模型下压

      if (val.height > 5) {
        // console.log(val.height)
        let num = Math.floor(val.height / this.powerHieght) * 100 * 0.8
        this.completePercent = num >= 100 ? 100 : num
      } else {
        this.completePercent = 0
      }
      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6

      HandleSeatedAbTrainerData(val, num, (e) => {
        console.log('回调', e)
        this.$store.commit('add_detail', {
          info: e,
          timeMeter: this.timeMeter,
        })

        this.traininfo = e
        let amount = (e.Height / 100) * e.Weight * 9.8
        this.traininfo.amount = Math.floor(amount)
        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        let percent = Math.round(e.Percent * 100)
        this.$store.commit('set_echartData', percent) //图表

        this.send_percent(percent)

        if (this.reststate) this.reststate = false

        switch (this.planstate) {
          case 0:
            this.warmup(e) //热身
            return
          case 1:
            this.limit(e) //极限
            return
          default:
            this.otherPlan(e) //其他
        }
        //结束
      })
    },
    //监听课程
    coursegroup(val, oldval) {
      console.log('课程组', val, val['负重组'].length)
      this.courseStatus = true //已经开启过组了
      if (val['负重组'].length !== 0) {
        this.weightgroup = val['负重组']
        this.planstate = 2
      }
      if (val['金字塔组'].length !== 0) {
        this.pyramidgroup = val['金字塔组']
      }
      if (val['辅助组'].length !== 0 && val['负重组'].length == 0) {
        this.auxiliarygroup = val['辅助组']
        this.planstate = 4
      }
    },
    //监听步骤
    planstate(val, oldval) {
      this.$store.commit('add_total_group')
      if (this.audio_1) {
        this.audio_1.pause()
      }
      if (val == 1) {
        this.$refs.ctone.playRMAudio()
        this.plannum['group_totalNum'] = 1
        this.plannum['group_currentNum'] = 1
        this.plannum.totalNum = 1
        this.plannum.currentNum = 0
      }
      if (val == 2 || val == 3 || val == 4) {
        let data = []
        if (val == 2) {
          data = this.weightgroup
        } else if (val == 3) {
          data = this.pyramidgroup
        } else if (val == 4) {
          data = this.auxiliarygroup
        }

        // this.plannum['group_currentNum'] = data[0]['groups'] - 1
        // this.plannum.currentNum = data[0]['times'] - 1
        this.plannum.currentNum = 0
        this.plannum['group_currentNum'] = 0
        this.plannum['group_totalNum'] = data[0]['groups']
        this.plannum.totalNum = data[0]['times']

        this.plannum.pyramid = 0
        this.plannum.weight = data[0]['weight']

        this.totalSteps = data[0].rest
      }
    },
    //监听休息
    reststate: {
      handler: function (e) {
        if (!e) {
          this.timestart()
        } else {
          clearInterval(this.windowtimer)
        }
      },
      immediate: true, // 首次加载的时候执行函数
      deep: true, // 深入观察,监听数组值，对象属性值的变化
    },
  },
  created() {
    // if (this.$route.query.state) {
    //   this.userRMState = this.$route.query
    // }
  },
  mounted() {
    this.loadTrain()
    // console.log(this.powerHieght)
    // console.log(powerInfo.frames)
    setTimeout(() => {
      // this.currentRate = 100
      // this.fin_weight = '#9254de'
      setTimeout(() => {
        // this.currentRate = 0
        // this.fin_weight = '#C4C4C4'
      }, 1000)
    }, 1000)
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    //
    setAudioText(text) {
      this.audioText = text
    },
    //设置参数
    set_plannum(setkey) {
      let ketList = setkey || []
      for (let i in ketList) {
        let data = setkey[i].split(',')
        this.plannum[data[0]] = data[1]
      }
    },
    //热身组
    warmup(e) {
      this.plannum['currentNum'] += 1
      if (this.plannum['currentNum'] == this.plannum.totalNum) {
        if (!this.user_rmvalue.state) {
          setTimeout(() => {
            // this.$refs.ctone.playRest(0)
            this.planstate = 1
            this.reststate = true
            this.plannum.weight =
              e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
            // this.plannum.currentNum = 0
          }, 1000)
        } else {
          this.StartTrain(this.user_rmvalue.user_rm)
        }
      }
    },
    //极限组
    limit(e) {
      this.$refs.ctone.playRMAudio()
      setTimeout(() => {
        this.reststate = true
        this.totalSteps = 10 //休息时长
        this.restweight = e.Weight
        if (e.Weight + 6 > this.plannum.weight) {
          this.plannum.weight =
            e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
          console.log(this.plannum.weight)
        }
        this.plannum.currentNum = 0
      }, 1000)
    },
    //其他联系
    otherPlan(e) {
      this.plannum['currentNum'] += 1
      if (this.plannum.currentNum == this.plannum.totalNum) {
        this.plannum.currentNum = 0
        this.plannum['group_currentNum'] += 1
        setTimeout(() => {
          this.startrest()
        }, 1500)
        if (
          this.plannum['group_currentNum'] == this.plannum['group_totalNum']
        ) {
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
            // console.log('进来了吗', i)
            this.plannum.totalNum = data[i]['times']
            this.plannum.currentNum = 0
            this.plannum.group_totalNum = data[i].groups
            this.plannum.group_currentNum = 0
            this.plannum.weight = data[i]['weight']

            this.totalSteps = data[i].rest
          } else {
            // console.log(this.planstate)
            if (this.planstate == 3) {
              if (this.auxiliarygroup.length == 0) {
                this.$router.push({
                  path: '/endpage',
                  query: { timevalue: this.timevalue },
                })
              }
            } else if (this.planstate == 4) {
              this.$router.push({
                path: '/endpage',
                query: { timevalue: this.timevalue },
              })
            } else {
              this.planstate += 1
              this.startrest()
            }
          }
        }
      }
    },
    //开始课程
    StartTrain(value) {
      let rmkg = 0
      if (value) {
        rmkg = value
      } else {
        rmkg = this.traininfo.Weight
        console.log('这是rm', rmkg)
        if (this.loginState && rmkg) {
          this.$store.dispatch('updateRM', rmkg)
        }
      }
      if (rmkg) {
        var sendData = {
          cmd: 'askGenerateLesson',
          data: {
            'rm-kg': rmkg,
            'limit-type': '通用',
            sex: 1,
            weight: 50,
          },
        }
        this.SEND_SOCKET(JSON.stringify(sendData))
        setTimeout(() => {
          this.startrest()
          // this.$refs.ctone.playRest(1)
        }, 500)
      } else {
        Dialog({
          width: '550px',
          message: '您还没有测定RM值，请测试RM或者选择自由训练',
        })
      }
    },
    //休息开始
    startrest() {
      this.reststate = true
    },
  },
}
</script>
