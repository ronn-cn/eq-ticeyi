<style scoped lang="scss">
.rest_page {
  width: 820px;
  height: 860px;
  padding: 30px 70px;
  color: #fff;
  background: #161616;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.bearing {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bearing_text {
    text-align: left;
  }
  .bearing_p2 {
    margin-top: 30px;
    font-size: 72px;
  }
}
.rest_progress_line {
  width: 100%;
  height: 10px;
  background: #ffffff59;
}
.rest_text {
  font-size: 28px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 56px;
}

.jixianvalue {
  width: 5.15rem;
  height: 2.14rem;
  border-radius: 0.15rem;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.24rem;
}
.plan_group {
  margin-top: 50px;
  &_item {
    height: 102px;
    padding: 30px 26px;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, #323647 0%, #222631 100%);
    border-radius: 15px;
    margin-bottom: 38px;
    position: relative;
  }
  .group_next_icon,
  .group_current_icon1,
  .group_current_icon2 {
    width: 65px;
    height: 65px;
    margin-right: 20px;
    background: url("~assets/images/trainpage/grouo_icon1.svg") no-repeat;
    background-size: 100% 100%;
  }
  .group_current_icon1 {
    background: url("~assets/images/trainpage/grouo_icon3.svg") no-repeat;
    background-size: 100% 100%;
  }
  .group_current_icon2 {
    background: url("~assets/images/trainpage/grouo_icon2.svg") no-repeat;
    background-size: 100% 100%;
  }
  .group_text {
    text-align: left;
    // position: relative;
    h2 {
      margin-bottom: 20px;
    }
    .isCtext {
      font-size: 24px;
      position: absolute;
      top: 75px;
      right: 40px;
    }
  }
}
.rest_btn {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .btn_a {
    width: 48%;
    height: 131px;
    line-height: 131px;
    border: 1px solid #fff;
    border-radius: 20px;
  }
  .btn_b {
    width: 48%;
    height: 131px;
    background: #28cd41;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      inset 15px 15px 10px rgba(255, 255, 255, 0.09);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn_p1 {
    }
    .btn_p2 {
      margin-top: 12px;
      font-size: 18px;
    }
  }
}
.Increase,
.Increase1 {
  color: #00b929;
  font-size: 32px;
  position: relative;
  margin-left: 40px;
}
.Increase1 {
  color: #ff3b30;
}
.Increase::after,
.Increase1::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -50px;
  width: 0px;
  height: 0px;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent #00b929 transparent;
}
.Increase1::after {
  position: absolute;
  top: 6px;
  // left: -50px;
  border-color: #ff3b30 transparent transparent transparent;
}
</style>

<template>
  <div class="rest_page">
    <div class="bearing">
      <section class="bearing_text">
        <p>??????????????????</p>
        <p class="bearing_p2">
          {{ planstate == 0 && firstdown ?restinfo.weight + 6 : restinfo.weight }}&nbsp;KG
          <span :class="restinfo.weight > upGroup.weight ? 'Increase' : 'Increase1'"
                v-if="planstate !== 0 && restinfo.weight !== upGroup.weight && firstdown">{{ Percent(restinfo.weight, upGroup.weight) }}%</span>
        </p>
      </section>
      <section>
        <radial-progress-bar :diameter="barinfo.diameter"
                             :stopColor="barinfo.stopColor"
                             :startColor="barinfo.startColor"
                             :strokeWidth="barinfo.strokeWidth"
                             :innerStrokeWidth="barinfo.innerStrokeWidth"
                             :innerStrokeColor="barinfo.innerStrokeColor"
                             :strokeLinecap="barinfo.strokeLinecap"
                             :completed-steps="completedSteps"
                             :v-model="completedSteps"
                             :total-steps="restinfo.rest">
          <p style="font-size: 40px; margin-bottom: 5px">
            {{ Math.floor(completedSteps) }}s
            <br />
            <span style="font-size: 24px">????????????</span>
          </p>
          <!-- <p style="margin-top: 6px">???????????????</p> -->
        </radial-progress-bar>
      </section>
    </div>
    <div class="rest_progress_line"></div>
    <div class="plan_group">
      <section class="plan_group_item">
        <div class="group_next_icon"></div>
        <div class="group_text">
          <h2>?????????</h2>
          <div>
            <span>{{ plantitle(planstate) }} |
              <span v-if="planstate == 0 && firstdown">???{{  restinfo.groups_currentNum + 1 }}???</span>
              <span v-else>???{{ restinfo.groups_currentNum + 1}}???</span>
            </span>
            &nbsp;
            <span>
              <span v-if="planstate == 0">{{ firstdown ? restinfo.weight + 6:12}}KG</span>
              <span v-else>{{ restinfo.weight }}KG</span>
              /{{ restinfo.times }}???
            </span>
          </div>
        </div>
      </section>
      <section class="plan_group_item"
               v-if="firstdown">
        <div :class="upGroup.isok ? 'group_current_icon1' : 'group_current_icon2'"></div>
        <div class="group_text">
          <h2>?????????</h2>
          <div>
            <span>{{ upGroup.grouptitle }} |
              <span v-if="planstate == 0">???{{ upGroup.grouptitle == "?????????" ? upGroup.groups_currentNum : upGroup.groups_currentNum + 1 }}???</span>
              <span v-else>???{{ upGroup.groups_currentNum + 1 }}???</span>
            </span>
            &nbsp;
            <span>
              <span>{{ planstate == 1 && upGroup.grouptitle =="?????????"? upGroup.weight + 6: upGroup.weight  }}KG</span>
              /{{ upGroup.times }}???
            </span>
            <div class="isCtext"
                 :style="upGroup.isok ? 'color:#28CD41' : 'color:#FF3B30'">
              {{ upGroup.isok ? '?????????' : '?????????' }}
            </div>
          </div>
        </div>
      </section>

      <!-- ????????? -->
    </div>

    <div class="rest_btn">
      <div class="btn_a"
           @click="suspend(), click_effects()">
        {{ suspendState ? '????????????' : '??????' }}
      </div>
      <div class="btn_b"
           @click="skipRest(), click_effects()">
        <p>????????????</p>
        <p class="btn_p2">???????????????????????????</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
