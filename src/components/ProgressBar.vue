<style scoped lang="scss">
.rhythm {
  color: #fff;
  font-weight: 500;
  font-size: 0.4rem;
  padding: 0.1rem;
}
</style>

<template>
  <div>
    <radial-progress-bar
      :_uid="bartype"
      :diameter="width"
      :completed-steps="completedSteps"
      :stopColor="progressColor"
      :startColor="progressColor"
      :strokeWidth="barinfo.strokeWidth"
      :innerStrokeColor="barinfo.innerStrokeColor"
      :innerStrokeWidth="barinfo.innerStrokeWidth"
      :strokeLinecap="barinfo.strokeLinecap"
      :total-steps="totalSteps"
    >
      <p>{{ bartype == 0 ? '距离' : '卡路里' }}</p>
      <p :class="barinfo.textclassName">{{ completedSteps }}</p>
      <p>{{ bartype == 0 ? 'm' : 'cal' }}</p>
    </radial-progress-bar>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
  components: {
    RadialProgressBar,
  },
  props: {
    completedSteps: {
      type: [Number, String],
      default: 0,
    },
    totalSteps: {
      type: [Number, String],
      default: 0,
    },
    width: {
      type: [Number, String],
      default: 258,
    },
    progressColor: {
      type: String,
      default: '#fff',
    },
    bartype: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      barinfo: {
        textclassName: 'rhythm',
        innerStrokeColor: '#8E8E8E',
        stopColor: '#fff',
        startColor: '#fff',
        strokeWidth: 10,
        innerStrokeWidth: 10,
        text: '',
        strokeLinecap: 'line',
      },
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
