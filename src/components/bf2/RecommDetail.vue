<template>
  <div style="width:100%;height:100%">
    <div style="position:relative;width:100%;height:100%;display:flex">
      <section class="img_left"
               @click="disappear">
        <img src="../assets/images/fh.png"
             alt="">
      </section>
      <div class="lessons_name">
        {{plans[0].name}}
      </div>
      <p class="instroduce">
        <span>L{{plans[0].factor}} | </span>
        <span> {{parseInt(plans[0].time / 60)}} 分钟| </span>
        <span> {{parseInt(plans[0].energy)}} kWatts </span>
      </p>
      <div class="desc">{{plans[0].desc}}</div>
      <div class="lesson_type">
        <img src="../assets/images/jianshenjing.png"
             alt="">
      </div>
      <div class="progress">
        <el-progress :percentage="nums"
                     :color="color"
                     :show-text="false"></el-progress>
      </div>
      <p class="area">暂无空闲设备</p>
      <!-- <p v-if="recommInfos.client_name == '健身指导镜'" class="area">你当前已在“ <span class="equirement"> Y01号健身镜 </span> ”处，可立即开启健身课程</p> -->
      <div class="start">
        <div style="margin-right:10px">
          <img src="../assets/images/treadmill/Vector.png"
               alt="">
        </div>
        <p @click="move">开启训练</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import api from '@/api/api'
export default {
  props: ["plans"],
  data () {
    return {
      //课程名称
      lessonname: "",
      //进度条数值变量
      nums: 0,
      //进度条颜色
      color: "#F28576",
      //进度条定时器
      timer: null,
    }
  },
  created () {
  },
  watch: {
    plans: {
      deep: true,
      handler (newV) {
        this.plans = newV
      }
    }
  },
  mounted () {
    //进度条
    console.log("我是plans", this.plans)
    this.timer = setInterval(() => {
      this.nums++
      if (this.nums >= 100) {
        clearInterval(this.timer)
        this.move()
      }
    }, 600)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  computed: {
    ...mapGetters(['ouid', "userid"]),
  },
  methods: {
    //用户转移接口
    async transferUser () {
      const rs = await api.post("/transfer-user", {
        client_id: this.ouid,
        lesson_id: this.recommInfos.id,
        user_id: this.userid
      })
      console.log("我转移了吗", rs)
      if (rs.data.message == "暂时没有设备空闲") {
        this.haveclient = false;
      } else {
        this.haveclient = true;
      }
    },
    disappear () {
      this.$emit("disappear")
    },
    move () {
      this.$router.push(
        {
          path: "/",
          query: {
            sayBye: 123,
          }
        }
      )
    }
  }
}
</script>
<style scoped lang="scss">
.img_left {
  position: absolute;
  width: 168px;
  height: 151px;
  top: 0px;
  right: 30px;
  z-index: 10;
}
.lessons_name {
  overflow: auto;
  width: 334px;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 20px;
  margin-top: 80px;
  margin-left: 151px;
  color: #000000;
  line-height: 60px;
  text-align: center;
  position: absolute;
  top: 60px;
  white-space: nowrap;
}
.lesson_type {
  width: 362px;
  height: 362px;
  position: absolute;
  top: 300px;
  left: 137px;
  img {
    width: 100%;
    height: 100%;
  }
}
.desc {
  display: block;
  width: 598px;
  color: #7f7f7f;
  position: absolute;
  top: 270px;
  left: 19px;
  text-align: center;
  font-size: 18px;
  overflow: auto;
  white-space: nowrap;
}
.instroduce {
  color: #7f7f7f;
  font-size: 18px;
  margin-top: 20px;
  position: absolute;
  top: 210px;
  left: 220px;
}
.progress {
  width: 293px;
  height: 50px;
  position: absolute;
  top: 680px;
  left: 180px;
}
.area {
  width: 100%;
  height: 22px;
  text-align: center;
  line-height: 22px;
  font-size: 20px;
  color: #000000;
  position: absolute;
  top: 720px;
}
.equirement {
  color: #f28576;
}
.start {
  width: 355px;
  height: 69px;
  background: #28cd41;
  border-radius: 60px;
  position: absolute;
  top: 823px;
  left: 147px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::-webkit-scrollbar {
  display: none;
}
</style>
