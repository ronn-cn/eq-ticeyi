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
.threeMo {
  position: fixed;
  left: 660px;
  top: 280px;
  width: 600px;
  height: 700px;
  background: rgb(28, 158, 104);
  .iframe {
    width: 600px;
    height: 700px;
  }
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <div class="threeMo"
         :style="isMo ? '' : 'z-index: -1'">
      <!-- <h1 class="three_h1">{{threeTitle}}</h1> -->
      <iframe :src="`${publicPath}bodytesterStatic/glb/index.html`"
              class="iframe"
              frameborder="0"></iframe>
      <!-- <ThreeMo @loadtitle="loadtitle" /> -->
    </div>
    <Login v-if="StandbyState"></Login>
  </div>
</template>

<script>
import ThreeMo from './page/threeMo.vue'
import { mapActions, mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components: {
    Login,
    ThreeMo,
  },
  data () {
    return {
      threeTitle: "未加载"
    }
  },
  watch: {
    getTouchTime (val) {
      if (process.env.NODE_ENV !== 'development') {
        if (!this.userMakeState) {
          if (this.$route.path == '/datadetection') {
            this.$router.push('/')
            this.$store.commit('set_StandbyState', true)
            this.$store.dispatch('logout')
          }
        }
      }
    },
    resLogoutUser (val) {
      this.logout()
    },
  },
  computed: {
    ...mapGetters([
      'getTouchTime',
      'StandbyState',
      'userMakeState',
      'resLogoutUser',
      'publicPath',
      'testState',
    ]),
    isMo () {
      let path = this.$route.path
      if (path == '/datadetection') {
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
  },
  methods: {
    ...mapActions(['init_socket', 'logout']),
  },
  methods: {
    loadtitle (url) {
      this.threeTitle = url
    }
  }
}
</script>
