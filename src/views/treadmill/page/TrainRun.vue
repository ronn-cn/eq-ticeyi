<style scoped lang="scss">
.train_run {
  width: 100%;
  height: 100%;
  position: relative;
  // background-color: aquamarine;
  background-color: #25293c;
  header {
    position: relative;
    h2 {
      padding-top: 0.8rem;
      font-size: 0.36rem;
    }
    .header_timer {
      font-size: 0.2rem;
      position: absolute;
      right: 0.17rem;
      top: 0.18rem;
    }
  }
  &_content {
    width: 100%;
    height: 5rem;
    margin-top: 0.56rem;
    position: relative;
    // background-color: bisque;
    .content_Speedometer1 {
      position: absolute;
      top: 0;
      left: 0;
      width: 1.55rem;
      height: 4rem;
      .dotback1 {
        width: 100%;
        height: 100%;
      }
      .dotback_border {
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        position: absolute;
        top: 44%;
        height: 0.45rem;
        width: 1rem;
        line-height: 0.45rem;
      }
      .dotback_border::after {
        position: absolute;
        content: '';
        right: 24px;
        top: 20px;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 12px solid transparent;
        border-right: 16px solid #fff;
      }
    }
    .content_info {
      width: 70%;
      margin: auto;
      // background-color: blue;
      &_top {
        display: flex;
        justify-content: space-between;
        .progress {
          width: 1.73rem;
          height: 1.73rem;
          // background-color: brown;
        }
        .info_timer {
          .p1 {
            margin-top: 0.18rem;
          }
          .p2 {
            font-size: 0.68rem;
            padding-top: 0.4rem;
          }
        }
      }
      &_bottom {
        margin-top: 0.4rem;
        p {
          margin-bottom: 0.3rem;
        }
      }
    }
    .content_Speedometer2 {
      width: 1.55rem;
      height: 4rem;
      position: absolute;
      top: 0;
      right: 0;

      .dotback2 {
        width: 100%;
        height: 100%;
      }
      .dotback_border {
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        position: absolute;
        top: 44%;
        right: 0;
        height: 0.45rem;
        width: 1rem;
        line-height: 0.45rem;
      }
      .dotback_border::after {
        position: absolute;
        content: '';
        left: 24px;
        top: 20px;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 16px solid #fff;
        border-right: 12px solid transparent;
      }
    }
  }
  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.23rem;
    // background-color: cadetblue;
    ul {
      display: flex;
      justify-content: space-between;
      height: 100%;
      li {
        height: 100%;
        position: relative;
      }
      .li_stop {
        .li_stop_p1 {
          font-size: 0.24rem;
          padding: 0.25rem 0 0.15rem 0;
        }
      }
      .footer_li1,
      .footer_li5 {
        width: 2.98rem;
        // background-color: chartreuse;
      }
      .footer_li3 {
        width: 2.38rem;
        background: url('~assets/images/stop.back.png') no-repeat;
        background-position-y: bottom;
        font-size: 0.44rem;
        background-position-y: -55px;
        background-size: 100% 130%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .footer_li2,
      .footer_li4 {
        width: 2.18rem;
        border: 2px solid #31353c;
        border-top: none;
        border-bottom: none;
        // background-color: rgb(33, 182, 182);
      }
      .circular_value {
        font-size: 0.34rem;
        padding: 0 0.4rem;
      }
      .circular {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.4rem;
        // display: flex;
        // border-radius: 50%;
        border: 1px solid #fff;
      }
    }
    .slope_choice {
      position: fixed;
      bottom: 1.25rem;
      left: 0.8rem;
    }
    .speed_choice {
      position: fixed;
      bottom: 1.25rem;
      right: 0.8rem;
    }
    .slope_choice_item,
    .speed_choice_item {
      font-size: 0.2rem;
      font-weight: 400;
      width: 1.2rem;
      padding: 0.2rem 0.25rem;
      margin-top: 2px;
      background: #494949;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
    }
    .active {
      background-color: #fff;
      color: #000;
    }
  }
}
.startMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.4);
  .startBox {
    color: #000;
    position: absolute;
    top: 26%;
    left: 32%;
    width: 5rem;
    height: 3rem;
    background: #ffffff;
    box-shadow: 0px 14px 21px 0px rgba(0, 4, 31, 0.81);
    border-radius: 6px;
    h2 {
      padding: 0.3rem 0 0.2rem 0;
      font-size: 0.28rem;
    }
    &_btn {
      color: #fff;
      width: 1.8rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #161616;
      border-radius: 6px;
      margin: 0.3rem auto;
    }
    &_p1 {
      font-size: 0.18rem;
    }
  }
  .outplanbox {
    color: #000;
    position: absolute;
    top: 26%;
    left: 30%;
    width: 5.5rem;
    height: 2.5rem;
    background: #ffffff;
    box-shadow: 0px 14px 21px 0px rgba(0, 4, 31, 0.81);
    border-radius: 6px;
    h2 {
      font-size: 0.22rem;
      font-weight: 400;
      padding: 0.7rem 0 0.5rem 0;
    }
    .outplanbo_btn {
      width: 75%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      .btn_item {
        width: 211px;
        height: 69px;
        line-height: 69px;
        background: #ffffff;
        border: 1px solid #161616;
        border-radius: 6px;
      }
      .btn_item:nth-child(2) {
        color: #fff;
        background: #000000;
      }
    }
  }
}
.loginRun {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: lightcoral;
  z-index: 999;
}
</style>

