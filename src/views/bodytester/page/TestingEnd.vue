<style scoped lang="scss">
.view_main {
  width: 100%;
  height: 100%;
  display: flex;
}
.view_endpage {
  width: 100%;
  height: 100%;
  display: flex;
}
.view_left {
  height: 100%;
  width: 3.57rem;
  // background: url('~assets/images/testing_left.png') no-repeat;
  background-color: rgb(28, 32, 47);
  background-size: cover;
  &_backhome {
    display: flex;
    align-items: center;
    position: relative;
    .home_icon {
      position: absolute;
      top: 0.18rem;
      right: 0;
      width: 0.3rem;
      height: 0.3rem;
      background: url('~assets/images/small_icon1.png') no-repeat;
      margin: 0 20px;
    }
  }
  &_line {
    width: 100%;
    height: 0.07rem;
    background-size: cover;
    margin: 0.2rem 0 0.26rem 0;
  }
  &_score {
    h2 {
      text-align: left;
      padding-left: 0.33rem;
    }
    .left_score {
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      span {
        font-size: 0.6rem;
        font-family: DIN;
        font-weight: 500;
      }
    }
    .left_text {
      padding: 0 0.2rem;
      font-size: 0.16rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.29rem;
      opacity: 0.5;
    }
  }
}

#container {
  width: 9.23rem;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(5, 25%);
}
.item {
  color: #fff;
  font-size: 0.28rem;
  text-align: center;
  // border: 1px solid;
  background-color: #1d1e25;
}
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: 1px solid #31353c;
  border-right: 1px solid #31353c;
}
.item-2 {
  border-bottom: 1px solid #31353c;
}
.item-3 {
  grid-row-start: 2;
  grid-row-end: 4;
  border-bottom: 1px solid #31353c;
  border-right: 1px solid #31353c;
}
.item-4,
.item-6 {
  border-bottom: 1px solid #31353c;
  border-right: 1px solid #31353c;
}
.item-5,
.item-7 {
  border-bottom: 1px solid #31353c;
}
.item-8,
.item-9 {
  border-right: 1px solid #31353c;
}

