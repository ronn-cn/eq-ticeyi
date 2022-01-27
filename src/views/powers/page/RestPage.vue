<style scoped lang="scss">
.rest_page {
  width: 45%;
  height: 70%;
  color: #fff;
  background-color: #5a4f5f;
  position: absolute;
  left: 1%;
  bottom: 18%;
  z-index: 1;
}
.rest_progress {
  padding: 0 0.3rem 0.1rem;
  display: flex;
  align-items: center;
  .bearing {
    font-size: 0.3rem;
    margin-top: 0.4rem;
    margin-left: 1rem;
    .bearing_p2 {
      font-size: 0.42rem;
      margin-top: 0.2rem;
      color: #10c98f;
    }
  }
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
  justify-content: center;
  font-size: 0.2rem;
  margin: 0.2rem 0;
  &_left {
    display: flex;
    align-items: center;
  }
  &_line {
    width: 4px;
    height: 65px;
    background-color: #fff;
    margin: 0 20px;
  }
}
.rest_btn {
  width: 90%;
  height: 130px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: rgb(16, 201, 143);
}
p {
  margin-bottom: 0;
}
</style>

<template>
  <div class="rest_page">
    <div class="rest_progress">
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
      <div class="bearing">
        <p class="bearing_p1">建议器械负重</p>
        <p class="bearing_p2">"{{ restinfo.weight }}KG"</p>
      </div>
    </div>

    <div class="rest_text" v-show="planstate == 0">
      自由调整配重后,可随时进行器械规范动作训练，无需点击按钮或等待休息结束，即可开启热身组训练
    </div>
    <div class="rest_text" v-show="planstate !== 0">
      非常棒,你已完成当前重量测试（"{{ restinfo.weight }}KG/{{
        restinfo.weight * 2
      }}lb"），自行调整配重后，可随时进行器械规范动作训练，无需点击按钮或等待休息结束，即可继续测试
    </div>

    <div class="plan_group">
      <section class="plan_group_left">下一组</section>
      <div class="plan_group_line"></div>
      <section class="plan_group_right">
        <p>{{ plantitle() }} | 第{{ restinfo.group_currentNum + 1 }}组</p>
        <p style="margin-top: 10px">
          {{ restinfo.weight }}KG/{{ restinfo.totalNum }}次
        </p>
      </section>
    </div>

    <div class="rest_btn" @click="skipRest">
      <p>立即开始</p>
      <p>开始运动即开启训练</p>
    </div>
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
      downtimer: null,
    }
  },
  created() {
    this.downtimer = setInterval(() => {
      if (this.completedSteps !== 0) {
        this.completedSteps -= 1
      } else {
        console.log('休息结束了')
        clearInterval(this.downtimer)
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
    // console.log('传的数据', this.restinfo)
  },
  destroyed() {
    clearInterval(this.downtimer)
  },
  methods: {
    skipRest() {
      clearInterval(this.downtimer)
      this.$emit('endrest')
    },
    plantitle() {
      switch (this.planstate) {
        case 0:
          return '热身组'
        case 1:
          return '极限组'
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
