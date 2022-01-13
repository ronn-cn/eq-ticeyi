<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(242, 242, 242);
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
  background-color: #ffffff;
  display: flex;
  align-items: center;
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
    text-align: left;
    .info_p1 {
      color: #aaaaaa;
      font-size: 0.16rem;
    }
    .info_p2 {
      color: #333;
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
    position: absolute;
    right: 0.4rem;
    display: flex;
    .ability_icon,
    .ability_icon1,
    .ability_icon2 {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      margin-right: 0.2rem;
      background: url('~assets/images/common/sport_power.png') no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: #333;
    }
    .ability_icon1 {
      background: url('~assets/images/common/vitality.png') no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: #333;
    }
    .ability_icon2 {
      background: url('~assets/images/common/star.png') no-repeat;
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
  // height: 70vh;
  padding: 0.2rem;
  background: rgba(170, 170, 170, 0.35);
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
        padding-left: 0.7rem;
        text-align: left;
        color: #7f7f7f;
        font-size: 0.18rem;
        margin-bottom: 0.2rem;
        position: relative;
      }
      .day_h3::before {
        content: '';
        width: 50px;
        height: 56px;
        position: absolute;
        left: 50px;
        bottom: -10px;
        background: url('~assets/images/common/end_dayplan.png') no-repeat;
        background-size: contain;
      }
      .plan_day_item {
        display: flex;
        justify-content: space-around;
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
          border: 1px solid #f5f5f5;
          border-radius: 4px;
        }
      }
      .plan_day_img {
        width: 100%;
        height: 1.5rem;
        margin-top: 0.2rem;
        // background-color: chocolate;
        background: url('~assets/images/common/u559_div.png') no-repeat;
        background-size: cover;
      }
    }
    .suggest_plan {
      width: 70%;
      height: 3.4rem;
      padding: 0.2rem;
      background: #fff;
      box-sizing: border-box;
      border-radius: 5px;
      h3 {
        text-align: left;
        color: #7f7f7f;
        font-size: 0.18rem;
        margin-bottom: 0.2rem;
      }
      ul {
        width: 100%;
        height: 86%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 28%;
          margin-bottom: 0.2rem;
          padding: 0.2rem;
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
            }
          }
          .start_btn {
            width: 0.8rem;
            height: 0.26rem;
            border-radius: 20px;
            background-color: #ffffff;
            box-sizing: border-box;
            font-size: 0.14rem;
            color: #000;
            line-height: 0.26rem;
            float: right;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
}

.suggest_ul li:nth-child(1) {
  background: url('~assets/images/common/1001.jpg') no-repeat;
  background-size: 98.5% 100%;
}
.suggest_ul li:nth-child(2) {
  background: url('~assets/images/common/1002.jpg') no-repeat;
  background-size: 98.5% 100%;
  background-position: right;
}
.suggest_ul li:nth-child(3) {
  background: url('~assets/images/common/1003.jpg') no-repeat;
  background-size: 98.5% 100%;
}
.suggest_ul li:nth-child(4) {
  background: url('~assets/images/common/1004.jpg') no-repeat;
  background-size: 98.5% 100%;
  background-position: right;
}
.suggest_ul li:nth-child(5) {
  background: url('~assets/images/common/1005.jpg') no-repeat;
  background-size: 98.5% 100%;
}
.suggest_ul li:nth-child(6) {
  background: url('~assets/images/common/1006.jpg') no-repeat;
  background-size: 98.5% 100%;
  background-position: right;
}

.user_date {
}
.fixed_start {
  // position: absolute;
  // top: 10%;
  // left: 20%;
  width: 3.8rem;
  height: 6rem;
  padding: 2px 2px 2px 2px;
  border: 1px solid #797979;
  background-color: #ffffff;
  box-sizing: border-box;
}

//结束
.end_back {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom: 100px solid #fc2d56;
  border-right: 100px solid transparent;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100px) translateY(-100px) rotate(45deg);
  z-index: 999;
}
.end_back::after {
  content: '';
  width: 40px;
  height: 40px;
  // background-color: #30bb24;
  background: url('~assets/images/common/home_icon4.png') no-repeat;
  background-size: cover;
  position: absolute;
  left: -16px;
  top: 36px;
  transform: rotate(45deg);
}
//轮播图
.my-swipe .van-swipe-item {
  // width: 520px !important;
  padding: 0.3rem 0.2rem;
  background-color: rgb(220, 238, 252);
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 0.2rem;
  display: flex;
}
</style>

