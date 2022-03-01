import { mapGetters } from "vuex"
import Format from '@/assets/js/Format'
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
      windowtimer: null,  //时间计时器
      showPopup: false, //弹框
      endType: null,    //弹框音频
      recordScore: {
        data: '',
        score: '',
      },
      audioText: '',
    }
  },
  computed: {
    ...mapGetters(['projecttype', 'lesson_id', 'powerEndData', 'user_rmvalue'])
  },
  watch: {
    audioText (ntext) {
      setTimeout(() => {
        this.audioText = ''
      }, 2500)
    },
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
    //时间计时
    timestart () {
      this.windowtimer = setInterval(() => {
        this.timeMeter += 0.1
        this.timevalue = Format.FormatTime(this.timeMeter.toFixed())
      }, 100)
    },
    //跳过
    skipstop () {
      // console.log(this.user_rmvalue.state)
      if (this.planstate == 0) {
        if (this.user_rmvalue.state) {
          this.StartTrain(this.user_rmvalue.value)
          // if (!this.courseStatus) {
          //   this.StartTrain(this.userRMState.user_rm)
          // } else {
          //   this.wuhu()
          // }          
        } else {
          this.wuhu()
        }
      } else if (this.planstate == 3) {
        if (this.auxiliarygroup.length > 0) {
          this.wuhu()
        } else {
          this.$router.push({
            path: '/endpage',
            query: { reneging: 1, timevalue: this.timevalue },
          })
        }
      } else if (this.planstate == 4) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else {
        this.wuhu()
      }
    },
    wuhu () {
      this.planstate += 1
      this.reststate = false
      this.$nextTick(() => {
        this.reststate = true
      })
    },
    //底部value值
    footvalue (item) {
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