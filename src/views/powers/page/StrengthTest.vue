<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  // background: rgb(35, 36, 42);
  background-color: #5a4f5f;
}
.page_header {
  .page_header_line {
    width: 100%;
    height: 0.13rem;
    // background: #a3d5f2;
  }
  h1 {
    padding: 0.2rem 0;
    color: #ffffff;
    font-size: 0.38rem;
  }
}
.page_action {
  display: flex;
  &_item {
    width: 3.92rem;
    margin-left: 1.73rem;
    H2 {
      font-size: 24px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
      opacity: 0.5;
    }
    .cover_container {
      width: 100%;
      height: 4.5rem;
    }
  }
}
.page_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1.04rem;
  width: 100%;
  background: #7d89e2;
  color: #ffffff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      width: 20%;
      height: 100%;
      background: #37303a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .foot_li_p1 {
        font-size: 0.34rem;
      }
      .foot_li_p2 {
        font-size: 0.18rem;
        margin-top: 0.16rem;
      }
    }
  }
}
.end_btn {
  border-left: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom: 100px solid #ed4d71;
  border-right: 100px solid transparent;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100px) translateY(-100px) rotate(45deg);
}
.den_icon {
  position: fixed;
  right: 15px;
  top: 25px;
  width: 40px;
  height: 40px;
  background: url('~assets/images/common/home_icon4.png') no-repeat;
  background-size: 100% 100%;
}
::v-deep .el-progress-bar__outer {
  height: 0.13rem !important;
  border-radius: 0 !important;
}
::v-deep .el-progress-bar__inner  {
  border-radius: 0 !important;
}

