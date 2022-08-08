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
  props:{
    Weight:{
      default:0,
      type:Number
    },
    Fat:{
      default:0,
      type:Number
    }
  },
  data () {
    return {
      xdata: [],
      ydata1: [],
      ydata2: []
    }
  },
  created () {
    // echarts.init(dom, 'customed')
  },
  mounted () {
    if (Array.isArray(this.user_side_log)){
      let l = this.user_side_log.length;
      for (let i = l-1; i >= 0; i--){
        this.xdata.push(i.toString())
        this.ydata1.push(this.user_side_log[i].weight)
        this.ydata2.push(this.user_side_log[i].fat)
      }
      if (this.Weight != 0){
        this.xdata.push('')
        this.ydata1.push(this.Weight)
      } 
      if (this.Fat != 0){
        this.ydata2.push(this.Fat)
      }
      console.log("ydata1",this.ydata1)
      console.log("ydata2",this.ydata2)
    }
    this.init_echart()
  },
  computed: {
    ...mapGetters(['user_side_log']),
  },
  methods: {
    init_echart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'customed')
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '5%',
          right: '5%',
          bottom: '0',
          top: '25%',
          containLabel: true,
        },
        legend: {
          // right: 100,
          top: 15,
          left: '69%',
          x: 'right',
          icon: 'circle',
          itemHeight: 10,
          itemGap:24,
          // data: ['体重','体脂率']
          textStyle:{
            fontSize:16,
            color: '#ffffff',
          }
        },
        xAxis: [
          {
            show: false,
            type: 'category',
            data: this.xdata,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '体重',
            min: 0,
            max: 120,
            interval: 30,
            splitLine: {
              lineStyle: {
                type:'dashed'
              },
              show:true
            },
            axisTick:{ //y轴刻度线
              show:false
            },
            axisLine:{ //y轴
    	        show:false
            },
            axisLabel: {
              color: "#7F7F7F",
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            // name: '体脂率',
            splitLine: {
              lineStyle: {
                type:'dashed'
              },
              show:true
            },
            axisTick:{ //y轴刻度线
              show:false
            },
            axisLine:{ //y轴
    	        show:false
            },
            min: 0,
            max: 80,
            interval: 20,
            axisLabel: {
              color: "#7F7F7F",
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '体重',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                //颜色渐变
                color: "#2CD9C5",
                barBorderRadius: [5, 5, 0, 0]
              }
            },
            data: this.ydata1
          },
          {
            name: '体脂率',
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
            data: this.ydata2,
            smooth: true
          }
        ]
      }
      )
    },
  },
}
</script>