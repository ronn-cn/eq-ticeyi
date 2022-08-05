<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: relative;
    font-family: 'SourceHanSansSC-Light';
  // background: #28cd41;
}

header {
  height: 283px;
  background: linear-gradient(180deg, #323647 0%, #222631 100%);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  .user_avatar {
    width: 139px;
    height: 139px;
    border-radius: 50%;
    margin: 0 0.2rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .user_info {
    color: #fff;
    text-align: left;
    .info_p1 {
      // color: #aaaaaa;
      font-size: 0.16rem;
    }
    .info_p2 {
      font-size: 36px;
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
          margin-bottom: 20px;
        }
        .date_day2 {
          font-size: 0.18rem;
          margin: 10px 0 6px 0;
        }
        .date_dot1 {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .date_dot2 {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #fff;
          background-color: #fff;
          background-image: url("~assets/images/phase2/end_icon3.svg");
          background-repeat: no-repeat;
          background-size: 16px 12px;
          background-position: center;
        }
        .date_dot3 {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #fff;
          background-color: #555555;
        }
      }
    }
  }

  //结束
  .end_back {
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-top: 100px solid transparent;
    border-bottom: 100px solid #ff3b30;
    border-right: 100px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100px) translateY(-100px) rotate(45deg);
    z-index: 999;
  }
  .end_back::after {
    content: "";
    width: 25px;
    height: 25px;
    background: url("~assets/images/common/home_icon4.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: -6px;
    top: 46px;
    transform: rotate(45deg);
  }
}
.main_cover {
  &_plan {
    margin-top: 0.2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .suggest_plan {
      width: 1407px;
      height: 677px;
      padding: 0.1rem;
      background: linear-gradient(180deg, #323647 0%, #222631 100%);
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
      border-radius: 20px;
      .plan_h3 {
        text-align: left;
        font-size: 36px;
        padding-left: 0.55rem;
        position: relative;
        margin: 25px 0;
      }
      .plan_h3::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 44px;
        height: 40px;
        background: url("~assets/images/phase2/end_icon2.svg") no-repeat;
        background-size: 100% 100%;
      }
      .suggest_ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 50px;
        li {
          width: 322px;
          height: 232px;
          margin: 20px 10px;
          border-radius: 20px;
          position: relative;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          .train_title {
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% - 40px);
            height: 58px;
            background: rgba(35, 33, 33, 0.74);
            padding: 20px;
            text-align: left;
            border-radius: 0 0 20px 20px;
            .train_title_p1 {
              font-size: 24px;
            }
            .train_title_p2 {
              font-size: 18px;
              margin-top: 10px;
              width: 80%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .start_btn {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 0.38rem;
              height: 0.38rem;
              background: url("~assets/images/phase2/end_icon1.svg") no-repeat;
              background-size: 100% 100%;
              // background-color: #ffffff;
            }
          }
        }
      }
    }
  }
}
.fixed_start {
  color: #000;
  width: 3.8rem;
  height: 6rem;
  padding: 2px 2px 2px 2px;
  border: 1px solid #797979;
  background-color: #ffffff;
  box-sizing: border-box;
}

.user_ability {
  width: 4rem;
  position: absolute;
  right: 0rem;
  display: flex;
  &_item {
    margin-right: 130px;
    .ability_p1 {
      font-size: 96px;
    }
    .ability_p2 {
      font-size: 32px;
    }
  }
}

.vant_notify_zhenla {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #ff976a;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2022;
}

