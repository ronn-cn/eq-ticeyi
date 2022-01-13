<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  // background: rgb(35, 36, 42);
  background-color: #5a4f5f;
}

.page_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1.04rem;
  width: 100%;
  background: #7d89e2;
  color: #ffffff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      width: 20%;
      height: 100%;
      background: #37303a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .foot_li_p1 {
        font-size: 0.34rem;
      }
      .foot_li_p2 {
        font-size: 0.18rem;
        margin-top: 0.16rem;
      }
    }
  }
}
.end_btn {
  border-left: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom: 100px solid #ed4d71;
  border-right: 100px solid transparent;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100px) translateY(-100px) rotate(45deg);
}
.den_icon {
  position: fixed;
  right: 15px;
  top: 25px;
  width: 40px;
  height: 40px;
  background: url('~assets/images/common/home_icon4.png') no-repeat;
  background-size: 100% 100%;
}
::v-deep .el-progress-bar__outer {
  height: 0.13rem !important;
  border-radius: 0 !important;
}
::v-deep .el-progress-bar__inner  {
  border-radius: 0 !important;
}

.popup_close {
  position: fixed;
  left: 26vw;
  top: 25vh;
  z-index: 9;
  width: 42vw;
  height: 26vh;
  padding: 0.4rem 0.2rem;
  border-radius: 15px;
  background-color: #fff;
  .close_p1 {
    color: #000;
    font-size: 42px;
    margin: 0.4rem 0 0.5rem 0;
  }
  .btn_list {
    padding: 0 10%;
    display: flex;
    justify-content: space-between;
  }
  .close_btn1,
  .close_btn2 {
    color: #000;
    display: inline-block;
    margin: 0 10px;
    padding: 20px 0.3rem;
    border-radius: 4px;
    border: 1px solid #000;
  }
  .close_btn2 {
    background-color: #000;
    color: #fff;
    // padding: 20px 10px;
  }
}
.fixed_left,
.fixed_right {
  width: 300px;
  height: 60vh;
  position: fixed;
  right: 0;
  top: 28vh;
  .progress_test_left {
    position: absolute;
    bottom: 14%;
    left: 12%;
  }
  .progress_test_right {
    position: absolute;
    bottom: 14%;
    right: 18%;
  }
  .progress_rotate_left {
    width: 500px;
    transform: rotate(-90deg);
    position: relative;
    top: 200px;
    right: 150px;
  }
  .progress_rotate_right {
    width: 500px;
    transform: rotate(-90deg);
    position: relative;
    top: 200px;
    right: 80px;
  }
}
.fixed_left {
  position: fixed;
  left: 0;
  top: 28vh;
}
.end_test_btn {
  width: 2rem;
  height: 0.6rem;
  background-color: #d1194f;
  position: fixed;
  left: 21vw;
  border-radius: 10px;
  display: flex;
  bottom: 15vh;
  z-index: 9;
  justify-content: center;
  align-items: center;
}
::v-deep #progress_left .ant-progress-circle-trail {
  stroke: #cfd7da !important;
  // color: rgb(#cfd7da);
}
::v-deep .ant-progress-circle-trail {
  stroke: #f03985 !important;
  // color: rgb(#cfd7da);
}
</style>

<template>
  <div class="page">
    <div>
      <footer class="page_footer">
        <ul>
          <li v-for="(item, index) of footlist" :key="item">
            <p class="foot_li_p1">{{ footvalue(index) }}</p>
            <p class="foot_li_p2">{{ item }}</p>
          </li>
        </ul>
      </footer>
      <div class="fixed_left">
        <div class="progress_rotate_left">
          <k-progress
            :percent="100"
            :show-text="false"
            :line-height="30"
            :active="true"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_left">
          <p>目标重量</p>
          <p>--KG</p>
        </div>
      </div>
      <div class="fixed_right">
        <div class="progress_rotate_right">
          <k-progress
            :percent="completePercent"
            :show-text="false"
            :line-height="30"
            :color="['#f5af19', '#fa0a74']"
          ></k-progress>
        </div>
        <div class="progress_test_right">
          <p>完成重量</p>
          <p>{{ traininfo.Weight || 0 }}KG</p>
        </div>
      </div>
    </div>
    <div @click="btn_click(0)">
      <div class="end_btn"></div>
      <div class="den_icon"></div>
    </div>
    <div class="popup_close" v-if="showPopup">
      <p class="close_p1">您的训练时间过短,是否退出当前训练</p>
      <section class="btn_list">
        <div class="close_btn1" @touchstart="popupbtn(0)">结束训练</div>
        <div class="close_btn2" @touchstart="popupbtn(1)">再练一会</div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Format from '@/assets/js/Format'
