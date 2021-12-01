<style scoped lang="scss">
.rest_page {
  color: #fff;
  display: flex;
  padding: 0.6rem 0 0 1.12rem;
  &_left {
    display: flex;
    flex-direction: column;
    margin-right: 0.72rem;
    align-items: center;
    .left_countdown {
      width: 4.22rem;
      height: 4.22rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: aqua;
    }
    .left_btn {
      width: 2.13rem;
      height: 0.73rem;
      font-size: 0.28rem;
      line-height: 0.73rem;
      background: rgba(103, 117, 217, 0.15);
      border: 1px solid #89b2e7;
      border-radius: 0.37rem;
      margin-top: 0.26rem;
    }
  }
  &_right {
    .right_text {
      display: flex;
      flex-direction: column;
      .text_p1 {
        font-size: 1rem;
        font-weight: 400;
      }
      .text_p2 {
        // font-size: 42px;
        // font-weight: 400;
        // letter-spacing: 10px;
        // position: relative;
        // margin: 85px 0 180px 0;
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.42rem;
        letter-spacing: 0.1rem;
        position: relative;
        margin: 0.85rem 0 1.8rem 0;
        text-align: left;
      }

      .text_p2::before {
        content: '“';
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        top: -0.8rem;
        left: -0.5rem;
        font-size: 1rem;
      }
      .text_p2::after {
        content: '”';
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        top: 1.5rem;
        right: 0.1rem;
        font-size: 1rem;
      }
    }
    .right_next {
      width: 5.15rem;
      height: 2.14rem;
      background: rgb(33 35 36);
      border-radius: 0.1rem;
      display: flex;
      &_image {
        width: 3.16rem;
        height: 2.14rem;
        border-radius: 0.1rem 0px 0px 0.1rem;
        background: chocolate;
      }
      &_text {
        font-size: 0.24rem;
        width: (5.15rem-3.16rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
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
.planzu {
  width: 5.15rem;
  height: 2.14rem;
  border-radius: 0.15rem;
  border: 1px solid #fff;
  display: flex;
  font-size: 0.24rem;
  &_left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    border-right: 1px solid;
  }
  &_right {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div class="rest_page">
    <section class="rest_page_left">
      <div class="left_countdown">
        <radial-progress-bar
          :diameter="barinfo.diameter"
          :stopColor="barinfo.stopColor"
          :startColor="barinfo.startColor"
          :strokeWidth="barinfo.strokeWidth"
          :innerStrokeWidth="barinfo.innerStrokeWidth"
          :innerStrokeColor="barinfo.innerStrokeColor"
          :strokeLinecap="barinfo.strokeLinecap"
          :completed-steps="completedSteps"
          :v-model="completedSteps"
          :total-steps="totalSteps"
        >
          <p style="font-size: 84px; margin-bottom: 5px">
            {{ completedSteps }}
          </p>
          <p>s后</p>
          <p style="margin-top: 10px">即将结束</p>
        </radial-progress-bar>
      </div>
      <div class="left_btn" @click="skipRest">
        {{
          planstate == 1 ? (firststate ? '跳过休息' : '继续测试') : '跳过休息'
        }}
      </div>
    </section>
    <section class="rest_page_right">
      <div class="right_text">
        <p class="text_p2" v-show="planstate !== 1">热爱的事情要不留余地</p>
        <p class="text_p2" v-show="planstate == 1 && !firststate">
          非常棒,你已完成当前重量测试,请调整提升配重至"{{
            restweight + 6
          }}KG"重量,继续测试.
        </p>
        <p class="text_p2" v-show="planstate == 1 && firststate">
          非常棒,你已完成热身组训练,请调整提升配重至合适重量
          (建议"--KG"),开启极限组测试
        </p>
      </div>
      <!-- <div class="right_next"
           v-show="planstate !== 1">
        <div class="right_next_image"></div>
        <div class="right_next_text">
          <span style="margin-bottom:40px;">接下来</span>
          <span>腹肌训练</span>
        </div>
      </div> -->
      <div class="planzu" v-show="planstate !== 1">
        <section class="planzu_left">下一组</section>
        <section class="planzu_right">
          <p style="margin-bottom: 26px">
            {{ plantitle() }} | 第{{ restinfo.group + 1 }}组
          </p>
          <p>{{ restinfo.weight }}KG/{{ restinfo.times }}次</p>
        </section>
      </div>
      <div class="jixianvalue" v-show="planstate == 1 && !firststate">
        <p style="margin-bottom: 26px">当前器械1RM为</p>
        <p>{{ restweight }}KG/--1b</p>
      </div>
      <div class="planzu" v-show="planstate == 1 && firststate">
        <section class="planzu_left">下一组</section>
        <section class="planzu_right">
          <p style="margin-bottom: 26px">{{ plantitle() }} | 第1组</p>
          <p>--KG/1次</p>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
  components: {
    RadialProgressBar,
  },
  props: {
    totalSteps: {
      type: [Number, String],
      default: 30,
    },
    planstate: {
      type: Number,
      default: 0,
    },
    restweight: {
      type: Number,
      default: 6,
    },
    restinfo: {
      type: Object,
    },
    firststate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      completedSteps: this.totalSteps,
      // totalSteps: 30,
      barinfo: {
        diameter: 308,
        stopColor: 'rgb(116,96,196)',
        startColor: 'rgb(116,96,196)',
        innerStrokeColor: 'rgb(39,38,56)',
        strokeWidth: 15,
        innerStrokeWidth: 15,
        strokeLinecap: 'line',
      },
    }
  },
  created() {
    window.timer = setInterval(() => {
      if (this.completedSteps !== 0) {
        this.completedSteps -= 1
      } else {
        console.log('休息结束了')
        clearInterval(window.timer)
        this.$emit('endrest')
      }
    }, 1000)
  },
  watch: {
    restinfo(val) {
      console.log(val)
    },
  },
  mounted() {
    console.log('传的数据', this.restinfo)
  },
  destroyed() {
    clearInterval(window.timer)
  },
  methods: {
    skipRest() {
      clearInterval(window.timer)
      this.$emit('endrest')
    },
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
  },
}
</script>
