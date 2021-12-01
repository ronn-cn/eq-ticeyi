<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: rgb(35, 36, 42);
}
.page_header {
  .page_header_line {
    width: 100%;
    height: 0.13rem;
    background: #a3d5f2;
  }
  h1 {
    padding: 0.2rem 0;
    color: #ffffff;
    font-size: 0.38rem;
  }
  // .page_out {
  //   font-size: 28px;
  //   font-family: SourceHanSansCN;
  //   font-weight: 400;
  //   color: #a3d5f2;
  //   width: 162px;
  //   height: 53px;
  //   background: rgba(103, 117, 217, 0.15);
  //   border: 1px solid #89b2e7;
  //   border-radius: 28px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   margin: 22px 37px 0 0;
  // }
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
      // background: chocolate;
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
      background: #252c35;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .foot_li_p1 {
        font-size: 0.34rem;
      }
      .foot_li_p2 {
        font-size: 0.22rem;
        margin-top: 0.16rem;
        color: #a8a8a8;
      }
    }
  }
}
.fixed_right {
  position: fixed;
  right: 0.4rem;
  top: 20%;
  display: flex;
  flex-direction: column;
  .fixed_right_img {
    width: 0.56rem;
    height: 0.56rem;
    margin-bottom: 0.4rem;
    // background: forestgreen;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="page">
    <div v-show="!reststate">
      <header class="page_header">
        <div class="page_header_line"></div>
        <h1>{{ plantitle() }}</h1>
      </header>
      <section class="page_action">
        <div class="page_action_item">
          <H2>Al演示</H2>
          <div class="cover_container">
            <iframe
              :src="`${publicPath}powerStatic/mo1.html`"
              id="mo1"
              style="width: 100%; height: 100%"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <div class="page_action_item">
          <H2>当前动作</H2>
          <div class="cover_container">
            <iframe
              :src="`${publicPath}powerStatic/mo2.html`"
              id="mo2"
              style="width: 100%; height: 100%"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </section>
      <footer class="page_footer">
        <ul>
          <li v-for="item of footlist" :key="item">
            <p class="foot_li_p1">{{ footvalue(item) }}</p>
            <p class="foot_li_p2">{{ item }}</p>
          </li>
        </ul>
      </footer>
      <div class="fixed_right">
        <div class="fixed_right_img" v-for="(item, index) of 3" :key="item">
          <img
            v-if="index !== 1"
            :src="`${publicPath}powerStatic/images/fixed_right_img${index}.png`"
            @click="btn_click(index)"
          />
          <img v-if="index == 1" :src="startimg()" @click="btn_click(index)" />
        </div>
        <div class="fixed_right_img" @click="StartTrain" v-if="planstate == 1">
          开始
        </div>
      </div>
    </div>

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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Format from '@/assets/js/Format'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
export default {
  data() {
    return {
      timeMeter: 0,
      timevalue: null, //时间
      timestate: false,
      traininfo: {},
      reststate: false, //休息状态
      totalSteps: 30, //休息时长
      restweight: 6, //休息重量
      firststate: false,
      startstate: false,
      footlist: ['训练时间', '组数', '次数', '单次动作评分', '当前重量'],
      restinfo: {
        group: 1,
        weight: 6,
        times: 30,
      },
      //次数
      plannum: {
        totalNum: 20,
        currentNum: 0,
      },
      //组数
      groupnum: {
        totalNum: 7,
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
    }
  },
  components: {
    RestPage,
    RadialProgressBar,
  },
  computed: {
    ...mapGetters(['actionValue', 'coursegroup', 'lesson_id', 'publicPath']),
  },
  watch: {
    actionValue(val, oldval) {
      // console.log(JSON.parse(JSON.stringify(val)))
      this.$nextTick(() => {
        var moPage2 = document.getElementById('mo2').contentWindow
        moPage2.ControlAnimationTime(val.height)
      })

      if (val.height !== 0 && val.weight !== 0) {
        // console.log(val)
      }
      if (!this.reststate) {
        HandleSeatedAbTrainerData(val, 12, (e) => {
          console.log('回调', e)
          // console.log('当前秒数', this.timeMeter)
          // let detailinfo = e
          // detailinfo.timeMeter = Math.round(this.timeMeter)
          // console.log(detailinfo)
          this.$store.commit('add_detail', {
            info: e,
            timeMeter: this.timeMeter,
          })

          this.$store.commit('set_totalweight', e)
          this.traininfo = e
          if (this.planstate == 0) {
            this.plannum['currentNum'] += 1
            if (this.plannum['currentNum'] == this.plannum.totalNum) {
              this.firststate = true
              setTimeout(() => {
                this.reststate = true
                this.planstate = 1
              }, 1000)
            }
          } else if (this.planstate == 1) {
            this.firststate = false
            this.groupnum.currentNum = e.Weight / 6
            setTimeout(() => {
              this.reststate = true
              this.totalSteps = 10
              this.restweight = e.Weight
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
                  console.log('进来了吗', i)
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
        })
      }
    },
    // ShowPage() {},
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
    reststate(val, oldval) {
      if (!val) {
        this.timestart()
      } else {
        clearInterval(window.timer)
      }
    },
    startstate: {
      immediate: true, // 首次加载的时候执行函数
      deep: true, // 深入观察,监听数组值，对象属性值的变化
      handler: function (e) {
        if (!e) {
          this.timestart()
        } else {
          clearInterval(window.timer)
        }
      },
    },
  },
  created() {},
  mounted() {
    if (this.lesson_id) {
      this.$store.dispatch('clientstart', this.lesson_id)
    } else {
      this.$store.dispatch('clientstart', '445dab66e033da6f0000000000000003')
    }
    this.$store.commit('set_couserTimer', {
      type: 'start',
      time: Number(Date.parse(new Date()).toString().substr(0, 10)),
    })
  },
  //离开页面
  destroyed: function () {
    console.log(123)
    this.$store.commit('set_couserTimer', {
      type: 'end',
      time: Number(Date.parse(new Date()).toString().substr(0, 10)),
    })
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    //时间计时
    timestart() {
      window.timer = setInterval(() => {
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
    //开始课程
    StartTrain() {
      const rmkg = this.traininfo.Weight

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
    //休息开始
    startrest() {
      this.restinfo['times'] = this.plannum.totalNum
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
        case '训练时间':
          return this.timevalue || '00.00'
        case '组数':
          return this.groupnum.currentNum + ' / ' + this.groupnum.totalNum
        case '次数':
          if (this.planstate == 1) {
            return '0 / 0'
          }
          return this.plannum.currentNum + ' / ' + this.plannum.totalNum
        case '单次动作评分':
          let num = this.traininfo.Percent
          if (num) {
            // console.log(num.toFixed(2) * 100)
            return Math.round(num * 100)
          }
          return 0
        // return num.toFixed(2) * 100
        case '当前重量':
          return this.traininfo.Weight || 0 + 'KG'
      }
    },
    //按钮事件
    btn_click(index) {
      if (index == 0) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else if (index == 1) {
        this.startstate = !this.startstate
      } else {
        // if (this.planstate > 1) {
        //   this.planstate += 1
        // }
      }
    },
    ShowPage() {
      console.log(123)
    },
  },
}
</script>