<template>
  <div class="main">
    <div class="end_back" @click="lotrecommend"></div>
    <header>
      <div class="user_avatar">
        <img :src="userInfo.user_avatar || ''" alt="" />
      </div>
      <div class="user_info">
        <p class="info_p1">
          欢迎回来,{{ userInfo.user_name || 'wxid-jdop31' }}
        </p>
        <p class="info_p2">你已经连续运动15天</p>
        <ul class="user_date">
          <li v-for="(item, index) of dateArr" :key="index">
            <span class="date_day1">{{ weekDay(item.date) }}</span>
            <span class="date_day2">{{ moment_date(item.date) }}</span>
            <div :class="item.value == 0 ? 'date_dot1' : 'date_dot2'"></div>
          </li>
        </ul>
      </div>
      <div class="user_ability">
        <van-swipe
          class="my-swipe"
          :autoplay="0"
          indicator-color="white"
          :loop="false"
        >
          <van-swipe-item>
            <div class="ability_icon"></div>
            <div class="ability_title">
              <p class="ability_title_p1">
                运动能力 {{ userData.data.sport_power || 0 }}/100
              </p>
              <p class="ability_title_p2">
                运动能力是指综合身体各项基础数据的指数维度
              </p>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="ability_icon1"></div>
            <div class="ability_title">
              <p class="ability_title_p1">
                活力 {{ userData.data.vitality || 0 }}/100
              </p>
              <p class="ability_title_p2">
                活动是指通过运动训练使人们的运动能力发生变化的指数维度
              </p>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="ability_icon2"></div>
            <div class="ability_title">
              <p class="ability_title_p1">
                星星 {{ userData.total.star_count || 0 }}
              </p>
              <p class="ability_title_p2">用户获得星星总数</p>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </header>
    <section class="main_cover">
      <div class="main_cover_nav">
        <div class="nav_title" v-if="showTable">
          <p class="nav_p1">你的训练计划: {{ planInfo.name || '' }}</p>
          <p class="nav_p2">{{ planInfo.desc || '' }}</p>
        </div>
        <div class="nav_btn" @click="selectLesson" v-if="showTable">
          <span>继续我的计划</span>
        </div>
      </div>
      <div class="main_cover_plan">
        <section class="plan_day">
          <h3 class="day_h3">今日训练计划</h3>
          <div class="plan_day_item">
            <div class="item_left">
              <p>胸肩课程</p>
              <p class="item_left_p2">2021.12.17</p>
            </div>
            <div class="item_right">已完成</div>
          </div>
          <div class="plan_day_img"></div>
        </section>
        <section class="suggest_plan">
          <h3>通过以下推荐课程继续训练</h3>
          <ul class="suggest_ul">
            <li v-for="item of curriculum" :key="item.title">
              <div class="train_title">
                <p class="train_title_p1">{{ item.groupname }}</p>
                <p class="train_title_p2">{{ item.introduce }}</p>
              </div>
              <div class="start_btn" @click="new_details(item)">开始课程</div>
            </li>
          </ul>
        </section>
      </div>
    </section>

    <van-popup v-model="popupshow" :close-on-click-overlay="false">
      <div class="fixed_start">
        <RecommDetails />
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapGetters } from 'vuex'
import RecommDetails from './RecommDetails'
import { Popup, Swipe, SwipeItem, Notify } from 'vant'
export default {
  props: {},
  components: {
    RecommDetails,
    VanPopup: Popup,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    Notify,
  },
  data() {
    return {
      popupshow: false,
      timernum: 30,
      downtimer: null,
      courseList: [],
      showNotify: false,
      curriculum: [],
      lessondata: [],
      dateArr: [],
      tablueData: [],
      planInfo: {},
      currentdate: '',
      userData: {
        data: {
          sport_power: 0,
          vitality: 0,
        },
        total: {
          star_count: 0,
        },
      },
    }
  },
  created() {
    // if (process.env.NODE_ENV === 'production') {
    //   this.loadDown()
    // }
    // this.loadcourseList()
  },
  watch: {
    recommendState(val) {
      if (!val) {
        // this.loadDown()
        this.popupshow = false
      } else {
        this.popupshow = true
        // clearInterval(this.downtimer)
        // this.timernum = 30
      }
    },
  },
  mounted() {
    this.$axios.get(`${this.publicPath}common/js/groups.json`).then((res) => {
      this.curriculum = res.data
    })
    this.getUserAll()
  },
  destroyed() {
    clearInterval(this.downtimer)
    this.$store.commit('set_recommendid', '')
  },
  computed: {
    ...mapGetters([
      'recommendState',
      'userInfo',
      'client_id',
      'publicPath',
      'projecttype',
    ]),
    showTable() {
      if (this.tablueData.length > 0) {
        for (let day in this.tablueData) {
          if (
            this.tablueData[day].date == this.currentdate &&
            this.tablueData[day].value !== 1
          ) {
            return true
          }
        }
      }
      return false
    },
  },
  methods: {
    //获取用户信息
    async getUserAll() {
      const rs = await api.get('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      console.log('用户信息', rs)
      if (rs.data.code == '200') {
        this.userData = rs.data.data
        this.tablueData = rs.data.data.time_table
        this.filterWeekName()

        let user_plan_id = rs.data.data.data.user_plan_id
        this.$axios
          .get(`${this.publicPath}common/js/plans.json`)
          .then((res) => {
            res.data.forEach((item) => {
              if (item.id == user_plan_id) {
                this.planInfo = item
              }
            })
          })
      }
    },
    //没课程直接拿来训练
    async selectLesson(data) {
      const rs = await api.post('/new-lesson-select', {
        user_id: this.userInfo.user_id,
        user_plan: this.planInfo,
      })
      console.log(rs)
      if (rs.data.code == '200') {
        this.details(rs.data.data)
      }
    },
    //开始课程
    async new_details(info) {
      const groupname = info.groupname
      const user_id = this.userInfo.user_id
      const rs = await api.post('/new-lesson-select', {
        user_id,
        groupname,
      })
      // console.log('调用选课', rs)
      if (rs.data.code == '200') {
        const arr = [
          {
            name: this.projecttype,
            path: '/trainpage',
          },
          {
            name: '体测仪',
            path: '/datadetection',
          },
          {
            name: '跑步机',
            path: '/trainrun',
            query: { type: 2, status: 0 },
          },
        ]
        let id = process.env.VUE_APP_PAGE_ID
        if (rs.data.data.equipmenttype.includes(arr[id])) {
          this.$router.push({
            path: arr[id].path,
            query: arr[id].query || {},
          })
        } else {
          this.details(rs.data.data)
        }
      } else {
        this.$notify({ type: 'warning', message: '暂无推荐课程' })
      }
    },
    //开始转移课程
    async details(data) {
      const rs = await api.post('/transfer-user', {
        user_id: this.userInfo.user_id,
        lesson_id: data.md5,
        client_type: data.equipmenttype,
      })
      console.log(rs)
      if (rs.data.data) {
        this.$store.commit('set_recommendid', {
          md5: data,
          transfer: rs.data.data,
        })
        this.$store.commit('set_client_id', rs.data.data.client_id)
      } else {
        this.$notify({ type: 'warning', message: '暂无空闲设备' })
      }
    },
    //周一到周七
    filterWeekName() {
      this.currentdate = this.$moment(new Date())
        .add('year', 0)
        .format('YYYY-MM-DD')
      console.log('今天', this.currentdate)
      // 第一步: 获取今天是本周的第几天
      const weekOfday = this.$moment().format('E')
      // 第二步: 获取本周周一的日期
      const lastMonday = this.$moment()
        .subtract(weekOfday - 1, 'days')
        .format('YYYYMMDD')
      // 第三步: 获取本周周末的日期
      const lastSunday = this.$moment()
        .add(7 - weekOfday, 'days')
        .format('YYYYMMDD')

      for (let i = lastMonday; i <= lastSunday; i++) {
        let j = String(i)
        let day = j.slice(0, 4) + '-' + j.slice(4, 6) + '-' + j.slice(6, 8)
        let obj = {}
        // console.log(day)
        this.tablueData.forEach((item, i) => {
          if (item.date == day) {
            obj = item
            if (this.currentdate == day) {
              obj.current = true
            } else {
              obj.current = false
            }
            this.dateArr.push(obj)
          }
        })
      }
      // console.log(this.dateArr)
    },
    //退出课程
    async lotrecommend() {
      this.$router.push('/')
    },

    //获取日期
    moment_date(date) {
      var newdate = this.$moment(`${date}`)
      var dow = newdate.date()
      // console.log(dow)
      return dow
    },
    weekDay(date) {
      const newDate = new Date(date.replace(/-/g, '/'))
      const weekday = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ]
      return weekday[newDate.getDay()]
    },
    //倒计时
    loadDown() {
      this.downtimer = setInterval(() => {
        let num = (this.timernum -= 1)
        if (num !== 0) {
          this.timernum = num
        } else {
          clearInterval(this.downtimer)
          this.$router.push('/')
        }
      }, 1000)
    },
  },
}
</script>
