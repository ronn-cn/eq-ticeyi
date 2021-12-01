<style scoped lang="scss">
.main_page {
  width: 100%;
  height: 100%;
}
.end_page {
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  &_left {
    padding: 0.63rem 0.58rem 1.04rem 0.6rem;
    position: relative;
    .left_phone {
      width: 3.96rem;
      height: 6.33rem;
      border-radius: 0.4rem;
      border: 1px solid rgba(8, 161, 192, 0.6);
      .user_phone {
        padding: 0.95rem 0.46rem 0 0.46rem;
        color: #fff;
        .user_phone_active {
          display: flex;
          flex-direction: column;
          align-items: center;
          .active_img {
            // background: #6496ee;
            margin-bottom: 0.16rem;
            img {
              width: 0.99rem;
              height: 0.99rem;
              border-radius: 50%;
            }
          }
        }
        .user_phone_star {
          margin-top: 0.6rem;
          width: 100%;
          height: 0.52rem;
          font-size: 0.2rem;
          line-height: 0.52rem;
          background: rgba(100, 150, 238, 0.2);
          border-radius: 0.08rem;
        }
        .user_ability {
          margin-top: 0.4rem;
          display: flex;
          justify-content: space-between;
          .sport_power,
          .vitality {
            width: 1.47rem;
            height: 1.26rem;
            background: rgba(100, 150, 238, 0.2);
            // opacity: 0.5;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .pp1 {
              font-size: 0.3rem;
              margin-bottom: 0.1rem;
            }
            .pp2 {
              color: #b6d1ff;
              font-size: 0.16rem;
            }
          }
        }
      }

      &_qrcode {
        .qrcode_image {
          width: 2.07rem;
          height: 2.07rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.95rem 0.91rem 0.33rem 0.98rem;
        }
        .rqcode_text {
          font-size: 0.2rem;
          opacity: 0.5;
          color: #f3f9fe;
        }
      }
      &_btn {
        margin-top: 0.62rem;
        ul {
          display: flex;
          justify-content: space-around;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
              // width: 40px;
              // height: 40px;
              // border-radius: 50%;
              img {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
              }
              // background: chartreuse;
            }
            .icon_text {
              color: #b6d1ff;
              font-size: 0.2rem;
              margin-top: 0.12rem;
            }
          }
        }
      }
    }
    .left_back {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 5.14rem;
      height: 1.2rem;
      background: #6496ee;
      display: flex;
      .btn_comm {
        width: 50%;
        line-height: 1.2rem;
        border-right: 1px solid;
      }
      .btn_back1 {
        width: 50%;
        line-height: 1.2rem;
      }
      .btn_back2 {
        width: 100%;
        line-height: 1.2rem;
      }
    }
  }
  &_right {
    color: #fff;
    width: 7.66rem;
    // height: 8rem;
    background: linear-gradient(
      70deg,
      #25293c 0%,
      rgba(46, 46, 55, 0.66) 69%,
      rgba(68, 57, 64, 0.5) 100%
    );
    .rignt_head {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 0.31rem;
      &_badge {
        width: 5.18rem;
        height: 0.84rem;
        // background: url($publicPath + '/TreadmillStatic/images/end_icon_5.png')
        //   no-repeat;
        // background-position: left;
        // background-repeat: repeat-y;
        display: flex;
        align-items: center;
        span {
          font-size: 0.36rem;
          letter-spacing: 4px;
        }
      }
      &_grade {
        width: 1.27rem;
        height: 1.27rem;
        img {
          position: relative;
          top: 0.16rem;
        }
      }
    }
    .right_type {
      margin: 0.34rem 0;
      ul {
        display: flex;
        justify-content: space-around;
        li {
          display: flex;
          flex-direction: column;
          .right_type_value {
            font-size: 0.28rem;
            font-weight: bold;
            .value_text {
              font-weight: 400;
              margin-right: 5px;
            }
            .unit_text {
              font-size: 18px;
            }
          }
          .right_type_title {
            margin-top: 0.08rem;
            font-size: 0.18rem;
            font-weight: 400;
          }
        }
      }
    }
    .right_composite {
      display: flex;
      padding: 0.2rem 0.5rem 0.4rem;
      div {
        margin-right: 0.6rem;
      }
      .composite_label {
        font-size: 0.16rem;
        margin-right: 0.2rem;
      }
    }
    .right_echart {
      height: 1.68rem;
      width: 6.66rem;
      // background: #6496ee;
      margin: 0 auto;
    }
    .right_text {
      margin-top: 0.7rem;
      text-align: left;
      padding-left: 8%;
      p {
        font-size: 0.2rem;
        margin-bottom: 0.2rem;
        letter-spacing: 3px;
        line-height: 0.36rem;
      }
    }
  }
}
</style>

