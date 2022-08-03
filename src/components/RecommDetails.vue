<style scoped lang="scss">
.main_details {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
}
.recomm_back {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 0;
  right: 0;
  // background-color: #3476fe;
  // background: url(../../public/common/images/small_icon0.png) no-repeat;
  // background-size: cover;
}
.recomm_back::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  // border-left: 100px solid red;
  // border-top: 100px solid green;
  // border-bottom: 100px solid rgb(231, 175, 72);
  border: 100px solid #f5a623;
  transform: translateX(-53px) translateY(-103px) rotate(45deg);
}
.recomm_back::before {
  content: "";
  position: absolute;
  top: 10px;
  left: -20px;
  width: 60px;
  height: 60px;
  background: url("~assets/images/common/home_back.png") no-repeat;
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
    padding: 0.2rem 0;
    color: #7F7F7F;
  }
  .content_p {
    font-size: 0.14rem;
    width: 85%;
    color: #7F7F7F;
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
    border-radius: 0.03rem;
  }
  .content_tips {
    font-size: 0.13rem;
    line-height: 0.2rem;
    padding: 0 0.2rem;
  }
}
.footer {
  bottom: 0;
  width: 90%;
  margin:60px auto;
  height: 0.8rem;
  border-top: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer_btn {
    color: #fff;
    font-size: 0.16rem;
    width: 2.3rem;
    height: 0.41rem;
    line-height: 0.41rem;
    border-radius: 0.28rem;
    background-color: #28cd41;
  }
}
</style>

<template>
  <div class="main_details">
    <div class="recomm_back" @click="cancelTransfer(), click_effects()"></div>
    <section class="main_content">
      <div class="content_title">{{ tranfserData.lesson_name || '转移的课程标题' }}</div>
      <div class="content_energy">
        <span>L{{ tranfserData.lesson_factor/10 || 1 }}</span> |
        <span>{{ Math.ceil(tranfserData.lesson_time / 60 || 1) }}分钟</span> |
        <span>{{ tranfserData.lesson_energy || 180 }}kWatts</span> |
        <!-- 图标 -->
      </div>
      <p class="content_p">{{ tranfserData.lesson_desc }}</p>
      <div class="content_cover">
        <img :src="getImageUrl" alt="器械图片" />
      </div>
      <div class="content_progress" :style="getBackcolor"></div>
      <div class="content_tips">
        请您前往“<span :style="getcolor"> {{ tranfserData.name }} </span>”开启健身课程
      </div>
    </section>
    <section class="footer">
      <div class="footer_btn" @click="goNow">立即前往 ({{ downnum }})s</div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['receipt','tranfserData'],
  data () {
    return {
      recommInfo: {},
      recommMsg: {},
      imgurl: '',
      downnum: 30,
      timer: null,


    }
  },
  watch: { },
  computed: {
    ...mapGetters([
      'recommendid',
      'userInfo',
      'client_id',
      'publicPath',
      'projecttype',
    ]),
    getcolor () {
      return `color:rgb(${this.tranfserData.color})`
    },
    getBackcolor () {
      return `background-color:rgb(${this.tranfserData.color})`
    },
    getImageUrl() {
      var val = this.tranfserData.client_type;
      if (val.includes('健身指导镜')) {
        return `${this.publicPath}common/images/jianshenjing.png`
      } else if (val.includes('跑步机')) {
        return require('../assets/images/paobuji.png')
      } else if (val.includes('体测仪')) {
        return require('../assets/images/ticeyi.png')
      } else {
        return `${this.publicPath}powerStatic/images/${val[0]}.png`
      }
    }
  },
  created () { 
    console.log("created:",this.tranfserData);
    this.downChang();
  },
  mounted () {
    console.log("mounted:",this.tranfserData);
  },
  destroyed: function () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    ...mapActions(['logout', 'click_effects']),

    // 取消转移方法 
    cancelTransfer() {
      this.receipt('cancelTransfer');
    },
    // 立即前往方法
    goNow(){
      this.receipt('goNow');
      // clearInterval(this.timer)
    },
    downChang () {
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
  },
}
</script>
