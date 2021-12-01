<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}
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
    width: 0.04rem;
    height: 100%;
    background-color: #2386be;
  }
  .home_nav {
    color: #fff;
    width: 3.59rem;
    position: relative;
    &_qrcode {
      height: 2.5rem;
      width: 100%;
      background: linear-gradient(0deg, #4668bf 0%, #3a4199 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
        height: 1.1rem;
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
        position: relative;
      }
      .active::after {
        content: '';
        width: 0px;
        height: 0px;
        border-top: 0.12rem solid transparent;
        border-bottom: 0.12rem solid transparent;
        border-left: 0.12rem solid #ffffff;
        position: absolute;
        top: 0.44rem;
        right: -0.1rem;
        z-index: 99;
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
</style>
<template>
  <div class="main">
    <div class="home" v-if="!dataTextState">
      <div class="home_nav">
        <div class="home_nav_qrcode" v-if="!loginState">
          <QRCode
            ref="qrcode1"
            v-if="qrstate"
            class="vx_qr"
            :qrwidth="200"
            :qrheight="200"
            codeid="1"
            :codeTest="Qrcode"
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
            @click="swichindex(index)"
            :key="item.id"
          >
            {{ item.title }}
          </li>
          <li>
            语音播报<span style="margin-right: 0.1rem"
              >{{ voicestate ? '已开启' : '已关闭' }}
            </span>
            <VoiceSwitch
              @change="switchstate"
              :value="voicestate"
            ></VoiceSwitch>
          </li>
        </ul>
        <div class="home_nav_out" @click="logout" v-if="loginState">
          <span>退出当前账号</span>
        </div>
      </div>
      <home-view
        :itemindex="itemindex"
        @setdatastate="setdatastate"
      ></home-view>
    </div>
    <DataDetection
      v-if="dataTextState"
      @setdatastate="setdatastate"
    ></DataDetection>
  </div>
</template>

<script>
import VoiceSwitch from '@/components/bodytester/Switch.vue'
import HomeView from './HomeView.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DataDetection from './DataDetection.vue'
import QRCode from '@/components/QRCode.vue'
// import QRCode from "qrcodejs2";
export default {
  name: 'Home',
  components: {
    VoiceSwitch,
    HomeView,
    DataDetection,
    QRCode,
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'userInfo',
      'resStartLesson',
      'voicestate',
      'userMakeState',
      'publicPath',
    ]),
  },
  data() {
    return {
      itemindex: 0,
      patternList: [
        {
          id: 1,
          title: '自助体侧',
        },
        {
          id: 2,
          title: '查看历史数据',
        },
      ],
      caretitle: '',
      caredesc: '',
      dataTextState: false,
      qrcode: null,
      qrstate: true,
      //_beforeUnload_time: "",
    }
  },
  watch: {
    Qrcode(val) {
      this.init_qrcode(val)
    },
    loginState(val) {
      if (!val) {
        this.init_qrcode(this.Qrcode)
      }
    },
    dataTextState(val) {
      if (!val) {
        this.init_qrcode(this.Qrcode)
      }
    },
  },
  created() {
    this.switchstate(true)
  },
  mounted() {
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
  destroyed: function () {},
  methods: {
    ...mapMutations(['setLoginStatus', 'SEND_SOCKET']),
    ...mapActions(['logout']),
    //调用二维码
    async init_qrcode(text) {
      this.qrstate = false
      await this.$nextTick()
      this.qrstate = true
    },
    swichindex(index) {
      if (this.userMakeState) {
        this.$store.commit('set_userMakeState', false)
      }
      this.itemindex = index
      // console.log(this.userMakeState);
    },
    //开始体测
    setdatastate(boolean) {
      this.dataTextState = boolean
    },
    //声音播放
    switchstate(val) {
      // console.log(val)
      this.$store.commit('set_voicestate', val)
    },
  },
}
</script>
