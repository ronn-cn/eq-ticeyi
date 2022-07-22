<style scoped lang='scss'>
.rtext {
  font-size: 18px;
  color: #aaaaaa;
  margin-top: 10px;
}
</style>

<template>
  <div>
    <radial-progress-bar :diameter="barinfo.diameter"
                         :stopColor="barinfo.stopColor"
                         :startColor="barinfo.startColor"
                         :strokeWidth="barinfo.strokeWidth"
                         :innerStrokeWidth="barinfo.innerStrokeWidth"
                         :innerStrokeColor="barinfo.innerStrokeColor"
                         :strokeLinecap="barinfo.strokeLinecap"
                         :completed-steps="completedSteps"
                         :v-model="completedSteps"
                         :total-steps="totalcount">
      <p style="font-size: 40px;">
        :{{ Math.floor(completedSteps) }}
      </p>
      <p class="rtext">单次运动时效</p>
    </radial-progress-bar>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
  data () {
    return {
      barinfo: {
        diameter: 176,
        stopColor: '#FFFFFFDE',
        startColor: '#FFFFFFDE',
        innerStrokeColor: '#FFFFFF47',
        strokeWidth: 12,
        innerStrokeWidth: 12,
        // strokeLinecap: 'line',
      },
      completedSteps: 6,
      totalcount: 30,
      downtimer: null
    };
  },
  components: {
    RadialProgressBar
  },
  created () {

  },
  mounted () {
    this.loadCount()
  },
  methods: {
    loadCount () {
      this.downtimer = setInterval(() => {
        if (this.completedSteps > 1) {
          this.completedSteps -= 1
          if (this.completedSteps == 3) {
            console.log('倒计时3')
          }
          if (this.completedSteps == 2) {
            console.log('倒计时2')
          }
          if (this.completedSteps == 1) {
            console.log('倒计时1')
          }
        } else {
          console.log('~~boom~~')
          clearInterval(this.downtimer)
          this.$emit('set_count')
        }
      }, 1000)
    }
  }
};
</script>