.plan_section{
  margin-left:0.15rem;
  border-radius: 20px;
  background-color: #323647;
  position: relative;

  .section0{
    // position: relative;
    // height: 40px;
    img {
      position: absolute;
      left: 20px;
      top: 28px;
    }
    h2 {
      position: absolute;
      left: 80px;
      top: 34px;
    }
  }

  .section1{
      margin-top: 100px;
      position: relative;
      .plan_info{
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        height: 120px;
        border-bottom: 1px solid #eee;
        .title1{
          display: inline-block;
          width: 100%;
          text-align: left;
          padding: 10px 0;
          font-size: 26px;
        }
        .title2{
          display: inline-block;
          width: 100%;
          text-align: left;
          padding: 10px 0;
          font-size: 22px;
        }
      }
      .plan_progress{
        position: absolute;
        top:5px;
        right: 20px;
        width: 100px;
        height: 100px;
        .plan_progress_v{
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
          font-size: 26px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
  }

  .plan_record{
    .record_item{
      text-align: left;
      padding: 16px 20px;
      .lesson_class{
        font-size: 30px;
        padding: 10px 5px;
      }
      .lesson_name{
        font-size: 24px;
        padding: 10px 0;
        float: left;
      }
      .lesson_time{
        font-size: 22px;
        padding: 10px 0;
        float: right;
      }
      .circle{
        display: block;
        width: 20px;
        height: 20px;
        margin-top: 5px;
        float: right;
        border: 2px solid #fff;
        border-radius: 25px;
      }
    }
  }

  .section2{
    width: 100%;
    height: 100%;
    .plan_text{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.8em;
      padding: 1em;
      box-sizing: border-box;
    }
  }
  // 按钮
  .plan_four{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 95px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>

<template>
  <div class="main">
    <header>
      <div class="end_back" @click="lotrecommend(), click_effects()"></div>
      <div class="user_avatar">
        <img :src="userInfo.user_avatar || ''" alt="用户头像" />
      </div>
      <div class="user_info">
        <p class="info_p1">
          欢迎回来，{{ userInfo.user_name || "wxid-jdop31" }}
        </p>
        <p class="info_p2">
          坚持就是胜利，本周你已运动 {{ weeklength }} 天
        </p>
        <ul class="user_date">
          <li v-for="(item, index) of weekdata" :key="index">
            <span class="date_day1">{{ item.title }}</span>
            <div v-if="index < weektoday" :class="item.tag ? 'date_dot2' : 'date_dot1'"></div>
            <div v-else class="date_dot3"></div>
          </li>
        </ul>
      </div>
      <div class="user_ability">
        <div class="user_ability_item">
          <p class="ability_p1">{{ vitality_v || 0 }}</p>
          <p class="ability_p2">活力</p>
        </div>
        <div class="user_ability_item">
          <p class="ability_p1">{{ athletic_ability_v || 0 }}</p>
          <p class="ability_p2">运动能力</p>
        </div>
      </div>
    </header>
    <section class="main_cover">
      <div class="main_cover_plan">
        <section class="suggest_plan" style="width: 75%">
          <h3 class="plan_h3">通过以下推荐课程继续训练</h3>
          <ul class="suggest_ul">
            <li 
            v-for="item of curriculum" :key="item.title"
            :style="{'background-image': `url(${require('@/assets/images/RecommCourses/'+item.images)})`}"
            @click="new_details(item), click_effects()">
              <div class="train_title">
                <p class="train_title_p1">{{ item.title }}</p>
                <p class="train_title_p2">{{ item.profiles }}</p>
                <div class="start_btn"></div>
              </div>
            </li>
          </ul>
        </section>

        <section class="plan_section" style="width: 25%">
          <!-- 第一段 -->
          <section class="section0">
            <img src="../assets/images/RecommCourses/jh.png" alt="" />
            <h2>{{ hasPlan ? "阶段计划完成进度" : "暂无训练计划" }}</h2>
          </section>

          <!-- 第二段I -->
          <section v-if="hasPlan">
            <section class="section1">
              <div class="plan_info">
                <span class="title1">{{ planTitle }}</span>
                <span class="title2">{{ stageTitle }}</span>
              </div>
              <div class="plan_progress">
                <!-- <el-progress type="circle"  width="50" :percentage="75" color="white"/> -->
                <!-- <VanCircle class="v_circle" stroke-width="80" layer-color="#cccccc" color="#ffffff" rate="300" /> -->
                <VanCircle 
                v-model="currentRate" 
                :rate="currentRate" :speed="10"
                stroke-width="120" 
                layer-color="#82858e" 
                color="#ffffff" 
                size="100" />
                <div class="plan_progress_v">{{currentRate}}<i style="font-size:16px">%</i></div>
              </div>
              <!-- <el-progress class="plan_progress" type="circle" color="white" :percentage="75" ></el-progress> -->
            </section>
            <section class="plan_record">
              <ul>
                <!-- <li v-for="(item, index) in showclass" :key="index" style="font-size: 18px" ref="child">
                  <div class="lesson_name">
                    ·{{ item.lesson_name }}
                  </div>
                  <div class="sport_length">
                    {{ item.sport_length }}
                  </div>
                </li> -->
                <li class="record_item" v-for="(item, index) in todayLesson" :key="index">
                  <div class="lesson_class">{{item.lesson_type}}</div>
                  <div class="lesson_name">·{{item.lesson_name}}</div>
                  <div class="lesson_time">{{getLessonTime(item.time)}}</div>
                  <div style="clear: both;"></div>
                </li>
                
                <li class="record_item">
                  <div class="lesson_class">待完成</div>
                  <div class="lesson_name">·--</div>
                  <div class="circle"></div>
                  <div style="clear: both;"></div>
                </li>
              </ul>
            </section>
            <div class="plan_four"  style="background-color: #28cd41;" @click="continueMyPlan">
              <span>继续我的计划</span>
            </div>
          </section>
          <!-- 第二段II -->
          <section class="section2" v-else>
            <div class="plan_text">可前往智能健身指导镜处，选择并开启适合你的计划吧</div>
            <div class="plan_four" style="background-color: #aaaaaa;">
              <span>暂无计划</span>
            </div>
          </section>
        </section>
      </div>
    </section>
    <transition v-if="showNotify" name="fade">
      <div class="vant_notify_zhenla">
        {{ notifyTitle }}
      </div>
    </transition>

    <van-popup v-model="popupshow" :close-on-click-overlay="false" style="border-radius:20px;overflow: hidden;">
      <div class="fixed_start">
        <RecommDetails :receipt="getChildInfo" :tranfserData="tranfserData" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapGetters, mapActions } from "vuex";
import RecommDetails from "./RecommDetails";
import { Popup, Swipe, SwipeItem, Circle  } from "vant";
export default {
  props: {},
  components: {
    RecommDetails,
    VanPopup: Popup,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanCircle: Circle,
  },
  computed: {
    ...mapGetters([
      "recommendState",
      "userInfo",
      "client_id",
      "publicPath",
      "projecttype",
      'ouid'
    ]),
  },
  data() {
    return {
      curriculum: [], // 分类
      popupshow: false,
      showNotify: false,
      // 新的参数
      weekdata: [],
      weektoday: 0,
      weeklength: 0,
      vitality_v: 0,          // 活力值
      athletic_ability_v: 0,  // 运动力的值
      hasPlan: false,         // 是否有计划
      planTitle: "计划标题",   // 计划标题
      stageTitle: "阶段标题",  // 阶段标题
      tranfserData: undefined, // 转移数据
      currentRate: 0,        // 当前阶段进度
      todayLesson: [],        // 进入课程
      continueMyPlanBool: true,
      new_detailsBool: true,

    };
  },
  created() {

  },
  watch: {
    recommendState(val) {
      this.popupshow = true;
      if (val) {
        this.popupshow = true;
      } else {
        this.popupshow = false;
      }
    },
  },
  mounted() {
    this.$axios.get(`${this.publicPath}common/js/groups.json`).then((res) => {
      this.curriculum = res.data;
    });
    this.getUserAll();
    this.getLessonLog();
    this.getUserSportLogToday();
  },
  destroyed() { },
  methods: {
    ...mapActions(['logout',"click_effects"]),

    async getChildInfo(data){
      console.log("子组件回执数据:",data);
      if(data == 'cancelTransfer'){
        this.popupshow = false;
        // 然后调用取消转移的接口
        const rs = await api.post("/cancel-transfer", {
          "client_id": this.tranfserData.client_id,
        });
        console.log("取消转移返回值: ",rs)
      } else if(data == 'goNow'){
        // 立即前往
        const rs = await api.post("/unlock", {
          "client_id": this.tranfserData.client_id,
        });
        console.log("立即前往 解锁设备: ",rs)
        this.popupshow = false;
        this.logout()
        this.$router.push('/')
      }
    },
    async getLessonLog() { // 现在还没有调用
      const rs = await api.post("/get-lesson-log", {
        "user_id": this.userInfo.user_id,
      });
      console.log("获取课程日志：",rs)
      let weekday = ["周一", "周二", "周三", "周四", "周五", "周六","周日"];
      for (var i = 0; i < 7; i++){
        var child = {
          "title": weekday[i],
          "tag": 0,
        }
        this.weekdata.push(child);
      }
      console.log("每周数据：",this.weekdata);
      if (rs.data.data.weekend){
        for (const item of rs.data.data.weekend) {
          this.weekdata[item-1].tag = 1
        }
        this.weeklength = rs.data.data.weekend.length;
      }
      this.weektoday = new Date().getDay()
    },
    // 获取今天的课程记录
    async getUserSportLogToday() { // 现在还没有调用
      const rs = await api.post("/get-user-sport-log-today", {
        "user_id": this.userInfo.user_id,
      });
      console.log("用户今天的训练记录：", rs)
      if (rs.data.data){
        this.todayLesson = []
        var temp = rs.data.data.reverse()
        if (temp.length == 1){
          this.todayLesson.push(temp[0])
        } else if(temp.length > 1) {
          this.todayLesson.push(temp[1])
          this.todayLesson.push(temp[0])
        }
      }
    },
    //获取用户信息
    async getUserAll() {
      const rs = await api.post("/get-user-all", {
        "user_id": this.userInfo.user_id,
      });
      console.log("用户信息", rs);
      if (rs.data.code == "200") {
        let userAll = rs.data.data;
        this.vitality_v = userAll.vitality_v; // 设置活力
        this.athletic_ability_v = userAll.athletic_ability_v; // 设置运动力

        if (userAll.plan != ""){
          this.hasPlan = true // 设置有计划标记
          this.planTitle = userAll.plan_describe.plan_name;
          this.stageTitle = userAll.plan_describe.stage_name;
        }

        if (userAll.plan_describe.condition){
          // this.currentRate = 0;
          let l = userAll.plan_describe.condition.length;
          let r = 100 / l;
          for(let i = 0; i < l; i++){
            if (userAll.plan_describe.condition[i].tag){
              this.currentRate += r;
            }
          }
        }
      }
    },
    // 继续我的计划函数
    async continueMyPlan() {
      if (this.continueMyPlanBool){
        this.continueMyPlanBool = false;
        const rs = await api.post("/lesson-select", {
          "client_id": this.ouid,
          "user_id": this.userInfo.user_id,
        });
        console.log("继续我的计划：",rs);
        
        if (rs.data.data){ // 判断转移课程返回的数据不为空
          this.tranfserData = rs.data.data;
          this.popupshow = true;
        } else {
          if (!this.showNotify) {
            this.showNotify = true;
            this.notifyTitle = "暂无推荐课程";
            setTimeout(() => {
              this.showNotify = false;
            }, 3000);
          }
        }
        this.continueMyPlanBool = true;
      }
    },
    // 开始课程
    async new_details(info) {
      if (this.new_detailsBool){
        this.new_detailsBool = false;
        // 根据课程分类进行转移
        const rs = await api.post("/tranfser-by-type", {
          "client_id": this.ouid,
          "lesson_type": info.title,
          "user_id": this.userInfo.user_id,
        });
        console.log("调用课程转移", rs);
        if (rs.data.data){ // 判断转移课程返回的数据不为空
          this.tranfserData = rs.data.data;
          this.popupshow = true;
        } else {
          if (!this.showNotify) {
            this.showNotify = true;
            this.notifyTitle = "暂无推荐课程";
            setTimeout(() => {
              this.showNotify = false;
            }, 3000);
          }
        }
        this.new_detailsBool = true;
      }
    },
    //退出课程
    async lotrecommend() {
      this.$router.push("/");
    },
    getLessonTime(t){
      var date = new Date(t*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      var hour = ("0" + date.getHours()).slice(-2);
      var minute = ("0" + date.getMinutes()).slice(-2);
      var result = hour +":"+ minute;
      return result;
    }
  },
};
</script>
