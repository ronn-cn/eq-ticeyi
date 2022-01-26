<style scoped lang="scss">
.introduce_title {
  padding-top: 1rem;
  &_p1 {
    font-size: 0.36rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;

    margin-bottom: 0.36rem;
  }
  &_p2 {
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.32rem;
    text-align: left;
    padding: 0 0.3rem;
  }
}
.careradia {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  color: #fff;
}
</style>

<template>
  <div>
    <div class="introduce_title">
      <p class="introduce_title_p1">
        {{ MakeCareTitle || '力量器械' }}
      </p>
      <p class="introduce_title_p2">
        {{ MakeCareDesc || '' }}
      </p>
    </div>
    <div class="careradia">
      <RadialProgressBar
        :diameter="barinfo.diameter"
        :stopColor="barinfo.stopColor"
        :startColor="barinfo.startColor"
        :strokeWidth="barinfo.strokeWidth"
        :innerStrokeWidth="barinfo.innerStrokeWidth"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
      >
        <p style="font-size: 0.84rem; margin-bottom: 0.05rem">
          {{ completedSteps }}
        </p>
      </RadialProgressBar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
export default {
  components: {
    RadialProgressBar,
  },
  data() {
    return {
      barinfo: {
        diameter: 280,
        stopColor: '#ffffff',
        startColor: '#ffffff',
        strokeWidth: 15,
        innerStrokeWidth: 15,
      },
      completedSteps: 90,
      totalSteps: 90,
      timer: null,
    }
  },
  computed: {
    ...mapGetters([
      'MakeCareTitle',
      'MakeCareDesc',
      'loginState',
      'publicPath',
    ]),
  },
  created() {},
  mounted() {
    this.loaddown()
  },
  destroyed: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.set_userMakeState(false)
  },
  methods: {
    ...mapActions(['set_userMakeState']),
    loaddown() {
      this.timer = setInterval(() => {
        if (this.completedSteps == 0) {
          clearInterval(this.timer)
          this.set_userMakeState(false)
          this.$store.commit(
            'set_lesson_id',
            '445dab66e033da6f0000000000000003'
          )
          this.completedSteps = 90
          this.totalSteps = 90
          if (this.loginState) {
            this.$store.dispatch('logout')
          }
        } else {
          this.completedSteps -= 1
          if (this.completedSteps == 40) {
            let audio = new Audio()
            audio.src = `${this.publicPath}powerStatic/audio/首页/03您已预约，请点击开始课程.mp3`
            audio.play()
          }
        }
      }, 1000)
    },
  },
}
</script>
