<style lang="scss">
@import url('~assets/css/reset.css');
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
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <Login v-if="StandbyState"></Login>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components: {
    Login,
  },
  data() {
    return {}
  },
  watch: {
    getTouchTime(val) {
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
    resLogoutUser(val) {
      this.logout()
    },
  },
  computed: {
    ...mapGetters([
      'getTouchTime',
      'StandbyState',
      'userMakeState',
      'resLogoutUser',
    ]),
  },
  created() {
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
}
</script>
