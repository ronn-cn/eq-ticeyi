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
    </div>
    <!-- <RecommDetails v-if="recommendState" /> -->
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
      const rs = await api.post('/get-user-all', {
        user_id: this.userInfo.user_id,
      })
      console.log(rs)
      if (rs.data.code == '200') {
        this.userData = rs.data.data
      }
    },
    user_login() {
      this.$emit('userlogout')
      this.$router.push('/')
    },
  },
}
</script>