export default {
  components: {
    RadialProgressBar,
  },
  props: {
    pagetype: {
      type: Number,
      default: 0
    },
    firstdown: {
      type: Boolean
    },
    planstate: {
      type: Number,
      default: 0,
    },
    restinfo: {
      type: Object,
    },
    // firststate: {
    //   type: Boolean,
    //   default: false,
    // },
    upGroup: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['publicPath', 'projecttype']),
    GetPercent (num, total) {
      /// <param name="num">?????????</param>
      /// <param name="total">??????</param>
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return Math.round((num / total) * 10000) / 100.0
    },
    limitNum () {
      // let num = this.uplimitNum
      // return num + 1 || 1
      return Math.floor(this.restinfo.weight / 6) - 1
    },
    uplimitNum () {
      return Math.floor(this.upGroup.weight / 6) - 1
    },
  },
  data () {
    return {
      progress: 100,
      completedSteps: this.restinfo.rest,
      barinfo: {
        diameter: 192,
        stopColor: 'rgb(116,96,196)',
        startColor: 'rgb(116,96,196)',
        innerStrokeColor: 'rgb(39,38,56)',
        strokeWidth: 15,
        innerStrokeWidth: 15,
        strokeLinecap: 'line',
      },
      downtimer: null,
      suspendState: false,
      tolim: 0
    }
  },
  created () {
    if (process.env.NODE_ENV !== 'development') {
      this.initDown()
    }
  },
  watch: {
    suspendState (val) {
      console.log(val)
      if (val) {
        clearInterval(this.downtimer)
        this.downtimer = null
      } else {
        this.initDown()
      }
    },
  },
  mounted () { },
  destroyed () {
    clearInterval(this.downtimer)
  },
  methods: {
    ...mapActions(['click_effects']),

    Percent (num, oldnum) {
      if (num == oldnum) {
        return 0
      }
      if (num > oldnum) {
        return 100 - Math.floor((oldnum / num) * 100)
      } else {
        return 100 - Math.floor((num / oldnum) * 100)
      }
    },
    initDown () {
      this.downtimer = setInterval(() => {

        let a = 100 / this.restinfo.rest
        if (this.completedSteps > 1) {
          this.completedSteps -= 0.1
          this.progress -= a * 0.1
        } else {
          console.log('???????????????')
          clearInterval(this.downtimer)
          this.$emit('endrest')
        }
      }, 100)
    },
    suspend () {
      this.suspendState = !this.suspendState
    },
    skipRest () {
      clearInterval(this.downtimer)
      this.$emit('endrest')
    },
    plantitle (index, type) {
      switch (index) {
        case 0:
          return "?????????"
        case 1:
          return "?????????"
        case 2:
          return '?????????'
        case 3:
          return '????????????'
        case 4:
          return '?????????'
      }
    },
  },
}
</script>