<template>
  <div class="main_page">
    <div class="end_page" v-if="pagestatus">
      <section class="end_page_left">
        <div class="left_phone">
          <div v-if="!loginState">
            <div class="left_phone_qrcode">
              <div class="qrcode_image" id="qrdiv">
                <QRCode
                  :codeTest="Qrcode"
                  :qrwidth="240"
                  :qrheight="240"
                  codeid="2"
                  v-if="rqcodestate"
                />
              </div>
              <p class="rqcode_text">扫码登陆后可查看更多内容</p>
            </div>
          </div>
          <div class="user_phone" v-if="loginState">
            <section class="user_phone_active">
              <div class="active_img">
                <img :src="userInfo.user_avatar" alt="" />
              </div>
              <span>{{ userInfo.user_name || '' }}</span>
              <span></span>
            </section>
            <div class="user_ability">
              <div class="sport_power">
                <p class="pp1">{{ sport_power }}</p>
                <p class="pp2">运动能力</p>
              </div>
              <div class="vitality">
                <p class="pp1">{{ vitality }}</p>
                <p class="pp2">活力</p>
              </div>
            </div>
            <!-- <section class="user_phone_star">
            本次获星:3颗
          </section> -->
          </div>
        </div>
        <div class="left_back">
          <div class="btn_comm" v-if="loginState" @click="pagestatus = false">
            推荐课程
          </div>
          <div
            :class="loginState ? 'btn_back1' : 'btn_back2'"
            @click="$router.push('/')"
          >
            返回
          </div>
        </div>
      </section>
      <section class="end_page_right">
        <div class="rignt_head">
          <div class="rignt_head_badge">
            <div>
              <img
                :src="`${publicPath}TreadmillStatic/images/end_icon_4.png`"
                alt=""
              />
            </div>
            <span>{{
              reneging == 0 ? '恭喜您完成本次训练!' : '您已中止本次训练'
            }}</span>
          </div>
          <div
            class="rignt_head_grade"
            :style="{
              background: `url(${publicPath}TreadmillStatic/images/end_icon_6.png) no-repeat`,
              backgroundSize: 'contain',
            }"
          >
            <img :src="scoreimg()" alt="" />
          </div>
        </div>
        <section class="right_composite">
          <div>
            <span class="composite_label">运动时间</span
            ><span>{{ runtimer }}</span>
          </div>
          <div><span class="composite_label">综合评分</span><span>0</span></div>
        </section>
        <div class="right_echart">
          <echarts
            :echartTimeArr="echartTimeArr"
            :echartSpeedArr="echartSpeedArr"
          ></echarts>
        </div>
        <div class="right_type">
          <ul>
            <li v-for="(item, index) of typeList" :key="item.title">
              <div class="right_type_value">
                <span class="value_text">{{ item.value }}</span>
                <span class="unit_text">{{
                  index == 0
                    ? 'm'
                    : index == 1
                    ? 'Km/h'
                    : index == 2
                    ? 'Kcal'
                    : ''
                }}</span>
              </div>
              <span class="right_type_title">{{ item.title }}</span>
            </li>
          </ul>
        </div>
        <div class="right_text">
          <p>
            {{
              reneging == 0
                ? '运动完成后记得要拉伸放松肌肉，帮助恢复，请到智慧健身镜获取拉伸课程吧！'
                : '您中止了此次训练，坚持就是胜利，下次加油哦~'
            }}
          </p>
        </div>
      </section>
    </div>
    <CommendPage v-if="!pagestatus" @setpagestatus="setpagestatus" />
  </div>