import { HandleSeatedAbTrainerData } from '@/assets/js/index'
import RestPage from './RestPage.vue'
import RadialProgressBar from 'vue-radial-progress'
import KProgress from 'k-progress'
export default {
  components: {
    RestPage,
    RadialProgressBar,
    KProgress,
  },
  data() {
    return {
      timeMeter: 0,
      timevalue: null, //时间
      // timestate: false,
      traininfo: {},
      // reststate: true, //休息状态
      // totalSteps: 30, //休息时长
      // restweight: 6, //休息重量
      // startstate: false,
      footlist: [
        '训练时间',
        '当前组数/总组数',
        '当前次数/总次数',
        '单次动作评分',
        '训练量',
      ],
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
      showPopup: false,
      targetPercent: 20,
      completePercent: 20,
      audioList: [],
      free_url: '',
      audio_free: null,
    }
  },
  computed: {
    ...mapGetters(['actionValue', 'lesson_id', 'publicPath', 'projecttype']),
  },
  watch: {
    targetPercent: {},
    actionValue(val, oldval) {
      this.$store.commit('set_moheight', val.height)
      let num = val.extra_weight ? val.weight * 6 + 3 : val.weight * 6
      // console.log('当前重量', num)
      this.completePercent = 20 + val.height
      HandleSeatedAbTrainerData(val, num, (e) => {
        // console.log('回调', e)
        this.$store.commit('add_detail', {
          info: e,
          timeMeter: this.timeMeter,
        })
        this.traininfo = e
        let amount = (e.Height / 100) * (e.Weight * 100) * 9.8
        this.traininfo.amount = Math.floor(amount)
        this.$store.commit('set_totalweight', this.traininfo) //计算平均得分

        this.plannum['currentNum'] += 1
        if (this.plannum.currentNum % 3 == 0) {
          if (!this.audio_free) {
            this.audio_free = new Audio()
          }
          let free =
            this.audioList[Math.floor(Math.random() * this.audioList.length)]
          this.audio_free.src = `${this.publicPath}powerStatic/audio/${this.projecttype}/话术弹框/${free}.mp3`
          this.audio_free.play()
        }
      })
    },
  },
  created() {},
  mounted() {
    if (this.lesson_id) {
      this.$store.dispatch('clientstart', {
        lesson_id: this.lesson_id,
        lesson_name: '标准模式',
      })
    } else {
      this.$store.dispatch('clientstart', {
        lesson_id: '445dab66e033da6f0000000000000003',
        lesson_name: '标准模式',
      })
    }

    this.$store.commit('set_couserTimer', {
      type: 'start',
    })

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
      this.$axios.get(`/powerStatic/js/free_audio.json`).then((res) => {
        // console.log(res)
        const info = res.data.filter((item) => item.type == this.projecttype)
        this.audioList = info[0].data
      })
    },
    //时间计时
    timestart() {
      this.windowtimer = setInterval(() => {
        this.timeMeter += 0.1
        this.timevalue = Format.FormatTime(this.timeMeter.toFixed())
      }, 100)
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
      this.showPopup = true
    },
    //弹框事件
    popupbtn(type) {
      if (type == 0) {
        this.$router.push({
          path: '/endpage',
          query: { reneging: 1, timevalue: this.timevalue },
        })
      } else {
        this.showPopup = false
      }
    },
  },
}
</script>
