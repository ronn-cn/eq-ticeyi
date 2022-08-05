<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home {
  height: calc(100% - 40px);
  display: flex;
  background: #1b254b;
  padding: 20px;
  .home_nav {
    color: #fff;
    margin-right: 18px;
    position: relative;
    &_qrcode {
      width: 455px;
      height: 434px;
      background: url("~assets/images/phase2/home_ac.png");
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      //未登录
      .qr_img {
        width: 1.57rem;
        height: 1.57rem;
        img {
          width: 1.57rem;
          height: 1.57rem;
        }
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
        width: 315px;
        height: 132px;
        font-size: 36px;
        padding: 0 20px 0 120px;
        display: flex;
        align-items: center;
        margin: 20px 0;
        background: linear-gradient(180deg, #323647 0%, #222631 100%);
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.09);
        border-radius: 20px;
        position: relative;
        .round_text {
          position: absolute;
          left: 52px;
          width: 40px;
          height: 40px;
          border: 2px solid#fff;
          border-radius: 50%;
          font-size: 26px;
          line-height: 40px;
        }
        .switch {
          position: relative;
          left: 85px;
        }
      }
      .active {
        background: url("~assets/images/phase2/home_c.png") no-repeat;
        background-size: cover;
        position: relative;
        .home_icon {
          color: #007aff;
          background: #ffffff;
        }
        .round_text {
          color: #007aff;
          background: #fff;
        }
      }
      .active::after {
        content: "";
        width: 48px;
        height: 48px;
        background: url("~assets/images/phase2/icon1.svg") no-repeat;
        position: absolute;
        top: 56px;
        right: 2px;
      }
      .user_liout {
        background: #ff3b30 !important;
        color: rgba(255, 255, 255, 0.97);
        .shape {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          box-sizing: border-box;
          background-image: url("/common/images/home/home_icon4.png");
          background-size: 100% 100%;
        }
      }
    }
    &_out {
      height: 1.28rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.24rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #99ccf0;
        padding: 0.2rem 0.4rem;
        background: rgba(103, 117, 217, 0.3);
        border: 1px solid #89b2e7;
        opacity: 0.5;
        border-radius: 0.33rem;
      }
    }
  }
}

.user_value {
  width: 86%;
  padding-left: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  &_item {
    position: relative;
    .up1 {
      font-size: 36px;
      margin-bottom: 12px;
    }
    .up2 {
      font-size: 24px;
    }
  }
  :nth-child(2).user_value_item::after {
    content: "";
    position: absolute;
    right: -44px;
    top: 10px;
    width: 3px;
    height: 60px;
    background: #fff;
  }
  :nth-child(2).user_value_item::before {
    content: "";
    position: absolute;
    left: -44px;
    top: 10px;
    width: 3px;
    height: 60px;
    background: #fff;
  }
}
</style>
<template>
  <div class="main">
    <div class="home"
         v-if="!dataTextState">
      <div class="home_nav"
           v-show="!showCourse">
        <div class="home_nav_qrcode"
             v-if="!loginState">
          <QRCode ref="qrcode1"
                  v-if="qrstate"
                  class="vx_qr"
                  :qrwidth="200"
                  :qrheight="200"
                  codeid="1"
                  :codeTest="Qrcode"></QRCode>
          <p class="p1">微信扫码登陆</p>
        </div>
        <div class="home_nav_qrcode"
             v-if="loginState">
          <div class="qrcode_avatar">
            <div class="avatar_img">
              <img :src="userInfo.user_avatar || ''"
                   alt="" />
            </div>
            <p class="p2">{{ userInfo.user_name || '' }}</p>
          </div>
          <div class="user_value">
            <div class="user_value_item">
              <p class="up1">{{ user_data.vitality_v || 0 }}</p>
              <p class="up2">活力</p>
            </div>
            <div class="user_value_item">
              <p class="up1">{{ user_data.athletic_ability_v || 0 }}</p>
              <p class="up2">运动力</p>
            </div>
            <div class="user_value_item">
              <p class="up1">{{ user_data.star_count || 0 }}</p>
              <p class="up2">获星总数</p>
            </div>
          </div>
        </div>
        <ul>
          <li v-for="(item, index) of patternList"
              :class="{ active: itemindex == index }"
              @click="swichindex(index)"
              :key="item.id">
            <span class="round_text">{{index == 0 ? "T":"H"}}</span>
            <span>{{ item.title }}</span>
          </li>
          <li>
            <span class="round_text">H</span>
            语音播报<span style="margin-right: 0.1rem">
            </span>
            <VoiceSwitch @change="switchstate(voicestate)"
                         class="switch"
                         :value="voicestate"></VoiceSwitch>
          </li>
          <li class="user_liout"
              @click="logout"
              v-if="loginState">
            <span class="round_text">X</span>
            <span>退出账号</span>
          </li>
        </ul>
      </div>
      <home-view :itemindex="itemindex"
                 @set_showCourse="set_showCourse"></home-view>
    </div>
  </div>
</template>

<script>
import VoiceSwitch from '@/components/bodytester/Switch.vue'
import HomeView from './HomeView.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import QRCode from '@/components/QRCode.vue'
export default {
  name: 'Home',
  components: {
    VoiceSwitch,
    HomeView,
    QRCode,
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'userInfo',
      'voicestate',
      'userMakeState',
      'publicPath',
      'user_data',
    ]),
  },
  data () {
    return {
      itemindex: 0,
      patternList: [
        {
          id: 1,
          title: '体成分测试',
        },
        {
          id: 2,
          title: '体测记录',
        },
      ],
      caretitle: '',
      caredesc: '',
      dataTextState: false,
      qrcode: null,
      qrstate: true,
      showCourse: false, //左侧是否显示
    }
  },
  watch: {
    Qrcode (val) {
      this.init_qrcode(val)
    },
    // loginState (val) {
    //   if (!val) {
    //     this.init_qrcode(this.Qrcode)
    //     this.$store.commit('set_user_age', 18)
    //     this.$store.commit('set_user_sex', 0)
    //   } else {
    //     console.log("执行get-user-all")
    //     this.all_user()
    //   }
    // },
    dataTextState (val) {
      this.$store.commit('set_testState', val)
      if (!val) {
        this.init_qrcode(this.Qrcode)
      }
    },
  },
  created () {
    this.switchstate(false)
  },
  mounted () {
    if (!this.loginState) {
      const userinfo = window.localStorage.getItem('userInfo')
      if (userinfo) {
        this.setLoginStatus(userinfo)
      } else {
        if (this.Qrcode) {
          this.init_qrcode(this.Qrcode)
        }
      }
    }
  },
  destroyed: function () { },
  methods: {
    ...mapMutations(['setLoginStatus', 'SEND_SOCKET']),
    ...mapActions(['logout', 'all_user']),
    //调用二维码
    async init_qrcode (text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    swichindex (index) {
      this.itemindex = index
      if (this.userMakeState) {
        this.$store.dispatch('set_userMakeState', false)
      }
    },
    //声音播放
    switchstate (val) {
      console.log(val)
      this.$store.commit('set_voicestate', !val)
    },
    set_showCourse (val) {
      this.showCourse = val
    },
  },
}
</script>
