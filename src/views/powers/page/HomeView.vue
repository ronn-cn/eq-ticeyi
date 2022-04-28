<style scoped lang="scss">
.home_view {
  position: relative;
  &_footer {
    .footer_step {
      width: 1806px;
      position: fixed;
      bottom: 190px;
      left: 60px;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        li {
          color: #fff;
          width: 24%;
          height: 10px;
          font-size: 0.18rem;
          text-align: center;
          border-radius: 10px;
          background-color: #7f7f7f;
          position: relative;
          margin-bottom: 12px;
        }
        .view_active {
          background-color: rgb(80, 187, 127);
          color: #000;
          font-weight: 600;
          position: relative;
        }
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
      height: 131px;
      // background: #28cd41;
      border-radius: 20px;
      display: flex;
      color: #fff;
      justify-content: space-between;
      .quick_start {
        color: #fff !important;
        width: 455px;
        height: 131px;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: none;
        background-color: #017aff;
      }
      .start_text1,
      .start_text2 {
        font-size: 0.26rem;
        width: 100%;
        height: 131px;
        background: #28cd41;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: none;
      }
      .start_text2 {
        width: 1405px;
        background-position: 38%;
      }
      .start_icon {
        position: relative;
      }
      .start_icon::after {
        content: "";
        width: 36px;
        height: 40px;
        background: url("~assets/images/common/shouzhi.svg") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: -50px;
        top: 0;
      }
    }
  }
}
.U_test1 {
  width: 930px !important;
}
.U_test2 {
  width: 1400px !important;
}
.quick_start2 {
  width: 455px;
  height: 131px;
  font-size: 36px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #017aff;
}
</style>

