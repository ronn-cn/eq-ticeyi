<style scoped lang="scss">
.home_view_introduce {
  width: 1405px;
  height: 889px;
  margin-bottom: 20px;
  background-color: rgb(25, 211, 18);
  background: url('~assets/images/phase2/back2.svg') no-repeat;
  border: 1px solid #000000;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;

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
    padding: 0.53rem 0 0.59rem 0;
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
        margin-top: 0.37rem;
        line-height: 0.4rem;
      }
      .gender {
        display: flex;
        justify-content: center;
        .gender_male,
        .gender_female {
          width: 1.6rem;
          height: 0.7rem;
          line-height: 0.7rem;
          background: rgba(100, 150, 238, 0.15);
          // opacity: 0.5;
          border-radius: 0.08rem;
        }
        .gender_male {
          margin-right: 0.44rem;
        }
        .gender_male_active {
          background: rgba(100, 150, 238, 0.3);
          border: 2px solid #3476fe;
          border-radius: 0.08rem;
        }
        .gender_female_active {
          background: rgba(100, 150, 238, 0.3);
          border: 2px solid #ff61f6;
          border-radius: 0.08rem;
        }
      }
      .h1_age {
        margin: 0.4rem 0;
        font-size: 0.38rem;
      }
    }
    .action_demo {
      ul {
        margin-top: 1rem;
        text-align: center;
        // padding-left: 1rem;
        counter-reset: section;
        display: flex;
        justify-content: space-around;
        li {
          padding-bottom: 0.14rem;
          font-size: 0.2rem;
          width: 2.55rem;
          .title_images {
            width: 2.55rem;
            height: 1.67rem;
            margin-bottom: 0.42rem;
            // background-color: #89b2e7;
            img {
              width: 100%;
              height: 100%;
            }
          }
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
      &_img {
        position: relative;
        left: -0.04rem;
        width: 0.32rem;
      }
    }
    .apparatus_picture {
      width: 5.28rem;
      height: 3.51rem;
      margin: 0 auto;
      // background: chartreuse;
    }
  }
}
.careradia {
  display: flex;
  justify-content: center;
  color: #fff;
  margin-top: 0.4rem;
}
.introduce_logo {
  position: fixed;
  top: 0.1rem;
  right: 1.24rem;
  img {
    width: 0.7rem;
  }
}
.careful_ul {
  padding-left: 0.6rem;
  li {
    list-style-type: disc;
    padding: 0.1rem 0;
  }
}
.careful_title {
  margin-top: 1.1rem;
  color: #40f9ef;
  font-size: 0.2rem;
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
  background: linear-gradient(180deg, #323647 0%, #222631 100%) !important;
}
</style>

<template>
  <div>
    <div
      class="home_view_introduce"
      :class="courseState ? 'introduce_active' : ''"
    >
      <div class="introduce_start_before" v-if="!courseState">
        <!-- <div class="introduce_logo">
          <img :src="`${publicPath}common/images/login_img1.png`" />
        </div> -->
        <!-- <div class="introduce_make">
          {{ userMakeState ? '设备已预约' : '设备可使用' }}
        </div> -->

        <div class="introduce_title" v-if="itemindex == 0 && !userMakeState">
          <p class="introduce_title_p1">体脂秤自助体测</p>
          <p class="introduce_title_p2">
            科学的了解自己的身体情况，智能检测10项全身指标分析，并根据个人身体状态提供科学运动指导方案
          </p>
          <div class="introduce_cover">
            <img
              :src="`${publicPath}bodytesterStatic/images/ticeyi.png`"
              width="296"
              height="328"
            />
          </div>
        </div>
        <div class="introduce_title" v-if="itemindex == 1 && !userMakeState">
          <p class="introduce_title_p2" style="text-align: center">
            微信扫码进入个人中心<br />查看个人体测历史数据
          </p>
          <QRCode
            class="vx_qr"
            :qrwidth="340"
            :qrheight="340"
            codeid="2"
            :codeTest="Qrcode"
          ></QRCode>
        </div>
        <MakeLesson v-if="userMakeState" />
      </div>

      <div class="introduce_start_after" v-if="courseState && itemindex == 0">
        <div class="risk_notice" v-if="viewindex === 0">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}bodytesterStatic/images/view_back.png`"
              class="step_back_img"
            />
          </div>
          <h1 class="h1">测试注意事项</h1>
          <ul class="careful_ul">
            <li v-for="item of carefulList" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="apparatus_test" v-if="viewindex === 1">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}bodytesterStatic/images/view_back.png`"
              class="step_back_img"
            />
          </div>
          <h1 class="h1">性别</h1>
          <div class="gender">
            <section
              :class="[
                'gender_male',
                user_sex == 1 ? 'gender_male_active' : '',
              ]"
              @click="commitAge(1)"
            >
              <div>男</div>
            </section>
            <section
              :class="[
                'gender_female',
                user_sex == 0 ? 'gender_female_active' : '',
              ]"
              @click="commitAge(0)"
            >
              女
            </section>
          </div>
          <h1 class="h1_age">年龄</h1>
          <date-picker></date-picker>
        </div>

        <div class="action_demo" v-if="viewindex === 2">
          <div class="step_back" @click="backindex">
            <img
              :src="`${publicPath}bodytesterStatic/images/view_back.png`"
              class="step_back_img"
            />
          </div>
          <ul class="action_demo_ul">
            <li v-for="(item, index) of actionImg" :key="item.title">
              <div class="title_images">
                <img :src="publicPath + item.url" alt="" />
              </div>
              <p>{{ index + 1 }}.{{ item.title }}</p>
            </li>
          </ul>
          <div class="careful_title">
            注：如需重新测试，请先离开体脂秤再上去
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import { mapGetters } from 'vuex'
import DatePicker from './DatePicker.vue'
import QRCode from '../QRCode.vue'
import MakeLesson from '@/components/common/MakeLesson.vue'
export default {
  components: {
    RadialProgressBar,
    MakeLesson,
    DatePicker,
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
  data() {
    return {
      carefulList: [
        '运动后不宜立即测量，力量训练和剧烈运动都会造成体成分的暂时性变化',
        '淋浴或桑拿后不宜立即测量，出汗会导致体成分发生暂时性变化',
        '测量前静立5分钟左右，尽量空腹测量',
        '女性月经或怀孕期间不宜进行测量',
        '体内佩戴心脏起搏器或支架等电子医疗器着及体内带有金属接物,请勿使用',
      ],
      actionImg: [
        {
          url: 'bodytesterStatic/images/test_guide3.png',
          title: '请双脚踩在体脂秤上，保持身体平衡',
        },
        {
          url: 'bodytesterStatic/images/test_guide1.png',
          title: '双手握住手柄，拇指一侧充分接触电极部分',
        },
        {
          url: 'bodytesterStatic/images/test_guide2.png',
          title: '点击确认，保持静止10-20秒，待检测完成',
        },
      ],
    }
  },
  watch: {},

  computed: {
    ...mapGetters([
      'loginState',
      'user_sex',
      'userMakeState',
      'caretitle',
      'caredesc',
      'Qrcode',
      'publicPath',
    ]),
  },
  created() {},
  mounted() {},
  methods: {
    commitAge(sex) {
      this.$store.commit('set_user_sex', sex)
    },
    backindex() {
      this.$emit('setitemindex')
    },
    removetimer() {
      console.log('得得得')
      clearInterval(this.timer)
      this.timer = null
    },
  },
}
</script>
