<style scoped lang="scss">
@import '~assets/css/trainpage.scss';
</style>

<template>
  <div class="page">
    <div>
      <header class="page_header">
        <h1>{{ planText[this.planstate] }}</h1>
      </header>
      <section class="page_action">
        <div class="page_action_item">
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
            @touchstart="StartTrain"
          >
            结束测试
          </div>
        </div>
      </section>

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

      <div class="fixed_left">
        <div class="progress_rotate_left">
          <k-progress
            :percent="moloopval"
            :show-text="false"
            :line-height="30"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_left">
          <p class="text_p1">目标重量</p>
          <p class="text_p2">{{ plannum.weight }}KG</p>
        </div>
      </div>

      <div class="fixed_right">
        <div class="progress_rotate_right">
          <k-progress
            :percent="completePercent"
            :show-text="false"
            :line-height="30"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_right">
          <p class="text_p1">完成重量</p>
          <p class="text_p2">{{ traininfo.Weight || 0 }}KG</p>
        </div>
      </div>
    </div>
    <div @click="btn_click(0)">
      <div class="end_btn"></div>
      <div class="den_icon"></div>
    </div>
    <aduio-popup
      v-if="showPopup"
      :endType="endType"
      :timevalue="timevalue"
      @closepopup="closepopup"
    ></aduio-popup>
    <cue-tone
      v-if="planstate !== 1"
      :planstate="planstate"
      :currentNum="plannum.currentNum"
      :recordScore="recordScore"
    ></cue-tone>
  </div>
</template>

<script>
import AduioPopup from '@/components/power/AduioPopup.vue'
import CueTone from '@/components/power/CueTone.vue'
import { mapGetters, mapMutations } from 'vuex'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
export default {
  components: {
    CueTone,
    RestPage,
    RadialProgressBar,
    KProgress,
    AduioPopup,
  },
  mixins: [train, Trainaudio],
  data() {
    return {
      traininfo: {},
      reststate: true, //休息状态
      totalSteps: 30, //休息时长
      restweight: 6, //休息重量
      // restinfo: {
      //   group: 1,
      //   weight: 12,
      //   num: 20,
      // },
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
    }
  },
  computed: {
    ...mapGetters([
      'actionValue',
      'coursegroup',
      'lesson_id',
      'publicPath',
      'moloopval',
      'powerEndData',
    ]),
  },
  watch: {
    actionValue(val, oldval) {
      this.$store.commit('set_moheight', val.height) //设置模型下压
      if (val.height > 5) {
        // console.log(val.height)
        this.completePercent = 20 + val.height
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
            this.warmup(e)
            return
          case 1:
            this.limit(e)
            return
          default:
            this.otherPlan(e)
        }
        //结束
      })
    },
    //监听课程
    coursegroup(val, oldval) {
      console.log('课程组', val, val['负重组'].length)
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
        this.playAudio()
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

        this.plannum['group_totalNum'] = data[0]['groups']
        this.plannum['group_currentNum'] = 0
        this.plannum.totalNum = data[0]['times']
        this.plannum.currentNum = 0
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
  created() {},
  mounted() {
    this.loadTrain()
    // console.log(powerInfo.frames)
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
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
        setTimeout(() => {
          this.planstate = 1
          this.reststate = true
          this.plannum.weight =
            e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
          // this.plannum.currentNum = 0
        }, 1000)
      }
    },
    //极限组
    limit(e) {
      this.playAudio()
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
              if (JSON.stringify(this.auxiliarygroup) == '{}') {
                this.$router.push('/endpage')
              }
            } else if (this.planstate == 4) {
              this.$router.push('/endpage')
            } else {
              this.planstate += 1
              this.startrest()
            }
          }
        }
      }
    },
    //开始课程
    StartTrain() {
      const rmkg = this.traininfo.Weight

      this.$store.commit('set_weight_rm', rmkg) //设置rm极限值
      var sendData = {
        cmd: 'askGenerateLesson',
        data: {
          'rm-kg': rmkg || 24,
          'limit-type': '通用',
          sex: 1,
          weight: 50,
        },
      }
      this.SEND_SOCKET(JSON.stringify(sendData))

      setTimeout(() => {
        this.startrest()
      }, 500)
    },
    //休息开始
    startrest() {
      this.reststate = true
    },
    //底部value值
    footvalue(item) {
      switch (item) {
        case 0:
          return this.timevalue || '00.00'
        case 1:
          return (
            this.plannum.group_currentNum + ' / ' + this.plannum.group_totalNum
          )
        case 2:
          return this.plannum.currentNum + ' / ' + this.plannum.totalNum
        case 3:
          let num = this.traininfo.Percent
          if (num) {
            return Math.round(num * 100)
          }
          return 0
        case 4:
          return this.powerEndData.amount || 0
      }
    },
    //按钮事件
    btn_click(index) {
      this.showPopup = true
      if (this.planstate > 2) {
        this.endType = 1
      } else {
        this.endType = 2
      }
      // this.plannum.currentNum += 1

      // this.$store.commit('set_resHeightWeight', {
      //   extra_weight: true,
      //   height: 13,
      //   weight: 2,
      // })
    },
  },
}
</script>
