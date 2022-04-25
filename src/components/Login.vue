<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .login_back {
    width: 100%;
    height: 100%;
  }
  .login_mask {
    height: 100%;
    width: 100%;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 0.78rem;
      font-family: SourceHanSansCN;
      font-weight: 500;
    }
    .login_rqcode {
      width: 1.74rem;
      height: 1.74rem;
      background: green;
      position: absolute;
      bottom: 0.78rem;
      right: 0.65rem;
    }
    .login_day {
      position: absolute;
      top: 0.8rem;
      right: 0.65rem;
      text-align: right;
      &_p1 {
        font-size: 0.72rem;
        font-family: DIN;
        font-weight: bold;
      }
      &_p2 {
        font-size: 0.28rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        margin: 0.32rem 0 0.16rem 0;
      }
      &_p3 {
        font-size: 0.28rem;
        font-family: DIN;
      }
    }
  }
}
</style>

<template>
  <div class="login">
    <img
      :src="`${publicPath}common/images/login_back.png`"
      class="login_back"
    />
    <div class="login_mask" @click="outstate">
      <div>
        <img
          :src="`${publicPath}common/images/login_img1.png`"
          style="width: 4.2rem; margin-bottom: 0.16rem"
        />
        <h1>{{ title }}</h1>
      </div>
      <div class="login_day">
        <p class="login_day_p1">{{ timer }}</p>
        <p class="login_day_p2">{{ work }}</p>
        <p class="login_day_p3">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'SPORT智能健身房',
      date: '',
      timer: '',
      work: '',
      logintime: null,
    }
  },
  created() {},
  mounted() {
    this.formatdate()
  },
  computed: {
    ...mapGetters(['publicPath']),
  },
  destroyed() {
    if (this.logintime) {
      clearInterval(this.logintime)
    }
  },
  methods: {
    outstate() {
      clearInterval(this.logintime)
      this.$store.commit('set_StandbyState', false)
    },
    formatdate() {
      var myDate = new Date()
      this.date = this.$moment().format('YYYY-MM-DD')
      this.weekDay(this.date)
      this.timer = myDate.getHours() + ':' + myDate.getMinutes()
      this.logintime = setInterval(() => {
        let dateh = this.$moment().format('HH')
        let datem = this.$moment().format('mm')
        this.timer = `${Number(dateh)}:${datem}`
      }, 1000)
    },
    //转换星期几
    weekDay(date) {
      let newdate = this.$moment(`${date}`)
      var dow = newdate.isoWeekday()
      const daynum = {
        1: ['星期一 Monday'],
        2: ['星期二 Tuesday'],
        3: ['星期三 Wednesday'],
        4: ['星期四 Thursday'],
        5: ['星期五 Friday'],
        6: ['星期六 Saturday'],
        7: ['星期七 Sunday'],
      }
      this.work = daynum[dow][0]
    },
  },
}
</script>
