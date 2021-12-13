<style scoped lang="scss">
.home_view {
  width: (12.8rem-3.59rem);
  height: 100%;
  position: relative;
  &_footer {
    position: absolute;
    left: 0;
    bottom: 0;
    .footer_step {
      ul {
        display: flex;
        li {
          color: #fff;
          width: 3.07rem;
          height: 0.33rem;
          font-size: 0.2rem;
          text-align: center;
          line-height: 0.33rem;
          background-color: rgb(26, 28, 45);
        }
        .view_active {
          background-color: rgb(65, 65, 73);
        }
      }
    }
    .footer_start {
      width: 100%;
      height: 1.3rem;
      display: flex;
      color: #fff;
      .quick_start {
        width: 3.06rem;
        height: 100%;
        background: #1fdb97;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .start_text1,
      .start_text2 {
        width: 100%;
        font-size: 0.36rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('~assets/images/view_23.png') no-repeat;
        background-size: 100% 100%;
      }
      .start_text2 {
        width: (9.21rem-3.06rem);
      }
    }
  }
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
          <ul>
            <li
              v-for="(item, index) of stepList"
              :id="'footer_li' + index"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="footer_start">
          <div
            class="quick_start"
            @click="$router.push('/trainpage')"
            v-if="viewindex !== 0"
          >
            快速开始
          </div>
          <div
            :class="viewindex == 0 ? 'start_text1' : 'start_text2'"
            @click="initStep"
          >
            {{ courseState ? '已确认' : '开始课程' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      stepList: ['运动风险须知', '器械调试', '动作演示'],
      courseState: false,
      timer: null,
    }
  },
  computed: {
    ...mapGetters(['loginState', 'resStartLesson']),
  },
  watch: {
    resStartLesson(val) {
      if (JSON.stringify(val) == '{}') {
        console.log('空')
      } else {
        console.log('不空', val)
        // const rs = require('../../../../public/common/js/lessons.json')
        this.$axios.get('./common/js/lessons.json').then((res) => {
          let color = val.color.split(',')
          let arr = color.map(Number)
          this.send_askLedState({
            r: arr[0],
            g: arr[1],
            b: arr[2],
          })
          this.$store.commit('set_userMakeState', true)
          const lesson_id = val.lesson_id
          const data = res.data.filter((item) => item.md5 == lesson_id)
          this.set_lesson_id(lesson_id)
          this.set_MakeCareInfo({ name: data[0].name, desc: data[0].desc })
        })
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
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
        // this.$emit('send_askLedState', 0, 0, 0)
      }

      if (this.courseState) {
        if (this.viewindex < 2) {
          this.viewindex++
          let uid = `footer_li${this.viewindex}`
          document.getElementById(uid).setAttribute('class', 'view_active')
        } else {
          console.log('开始吧')
          // this.$emit('setstartTrain')
          this.$router.push('/trainpage')
        }
      } else {
        this.courseState = true
        let uid = `footer_li0`
        document.getElementById(uid).setAttribute('class', 'view_active')
      }
    },
  },
}
</script>
