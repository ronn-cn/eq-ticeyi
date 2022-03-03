<style scoped lang="scss">
@import '~assets/css/trainpage.scss';

.page_mo {
  width: 1920px;
  height: 919px;
  display: flex;
  .fixed_left {
    width: 50%;
    height: 100%;
    background: #161616;
    position: relative;
    h1 {
      color: #aaaaaa;
      position: absolute;
      left: 444px;
      top: 80px;
      z-index: 9;
    }
  }
  .fixed_right {
    width: 50%;
    height: 100%;
    background: #303445;
    position: relative;
    h1 {
      position: absolute;
      left: 444px;
      top: 80px;
      z-index: 9;
    }
  }
}

// .audio_text {
//   width: 600px;
//   position: fixed;
//   right: 270px;
//   bottom: 170px;
//   z-index: 999;
// }
// .freejojo-leave-active {
//   animation: jojo 0.5s linear;
// }
// @keyframes jojo {
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// }
</style>

<template>
  <div class="page">
    <div class="page_mo">
      <div class="fixed_left">
        <h1>Al演示参考</h1>
        <div class="progress_rotate_left">
          <k-progress
            :percent="moloopval"
            :show-text="false"
            :line-height="30"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_left">
          <van-circle
            v-model="currentRate"
            :rate="100"
            size="130"
            stroke-width="70"
            color="#C4C4C4"
          />
          <p class="text_p1">--KG</p>
          <p class="text_p2">目标重量</p>
        </div>
      </div>
      <div class="fixed_right">
        <!-- <h1>{{ planText[this.planstate] }}</h1> -->
        <transition name="jojo" appear>
          <div class="audio_text" v-if="audioText">{{ audioText }}</div>
        </transition>
        <div class="progress_rotate_right">
          <k-progress
            :percent="completePercent"
            :show-text="false"
            :line-height="30"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_right">
          <van-circle
            v-model="currentRate"
            :rate="100"
            size="130"
            stroke-width="70"
            :color="fin_weight"
          />
          <p class="text_p1">{{ traininfo.Weight || 0 }}KG</p>
          <p class="text_p2">完成重量</p>
        </div>
      </div>
    </div>

    <footer class="page_footer">
      <ul>
        <li v-for="(item, index) of footlist" :key="item">
          <p class="foot_li_p1">{{ footvalue(index) }}</p>
          <p class="foot_li_p2">{{ item }}</p>
        </li>
      </ul>
    </footer>

    <div @click="btn_click(0)" class="end_btn"></div>
  </div>
</template>

<script>
import { Dialog, Circle } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
import train from '@/power/train/index.js'
import Trainaudio from '@/power/common/Trainaudio.js'
export default {
  components: {
    RestPage,
    RadialProgressBar,
    KProgress,
    VanCircle: Circle,
  },
  data() {
    return {
      fin_weight: '#C4C4C4',
      currentRate: 0,
      traininfo: {},
      restinfo: {
        group: 1,
        weight: 12,
        num: 20,
      },
      //次数
      plannum: {
        totalNum: 0,
        currentNum: 0,
      },
      planstate: 0, //0热身组 1极限组 2负重组 3金字塔组 4.辅助组
      targetPercent: 0,
      completePercent: 0,
      targetdown: null,
      audioList: [],
      audio_free: null,
      audioText: '',
    }
  },
  mixins: [train, Trainaudio],
  computed: {
    ...mapGetters([
      'actionValue',
      'lesson_id',
      'publicPath',
      'evenfPublic',
      'projecttype',
      'moloopval',
    ]),
  },
  watch: {
    audioText(ntext) {
      setTimeout(() => {
        this.audioText = ''
      }, 2500)
    },
    // plannum: {
    //   handler(nval) {
    //     if (this.plannum.currentNum % 3 == 0) {
    //       if (!this.audio_free) {
    //         this.audio_free = new Audio()
    //       }
    //       let free =
    //         this.audioList[Math.floor(Math.random() * this.audioList.length)]
    //       this.audioText = free.content

    //       this.audio_free.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${free.number}.mp3`
    //       this.audio_free.play()
    //     }
    //   },
    //   deep: true,
    // },
    actionValue(val, oldval) {
      this.$store.commit('set_moheight', val.height)
      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6
      if (val.height > 5) {
        this.completePercent = 20 + val.height
      } else {
        this.completePercent = 0
      }
      HandleSeatedAbTrainerData(val, num, (e) => {
        // console.log('当前重量', num, e)
        this.$store.commit('add_detail', {
          info: e,
          timeMeter: this.timeMeter,
        })

        this.traininfo = e
        let amount = (e.Height / 100) * e.Weight * 9.8
        this.traininfo.amount = Math.floor(amount)
        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        let percent = Math.round(e.Percent * 100)
        this.$store.commit('set_echartData', percent) //图表

        this.plannum['currentNum'] += 1

        if (this.plannum.currentNum % 3 == 0) {
          if (!this.audio_free) {
            this.audio_free = new Audio()
          }
          let free =
            this.audioList[Math.floor(Math.random() * this.audioList.length)]
          this.audioText = free.content

          this.audio_free.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${free.number}.mp3`
          this.audio_free.play()
        }
      })
    },
  },
  created() {},
  mounted() {
    // this.initStart()
    this.loadTrain()
    this.timestart()
    this.loadAudioList()
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('set_couserTimer', {
      type: 'end',
    })
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    loadAudioList() {
      this.$axios.get(`/powerStatic/js/poweraudio.json`).then((res) => {
        const info = res.data.filter(
          (item) => item.equipment == this.projecttype
        )
        this.audioList = info[0].audioKVs
      })
    },
    //底部value值
    footvalue(item) {
      switch (item) {
        case 0:
          return this.timevalue || '00.00'
        case 1:
          return '-- / -- '
        case 2:
          return this.plannum.currentNum + ' / --'
        case 3:
          let num = this.traininfo.Percent
          if (num) {
            return Math.round(num * 100)
          }
          return 0
        case 4:
          return this.traininfo.amount || 0
      }
    },
    //按钮事件
    btn_click(index) {
      this.$router.push({
        path: '/endpage',
        query: { timevalue: this.timevalue },
      })

      // this.plannum.currentNum += 1
      // this.recordScore = {
      //   data: new Date().getTime(),
      //   score: 'B',
      // }
    },
  },
}
</script>
