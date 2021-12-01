<style scoped lang='scss'>
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
      let myChart = this.$echarts.init(document.getElementById('myChart'))
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
          data: [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ],
          //x轴下划线
          axisLine: {
            lineStyle: {
              color: '#243B63',
            },
          },
        },
        yAxis: {
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
            color: '#B6D1FF',
            // fontWeight: "bold",
          },
        },
        series: [
          {
            name: '分值',
            type: 'bar',
            barWidth: 4,
            label: {
              show: false,
              position: 'right',
              color: '#ffffff',
            },
            itemStyle: {
              normal: {
                //颜色渐变
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.25, color: '#8BDEFF' },
                  { offset: 0.5, color: '#A68FE8' },
                  { offset: 0.75, color: '#FF7BAC' },
                  { offset: 1, color: '#FF9D78' },
                ]),
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            data: [
              5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10,
              20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10,
              10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20,
            ],
          },
        ],
      })
    },
  },
}
</script>
