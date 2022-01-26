<style scoped lang="scss">
@import '~assets/css/trainpage.scss';
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
  .test_page_btn {
    padding: 0.1rem;
    height: 16%;
    position: absolute;
    bottom: 0;
    // background-color: cyan;
    display: flex;
    .test_btn1 {
      padding: 20px;
      width: 4rem;
      margin-right: 0.2rem;
      border-radius: 5px;
      background-color: #017aff;
      box-sizing: border-box;
      box-shadow: 5px 5px 20px 0px #017aff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
    }
    .test_btn2 {
      padding: 20px;
      width: 8.3rem;
      border-radius: 5px;
      background-color: #1fac4a;
      box-sizing: border-box;
      box-shadow: 5px 5px 20px 0px #10c98f,
        inset 5px 5px 20px 0px rgba(255, 255, 255, 0.35);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
    }
  }
}
</style>

<template>
  <div class="page">
    <div class="test_page" v-if="testShow">
      <div class="test_back" @click="backHome"></div>
      <p class="test_p1">当前器械1RM测定值</p>
      <p class="test_p2">当前器械能举起的最大重量为</p>
      <p class="test_p3">{{ traininfo.Weight || 0 }}KG</p>
      <div class="test_page_btn">
        <div class="test_btn1" @click="testBtn(0)">重新测试</div>
        <div class="test_btn2" @click="testBtn(1)">继续训练</div>
      </div>
    </div>
    <div v-if="!testShow">
      <header class="page_header">
        <h1>{{ planText2[this.planstate] }}</h1>
      </header>
      <section class="page_action">
        <div class="page_action_item">
          <rest-page
            v-if="reststate"
            ref="restpage"
            @endrest="reststate = false"
            :planstate="planstate"
            :restinfo="plannum"
            :totalSteps="totalSteps"
          ></rest-page>
          <div
            class="end_test_btn"
            v-if="planstate == 0 && !reststate"
            @touchstart="testShow = true"
          >
            结束测试
          </div>
        </div>
      </section>
      <footer class="page_footer">
        <ul>
          <li v-for="(item, index) of footlist" :key="item">
            <div
              class="stop_skip"
              v-if="index == 1 && planstate !== 0"
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
    <strength-aduio
      v-if="showPopup"
      :endType="endType"
      @closepopup="closepopup"
    ></strength-aduio>
    <strength-tone
      :planstate="planstate"
      :currentNum="plannum.currentNum"
      :recordScore="recordScore"
    ></strength-tone>
  </div>
</template>

