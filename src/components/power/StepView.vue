<style scoped lang="scss">
.home_view_introduce {
  width: 1405px;
  height: 889px;
  margin-bottom: 20px;

  background: url("~assets/images/phase2/home_view_b.png") no-repeat;
  border-radius: 20px;
  position: relative;
  .introduce_start_before {
    .introduce_title {
      padding-top: 0.8rem;
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
      .ip1 {
        font-size: 0.36rem;
        margin-top: 0.2rem;
      }
    }
  }
  .introduce_start_after {
    // height: 100%;
    padding: 0.53rem 0.69rem 0.59rem 0.59rem;
    color: #fff;
    z-index: 9;
    .risk_notice {
      font-size: 0.22rem;
      text-align: left;
      line-height: 0.42rem;
      .notice_p {
        padding-top: 90px;
      }
    }
    .apparatus_test {
      position: relative;
      .apparatus_text {
        font-size: 0.2rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        text-align: left;
        line-height: 0.4rem;
      }
      .play_media {
        position: absolute;
        left: 48%;
        top: 42%;
        width: 150px;
        height: 150px;
        z-index: 10;
        background: url("~assets/images/common/e1b7a2a03703278aa2a3b3bc7b362f6.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .h1 {
      width: 100%;
      color: #fff;
      font-size: 0.3rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      margin-bottom: 0.2rem;
      text-align: center;
    }
    .apparatus_picture {
      width: 5.28rem;
      height: 3.2rem;
      margin: 0 auto;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  .step_back {
    position: absolute;
    top: left;
    right: 0;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-top: 100px solid transparent;
    border-bottom: 100px solid #ff9500;
    border-right: 100px solid transparent;
    transform: translateX(100px) translateY(-100px) rotate(45deg);
  }
  .step_back::after {
    content: "";
    position: absolute;
    right: -28px;
    top: 38px;
    width: 0.3rem;
    height: 0.3rem;
    background: url("~assets/images/common/home_back.svg") no-repeat;
    background-size: 100% 100%;
    transform: rotate(320deg);
  }
}
.careradia {
  display: flex;
  justify-content: center;
  color: #fff;
}

.curriculum_target {
  .target_title {
    width: 50%;
    margin: auto;
    line-height: 54px;
    margin-bottom: 92px;
  }
  ul {
    padding-top: 90px;
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

.target_title1 {
  font-size: 0.24rem;
  padding: 90px 0 0.3rem 0;
  border-bottom: 2px solid #fff;
  display: flex;
  justify-content: space-between;
}

.target_title2 {
  font-size: 0.24rem;
  margin-top: 1.2rem;
}

.video_cover {
  height: 700px;
  z-index: 9;
}
.introduce_active {
  width: 100%;
  overflow: hidden;
  background: #000000;
}

.target {
  width: 66%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .target_item {
    margin-bottom: 90px;
    width: 451px;
    height: 128px;
    line-height: 132px;
    border: 2px solid #ffffff;
    filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.09));
    border-radius: 20px;
  }
}
.objactive {
  color: #000000;
  background: #fff;
}
</style>

<template>
  <div>
    <div class="home_view_introduce"
         :class="courseState ? 'introduce_active' : ''">
      <div @click="backindex"
           class="step_back"
           v-show="courseState"></div>

      <div class="introduce_start_before"
           v-if="!courseState && !userMakeState">
        <div class="introduce_title"
             v-if="itemindex == 0 || itemindex == 1">
          <p class="introduce_title_p1">
            {{ itemindex == 0 ? '标准模式' : '自由模式' }}
          </p>
          <p class="introduce_title_p2">
            {{
              itemindex == 0
                ? '根据规定重量开始进行热身组及正式组的锻炼和提升'
                : '自主选择重量及组次,开始自由训练模式'
            }}
          </p>
        </div>
        <div class="introduce_title"
             v-else>
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
        <div class="introduce_cover"
             v-if="itemindex != 2">
          <img :src="`${publicPath}powerStatic/images/${projecttype}.png`"
               style="width: 350px" />
          <p class="ip1">{{ projecttype }}</p>
        </div>
      </div>

      <make-lesson v-if="userMakeState"
                   style="height: 6.37rem; width: 100%"></make-lesson>

      <div class="introduce_start_after"
           v-if="courseState && !userMakeState">
        <div class="risk_notice"
             v-if="viewindex === 0">
          <h1 class="h1">运动风险须知</h1>
          <p class="notice_p">
            运动健身前避免仓促进食，应饭后至少1小时后再进行运动健身锻炼。<br />每次运动前要先做热身运动，待身体舒展后方可使用器械。
            <br />身体有残疾、体弱多病者，请在医生及专业人员的指导下使用，不可单独使用运动器械，未成年人与年龄过长者必须有人陪同锻炼，不得擅自锻炼。
            <br />在进行运动时，如出现眩晕、呕吐、胸痛等不正常症状时，请立即停止，必要时请及时就医。
            <br />进入训练，意味着因参加任何训练课程而引起的一切风险、损害及责任等，由您自行承担。
            <br />运动风险与免责声明，
          </p>
        </div>
        <div class="curriculum_target"
             v-if="
            (itemindex == 0 && viewindex === 1) 
          ">
          <h1 class="h1">课程目标</h1>
          <div class="target_title">
            根据肌肉发展素质选择不同的训练途径已达到训练目的,提升个人最大RM值及训练强度可解锁更多课程目标
          </div>
          <div class="target">
            <div v-for="(item, index) of objectives"
                 :key="index"
                 :class="{ objactive: index == objindex }"
                 class="target_item"
                 @click="choiceCourse(item, index),click_effects()">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="apparatus_test"
             v-if="isVideo1 || isVideo2">
          <h1 class="h1">{{ isVideo1 ? '器械调试' : '动作演示' }}</h1>
          <div class="play_media"
               @click="playMedia"
               v-if="mediaState"></div>
          <video class="video_cover"
                 :src="videourl"
                 id="media"
                 ref="myvideo1">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import MakeLesson from '../common/MakeLesson.vue'
import power from '@/assets/js/power.json'
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
    targetList: {
      type: Array,
      default: [],
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
      'evenfPublic',
    ]),
    get_viewindex () {
      return this.viewindex
    },
    isVideo1 () {
      if (
        (this.itemindex == 0 && this.viewindex == '2') ||
        (this.itemindex == 1 && this.viewindex == '1') ||
        (this.itemindex == 2 && this.viewindex == '1')
      ) {
        return true
      }
      return false
    },
    isVideo2 () {
      if (
        (this.itemindex == 0 && this.viewindex == '3') ||
        (this.itemindex == 1 && this.viewindex == '2') ||
        (this.itemindex == 2 && this.viewindex == '2')
      ) {
        return true
      }
      return false
    },
    istemporary () {
      if (this.itemindex == 0 && this.viewindex == '1' || this.itemindex == 2 && this.viewindex == '1') {
        return true
      }
      return false
    },
  },
  watch: {
    get_viewindex (val) {
      if (this.isVideo1) {
        this.videourl = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/video/${this.projecttype}/${this.projecttype}（器械调节）.mp4`
        this.$nextTick(() => {
          this.$refs.myvideo1.play()
          document.getElementById('media').addEventListener('ended', () => { //该视频播放是否已结束
            this.mediaState = true
          }, false)
        })
      }
      if (this.isVideo2) {
        this.videourl = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/video/${this.projecttype}/${this.projecttype}（动作演示）.mp4`
        this.$nextTick(() => {
          this.$refs.myvideo1.play()
        })
      }
    },
    istemporary (val) {
      if (val) {
        this.choiceCourse('肌耐力', 0)
      }
    },
  },
  data () {
    return {
      target: [
        {
          zname: '热身组',
          weight: '12',
          numname: '20',
          totalnum: '1组',
        },
        {
          zname: '极限组(RM值测试)',
          weight: '12',
          numname: 'Max KG/',
          totalnum: '1次/Max KG',
        },
        {
          zname: '金字塔组',
          weight: '3~20',
          numname: '5',
          totalnum: '各1组',
        },
        {
          zname: '负重组',
          weight: '4~12',
          numname: '6~12',
          totalnum: '3~8组',
        },
        {
          zname: '辅助组',
          weight: '4~12',
          numname: '15',
          totalnum: '2组',
        },
      ],
      objectives: ['肌耐力', '肌肥大', '增强肌力', '提升爆发力'],
      videourl: '',
      video1: '',
      video2: '',
      objindex: 0,
      mediaState: false
    }
  },
  created () { },
  mounted () { },
  methods: {
    ...mapActions(['click_effects']),
    //重新播放视频
    playMedia () {
      this.mediaState = false
      setTimeout(() => {
        this.$refs.myvideo1.play()
      }, 500);
    },
    backindex () {
      this.$emit('setitemindex')
    },
    choiceCourse (text, index) {
      this.objindex = index
      let rm = 0
      let level = 5
      power.forEach((item) => {
        if (item['aim'] === text) {
          for (let stage of item.stages) {
            if (stage.level == level && stage.rm == rm) {
              // console.log(stage)
              this.$store.commit('set_temporary', {
                groups: stage['热身组'],
                text: text,
              })
            }
          }
        }
      })
    },
  },
}
</script>
