<style scoped lang="scss">
.home_view {
  width: (12.8rem-3.59rem);
  height: 100%;
  position: relative;
  &_introduce {
    width: 100%;
    height: 100%;
    .introduce_item {
      width: 100%;
      height: 100%;
    }
  }
  &_footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
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
        background-position: 0 -60px;
        background-size: 100% 130%;
      }
    }
  }
}

.cardiopulmonary_test {
  .card_test_h2 {
    font-size: 0.36rem;
    padding: 0.7rem 0 0.7rem 0;
  }
  .card_test_p1 {
    font-size: 0.28rem;
    padding-bottom: 1rem;
  }
  .card_test_value {
    span {
      font-size: 0.5rem;
    }
    margin-bottom: 0.3rem;
  }
  .card_test_p2 {
    font-size: 0.4rem;
  }
  .card_test_p3 {
    width: 68%;
    margin: auto;
    margin-top: 0.7rem;
    line-height: 0.4rem;
    font-size: 0.22rem;
  }
}
//走马灯
.el-carousel {
  height: 100%;
}
::v-deep .el-carousel__container {
  height: 100% !important;
}

.el-carousel__item {
  background-color: #fff;
}
.carousel_run {
  color: #000;
  width: 55%;
  text-align: left;
  padding-left: 0.5rem;
  h3 {
    font-size: 0.32rem;
    font-weight: bold;
    padding: 50px 0 30px 0;
  }
  .p1 {
    color: #696969;
    line-height: 0.28rem;
  }
  .carousel_level {
    color: #696969;
    padding: 20px 0;
  }
  .carousel_btn {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.45rem;
    height: 0.47rem;
    background: linear-gradient(-90deg, #4668bf 0%, #7d89e2 100%);
    border-radius: 0.24rem;
  }
}
.run_risk {
  padding: 0 0.5rem;
  h2 {
    font-size: 0.34rem;
    padding: 40px 0;
  }
  .risk_ul {
    text-align: left;
    li {
      margin-bottom: 0.3rem;
      line-height: 44px;
    }
  }
  p {
    color: #5ac6ff;
    text-align: left;
  }
}
</style>

<template>
  <div>
    <div class="home_view">
      <div class="home_view_introduce" v-if="!courseState">
        <!-- <div class="introduce_make">
          {{ userMakeState ? "设备已预约" : "设备可使用" }}
        </div> -->
        <make-lesson v-if="userMakeState"></make-lesson>
        <theme-run
          v-if="itemindex == 0 && !userMakeState"
          @courseDetails="courseDetails"
        ></theme-run>
        <pattern-run v-if="itemindex == 1 && !userMakeState" />

        <div class="introduce_title" v-if="itemindex == 2 && !userMakeState">
          <section class="run_risk">
            <h2>运动风险须知</h2>
            <ul class="risk_ul">
              <li>运动健身前避免仓促进食,应饭后至少1小时再进行运动健身锻炼</li>
              <li>每次运动前要先做热身运动，待身体舒展后方可进行器械</li>
              <li>
                身体有残疾、体弱多病者，请在医生及专业人员的指导下使用，不可单独使用运动器械，未成年人与年龄过长者必须有人陪同锻炼，不得擅自锻炼
              </li>
              <li>
                在进行运动时，如出现眩晕、呕吐、胸痛等不正常症状时，请立即停止，必要时请及时就医。
              </li>
              <li>
                进入训练，意味着因参加任何训练课程而引起的一切风险、损害及责任等，由您自行承担。运动风险与免责声明
              </li>
            </ul>
            <p>运动前请仔细阅读该须知，确认无误后方可进行课程训练</p>
          </section>
        </div>
        <div class="introduce_title" v-if="itemindex == 3 && !userMakeState">
          <div class="cardiopulmonary_test">
            <h2 class="card_test_h2">心肺能力测试</h2>
            <p class="card_test_p1">暂无记录</p>
            <div class="card_test_value">
              <span>--</span>
              <!-- <span>46</span> -->
            </div>
            <p class="card_test_p2">ml/kg/min</p>
            <p class="card_test_p3">
              通过科学的算法估算你的最大摄氧量，它是表现你个人有氧能力及心肺耐力的最佳指标
            </p>
          </div>
        </div>
      </div>
      <div class="home_view_footer" v-if="itemindex !== 0">
        <div class="footer_start" @click="startRun(0)">
          <div
            class="start_text1"
            :style="{
              backgroundImage: `url(${publicPath}TreadmillStatic/images/start_back.png)`,
            }"
          >
            {{ indextitle(itemindex) }}
          </div>
        </div>
      </div>
      <course-profiles
        :detailsInfo="detailsInfo"
        v-if="showstate"
        @set_display="set_display"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import ThemeRun from '@/components/treadmill/ThemeRun.vue'
import PatternRun from '@/components/treadmill/PatternRun.vue'
import CourseProfiles from '@/components/treadmill/CourseProfiles.vue'
import MakeLesson from '@/components/common/MakeLesson.vue'
// import RotationChart from '@/components/treadmill/RotationChart.vue'
export default {
  props: {
    itemindex: {
      type: [Number, String],
    },
  },
  components: {
    PatternRun,
    ThemeRun,
    CourseProfiles,
    MakeLesson,
    // RotationChart
  },
  data() {
    return {
      viewindex: 0,
      courseState: false,

      showstate: false,
      detailsInfo: {},
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'userMakeState',
      'publicPath',
      'resSetStart',
      'resStartLesson',
    ]),
  },
  watch: {
    resSetStart(newval) {
      this.startRun(1)
    },
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
    ...mapMutations(['set_lesson_id', 'set_MakeCareInfo']),
    ...mapActions(['send_askLedState']),
    indextitle(text) {
      switch (text) {
        case 1:
          return '开始跑步'
        case 2:
          return '开始跑步'
        case 3:
          return '开始测试'
      }
    },
    set_display() {
      this.showstate = false
    },
    //详情
    courseDetails(data) {
      this.showstate = true
      this.detailsInfo = data
    },
    //开始了
    startRun(status) {
      //0默认 1跳过倒计时
      this.$router.push({
        path: '/trainrun',
        query: { type: 2, status },
      })
    },
  },
}
</script>
