<style scoped lang="scss">
.main_details {
  width: 100%;
  height: 100%;
  position: relative;
}
.recomm_back {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: #3476fe;
  // background: url(../../public/common/images/small_icon0.png) no-repeat;
  // background-size: cover;
}
.recomm_back::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 100px solid red;
  border-top: 100px solid green;
  border-bottom: 100px solid rgb(231, 175, 72);
  border-right: 100px solid #f5a623;
  transform: translateX(-104px) translateY(-104px) rotate(45deg);
}
.recomm_back::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 60px;
  height: 60px;
  background: url('~assets/images/common/home_back.png') no-repeat;
  background-size: cover;
  z-index: 99;
}

.main_content {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .content_title {
    min-width: 1rem;
    height: 0.37rem;
    padding: 0 0.2rem;
    line-height: 0.37rem;
    font-size: 0.14rem;
    font-weight: bold;
    border: 1px solid #000;
    border-radius: 0.06rem;
    margin-top: 0.5rem;
    white-space: nowrap;
  }
  .content_energy {
    font-size: 0.14rem;
    font-weight: bold;
    padding: 0.2rem 0;
  }
  .content_p {
    font-size: 0.14rem;
    font-weight: bold;
    width: 85%;
    text-align: center;
    line-height: 0.2rem;
    display: -webkit-box;
    display: -moz-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*显示行数*/
  }
  .content_cover {
    width: 2.3rem;
    height: 2.3rem;
    // background-color: aqua;
    margin-top: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content_progress {
    width: 70%;
    height: 0.06rem;
    background-color: aquamarine;
    margin: 0.2rem 0;
  }
  .content_tips {
    font-size: 0.15rem;
    line-height: 0.2rem;
    padding: 0 0.2rem;
  }
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.8rem;
  border-top: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer_btn {
    color: #fff;
    font-size: 0.16rem;
    width: 1.97rem;
    height: 0.41rem;
    line-height: 0.41rem;
    border-radius: 0.28rem;
    background-color: #3476fe;
  }
}
</style>

<template>
  <div class="main_details">
    <div class="recomm_back" @click="lotrecommend"></div>
    <section class="main_content">
      <div class="content_title">{{ recommInfo.name || '测试' }}</div>
      <div class="content_energy">
        <span>l{{ recommInfo.factor || 0 }}</span> |
        <span>{{ Math.ceil(recommInfo.time / 60 || 0) }}分钟</span> |
        <span>{{ recommInfo.calorie || 0 }}千卡</span> |
      </div>
      <p class="content_p">{{ recommInfo.desc }}</p>
      <div class="content_cover">
        <img :src="imgurl" alt="" />
      </div>
      <div class="content_progress"></div>
      <div class="content_tips">
        请您前往有氧区<span style="color: #0eebf0">'{{ recommMsg.name }}'</span
        >开启健身课程
      </div>
    </section>
    <section class="footer">
      <div class="footer_btn" @click="GoTo">立即前往{{ downnum }}s</div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '../api/api'
export default {
  props: {},
  data() {
    return {
      recommInfo: {},
      recommMsg: {},
      imgurl: '',
      downnum: 30,
      timer: null,
    }
  },
  watch: {
    recommendid: {
      handler(val) {
        if (Object.keys(val).length !== 0) {
          this.recommInfo = val.data
          this.recommMsg = val.msg
          this.loaddetails(val.data.equipmenttype)
          this.downChang()
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters([
      'recommendid',
      'userInfo',
      'client_id',
      'publicPath',
      'projecttype',
    ]),
  },
  created() {},
  mounted() {},
  destroyed: function () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    ...mapActions(['logout']),
    downChang() {
      clearInterval(this.timer)
      this.downnum = 30
      this.timer = setInterval(() => {
        if (this.downnum == 0) {
          clearInterval(this.timer)
          this.$router.push('/')
        } else {
          this.downnum -= 1
        }
      }, 1000)
    },
    //取消用户转移
    async lotrecommend() {
      clearInterval(this.timer)
      this.timer = null
      this.downnum = 30
      this.$store.commit('set_recommendid', {})
      const rs = await api.post('/cancel-transfer', {
        client_id: this.client_id,
      })
      console.log('用户转移取消', rs)
    },
    //加载
    async loaddetails(val) {
      if (val.includes('健身指导镜')) {
        this.imgurl = `${this.publicPath}common/images/jianshenjing.png`
      } else if (val.includes('跑步机')) {
        this.imgurl = require('../assets/images/paobuji.png')
      } else if (val.includes('体测仪')) {
        this.imgurl = require('../assets/images/ticeyi.png')
      } else {
        this.imgurl = `${this.publicPath}powerStatic/images/${this.projecttype}.png`
      }
    },
    GoTo() {
      clearInterval(this.timer)
      this.logout()
      this.$router.push('/')
    },
  },
}
</script>
