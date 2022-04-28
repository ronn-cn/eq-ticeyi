import { mapActions, mapGetters, mapMutations } from 'vuex'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import Format from '@/assets/js/Format'
export default {
  data () {
    return {
      completePercent: 0,
      reststate: true, //休息状态
      windowtimer: null,  //时间计时器
      inCompleteNum: 0
    }
  },
  computed: {
    ...mapGetters(['actionValue', 'coursegroup', 'loginState', 'user_rmvalue', 'userInfo']),
    routeName () {
      return this.$route.path
    },
    getLimt () {
      if (this.routeName == 'trainpage' && this.plannum == 1 || this.routeName == 'strengthtest' && this.plannum == 0) {
        return true
      }
      return false
    }
  },
  watch: {
    //下压
    actionValue (val, oldval) {
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
        if (this.routeName !== '/trainpage' && !this.firstdown) {
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
              // this.routeName == '/trainpage' ? this.warmup(e) : this.limit(e)
              this.warmup(e)
              return
            case 1:
              // this.routeName == '/trainpage' ? this.limit(e) : this.warmup(e)
              this.limit(e)
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
        console.log('sha', e)
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
  //离开页面
  destroyed: function () {
    //设置课程结束时间
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
    this.$store.commit('set_resGenerateLesson', {}) //清空课程信息

  },
  methods: {
    ...mapMutations(['set_couserTimer', 'set_resGenerateLesson']),
    //时间计时
    timestart () {
      this.windowtimer = setInterval(() => {
        this.timeMeter += 0.1
        this.timevalue = Format.FormatTime(this.timeMeter.toFixed())
      }, 100)
    },
    //来个方法看看是否全部完成了
    isInComplete () {
      if (this.inCompleteNum == 0) {
        // console.log('这里是全部完成了')
        this.recordUpGroup()
      } else {
        // console.log('这里是未完成')
        this.recordUpGroup('未完成')
      }
      this.inCompleteNum = 0
    }
  }
}