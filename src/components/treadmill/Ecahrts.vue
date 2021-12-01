<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}
#myChart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="main">
    <div id="myChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
export default {
  props: {
    echartTimeArr: Array,
    echartSpeedArr: Array,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // console.log(this.echartTimeArr, '得得')
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      document.getElementById('myChart').setAttribute('_echarts_instance_', '')
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '5%',
          right: '5%',
          bottom: '0',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          data: this.echartTimeArr,
          //x轴下划线
          axisLine: {
            lineStyle: {
              color: '#243B63',
            },
          },
        },
        yAxis: {
          min: 'dataMin',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#243B63',
              // opacity: 0.3,
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#243B63',
            },
          },
          axisLabel: {
            fontSize: 22,
            color: '#849ac1',
            // fontWeight: "bold",
          },
        },
        series: [
          {
            data: this.echartSpeedArr,
            type: 'line',
            symbol: 'none',
            smooth: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0.25, color: '#8BDEFF' },
                  { offset: 0.5, color: '#A68FE8' },
                  { offset: 0.75, color: '#FF7BAC' },
                  { offset: 1, color: '#FF9D78' },
                ]),
              },
            },
            lineStyle: {
              normal: {
                width: 10,
              },
            },
          },
        ],
      })
    },
  },
}
</script>
