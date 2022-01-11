<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}
#myChart1 {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="main">
    <div id="myChart1"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // console.log(document.getElementById('myChart'))
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
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
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [0, 10, 20, 30, 50, 20, 0],
            type: 'line',
            smooth: true,
            showSymbol: false,
          },
        ],
      })
    },
  },
}
</script>
