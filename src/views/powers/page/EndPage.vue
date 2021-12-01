<style scoped lang="scss">
.end_page {
  width: 100%;
  height: 100%;
  // background: black;
  display: flex;
  &_left {
    width: 30%;
    // padding: 0.63rem 0.58rem 1.04rem 0.6rem;
    position: relative;
    background-color: rgb(240, 248, 250);
    .left_phone {
      width: 3rem;
      height: 6rem;
      margin: 0 auto;
      margin-top: 0.4rem;
      border-radius: 0.4rem;
      border: 3px solid #7f7f7f;
      &_qrcode {
        .vx_qr {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }
        .code_p1 {
          color: #000;
          font-size: 0.16rem;
          font-weight: bold;
          margin-top: 0.2rem;
        }
        .rqcode_text {
          font-size: 0.16rem;
          font-weight: bold;
          // opacity: 0.5;
          color: #000000;
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
              img {
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
              }
            }
            .icon_text {
              color: #000000;
              font-size: 0.14rem;
              margin-top: 0.12rem;
            }
          }
        }
      }
    }
  }
  &_right {
    color: #000;
    width: 70%;
    background: #f2f2f2;
    position: relative;
    .rignt_head {
      display: flex;
      align-items: center;
      padding-left: 5%;
      margin-top: 0.31rem;
      position: relative;
      &_badge {
        width: 75%;
        height: 0.84rem;
        background-position: left;
        background-repeat: repeat-y;
        // background: darkcyan;
        border-bottom: 1px solid #000;
        display: flex;
        align-items: center;
        span {
          font-size: 0.36rem;
          letter-spacing: 0.04rem;
        }
      }
      &_grade {
        position: absolute;
        top: -0.2rem;
        right: 1.2rem;
        img {
          width: 1.3rem;
          height: 1.5rem;
        }
      }
    }
    .right_type {
      margin-top: 0.34rem;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 5%;
        // justify-content: space-around;
        li {
          width: 38%;
          text-align: left;
          padding-bottom: 0.2rem;
          // display: flex;
          // flex-direction: column;
          .right_type_value {
            display: inline-block;
            width: 35%;
            font-size: 0.28rem;
            font-weight: bold;
          }
          .right_type_title {
            display: inline-block;
            width: 45%;
            font-size: 0.2rem;
            font-weight: 400;
          }
        }
      }
    }
    .right_echart {
      width: 100%;
      margin: 0.2rem 0;
      h3 {
        font-size: 0.22rem;
        text-align: left;
        padding: 0 0 0.2rem 5%;
      }
      .echart_size {
        width: 90%;
        height: 1rem;
      }
    }
    // .right_text {
    //   margin-top: 0.7rem;
    //   text-align: left;
    //   padding-left: 5%;
    //   p {
    //     font-size: 0.2rem;
    //     margin-bottom: 0.2rem;
    //     letter-spacing: 0.03rem;
    //     line-height: 0.36rem;
    //   }
    // }
  }
  .right_foot {
    width: 100%;
    height: 0.8rem;
    // background-color: aqua;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    .btn_btn {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 1);
    }
    .btn_btn1,
    .btn_btn2 {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 1);
      position: relative;
      .btn_end1 {
        // width: 10%;
        position: absolute;
        left: 0;
        animation: backTo 30s linear;
        height: 100%;
        background-color: rgba(214, 199, 199, 0.753);
      }
      .btn_end2 {
        // width: 10%;
        position: absolute;
        left: 0;
        animation: backTo2 30s linear;
        height: 100%;
        background-color: rgba(167, 167, 167, 0.753);
      }
    }
    .btn_btn2 {
      width: 100%;
    }
  }
}
@keyframes backTo {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes backTo2 {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>

<template>
  <div class="end_page">
    <section class="end_page_left" v-if="!loginState">
      <div class="left_phone">
        <div>
          <div class="left_phone_qrcode">
            <!-- <div class="qrcode_image" id="qrdiv"></div> -->
            <!-- <p class="rqcode_text">扫码登陆后可查看更多内容</p> -->
            <QRCode
              ref="qrcode1"
              v-if="qrstate"
              class="vx_qr"
              :qrwidth="224"
              :qrheight="224"
              codeid="3"
              :codeTest="Qrcode"
            ></QRCode>
            <p class="code_p1">扫码登录后可查看更多内容</p>
          </div>
          <div class="left_phone_btn">
            <ul>
              <li v-for="item of dataList" :key="item.title">
                <div class="icon">
                  <img :src="publicPath + item.imgurl" alt="" />
                </div>
                <span class="icon_text">{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="user_phone" v-if="loginState">
          <section class="user_phone_active">
            <div class="active_img">
              <img :src="userInfo.user_avatar" alt="" />
            </div>
            <span>{{ userInfo.user_name || '' }}</span>
            <span></span>
          </section>
          <section class="user_phone_star">本次获星:3颗</section>
        </div> -->
      </div>
    </section>
    <section class="end_page_left" v-if="loginState">
      <recomm-user @userlogout="logout" v-if="loginState" />
    </section>
    <section class="end_page_right" v-if="!recommstate">
      <div class="rignt_head">
        <div class="rignt_head_badge" v-if="reneging == 0">
          <div>
            <img
              :src="`${publicPath}powerStatic/images/end_icon_4.png`"
              alt=""
            />
          </div>
          <span>恭喜你完成本次训练!</span>
        </div>
        <div class="rignt_head_badge" v-if="reneging == 1">
          <div>
            <img
              :src="`${publicPath}powerStatic/images/end_icon_4.png`"
              alt=""
            />
          </div>
          <span>你已结束本次训练!</span>
        </div>
        <div class="rignt_head_grade">
          <img :src="scoreimg()" alt="" />
        </div>
      </div>
      <div class="right_type">
        <ul>
          <li v-for="item of typeList" :key="item.title">
            <div class="right_type_title">{{ item.title }}</div>
            <div class="right_type_value">{{ item.value }}</div>
          </li>
        </ul>
      </div>
      <div class="right_echart">
        <h3>训练完成度</h3>
        <echarts class="echart_size"></echarts>
      </div>
      <div class="right_echart">
        <h3>训练节奏</h3>
        <echarts class="echart_size"></echarts>
      </div>
      <!-- <div class="right_text">
        <p v-if="reneging == 0">
          您已完成本次课程全部训练,参与锻炼肌群包括腹直肌等。
        </p>
        <p v-if="reneging == 1">您中止了此次训练，坚持就是胜利，下次加油哦~</p>
        <p>
          运动完成后记得要拉伸放松肌肉，帮助恢复，请到智慧健身镜获取拉伸课程吧！
        </p>
      </div> -->
      <div class="right_foot">
        <div class="btn_btn" @click="footbtn(0)" v-if="loginState">
          推荐课程
        </div>
        <div
          :class="[loginState ? 'btn_btn1' : 'btn_btn2']"
          @click="footbtn(1)"
        >
          <div :class="loginState ? 'btn_end1' : 'btn_end2'"></div>
          <span>结束课程({{ timenum }}s)</span>
        </div>
      </div>
    </section>
    <section class="end_page_right" v-if="recommstate">
      <recomm-courses :courseList="courseList" />
    </section>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue'
import { mapGetters, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
import RecommCourses from '@/components/RecommCourses.vue'
import RecommUser from '@/components/RecommUser.vue'
import api from '@/api/api.js'
export default {
  components: {
    Echarts,
    RecommCourses,
    RecommUser,
    QRCode,
  },
  data() {
    return {
      dataList: [
        {
          imgurl: 'powerStatic/images/end_icon_1.png',
          title: '课程推荐',
        },
        {
          imgurl: 'powerStatic/images/end_icon_2.png',
          title: '运动记录',
        },
        {
          imgurl: 'powerStatic/images/end_icon_3.png',
          title: '更多功能',
        },
      ],
      typeList: [
        {
          title: '综合评分',
          value: 19,
        },
        {
          title: '运动时间',
          value: '00:00',
        },
        {
          title: '总负重',
          value: '1',
        },
        {
          title: '平均负重',
          value: '1',
        },
      ],
      reneging: 0,
      recommstate: false,
      qrstate: false,
      courseList: [],
      timenum: 30,
      downtimer: null,
    }
  },
  created() {
    if (this.$route.query.reneging) {
      this.reneging = this.$route.query.reneging
    }
    if (this.$route.query.timevalue) {
      this.typeList[1].value = this.$route.query.timevalue
    }
    this.typeList[0].value = this.combinedscore
    this.typeList[2].value = this.totalweight
    this.typeList[3].value = this.averagescore
  },
  mounted() {
    // console.log(this.Qrcode, this.loginState)
    if (!this.loginState) {
      this.init_qrcode()
    }
  },
  //离开页面
  destroyed: function () {
    this.svseEndData() //结束提交
    clearInterval(this.downtimer)
    this.$store.commit('set_recommendid', '') //离开设置课程为空
    this.$store.dispatch('clientEnd')
    if (this.lesson_id) {
      this.$store.commit('set_lesson_id', '')
    }
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'ouid',
      'userInfo',
      'totalweight',
      'averagescore',
      'combinedscore',
      'lesson_id',
      'publicPath',
    ]),
  },
  watch: {
    loginState: {
      handler(val, oldval) {
        if (!val) {
          this.init_qrcode()
        }
        this.setdowntimer()
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['logout', 'svseEndData']),
    async init_qrcode(text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    //评分图片
    scoreimg() {
      const value = this.typeList[0].value
      if (value > 80) {
        return `${this.publicPath}common/images/end_imgA.png`
      } else if (value < 80 && value > 60) {
        return `${this.publicPath}common/images/end_imgB.png`
      } else if (value < 60 && value > 40) {
        return `${this.publicPath}common/images/end_imgC.png`
      } else if (value < 40 && value > 20) {
        return `${this.publicPath}common/images/end_imgD.png`
      } else if (value < 20 && value >= 0) {
        return `${this.publicPath}common/images/end_imgE.png`
      } else {
        return `${this.publicPath}common/images/end_imgA.png`
      }
    },
    setdowntimer() {
      if (this.downtimer) {
        clearInterval(this.downtimer)
        this.timenum = 30
      }

      this.downtimer = setInterval(() => {
        let num = (this.timenum -= 1)
        if (num !== 0) {
          this.timenum = num
        } else {
          clearInterval(this.downtimer)
          this.$router.push('/')
        }
      }, 1000)
    },
    //推荐结束
    async footbtn(index) {
      if (index == 0) {
        const rs = await api.post('/guide-lesson', {
          user_id: this.userInfo.user_id,
        })

        if (rs.data.code == '200') {
          let data = rs.data.data.lessonIds
          // const lessons = require('../../../../public/common/js/lessons.json')
          this.$axios.get('./common/js/lessons.json').then((res) => {
            for (let i in data) {
              res.data.forEach((item) => {
                if (item.md5 == data[i]) {
                  // console.log(item)
                  this.courseList.push({
                    md5: item.md5,
                    name: item.name,
                    desc: item.desc,
                    equipmenttype: item.equipmenttype,
                  })
                }
              })
            }
            this.recommstate = true
            clearInterval(this.downtimer)
          })
        }
      } else {
        clearInterval(this.downtimer)
        this.$router.push('/')
      }
    },
  },
}
</script>