<template>
  <div class="train_run">
    <header>
      <h2>{{ runtitle }}</h2>
      <div class="header_timer">
        <p>{{ new Date().getHours() + ':' + new Date().getMinutes() }}</p>
        <p>{{ new Date().getHours() <= 12 ? 'AM' : 'PM' }}</p>
      </div>
    </header>
    <section class="train_run_content">
      <div
        class="content_Speedometer1"
        :style="{
          background: `url(${publicPath}TreadmillStatic/images/left_hemicycle.png) no-repeat`,
          backgroundSize: 'contain',
        }"
      >
        <div
          class="dotback1"
          :style="{
            background: `url(${publicPath}TreadmillStatic/images/left_dot.png) no-repeat`,
            backgroundPosition: '0.38rem center',
          }"
        >
          <div class="dotback_border">
            {{ treadmillInfo[0].value }}
          </div>
        </div>
      </div>
      <div class="content_info">
        <section class="content_info_top">
          <div class="progress">
            <radial-progress
              :completedSteps="TreadmillData.distance"
              :totalSteps="TreadmillData.distance"
              :bartype="0"
              progressColor="#9fdeff"
            />
          </div>
          <div class="info_timer">
            <p class="p1">????????????</p>
            <p class="p2">{{ runtime }}</p>
          </div>
          <div class="progress">
            <radial-progress
              :completedSteps="TreadmillData.calorie"
              :totalSteps="TreadmillData.calorie"
              :bartype="1"
              progressColor="#c6f280"
            />
          </div>
        </section>
        <section class="content_info_bottom">
          <p>???????????? 1/400m</p>
          <div>
            <img
              :src="`${publicPath}TreadmillStatic/images/pattern_circle.png`"
              alt=""
            />
          </div>
        </section>
      </div>
      <div
        class="content_Speedometer2"
        :style="{
          background: `url(${publicPath}TreadmillStatic/images/right_hemicycle.png) no-repeat`,
          backgroundPositionX: '24px',
          backgroundSize: 'contain',
        }"
      >
        <div
          class="dotback2"
          :style="{
            background: `url(${publicPath}TreadmillStatic/images/right_dot.png) no-repeat`,
            backgroundPosition: '0.38rem center',
          }"
        >
          <div class="dotback_border">
            {{ treadmillInfo[4].value }}
          </div>
        </div>
      </div>
    </section>
    <footer>
      <ul>
        <li
          v-for="(item, index) of treadmillInfo"
          :key="item.title"
          :class="'footer_li' + (index + 1)"
          @click="lichoice(index)"
        >
          <div v-if="index !== 2" class="li_stop">
            <p class="li_stop_p1">{{ item.title }}</p>
            <div>
              <span
                v-if="index == 0 || index == 4"
                class="circular"
                @click.stop="reduceValue(item, index)"
                >-</span
              >
              <span class="circular_value">
                {{ item.value }}
              </span>
              <span
                v-if="index == 0 || index == 4"
                class="circular"
                @click.stop="plusValue(item, index)"
                >+</span
              >
            </div>
          </div>
          <div v-else>
            {{ item.title }}
          </div>
        </li>
      </ul>
      <el-collapse-transition>
        <section class="slope_choice" v-if="slopestate">
          <div
            v-for="(item, index) of slopelist"
            :key="item.value"
            @click="Swichtype(item, index, 0)"
            :class="['slope_choice_item', slopeindex == index ? 'active' : '']"
          >
            <span>{{ item.value }}</span>
            <span>{{ item.title }}</span>
          </div>
        </section>
      </el-collapse-transition>
      <el-collapse-transition>
        <section class="speed_choice" v-if="speedstate">
          <div
            v-for="(item, index) of speedlist"
            @click="Swichtype(item, index, 4)"
            :key="item.value"
            :class="['speed_choice_item', speedindex == index ? 'active' : '']"
          >
            <span>{{ item.value }}</span>
            <span>{{ item.title }}</span>
          </div>
        </section>
      </el-collapse-transition>
    </footer>
    <div class="startMask" v-if="maskstate">
      <div class="startBox" v-if="startBoxState">
        <h2>?????????-???????????????</h2>
        <div><span>L3</span> <span>30??????</span> <span>300??????</span></div>
        <div class="startBox_btn">{{ downcount }} ??????</div>
        <p class="startBox_p1">
          ???: ??????????????????????????????????????????????????????????????????
        </p>
      </div>
      <section class="outplanbox" v-if="outstate">
        <h2>???????????????????????????????????????????????????</h2>
        <div class="outplanbo_btn">
          <div class="btn_item" @click="endPlan">????????????</div>
          <div class="btn_item" @click="skatelittle()">????????????</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import RadialProgress from '@/components/ProgressBar.vue'
