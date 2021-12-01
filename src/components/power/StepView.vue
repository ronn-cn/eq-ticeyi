<style scoped lang="scss">
.home_view_introduce {
  height: 6.37rem;
  width: 100%;
  position: relative;
  .introduce_start_before {
    .introduce_make {
      color: #40f9ef;
      font-size: 0.2rem;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
    .introduce_title {
      padding-top: 1rem;
      &_p1 {
        font-size: 0.36rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;

        margin-bottom: 0.36rem;
      }
      &_p2 {
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
        font-size: 0.24rem;
        line-height: 0.32rem;
        text-align: left;
        padding: 0 0.3rem;
      }
    }
    .introduce_cover {
      margin-top: 0.4rem;
    }
  }
  .introduce_start_after {
    // height: 100%;
    padding: 0.53rem 0.69rem 0.59rem 0.59rem;
    color: #fff;
    .risk_notice {
      font-size: 0.22rem;
      text-align: left;
      line-height: 0.42rem;
    }
    .apparatus_test {
      .apparatus_text {
        font-size: 0.2rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        text-align: left;
        // margin-top: 0.1rem;
        line-height: 0.4rem;
      }
    }
    .action_demo {
      ol {
        margin-top: 0.2rem;
        text-align: left;
        padding-left: 1rem;
        counter-reset: section;
        li {
          padding-bottom: 0.14rem;
        }
        li::before {
          counter-increment: section;
          content: counter(section) '、';
        }
      }
    }
    .h1 {
      font-size: 0.36rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      margin-bottom: 0.37rem;
      text-align: center;
    }
    .apparatus_picture {
      width: 5.28rem;
      height: 3.2rem;
      margin: 0 auto;
      // background: chartreuse;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  .step_back {
    width: 0.62rem;
    height: 0.6rem;
    background: rgba(103, 117, 217, 0.3);
    border: 1px solid #89b2e7;
    opacity: 0.5;
    border-radius: 0.3rem;
    position: absolute;
    top: 0.25rem;
    right: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.careradia {
  display: flex;
  justify-content: center;
  color: #fff;
}
.introduce_logo {
  position: absolute;
  top: 0.1rem;
  right: 1.2rem;
  img {
    width: 0.7rem;
  }
}
</style>

<template>
  <div>
    <div class="home_view_introduce">
      <div class="introduce_start_before" v-if="!courseState">
        <div class="introduce_logo">
          <img :src="`${publicPath}common/images/login_img1.png`" />
        </div>
        <div class="introduce_make">
          {{ userMakeState ? '设备已预约' : '设备可使用' }}
        </div>

        <div class="introduce_title" v-if="itemindex == 0 && !userMakeState">
          <p class="introduce_title_p1">腹肌练习 | 标准模式</p>
          <p class="introduce_title_p2">
            根据规定重量开始进行热身组及正式组的锻炼和提生
          </p>
        </div>
        <div class="introduce_title" v-if="itemindex == 1 && !userMakeState">
          <p class="introduce_title_p1">腹肌练习 | 自由模式</p>
          <p class="introduce_title_p2">自主选择重量及组次,开始自由训练模式</p>
        </div>
        <div class="introduce_title" v-if="itemindex == 2 && !userMakeState">
          <p class="introduce_title_p1">腹肌练习 | 力量测试</p>
          <p class="introduce_title_p2">力量测试</p>
        </div>

        <div class="introduce_cover" v-if="!userMakeState">
          <img
            :src="`${publicPath}powerStatic/images/liliangqixie.png`"
            width="296"
            height="328"
          />
        </div>

        <MakeLesson v-if="userMakeState" />
      </div>

      <div class="introduce_start_after" v-if="courseState">
        <div class="risk_notice" v-if="viewindex === 0">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}powerStatic/images/view_back.png`"
              width="32px"
              style="position: relative; left: -4px"
            />
          </div>
          <h1 class="h1">运动风险须知</h1>
          <p>
            运动健身前避免仓促进食，应饭后至少1小时后再进行运动健身锻炼。<br />每次运动前要先做热身运动，待身体舒展后方可使用器械。
            <br />身体有残疾、体弱多病者，请在医生及专业人员的指导下使用，不可单独使用运动器械，未成年人与年龄过长者必须有人陪同锻炼，不得擅自锻炼。
            <br />在进行运动时，如出现眩晕、呕吐、胸痛等不正常症状时，请立即停止，必要时请及时就医。
            <br />进入训练，意味着因参加任何训练课程而引起的一切风险、损害及责任等，由您自行承担。
            <br />运动风险与免责声明，
          </p>
        </div>
        <div class="apparatus_test" v-if="viewindex === 1">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}powerStatic/images/view_back.png`"
              width="32px"
              style="position: relative; left: -4px"
            />
          </div>
          <h1 class="h1">器械调试</h1>
          <div class="apparatus_picture">
            <img :src="`${publicPath}powerStatic/images/liliangqixie.png`" />
          </div>
          <p class="apparatus_text">
            您好，健身小伙伴，欢迎体验轨道式力量训练器，建议初次锻炼的小伙伴选择小重量配重进行负重练习，也可根据个人情况自行选择磅值
            (注意首次锻炼者，重量选择不宜过大)
          </p>
        </div>
        <div class="action_demo" v-if="viewindex === 2">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}powerStatic/images/view_back.png`"
              width="32px"
              style="position: relative; left: -4px"
            />
          </div>
          <h1 class="h1">动作演示</h1>
          <div class="apparatus_picture">
            <img
              :src="`${publicPath}powerStatic/images/apparatus_img3.png`"
              style="width: 5rem"
            />
          </div>
          <ol>
            <li>胸部压着软垫，腰部紧贴椅背，双手反握把手</li>
            <li>慢慢呼气，腹部用力将重量向下压低。腹部收紧后，吸气慢慢还原</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import MakeLesson from '@/components/common/MakeLesson.vue'
export default {
  props: {
    itemindex: {
      type: [Number, String],
    },
    viewindex: {
      type: [Number, String],
    },
    courseState: {
      type: Boolean,
    },
  },
  components: {
    RadialProgressBar,
    MakeLesson,
  },
  computed: {
    ...mapGetters([
      'userMakeState',
      'loginState',
      'publicPath',
      'MakeCareTitle',
      'MakeCareDesc',
    ]),
  },
  watch: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    backindex() {
      this.$emit('setitemindex')
    },
  },
}
</script>
