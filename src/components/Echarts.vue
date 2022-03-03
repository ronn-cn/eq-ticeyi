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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.drawLine()
    // console.log('还行', this.echartData)
  },
  computed: {
    ...mapGetters(['echartData']),
  },
  methods: {
    drawLine() {
      // console.log(document.getElementById('myChart'))
      // 基于准备好的dom，初始化echarts实例
      let Adata = []
      for (let i = 1; i < this.echartData.length + 1; i++) {
        Adata.push(i + '')
      }
      console.log(1, Adata)

      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '5%',
          right: '5%',
          bottom: '0',
          top: '25%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Adata,
          axisLine: {
            lineStyle: {
              color: '#ffffff',
            },
          },
        },
        yAxis: {
          type: 'value',
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     color: '#243B63',
          //     // opacity: 0.3,
          //   },
          // },
          // axisLine: {
          //   show: true,
          //   lineStyle: {
          //     color: '#243B63',
          //   },
          // },
          // axisLabel: {
          //   color: '#B6D1FF',
          //   // fontWeight: "bold",
          // },
        },
        series: [
          {
            data: this.echartData,
            type: 'line',
            areaStyle: {},
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
          },
        ],
      })
    },
  },
}
</script>
