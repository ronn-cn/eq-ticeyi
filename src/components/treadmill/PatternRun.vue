<style scoped lang="scss">
.pattern_run {
  h2 {
    padding: 0.72rem 0 0.89rem 0;
    font-size: 0.36rem;
  }
  &_item {
    display: flex;
    align-items: center;
    padding-left: 1.05rem;
    font-size: 0.24rem;
    margin-bottom: 0.88rem;
    ul {
      margin-left: 0.38rem;
      display: flex;
      background: url('/TreadmillStatic/images/pattern_back.png') no-repeat;
      background-size: 100% 100%;
      li {
        width: 1.4rem;
        height: 0.56rem;
        line-height: 0.56rem;
        font-size: 0.2rem;
      }
      .pattern_active {
        background: url('/TreadmillStatic/images/pattern_active.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>

<template>
  <div class="introduce_title">
    <div class="pattern_run">
      <h2>模式选择</h2>
      <div class="pattern_run_item">
        <span>时间目标</span>
        <ul>
          <li
            v-for="(item, index) of timetarget"
            :key="item"
            :class="{ pattern_active: timeactive == index }"
            @click="timeactive = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="pattern_run_item">
        <span>距离目标</span>
        <ul>
          <li
            v-for="(item, index) of distancetarget"
            :key="item"
            :class="{ pattern_active: distanceactive == index }"
            @click="distanceactive = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="pattern_run_item">
        <span>热量目标</span>
        <ul>
          <li
            v-for="(item, index) of HeatTarget"
            :key="item"
            :class="{ pattern_active: heatactive == index }"
            @click="heatactive = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timetarget: ['15分钟', '30分钟', '60分钟', '90分钟'],
      timeactive: 2,
      distancetarget: ['2km', '5km', '8km', '10km'],
      distanceactive: 1,
      HeatTarget: ['100Kcal', '150Kcal', '300Kcal', '400Kcal'],
      heatactive: 0,
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
