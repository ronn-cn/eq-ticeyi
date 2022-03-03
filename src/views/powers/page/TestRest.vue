<style scoped lang="scss">
.rest_page {
  width: 900px;
  height: 860px;
  padding: 20px 30px;
  color: #fff;
  background: #161616;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}

.bearing {
  font-size: 0.3rem;
  margin: 145px 0 20px 1rem;
  .bearing_p2 {
    font-size: 0.42rem;
    margin-top: 0.2rem;
    color: #10c98f;
  }
}
.rest_progress {
  p {
    text-align: right;
    padding: 20px 0;
  }
  // padding: 0 0.3rem 0.1rem;
  // display: flex;
  // align-items: center;
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
  display: flex;
  height: 400px;
  // justify-content: center;
  // font-size: 0.2rem;
  margin: 0.2rem 0;
  &_left {
    width: 50%;
    // background: #28cd41;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      margin-bottom: 36px;
    }
  }
  &_right {
    width: 50%;
    .introduce_cover {
      margin-top: 50px;
    }
    // background: #28cd41;
  }
}
.rest_btn {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // border-radius: 5px;
  // background-color: rgb(16, 201, 143);
  .btn_a {
    width: 413px;
    height: 109px;
    line-height: 109px;
    border: 1px solid #fff;
    border-radius: 20px;
  }
  .btn_b {
    width: 413px;
    height: 109px;
    line-height: 109px;
    background: #28cd41;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      inset 15px 15px 10px rgba(255, 255, 255, 0.09);
    border-radius: 20px;
  }
}
p {
  margin-bottom: 0;
}
</style>

<template>
  <div class="rest_page">
    <!-- <div class="rest_progress">
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
        <p style="font-size: 84px; margin-bottom: 5px">{{ completedSteps }}s</p>

        <p style="margin-top: 10px">后继续测试</p>
      </radial-progress-bar>
    </div> -->
    <div class="bearing">
      <p class="bearing_p1">建议器械负重调至 "{{ restinfo.weight }}KG"</p>
      <!-- <p class="bearing_p2">"{{ restinfo.weight }}KG"</p> -->
    </div>
    <div class="rest_progress">
      <p>休息时间 | {{ Math.floor(completedSteps) }}s</p>
      <k-progress
        :percent="progress"
        :show-text="false"
        color="#25CB55"
      ></k-progress>
    </div>
    <!-- 
    <div class="rest_text" v-show="planstate == 0">
      自由调整配重后,可随时进行器械规范动作训练，无需点击按钮或等待休息结束，即可开启热身组训练
    </div>
    <div class="rest_text" v-show="planstate !== 0">
      非常棒,你已完成当前重量测试（"{{ restinfo.weight }}KG/{{
        restinfo.weight * 2
      }}lb"），自行调整配重后，可随时进行器械规范动作训练，无需点击按钮或等待休息结束，即可继续测试
    </div> -->

    <div class="plan_group">
      <section class="plan_group_left">
        <h2>下一组</h2>
        <div>
          <p>{{ plantitle() }} | 第{{ restinfo.group_currentNum + 1 }}组</p>
          <p style="margin-top: 10px">
            {{ restinfo.weight }}KG/{{ restinfo.totalNum }}次
          </p>
        </div>
      </section>
      <section class="plan_group_right">
        <div class="introduce_cover">
          <img
            :src="`${publicPath}powerStatic/images/${projecttype}.png`"
            width="296"
            height="328"
          />
        </div>
      </section>
    </div>

    <div class="rest_btn">
      <div class="btn_a" @click="suspend">
        {{ suspendState ? '开始' : '暂停' }}
      </div>
      <div class="btn_b" @click="skipRest">快速开始</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
export default {
  components: {
    RadialProgressBar,
    KProgress,
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
  computed: {
    ...mapGetters(['publicPath', 'projecttype']),
    // progress() {
    //   return Math.floor(100 / this.totalSteps)
    // },
  },
  data() {
    return {
      progress: 100,
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
      downtimer: null,
      suspendState: false,
    }
  },
  created() {
    this.initDown()
  },
  watch: {
    restinfo(val) {
      console.log(val)
    },
    suspendState(val) {
      console.log(val)
      if (val) {
        clearInterval(this.downtimer)
        this.downtimer = null
      } else {
        this.initDown()
      }
    },
  },
  mounted() {
    // console.log('传的数据', this.restinfo)
  },
  destroyed() {
    clearInterval(this.downtimer)
  },
  methods: {
    initDown() {
      this.downtimer = setInterval(() => {
        let a = 100 / this.totalSteps
        if (this.completedSteps > 1) {
          this.completedSteps -= 0.1
          this.progress -= a * 0.1
        } else {
          console.log('休息结束了')
          clearInterval(this.downtimer)
          this.$emit('endrest')
        }
      }, 100)
    },
    suspend() {
      this.suspendState = !this.suspendState
    },
    skipRest() {
      clearInterval(this.downtimer)
      this.$emit('endrest')
    },
    plantitle() {
      switch (this.planstate) {
        case 0:
          return '极限组'
        case 1:
          return '热身组'
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
