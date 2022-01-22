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
      position: relative;
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
.stop_skip {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0.4rem;
  top: 0.14rem;
  background: url('~assets/images/common/skip.png');
}
.stop_skip::after {
  content: '';
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  left: 0.1rem;
  top: 0;
  background: url('~assets/images/common/skip.png');
}
</style>

<template>
  <div class="page">
    <div>
      <header class="page_header">
        <h1>{{ plantitle() }}</h1>
      </header>
      <section class="page_action">
        <div class="page_action_item">
          <rest-page
            v-if="reststate"
            ref="restpage"
            @endrest="reststate = false"
            :firststate="firststate"
            :planstate="planstate"
            :restweight="restweight"
            :restinfo="restinfo"
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
        <div class="page_action_item">
          <!-- <H2>当前动作</H2> -->
        </div>
      </section>

      <footer class="page_footer">
        <ul>
          <li v-for="(item, index) of footlist" :key="item">
            <div v-if="index == 1" class="stop_skip" @click="skipstop"></div>
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
          <p class="text_p2">{{ restinfo.weight }}KG</p>
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
      @closepopup="closepopup"
    ></aduio-popup>
    <cue-tone
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
import Format from '@/assets/js/Format'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
export default {
  components: {
    CueTone,
    RestPage,
    RadialProgressBar,
    KProgress,
    AduioPopup,
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
        num: 20,
      },
      //次数
      plannum: {
        totalNum: 20,
        currentNum: 0,
      },
      //组数
      groupnum: {
        totalNum: 1,
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
      planstate: 0, //0热身组 1极限组 2负重组 3金字塔组 4.辅助组

      targetPercent: 0,
      completePercent: 80,
      addPercent: null,
      downPercent: null,
      audiosrc: '',
      audio_1: null,
      recordScore: {
        data: '',
        score: '',
      },
      showPopup: false,
      endType: null,
      windowtimer: null, //时间计时器
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
      this.$store.commit('set_moheight', val.height)
      if (val.height > 5) {
        this.completePercent = 20 + val.height
      } else {
        this.completePercent = 0
      }
      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6
      // console.log(this.completepercent)
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

        if (this.reststate) this.reststate = false

        if (this.planstate == 0) {
          this.plannum['currentNum'] += 1
          if (this.plannum['currentNum'] == this.plannum.totalNum) {
            this.firststate = true
            setTimeout(() => {
              this.planstate = 1
              this.reststate = true
              this.restinfo.weight =
                e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
              this.restinfo.num = 1
            }, 1000)
          }
          return
        }

        if (this.planstate == 1) {
          this.firststate = false
          this.plannum.currentNum = '01'
          this.playAudio()
          setTimeout(() => {
            this.reststate = true
            this.totalSteps = 10 //休息时长
            this.restweight = e.Weight
            this.restinfo.group += 1
            if (e.Weight + 6 > this.restinfo.weight) {
              this.restinfo.weight =
                e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6 //比上一组做的重量大才赋值
              console.log(this.restinfo.weight)
            }
            this.restinfo.num = 1
            this.plannum.currentNum = '00'
          }, 1000)
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
      if (val == 1) {
        this.playAudio()
        this.groupnum.totalNum = '01'
        this.groupnum.currentNum = '01'
        this.plannum.totalNum = '01'
        this.plannum.currentNum = '00'
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
  },
  created() {},
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
    //课程开始时间
    this.$store.commit('set_couserTimer', {
      type: 'start',
    })
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
    //音频
    playAudio() {
      if (this.audio_1) {
        this.audio_1.pause()
        this.audio_1 = null
      }
      this.audio_1 = new Audio()
      this.audio_1.src = `${this.publicPath}powerStatic/audio/首页/1RM值测试.mp3`
      this.audio_1.play()
    },
    //跳过
    skipstop() {
      if (this.planstate !== 1) {
        if (this.planstate == 4) {
          this.$router.push({
            path: '/endpage',
            query: { reneging: 1, timevalue: this.timevalue },
          })
        } else {
          this.planstate += 1
          this.reststate = false
          this.$nextTick(() => {
            this.reststate = true
          })
        }
      }
    },
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
          return '热身组'
        case 1:
          return '极限组 (1RM测试)'
        case 2:
          return '负重组'
        case 3:
          return '金字塔组'
        case 4:
          return '辅助组'
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
      this.restinfo['num'] = this.plannum.totalNum
      // this.restinfo['group'] = this.groupnum.currentNum
      if (this.groupnum.currentNum == this.groupnum.totalNum) {
        this.restinfo['group'] = 0
      } else {
        this.restinfo['group'] = this.groupnum.currentNum
      }

      this.restinfo['weight'] = this.groupnum.weight
      // this.groupnum['weight'] = this.traininfo.weight

      this.reststate = true
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
      // this.plannum.currentNum += 1

      // this.$store.commit('set_resHeightWeight', {
      //   extra_weight: true,
      //   height: 13,
      //   weight: 2,
      // })
    },
    closepopup() {
      this.showPopup = false
      this.endType = 0
    },
  },
}
</script>
