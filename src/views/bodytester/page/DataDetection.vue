<style scoped lang="scss">
.data_cover {
  font-family: 'SourceHanSansSC';
  width: 100%;
  height: 100%;
  background: #2f3443;
  // background: linear-gradient(180deg, #323647 0%, #222631 100%);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
}

.detection_container {
  display: flex;
  justify-content: space-between;
  width: 86%;
  margin: auto;

  .body_view {
    .progress_num {
      z-index: 1;
      position: fixed;
      left: 49%;
      top: 22%;
      // color: #18fefe;
    }

    p {
      color: #aaaaaa;
      font-size: 24px;
      position: relative;
      bottom: 10px;
    }
  }

  .text_message {
    width: 379px;
    height: 600px;
    background: rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 50px 40px 20px 40px;

    .message_icon {
      height: 40px;
      background: url("~assets/images/bodytester/message_icon.svg") no-repeat;
      background-position: top right;
    }

    ul {
      li {
        color: #18fefe;
        font-size: 28px;
        text-align: left;
        margin-bottom: 28px;
      }
    }
  }
}

.home_back {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom: 100px solid #ff3b30;
  border-right: 100px solid transparent;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100px) translateY(-100px) rotate(45deg);
}

.home_back::before {
  // content: "";
  // position: absolute;
  // left: -30px;
  // top: 30px; 
  // width: 0.4rem;
  // height: 0.4rem;
  // background: url("~assets/images/common/close.png") no-repeat;
  // background-size: 100% 100%;
  // transform: rotate(314deg);
  
  content: "";
  width: 25px;
  height: 25px;
  background: url("~assets/images/common/home_icon4.png") no-repeat;
  background-size: cover;
  position: absolute;
  left: -6px;
  top: 46px;
  transform: rotate(45deg);
}