export default {
  components: {
    RadialProgress,
  },

  data() {
    return {
      runtitle: '??????Run',
      runtype: 0,
      runtime: '00:00:00',
      treadmillInfo: [
        {
          title: '??????',
          value: '0',
        },
        {
          title: '??????/bpm',
          value: 0,
        },
        {
          title: 'STOP',
          value: 0,
        },
        {
          title: '??????',
          value: 0,
        },
        {
          title: '??????Km/h',
          value: 0.8,
        },
      ],
      slopelist: [
        {
          title: '??????',
          value: '12.0',
        },
        {
          title: '??????',
          value: '8.0',
        },
        {
          title: '??????',
          value: '4.0',
        },
        {
          title: '??????',
          value: '1.0',
        },
      ],
      speedlist: [
        {
          title: '?????????',
          value: '15.0',
        },

        {
          title: '??????',
          value: '12.0',
        },
        {
          title: '??????',
          value: '9.0',
        },
        {
          title: '??????',
          value: '6.0',
        },
      ],
      slopestate: false, //????????????
      slopeindex: null, //??????index
      speedstate: false, //????????????
      speedindex: null,
      maskstate: false, //?????????
      startBoxState: false, //???????????????
      outstate: false, //????????????
      downcount: 5,
      stopPattern: true, //

      echartTimeArr: [],
      echartSpeedArr: [],
      speed_max: 0, //????????????
      incline_max: 0, //????????????
      averageSlope: [], //????????????
      heart_rate_max: 0, //????????????
      heart_rate_avg: [], //????????????
      detailinfo: null,
    }
  },
  created() {},
  mounted() {
    this.runtype = this.$route.query.type
    let status = this.$route.query.status
    if (status == 0) {
      this.downrun()
    } else {
      this.downcount = 3
      this.downrun()
    }
    this.$store.dispatch('clientstart')
  },
  destroyed() {
    this.$store.dispatch('clientEnd')
    if (this.detailinfo) {
      clearInterval(this.detailinfo)
    }
  },
  computed: {
    ...mapGetters([
      'TreadmillData',
      'publicPath',
      'resSetSpeed',
      'resSetIncline',
      'resEmergencyStop',
      'resSetStop',
    ]),
  },
  watch: {
    TreadmillData: {
      handler(newV, oldV) {
        if (!this.detailinfo) {
          this.detailinfo = setInterval(() => {
            let info = {
              time: newV.time, //????????????
              distance: newV.distance, //????????????
              speed: newV.speed, //????????????
              incline: newV.incline, //????????????
              step_number: newV.stepNumber, //????????????
              heart_rate: newV.heartRate, //????????????
              calorie: newV.calorie, //????????????
            }
            // console.log(newV)
            this.$store.commit('set_detailList', info)
          }, 5000)
        }

        //????????????
        if (newV.speed > this.speed_max) {
          this.speed_max = newV.speed
        }
        //????????????
        if (newV.incline > this.incline_max) {
          this.incline_max = newV.incline
        }
        //????????????
        if (newV.heartRate > this.heart_rate_max) {
          this.heart_rate_max = newV.heartRate
        }

        if (newV.time !== 0 && newV.time % 10 == 0) {
          this.echartTimeArr.push('')
          this.echartSpeedArr.push(newV.speed)
        }
        if (newV.incline == 1) {
          this.slopeindex = 3
        } else if (newV.incline == 4) {
          this.slopeindex = 2
        } else if (newV.incline == 8) {
          this.slopeindex = 1
        } else if (newV.incline == 12) {
          this.slopeindex = 0
        }

        if (newV.speed == 6) {
          this.slopeindex = 3
        } else if (newV.speed == 9) {
          this.slopeindex = 2
        } else if (newV.speed == 12) {
          this.slopeindex = 1
        } else if (newV.speed == 15) {
          this.slopeindex = 0
        }

        this.treadmillInfo[1].value = newV['heartRate']
        this.treadmillInfo[3].value = newV['stepNumber']
        this.getFormatDuringTime(newV.time)
        //??????????????????
        if (newV.incline !== oldV.incline) {
          if (newV.incline !== 0) {
            // console.log(newV.incline)
            this.averageSlope.push(newV.incline)
          }
        }
        //??????????????????
        if (newV.heartRate !== oldV.incline) {
          if (newV.heartRate !== 0) {
            // console.log(newV.heartRate)
            this.heart_rate_avg.push(newV.heartRate)
          }
        }
      },
      deep: true,
    },
    resSetIncline(newval) {
      this.treadmillInfo[0].value = newval
    },
    resSetSpeed(newval, oldval) {
      // console.log(newval)
      this.treadmillInfo[4].value = newval
    },
    //????????????
    resEmergencyStop(newval) {
      this.endPlan()
    },
    //??????
    resSetStop() {
      this.endPlan()
    },
  },
  methods: {
    ...mapMutations(['SEND_SOCKET']),
    //??????????????????
    lichoice(index) {
      if (index == 0) {
        this.slopestate = !this.slopestate
      }
      if (index == 2) {
        if (this.treadmillInfo[2].title == 'STOP') {
          this.endPlan()
        }
        // this.stopPattern = !this.stopPattern
      }
      if (index == 4) {
        this.speedstate = !this.speedstate
      }
    },
    //????????????
    skatelittle() {
      this.SEND_SOCKET(JSON.stringify({ cmd: 'askSetStart' }))
      this.maskstate = false
      setTimeout(() => {
        this.treadmillInfo[2].title = 'STOP'
      }, 3000)
    },
    //???
    reduceValue(item, i) {
      if (item.title == '??????') {
        let num = Number(this.treadmillInfo[i].value) - 1
        if (num == -1) {
          console.log('???????????????')
        } else {
          this.SEND_SOCKET(JSON.stringify({ cmd: 'askSetIncline', data: num }))
        }
      } else {
        let num = Number(this.treadmillInfo[i].value) - 0.1
        if (num.toFixed(1) == 0.7) {
          console.log('????????????')
        } else {
          this.SEND_SOCKET(
            JSON.stringify({ cmd: 'askSetSpeed', data: num.toFixed(1) })
          )
        }
      }
    },
    //???
    plusValue(item, i) {
      if (item.title == '??????') {
        let num = Number(this.treadmillInfo[i].value) + 1
        console.log(num)
        if (num == 15) {
          console.log('???????????????')
        } else {
          this.treadmillInfo[0].value = num.toFixed(1)
          this.SEND_SOCKET(
            JSON.stringify({ cmd: 'askSetIncline', data: num.toFixed(1) })
          )
        }
      } else {
        let num = Number(this.treadmillInfo[i].value) + 0.1
        if (num.toFixed(1) == 25) {
          console.log('????????????')
        } else {
          this.treadmillInfo[i].value = num.toFixed(1)
          this.SEND_SOCKET(
            JSON.stringify({ cmd: 'askSetSpeed', data: num.toFixed(1) })
          )
        }
      }
    },

    Swichtype(data, index, i) {
      if (i == 0) {
        this.slopeindex = index
        console.log('????????????')
        this.SEND_SOCKET(
          JSON.stringify({ cmd: 'askSetIncline', data: data.value })
        )
        setTimeout(() => {
          this.slopestate = false
        }, 500)
      }
      if (i == 4) {
        this.speedindex = index
        console.log('????????????')
        this.SEND_SOCKET(
          JSON.stringify({ cmd: 'askSetSpeed', data: data.value })
        )
        setTimeout(() => {
          this.speedstate = false
        }, 500)
      }
      // this.treadmillInfo[i].value = data.value
    },
    //?????????????????????
    downrun() {
      this.maskstate = true
      this.startBoxState = true
      this.startDown = setInterval(() => {
        this.downcount -= 1
        if (this.downcount == 3) {
          this.SEND_SOCKET(JSON.stringify({ cmd: 'askSetStart' }))
        }
        if (this.downcount == 0) {
          this.$store.commit('set_couserTimer', {
            type: 'start',
          })
          clearInterval(this.startDown)
          this.maskstate = false
          this.startBoxState = false
        }
      }, 1000)
    },
    //????????????
    endPlan() {
      clearInterval(this.detailinfo)

      this.SEND_SOCKET(JSON.stringify({ cmd: 'askSetStop' }))

      this.$store.commit('set_couserTimer', {
        type: 'end',
      })

      let speed_avg =
        (this.TreadmillData.distance / this.TreadmillData.time) * 3.6 //??????????????????

      let sum = 0
      let inclinelength = this.averageSlope.length

      this.averageSlope.forEach((item) => {
        sum += item
      })
      var averageincline = 0
      if (sum == 0 && inclinelength == 0) {
        averageincline = 0
      } else {
        averageincline = sum / inclinelength
      }

      let sum1 = 0
      let heartrateavg = this.heart_rate_avg.length
      this.heart_rate_avg.forEach((item) => {
        sum1 += item
      })
      var heartratecline = 0
      if (sum1 == 0 && heartrateavg == 0) {
        heartratecline = 0
      } else {
        heartratecline = sum1 / heartrateavg
      }

      const lap_number = this.TreadmillData.distance / 400
      let Runinfo = {
        distance: this.TreadmillData.distance, //??????
        duration: this.TreadmillData.time, //?????? ???
        speed_avg: Number(speed_avg.toFixed(1)) || 0, //????????????
        speed_max: this.speed_max, //????????????
        incline_avg: Number(averageincline.toFixed(1)), //????????????
        incline_max: this.incline_max, //????????????
        step_number: this.TreadmillData.stepNumber, //??????
        lap_number: Number(lap_number.toFixed(1)), //??????
        heart_rate_avg: Number(heartratecline.toFixed(1)), //????????????
        heart_rate_max: this.heart_rate_max, //????????????
        calorie: this.TreadmillData.calorie, //?????????
        vo2max: 0, //????????????
        runtime: this.runtime, //????????????
      }

      // console.log(this.TreadmillData, Runinfo)
      // console.log(this.echartTimeArr, this.echartSpeedArr)
      this.$router.push({
        path: '/courseend',
        query: {
          Runinfo: JSON.stringify(Runinfo),
          echartTimeArr: this.echartTimeArr,
          echartSpeedArr: this.echartSpeedArr,
        },
      })
    },
    //????????????
    getFormatDuringTime(during) {
      var s = Math.floor(during / 1) % 60
      during = Math.floor(during / 60)
      var i = during % 60
      during = Math.floor(during / 60)
      var h = during % 24

      if (s.toString().length == 1) {
        s = '0' + s
      }
      if (i.toString().length == 1) {
        i = '0' + i
      }
      if (h.toString().length == 1) {
        h = '0' + h
      }
      let num = h + ':' + i + ':' + s
      this.runtime = num
    },
  },
}
</script>
