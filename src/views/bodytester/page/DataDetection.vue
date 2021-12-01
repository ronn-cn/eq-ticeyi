<style scoped lang="scss">
.header_title {
  font-size: 0.36rem;
  padding-top: 0.37rem;
  z-index: 1;
}
.data_cover {
  width: 100%;
  height: 100%;
  background-color: #25293c;
}
.detection_container {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1.28rem 0 1.42rem;
  .body_view {
    h2 {
      font-size: 0.36rem;
      font-weight: 500;
      color: #40f9ef;
    }
    &_core {
      width: 4.97rem;
      height: 5.25rem;
      margin-top: 0.1rem;
      background-size: 100% 100%;
    }
    p {
      margin-top: 0.06rem;
      font-size: 0.16rem;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.4;
    }
  }
  .text_message {
    width: 4.16rem;
    height: 5.72rem;
    background-size: 100% 100%;
    ul {
      li {
        font-size: 0.2rem;
        text-align: left;
        padding-left: 1rem;
        margin: 0.2rem 0;
      }
    }
  }
}
.testbody {
  width: 80%;
  height: 30%;
  margin: auto;
  background-size: inherit;
  animation: beating 6s linear infinite;
}
@keyframes beating {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(80px);
  }
  20% {
    transform: translateY(160px);
  }
  30% {
    transform: translateY(240px);
  }
  40% {
    transform: translateY(320px);
  }
  50% {
    transform: translateY(400px);
  }
  60% {
    transform: translateY(320px);
  }
  70% {
    transform: translateY(240px);
  }
  80% {
    transform: translateY(160px);
  }
  90% {
    transform: translateY(80px);
  }
  100% {
    transform: translateY(0px);
  }
}
.home_back {
  width: 0.62rem;
  height: 0.6rem;
  background: rgba(103, 117, 217, 0.3);
  border: 1px solid #89b2e7;
  opacity: 0.5;
  border-radius: 0.3rem;
  position: fixed;
  top: 0.25rem;
  right: 0.24rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  &_img {
    position: relative;
    left: -0.04rem;
    width: 0.32rem;
  }
}
</style>

<template>
  <div class="data_cover">
    <h1 class="header_title">身体数据检测中</h1>
    <div class="detection_container">
      <section class="body_view">
        <h2>
          <countTo
            :startVal="progress.startVal"
            :endVal="progress.endVal"
            :useEasing="false"
            :duration="500"
          ></countTo>
          %
        </h2>
        <div
          class="body_view_core"
          :style="{
            backgroundImage:
              'url(' +
              `${publicPath}bodytesterStatic/images/body_view1.png ` +
              ')',
          }"
        >
          <div
            class="testbody"
            :style="{
              backgroundImage: `url(${publicPath}bodytesterStatic/images/testbody.png)`,
            }"
          ></div>
        </div>
        <p>请勿松开手柄，可能会导致测试中断</p>
      </section>
      <section
        class="text_message"
        :style="{
          backgroundImage: `url(${publicPath}bodytesterStatic/images/body_view3.png)`,
        }"
      >
        <ul class="message_ul">
          <li
            v-for="(item, index) of massageList"
            :key="item.title"
            v-show="item.state"
          >
            {{ item.title }}
            <span v-if="index == 3">
              {{ bodyfat ? '无异常' : '测试中' }}
            </span>
            <span v-if="index == 5">
              <countTo
                :startVal="connected.startVal"
                :endVal="connected.endVal"
                :duration="3000"
              ></countTo>
              %
            </span>
            <span v-if="index == 7">
              <countTo
                :startVal="testingNum.startVal"
                :endVal="testingNum.endVal"
                :duration="3000"
              ></countTo>
              %
            </span>
          </li>
        </ul>
        <!-- <button @click="tizhi">体脂</button> -->
        <!-- <button @click="sendBodyData">各项数据</button> -->
      </section>
    </div>
    <audio ref="audio_A" id="myaudio" v-if="voicestate">
      <source :src="audiosrc" type="audio/mp3" />
    </audio>
    <div class="home_back" @click="backhome">
      <img
        :src="`${publicPath}bodytesterStatic/images/view_back.png`"
        class="home_back_img"
      />
    </div>
  </div>
</template>

