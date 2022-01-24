<style scoped lang="scss">
@import '~assets/css/trainpage.scss';
</style>

<template>
  <div class="page">
    <div>
      <header class="page_header">
        <h1>{{ planText[this.planstate] }}{{ ttt }}</h1>
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
import Format from '@/assets/js/Format'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
import train from '@/power/train/index.js'
export default {
  components: {
    CueTone,
    RestPage,
    RadialProgressBar,
    KProgress,
    AduioPopup,
  },
  mixins: [train],
  data() {
    return {
      // planText: ['热身组', '极限组 (1RM测试)', '负重组', '金字塔组', '辅助组'],
      timeMeter: 0,
      timevalue: null, //时间
      timestate: false,
      traininfo: {},
      reststate: true, //休息状态
      totalSteps: 30, //休息时长
      restweight: 6, //休息重量
      firststate: false,
      // footlist: [
      //   '训练时间',
      //   '当前组数/总组数',
      //   '当前次数/总次数',
      //   '单次动作评分',
      //   '训练量',
      // ],
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
      pyramidgroup: [], //金字塔组
      auxiliarygroup: {}, //辅助组
      planstate: 0, //0热身组 1极限组 2负重组 3金字塔组 4.辅助组
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
      this.$store.commit('set_moheight', val.height) //设置模型下压
      if (val.height > 5) {
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
            this.warmup()
            break
        }

        return

        // if (this.planstate == 0) {
        //   this.plannum['currentNum'] += 1
        //   if (this.plannum['currentNum'] == this.plannum.totalNum) {
        //     this.firststate = true
        //     setTimeout(() => {
        //       this.planstate = 1
        //       this.reststate = true
        //       this.restinfo.weight =
        //         e.Weight % 6 == 0 ? e.Weight + 6 : e.Weight - 3 + 6
        //       this.restinfo.num = 1
        //     }, 1000)
        //   }
        //   return
        // }

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
      if (this.audio_1) {
        this.audio_1.pause()
      }
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
    loadTrain() {
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
    },
    warmup() {
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
    },
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
    //传递评分
    send_percent(percent) {
      if (percent > 85) {
        this.recordScore = {
          data: new Date().getTime(),
          score: 'A',
        }
      } else if (percent < 85 && percent > 70) {
        this.recordScore = {
          data: new Date().getTime(),
          score: 'B',
        }
      } else if (percent < 70 && percent > 50) {
        this.recordScore = {
          data: new Date().getTime(),
          score: 'C',
        }
      } else if (percent < 50) {
        this.recordScore = {
          data: new Date().getTime(),
          score: 'D',
        }
      }
    },
    //关闭弹框
    closepopup() {
      this.showPopup = false
      this.endType = 0
    },
  },
}
</script>
