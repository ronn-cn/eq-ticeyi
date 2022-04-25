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
  data () {
    return {}
  },
  created () { },
  mounted () {
    this.init_echart()
  },
  computed: {
    ...mapGetters(['']),
  },
  methods: {
    init_echart () {
      // 基于准备好的dom，初始化echarts实例
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
        // legend: {
        //   data: ['Precipitation', 'Temperature']
        // },
        xAxis: [
          {
            show: false,
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '体重',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              color: "#7F7F7F",
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '体脂率',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              color: "#7F7F7F",
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Precipitation',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                //颜色渐变
                color: "#2CD9C5",
                barBorderRadius: [5, 5, 0, 0]
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                //颜色渐变
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#FE6AAC' },
                  { offset: 1, color: '#FF8B77' },
                ]),

              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
      )
    },
  },
}
</script>
