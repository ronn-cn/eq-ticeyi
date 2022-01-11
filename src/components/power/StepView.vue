<style scoped lang="scss">
.home_view_introduce {
  height: 6.37rem;
  width: 100%;
  position: relative;
  background-color: #000;
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
        text-align: center;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
        font-size: 0.24rem;
        line-height: 0.32rem;

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
      color: #fff;
      font-size: 0.36rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      margin-bottom: 0.2rem;
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
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-top: 100px solid transparent;
    border-bottom: 100px solid rgb(231, 175, 72);
    border-right: 100px solid transparent;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(100px) translateY(-100px) rotate(45deg);
  }
  .home_back {
    position: fixed;
    right: 8px;
    top: 20px;
    width: 60px;
    height: 60px;
    background: url('../../assets/images/common/home_back.png') no-repeat;
    background-size: 100% 100%;
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
.curriculum_target {
  ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
      border-bottom: 1px solid #fff;
    }
  }
}
.measure {
  &_p1 {
    font-size: 0.32rem;
    font-weight: 600;
  }
  &_p2 {
    line-height: 0.4rem;
    font-size: 0.24rem;
    margin: 0.8rem;
  }
  &_p3 {
    span {
      font-size: 1rem;
    }
    font-size: 0.5rem;
  }
}
.fixed_video {
  position: fixed;
  top: 22%;
  left: 40%;
  z-index: 99;
}

.target_title1 {
  font-size: 0.24rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid #fff;
  display: flex;
  justify-content: space-between;
}
.target_title2 {
  font-size: 0.24rem;
  margin-top: 1.2rem;
}
</style>

