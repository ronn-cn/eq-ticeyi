import { mapGetters } from "vuex"
import currency from './currency.js'

export default {
  data () {
    return {
      planText: ['热身组', '极限组 (1RM测试)', '负重组', '金字塔组', '辅助组'],
      planText2: ['极限组 (1RM测试)', '热身组', '负重组', '金字塔组', '辅助组'],
      footlist: [
        '训练时间',
        '当前组数/总组数',
        '当前次数/总次数',
        '单次动作评分',
        '训练量',
      ],
      timeMeter: 0,
      timevalue: null, //时间
      showPopup: false, //弹框
      endType: null,    //弹框音频
      recordScore: {
        data: '',
        score: '',
      },
      audioText: '',
      showborder: null,
      upGroup: {}
    }
  },
  mixins: [currency],
  computed: {
    ...mapGetters(['projecttype', 'lesson_id', 'powerEndData']),
    showActiva () {
      if (this.showborder == null) {
        return
      }
      if (this.showborder) {
        return 'complete_activa'
      } else {
        return 'unfinished_activa'
      }
    },
  },
  watch: {
    // audioText (ntext) {
    //   setTimeout(() => {
    //     this.audioText = ''
    //   }, 2500)
    // },
  },
  methods: {
    //开始初始化
    loadTrain () {
      this.$store.dispatch('clientstart', {
        lesson_id: this.lesson_id ? this.lesson_id : '445dab66e033da6f0000000000000003',
        lesson_name: '标准模式',
      })
      //课程开始时间
      this.$store.commit('set_couserTimer', {
        type: 'start',
      })
    },
    //关闭弹框
    closepopup () {
      this.showPopup = false
      this.endType = 0
    },
    //传递评分
    send_percent (percent) {
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
      console.log(this.recordScore, 12)
    },
    //跳过
    skipstop () {
      this.recordUpGroup('!ok')
      if (this.planstate == 0) {
        if (this.user_rmvalue.state) {
          this.StartTrain(this.user_rmvalue.value)
        } else {
          this.wuhu(1)
        }
      } else if (this.planstate == 1) {
        // console.log('啊这')
        this.firstdown = true
        this.recordUpGroup('no', '热身组')
        this.StartTrain()
      } else {
        var data = []
        data = this.planstate == 2 ? this.weightgroup : this.planstate == 3 ? this.pyramidgroup : this.auxiliarygroup

        this.plannum.groups_currentNum += 1
        this.plannum.currentNum = 0

        if (this.plannum.groups_currentNum == this.plannum.groups) {

          if (data.length > 0) {
            if (this.plannum.pyramid < data.length - 1) {
              this.plannum.pyramid += 1
              let i = this.plannum.pyramid
              this.plannum = data[i]
              this.plannum.currentNum = 0
              this.plannum.groups_currentNum = 0
              this.wuhu()
            } else {
              if (this.planstate == 2 && this.pyramidgroup.length == 0 && this.auxiliarygroup.length == 0
                || this.planstate == 3 && this.auxiliarygroup.length == 0
                || this.planstate == 4) {
                this.$router.push({
                  path: '/endpage',
                  query: { timevalue: this.timevalue },
                })
              } else {
                this.wuhu(1)
              }
            }
          }
        } else {
          this.wuhu()
        }
      }
    },
    wuhu (index) {
      if (this.plannum.rest !== 0) {
        this.reststate = false
        this.$nextTick(() => {
          this.reststate = true
        })
      }
      if (index == 1) {
        this.planstate += 1
      }
    },
    //记录上一次
    recordUpGroup (isok, title) {
      this.upGroup = JSON.parse(JSON.stringify(this.plannum))
      this.upGroup.grouptitle = title || this.grouptitle()
      if (isok) {
        this.upGroup.isok = false
        return
      }
      this.upGroup.isok = true
    },
    //记录上一组名称
    grouptitle () {
      switch (this.planstate) {
        case 0:
          return this.routeName !== '/trainpage' ? '极限组' : "热身组"
        case 1:
          return this.routeName !== '/trainpage' ? '极限组' : '极限组'
        case 2:
          return '负重组'
        case 3:
          return '金字塔组'
        case 4:
          return '辅助组'
      }
    },
    //底部value值
    footvalue (item) {
      switch (item) {
        case 0:
          return this.timevalue || '00.00'
        case 1:
          if (this.planstate == 1 && this.routeName == "/trainpage" || this.planstate == 0 && this.routeName == "/strengthtest") {
            if (this.plannum.currentNum == 0) {
              return "0 / 1"
            } else {
              return "1 / 1"
            }
          } else {
            let pege1 = this.plannum.groups_currentNum + ' / ' + this.plannum.groups
            let page2 = "-- / --"
            if (this.plannum.currentNum != 0) {
              pege1 = this.plannum.groups_currentNum + 1 + ' / ' + this.plannum.groups
            }
            return this.routeName == '/freeplan' ? page2 : pege1
          }
        case 2:
          let page1 = this.plannum.currentNum + ' / ' + this.plannum.times
          let page2 = this.plannum.currentNum + ' / --'
          return this.routeName == '/freeplan' ? page2 : page1
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
    btn_click (index) {
      this.showPopup = true
      if (this.planstate > 2) {
        this.endType = 1
      } else {
        this.endType = 2
      }
      // this.plannum.currentNum += 1
      // this.recordScore = {
      //   data: new Date().getTime(),
      //   score: 'B',
      // }
      // this.$store.commit('set_resHeightWeight', {
      //   extra_weight: true,
      //   height: 13,
      //   weight: 2,
      // })
    },
    setAudioText (text) {
      this.audioText = text
    },

  }
}