<style lang="scss">
@import url("~assets/css/reset.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100%;
  font-size: 0.22rem;
}
html,
body {
  width: 100%;
  height: 100%;
}

.iframe_conver1 {
  position: fixed;
  top: 9%;
  left: 7%;
  width: 4.5rem;
  height: 5rem;
  // background: rgb(18, 168, 31);
}
.iframe_conver2 {
  position: fixed;
  top: 9%;
  right: 7%;
  width: 4.5rem;
  height: 5rem;
  // background: rgb(18, 168, 31);
}
p {
  margin-bottom: 0;
}
::v-deep .van-button--default {
  color: #fff !important;
  border: 0;
}
</style>

<template>
  <div id="app">
    <keep-alive :include="['TrainPage']">
      <router-view></router-view>
    </keep-alive>

    <Login v-if="StandbyState"></Login>

    <div class="iframe_conver1"
         :style="isMo ? '' : 'z-index: -1'"
         v-if="this.projecttype !== '体测仪'">
      <!-- <PowerMo @dropvalue="getFromIframe" /> -->
      <iframe :src="`${evenfPublic}012fb7b6d5a802614a264827c92194db/modelsL.html`"
              frameborder="0"
              class="iframe_conver1"></iframe>
    </div>
    <div class="iframe_conver2"
         :style="isMo ? '' : 'z-index: -1'"
         v-if="this.projecttype !== '体测仪'">
      <iframe :src="`${evenfPublic}012fb7b6d5a802614a264827c92194db/modelsR.html`"
              frameborder="0"
              id="mo2"
              class="iframe_conver2"></iframe>
      <!-- <PowerMo modeltype="1"
               :currentbgColor="0x303445"
               :modelVlue="modelVlue" /> -->
    </div>
  </div>
</template>

<script>
import PowerMo from '../../components/power/PowerMo.vue'
import { mapActions, mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import Viframe from '@/components/power/iframe.vue'
export default {
  name: 'App',
  components: {
    Login,
    Viframe,
    PowerMo,
  },
  data () {
    return {
      isChangeMe: '123',
      iframeCSS: {
        zIndex: '-1',
      },
      modelVlue: 0,
    }
  },
  computed: {},
  watch: {
    getTouchTime (val) {
      if (process.env.NODE_ENV !== 'development') {
        if (!this.userMakeState) {
          if (this.$route.path !== '/trainpage') {
            this.$router.push('/')
            this.$store.commit('set_StandbyState', true)
            this.$store.dispatch('logout')
          }
        }
      }
    },
    //模型下压
    moheight (val) {
      var moPage2 = document.getElementById('mo2').contentWindow
      moPage2.ControlAnimationTime(val)
      // this.modelVlue = val
    },
  },
  computed: {
    ...mapGetters([
      'getTouchTime', //触摸时间
      'StandbyState', //屏保
      'userMakeState', //预约
      'publicPath',
      'evenfPublic',
      'moheight',
      'projecttype',
    ]),
    isMo () {
      let path = this.$route.path
      if (
        path == '/strengthtest' ||
        path == '/freeplan' ||
        path == '/trainpage'
      ) {
        return true
      }
      return false
    },
  },
  created () {
    var whdef = 100 / 1280 // 表示1920的设计图,使用100PX的默认值,使用100px只是为了方便计算 其他值都可以
    // var wH = window.innerHeight;// 当前窗口的高度
    var wW = window.innerWidth // 当前窗口的宽度
    var rem = wW * whdef // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    document.getElementsByTagName('html')[0].style.fontSize = rem + 'px'

    this.init_socket()
    window.getFromIframe = this.getFromIframe //从iframe获取方法
    // this.isChangeMe = window.isChangeMe;
  },
  methods: {
    ...mapActions(['init_socket', 'logout']),
    getFromIframe (val) {
      let num = (val * 100) / 60
      let data = Math.floor(num)
      if (data >= 5 && data <= 100) {
        this.$store.commit('set_moloop', Math.floor(num))
      }
    },
  },
}
</script>
