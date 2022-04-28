<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  // background: #1b254b;
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
header {
  height: 283px;
  background: linear-gradient(180deg, #323647 0%, #222631 100%);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
  border-radius: 20px;
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
      font-size: 0.12rem;
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
          background-color: #555555;
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
    .plan_day {
      width: calc(455px - 68px);
      height: calc(737px - 68px);
      padding: 34px;
      background: linear-gradient(180deg, #323647 0%, #222631 100%);
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
      border-radius: 20px;
      position: relative;

      .plan_day_item {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .item_left {
          text-align: left;
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
          font-size: 0.12rem;
          padding: 0 0.14rem;
          border: 1px solid #fff;
          border-radius: 10px;
        }
      }
      .plan_day_btn {
        font-size: 36px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 131px;
        line-height: 131px;
        background: #28cd41;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
          inset 15px 15px 10px rgba(255, 255, 255, 0.09);
        border-radius: 20px;
      }
    }
    .suggest_plan {
      width: 1407px;
      height: 677px;
      padding: 0.2rem;
      background: linear-gradient(180deg, #323647 0%, #222631 100%);
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
      border-radius: 20px;
      .plan_h3 {
        text-align: left;
        font-size: 36px;
        padding-left: 0.55rem;
        position: relative;
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
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 432px;
          height: 283px;
          margin-top: 25px;
          border-radius: 20px;
          position: relative;
          .train_title {
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% - 40px);
            height: 58px;
            background: rgba(35, 33, 33, 0.74);
            padding: 20px;
            text-align: left;
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

.suggest_ul li:nth-child(1) {
  background: url("~assets/images/common/1001.jpg") no-repeat;
  background-size: 100% 100%;
}
.suggest_ul li:nth-child(2) {
  background: url("~assets/images/common/1002.jpg") no-repeat;
  background-size: 100% 100%;
}
.suggest_ul li:nth-child(3) {
  background: url("~assets/images/common/1003.jpg") no-repeat;
  background-size: 100% 100%;
}
.suggest_ul li:nth-child(4) {
  background: url("~assets/images/common/1004.jpg") no-repeat;
  background-size: 100% 100%;
}
.suggest_ul li:nth-child(5) {
  background: url("~assets/images/common/1005.jpg") no-repeat;
  background-size: 100% 100%;
}
.suggest_ul li:nth-child(6) {
  background: url("~assets/images/common/1006.jpg") no-repeat;
  background-size: 100% 100%;
}

.user_date {
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

.t_ul {
  li {
    width: 33% !important;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div class="main">
    <header>
      <div class="end_back"
           @click="lotrecommend(), click_effects()"></div>
      <div class="user_avatar">
        <img :src="userInfo.user_avatar || ''"
             alt="" />
      </div>
      <div class="user_info">
        <p class="info_p1">
          欢迎回来,{{ userInfo.user_name || 'wxid-jdop31' }}
        </p>
        <p class="info_p2">为所有，尽所能</p>
        <ul class="user_date">
          <li v-for="(item, index) of dateArr"
              :key="index">
            <span class="date_day1">{{ weekDay(item.date) }}</span>
            <!-- <span class="date_day2">{{ moment_date(item.date) }}</span> -->
            <div :class="item.value == 0 ? 'date_dot1' : 'date_dot2'"></div>
          </li>
        </ul>
      </div>
      <div class="user_ability">
        <div class="user_ability_item">
          <p class="ability_p1">{{ userData.data.vitality || 0 }}</p>
          <p class="ability_p2">活力</p>
        </div>
        <div class="user_ability_item">
          <p class="ability_p1">
            {{ userData.data.sport_power || 0 }}
          </p>
          <p class="ability_p2">运动能力</p>
        </div>
      </div>
    </header>
    <section class="main_cover">
      <!-- <div class="main_cover_nav" v-if="showTable">
        <div class="nav_title">
          <p class="nav_p1">你的训练计划: {{ planInfo.name || '' }}</p>
          <p class="nav_p2">{{ planInfo.desc || '' }}</p>
        </div>
        <div class="nav_btn" @click="selectLesson" v-if="showTable">
          <span>继续我的计划</span>
        </div>
      </div> -->

      <div class="main_cover_plan">
        <section class="suggest_plan"
                 :style="showTable ? 'width:70%' : 'width:100%'">
          <h3 class="plan_h3">通过以下推荐课程继续训练</h3>
          <ul class="suggest_ul"
              :class="showTable ? '' : 't_ul'">
            <li v-for="item of curriculum"
                :key="item.title"
                @click="new_details(item), click_effects()">
              <div class="train_title">
                <p class="train_title_p1">{{ item.groupname }}</p>
                <p class="train_title_p2">{{ item.introduce }}</p>
                <div class="start_btn"></div>
              </div>
            </li>
          </ul>
        </section>
        <section class="plan_day"
                 v-show="showTable">
          <h3 class="day_h3">
            {{ showTable ? '今日训练计划' : '今日推荐课程' }}
          </h3>
          <div class="plan_day_item"
               v-if="showTable">
            <div class="item_left">
              <p>{{ plantitle(this.todayInfo.sport_guider) }}训练</p>
              <p class="item_left_p2">{{ this.todayInfo.date }}</p>
            </div>
            <div class="item_right">
              {{ this.todayInfo.value == 0 ? '未完成' : '已完成' }}
            </div>
          </div>
          <div class="plan_day_btn"
               @click="selectLesson">继续我的计划</div>
        </section>
      </div>
    </section>
    <transition v-if="showNotify"
                name="fade">
      <div class="vant_notify_zhenla">
        {{notifyTitle}}
      </div>
    </transition>

    <van-popup v-model="popupshow"
               :close-on-click-overlay="false">
      <div class="fixed_start">
        <RecommDetails />
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapGetters, mapActions } from 'vuex'
import RecommDetails from './RecommDetails'
import { Popup, Swipe, SwipeItem, Notify } from 'vant'
export default {
  props: {},
  components: {
    RecommDetails,
    VanPopup: Popup,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    // Notify,
  },
  data () {
    return {
      popupshow: false,
      timernum: 30,
      downtimer: null,
      courseList: [],
      showNotify: false,
      notifyTitle: '暂无空闲设备',
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
      todayInfo: {},
    }
  },
  created () {
    // if (process.env.NODE_ENV === 'production') {
    //   this.loadDown()
    // }
    // this.loadcourseList()
  },
  watch: {
    recommendState (val) {
      this.popupshow = true
      if (val) {
        // this.loadDown()
        this.popupshow = true
      } else {
        this.popupshow = false
        // clearInterval(this.downtimer)
        // this.timernum = 30
      }
    },
  },
  mounted () {
    this.$axios.get(`${this.publicPath}common/js/groups.json`).then((res) => {
      this.curriculum = res.data
    })
    this.getUserAll()

    // console.log(this.recommendState)
  },
  destroyed () {
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
    showTable () {
      if (this.tablueData) {
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
      }
      return false
    },
  },
  methods: {
    ...mapActions(['click_effects']),
    //获取用户信息
    async getUserAll () {
      const rs = await api.get('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      console.log('用户信息', rs)
      if (rs.data.code == '200') {
        this.userData = rs.data.data
        this.tablueData = rs.data.data.time_table
        if (this.tablueData) {
          this.filterWeekName(true)
        } else {
          this.filterWeekName(false)
        }

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
    async selectLesson (data) {
      const rs = await api.post('/new-lesson-select', {
        user_id: this.userInfo.user_id,
        user_plan: this.planInfo,
        client_type: powerInfo.type
      })
      console.log(rs)
      if (rs.data.code == '200') {
        this.details(rs.data.data)
      }
    },
    //开始课程
    async new_details (info) {
      const groupname = [info.groupname]
      const user_id = this.userInfo.user_id

      const rs = await api.post('/new-lesson-select', {
        user_id,
        groupname,
      })
      console.log('调用选课', rs)
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
        if (rs.data.data.equipmenttype.includes(arr[id].name)) {
          this.$router.push({
            path: arr[id].path,
            query: arr[id].query || {},
          })
        } else {
          this.details(rs.data.data)
        }
      } else {
        if (!this.showNotify) {
          this.showNotify = true
          this.notifyTitle = "暂无推荐课程"
          setTimeout(() => {
            this.showNotify = false
          }, 3000)
        }
        // this.$notify({
        //   type: 'warning',
        //   message: '暂无推荐课程',
        //   position: 'bottom',
        // })
      }
    },
    //开始转移课程
    async details (data) {
      // console.log(data, '这是转移啊')
      const rs = await api.post('/transfer-user', {
        user_id: this.userInfo.user_id,
        lesson_id: data.md5,
        client_type: data.equipmenttype,
      })
      console.log('转移课程', rs)
      if (rs.data.data) {
        this.$store.commit('set_recommendid', {
          md5: data,
          transfer: rs.data.data,
        })
        this.$store.commit('set_client_id', rs.data.data.client_id)
      } else {
        // this.$notify({ type: 'warning', message: '暂无空闲设备', duration: 0 })
        if (!this.showNotify) {
          this.showNotify = true
          this.notifyTitle = "暂无推荐课程"
          setTimeout(() => {
            this.showNotify = false
          }, 3000)
        }
      }
    },
    //周一到周七
    filterWeekName (status) {
      this.currentdate = this.$moment(new Date())
        .add('year', 0)
        .format('YYYY-MM-DD')
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
      if (status) {
        for (let i = lastMonday; i <= lastSunday; i++) {
          let j = String(i)
          let day = j.slice(0, 4) + '-' + j.slice(4, 6) + '-' + j.slice(6, 8)
          let obj = {}
          // console.log(day)
          this.tablueData.forEach((item, i) => {
            if (item.date == day) {
              obj = item
              if (this.currentdate == day) {
                // console.log('这是今天', item)
                this.todayInfo = item
                obj.current = true
              } else {
                obj.current = false
              }
              this.dateArr.push(obj)
            }
          })
        }
      } else {
        // for (let i = lastMonday; i <= lastSunday; i++) {
        //   let j = String(i)
        //   let day = j.slice(0, 4) + '-' + j.slice(4, 6) + '-' + j.slice(6, 8)
        //   this.dateArr.push({
        //     value: 0,
        //     date: day,
        //   })
        // }
      }
      // console.log(this.dateArr)
    },
    //退出课程
    async lotrecommend () {
      this.$router.push('/')
    },
    //获取日期
    moment_date (date) {
      var newdate = this.$moment(`${date}`)
      var dow = newdate.date()
      return dow
    },
    weekDay (date) {
      const newDate = new Date(date.replace(/-/g, '/'))
      const weekday = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
      return weekday[newDate.getDay()]
    },
    //倒计时
    loadDown () {
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
    plantitle (title) {
      switch (title) {
        case 'endurance':
          return '耐力'
        case 'power':
          return '力量'
        case 'control':
          return '控制'
        case 'balance':
          return '平衡'
        case 'flexibility':
          return '柔韧'
        case 'cardio':
          return '心肺'
        case 'fat':
          return '脂肪'
        case 'muscle':
          return '肌肉'
        case 'neck':
          return '颈部'
        case 'shoulder':
          return '肩部'
        case 'back':
          return '背部'
        case 'chest':
          return '胸部'
        case 'arm':
          return '上臂'
        case 'forearm':
          return '前臂'
        case 'abdominal':
          return '核心'
        case 'hip':
          return '臀部'
        case 'leg':
          return '大腿'
        case 'calf':
          return '小腿'
        default:
          return ''
      }
    },
  },
}
</script>