<template>
  <div>
    <div class="home_view"
         :style="courseState ? 'width:1880px' : ''">
      <step-view ref="stepview"
                 :itemindex="itemindex"
                 :viewindex="viewindex"
                 :courseState="courseState"
                 :targetList="targetList"
                 @setitemindex="setitemindex"></step-view>

      <div class="home_view_footer">
        <div class="footer_step"
             v-show="courseState">
          <ul ref="step_ul">
            <li v-for="(item, index) of stepList"
                :id="'footer_li' + index"
                :ref="`step_li${index}`"
                :key="item"
                :style="{ width: operatewidth + '%' }"></li>
          </ul>
        </div>
        <div class="footer_start">
          <van-button class="quick_start"
                      @click="quickchang(), click_effects()"
                      v-if="viewindex !== 0 && viewindex < stepList.length - 1">
            快速开始
          </van-button>
          <div class="quick_start2"
               @click="click_effects(), again_test()"
               v-if="
              itemindex == 2 &&
              viewindex == 0 &&
              loginState &&
              user_rmvalue.state
            ">
            重新测试
          </div>
          <van-button :class="[
              viewindex !== 0 && viewindex < stepList.length - 1
                ? 'start_text2'
                : 'start_text1',testClass
            ]"
                      @click="initStep">
            <span class="start_icon">
              {{
              courseState
                ? starttext()
                : itemindex == 2
                ? loginState && user_rmvalue.state ?'继续训练':'开启测试'
                : '开启课程'
            }}
            </span>
          </van-button>
        </div>
      </div>
    </div>
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
  data () {
    return {
      viewindex: 0,
      stepList: ['运动风险须知', '课程目标', '器械调试', '动作演示'],
      courseState: false,
      timer: null,
      show: true,
      operatewidth: '24',
      audio_a: null,
      targetList: [],
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
      //'coursegroup',
      'projecttype', //类型
      'lesson_id',
    ]),
    testClass () {
      if (this.itemindex == 2 && this.viewindex == 0 && this.loginState) {
        if (this.user_rmvalue.state) {
          if (this.courseState) {
            return 'U_test2'
          } else {
            return 'U_test1'
          }
        }
      }
    }
  },
  watch: {
    loginState (nval) {
      if (!nval) {
        this.targetList = []
      }
    },
    userMakeState (val) {
      if (val) {
        for (let i = 0; i < this.stepList.length; i++) {
          let step = 'step_li' + i
          this.$refs[step][0].setAttribute('class', '')
        }
        this.courseState = false
      }
    },
    itemindex (val) {
      this.viewindex = 0
      if (this.userMakeState) {
        this.$store.dispatch('set_userMakeState', false) //取消预约
      }
      for (let i = 0; i < this.stepList.length; i++) {
        let step = 'step_li' + i
        this.$refs[step][0].setAttribute('class', '')
      }

      this.courseState = false
      if (val == 0) {
        this.stepList = ['运动风险须知', '课程目标', '器械调试', '动作演示']
        this.operatewidth = '24'
        // this.indexAudio('04标准模式')
      } else if (val == 1) {
        this.stepList = ['运动风险须知', '器械调试', '动作演示']
        this.operatewidth = '33'
        // this.indexAudio('15自由模式')
      } else if (val == 2) {
        // this.indexAudio('09力量测试')
        if (this.user_rmvalue.state) {
          this.stepList = ['运动风险须知', '课程目标']
          this.operatewidth = '49'
        } else {
          this.stepList = ['运动风险须知', '器械调试', '动作演示']
          this.operatewidth = '33'
        }
      }
    },
    //预约
    resStartLesson (val) {
      if (JSON.stringify(val) == '{}') {
        console.log('空')
      } else {
        console.log('不空', val)
        let color = val.color.split(',')
        let arr = color.map(Number)
        this.send_askLedState({
          r: arr[0] || 0,
          g: arr[1] || 0,
          b: arr[2] || 0,
        })
        this.$store.dispatch('set_userMakeState', true) //设置用户预约
        const lesson_id = val.lesson.md5
        this.set_lesson_id(lesson_id) //设置课程id
        this.set_MakeCareInfo({ name: val.lesson.name, desc: val.lesson.desc }) //设置提示文字
      }
    },
    courseState (val) {
      // console.log('这是', val)
      this.$emit('set_startStep', val) //传递开始
      if (val) {
        // this.indexAudio('06开始课程')
        this.indexAudio('02请仔细阅读运动风险须知确认并启开')
        this.$store.dispatch('clientstart', {
          lesson_id: this.lesson_id,
          lesson_name: this.projecttype,
        })
      } else {
        //结束测试接口
        this.$store.dispatch('clientEnd')
      }
    },
  },
  created () { },
  mounted () { },
  methods: {
    ...mapMutations(['set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState', 'click_effects']),
    //快速开始
    quickchang () {
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
    indexAudio (index) {
      if (!this.audio_a) {
        this.audio_a = new Audio()
      }
      this.audio_a.src = `${this.publicPath}powerStatic/audio/首页/${index}.mp3`
      this.audio_a.play()
    },
    //返回
    setitemindex () {
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
    initStep () {
      if (this.userMakeState) {
        this.$store.dispatch('set_userMakeState', false) //设置用户预约
        this.$store.dispatch('send_askLedState', { r: 0, g: 0, b: 0 })
      }

      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (this.courseState) {
        this.audio_a.pause()
        if (
          this.viewindex == 0 &&
          this.itemindex == 0 &&
          this.user_rmvalue.state
        ) {
          this.$store.dispatch('send_RM', this.user_rmvalue.value)
        }
        const arr = [
          {
            num: 3,
            route: '/trainpage',
            query: this.user_rmvalue.state
              ? { user_rm: this.user_rmvalue.value, state: true }
              : {},
          },
          {
            num: 2,
            route: '/freeplan',
          },
          {
            route: '/strengthtest',
            num: this.user_rmvalue.state ? 1 : 2,
            query: this.user_rmvalue.state
              ? { user_rm: this.user_rmvalue.value, state: true }
              : {},
          },
        ]
        let index = this.itemindex

        if (this.viewindex < arr[index].num) {
          this.click_effects()
          this.viewindex++
          let uid = `footer_li${this.viewindex}`
          document.getElementById(uid).setAttribute('class', 'view_active')
        } else {
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
    again_test () {
      this.$router.push('/strengthtest')
    },
    starttext () {
      let textArr = []
      if (this.itemindex == 0) {
        textArr = ['已确认', '下一步', '下一步', '开始训练']
      } else if (this.itemindex == 1) {
        textArr = ['已确认', '下一步', '开始训练']
      } else if (this.itemindex == 2) {
        if (this.user_rmvalue.state) {
          textArr = ['已确认', '开始训练']
        } else {
          textArr = ['已确认', '下一步', '开始测试']
        }
      }
      return textArr[this.viewindex]
    },
  },
}
</script>
