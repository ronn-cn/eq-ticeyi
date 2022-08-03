<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  // background: #1B254B;
}

.courses_containr {
  h4 {
    color: #7f7f7f;
    font-size: 0.18rem;
    padding: 0.25rem 0;
  }

  .courses_item {
    ul {
      height: 4rem;
      overflow-y: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 2.8rem;
        height: 1.8rem;
        margin-bottom: 0.25rem;
        position: relative;

        // background: url(../assets/images/course/弹力带减脂塑形跟练_1920x660.jpg)
        //   no-repeat;
        // background-size: cover;
        // background-color: salmon;
        .item_text {
          padding-left: 10%;
          text-align: left;

          .p1 {
            width: 95%;
            overflow: hidden;
            white-space: nowrap;
            font-size: 0.2rem;
            padding: 0.4rem 0 0.2rem 0;
          }

          .p2 {
            font-size: 0.16rem;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 0.2rem;
            font-size: 0.14rem;
            padding-right: 0.12rem;
          }
        }

        .item_btn {
          width: 1rem;
          height: 0.3rem;
          color: #000;
          font-size: 0.16rem;
          background-color: #fff;
          border-radius: 0.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 0.14rem;
          bottom: 0.14rem;
        }
      }
    }
  }
}

footer {
  width: 100%;
  height: 0.8rem;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  color: #ee494e;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

header {
  height: 1.8rem;
  background-color: rgb(37, 42, 54);
  display: flex;
  align-items: center;
  margin: 20px;
  position: relative;

  .user_avatar {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    // background-color: aqua;
    margin: 0 0.2rem;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .user_info {
    left: 200;
    text-align: left;

    .info_p1 {
      color: #aaaaaa;
      font-size: 0.16rem;
    }

    .info_p2 {
      color: #fff;
      font-size: 0.2rem;
      margin: 0.16rem 0;
    }

    ul {
      display: flex;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.24rem;

        .date_day1 {
          color: #aaaaaa;
          font-size: 0.12rem;
        }

        .date_day2 {
          font-size: 0.18rem;
          margin: 10px 0 6px 0;
        }

        .date_dot1 {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          // margin: auto;
          background-color: #d7d7d7;
        }

        .date_dot2 {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          // margin: auto;
          background-color: #017aff;
        }
      }
    }
  }

  .user_ability {
    width: 4rem;
    // height: 1.3rem;
    color: #fff;
    position: absolute;
    right: 0.4rem;
    display: flex;

    ul {
      display: flex;
      color: #fff;
      width: 100%;
      align-items: center;
      justify-content: center;

      li {
        width: 100%;
        display: flex;
        flex-direction: column;

        span {
          font-size: 0.6rem;
        }

        p {
          margin-top: 20px;
        }
      }
    }

    .ability_icon,
    .ability_icon1,
    .ability_icon2 {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      margin-right: 0.2rem;
      background: url("~assets/images/common/sport_power.png") no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: #333;
    }

    .ability_icon1 {
      background: url("~assets/images/common/vitality.png") no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: #333;
    }

    .ability_icon2 {
      background: url("~assets/images/common/star.png") no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: #333;
    }

    .ability_title {
      text-align: left;

      &_p1 {
        font-size: 0.16rem;
        margin: 0.1rem 0;
      }

      &_p2 {
        font-size: 0.12rem;
      }
    }
  }
}

.main_cover {
  position: relative;
  margin: 20px;

  &_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.35rem;
    color: #fff;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    box-shadow: 5px 5px 15px 0px rgba(85, 85, 85, 0.35);

    .nav_title {
      text-align: left;

      .nav_p1 {
        font-size: 0.28rem;
        margin-bottom: 0.1rem;
      }

      .nav_p2 {
        font-size: 0.16rem;
      }
    }

    .nav_btn {
      width: 2rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 12px;
      background-color: #1fac4a;
      box-sizing: border-box;
      box-shadow: 5px 5px 20px 0px #10c98f,
        inset 5px 5px 20px 0px rgba(255, 255, 255, 0.35);
    }
  }

  &_plan {
    margin-top: 0.2rem;
    width: 100%;
    height: 100%;
    // height: calc(1080px-2.2rem);
    display: flex;
    justify-content: space-between;

    .plan_day {
      width: 25%;
      padding: 0.2rem 0.1rem;
      height: 3.4rem;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      box-shadow: 5px 5px 15px 0px rgba(170, 170, 170, 0.35);

      .day_h3 {
        padding-left: 0.35rem;
        text-align: left;
        color: #7f7f7f;
        font-size: 0.18rem;
        margin-bottom: 0.2rem;
        position: relative;
      }

      .day_h3::before {
        content: "";
        width: 50px;
        height: 56px;
        position: absolute;
        left: 0;
        bottom: -10px;
        background: url("~assets/images/common/end_dayplan.png") no-repeat;
        background-size: contain;
      }

      .plan_day_item {
        display: flex;
        justify-content: space-between;

        .item_left {
          text-align: left;
          color: #aaaaaa;
          font-size: 0.16rem;

          .item_left_p2 {
            margin-top: 0.1rem;
            font-size: 0.12rem;
          }
        }

        .item_right {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #aaaaaa;
          font-size: 0.12rem;
          padding: 0 0.14rem;
          border: 1px solid rgb(215, 215, 215);
          border-radius: 4px;
        }
      }

      .plan_day_img {
        width: 100%;
        height: 1.5rem;
        margin-top: 0.2rem;
        // background-color: chocolate;
        background: url("~assets/images/common/u559_div.png") no-repeat;
        background-size: cover;
      }
    }

    .suggest_plan {
      position: relative;
      width: 1407px;
      background: #303545;
      // width: 70%;
      height: 738px;
      // height: 100%;
      padding: 0.2rem;
      // background: #fff;
      box-sizing: border-box;
      border-radius: 20px;
      // img{

      // }
      h3 {
        text-align: left;
        // color: #7f7f7f;
        color: #fff;
        font-size: 0.25rem;
        margin-bottom: 0.1rem;
        margin-left: 64px;
      }

      ul {
        width: 100%;
        // height: 738px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;

        li {
          margin: 10px;
          width: 27%;
          margin-bottom: 0.2rem;
          padding: 0.2rem;
          border-radius: 20px;
          height: 200px;

          .train_title {
            color: #ffffff;
            text-align: left;
            width: 75%;

            .train_title_p1 {
              font-size: 0.18rem;
              margin: 0.2rem 0;
            }

            .train_title_p2 {
              font-size: 0.14rem;
              line-height: 0.2rem;
            }
          }
        }
      }
    }
  }

  .plant {
    img {
      position: absolute;
      left: 30px;
      top: 28px;
    }

    width: 427px !important;
    height: 700px !important;
    position: absolute;
    right: 0;
    background: rgb(48, 53, 69);
    padding: 20px;
    border-radius: 20px;

    h2 {
      padding-top: 15px;
      font-size: 0.24rem;
    }

    .plant_two {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 26px;
      height: 170px;
      width: 455px;
      position: relative;
      right: 20px;

      .name_t {
        width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      // background: pink;
      border-bottom: 1px solid #ccc;

      ::v-deep {
        .el-progress__text {
          color: #fff;
          font-size: 32px !important;
        }
      }
    }

    .plant_three {
      margin-top: 20px;
      width: 100%;
      height: 340px;

      // background: yellowgreen;
      ul {

        // display: flex;
        li {
          position: relative;
          text-align: left;
          padding: 20px;
          width: 100%;

          span {
            position: absolute;
            right: 37px;
            top: 36px;
            font-size: 24px;
          }

          p {
            margin-top: 21px;
            font-size: 22px;
          }
        }
      }
    }

    .plant_four {
      width: 100%;
      height: 120px;
      line-height: 120px;
      border-radius: 12px;
      background-color: #28cd41;
      box-sizing: border-box;
      box-shadow: 0px 10px 5px #067717;
    }
  }
}

.suggest_ul {
  position: relative;
  width: 1350px !important;
  height: 580px;
  overflow: scroll;
  display: flex;

  li {
    position: relative;
    overflow: hidden;
    width: 283px;
  }
}

.suggest_ul li:nth-child(1) {
  background: url("~assets/images/common/111.jpg") no-repeat;
  background-size: 100% 100%;
}

.suggest_ul li:nth-child(2) {
  background: url("~assets/images/common/222.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: right;
}

.suggest_ul li:nth-child(3) {
  background: url("~assets/images/common/333.jpg") no-repeat;
  background-size: 100% 100%;
}

.suggest_ul li:nth-child(4) {
  background: url("~assets/images/common/444.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: right;
}

.suggest_ul li:nth-child(5) {
  background: url("~assets/images/common/555.jpg") no-repeat;
  background-size: 100% 100%;
}

.suggest_ul li:nth-child(6) {
  background: url("~assets/images/common/666.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: right;
}

.suggest_ul li:nth-child(7) {
  background: url("~assets/images/common/777.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: right;
}

.suggest_ul li:nth-child(8) {
  background: url("~assets/images/common/888.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: right;
}

.mask_layer {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 20px;
  background: rgba(35, 33, 33, 0.74);

  .train_title_p1 {
    margin-bottom: 14px;
  }

  .train_title_p2 {
    width: 330px;
  }

  p {
    text-align: left;
    font-size: 0.16rem;
  }

  .start_btn {
    img {
      position: absolute;
      right: 60px;
      top: 46px;
    }
  }
}

.fixed_start {
  width: 3.8rem;
  height: 6rem;
  padding: 2px 2px 2px 2px;
  border: 1px solid #797979;
  background-color: #ffffff;
  box-sizing: border-box;
}

.end_back {
  position: fixed;
  right: 20px;
  top: 21px;
  z-index: 100;
}

.my-swipe .van-swipe-item {
  padding: 0.3rem 0.2rem;
  background-color: rgb(220, 238, 252);
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 0.2rem;
  display: flex;
}

.remember {
  position: absolute;
  top: 180px;
  left: 210px;
  height: 64px;

  .topone {
    width: 398px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    position: absolute;
    line-height: 32px;
  }

  .bottomone {
    position: absolute;
    top: 32px;
    width: 398px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .bottomtwo {
      width: 32px;
      height: 32px;
      border: 3px solid #ffffff;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
    }

    .activetwo {
      background: #ffffff;
    }

    .activelog {
      width: 32px !important;
      height: 32px !important;
      border: 0 !important;
      background-image: url("~assets/images/common/log.png");
    }
  }
}
</style>
<template>
  <div class="main">
    <header>
      <div class="remember">
        <div class="topone">
          <div>星期一</div>
          <div>星期二</div>
          <div>星期三</div>
          <div>星期四</div>
          <div>星期五</div>
          <div>星期六</div>
          <div>星期天</div>
        </div>
        <div class="bottomone">
          <div class="bottomtwo" v-for="(item, index) in day" :key="index" :class="recomlesson[index].class"></div>
        </div>
      </div>
      <div class="end_back" @click="lotrecommend" v-if="!serious">
        <img src="../assets/images/red.png" alt="" />
        <img style="position: absolute; top: 11px; right: 8px; width: 70px" src="../assets/images/X.png" alt="" />
      </div>
      <div class="user_avatar">
        <img :src="userInfo.user_avatar || ''" alt="" />
      </div>
      <div class="user_info">
        <p class="info_p1">
          欢迎回来,{{ userInfo.user_name || "wxid-jdop31" }}
        </p>
        <p class="info_p2">
          坚持就是胜利，本周你已运动{{ weekLog[0].length }}天
        </p>
        <ul class="user_date">
          <li v-for="(item, index) of dateArr" :key="index">
            <span class="date_day1">{{ weekDay(item.date) }}</span>
            <span class="date_day2">{{ moment_date(item.date) }}</span>
            <div :class="item.value == 0 ? 'date_dot1' : 'date_dot2'"></div>
          </li>
        </ul>
      </div>
      <div class="user_ability">
        <ul>
          <li>
            <span>{{ dynamic || 0 }}</span>
            <p>活力</p>
          </li>
          <li>
            <span>{{ force || 0 }}</span>
            <p>运动力</p>
          </li>
        </ul>
      </div>
    </header>
    <section class="main_cover" style="height: 737px">
      <div class="main_cover_plan" :style="showTable ? 'height:3.4rem' : 'Height:100%'">
        <section class="suggest_plan">
          <img style="position: absolute; top: 24px; left: 30px" src="../assets/images/hq.png" alt="" />
          <h3 style="margin-bottom: 50px">通过以下推荐课程继续训练</h3>
          <ul class="suggest_ul">
            <li v-for="(item, value) in recomlesson" :key="item.id" @click="changeserious(value)">
              <section class="mask_layer">
                <p class="train_title_p1">{{ item.name }}</p>
                <p class="train_title_p2">{{ item.title }}</p>
                <div class="start_btn">
                  <img src="../assets/images/youtube.png" alt="" />
                </div>
              </section>
            </li>
          </ul>
        </section>
        <section class="plant">
          <img src="../assets/images/jh.png" alt="" />
          <h2>阶段计划完成进度</h2>
          <section class="plant_two">
            <div class="name_t">
              <span>{{ plan }}</span>
            </div>
            <el-progress type="circle" :color="customColors" :percentage="logo"></el-progress>
          </section>
          <section class="plant_three">
            <ul style="height: 250px; overflow: hidden">
              <li v-for="(item, index) in showclass" :key="index" style="font-size: 18px" ref="child">
                <div style="
                    width: 340px;
                    height: 60px;
                    font-size: 22px;
                    float: left;
                  ">
                  ·{{ item.lesson_name }}
                </div>
                <div style="
                    width: 65px;
                    height: 60px;
                    font-size: 22px;
                    float: right;
                    margin-right: 20px;
                  ">
                  {{ item.sport_length }}
                </div>
              </li>
            </ul>
            <div style="
                font-size: 20px;
                text-align: left;
                width: 405;
                height: 40px;
                padding-left: 22px;
                position: relative;
                line-height: 40px;
              ">
              ·待完成
              <div style="
                  width: 12px;
                  height: 12px;
                  border: 4px solid #ffffff;
                  border-radius: 50%;
                  position: absolute;
                  right: 0;
                  bottom: 8px;
                "></div>
            </div>
          </section>
          <div class="plant_four" @click="lessonplan">
            <span>继续我的计划</span>
          </div>
        </section>
      </div>
    </section>
    <div style="
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 254, 0.3);
        z-index: 9000;
        position: relative;
        bottom: 1077px;
      " v-if="serious">
      <div style="
          width: 657px;
          height: 914px;
          background: rgba(255, 255, 255, 1) !important;
          z-index: 10000;
          position: absolute;
          top: 100px;
          left: 600px;
          display: flex;
        ">
        <RecommDetails @disappear="disappear" :items="recomlesson[itemindex]" />
      </div>
    </div>
    <div style="
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 254, 0.3);
        z-index: 9000;
        position: relative;
        bottom: 1077px;
      " v-if="seriou">
      <div style="
          width: 657px;
          height: 914px;
          background: rgba(255, 255, 255, 1) !important;
          z-index: 10000;
          position: absolute;
          top: 100px;
          left: 600px;
          display: flex;
        ">
        <RecommDetail @disappear="disappear" :plans="planle" />
      </div>
    </div>
  </div>
</template>
<script>
import RecommDetail from "./RecommDetail";
import api from "@/api/api";
import { mapGetters, mapActions, mapMutations } from "vuex";
import RecommDetails from "./RecommDetails";
import { Popup, Swipe, SwipeItem, Notify } from "vant";
export default {
  props: {},
  components: {
    RecommDetails,
    VanPopup: Popup,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    Notify,
    RecommDetail,
  },
  data() {
    return {
      numb: "",
      planle: "",
      seriou: false,
      itemindex: 0,
      lessonexclusive: "",
      serious: false,
      recomlesson: [
        { id: 0, name: "力量塑形", title: "快速提高肌肉耐力与力量", class: "" },
        {
          id: 1,
          name: "瑜伽课程",
          title: "以经典体式为主，节奏适宜，强度适中",
          class: "",
        },
        {
          id: 2,
          name: "有氧燃脂",
          title: "从热身激活到全方位刺激，看见卡路里的燃烧",
          class: "",
        },
        {
          id: 3,
          name: "HIIT课程",
          title: "高强度间歇式训练，极速燃脂",
          class: "",
        },
        {
          id: 4,
          name: "拉伸课程",
          title: "提升关节灵活度，提高身体柔韧性",
          class: "",
        },
        {
          id: 5,
          name: "心肺耐力",
          title: "增强新陈代谢能力，增加体力，提高减脂效率",
          class: "",
        },
        {
          id: 6,
          name: "热身放松",
          title: "通过关节环绕及心肺激活等动作热身，降低受伤风险",
          class: "",
        },
        {
          id: 7,
          name: "固定器械课程",
          title: "课程覆盖健身房固定器械训练，构建身体完美形体",
          class: "",
        },
      ],
      weekLog: [],
      plan: "",
      timer: "",
      itemindex: 1,
      day: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
      ],
      showclass: [],
      popupshow: false,
      timernum: 30,
      downtimer: null,
      courseList: [],
      showNotify: false,
      none: true,
      curriculum: [],
      lessondata: [],
      dateArr: [],
      tablueData: [],
      planInfo: {},
      currentdate: "",
      Course_name: "",
      result: "",
      userData: {
        data: {
          sport_power: 0,
          vitality: 0,
        },
        total: {
          star_count: 0,
        },
      },
      dynamic: "", //活力
      force: "", //运动力
      logo: 0,
      customColors: [{ color: "#fff" }],
      Came: "",
      start_time: "",
    };
  },
  created() {
    this.$store.dispatch("clientEnd");
    if (localStorage.member && JSON.parse(this.$route.query.Runinfo)) {
    } else {
      this.addTreadmillEnd(JSON.parse(this.$route.query.Runinfo));
    }
  },
  watch: {
    weekLog: {
      deep: true,
      immediate: true,
      handler(newV) {
        console.log("我是weeklog", newV[0]);
        if (newV[0].length >= 1) {
          for (var i = 1; i <= 7; i++) {
            for (var j = 0; j <= newV[0].length; j++) {
              if ([i] == newV[0][j]) {
                this.recomlesson[i - 1].class = "activelog";
              }
            }
          }
        }
      },
    },
    recommstate(val) {
      clearInterval(this.downtimer);
    },
    recommendState(val) {
      if (val.split("n")[0] == "false") {
        this.popupshow = false;
      } else {
        this.popupshow = true;
      }
    },
    client_id(val) { },
    resSetStart: {
      handler(newV, oldV) {
        localStorage.setItem("freedom", "1");
        if (newV) {
          this.$router.push({
            path: "/trainrun",
            query: {
              type: 2,
              status,
              text: "不限",
            },
          });
        }
      },
      deep: true,
    },
    resSetProgramStart: {
      handler(val, oldV) {
        if (val != 0) {
          if (val == 1) (val = "跑步机预设丨Program 1"), this.bcurriculum(val);
          else if (val == 2)
            (val = "跑步机预设丨Program 2"), this.bcurriculum(val);
          else if (val == 3)
            (val = "跑步机预设丨Program 3"), this.bcurriculum(val);
          else if (val == 4)
            (val = "跑步机预设丨Program 4"), this.bcurriculum(val);
          else if (val == 5)
            (val = "跑步机预设丨Program 5"), this.bcurriculum(val);
          else if (val == 6) {
            (val = "跑步机预设丨Program 6"), this.bcurriculum(val);
          }
        }
      },
      deep: true,
    },
    resduration(newval) {
      this.start_time = newval.split("n")[0];
    },
  },
  mounted() {
    this.Came = this.$store.state.treadmill.list.name;
    if (this.Came == "") {
      this.Came = "模式跑";
    }
    this.start_time = this.$store.state.treadmill.resduration.split("n")[0];
    this.getUserAll();
    this.getLessonLog();
  },
  destroyed() {
    clearInterval(this.downtimer);
    this.$store.commit("set_recommendid", "");
  },
  computed: {
    ...mapGetters([
      "recommendState",
      "userInfo",
      "client_id",
      "publicPath",
      "projecttype",
      "resSetStart",
      "resSetProgramStart",
      "resduration",
      "loginState",
      "userinfo",
      "userid",
      "ouid",
      "userid",
    ]),
    showTable() {
      if (this.tablueData) {
        if (this.tablueData.length > 0) {
          for (let day in this.tablueData) {
            if (
              this.tablueData[day].date == this.currentdate &&
              this.tablueData[day].value !== 1
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["addTreadmillEnd"]),
    ...mapMutations(["SEND_SOCKET"]),
    disappear() {
      this.serious = false;
      this.seriou = false;
    },
    async getLessonLog() {
      const rs = await api.post("/get-lesson-log", {
        user_id: this.userid,
      });
      let m = "";
      let s = "";
      for (var i = 0; i < rs.data.data.log.length; i++) {
        m = parseInt((rs.data.data.log[i].sport_length / 60) % 60);
        s = parseInt(rs.data.data.log[i].sport_length % 60);
        rs.data.data.log[i].sport_length = m + "'" + s + '"';
        this.showclass.push(rs.data.data.log[i]);
      }
      this.weekLog.push(rs.data.data.weekend);
      console.log("我是天数", this.weekLog);
      console.log(this.weekLog.length, "我是长度");
      console.log("我是showclass", this.showclass);
    },
    async getUserAll() {
      const rs = await api.post("/get-user-all", {
        user_id: this.userid,
      });
      this.plan = rs.data.data.plan_describe.stage_name;
      if (rs.data.code == "200") {
        this.userData = rs.data.data;
        this.tablueData = rs.data.data.time_table;
        // this.dynamic = rs.data.data.vitality;
        // this.force = rs.data.data.athletic_ability;
        if (this.tablueData) {
          this.filterWeekName(true);
        } else {
          this.filterWeekName(false);
        }
        this.Course_name = rs.data.data.user_plan_name;
        if (this.tablueData) {
          rs.data.data.time_table.forEach((item) => {
            if (item.date == this.currentdate) {
              if (item.value == 0) {
                this.result = "未完成";
                this.logo = "0";
              } else if (item.value == 1) {
                this.result = "完成";
                this.logo = "100";
              }
            }
          });
        }
        let user_plan_id = rs.data.data.user_plan_id;
        this.$axios
          .get(`${this.publicPath}common/js/plans.json`)
          .then((res) => {
            res.data.forEach((item) => {
              if (item.id == user_plan_id) {
                this.planInfo = item;
              }
            });
          });
      }
    },
    async lessonplan() {
      const rs = await api.post("/get-plan");
      console.log("天山童姥", rs);
      this.planle = rs.data.data;
      this.transfer(rs.data.data[0].id);
      this.numb = 2;
    },
    async selectLesson() {
      const rs = await api.post("/lesson-select", {
        user_id: this.userInfo.user_id,
      });
      if (rs.data.code == "200") {
      }
    },
    changeserious(value) {
      this.itemindex = value;
      this.lessonlex();
    },
    async lessonlex() {
      console.log(this.recomlesson[this.itemindex].name);
      const rs = await api.post("/lesson-exclusive", {
        lesson_type: this.recomlesson[this.itemindex].name,
      });
      console.log("元始天尊", rs);
      console.log(rs.data.data[0].id);
      this.numb = 1;
      this.transfer(rs.data.data[0].id);
    },
    async transfer(data) {
      const rs = await api.post("/transfer-user", {
        client_id: this.ouid,
        lesson_id: data,
        user_id: this.userid,
      });
      console.log("无极老祖", rs);
      // if(rs.data.msg !== "暂时没有设备空闲"){
      //   this.serious = true
      // }
      if (rs.data.data != null) {
        switch (this.numb) {
          case 1:
            this.serious = true;
            break;
          case 2:
            this.seriou = true;
            break;
        }
      }
    },
    filterWeekName(status) {
      this.currentdate = this.$moment(new Date())
        .add("year", 0)
        .format("YYYY-MM-DD");
      const weekOfday = this.$moment().format("E");
      const lastMonday = this.$moment()
        .subtract(weekOfday - 1, "days")
        .format("YYYYMMDD");
      const lastSunday = this.$moment()
        .add(7 - weekOfday, "days")
        .format("YYYYMMDD");
      if (status) {
        for (let i = lastMonday; i <= lastSunday; i++) {
          let j = String(i);
          let day = j.slice(0, 4) + "-" + j.slice(4, 6) + "-" + j.slice(6, 8);
          let obj = {};
          this.tablueData.forEach((item, i) => {
            if (item.date == day) {
              obj = item;
              if (this.currentdate == day) {
                obj.current = true;
              } else {
                obj.current = false;
              }
              this.dateArr.push(obj);
            }
          });
        }
      } else {
      }
    },
    //退出课程
    async lotrecommend() {
      this.clickButton();
      this.$router.push("/");
    },
    //获取日期
    moment_date(date) {
      var newdate = this.$moment(`${date}`);
      var dow = newdate.date();
      return dow;
    },
    // 日期转换格式
    weekDay(date) {
      const newDate = new Date(date.replace(/-/g, "/"));
      const weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      return weekday[newDate.getDay()];
    },
    //倒计时
    loadDown() {
      this.downtimer = setInterval(() => {
        let num = (this.timernum -= 1);
        if (num !== 0) {
          this.timernum = num;
        } else {
          clearInterval(this.downtimer);
          this.$router.push("/");
          this.clickButton();
        }
      }, 1000);
    },
    // 跑步机预设课程筛选调用
    bcurriculum(newal) {
      localStorage.setItem("course", "builtIn");
      this.$axios
        .get(`${this.publicPath}common/js/BuiltCourse.json`)
        .then((res) => {
          res.data.forEach((element) => {
            if (element.name == newal) {
              this.classes = element;
            }
          });
          let data = JSON.stringify(this.classes);
          this.clickButton();
          this.$router.push({
            path: "/trainrun",
            query: {
              type: 2,
              status,
              res: this.$Base64.encode(data),
            },
          });
        });
    },
    // 当前的间隔时间
    getLocalTime(nS) {
      return (this.start_time = new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " "));
    },
  },
};
</script>