.threemo {
  width: 4rem;
  height: 5.25rem;
  // background: #1a442a;
  position: relative;

  
  .back_image {
    width: 650px;
    height: 650px;
    position: absolute;
    top:40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: -25px;
    z-index: 1;
  }

  .base_image {
    width: 528px;
    height: 478px;
    position: absolute;
    bottom: 0;
    left: 40px;
    // background: url("/bodytesterStatic/images/test_2.svg") no-repeat;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 80px;
    z-index: 1;
    // background: #18fefe;
  }
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

//
header {
  padding-top: 62px;
  padding-bottom: 35px;

  .header_cover {
    width: 539px;
    height: 146px;
    // background: url("~assets/images/bodytester/01.png") no-repeat;
    background: url("~assets/images/bodytester/testdate1.svg") no-repeat;
    background-size: 100% 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.tips {
  .tips_item {
    padding: 12px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 48px;

    .tips_padding {
      width: 395px;
      height: 165px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      background: url("~assets/images/bodytester/01.svg") no-repeat;
      background-size: 100% 100%;

      .tips_icon {
        width: 42px;
        height: 42px;
        margin-right: 13px;
        // background: #1a442a;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .tips_text {
        color: #18fefe;
        text-align: left;
        letter-spacing: 4px;
        font-size: 24px;
        line-height: 38px;
      }
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .block {
    width: 660px;
    height: 250px;
    padding: 60px 100px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
      font-size: 36px;
      color: #000;
    }

    .block_bottom {
      display: flex;
      justify-content: space-between;
    }

    .block_btn1,
    .block_btn2 {
      font-size: 32px;
      width: 200px;
      height: 75px;
      border-radius: 20px;
    }

    .block_btn1 {
      color: #ff3b30;
      border: 2px solid #ff3b30;
    }
  }
}
</style>

<template>
  <div class="data_cover">
    <header>
      <div class="header_cover">
        <h1 style="margin-bottom:10px">?????????????????????</h1>
        <p>The test of body composition</p>
      </div>
    </header>
    <div class="detection_container">
      <section class="tips">
        <div v-for="(item, index) of tipsList" :key="index" class="tips_item">
          <div class="tips_padding">
            <div class="tips_icon" :style="{backgroundImage: `url(${publicPath}bodytesterStatic/images/${item.icon}.svg)`,}"></div>
            <p class="tips_text">{{ item.text }}</p>
          </div>
        </div>
      </section>

      <section class="body_view">
        <div class="progress_num">
          <countTo :startVal="progress.startVal" :endVal="progress.endVal" :useEasing="false" :duration="500"></countTo> %
        </div>
        <div class="threemo">
          <div class="back_image" :style="{ backgroundImage: `url(${publicPath}bodytesterStatic/images/body.png)`,}"></div>
          <div class="base_image" :style="{ backgroundImage: `url(${publicPath}bodytesterStatic/images/test_2.svg)`,}"></div>
        </div>
        <p>????????????????????????????????????????????????</p>
      </section>
      <section class="text_message">
        <div class="message_icon"></div>
        <ul class="message_ul">
          <li v-for="(item, index) of massageList" :key="item.title" v-show="item.state">
            {{ item.title }}
            
            <div v-if="index == 1" style="color: red;" v-html="heightWarnState ? item.warnTip:''"></div>
            <div v-if="index == 2" style="color: red;" v-html="weightWarnState ? item.warnTip:''"></div>
            <span v-if="index == 4"> {{ bodyfat ? '?????????' : '?????????' }} </span>
            
            <div v-if="index == 4" style="color: red;" v-html="electricWarnState ? item.warnTip:''"></div>
            <span v-if="index == 5">
              <countTo :startVal="connected.startVal" :endVal="connected.endVal" :duration="3000"></countTo> %
            </span>
            <span v-if="index == 7">
              <countTo :startVal="testingNum.startVal" :endVal="testingNum.endVal" :duration="3000"></countTo> %
            </span>
          </li>
        </ul>
      </section>
    </div>

    <audio ref="audio_A" id="myaudio" v-if="voicestate">
      <source :src="audiosrc" type="audio/mp3" />
    </audio>
    <div class="home_back" @click="showFrame = true"></div>

    <van-overlay :show="showFrame" @click="showFrame = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p>????????????????????????,????????????????????????</p>
          <div class="block_bottom">
            <van-button class="block_btn1" @click="backhome()">????????????</van-button>
            <van-button class="block_btn2" @click="showFrame = false" color="#28CD41">????????????</van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant'
import countTo from '/node_modules/vue-count-to/src/vue-countTo'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import api from '@/api/api'
export default {
  components: { countTo, VanOverlay: Overlay },
  data() {
    return {
      massageList: [
        {
          title: '?????????????????????---',
          state: false,
        },
        {
          title: '??????????????????????????????',
          state: false,
          warnTip: "<p>??????????????????</p><p>????????????????????????????????????</p>",
          failTip: '????????????'
        },
        {
          title: '??????????????????????????????',
          state: false,
          warnTip: "<p>??????????????????</p><p>??????????????????????????????????????????</p>",
          failTip: '????????????'
        },
        {
          title: '?????????????????????',
          state: false,
        },
        {
          title: '??????????????????---',
          state: false,
          warnTip: "<p>???????????????????????????????????????????????????????????????</p>",

        },
        {
          title: '??????????????????---?????????',
          state: false,
        },
        {
          title: '????????????',
          state: false,
        },
        {
          title: '?????????---',
          state: false,
        },
        {
          title: '?????????',
          state: false,
        },
        {
          title: '????????????',
          state: false,
        },
      ],
      // timernum: 3,
      bodyfat: false,
      heightWarnState: false, 
      heightFailState: false,
      
      weightWarnState: false, 
      weightFailState: false,
      
      electricWarnState: false, 
      electricFailState: false,
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
      tipsList: [
        {
          icon: 'icon_1',
          text: '???????????????????????????,??????????????????',
        },
        {
          icon: 'icon_2',
          text: '??????????????????,?????????????????????????????????',
        },
        {
          icon: 'icon_3',
          text: '????????????????????????????????????????????????????????????',
        },
      ],
      showFrame: false
    }
  },
  created() {
  },
  mounted() {
    console.log("mounted Side log:", this.user_side_log)
    this.get_user_side_log()
    this.initload()
    setTimeout(() => {
      // this.audiosrc = `${this.publicPath}bodytesterStatic/audio/????????????.mp3`
      // this.audio_play()
      this.$store.commit('set_screenstate', true)
      this.SEND_SOCKET('{"cmd":"askMeasureHeight"}') //??????????????????
      setTimeout(() => {
        console.log("RUN_HEIGHT:",this.RUN_HEIGHT)
        // console.log("this.massageList[2].state",this.massageList[1].title)
        if(this.massageList[2].state == false){
          this.heightWarnState = true;
        }
      }, 5000)
    }, 1000)
  },
  //????????????
  destroyed: function () {
    this.$store.commit('set_screenstate', false)
  },
  watch: {
    //????????????
    RUN_HEIGHT: {
      handler(newName, oldName) {
        if (newName.state) {
          this.heightWarnState = false;
          this.massageList[2].state = true
          this.audiosrc = `${this.publicPath}bodytesterStatic/audio/????????????.mp3`
          this.audio_play()
          this.progress.endVal = 20
          // console.log('????????????')
          this.SEND_SOCKET('{"cmd":"askStopMeasureHeight"}') //??????????????????
          setTimeout(() => {
            this.SEND_SOCKET('{"cmd":"askMeasureWeight"}') //??????????????????
            setTimeout(() => {
              if(this.massageList[3].state == false){
                this.weightWarnState = true;
              }
            }, 5000)
          }, 1000)
          // setTimeout(() => { 
          //   // console.log(123, this.LOCK_WEIGHT.status)
          //   if (!this.LOCK_WEIGHT.status) {
          //     this.SEND_SOCKET('{"cmd":"askWeightState"}')
          //   }
          // }, 5000)
          this.updateProgress('25')
        }
      },
      immediate: true,
      deep: true,
    },
    //????????????
    LOCK_WEIGHT: {
      handler(newName, oldName) {
        if (newName.status) {
          this.weightWarnState = false;
          this.audiosrc = `${this.publicPath}bodytesterStatic/audio/????????????.mp3`
          this.audio_play()
          this.progress.endVal = 40
          this.massageList[3].state = true
          setTimeout(() => {
            this.massageList[4].state = true
          }, 500)
          this.SEND_SOCKET('{"cmd":"askMeasureImpedance"}')
          setTimeout(() => {
            if(this.massageList[5].state == false){
              this.electricWarnState = true;
            }
          }, 5000)
          this.updateProgress('50')
        }
      },
      immediate: true,
      deep: true,
    },
    impedance(val, oldval) {
      console.log('??????', val)
      this.bodyfat = true
      this.electricWarnState = false
      this.massageList[5].state = true
      this.progress.endVal = 85
      this.updateProgress('75')
    },
    //????????????
    bodydata: {
      handler(newName, oldName) {
        this.progress.endVal == 70
        this.audiosrc = `${this.publicPath}bodytesterStatic/audio/????????????.mp3`
        this.audio_play()
        this.massageList[9].state = true
        this.updateProgress('100')
        setTimeout(() => {
          this.$store.commit('set_testState', false)
          this.$router.push('/testingend')
        }, 3000)
      },
      // immediate: true,
      deep: true,
    },
    massageList: {
      handler(val, oldval) {
        for (let item in val) {
          if (!val[item].state) {
            if (item == '5' || item == '7') {
              setTimeout(() => {
                // this.massageList[item].state = true
                if (item == '5') {
                  this.progress.endVal = 50 //??????????????????
                  this.connected.endVal = 96
                  setTimeout(() => {
                    let i = Number(item) + 1
                    this.massageList[i].state = true
                  }, 2000)
                } else {
                  this.progress.endVal = 100 //??????????????????
                  this.testingNum.endVal = 98
                  this.massageList[item].state = true
                  setTimeout(() => {
                    let i = Number(item) + 1
                    this.massageList[i].state = true
                  }, 2000)
                }
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
      'user_side_log'
    ]),
  },
  methods: {
    ...mapMutations(['SEND_SOCKET']),
    ...mapActions(['get_user_side_log']),
    initload() {
      this.massageList[0].state = true

      setTimeout(() => {
        this.massageList[1].state = true
        this.audiosrc = `${this.publicPath}bodytesterStatic/audio/????????????.mp3`
        this.audio_play()
        console.log('????????????')
      }, 1000)
    },
    sendBodyData() {
      let SEX = this.user_sex == 2 ? 0 : 1,
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
      this.$store.commit('clear_bodydata')
      this.$store.dispatch('clientEnd') //????????????
      this.$router.push('/')
    },
    //????????????
    async updateProgress(percentage) {
      const rs = await api.post('/update-progressbar', {
        ouid: this.ouid,
        percentage,
      })
      if (rs.data.code == '200') {
        console.log(`??????????????????--??????${percentage}%`)
      }
    },
  },
}
</script>
