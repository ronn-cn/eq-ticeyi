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
      .start_text1,
      .start_text2 {
        width: 100%;
        height: 131px;
        background: #28cd41;
        // background: url('~assets/images/common/start.png') no-repeat;
        // background-size: 0.4rem 0.5rem;
        // background-position: 42%;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
      }
      .start_text2 {
        width: 1405px;
        background-position: 38%;
      }
    }
  }
}
.U_test {
  width: 1405px !important;
  // background-position: 36% !important;
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
    <div class="home_view" :style="courseState ? 'width:1880px' : ''">
      <step-view
        ref="stepview"
        :itemindex="itemindex"
        :viewindex="viewindex"
        :courseState="courseState"
        :targetList="targetList"
        @setitemindex="setitemindex"
      ></step-view>

      <div class="home_view_footer">
        <div class="footer_step" v-show="courseState">
          <ul ref="step_ul">
            <li
              v-for="(item, index) of stepList"
              :id="'footer_li' + index"
              :ref="`step_li${index}`"
              :key="item"
              :style="{ width: operatewidth + '%' }"
            ></li>
          </ul>
        </div>
        <div class="footer_start">
          <div
            class="quick_start"
            @click="quickchang(), click_effects()"
            v-if="viewindex !== 0 && viewindex < stepList.length - 1"
          >
            快速开始
          </div>
          <div
            class="quick_start2"
            @click="click_effects(), again_test()"
            v-if="
              itemindex == 2 &&
              viewindex == 1 &&
              loginState &&
              user_rmvalue.state
            "
          >
            重新测试
          </div>
          <div
            :class="[
              viewindex !== 0 && viewindex < stepList.length - 1
                ? 'start_text2'
                : 'start_text1',
              itemindex == 2 && viewindex == 1 && loginState ? 'U_test' : '',
            ]"
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
      'coursegroup',
      'projecttype', //类型
      'lesson_id',
    ]),
  },
  watch: {
    loginState(nval) {
      if (!nval) {
        this.targetList = []
      }
    },
    coursegroup(nval) {
      // console.log(nval)
      this.targetList = []
      const planArr = ['负重组', '金字塔组', '辅助组']
      for (let i in planArr) {
        let data = nval[`${planArr[i]}`]
        if (data.length > 0) {
          data.forEach((item) => {
            this.targetList.push({
              zname: planArr[i],
              weight: item.weight,
              numname: item.times,
              totalnum: item.groups,
            })
          })
        }
      }
      this.targetList.unshift({
        zname: '热身组',
        weight: 12,
        numname: 20,
        totalnum: 1,
      })
      // console.log(this.targetList)
    },
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
          this.stepList = ['运动风险须知', '课程目标', '器械调试', '动作演示']
          this.operatewidth = '24'
        }
      }
    },
    //预约
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
        this.$store.dispatch('set_userMakeState', true) //设置用户预约
        const lesson_id = val.lesson.md5
        this.set_lesson_id(lesson_id) //设置课程id
        this.set_MakeCareInfo({ name: val.lesson.name, desc: val.lesson.desc }) //设置提示文字
      }
    },
    courseState(val) {
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
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState', 'click_effects']),
    //快速开始
    quickchang() {
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
      // console.log(this.user_rmvalue)
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
          console.log(123)
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
            num: this.user_rmvalue.state ? 1 : 3,
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
    again_test() {
      this.$router.push('/strengthtest')
    },
    starttext() {
      let textArr = []
      if (this.itemindex == 0) {
        textArr = ['已确认', '下一步', '下一步', '开始训练']
      } else if (this.itemindex == 1) {
        textArr = ['已确认', '下一步', '开始训练']
      } else if (this.itemindex == 2) {
        if (this.user_rmvalue.state) {
          textArr = ['已确认', '开始训练']
        } else {
          textArr = ['已确认', '下一步', '下一步', '开始测试']
        }
      }
      return textArr[this.viewindex]
    },
  },
}
</script>
