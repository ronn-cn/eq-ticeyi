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
    height: 0.15rem;
    display: flex;
    align-items: center;
  }
  .content_energy span{
    display: inline-block;
    padding: 0 0.05rem;
  }
  .content_p {
    display: inline-block;
    font-size: 0.14rem;
    width: 85%;
    height: 0.4rem;
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
  margin:30px auto;
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
      <div class="content_energy" v-if="tranfserData.client_type != '体测仪'">
        <span>L{{ tranfserData.lesson_factor/10 || 0 }}</span> |
        <span>{{ Math.ceil(tranfserData.lesson_time / 60 || 1) }}分钟</span> |

        <span v-for="(item, index) in tranfserData.Apparatus" :key="index">
          <img :src="getIconUrl(item)" alt="icon" width="25"/>
        </span>
      </div>
      <p class="content_p" v-if="tranfserData.lesson_desc">{{ tranfserData.lesson_desc }}</p>
      <div class="content_cover">
        <img :src="getImageUrl" alt="器械图片" />
      </div>
      <div class="content_progress" :style="getBackcolor"></div>
      <div class="content_tips">
        请您前往 {{tranfserData.area_name+tranfserData.area_no}} “<span :style="getcolor"> {{ tranfserData.name }} </span>”开启健身课程
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
      downnum: 10,  // 此字段由30秒倒计时修改为10秒倒计时
      timer: null,
    }
  },
  watch: { 
    tranfserData() {
      console.log("监听这个数据tranfserData:",this.tranfserData);
      console.log("projecttype:", this.projecttype);
      this.downChang();
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
    getcolor () {
      return `color:rgb(${this.tranfserData.color})`
    },
    getBackcolor () {
      return `background-color:rgb(${this.tranfserData.color})`
    },
    getImageUrl() {
      var val = this.tranfserData.client_type;
      return `${this.publicPath}common/images/equipment/${val}.png`
    }
  },
  created () { 
    console.log("created:",this.tranfserData);
  },
  mounted () {
    console.log("mounted:",this.tranfserData);
    this.downChang(); // 第一次调用
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
      clearInterval(this.timer)
      this.timer = null
    },
    // 立即前往方法
    goNow(){
      this.receipt('goNow');
      clearInterval(this.timer)
      this.timer = null
    },
    downChang () {
      clearInterval(this.timer)
      this.downnum = 10
      this.timer = setInterval(() => {
        if (this.downnum == 0) {
          clearInterval(this.timer)
          // this.$router.push('/')
          this.goNow();
        } else {
          this.downnum -= 1
        }
      }, 1000)
    },
    getIconUrl(name){
      return `${this.publicPath}common/images/equipment/icon/${name}.png`
    }
  },
}
</script>