</template>

<script>
import api from '@/api/api'
import Echarts from '@/components/treadmill/Ecahrts.vue'
import { mapGetters, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
import CommendPage from '@/components/CommendPage.vue'
export default {
  components: {
    QRCode,
    Echarts,
    CommendPage,
  },
  data() {
    return {
      typeList: [
        {
          title: '运动距离',
          value: 2,
        },
        {
          title: '平均速度',
          value: 2,
        },
        {
          title: '卡路里',
          value: 2,
        },
        {
          title: '平均坡度',
          value: 2,
        },
      ],
      reneging: 0,
      rqcodestate: false,
      combinedscore: 85,
      runtimer: '00:00:00',
      vitality: 2,
      sport_power: 2,
      echartTimeArr: [],
      echartSpeedArr: [],
      pagestatus: true,
      Endruninfo: {},
    }
  },
  created() {
    if (this.$route.query.Runinfo) {
      let runinfo = (this.Endruninfo = JSON.parse(this.$route.query.Runinfo))
      this.typeList[0].value = runinfo.distance
      this.typeList[1].value = runinfo.speed_avg
      this.typeList[2].value = runinfo.calorie
      this.typeList[3].value = runinfo.incline_avg
      this.runtimer = runinfo.runtime
    }
    this.echartTimeArr = this.$route.query.echartTimeArr
    this.echartSpeedArr = this.$route.query.echartSpeedArr
  },
  mounted() {
    if (!this.loginState) {
      this.updeQrcode()
    } else {
      this.getUserAll()
    }
  },
  //离开页面
  destroyed: function () {
    this.$store.dispatch('clientEnd')
    this.addTreadmillEnd(this.Endruninfo)
    if (this.lesson_id) {
      this.$store.commit('set_lesson_id', '')
    }
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'userInfo',
      'lesson_id',
      'publicPath',
    ]),
  },
  watch: {
    loginState(val) {
      if (val) {
        this.getUserAll()
      } else {
        this.updeQrcode()
      }
    },
  },
  methods: {
    ...mapActions(['addTreadmillEnd']),
    setpagestatus() {
      this.pagestatus = true
    },
    updeQrcode() {
      this.rqcodestate = false
      this.$nextTick()
      this.rqcodestate = true
    },
    scoreimg() {
      const value = this.combinedscore
      if (value > 80) {
        return `${this.publicPath}TreadmillStatic/images/end_imgA.png`
      } else if (value < 80 && value > 60) {
        return `${this.publicPath}TreadmillStatic/images/end_imgB.png`
      } else if (value < 60 && value > 40) {
        return `${this.publicPath}TreadmillStatic/images/end_imgC.png`
      } else if (value < 40 && value > 20) {
        return `${this.publicPath}TreadmillStatic/images/end_imgD.png`
      } else if (value < 20 && value >= 0) {
        return `${this.publicPath}TreadmillStatic/images/end_imgE.png`
      } else {
        return `${this.publicPath}TreadmillStatic/images/end_imgA.png`
      }
    },
    async getUserAll() {
      const rs = await api.get('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      console.log('用户信息', rs)
      if (rs.data.code == '200') {
        this.vitality = rs.data.data['data'].vitality
        this.sport_power = rs.data.data['data'].sport_power
      }
    },
  },
}
</script>