.container_shell {
  padding: 0.2rem;
  height: calc(100% - 0.2rem * 2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_title {
    text-align: left;
    font-size: 0.24rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
  }
  &_BMI {
    width: 1.3rem;
    height: 0.6rem;
    // background: url($publicPath + '/bodytesterStatic/images/testing_icon1.png');
    margin: auto;
    margin-bottom: 0.33rem;
  }
  &_value {
    font-size: 0.42rem;
    // padding: 0.4rem 0 0.28rem 0;
  }
  &_index {
    display: flex;
    justify-content: space-around;
    .index_back {
      width: 0.26rem;
      height: 0.04rem;
      background: #8e8e8f;
      border-radius: 0.02rem;
      margin: auto;
    }
    .index_low {
      background-color: #ff5c8d;
    }
    .index_normal {
      background-color: #1affa6;
    }
    .index_tallish {
      background-color: #ffda31;
    }
    .index_text {
      margin-top: 0.08rem;
      font-size: 0.18rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.4;
    }
  }
}

.loginout {
  width: 1.3rem;
  height: 0.4rem;
  background: rgba(103, 117, 217, 0.3);
  border: 1px solid #89b2e7;
  opacity: 0.5;
  border-radius: 0.25rem;
  font-size: 0.22rem;
  margin: 0.1rem 0 0 0.12rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_portrait {
  // background-color: aqua;
  margin: 0.45rem auto 0.38rem;
  img {
    width: 0.99rem;
    height: 0.99rem;
    border-radius: 50%;
  }
}
.user_info {
  &_name {
    font-size: 0.24rem;
    margin-bottom: 0.26rem;
  }
  &_gender {
    font-weight: 400;
    font-size: 0.18rem;
    .info_gender {
      margin-right: 0.55rem;
    }
  }
}

.basics {
  padding: 0.2rem;
  &_title {
    text-align: left;
    font-size: 0.24rem;
    font-family: SourceHanSansCN;
    font-weight: 400;
    margin-bottom: 0.44rem;
  }
  &_info {
    &_height,
    &_weight {
      font-size: 0.42rem;
      .small_font {
        color: #8e8e8f;
        font-size: 0.16rem;
      }
    }
    &_height {
      margin-right: 0.83rem;
    }
  }
}
.not_logged {
  height: 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="view_main">
    <div class="view_endpage" v-if="endPageStatus">
      <section
        class="view_left"
        :style="{
          backgroundImage: `url(${publicPath}bodytesterStatic/images/testing_left.png)`,
        }"
      >
        <div class="view_left_backhome">
          <div class="home_icon" @click="logout" v-if="loginState"></div>

          <div class="loginout" @click="$router.push('/')">返回首页</div>
          <div
            class="loginout"
            @click="endPageStatus = false"
            v-if="loginState"
          >
            推荐课程
          </div>
        </div>
        <div v-show="loginState">
          <div class="user_portrait">
            <img :src="userInfo.user_avatar || ''" alt="" />
          </div>
          <div class="user_info">
            <p class="user_info_name">{{ userInfo.user_name || '' }}</p>
            <div class="user_info_gender">
              <span class="info_gender"
                >性别: {{ user_sex == 1 ? '男' : '女' }}</span
              >
              <span>年龄: {{ user_age }}</span>
            </div>
          </div>
        </div>
        <div class="not_logged" v-show="!loginState">
          <!-- <div id="qrdiv"></div> -->
          <QRCode
            ref="qrcode1"
            v-if="qrstate"
            class="vx_qr"
            :qrwidth="157"
            :qrheight="157"
            codeid="3"
            :codeTest="Qrcode"
          ></QRCode>
          <p style="padding-top: 0.15rem">扫码登陆同步数据</p>
        </div>
        <section
          class="view_left_line"
          :style="{
            backgroundImage: `url(${publicPath}bodytesterStatic/images/testing_line.png)`,
          }"
        ></section>
        <section class="view_left_score">
          <h2>本次健康评分</h2>
          <div
            class="left_score"
            :style="{
              background: `url(${publicPath}bodytesterStatic/images/testing_score.png) no-repeat`,
              backgroundSize: 'cover',
            }"
          >
            <span>0</span>
          </div>
          <p class="left_text">
            数据已同步至云端，可通过智能健身镜或小程序在线查看
          </p>
        </section>
      </section>
      <section id="container">
        <div
          :class="['item', `item-${index + 1}`]"
          v-for="(item, index) of healthyList"
          :key="item.title"
        >
          <div class="basics" v-if="index + 1 == 1">
            <div class="basics_title">{{ item.title }}</div>
            <div class="basics_info">
              <span class="basics_info_height"
                >{{ RUN_HEIGHT.height }}<span class="small_font">身高(cm)</span>
              </span>
              <span class="basics_info_weight"
                >{{ LOCK_WEIGHT.weight
                }}<span class="small_font">体重(kg)</span></span
              >
            </div>
          </div>
          <div class="container_shell" v-if="index + 1 !== 1">
            <div class="container_shell_title">{{ item.title }}</div>
            <div class="container_shell_value">
              <div
                class="container_shell_BMI"
                v-if="index + 1 == 3"
                :style="{
                  background: `url(${publicPath}bodytesterStatic/images/testing_icon1.png) no-repeat`,
                  backgroundSize: 'cover',
                }"
              ></div>
              <span>{{ item.value }}</span>
            </div>
            <div class="container_shell_index">
              <section
                class="shell_index"
                v-for="i of indexList"
                :key="i.title"
              >
                <div
                  :class="[
                    'index_back',
                    i.index == allindex(item.healthyindex) ? i.index : '',
                  ]"
                ></div>
                <p class="index_text">{{ i.title }}</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
    <RecommendPage
      v-if="!endPageStatus"
      @setpagestatus="setpagestatus"
    ></RecommendPage>
  </div>
</template>

