import currency from './currency.js'
import trainMthods from './trainMthods.js'
export default {
  mixins: [currency, trainMthods],
  created () { },
  mounted () {
    this.loadTrain()
  },
  //离开页面
  destroyed: function () {
    //设置课程结束时间
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
    this.$store.commit('set_resGenerateLesson', {}) //清空课程信息

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
                  query: { timevalue: this.timevalue, timeMeter: Math.ceil(this.timeMeter) },
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
      this.upGroup.isok = isok ? false : true
    },
    //记录上一组名称
    grouptitle () {
      switch (this.planstate) {
        case 0:
          return "极限组"
        case 1:
          return "热身组"
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
          if (this.planstate == 0 && this.routeName == "/trainpage") {
            if (this.plannum.currentNum == 0) {
              return "00 / 01"
            } else {
              return "01 / 01"
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
          let currentNum = this.plannum.currentNum < 10 ? '0' + this.plannum.currentNum : this.plannum.currentNum
          let times = this.plannum.times < 10 ? '0' + this.plannum.times : this.plannum.times
          let page1 = currentNum + ' / ' + times
          let page2 = currentNum + ' / --'
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
    btn_click (value) {
      let index = value || null;
      if (this.planstate == 0) {
        index = 3
      } else if (this.planstate < 2 && this.planstate != 0) {
        index = 2
      } else if (this.planstate > 2) {
        index = 1
      }


      const TitleList = [
        { overTitle: '当前重量与课程目标重量不一致，是否暂停课程，调整负重', overConfirmText: '是，去调整', overCancelText: '否，继续训练' },
        { overTitle: '顽强的毅力可以克服任何障碍，你的训练课程已过半，是否退出当前训练', overConfirmText: '坚持到底', overCancelText: '结束训练' },
        { overTitle: '你的训练时间过短，是否退出当前训练', overConfirmText: '再练一会', overCancelText: '结束训练' },
        { overTitle: '正在测试你当前器械的极限重量，不要放弃，期待你超越自己的极限', overConfirmText: '继续训练', overCancelText: '结束训练' },
      ]

      this.overTitle = TitleList[index].overTitle
      this.overConfirmText = TitleList[index].overConfirmText
      this.overCancelText = TitleList[index].overCancelText
      this.overIndex = index

      this.showPopup = true
    },
    setAudioText (text) {
      this.audioText = text
    },

  }
}