<script>
import countTo from '/node_modules/vue-count-to/src/vue-countTo'
// import countTo from 'vue-count-to'
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api/api'
export default {
  components: { countTo },
  data() {
    return {
      massageList: [
        {
          title: '体测仪开始测试',
          state: false,
        },
        {
          title: '开始测量身高',
          state: false,
        },
        {
          title: '开始测量体重',
          state: false,
        },
        {
          title: '生物电流接触--',
          state: false,
        },
        {
          title: '进行人体连接',
          state: false,
        },
        {
          title: '连通率为',
          state: false,
        },
        {
          title: '开始检测',
          state: false,
        },
        {
          title: '检测中---',
          state: false,
        },
        {
          title: '同步中',
          state: false,
        },
        {
          title: '检测完成',
          state: false,
        },
      ],
      // timernum: 3,
      bodyfat: false,
      timer: null,
      connected: {
        startVal: 0,
        endVal: 0,
      },
      testingNum: {
        startVal: 0,
        endVal: 0,
      },
      progress: {
        startVal: 0,
        endVal: 0,
      },
      audiosrc: '',
    }
  },
  created() {
    this.$store.dispatch('clientstart', '445dab66e033da6f0000000000000001')
    this.$store.commit('set_screenstate', true)
  },
  mounted() {
    this.initload()
    setTimeout(() => {
      this.audio_play()
    }, 1000)
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('set_screenstate', false)
  },
  watch: {
    //监听身高
    RUN_HEIGHT: {
      handler(newName, oldName) {
        if (newName.state) {
          this.massageList[2].state = true
          this.audiosrc = `${this.publicPath}bodytesterStatic/audio/测量体重.mp3`
          this.audio_play()
          this.progress.endVal += 20
          console.log('测量体重')
          this.SEND_SOCKET('{"cmd":"askMeasureWeight"}')
          this.updateProgress('25')
        }
      },
      immediate: true,
      deep: true,
    },
    //监听体重
    LOCK_WEIGHT: {
      handler(newName, oldName) {
        if (newName.state == 6) {
          this.audiosrc = `${this.publicPath}bodytesterStatic/audio/测量体质.mp3`
          this.audio_play()
          this.progress.endVal += 20
          console.log('测量体脂')
          this.massageList[3].state = true
          this.SEND_SOCKET('{"cmd":"askMeasureImpedance"}')
          this.updateProgress('50')
        }
      },
      immediate: true,
      deep: true,
    },
    //监听数据
    bodydata: {
      handler(newName, oldName) {
        this.progress.endVal += 20
        this.audiosrc = `${this.publicPath}bodytesterStatic/audio/生成数据.mp3`
        this.audio_play()
        this.massageList[9].state = true
        this.updateProgress('100')
        setTimeout(() => {
          this.$router.push('/testingend')
        }, 3000)
      },
      // immediate: true,
      deep: true,
    },
    impedance(val, oldval) {
      console.log('体脂', val)
      this.bodyfat = true
      this.massageList[4].state = true
      this.progress.endVal += 10
      this.updateProgress('75')
    },
    massageList: {
      handler(val, oldval) {
        for (let item in val) {
          if (!val[item].state) {
            // if (item == "4") {
            //   setTimeout(() => {
            //     this.massageList[item].state = true;
            //   }, 1500);
            // }
            if (item == '5' || item == '7') {
              setTimeout(() => {
                this.progress.endVal += 15 //总进度百分比
                this.massageList[item].state = true
                if (item == 5) {
                  this.connected.endVal = 96
                } else {
                  this.testingNum.endVal = 98
                }
                setTimeout(() => {
                  let i = Number(item) + 1
                  this.massageList[i].state = true
                }, 3500)
              }, 1500)
            }
            if (item == '9') {
              this.sendBodyData()
            }
            break
          }
        }
      },
      // immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'RUN_HEIGHT',
      'LOCK_WEIGHT',
      'bodydata',
      'user_sex',
      'user_age',
      'impedance',
      'voicestate',
      'ouid',
      'publicPath',
    ]),
  },
  methods: {
    ...mapMutations(['SEND_SOCKET']),
    initload() {
      this.massageList[0].state = true

      setTimeout(() => {
        this.massageList[1].state = true
        this.audiosrc = `${this.publicPath}bodytesterStatic/audio/测量身高.mp3`
        this.audio_play()
        console.log('测量身高')
      }, 1000)
    },
    sendBodyData() {
      let SEX = this.user_sex,
        AGE = this.user_age,
        RUN_HEIGHT = this.RUN_HEIGHT.height,
        LOCK_WEIGHT = this.LOCK_WEIGHT.weight
      console.log(
        '{"cmd":"askMeasureBodyData","data":{"sex":' +
          SEX +
          ',"age":' +
          AGE +
          ',"height":' +
          RUN_HEIGHT +
          '.0,"weight":' +
          LOCK_WEIGHT +
          '}}'
      )
      this.SEND_SOCKET(
        '{"cmd":"askMeasureBodyData","data":{"sex":' +
          SEX +
          ',"age":' +
          AGE +
          ',"height":' +
          RUN_HEIGHT +
          '.0,"weight":' +
          LOCK_WEIGHT +
          '}}'
      )
    },
    audio_play() {
      if (this.voicestate) {
        var audio = document.getElementById('myaudio')
        audio.load()
        audio.play()
      }
    },
    backhome() {
      this.$store.dispatch('clientEnd')
      this.$emit('setdatastate', false)
      // this.$emit("init_qrcode", this.Qrcode);
    },
    //进度更新
    async updateProgress(percentage) {
      const rs = await api.post('/update-progressbar', {
        ouid: this.ouid,
        percentage,
      })
      if (rs.data.code == '200') {
        console.log(`进度更新完成--进度${percentage}%`)
      }
    },
  },
}
</script>
