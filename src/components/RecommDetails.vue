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
  top: 0.2rem;
  left: 0.2rem;
  background: url(../../public/common/images/small_icon0.png) no-repeat;
  background-size: cover;
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
    margin-top: 1.2rem;
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
      <div class="content_title">{{ recommInfo.name }}</div>
      <div class="content_energy">
        <span>l{{ recommInfo.factor }}</span> |
        <span>{{ Math.ceil(recommInfo.time / 60) }}分钟</span> |
        <span>{{ recommInfo.calorie }}千卡</span> |
      </div>
      <p class="content_p">{{ recommInfo.desc }}</p>
      <div class="content_cover">
        <img :src="imgurl" alt="" />
      </div>
      <div class="content_progress"></div>
      <div class="content_tips">
        请您前往有氧区<span style="color: #0eebf0"
          >'{{ recommendMsg.name }}'</span
        >开启健身课程
      </div>
    </section>
    <section class="footer">
      <div class="footer_btn" @click="GoTo">立即前往</div>
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
      imgurl: '',
    }
  },
  watch: {
    recommendid: {
      handler(val) {
        this.loaddetails(val)
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['recommendid', 'userInfo', 'recommendMsg', 'client_id']),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['logout']),
    async lotrecommend() {
      this.$store.commit('set_recommendid', '')
      const rs = await api.post('/cancel-transfer', {
        client_id: this.client_id,
      })
      console.log(rs)
    },
    async loaddetails(val) {
      const data = require('../../public/common/js/lessons.json')

      for (let i in data) {
        if (data[i].md5 == val) {
          // console.log(data[i])
          this.recommInfo = data[i]
          if (data[i].equipmenttype.includes('健身镜')) {
            this.imgurl = require('../assets/images/jianshenjing.png')
          } else if (data[i].equipmenttype.includes('跑步机')) {
            this.imgurl = require('../assets/images/paobuji.png')
          } else if (data[i].equipmenttype.includes('体测仪')) {
            this.imgurl = require('../assets/images/ticeyi.png')
          } else {
            this.imgurl = require('../assets/images/zuozixunlianqi.png')
          }
        }
      }
    },
    GoTo() {
      this.logout()
      this.$router.push('/')
    },
  },
}
</script>