<script>
import StrengthAduio from '@/components/power/StrengthAduio.vue'
import RestPage from './TestRest.vue'
import { mapGetters, mapMutations } from 'vuex'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
import StrengthTone from '../../../components/power/StrengthTone.vue'
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
export default {
  components: {
    RestPage,
    RadialProgressBar,
    KProgress,
    StrengthAduio,
    StrengthTone,
  },
  mixins: [train, Trainaudio],
  data() {
    return {
      traininfo: {},
      reststate: true, //休息状态
      totalSteps: 30, //休息时长
      //restweight: 6, //休息重量
      startstate: false,
      restinfo: {
        group: 1,
        weight: 12,
        num: 1,
      },
      //次数
      plannum: {
        totalNum: 0,
        currentNum: 0,
        group_totalNum: 0,
        group_currentNum: 0,
        pyramid: 0,
        weight: 12,
      },
      //组数
      // groupnum: {
      //   totalNum: 0,
      //   currentNum: 0,
      //   pyramid: 0,
      //   weight: 0,
      // },
      weightgroup: [], //负重组
      pyramidgroup: [], //金字塔组
      auxiliarygroup: [], //辅助组
      planstate: 0, //极限组 1热身组 2负重组 3金字塔组 4.辅助组
      targetPercent: 20,
      completePercent: 80,
      addPercent: null,
      downPercent: null,
      testShow: false,
      userRM: 0,
    }
  },
  computed: {
    ...mapGetters([
      'actionValue',
      'coursegroup',
      'lesson_id',
      'publicPath',
      'loginState',
      'userInfo',
      'user_rmvalue',
      'moloopval',
      'powerEndData',
    ]),
  },
  watch: {
    actionValue(val, oldval) {
      this.$store.commit('set_moheight', val.height)

      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6
      if (val.height > 5) {
        this.completePercent = 20 + val.height
      } else {
        this.completePercent = 0
      }

      HandleSeatedAbTrainerData(val, num, (e) => {
        // console.log('回调', e)
        this.$store.commit('add_detail', {
          info: e,
          timeMeter: this.timeMeter,
        })

        this.traininfo = e
        let amount = (e.Height / 100) * e.Weight * 9.8
        this.traininfo.amount = Math.floor(amount)
        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        let percent = Math.round(e.Percent * 100)
        this.$store.commit('set_echartData', percent) //图标

        this.send_percent(percent)

        if (this.reststate) this.reststate = false

        switch (this.planstate) {
          case 0:
            this.limit(e)
            return
          case 1:
            this.warmup(e)
            return
          default:
            this.otherPlan(e)
        }
        //热身组和其他

        //结束
      })
    },
    //监听课程
    coursegroup(val, oldval) {
      console.log('课程组', val)
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

      if (val == 1) {
        this.plannum['group_totalNum'] = 1
        this.plannum['group_currentNum'] = 0
        this.plannum.totalNum = 20
        this.plannum.currentNum = 0
        this.plannum.weight = 12
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
  created() {
    if (this.$route.query.state) {
      this.userRM = this.$route.query.value
      this.planstate = 1
    }
  },
  mounted() {
    this.loadTrain()
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
    limit(e) {
      setTimeout(() => {
        this.reststate = true
        this.totalSteps = 20 //休息时长
        this.plannum.weight = e.Weight
        // this.plannum.group_currentNum += 1

        if (e.Weight + 6 > this.plannum.weight) {
          this.plannum.weight =
            e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
          console.log(this.plannum.weight)
        }
        // this.restinfo.num = 1
        this.plannum.group_currentNum += 1
      }, 1000)
    },
    warmup(e) {
      this.plannum['currentNum'] += 1
      if (this.plannum.currentNum == this.plannum.totalNum) {
        this.plannum.group_currentNum = 1
        setTimeout(() => {
          // this.planstate = 2
          // this.reststate = true
          this.StartTrain()
        }, 1000)
      }
    },
    otherPlan(e) {
      this.plannum['currentNum'] += 1
      if (this.plannum['currentNum'] == this.plannum['totalNum']) {
        this.plannum['currentNum'] = 0
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
    //最大组次
    groupmax() {
      switch (this.planstate) {
        case 1:
          return {
            mix: this.plannum.group_currentNum,
            max: this.plannum.group_totalNum,
          }
      }
    },

    async backHome() {
      if (this.loginState) {
        this.$store.dispatch('updateRM', this.traininfo.Weight || 0)
      }
      this.$router.push('/')
    },
    //开始课程
    StartTrain() {
      let rmkg = 0
      if (this.userRM !== 0) {
        rmkg = this.user_rmvalue.user_rm
      } else {
        rmkg = this.traininfo.Weight
      }
      this.$store.commit('set_weight_rm', rmkg)
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
    testBtn(index) {
      if (index == 0) {
        this.testShow = false
        this.plannum.group_currentNum = 0
        this.traininfo = {}
        this.reststate = true
      } else if (index == 1) {
        if (this.loginState) {
          this.$store.dispatch('updateRM', this.traininfo.Weight || 0)
        }
        this.testShow = false
        this.planstate = 1
      }
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
    },
    //弹框事件
    popupbtn(type) {
      if (type == 0) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else {
        this.showPopup = false
      }
    },
    //跳过
    skipstop() {
      if (this.planstate == 4) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else {
        if (this.planstate == 1) {
          this.StartTrain()
        } else {
          this.planstate += 1
          this.reststate = false
          this.$nextTick(() => {
            this.reststate = true
          })
        }
      }
    },
  },
}
</script>
