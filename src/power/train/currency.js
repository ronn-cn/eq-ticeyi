import { HandleSeatedAbTrainerData } from '@/assets/js/index'
export default {
  data () {
    return {
      planText: ['极限组 (1RM测试)', '热身组', '负重组', '金字塔组', '辅助组'],
      planText2: ['极限组 (1RM测试)', '热身组', '负重组', '金字塔组', '辅助组'],
      footlist: [
        '训练时间',
        '当前组数/阶段组数',
        '当前次数/组内次数',
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
      upGroup: {},
      completePercent: 0,
      reststate: true, //休息状态
      windowtimer: null,  //时间计时器
      inCompleteNum: 0
    }
  },
  computed: {
    routeName () {
      return this.$route.path
    },
    getLimt () {
      if (this.routeName == 'trainpage' && this.plannum == 0) {
        return true
      }
      return false
    },
    //下压完成重量显示的样式
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
    //显示结束按钮
    endTest () {
      if (this.planstate == 0 && !this.reststate) {
        return true
      }
      return false
    }
  },
  watch: {
    //下压
    actionValue (val, oldval) {
      //判断休息时间过了吗，过了才能继续下压
      if (!this.isShortcut) {
        return
      }

      this.$store.commit('set_moheight', val.height)
      let powernum = (powerInfo.powerHieght * 0.15) >= 10 ? 10 : powerInfo.powerHieght * 0.15
      if (val.height > powernum) {
        let num = (val.height / (this.powerHieght * 0.8)) * 100
        // console.log(num, val.height, this.powerHieght * 0.8)
        this.completePercent = num >= 100 ? 100 : num
        //如果是自由训练，只要下压就显示绿色，别的判断一下重量高低
        if (this.routeName == '/freeplan') {
          this.showborder = true
        } else {
          this.plannum.weight <= val.weight * 6 ? this.showborder = true : this.showborder = false
          //如果不是训练组的时候,每次如果下压没有达到就加一
          if (!this.getLimt) {
            if (!this.showborder) {
              this.inCompleteNum += 1
            }
          }
        }
      } else {
        this.completePercent = 0
        this.showborder = null
      }
      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6
      //下压操作
      HandleSeatedAbTrainerData(val, num, (e) => {
        //力量测试判断是否是第一次下压
        if (this.routeName !== '/freeplan' && !this.firstdown) {
          this.firstdown = true
        }
        //添加每一组信息
        this.$store.commit('add_detail', {
          info: e,
          timeMeter: this.timeMeter,
        })

        //判断每次是否有比这大的
        if (this.loginState) {
          if (e.Weight > this.user_rmvalue.value) {
            this.$store.dispatch('updateRM', e.Weight)
          }
        }
        //设置最大rm值
        if (e.Weight > this.weight_rm) {
          this.$store.commit('set_weight_rm', e.Weight)
        }

        this.traininfo = e
        let amount = (e.Height / 100) * e.Weight * 9.8
        this.traininfo.amount = Math.floor(amount)
        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        let percent = Math.round(e.Percent * 100)
        this.$store.commit('set_echartData', percent) //图标
        this.send_percent(percent)

        if (this.reststate) this.reststate = false


        if (this.routeName == '/freeplan') {
          this.plannum.currentNum += 1
          if (this.plannum.currentNum % 3 == 0) {
            if (!this.audio_free) {
              this.audio_free = new Audio()
            }
            let free =
              this.audioList[Math.floor(Math.random() * this.audioList.length)]
            this.audioText = free.content

            this.audio_free.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${free.number}.mp3`
            this.audio_free.play()
          }
        } else {
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
        }

      })

    },
    //监听课程
    coursegroup (val, oldval) {
      console.log('课程组', val)
      this.weightgroup = val['负重组']
      this.pyramidgroup = val['金字塔组']
      this.auxiliarygroup = val['辅助组']

      this.planstate = val['负重组'].length !== 0 ? 2 : val['金字塔组'].length !== 0 ? 3 : 4
      setTimeout(() => {
        this.reststate = true
      }, 500);
    },
    //监听休息
    reststate: {
      handler: function (e) {
        if (!e) {
          this.timestart()
          this.countState = true
        } else {
          clearInterval(this.windowtimer)
        }
      },
      immediate: true, // 首次加载的时候执行函数
      deep: true, // 深入观察,监听数组值，对象属性值的变化
    },
  },

}