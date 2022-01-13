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
      .start_text1 {
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
          <div class="start_text1" @click="initStep">
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
        this.$store.commit('set_userMakeState', true)
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
  },
  created() {
    this.getSexAge()
  },
  mounted() {},
  methods: {
    ...mapMutations(['SEND_SOCKET', 'set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState']),
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
