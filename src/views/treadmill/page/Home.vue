<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  background: rgb(27, 26, 26);
  .home_nav::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: #2386be;
  }
  .home_nav {
    color: #fff;
    width: 3.59rem;
    position: relative;
    // background: url($publicPath + '/TreadmillStatic/images/nav_yuxuan.png')
    //   no-repeat;
    // background-position: 3.4rem 0;
    &_qrcode {
      height: 2.85rem;
      width: 100%;
      // background: linear-gradient(0deg, #4668bf 0%, #3a4199 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //未登录
      .qr_img {
        width: 1.57rem;
        height: 1.57rem;
      }
      .p1 {
        margin-top: 0.22rem;
        font-size: 0.2rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
      }
      //已登录
      .qrcode_avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar_img {
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            // background: chocolate;
          }
        }
        .p2 {
          margin-top: 0.17rem;
          font-size: 0.24rem;
          font-family: SourceHanSansCN;
          font-weight: 400;
        }
      }
      .qrcode_userinfo {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin-top: 0.28rem;
        .p3 {
          color: #8dafda;
          font-size: 0.28rem;
          margin-bottom: 0.09rem;
          span {
            color: #fff;
            font-family: DIN;
            font-weight: bold;
          }
        }
        .p4 {
          font-size: 0.18rem;
          font-family: SourceHanSansCN;
          font-weight: 400;
        }
      }
    }
    ul {
      li {
        height: 1rem;
        font-size: 0.26rem;
        display: flex;
        // justify-content: center;
        align-items: center;
        padding-left: 20%;
        border-bottom: 1px solid #31353c;
      }
      .active {
        background: url('~assets/images/nav_li.png') no-repeat;
        background-size: cover;
      }
    }
    &_out {
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
      width: 0.3rem;
      height: 0.3rem;
      background: url('~assets/images/small_icon1.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>
<template>
  <div class="home">
    <div class="home_nav">
      <div class="home_nav_qrcode" v-show="!loginState">
        <QRCode
          :codeTest="Qrcode"
          :qrwidth="240"
          :qrheight="240"
          codeid="1"
          v-if="rqcodestate"
        ></QRCode>
        <p class="p1">微信扫码登陆</p>
      </div>
      <div class="home_nav_qrcode" v-if="loginState">
        <div class="qrcode_avatar">
          <div class="avatar_img">
            <img :src="userInfo.user_avatar || ''" alt="" />
          </div>
          <p class="p2">{{ userInfo.user_name || '' }}</p>
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) of patternList"
          :class="{ active: itemindex == index }"
          @click="switchLi(index)"
          :key="item.id"
        >
          <img
            :src="`${publicPath}TreadmillStatic/images/li_icon${index}.png`"
            alt=""
            style="margin-right: 0.15rem"
          />
          {{ item.title }}
        </li>
      </ul>
      <div class="home_nav_out" @click="logout" v-if="loginState"></div>
    </div>
    <home-view :itemindex="itemindex"></home-view>
  </div>
</template>

<script>
import HomeView from './HomeView.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import QRCode from '@/components/QRCode'
export default {
  name: 'Home',
  components: { HomeView, QRCode },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'userInfo',
      'resStartLesson',
      'publicPath',
      'userMakeState',
    ]),
  },
  data() {
    return {
      itemindex: 2,
      patternList: [
        {
          id: 1,
          title: '主题RUN',
        },
        {
          id: 2,
          title: '模式RUN',
        },
        {
          id: 3,
          title: '自由RUN',
        },
        {
          id: 4,
          title: 'VO2Max测试',
        },
      ],
      rqcodestate: false,
    }
  },
  watch: {
    Qrcode(val) {
      this.updeQrcode()
    },
    loginState(val) {
      if (!val) {
        this.updeQrcode()
      }
    },
  },
  mounted() {
    // console.log(this.$route)
    if (!this.loginState) {
      const userinfo = window.localStorage.getItem('userInfo')
      if (userinfo) {
        this.setLoginStatus(userinfo)
      } else {
        if (this.Qrcode) {
          this.updeQrcode()
        }
      }
    }
  },
  destroyed: function () {},
  methods: {
    ...mapMutations(['setLoginStatus', 'SEND_SOCKET']),
    ...mapActions(['logout']),
    updeQrcode() {
      this.rqcodestate = false
      this.$nextTick()
      this.rqcodestate = true
    },
    switchLi(index) {
      if (process.env.NODE_ENV == 'development') {
        if (!this.userMakeState) {
          this.itemindex = index
        }
      }
    },
  },
}
</script>