<script>
import RecommendPage from './recommendPage.vue'
import api from '@/api/api'
import { mapGetters, mapActions } from 'vuex'
// import QRCode from "qrcodejs2";
import QRCode from '@/components/QRCode.vue'
export default {
  components: {
    QRCode,
    RecommendPage,
  },
  data() {
    return {
      healthyList: [
        {
          title: '基础数据',
          value: 2,
          healthyindex: 0,
        },
        {
          title: '脂肪率(%)',
          value: 2,
          healthyindex: 1,
        },
        {
          title: 'BMI(kg/m^2)',
          value: 2,
          healthyindex: 2,
        },
        {
          title: '水分比率(%)',
          value: 2,
          healthyindex: 0,
        },
        {
          title: '基础代谢量',
          value: 2,
          healthyindex: 0,
        },
        {
          title: '肌肉量(kg)',
          value: 2,
          healthyindex: 1,
        },
        {
          title: '骨骼量(kg)',
          value: 2,
          healthyindex: 0,
        },
        {
          title: '蛋白质率(%)',
          value: 2,
          healthyindex: 2,
        },
        {
          title: '细胞外水分率(%)',
          value: 2,
          healthyindex: 0,
        },
        {
          title: '内脏等级',
          value: 8,
          healthyindex: 0,
        },
      ],
      indexList: [
        {
          index: 'index_low',
          title: '偏低',
        },
        {
          index: 'index_normal',
          title: '正常',
        },
        {
          index: 'index_tallish',
          title: '偏高',
        },
      ],
      qrstate: true,
      endPageStatus: true,
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'Qrcode',
      'userInfo',
      'bodydata',
      'LOCK_WEIGHT',
      'RUN_HEIGHT',
      'user_sex',
      'user_age',
      'ouid',
      'publicPath',
    ]),
  },
  watch: {
    loginState(val, oldval) {
      if (!val) {
        this.init_qrcode(this.Qrcode)
      }
    },
  },
  created() {},
  mounted() {
    if (JSON.stringify(this.bodydata) !== {}) {
      this.initbodydata()
    }
    if (!this.loginState) {
      this.init_qrcode(this.Qrcode)
    }
  },
  //离开页面
  destroyed: function () {
    this.loadaddside()
    this.$store.dispatch('clientEnd')
  },
  methods: {
    ...mapActions(['logout']),
    initbodydata() {
      console.log('来了吗')
      const arr = [
        'fat-percentage', //脂肪
        'body-age', //身体年龄
        'water-percentage', //水分
        'basal-metabolism', //基础代谢
        'muscle-percentage', //肌肉
        'skeleton-percentage', //骨量
        'protein-percentage', //蛋白质率
        'extracellular-moisture-percentage', //细胞外水分率
        'visceral-fatGrade', //内脏脂肪等级
      ]
      this.healthyList.forEach((item, i) => {
        if (i !== 0 || i !== 2) {
          this.healthyList[i].value = this.bodydata[`${arr[i - 1]}`]
        }
        if (i == 2) {
          let m2 = this.RUN_HEIGHT.height / 100
          this.healthyList[i].value = Math.round(
            this.LOCK_WEIGHT.weight / Math.pow(m2, 2)
          )
        }
        // console.log(i, this.healthyList[i].value)
        this.set_bodylevel(i, this.healthyList[i].value)
      })
    },
    //设置页面状态
    setpagestatus() {
      this.endPageStatus = true
    },
    async loadaddside() {
      const data = this.bodydata
      // console.log(data)
      const bmi = this.healthyList[2].healthyindex
      var msg = {
        device_ouid: this.ouid, //设备ID
        user_id: this.userInfo['user_id'] || '', //用户ID
        start_time: new Date().getTime(), //体测时间
        age: Number(this.user_age), //用户年龄
        sex: Number(this.user_sex), //用户性别
        height: this.RUN_HEIGHT.height, //用户身高
        weight: this.LOCK_WEIGHT.weight, //用户体重
        bmi, //用户bmi
        fat: data['fat-percentage'], //用户脂肪率
        bmr: data['basal-metabolism'], //用户基础代谢量
        water: data['water-percentage'], //用户水分率
        muscle: data['muscle-percentage'], //用户肌肉量
        bone: data['skeleton-percentage'], //用户骨骼率
        vfi: data['visceral-fatGrade'], //用户内脏脂肪等级
        body_age: data['body-age'], //用户身体年龄
        ewf: data['extracellular-moisture-percentage'], //用户细胞外水分率
        protein: data['protein-percentage'], //用户蛋白质
        grade: bmi == 0 ? 70 : bmi == 1 ? 90 : 70, //  用户健康评分
      }
      console.log('msg', msg)

      const rs = await api.post('/add-side', msg)
      console.log(rs)
    },
    //二维码
    async init_qrcode(text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    set_bodylevel(i, value) {
      // console.log(i, value)
      const manmax = [
        { min: 0, max: 0 },
        { min: 11, max: 25 }, //脂肪率
        { min: 18.5, max: 24 }, //BMI
        { min: 52, max: 57 }, //水分比例
        { min: 1300, max: 2000 }, //基础代谢量
        { min: 0, max: 0 }, //肌肉量
        { min: 2.4, max: 3.1 }, //骨骼量
        { min: 16, max: 20 }, //蛋白质率
        { min: 15, max: 21 }, //细胞外水分率
        { min: 1, max: 9 }, //内脏等级
      ]
      const girtmax = [
        { min: 0, max: 0 },
        { min: 20, max: 36 }, //脂肪率
        { min: 18.5, max: 24 }, //BMI
        { min: 48, max: 53 }, //水分比例
        { min: 1100, max: 1800 }, //基础代谢量
        { min: 0, max: 0 }, //肌肉量
        { min: 1.7, max: 2.4 }, //骨骼量
        { min: 16, max: 20 }, //蛋白质率
        { min: 15, max: 21 }, //细胞外水分率
        { min: 1, max: 9 }, //内脏等级
      ]

      let maxdata = []
      if (this.user_sex == 1) {
        maxdata = manmax
      } else {
        maxdata = girtmax
      }
      if (value < maxdata[i].min) {
        this.healthyList[i].healthyindex = 0
      } else if (value > maxdata[i].max) {
        this.healthyList[i].healthyindex = 2
      } else {
        this.healthyList[i].healthyindex = 1
      }
    },
    allindex(i) {
      switch (i) {
        case 0:
          return 'index_low'
        case 1:
          return 'index_normal'
        case 2:
          return 'index_tallish'
      }
    },
  },
}
</script>
