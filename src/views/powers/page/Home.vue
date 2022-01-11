<style scoped lang="scss">
#main_cover {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
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
    width: 2px;
    height: 100%;
    background-color: #8a8a8a;
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
      border-bottom: 2px solid #fff;
      //未登录
      .qr_img {
        width: 1.3rem;
        height: 1.3rem;
        img {
          width: 100%;
          height: 100%;
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
          }
        }
        .p2 {
          margin-top: 0.17rem;
          font-size: 0.24rem;
          font-family: SourceHanSansCN;
          font-weight: 400;
        }
      }
    }
    ul {
      li {
        height: 1.16rem;
        font-size: 0.26rem;
        display: flex;
        align-items: center;
        padding-left: 10%;
        border-bottom: 2px solid #fff;
        .home_icon {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          background-size: 100% 100%;
        }
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
        border-right: 0.12rem solid #ffffff;
        position: absolute;
        top: 0.44rem;
        right: 2px;
        z-index: 99;
      }
    }
    .user_liout {
      width: 3.3rem;
      height: 1rem;
      margin: 10px auto;
      border-radius: 5px;
      background-color: #fc2d56;
      box-sizing: border-box;
      box-shadow: 5px 5px 20px 0px #f85e60;
      font-family: '苹方 简 常规', '苹方 简', sans-serif;
      color: rgba(255, 255, 255, 0.97);
      .shape {
        width: 40px;
        height: 40px;
        margin-right: 10px;

        box-sizing: border-box;
        background-image: url('/common/images/home/home_icon4.png');
        background-size: 100% 100%;
      }
    }
  }
}
</style>

<template>
  <div id="main_cover">
    <div class="home" v-if="!trainstatic">
      <div class="home_nav">
        <div class="home_nav_qrcode" v-show="!loginState">
          <div class="qr_img" id="qrdiv"></div>
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
            @click="swichType(index)"
            :key="item.id"
          >
            <div
              class="home_icon"
              :style="{
                backgroundImage: `url(${publicPath}common/images/home/home_icon${
                  index + 1
                }.png)`,
              }"
            ></div>
            {{ item.title }}
          </li>
          <li class="user_liout" @click="logout" v-if="loginState">
            <div class="shape"></div>
            退出当前账号
          </li>
        </ul>
      </div>
      <home-view
        :itemindex="itemindex"
        @send_askLedState="send_askLedState"
      ></home-view>
    </div>

    <!-- <TrainPage v-show="trainstatic" /> -->
  </div>
</template>

<script>
import HomeView from './HomeView.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import QRCode from 'qrcodejs2'
import TrainPage from './TrainPage.vue'
export default {
  name: 'Home',
  components: { HomeView, TrainPage },
  data() {
    return {
      itemindex: 0,
      patternList: [
        {
          id: 1,
          title: '标准模式',
        },
        {
          id: 2,
          title: '自由模式',
        },
        {
          id: 3,
          title: '力量测试',
        },
      ],
      _beforeUnload_time: '',
      trainstatic: false,
    }
  },
  created() {},
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
    // window.addEventListener('beforeunload', (e) => this.beforeunloadHandler(e))
    // window.addEventListener('unload', (e) => this.unloadHandler(e))
  },
  //离开页面
  destroyed: function () {
    // window.removeEventListener('beforeunload', (e) =>
    //   this.beforeunloadHandler(e)
    // )
    // window.removeEventListener('unload', (e) => this.unloadHandler(e))
  },
  computed: {
    ...mapGetters(['Qrcode', 'loginState', 'userInfo', 'publicPath']),
  },
  watch: {
    Qrcode(val) {
      this.init_qrcode(val)
    },
    loginState(val) {
      if (!val) {
        this.init_qrcode(this.Qrcode)
      } else {
        this.all_user()
      }
    },
  },
  methods: {
    ...mapMutations(['setLoginStatus', 'set_MakeCareInfo', 'set_lesson_id']),
    ...mapActions(['logout', 'send_askLedState', 'all_user']),
    //调用二维码
    init_qrcode(text) {
      let box = document.getElementById('qrdiv')
      var contentHeight = window.getComputedStyle(box).height
      let ipx = contentHeight.indexOf('px')
      let widthheight = contentHeight.slice(0, ipx)
      // console.log(contentHeight, contentHeight.slice(0, ipx))
      //这里是调用的方法
      const qrid = document.getElementById('qrdiv')
      if (qrid) {
        if (qrid.hasChildNodes()) {
          console.log('有')
        } else {
          let qrlogin = new QRCode('qrdiv', {
            width: widthheight, // 设置宽度
            height: widthheight, // 设置高度
            text,
          })
        }
      }
    },
    //开始训练
    setstartTrain() {
      // this.trainstatic = true
    },
    swichType(index) {
      this.itemindex = index
    },
    // beforeunloadHandler() {
    //   this._beforeUnload_time = new Date().getTime()
    // },
    // //前端窗口关闭
    // unloadHandler(e) {
    //   this._gap_time = new Date().getTime() - this._beforeUnload_time
    //   // debugger
    //   //判断是窗口关闭还是刷新
    //   if (this._gap_time <= 5) {
    //     this.send_askLedState({ r: 0, g: 0, b: 0 })
    //   }
    // },
  },
}
</script>
