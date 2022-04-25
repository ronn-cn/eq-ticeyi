<style scoped lang="scss">
.view_main {
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(180deg, #323647 0%, #222631 100%);
}
.view_endpage {
  padding: 20px;
}
.view_left {
  margin-right: 18px;
  &_score {
    width: 455px;
    height: 433px;
    border: 1px solid #7f7f7f;
    border-radius: 20px;
    .left_score {
      width: 2.4rem;
      height: 2.4rem;
      margin: auto;
      span {
        position: relative;
        top: 120px;
        font-size: 48px;
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
  display: grid;
  grid-template-columns: repeat(3, 455px);
  grid-template-rows: repeat(5, 131px);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin-top: 20px;
}
.item {
  color: #fff;
  font-size: 0.28rem;
  text-align: center;
  border-radius: 20px;
  background: rgba(78, 80, 90, 0.55);
}
.item-1 {
  grid-area: 1 / 1 / 4 / 3;
}
.item-2 {
  grid-area: 1 / 3 / 3 / 3;
}

.container_shell {
  padding: 0.2rem 0.3rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_title {
    text-align: left;
    font-size: 28px;
    font-family: SourceHanSansCN;
    font-weight: 400;
  }
  .shell_value {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 15px;
    .shell_span1 {
      font-size: 36px;
    }
  }
}

.shell_one_title {
  text-align: left;
  padding: 6px 0;
  margin-bottom: 42px;
  border-bottom: 1px solid #fff;
}
.shell_one {
  display: flex;
}
.shell_one_left {
  width: 230px;
  font-size: 24px;
  text-align: center;
  .one_p2 {
    color: #7f7f7f;
    font-size: 36px;
    padding: 20px 0;
    border-bottom: 1px solid #fff;
    span {
      color: #fff;
      font-size: 46px;
    }
  }
  .one_p3 {
    text-align: left;
    font-size: 18px;
    line-height: 35px;
    margin-top: 20px;
  }
}
.shell_one_right {
  margin-left: 15px;
  width: 591px;
  height: 272px;
  border: 1px solid #696969;
  border-radius: 20px;
}
.shell_two {
  display: flex;
}
.shell_two_title {
  writing-mode: tb-rl;
}
.shell_two_value {
  text-align: left;
  margin-left: 20px;
  font-size: 24px;
  .two_1 {
    font-size: 48px;
    padding: 32px 0;
    border-bottom: 1px solid #7f7f7f;
  }
  .two_2 {
    margin: 20px 0;
  }
}

//第二版
.body_cover {
  display: flex;
}
header {
  position: relative;
  display: flex;
  .head_title1 {
    width: 415px;
    text-align: left;
    font-size: 48px;
    padding: 30px 0 40px 40px;
    margin-right: 18px;
    border-bottom: 1px solid #aaa;
  }
  .head_title2 {
    width: 1360px;
    text-align: left;
    font-size: 48px;
    padding: 30px 0 40px 40px;
    border-bottom: 1px solid #aaa;
  }
  .user_frame {
    position: absolute;
    right: 15px;
    top: 10px;
    display: flex;
    .user_portrait {
      img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
      }
    }
    .user_info {
      margin-left: 20px;
      display: flex;
      align-items: center;
      &_name {
        font-size: 0.24rem;
      }
      // &_gender {
      //   font-weight: 400;
      //   font-size: 0.18rem;
      //   .info_gender {
      //     margin-right: 0.55rem;
      //   }
      // }
    }
  }
}

.basics_info {
  width: 415px;
  height: 92px;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  align-items: center;
  background: rgba(78, 80, 90, 0.5);
  border: 1px solid #7f7f7f;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
  border-radius: 20px;
}
.icon_end1 {
  width: 40px;
  height: 40px;
  margin-right: 40px;
  // background: #28cd41;
  // background: url("~assets/");
}
.basics_text {
  text-align: left;
}
.basics_line {
  // height: 1px;
  margin: 6px 0;
  width: 225px;
  border: 1px dashed #7f7f7f;
}

.footer {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .footer_btn1 {
    width: 455px;
    height: 131px;
    border-radius: 20px;
    background: #007aff;
  }
  .footer_btn2 {
    width: 1405px;
    height: 131px;
    border-radius: 20px;
    background: #28cd41;
  }
}
</style>

<template>
  <div class="view_main">
    <div class="view_endpage"
         v-if="endPageStatus">
      <header>
        <h1 class="head_title1">基础数据</h1>
        <h1 class="head_title2">身体参数</h1>
        <div v-show="loginState"
             class="user_frame">
          <div class="user_portrait">
            <img :src="userInfo.user_avatar || ''" />
          </div>
          <div class="user_info">
            <p class="user_info_name">{{ userInfo.user_name || '' }}</p>
            <!-- <div class="user_info_gender">
              <span class="info_gender">性别: {{ user_sex == 1 ? '男' : '女' }}</span>
              <span>年龄: {{ user_age }}</span>
            </div> -->
          </div>
        </div>
      </header>
      <div class="body_cover">
        <section class="view_left">
          <div class="basics">
            <div class="basics_info">
              <div class="icon_end1"></div>
              <div class="basics_text">
                <p>身高(cm)</p>
                <div class="basics_line"></div>
                <span>{{ RUN_HEIGHT.height }}(cm)</span>
              </div>
            </div>
            <div class="basics_info">
              <div class="icon_end1"></div>
              <div class="basics_text">
                <p>BMI(20.0~23.5)</p>
                <div class="basics_line"></div>
                <span>{{ user_bmi || 16.3 }}(kg/m^2)</span>
              </div>
            </div>
          </div>

          <section class="view_left_score">
            <div class="left_score"
                 :style="{
                background: `url(${publicPath}bodytesterStatic/images/end_back1.svg) no-repeat`,
                backgroundSize: 'cover',
              }">
              <span>{{ usergrade }}</span>
            </div>

            <p class="left_text">{{ loginState ? "数据已同步至云端" : "登录同步到云端" }}</p>
          </section>
        </section>

        <section id="container">
          <div :class="['item', `item-${index + 1}`]"
               v-for="(item, index) of healthyList"
               :key="item.title">
            <div class="container_shell"
                 v-if="index == 0">
              <h1 class="shell_one_title">体重及体脂率</h1>
              <div class="shell_one">
                <section class="shell_one_left">
                  <p class="one_p1">当前体重 / 目标体重</p>
                  <p class="one_p2">
                    <span>{{ LOCK_WEIGHT.weight || 50 }}kg</span> / {{ 65 }}kg
                  </p>
                  <p class="one_p3">
                    您可以通过每周3-5次的体能耐力训练及有氧运动来达到减脂的目的
                  </p>
                </section>
                <section class="shell_one_right">
                  <endEchart />
                </section>
              </div>
            </div>
            <div class="container_shell"
                 v-else-if="index == 1">
              <div class="shell_two">
                <h1 class="shell_two_title">体脂率</h1>
                <div class="shell_two_value">
                  <div class="two_1">{{ 14.8 }}%</div>
                  <p class="two_2">标准:11.0~20.0</p>
                  <p class="two_3">正常</p>
                </div>
              </div>
            </div>
            <div class="container_shell"
                 v-else>
              <div class="container_shell_title">{{ item.title }}(<span>{{ titlemin(item.field,1) }}</span>-<span>{{ titlemin(item.field,2)}}</span> )</div>
              <div class="shell_value">
                <span class="shell_span1">{{ item.value || 1}} <span>({{item.company}})</span> </span>
                <span v-html="allindex(item.healthyindex)"></span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <button class="footer_btn1"
                @click="$router.push('/')">返回首页</button>
        <button class="footer_btn2"
                @click="foot_btn()">
          推荐课程
        </button>
      </div>
      <EndOverlay v-if="showQR"
                  @showover="showQR = false" />
    </div>
    <RecommendPage v-if="!endPageStatus"
                   @setpagestatus="endPageStatus = true">
    </RecommendPage>
  </div>
</template>

<script>
import endEchart from "@/components/bodytester/endEchart.vue"
import EndOverlay from "@/components/common/EndOverlay.vue"
import RecommendPage from '@/components/CommendPage.vue'
import api from '@/api/api'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    endEchart,
    RecommendPage,
    EndOverlay
  },
  data () {
    return {
      healthyList: [
        {
          title: '体重及体脂率',
          value: 2,
          healthyindex: 0,  //0偏低  1正常 2偏高 
          company: "1",
          field: ""
        },
        {
          title: '脂肪率(%)',
          value: 14.8,
          healthyindex: 1,
          company: "1",
          field: "fat-percentage"
        },
        {
          title: '基础代谢量',
          value: 1471.0,
          healthyindex: 0,
          company: "Kcal",
          field: "basal-metabolism"
        },
        {
          title: '水分比率',
          value: 43.0,
          healthyindex: 0,
          company: "%",
          field: "water-percentage"
        },
        {
          title: '肌肉量',
          value: 53.7,
          healthyindex: 1,
          company: "%",
          field: "muscle-percentage"
        },
        {
          title: '骨骼量',
          value: 2.9,
          healthyindex: 0,
          company: "kg",
          field: "skeleton-percentage"
        },
        {
          title: '蛋白质率',
          value: 53.7,
          healthyindex: 2,
          company: "%",
          field: "protein-percentage"
        },
        {
          title: '细胞外水分率',
          value: 53.7,
          healthyindex: 0,
          company: "%",
          field: "extracellular-moisture-percentage"
        },
        {
          title: '内脏等级',
          value: 8,
          healthyindex: 0,
          company: "等级",
          field: "visceral-fatGrade"
        },
      ],
      manmax: [
        { min: 0, max: 0, field: "1" },
        { min: 11, max: 25, field: "fat-percentage" }, //脂肪率
        { min: 1300, max: 2000, field: "basal-metabolism" }, //基础代谢量
        //{ min: 18.5, max: 24 }, //BMI
        { min: 52, max: 57, field: "water-percentage" }, //水分比例
        { min: 0, max: 0, field: "muscle-percentage" }, //肌肉量
        { min: 2.4, max: 3.1, field: "skeleton-percentage" }, //骨骼量
        { min: 16, max: 20, field: "protein-percentage" }, //蛋白质率
        { min: 15, max: 21, field: "extracellular-moisture-percentage" }, //细胞外水分率
        { min: 1, max: 9, field: "visceral-fatGrade" }, //内脏等级
      ],
      girtmax: [
        { min: 0, max: 0, field: "1" },
        { min: 20, max: 36, field: "fat-percentage" }, //脂肪率
        { min: 1100, max: 1800, field: "basal-metabolism" }, //基础代谢量
        //{ min: 18.5, max: 24 }, //BMI
        { min: 48, max: 53, field: "water-percentage" }, //水分比例
        { min: 0, max: 0, field: "muscle-percentage" }, //肌肉量
        { min: 1.7, max: 2.4, field: "skeleton-percentage" }, //骨骼量
        { min: 16, max: 20, field: "protein-percentage" }, //蛋白质率
        { min: 15, max: 21, field: "extracellular-moisture-percentage" }, //细胞外水分率
        { min: 1, max: 9, field: "visceral-fatGrade" }, //内脏等级
      ],
      user_bmi: 20,
      endPageStatus: true,
      usergrade: 70,
      showQR: false
    }
  },
  computed: {
    ...mapGetters([
      'loginState',
      'Qrcode',
      'userInfo',
      'bodydata',
      'LOCK_WEIGHT',  //体重
      'RUN_HEIGHT',   //身高
      'user_sex',
      'user_age',
      'ouid',
      'publicPath',
    ])
  },
  watch: {
    loginState (val, oldval) {
      if (val) {
        this.endPageStatus = false
      }
    },
  },
  created () { },
  mounted () {
    if (JSON.stringify(this.bodydata) !== {}) {
      // console.log(this.bodydata)
      this.initbodydata()
    }
    // for (let i of this.manmax) {
    //   console.log(i)
    // }
  },
  //离开页面
  destroyed: function () {
    this.$store.commit('clear_bodydata')
    this.loadaddside()
    this.$store.dispatch('clientEnd')
  },
  methods: {
    ...mapActions(['logout']),
    titlemin (key, type) {
      // let data = type == 1 ? this.manmax : this.girtmax
      let maxdata = this.user_sex == 1 ? this.manmax : this.girtmax
      // console.log(maxdata)
      for (let i of maxdata) {
        if (i.field == key) {
          return type == 1 ? i.min : i.max
        }
      }
    },
    initbodydata () {
      //   'body-age' 身体年龄  'fat-percentage'脂肪 'water-percentage' 水分  'basal-metabolism' 基础代谢  'muscle-percentage' 肌肉
      //   'skeleton-percentage' 骨量 'protein-percentage' 蛋白质率 'extracellular-moisture-percentage' 细胞外水分率 'visceral-fatGrade' 内脏脂肪等级
      for (let i in this.healthyList) {
        if (i !== 0) {
          let field = this.healthyList[i].field
          this.healthyList[i].value = this.bodydata[field]
        }
        this.set_bodylevel(i, this.healthyList[i].value)
      }
      let m2 = this.RUN_HEIGHT.height / 100
      this.user_bmi = Math.round(this.LOCK_WEIGHT.weight / Math.pow(m2, 2))
    },

    async loadaddside () {
      const data = this.bodydata
      // console.log(data)
      // this.usergrade = this.usergrade == 0 ? 70 : this.usergrade == 1 ? 90 : 70
      var msg = {
        device_ouid: this.ouid, //设备ID
        user_ouid: this.userInfo['user_id'] || '', //用户ID
        start_time: new Date().getTime(), //体测时间
        age: Number(this.user_age), //用户年龄
        sex: Number(this.user_sex), //用户性别
        height: this.RUN_HEIGHT.height, //用户身高
        weight: this.LOCK_WEIGHT.weight, //用户体重
        bmi: this.user_bmi, //用户bmi
        fat: data['fat-percentage'], //用户脂肪率
        bmr: data['basal-metabolism'], //用户基础代谢量
        water: data['water-percentage'], //用户水分率
        muscle: data['muscle-percentage'], //用户肌肉量
        bone: data['skeleton-percentage'], //用户骨骼率
        vfi: data['visceral-fatGrade'], //用户内脏脂肪等级
        body_age: data['body-age'], //用户身体年龄
        ewf: data['extracellular-moisture-percentage'], //用户细胞外水分率
        protein: data['protein-percentage'], //用户蛋白质
        grade: this.usergrade, //  用户健康评分
      }
      console.log('msg', msg)

      const rs = await api.post('/add-side', msg)
      console.log(rs)
    },

    //筛选数值
    set_bodylevel (i, value) {
      // console.log(i, value)
      let maxdata = this.user_sex == 1 ? this.manmax : this.girtmax

      // if (this.user_sex == 1) {
      //   maxdata = this.manmax
      // } else {
      //   maxdata = this.girtmax
      // }

      if (value < maxdata[i].min) {
        this.healthyList[i].healthyindex = 0
      } else if (value > maxdata[i].max) {
        this.healthyList[i].healthyindex = 2
      } else {
        this.healthyList[i].healthyindex = 1
      }
    },
    allindex (i) {
      switch (i) {
        case 0:
          return `<span style="color:#ff5c8d" >偏低</span>`
        case 1:
          return `<span style="color:#1affa6" >正常</span>`
        case 2:
          return `<span style="color:#ffda31" >偏高</span>`
      }
    },
    foot_btn () {
      if (this.loginState) {
        this.endPageStatus = false
        // clearInterval(this.downtimer)
      } else {
        console.log('1')
        this.showQR = true
      }
    }
  },
}
</script>
