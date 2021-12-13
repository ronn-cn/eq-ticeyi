<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  color: #000;
  overflow-y: auto;
  background-color: #fff !important;
}
.user_header {
  padding-top: 0.4rem;
  color: #000;
  position: relative;
  .uer_close {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    background: url('~assets/images/small_icon1.png') no-repeat;
    background-size: cover;
  }
  .user_avatar {
    width: 1.28rem;
    height: 1.28rem;
    margin: 0 auto;
    // background-color: sandybrown;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  h4 {
    margin-top: 0.1rem;
  }
  .user_star {
    width: 1.85rem;
    height: 0.28rem;
    line-height: 0.28rem;
    font-size: 0.16rem;
    background-color: #e3e3e3;
    border-radius: 0.88rem;
    margin: 0 auto;
    margin-top: 0.3rem;
  }
  .user_ability {
    padding: 0.1rem 0;
    margin: 0.2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(173, 166, 166);
    border-bottom: 1px solid rgb(173, 166, 166);
    &_item {
      display: flex;
      flex-direction: column;
      // margin: 0 0.2rem;
      .ability_title {
        font-size: 0.12rem;
      }
    }
    &_line {
      width: 0.01rem;
      height: 50px;
      margin: 0 0.4rem;
      background-color: #a7a7a7;
    }
  }
}
.week_motion {
  // margin-top: 0.2rem;
  h4 {
    padding: 0.15rem 0 0.15rem 0.4rem;
    font-size: 0.16rem;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .date_ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      .option {
        width: 0.17rem;
        height: 0.17rem;
        border: 1px solid #797979;
        border-radius: 50%;
        margin-top: 0.06rem;
      }
    }
  }
  .remind_ul {
    li {
      font-size: 0.12rem;
      text-align: left;
      padding-left: 0.2rem;
      margin: 0.1rem 0;
      list-style-type: circle !important;
    }
  }
}
.history_optimum,
.motion_recording {
  padding: 0.2rem;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  h4 {
    padding-left: 0.2rem;
    text-align: left;
    font-size: 0.18rem;
    margin-bottom: 0.12rem;
    display: flex;
    align-items: center;
  }
  .history_value {
    display: flex;
    justify-content: space-between;
    &_item {
      display: flex;
      flex-direction: column;
      .item_text {
        font-size: 0.12rem;
        margin-bottom: 0.12rem;
      }
      .item_value {
        font-size: 0.14rem;
      }
    }
  }
}
.motion_recording {
  .motion_ul {
    li {
      padding: 0 0.15rem;
      margin-bottom: 0.14rem;
      display: flex;
      justify-content: space-between;
      .motion_type {
        font-size: 0.14rem;
        .motion_circular {
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background-color: #3476fe;
          margin-right: 0.05rem;
        }
      }
      .motion_time {
        font-size: 0.12rem;
        color: #aaaaaa;
      }
    }
  }
}
.small_icon2,
.small_icon3,
.small_icon4 {
  display: inline-block;
  width: 0.24rem;
  height: 0.32rem;
  margin-right: 0.04rem;
}
.small_icon3 {
  width: 0.32rem;
  height: 0.32rem;
}
.small_icon4 {
  width: 0.28rem;
  height: 0.28rem;
}
</style>

<template>
  <div class="main">
    <div v-show="!recommendState">
      <section class="user_header">
        <div class="uer_close" @click="user_login"></div>
        <div class="user_avatar">
          <img :src="userInfo.user_avatar" alt="" />
        </div>
        <h4>{{ userInfo.user_name }}</h4>
        <div class="user_star">
          <span>累计获星:</span>
          <span>{{ userData.total.star_count || 0 }}</span>
        </div>
        <div class="user_ability">
          <div class="user_ability_item">
            <span class="ability_value">{{ userData.data.sport_power }}</span>
            <span class="ability_title">运动能力</span>
          </div>
          <div class="user_ability_line"></div>
          <div class="user_ability_item">
            <span class="ability_value">{{ userData.data.vitality }}</span>
            <span class="ability_title">活力</span>
          </div>
        </div>
      </section>
      <!-- <section class="week_motion">
        <h4>
          <span
            class="small_icon2"
            :style="{
              background: `url(${publicPath}common/images/small_icon2.png) no-repeat`,
              backgroundSize: '100% 100%',
            }"
          ></span>
          本周运动
        </h4>
        <ul class="date_ul">
          <li v-for="item of 7" :key="item">
            <span>{{ item }}</span>
            <span class="option"></span>
          </li>
        </ul>
        <ul class="remind_ul">
          <li>今日训练计划已完成</li>
          <li>运动完成后记得要拉伸放松肌肉，帮助恢复~</li>
        </ul>
      </section>
      <section class="history_optimum">
        <h4>
          <span
            class="small_icon4"
            :style="{
              background: `url(${publicPath}common/images/small_icon4.png) no-repeat`,
              backgroundSize: '100% 100%',
            }"
          ></span>
          当前器械历史最佳
        </h4>
        <div class="history_value">
          <div class="history_value_item">
            <span class="item_text">总负重</span>
            <span class="item_value">1500KG</span>
          </div>
          <div class="history_value_item">
            <span class="item_text">单次最大重复率</span>
            <span class="item_value">48KG</span>
          </div>
        </div>
      </section>
      <section class="motion_recording">
        <h4>
          <span
            class="small_icon3"
            :style="{
              background: `url(${publicPath}common/images/small_icon3.png) no-repeat`,
              backgroundSize: '100% 100%',
            }"
          ></span>
          当前器械历史最佳
        </h4>
        <ul class="motion_ul">
          <li v-for="item of 4" :key="item">
            <div class="motion_type">
              <span class="motion_circular"></span>
              <span>腹肌训练-标准模式</span>
            </div>
            <div class="motion_time">2021年10月11日08:26</div>
          </li>
        </ul>
      </section> -->
    </div>
    <RecommDetails v-if="recommendState" />
  </div>
</template>

<script>
import RecommDetails from './RecommDetails'
import { mapGetters, mapActions } from 'vuex'
import api from '@/api/api'
export default {
  props: {
    // userInfo: {
    //   type: Object,
    // },
  },
  components: {
    RecommDetails,
  },
  watch: {},
  data() {
    return {
      userData: {
        total: {
          star_count: 0,
        },
        data: {
          sport_power: 0,
          vitality: 0,
        },
      },
    }
  },
  created() {},
  mounted() {
    this.getUserAll()
  },
  computed: {
    ...mapGetters(['recommendState', 'userInfo', 'publicPath']),
  },
  methods: {
    // ...mapActions([]),
    async getUserAll() {
      const rs = await api.get('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      console.log(rs)
      if (rs.data.code == '200') {
        this.userData = rs.data.data
      }
    },
    user_login() {
      this.$emit('userlogout')
    },
  },
}
</script>
