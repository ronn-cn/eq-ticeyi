<style scoped lang="scss">
.home_view {
  width: (12.8rem-3.59rem);
  height: 100%;
  position: relative;
  &_footer {
    position: absolute;
    width: 98%;
    padding: 0.1rem 1%;
    left: 0;
    bottom: 0;
    .footer_step {
      position: relative;
      ul {
        width: 85%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        li {
          color: #fff;
          width: 24%;
          height: 0.12rem;
          font-size: 0.18rem;
          text-align: center;
          border-radius: 10px;
          background-color: #7f7f7f;
          position: relative;
          margin-bottom: 12px;
        }
        // li::before {
        //   content: '';
        //   border-left: 25px solid #000;
        //   border-top: 25px solid transparent;
        //   border-bottom: 25px solid transparent;
        //   position: absolute;
        //   left: 0;
        //   top: 0;
        // }
        // li::after {
        //   content: '';
        //   border-left: 25px solid #7f7f7f;
        //   border-top: 25px solid transparent;
        //   border-bottom: 25px solid transparent;
        //   position: absolute;
        //   right: -24px;
        //   top: 0;
        //   z-index: 9;
        // }
        // li:nth-last-child(1) {
        // }
        // li:nth-last-child(1)::after {
        //   content: '';
        //   border-left: 25px solid transparent;
        //   border-top: 25px solid transparent;
        //   border-bottom: 25px solid transparent;
        //   position: absolute;
        //   right: 0;
        //   top: 0;
        //   z-index: 9;
        // }

        .view_active {
          background-color: rgb(80, 187, 127);
          color: #000;
          font-weight: 600;
          position: relative;
        }
        // .view_active::after {
        //   content: '';
        //   border-left: 25px solid #fff;
        //   border-top: 25px solid transparent;
        //   border-bottom: 25px solid transparent;
        //   position: absolute;
        //   right: -24px;
        //   top: 0;
        //   z-index: 10;
        // }
      }
      .li_text {
        font-size: 22px;
        color: #fff;
        position: absolute;
        top: -2px;
        right: 0.4rem;
      }
    }
    .footer_start {
      width: 100%;
      height: 1rem;
      display: flex;
      color: #fff;
      justify-content: space-between;
      .quick_start {
        width: 3.26rem;
        height: 100%;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #017aff;
        // box-sizing: border-box;
        // box-shadow: 5px 5px 20px 0px #017aff;
      }
      .start_text1,
      .start_text2 {
        width: 100%;
        border-radius: 5px;
        background: url('~assets/images/common/start.png') no-repeat;
        background-size: 0.4rem 0.5rem;
        background-position: 42%;
        background-color: #1fac4a;
        // box-sizing: border-box;
        // box-shadow: 5px 5px 20px 0px #10c98f,
        //   inset 5px 5px 20px 0px rgba(255, 255, 255, 0.35);
        font-family: '思源黑体 CN', sans-serif;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .start_text2 {
        width: 5.6rem;
        background-position: 38%;
      }
    }
  }
}
.a_iframe {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 20%;
  right: 100px;
  background-color: aqua;
  z-index: 10000;
}
</style>

<template>
  <div>
    <div class="home_view">
      <step-view
        ref="stepview"
        :itemindex="itemindex"
        :viewindex="viewindex"
        :courseState="courseState"
        @setitemindex="setitemindex"
      ></step-view>

      <div class="home_view_footer">
        <div class="footer_step">
          <ul ref="step_ul">
            <li
              v-for="(item, index) of stepList"
              :id="'footer_li' + index"
              :ref="`step_li${index}`"
              :key="item"
              :style="{ width: operatewidth + '%' }"
            ></li>
          </ul>
          <div class="li_text">{{ stepList[viewindex] }}</div>
        </div>
        <div class="footer_start">
          <div
            class="quick_start"
            @click="quickchang"
            v-if="viewindex !== 0 && viewindex < stepList.length - 1"
          >
            <!-- {{ itemindex == 2 ? '重新测试' : '快速开始' }} -->
            快速开始
          </div>
          <div
            :class="
              viewindex !== 0 && viewindex < stepList.length - 1
                ? 'start_text2'
                : 'start_text1'
            "
            @click="initStep"
          >
            {{
              courseState
                ? starttext()
                : itemindex == 2
                ? '开启测试'
                : '开启课程'
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- <audio ref="audio_text" preload="auto">
      <source :src="audiosrc" type="audio/mp3" />
    </audio> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import StepView from '@/components/power/StepView.vue'
export default {
  props: {
    itemindex: {
      type: [Number, String],
    },
  },
  components: {
    StepView,
  },
  data() {
    return {
      viewindex: 0,
      stepList: ['运动风险须知', '课程目标', '器械调试', '动作演示'],
      courseState: false,
      timer: null,
      show: true,
      operatewidth: '24',
      audio_a: null,
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'resStartLesson',
      'publicPath',
      'user_rmvalue',
      'user_rm',
      'userMakeState',
    ]),
  },
  watch: {
    userMakeState(val) {
      if (val) {
        for (let i = 0; i < this.stepList.length; i++) {
          let step = 'step_li' + i
          this.$refs[step][0].setAttribute('class', '')
        }
        this.courseState = false
      }
    },
    itemindex(val) {
      this.viewindex = 0
      if (this.userMakeState) {
        this.$store.commit('set_userMakeState', false) //取消预约
      }
      for (let i = 0; i < this.stepList.length; i++) {
        let step = 'step_li' + i
        this.$refs[step][0].setAttribute('class', '')
      }

      this.courseState = false
      if (val == 0) {
        this.stepList = ['运动风险须知', '课程目标', '器械调试', '动作演示']
        this.operatewidth = '24'
        this.indexAudio('04标准模式')
      } else if (val == 1) {
        this.stepList = ['运动风险须知', '器械调试', '动作演示']
        this.operatewidth = '33'
        this.indexAudio('15自由模式')
      } else if (val == 2) {
        this.indexAudio('09力量测试')
        if (this.user_rmvalue.state) {
          this.stepList = ['运动风险须知', '课程目标']
          this.operatewidth = '49'
        } else {
          this.stepList = ['运动风险须知', '课程目标', '器械调试', '动作演示']
          this.operatewidth = '24'
        }
      }
    },
    resStartLesson(val) {
      if (JSON.stringify(val) == '{}') {
        console.log('空')
      } else {
        console.log('不空', val)
        let color = val.color.split(',')
        let arr = color.map(Number)
        this.send_askLedState({
          r: arr[0],
          g: arr[1],
          b: arr[2],
        })
        this.$store.commit('set_userMakeState', true) //设置用户预约
        const lesson_id = val.lesson.md5
        this.set_lesson_id(lesson_id) //设置课程id
        this.set_MakeCareInfo({ name: val.lesson.name, desc: val.lesson.desc }) //设置提示文字
      }
    },
    courseState(val) {
      if (val) {
        // this.indexAudio('06开始课程')
        this.indexAudio('02请仔细阅读运动风险须知确认并启开')
      }
    },
  },
  created() {},
  mounted() {},

  methods: {
    ...mapMutations(['set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState', 'click_effects']),
    //快速开始
    quickchang() {
      this.click_effects()
      // this.indexAudio('08快速开始')
      setTimeout(() => {
        if (this.itemindex == 2) {
          this.$router.push('/strengthtest')
        } else if (this.itemindex == 1) {
          this.$router.push('/freeplan')
        } else {
          this.$router.push('/trainpage')
        }
      }, 500)
    },
    indexAudio(index) {
      if (!this.audio_a) {
        this.audio_a = new Audio()
      }
      this.audio_a.src = `${this.publicPath}powerStatic/audio/首页/${index}.mp3`
      this.audio_a.play()
    },
    //返回
    setitemindex() {
      if (this.viewindex == 0) {
        this.courseState = false
        document.getElementById(`footer_li0`).setAttribute('class', '')
      } else {
        this.viewindex--
        let uid = `footer_li${this.viewindex + 1}`
        document.getElementById(uid).setAttribute('class', '')
      }
    },
    //开始课程
    initStep() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }

      if (this.courseState) {
        this.audio_a.pause()
        const arr = [
          {
            num: 3,
            route: '/trainpage',
          },
          {
            num: 2,
            route: '/freeplan',
          },
          {
            route: '/strengthtest',
            num: this.user_rmvalue.state ? 1 : 3,
            query: this.user_rmvalue.state
              ? { user_rm: this.user_rmvalue.value, state: true }
              : {},
          },
        ]
        let index = this.itemindex

        if (this.viewindex < arr[index].num) {
          // if (this.viewindex == 0) {
          //   this.indexAudio('11请确认')
          // } else {
          //   this.indexAudio('12下一步')
          // }
          // this.indexAudio('12下一步')
          this.click_effects()
          this.viewindex++
          let uid = `footer_li${this.viewindex}`
          document.getElementById(uid).setAttribute('class', 'view_active')
        } else {
          // this.indexAudio('07开始训练')
          this.click_effects()
          setTimeout(() => {
            this.$router.push({
              path: arr[index].route,
              query: arr[index].query || {},
            })
          }, 500)
        }
      } else {
        this.courseState = true
        let uid = `footer_li0`
        document.getElementById(uid).setAttribute('class', 'view_active')
      }
    },
    starttext() {
      let textArr = []
      if (this.itemindex == 0) {
        textArr = ['已确认', '下一步', '下一步', '开始训练']
      } else if (this.itemindex == 1) {
        textArr = ['已确认', '下一步', '开始训练']
      } else if (this.itemindex == 2) {
        if (this.user_rmvalue.state) {
          textArr = ['已确认', '开始测试']
        } else {
          textArr = ['已确认', '下一步', '下一步', '开始测试']
        }
      }
      return textArr[this.viewindex]
    },
  },
}
</script>