.popup_close {
  position: fixed;
  left: 26vw;
  top: 25vh;
  z-index: 9;
  width: 42vw;
  height: 26vh;
  padding: 0.4rem 0.2rem;
  border-radius: 15px;
  background-color: #fff;
  .close_p1 {
    color: #000;
    font-size: 42px;
    margin: 0.4rem 0 0.5rem 0;
  }
  .btn_list {
    padding: 0 10%;
    display: flex;
    justify-content: space-between;
  }
  .close_btn1,
  .close_btn2 {
    color: #000;
    display: inline-block;
    margin: 0 10px;
    padding: 20px 0.3rem;
    border-radius: 4px;
    border: 1px solid #000;
  }
  .close_btn2 {
    background-color: #000;
    color: #fff;
    // padding: 20px 10px;
  }
}
.fixed_left,
.fixed_right {
  width: 300px;
  height: 60vh;
  position: fixed;
  right: 0;
  top: 28vh;
  .progress_test_left {
    position: absolute;
    bottom: 12%;
    left: 12%;
  }
  .progress_test_right {
    position: absolute;
    bottom: 12%;
    right: 12%;
  }
  .progress_rotate_left {
    width: 500px;
    transform: rotate(-90deg);
    position: relative;
    top: 200px;
    right: 150px;
  }
  .progress_rotate_right {
    width: 500px;
    transform: rotate(-90deg);
    position: relative;
    top: 200px;
    right: 50px;
  }
  .text_p1 {
    font-size: 0.16rem;
  }
  .text_p2 {
    background-color: #000;
    border-radius: 0.2rem;
    padding: 0.1rem 0.2rem;
    margin-top: 10px;
  }
}
.fixed_left {
  position: fixed;
  left: 0;
  top: 28vh;
}
.end_test_btn {
  width: 2rem;
  height: 0.6rem;
  background-color: #d1194f;
  position: fixed;
  left: 21vw;
  border-radius: 10px;
  display: flex;
  bottom: 15vh;
  z-index: 9;
  justify-content: center;
  align-items: center;
}
::v-deep #progress_left .ant-progress-circle-trail {
  stroke: #cfd7da !important;
  // color: rgb(#cfd7da);
}
::v-deep .ant-progress-circle-trail {
  stroke: #f03985 !important;
  // color: rgb(#cfd7da);
}

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
.test_back {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom: 100px solid rgb(231, 175, 72);
  border-right: 100px solid transparent;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100px) translateY(-100px) rotate(45deg);
}
.test_back::after {
  content: '';
  width: 60px;
  height: 60px;
  background: url(/static/img/home_back.e5c9b85e.png) no-repeat;
  background-size: cover;
  position: absolute;
  left: -26px;
  top: 26px;
  transform: rotate(320deg);
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
        <h1>{{ plantitle() }}</h1>
      </header>
      <section class="page_action">
        <div class="page_action_item">
          <rest-page
            v-if="reststate"
            ref="restpage"
            @endrest="endrest"
            :firststate="firststate"
            :planstate="planstate"
            :restweight="restweight"
            :restinfo="restinfo"
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
        <div class="page_action_item">
          <!-- <H2>当前动作</H2> -->
        </div>
      </section>
      <footer class="page_footer">
        <ul>
          <li v-for="(item, index) of footlist" :key="item">
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
          <p class="text_p2">--KG</p>
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
import Format from '@/assets/js/Format'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
import StrengthTone from '../../../components/power/StrengthTone.vue'
export default {
  components: {
    RestPage,
    RadialProgressBar,
    KProgress,
    StrengthAduio,
    StrengthTone,
  },
  data() {
    return {
      timeMeter: 0,
      timevalue: null, //时间
      timestate: false,
      traininfo: {},
      reststate: true, //休息状态
      totalSteps: 30, //休息时长
      restweight: 6, //休息重量
      firststate: false,
      startstate: false,
      footlist: [
        '训练时间',
        '当前组数/总组数',
        '当前次数/总次数',
        '单次动作评分',
        '训练量',
      ],
      restinfo: {
        group: 1,
        weight: 12,
        num: 1,
      },
      //次数
      plannum: {
        totalNum: 0,
        currentNum: 0,
      },
      //组数
      groupnum: {
        totalNum: 0,
        currentNum: 0,
        pyramid: 0,
        weight: 0,
      },
      weightgroup: {
        groups: 4,
        'groups-max': 8,
        rest: 60,
        times: 8,
        weight: 18,
      }, //负重组
      pyramidgroup: {}, //金字塔组
      auxiliarygroup: {}, //辅助组
      planstate: 0, //极限组 1热身组 2负重组 3金字塔组 4.辅助组
      targetPercent: 20,
      completePercent: 80,
      addPercent: null,
      downPercent: null,
      testShow: false,
      userRM: 0,
      showPopup: false,
      endType: 0,
      recordScore: {
        data: '',
        score: '',
      },
      windowtimer: null, //时间计时器
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

        if (e.Percent > 85) {
          this.recordScore = {
            data: new Date().getTime(),
            score: 'A',
          }
        } else if (e.Percent < 85 && e.Percent > 70) {
          this.recordScore = {
            data: new Date().getTime(),
            score: 'B',
          }
        } else if (e.Percent < 70 && e.Percent > 50) {
          this.recordScore = {
            data: new Date().getTime(),
            score: 'C',
          }
        } else if (e.Percent < 50) {
          this.recordScore = {
            data: new Date().getTime(),
            score: 'D',
          }
        }

        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        if (this.reststate) this.reststate = false

        //极限组
        if (this.planstate == 0) {
          this.firststate = false

          setTimeout(() => {
            this.reststate = true
            this.totalSteps = 20 //休息时长
            this.restweight = e.Weight
            this.restinfo.group += 1
            if (e.Weight + 6 > this.restinfo.weight) {
              this.restinfo.weight =
                e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
              console.log(this.restinfo.weight)
            }
            this.restinfo.num = 1
            this.plannum.currentNum += 1
            // this.plannum.currentNum = '00'
          }, 1000)
          return
        }
        //热身组和其他
        if (this.planstate == 1) {
          this.plannum['currentNum'] += 1
          if (this.plannum['currentNum'] == this.plannum.totalNum) {
            this.firststate = true
            setTimeout(() => {
              this.planstate = 2
              this.reststate = true
              this.StartTrain()
              // this.restinfo.weight =
              //   e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
              // this.restinfo.num = 1
            }, 1000)
          }
        } else {
          this.plannum['currentNum'] += 1
          if (this.plannum['currentNum'] == this.plannum['totalNum']) {
            this.plannum['currentNum'] = 0
            this.groupnum['currentNum'] += 1
            setTimeout(() => {
              this.startrest()
            }, 1500)
            if (this.groupnum['currentNum'] == this.groupnum['totalNum']) {
              var data = []
              if (this.planstate == 2) {
                data = this.weightgroup
              } else if (this.planstate == 3) {
                data = this.pyramidgroup
              } else if (this.planstate == 4) {
                data = this.auxiliarygroup
              }
              if (this.groupnum.pyramid < data.length - 1) {
                this.groupnum.pyramid += 1
                let i = this.groupnum.pyramid
                // console.log('进来了吗', i)
                this.plannum.totalNum = data[i]['times']
                this.plannum.currentNum = 0
                this.groupnum.totalNum = data[i].groups
                this.groupnum.currentNum = 0
                this.groupnum.weight = data[i]['weight']
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
        }
        //结束
      })
    },
    //监听课程
    coursegroup(val, oldval) {
      // console.log('课程组', val, val['负重组'].length)

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
        this.groupnum.totalNum = 0
        this.groupnum.currentNum = 0
        this.plannum.totalNum = 20
        this.plannum.currentNum = 0
        this.restinfo.weight = 12
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
        this.plannum.totalNum = data[0]['times']
        this.plannum.currentNum = 0
        this.groupnum.totalNum = data[0]['groups']
        this.groupnum.currentNum = 0
        this.groupnum.pyramid = 0
        this.groupnum.weight = data[0]['weight']
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
    //暂停开始
    // startstate: {
    //   handler: function (e) {
    //     if (!e) {
    //       this.timestart()
    //     } else {
    //       clearInterval(this.windowtimer)
    //     }
    //   },
    //   immediate: true, // 首次加载的时候执行函数
    //   deep: true, // 深入观察,监听数组值，对象属性值的变化
    // },
  },
  created() {
    if (this.$route.query.state) {
      this.userRM = this.$route.query.value
      this.planstate = 1
    }
  },
  mounted() {
    if (this.lesson_id) {
      this.$store.dispatch('clientstart', {
        lesson_id: this.lesson_id,
        lesson_name: '标准模式',
      })
    } else {
      this.$store.dispatch('clientstart', {
        lesson_id: '445dab66e033da6f0000000000000003',
        lesson_name: '标准模式',
      })
    }
    this.$store.commit('set_couserTimer', {
      type: 'start',
    })
    // this.timestart()
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    //时间计时
    timestart() {
      this.windowtimer = setInterval(() => {
        this.timeMeter += 0.1
        this.timevalue = Format.FormatTime(this.timeMeter.toFixed())
      }, 100)
    },
    //头部文字
    plantitle() {
      switch (this.planstate) {
        case 0:
          return '极限组 (1RM测试)'
        case 1:
          return '热身组'
        case 2:
          return '负重组'
        case 3:
          return '金字塔组'
        case 4:
          return '辅助组'
      }
    },
    //最大组次
    groupmax() {
      switch (this.planstate) {
        case 1:
          return { mix: this.groupnum.currentNum, max: this.groupnum.totalNum }
      }
    },
    //休息结束
    endrest() {
      this.reststate = false
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
      if (this.loginState) {
        this.$store.dispatch('updateRM', this.traininfo.Weight || 0)
      }
      if (index == 0) {
        this.testShow = false
        this.plannum.currentNum = 0
        this.traininfo = {}
        this.reststate = true
        this.restinfo.group = 1
      } else if (index == 1) {
        // console.log(this.userInfo)

        this.testShow = false
        this.planstate = 1
      }
    },
    //休息开始
    startrest() {
      this.restinfo['num'] = this.plannum.totalNum
      if (this.groupnum.currentNum == this.groupnum.totalNum) {
        this.restinfo['group'] = 0
      } else {
        this.restinfo['group'] = this.groupnum.currentNum
      }
      this.restinfo['weight'] = this.groupnum.weight
      this.reststate = true
    },
    downtime() {
      // this.plannum += 1
      this.startstate = !this.startstate
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
        default:
          return 0
      }
    },
    //暂停开始图标切换
    startimg() {
      if (this.startstate) {
        return `${this.publicPath}powerStatic/images/start_img.png`
      } else {
        return `${this.publicPath}powerStatic/images/suspend_img.png`
      }
    },
    //底部value值
    footvalue(item) {
      switch (item) {
        case 0:
          return this.timevalue || '00.00'
        case 1:
          return this.groupnum.currentNum + ' / ' + this.groupnum.totalNum
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
      if (Math.floor(this.timeMeter) > 300) {
        this.endType = 1
      } else {
        this.endType = 2
      }
    },
    closepopup() {
      this.showPopup = false
      this.endType = 0
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
  },
}
</script>
