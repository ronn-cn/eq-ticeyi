<style scoped lang="scss">
@import "~assets/css/trainpage.scss";

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
</style>

<template>
  <div class="page">
    <div class="page_mo">
      <div class="fixed_left">
        <h1>Al演示参考</h1>
        <div class="progress_rotate_left">
          <k-progress :percent="moloopval"
                      :show-text="false"
                      :line-height="50"
                      :border="false"
                      :color="['#09FBD3', '#FE53BB']"></k-progress>
        </div>
        <!-- <div class="progress_test_left">
          <p class="text_p1">--KG</p>
          <p class="text_p2">目标重量</p>
        </div> -->
      </div>
      <div class="fixed_right">
        <transition name="jojo"
                    appear>
          <div class="audio_text"
               v-if="audioText">{{ audioText }}</div>
        </transition>
        <div class="progress_rotate_right">
          <k-progress :percent="completePercent"
                      :show-text="false"
                      :line-height="50"
                      :border="false"
                      :color="['#09FBD3', '#FE53BB']"></k-progress>
        </div>
        <div class="progress_test_right"
             :class="showActiva">
          <p class="text_p1">{{ traininfo.Weight || 0 }}KG</p>
          <p class="text_p2">完成重量</p>
        </div>
      </div>
    </div>

    <footer class="page_footer">
      <ul>
        <li v-for="(item, index) of footlist"
            :key="item">
          <p class="foot_li_p1">{{ footvalue(index) }}</p>
          <p class="foot_li_p2">{{ item }}</p>
        </li>
      </ul>
    </footer>

    <div @click="btn_click(0), click_effects()"
         class="end_btn"></div>
  </div>
</template>

<script>
import { Dialog, Circle } from 'vant'
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
  data () {
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
      'powerHieght',
    ]),
  },
  watch: {

  },
  created () { },
  mounted () {
    this.loadTrain()
    this.timestart()
    this.loadAudioList()
  },
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_resHeightWeight']),
    ...mapActions(['click_effects']),
    loadAudioList () {
      this.$axios.get(`/powerStatic/js/poweraudio.json`).then((res) => {
        const info = res.data.filter(
          (item) => item.equipment == this.projecttype
        )
        this.audioList = info[0].audioKVs
      })
    },
    //底部value值
    footvalue (item) {
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
    btn_click (index) {
      this.$router.push({
        path: '/endpage',
        query: { timevalue: this.timevalue },
      })

    },
  },
}
</script>
