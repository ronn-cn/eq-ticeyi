<style scoped lang="scss">
.home_view_introduce {
  width: 1405px;
  height: 889px;
  margin-bottom: 20px;
  background: url("~assets/images/phase2/home_view_b.png") no-repeat;
  border-radius: 20px;

  .introduce_start_before {
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
        font-size: 36px;
        line-height: 0.32rem;
        text-align: left;
        padding: 0 1.5rem;
      }
    }
    .introduce_cover {
      margin-top: 0.4rem;
    }
  }
  .introduce_start_after {
    color: #fff;
    .h1_title {
      font-size: 48px;
      text-align: center;
      padding: 70px 0 120px 0;
    }
    .risk_notice {
      font-size: 0.22rem;
      text-align: left;
      line-height: 0.42rem;
      .careful_ul {
        li {
          font-size: 36px;
          text-align: center;
        }
      }
    }
    .apparatus_test {
      .h1_title {
        font-size: 48px;
        padding-bottom: 60px;
      }
      .choice_sex {
        h2 {
          margin-bottom: 60px;
        }
        .gender {
          display: flex;
          justify-content: space-around;
          width: 50%;
          margin: 50px auto 70px;
          .gender_male {
            width: 299px;
            height: 110px;
            line-height: 110px;
            border-radius: 20px;
            border: 2px solid #fff;
          }
          .gender_male_active {
            color: #000000;
            background: #fff;
          }
        }
      }
      .choice_age {
        width: 80%;
        margin: auto;
        h2 {
          margin-bottom: 40px;
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
      border-bottom: 100px solid rgb(231, 175, 72);
      border-right: 100px solid transparent;
      transform: translateX(100px) translateY(-100px) rotate(45deg);
    }
    .step_back::after {
      content: "";
      position: absolute;
      right: -32px;
      top: 30px;
      width: 0.44rem;
      height: 0.44rem;
      background: url("~assets/images/common/home_back.png") no-repeat;
      background-size: 100% 100%;
      transform: rotate(330deg);
    }
  }
}
.careradia {
  display: flex;
  justify-content: center;
  color: #fff;
  margin-top: 0.4rem;
}

.vx_qr {
  width: 340px;
  height: 340px;
  margin: 0 auto;
  margin-top: 0.8rem;
}
.introduce_active {
  width: 1880px;
  overflow: hidden;
  background: #000000;
  // background: linear-gradient(180deg, #323647 0%, #222631 100%) !important;
}

//@at-root
#rulerText3 {
  margin: 0 auto;
  margin-left: 16px;
  font-size: 0.3rem;
  text-align: center;
  background: none;
  border: none;
  z-index: 100;
  color: rgb(255, 255, 255);
}
.text-input {
  background: none;
  border: none;
  color: #fff;
}
.ruler-wrap {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
</style>

<template>
  <div>
    <div class="home_view_introduce"
         :class="courseState ? 'introduce_active' : ''">

      <div class="introduce_start_before"
           v-if="!courseState">
        <div class="introduce_title"
             v-if="itemindex == 0 && !userMakeState">
          <p class="introduce_title_p1">智能全维度体质检测</p>
          <p class="introduce_title_p2">
            基于生物电阻抗测量原理的全方位测量，通过分析人体成分、人体机能等身体数据，全面评估个人身体健康状况。
          </p>
          <div class="introduce_cover">
            <img :src="`${publicPath}bodytesterStatic/images/ticeyi.png`"
                 height="436" />
          </div>
        </div>
        <div class="introduce_title"
             v-if="itemindex == 1 && !userMakeState">
          <p class="introduce_title_p2"
             style="text-align: center">
            微信扫码进入个人中心<br />查看个人体测历史数据
          </p>
          <QRCode class="vx_qr"
                  :qrwidth="340"
                  :qrheight="340"
                  codeid="2"
                  :codeTest="Qrcode"></QRCode>
        </div>
        <MakeLesson v-if="userMakeState" />
      </div>

      <div class="introduce_start_after"
           v-if="courseState">
        <div class="step_back"
             @click="backindex">
        </div>
        <div class="risk_notice"
             v-if="viewindex === 0">
          <h1 class="h1_title">测试注意事项</h1>
          <ul class="careful_ul">
            <li v-for="item of carefulList"
                :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="apparatus_test"
             v-show="viewindex === 1">
          <h1 class="h1_title">完善个人信息</h1>
          <div class="choice_sex">
            <h2>点击选择你的性别</h2>
            <div class="gender">
              <section :class="[
                'gender_male',
                user_sex == 1 ? 'gender_male_active' : '',
              ]"
                       @click="commitAge(1)">
                <div>男</div>
              </section>
              <section :class="[
                'gender_male',
                user_sex == 2 ? 'gender_male_active' : '',
              ]"
                       @click="commitAge(2)">
                女
              </section>
            </div>
          </div>
          <div class="choice_age">
            <h2>选择你的年龄</h2>
            <input id="rulerText3"
                   class="text-input"
                   type="text"
                   readonly=""
                   v-model="user_age" />
            <section id="roll">
              <!-- 刻度尺容器(必要的) -->
              <div class="ruler-wrap"
                   id="ruler">
                <canvas style="transform: scale(0.7),width:2000px;height:120px; transform-origin: left top;">
                </canvas>
                <img style="margin: 18px 0 0 18px;width: 33px;"
                     src="~assets/images/common/Polygon.png"
                     alt="">
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import { mapGetters } from 'vuex'
import QRCode from '../QRCode.vue'
import MakeLesson from '@/components/common/MakeLesson.vue'
import { inbt } from "@/assets/js/kedu";
export default {
  components: {
    RadialProgressBar,
    MakeLesson,
    QRCode,
  },
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
  watch: {

    viewindex (val) {
      console.log(val)
      if (val == 1) {
        this.methd()
      }
    }
  },
  data () {
    return {
      carefulList: [
        '运动后不宜立即测量，力量训练和剧烈运动都会造成体成分的暂时性变化',
        '淋浴或桑拿后不宜立即测量，出汗会导致体成分发生暂时性变化',
        '测量前静立5分钟左右，尽量空腹测量',
        '女性月经或怀孕期间不宜进行测量',
        '体内佩戴心脏起搏器或支架等电子医疗器着及体内带有金属接物,请勿使用',
      ],
      inputval: 25
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'user_sex',
      'user_age',
      'userMakeState',
      'caretitle',
      'caredesc',
      'Qrcode',
      'publicPath',
    ]),
  },
  created () { },
  mounted () { },
  methods: {
    commitAge (sex) {
      this.$store.commit('set_user_sex', sex)
    },
    backindex () {
      this.$emit('setitemindex')
    },
    removetimer () {
      clearInterval(this.timer)
      this.timer = null
    },
    methd: function () {
      var obj = {
        el: "ruler", //容器id
        height: 50, //刻度尺高度
        maxScale: 80, //最大刻度
        startValue: this.user_age || 0, //刻度开始的初始值
        region: [8, 80], //选择刻度的区间范围
        background: "#303445", //刻度尺背景色
        color: "#fff", //刻度线和字体的颜色
        markColor: "#3786db", //中心刻度标记颜色
        isConstant: true, //是否不断地获取值
        success: (res) => {
          // this.inputval = res;
          this.$store.commit('set_user_age', res)
        },
      };
      inbt(obj);
    },
  },
}
</script>