<template>
  <div>
    <div class="home_view_introduce">
      <div class="introduce_start_before" v-if="!courseState">
        <!-- <div class="introduce_logo">
          <img :src="`${publicPath}common/images/login_img1.png`" />
        </div> -->
        <div class="introduce_make">
          {{ userMakeState ? '设备已预约' : '设备可使用' }}
        </div>
        <make-lesson v-if="userMakeState"></make-lesson>
        <div class="introduce_title" v-if="itemindex == 0 && !userMakeState">
          <p class="introduce_title_p1">标准模式</p>
          <p class="introduce_title_p2">
            根据规定重量开始进行热身组及正式组的锻炼和提升
          </p>
        </div>
        <div class="introduce_title" v-if="itemindex == 1 && !userMakeState">
          <p class="introduce_title_p1">自由模式</p>
          <p class="introduce_title_p2">自主选择重量及组次,开始自由训练模式</p>
        </div>
        <div class="introduce_title" v-if="itemindex == 2 && !userMakeState">
          <div class="measure">
            <p class="measure_p1">当前器械1RM测定值</p>
            <p class="measure_p2">
              {{ !user_rmvalue.state ? '暂无记录' : '肌肉力量提高了(+0)' }}
              <br />当前器械能举起的最大重量为
            </p>
            <p class="measure_p3">
              <span>{{ !user_rmvalue.state ? '--' : user_rmvalue.value }}</span>
              KG
            </p>
          </div>
        </div>

        <div class="introduce_cover" v-if="itemindex != 2 && !userMakeState">
          <img
            :src="`${publicPath}powerStatic/images/${projecttype}.png`"
            width="296"
            height="328"
          />
        </div>
      </div>

      <div class="introduce_start_after" v-if="courseState">
        <div class="risk_notice" v-if="viewindex === 0">
          <div @click="backindex">
            <div class="step_back"></div>
            <div class="home_back"></div>
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
        <div class="curriculum_target" v-if="itemindex == 0 && viewindex === 1">
          <div @click="backindex">
            <div class="step_back"></div>
            <div class="home_back"></div>
          </div>
          <h1 class="h1">课程目标</h1>
          <ul>
            <li v-for="item of targetList" :key="item.zname">
              <span>{{ item.zname }}</span>
              <span>{{ item.numname }}</span>
              <span>{{ item.totalnum }}</span>
            </li>
          </ul>
        </div>
        <div class="curriculum_target" v-if="itemindex == 2 && viewindex === 1">
          <div @click="backindex">
            <div class="step_back"></div>
            <div class="home_back"></div>
          </div>
          <h1 class="h1">课程目标</h1>
          <div class="target_title1">
            <span>极限组(RM值测试)</span>
            <span>Test KG/次 -- Max KG/次 </span>
            <span>1次/Max KG </span>
          </div>
          <p class="target_title2">请调整配重至个人极限重量,开启RM值测试</p>
        </div>
        <div
          class="apparatus_test"
          v-show="
            (itemindex == 0 && viewindex == 2) ||
            (itemindex == 1 && viewindex == 1) ||
            (itemindex == 2 && viewindex == 2)
          "
        >
          <div @click="backindex">
            <div class="step_back"></div>
            <div class="home_back"></div>
          </div>
          <h1 class="h1">器械调试</h1>
          <video
            autoplay="autoplay"
            style="margin-top: 0.5rem"
            :src="videourl1"
            ref="myvideo1"
          >
            Your browser does not support the video tag.
          </video>

          <!-- <div class="apparatus_picture">
            <img :src="`${publicPath}powerStatic/images/liliangqixie.png`" />
          </div>
          <p class="apparatus_text">
            您好，健身小伙伴，欢迎体验轨道式力量训练器，建议初次锻炼的小伙伴选择小重量配重进行负重练习，也可根据个人情况自行选择磅值
            (注意首次锻炼者，重量选择不宜过大)
          </p> -->
        </div>
        <div
          class="action_demo"
          v-show="
            (itemindex == 0 && viewindex == 3) ||
            (itemindex == 1 && viewindex == 2) ||
            (itemindex == 2 && viewindex == 3)
          "
        >
          <div @click="backindex">
            <div class="step_back"></div>
            <div class="home_back"></div>
          </div>
          <h1 class="h1">动作演示</h1>
          <video
            autoplay="autoplay"
            style="margin-top: 0.5rem"
            :src="videourl2"
            ref="myvideo2"
          >
            Your browser does not support the video tag.
          </video>

          <!-- <iframe
            src="/powerStatic/mo1.html"
            style="width: 800px; height: 400px"
            frameborder="0"
          ></iframe>
          <ol>
            <li>胸部压着软垫，腰部紧贴椅背，双手反握把手</li>
            <li>慢慢呼气，腹部用力将重量向下压低。腹部收紧后，吸气慢慢还原</li>
          </ol> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import MakeLesson from '../common/MakeLesson.vue'

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
      'user_rmvalue',
      'projecttype', //类型
    ]),
    get_viewindex() {
      return this.viewindex
    },
  },
  watch: {
    get_viewindex(val) {
      this.videourl1 = ''
      this.videourl2 = ''
      if (
        (this.itemindex == 0 && val == '2') ||
        (this.itemindex == 1 && val == '1') ||
        (this.itemindex == 2 && val == '2')
      ) {
        this.videourl1 = `${this.publicPath}powerStatic/video/${this.projecttype}1.mp4`
        this.$refs.myvideo1.load()
        // console.log(this.$refs.myvideo, this.videourl)
      }
      if (
        (this.itemindex == 0 && val == '3') ||
        (this.itemindex == 1 && val == '2') ||
        (this.itemindex == 2 && val == '3')
      ) {
        this.videourl2 = `${this.publicPath}powerStatic/video/${this.projecttype}2.mp4`
        this.$refs.myvideo2.play()
      }
    },
  },
  data() {
    return {
      targetList: [
        {
          zname: '热身组',
          numname: '6KG/10次',
          totalnum: '2组',
        },
        {
          zname: '极限组(RM值测试)',
          numname: '12KG/次 → Max KG/次',
          totalnum: '1次/Max KG',
        },
        {
          zname: '金字塔组',
          numname: '3~20 RM/5次',
          totalnum: '各1组',
        },
        {
          zname: '负重组',
          numname: '4~12 RM/6~12次',
          totalnum: '3~8组',
        },
        {
          zname: '辅助组',
          numname: '4~12 RM/15次',
          totalnum: '2组',
        },
      ],
      videourl1: '',
      videourl2: '',
      video1: '',
      video2: '',
    }
  },
  created() {},
  mounted() {
    this.createdVideo()
  },
  methods: {
    backindex() {
      this.$emit('setitemindex')
    },
    createdVideo() {
      let videourl = `${this.publicPath}powerStatic/video/tiaoshi.mp4`
      this.video1 = `<video 
               id="videoaction1"
               src="${videourl}"
               style="width:100%"
               autoplay="autoplay"></video>`
      let videourl1 = `${this.publicPath}powerStatic/video/yanshi.mp4`
      this.video2 = `<video 
               id="videoaction2"
               src="${videourl1}"
               style="width:100%"
               autoplay="autoplay"></video>`
    },
  },
}
</script>
