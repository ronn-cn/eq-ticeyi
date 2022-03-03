<style scoped lang="scss">
.home_view {
  // width: (12.8rem-3.59rem);
  height: 100%;
  position: relative;
  &_footer {
    .footer_step {
      width: 1600px;
      position: fixed;
      bottom: 190px;
      left: 140px;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        li {
          color: #fff;
          width: 33%;
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
    }
    .footer_start {
      width: 100%;
      height: 131px;
      background: #28cd41;
      border-radius: 20px;
      display: flex;
      color: #fff;
      justify-content: space-between;
      .start_text1 {
        width: 100%;
        font-family: SourceHanSansCN;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
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
        v-if="isRouterShow"
      ></step-view>
      <div class="home_view_footer" v-if="itemindex == 0">
        <div class="footer_step" v-show="courseState">
          <ul>
            <li
              v-for="(item, index) of stepList"
              :id="'footer_li' + index"
              :key="item"
            >
              <!-- {{ item }} -->
            </li>
          </ul>
        </div>
        <div class="footer_start">
          <div class="start_text1" @click="initStep(), click_effects()">
            {{ courseState ? '确认' : '开始测试' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import StepView from '@/components/bodytester/StepView.vue'
export default {
  components: {
    StepView,
  },
  props: {
    itemindex: {
      type: [Number, String],
    },
  },
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  data() {
    return {
      viewindex: 0,
      stepList: ['测试注意事项', '确认信息', '测试引导'],
      courseState: false,
      isRouterShow: true,
    }
  },

  computed: {
    ...mapGetters([
      'loginState',
      'userInfo',
      'userMakeState',
      'resStartLesson',
    ]),
  },
  watch: {
    itemindex(val) {
      this.reload()
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
        this.$store.dispatch('set_userMakeState', true)
        const lesson_id = val.lesson.md5
        this.set_lesson_id(lesson_id)
        const data = val.lesson
        this.set_MakeCareInfo({ name: data[0].name, desc: data[0].desc })
      }
    },
    loginState: {
      handler(newval, oldval) {
        if (newval) {
          this.getSexAge()
        }
      },
      immediate: true,
    },
    courseState(val) {
      console.log(val)
      this.$emit('set_showCourse', val)
    },
  },
  created() {
    this.getSexAge()
  },
  mounted() {},
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState', 'click_effects']),
    async getSexAge() {
      const rs = await api.get('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      // console.log(rs)
      if (rs.data.code == '200') {
        let user = rs.data.data.user
        this.$store.commit('set_user_age', user.age)
        this.$store.commit('set_user_sex', user.sex)
      }
    },
    //返回
    setitemindex() {
      this.click_effects()
      if (this.viewindex == 0) {
        this.courseState = false
        document.getElementById(`footer_li0`).setAttribute('class', '')
      } else {
        this.viewindex--
        let uid = `footer_li${this.viewindex + 1}`
        document.getElementById(uid).setAttribute('class', '')
      }
    },
    //开始
    initStep() {
      if (this.$refs.stepview.timer) {
        this.$refs.stepview.removetimer()
        // this.$emit('send_askLedState', 0, 0, 0)
      }
      if (this.courseState) {
        if (this.viewindex < 2) {
          this.click_effects()
          this.viewindex++
          let uid = `footer_li${this.viewindex}`
          document.getElementById(uid).setAttribute('class', 'view_active')
        } else {
          console.log('开始吧')
          this.$emit('setdatastate', true)
          // this.$router.push("/datadetection");
        }
      } else {
        this.courseState = true
        let uid = `footer_li0`
        document.getElementById(uid).setAttribute('class', 'view_active')
      }
    },
    async reload() {
      this.isRouterShow = false
      await this.$nextTick(() => {
        this.viewindex = 0
        this.courseState = false
        this.isRouterShow = true
      })
    },
  },
}
</script>
