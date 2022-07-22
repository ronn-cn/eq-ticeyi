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
  .target_text {
    position: fixed;
    right: 0;
    top: 24%;
    width: 454px;
    height: 106px;
    background: url("~assets/images/1.1/home_icon1.svg") no-repeat;
    background-size: 100% 100%;
    // background-color: #ffffff;
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
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.09));
    border-radius: 20px;
    position: relative;

    &_topicon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      position: absolute;
      top: 10px;
      right: 12px;
    }
    &_topicon::after {
      content: "荐";
      font-size: 14px;
      position: relative;
      top: -7px;
      left: -1px;
    }
  }
}

.target_item_icon1 {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-right: 20px;
}
.objactive {
  color: #000000;
  background: #fff;
  .target_item_icon1 {
    border: 3px solid #000000;
  }
  .target_item_topicon {
    border: 2px solid #000;
  }
}
.target_item_unlock {
  border: 2px solid rgba(255, 255, 255, 0.38) !important;
  color: #ffffff61;
  .target_item_icon2 {
    display: inline-block;
    width: 25px;
    height: 32px;
    background: url("~assets/images/1.1/unlock.svg") no-repeat;
    position: relative;
    top: 4px;
    // background-size: 100% 100%;
  }
}

//弹框
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 690px;
  height: 118px;
  border-radius: 20px;
  color: #000;
  background-color: #fff;
  padding: 50px 100px;
  line-height: 54px;
  position: relative;
  .close_p1::after {
    content: "";
    width: 45px;
    height: 42px;
    position: absolute;
    top: 88px;
    left: 40px;
    background: url("~assets/images/1.1/warning.svg") no-repeat;
  }
}
//新增哦
.tranplan_cover {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  &_left {
    width: 728px;
    height: 580px;
    // background: #ff9500;
    background: url("~assets/images/1.1/home_back.svg") no-repeat;
    background-size: 100% 100%;
    ul {
      width: 80%;
      margin: 0 auto;
      margin-top: 85px;
      li {
        font-size: 24px;
        padding: 30px 0;
        text-align: left;
        border-bottom: 2px solid rgba(255, 255, 255, 0.28);
        position: relative;
      }
      li::after {
        content: "";
        width: 25px;
        height: 25px;
        background: #fff;
        position: absolute;
        left: -45px;
        top: 30px;
      }
    }
  }
  &_right {
    width: 418px;
    height: 580px;
    background: url("~assets/images/1.1/home_back2.svg") no-repeat;
    background-size: 100% 100%;
  }
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
           v-if="!courseState">
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
             v-else-if="itemindex == 2">
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
        <div class="introduce_title"
             v-else-if="itemindex == 4">
          <p class="introduce_title_p1"
             style="margin-bottom:0">
            个性全身增肌计划-基础版
          </p>
          <p class="introduce_title_p2"
             style="font-size:30px;padding:22px 0">
            针对增肌的系统训练计划，全身增肌+局部线条雕刻，让你穿衣显瘦，脱衣有肉
          </p>
          <div class="tranplan_cover">
            <div class="tranplan_cover_left">
              <ul>
                <li>训练打卡10天（1/10）</li>
                <li>完成大腿训练3次 或 大腿能力值+5</li>
                <li>完成腹部训练3次（2/3）或 腹部能力值+10 （1/10）</li>
                <li>完成热身放松课程10次（5/10）</li>
                <li>完成热身放松课程10次（5/10）</li>
              </ul>
            </div>
            <div class="tranplan_cover_right">

            </div>
          </div>
        </div>
        <div class="introduce_cover"
             v-if="itemindex != 2 && itemindex != 4">
          <img :src="`${publicPath}powerStatic/images/${projecttype}.png`"
               style="width: 350px" />
          <p class="ip1">{{ projecttype }}</p>
        </div>
      </div>

      <make-lesson v-if="userMakeState"></make-lesson>

      <div class="introduce_start_after"
           v-if="courseState">
        <div class="curriculum_target"
             v-if="stepNum == 1 || stepNum == 2">
          <h1 class="h1">课程目标</h1>
          <div class="target_title">
            根据肌肉发展素质选择不同的训练途径已达到训练目的,提升个人最大RM值及训练强度可解锁更多课程目标
          </div>
          <div class="target_text">
            请选择本次训练目标
          </div>
          <div class="target">
            <div v-for="(item, index) of objectives"
                 :key="index"
                 :class="['target_item',index == objindex ? 'objactive':'',!item.unlock?'target_item_unlock':'']"
                 @click="choiceCourse(item, index),click_effects()">
              <span class="target_item_topicon"
                    v-if="item.istrue"></span>
              <div>
                <span :class="item.unlock?'target_item_icon1':'target_item_icon2'"></span>
                {{ item.title }}
              </div>
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
    <van-overlay :show="tipsshow">
      <div class="wrapper"
           @click="setTips">
        <div class="block">
          <p class="close_p1">
            当前训练目标暂不可用，提升个人最大RM值及训练强度可解锁更多训练目标
          </p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import MakeLesson from '../common/MakeLesson.vue'
import { Overlay } from 'vant'
import power from '@/assets/js/power.json'
export default {
  props: {
    itemindex: {
      type: [Number, String],
    },
    viewindex: {
      type: [Number, String],
    },
    stepNum: {
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
    VanOverlay: Overlay,
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
      return this.stepNum
    },
    isVideo1 () {
      return this.stepNum == 3 ? true : false
    },
    isVideo2 () {
      return this.stepNum == 4 ? true : false
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
        this.choiceCourse(this.objectives[0].title, 0)
      }
    },
    tipsshow (value) {
      if (value) {
        this.TipsCond = setTimeout(() => {
          this.tipsshow = false
        }, 3000)
      }
    },
    user_rmvalue: {
      handler: function (info) {
        if (info.state) {
          this.objectives[2].unlock = false
          this.objectives[3].unlock = false
          let rmkg = info.value
          let level = 5
          this.$axios.get(`${this.publicPath}common/js/power.json`).then((res) => {
            // console.log(res)
            res.data.forEach((item) => {
              if (item['aim'] === "增强肌力") {
                for (let stage of item.stages) {
                  if (stage.level == level && stage.rm == rmkg) {
                    // console.log('有增强肌力')
                    this.objectives[2].unlock = true
                  }
                }
              }
              if (item['aim'] === "提升爆发力") {
                for (let stage of item.stages) {
                  if (stage.level == level && stage.rm == rmkg) {
                    // console.log('有提升爆发力')
                    this.objectives[3].unlock = true
                  }
                }
              }
            })
          })
        } else {
          this.objectives[2].unlock = true
          this.objectives[3].unlock = true
        }
      },
      immediate: true, // 首次加载的时候执行函数
      deep: true, // 深入观察,监听数组值，对象属性值的变化
    },

  },
  data () {
    return {
      objectives: [
        { title: "肌耐力", istrue: false, unlock: true },
        { title: "肌肥大", istrue: false, unlock: true },
        { title: "增强肌力", istrue: false, unlock: true },
        { title: "提升爆发力", istrue: false, unlock: true }],
      videourl: '',
      video1: '',
      video2: '',
      objindex: null,
      mediaState: false,
      tipsshow: false,
      TipsCond: null
    }
  },
  created () {},
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
    //返回上一级
    backindex () {
      if (this.stepNum == 2) {
        this.objindex = null
      }
      this.$emit('setitemindex')
    },
    setTips () {
      clearTimeout(this.TipsCond)
      this.tipsshow = false
    },
    choiceCourse (info, index) {
      if (!info.unlock) {
        this.tipsshow = true
      } else {
        this.objindex = index
        let rm = 0
        let level = 5
        this.$emit('set_stepNum')
        power.forEach((item) => {
          if (item['aim'] === info.title) {
            for (let stage of item.stages) {
              if (stage.level == level && stage.rm == rm) {
                this.$store.commit('set_temporary', {
                  groups: stage['热身组'],
                  text: info.title,
                })
              }
            }
          }
        })
      }

    },
  },
}
</script>
