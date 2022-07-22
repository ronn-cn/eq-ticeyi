<style scoped lang="scss">
.home_view {
  position: relative;
  &_footer {
    // .footer_step {
    //   width: 1806px;
    //   position: fixed;
    //   bottom: 190px;
    //   left: 60px;
    //   ul {
    //     width: 100%;
    //     display: flex;
    //     justify-content: space-between;
    //     margin-bottom: 0;
    //     li {
    //       color: #fff;
    //       width: 24%;
    //       height: 10px;
    //       font-size: 0.18rem;
    //       text-align: center;
    //       border-radius: 10px;
    //       background-color: #7f7f7f;
    //       position: relative;
    //       margin-bottom: 12px;
    //     }
    //     .view_active {
    //       background-color: rgb(80, 187, 127);
    //       color: #000;
    //       font-weight: 600;
    //       position: relative;
    //     }
    //   }
    //   .li_text {
    //     font-size: 22px;
    //     color: #fff;
    //     position: absolute;
    //     top: -2px;
    //     right: 0.4rem;
    //   }
    // }

    .footer_start {
      width: 100%;
      height: 131px;
      // background: #28cd41;
      border-radius: 20px;
      display: flex;
      color: #fff;
      justify-content: space-between;
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
.quick_start_no {
  background: rgb(138, 194, 255);
}
.start_text_no {
  background: rgb(156, 232, 168) !important;
}
// .quick_start2 {
//   width: 455px;
//   height: 131px;
//   font-size: 36px;
//   font-family: SourceHanSansCN;
//   font-weight: 400;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 20px;
//   background-color: #017aff;
// }
</style>

<template>
  <div>
    <div class="home_view"
         :style="courseState ? 'width:1880px' : ''">
      <step-view ref="stepview"
                 :itemindex="itemindex"
                 :viewindex="viewindex"
                 :stepNum="stepNum"
                 :courseState="courseState"
                 :targetList="targetList"
                 @set_stepNum="stepNum = 2"
                 @setitemindex="setitemindex"></step-view>

      <div class="home_view_footer">
        <div class="footer_start">
          <van-button :class="['quick_start',stepNum == 1 ? 'quick_start_no':'']"
                      @click="quickChang(),click_effects()"
                      v-if="stepNum != 0 && stepNum != 4">
            {{ quickText }}
          </van-button>
          <!-- <div class="quick_start2"
               @click="click_effects(), again_test()"
               v-if="
              itemindex == 2 &&
              viewindex == 0 &&
              loginState &&
              user_rmvalue.state
            ">
            重新测试
          </div> -->
          <!-- <van-button :class="
           [ stepNum !== 0  ? 'start_text2': 'start_text1']"
                      @click="initStep">
            <span class="start_icon">
              {{ courseState? starttext(): '点击开始训练'}}
            </span>
          </van-button> -->
          <van-button :class="[stepNum == 0 || stepNum == 4 ? 'start_text1':'start_text2',stepNum == 1?'start_text_no':'']"
                      @click="initStep(),click_effects()">
            <span class="start_icon">{{ starttext() }} </span>
          </van-button>

        </div>
      </div>
    </div>
    <OverlayQR v-if="isOverQr"
               @closeqr="closeqr"></OverlayQR>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import StepView from '@/components/power/StepView.vue'
import OverlayQR from '@/components/power/OverlayQR.vue'
export default {
  props: {
    itemindex: {
      type: [Number, String],
    },
  },
  components: {
    StepView,
    OverlayQR
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
      //新的修改
      isOverQr: false,
      stepNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'resStartLesson',
      'publicPath',
      'user_rmvalue',
      'userMakeState',
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
    },
    quickText () {
      if (this.stepNum == 1) {
        return '新手指导'
      } else if (this.stepNum == 2) {
        return '新手指导'
      } else if (this.stepNum == 3) {
        return '快速开始'
      }
    }
  },
  watch: {
    isOverQr (val) {
      if (!val) {
        if (this.itemindex == 0) {
          this.courseState = true
          this.stepNum = 1
        } else if (this.itemindex == 1) {
          this.$router.push('/freeplan')
        } else if (this.itemindex == 2) {
          this.$router.push({
            path: '/trainpage',
            query: this.user_rmvalue.state
              ? { user_rm: this.user_rmvalue.value, state: true }
              : {},
          })
        }
      }
    },
    loginState (nval) {
      if (!nval) {
        this.targetList = []
      }
    },
    // userMakeState (val) {
    //   if (val) {
    //     for (let i = 0; i < this.stepList.length; i++) {
    //       let step = 'step_li' + i
    //       this.$refs[step][0].setAttribute('class', '')
    //     }
    //     this.courseState = false
    //   }
    // },
    itemindex (val) {
      this.viewindex = 0
      this.courseState = false
      if (this.userMakeState) {
        this.$store.dispatch('set_userMakeState', false) //取消预约
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
        this.set_MakeCareInfo({ name: val.lesson.name, desc: val.lesson.desc, color: val.color }) //设置提示文字
      }
    },
    courseState (val) {
      this.$emit('set_startStep', val) //传递开始
      if (val) {
        // this.indexAudio('02请仔细阅读运动风险须知确认并启开')
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
    quickChang () {
      // this.audio_a.pause()
      if (this.stepNum == 2) {
        this.stepNum = 3
      } else if (this.stepNum == 3) {
        this.$router.push({
          path: '/trainpage',
          query: this.user_rmvalue.state
            ? { user_rm: this.user_rmvalue.value, state: true }
            : {}
        })
      }
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
      console.log(this.stepNum)
      if (this.stepNum == 1) {
        this.courseState = false
        this.stepNum = 0
      } else {
        this.stepNum -= 1
      }
      // if (this.viewindex == 0) {
      //   this.courseState = false
      //   document.getElementById(`footer_li0`).setAttribute('class', '')
      // } else {
      //   this.viewindex--
      //   let uid = `footer_li${this.viewindex + 1}`
      //   document.getElementById(uid).setAttribute('class', '')
      // }
    },
    //开始课程
    initStep () {
      this.click_effects()
      //加个清楚上个音频的音效
      if (this.stepNum == 0) {
        if (this.loginState) {
          this.courseState = true
          this.stepNum = 1
        } else {
          this.isOverQr = true
        }
      } else if (this.stepNum == 2) {
        this.$router.push({
          path: '/trainpage'
        })
      } else if (this.stepNum == 3) {
        this.stepNum = 4
      } else if (this.stepNum == 4) {
        this.$router.push({
          path: '/trainpage'
        })
      }
      // if (this.userMakeState) {
      //   this.$store.dispatch('set_userMakeState', false) //设置用户预约
      //   this.$store.dispatch('send_askLedState', { r: 0, g: 0, b: 0 })
      // }
    },

    closeqr () {
      this.isOverQr = false
    },
    starttext () {
      switch (this.stepNum) {
        case 1:
          return '未选择'
        case 2:
          return '已选择'
        case 3:
          return '下一步'
        case 4:
          return '开始训练'
        default:
          return '点击开始训练'
      }
    },
  },
}
</script>
