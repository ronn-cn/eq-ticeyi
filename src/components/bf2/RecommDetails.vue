<template>
  <div style="width:100%;height:100%">
    <div style="position:relative;width:100%;height:100%;display:flex">
      <section class="img_left"
               @click="disappear">
        <img src="../assets/images/fh.png"
             alt="">
      </section>
      <div class="lessons_name">
        {{lessonname}}
      </div>
      <p class="instroduce">
        <span v-if="flag">L{{recommInfos.factor}} | </span>
        <span v-else>L0| </span>
        <span v-if="flag"> {{parseInt(recommInfos.time / 60)}} 分钟| </span>
        <span v-else> 0分钟| </span>
        <span v-if="flag"> {{parseInt(recommInfos.energy)}} kWatts </span>
        <span v-else> 0kWatts </span>
      </p>
      <div class="desc">{{recommInfos.desc}}</div>
      <div class="lesson_type">
        <img v-if="recommInfos.client_name == '健身指导镜'"
             src="../assets/images/jianshenjing.png"
             alt="">
        <img v-else
             src="../assets/images/paobuji.png"
             alt="">
      </div>
      <div class="progress">
        <el-progress :percentage="nums"
                     :color="color"
                     :show-text="false"></el-progress>
      </div>
      <p v-if="recommInfos.client_name == '健身指导镜'"
         class="area">你当前已在“ <span class="equirement"> Y01号健身镜 </span> ”处，可立即开启健身课程</p>
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
  props: ["items"],
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
      //课程信息
      recommInfos: "",
      //是否有课
      flag: false,
      haveclient: false,
    }
  },
  created () {
  },
  mounted () {
    //获取推荐课程信息
    this.new_details()
    //进度条
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
    async new_details () {
      const rs = await api.post("/lesson-exclusive", {
        lesson_type: this.items.name
      })
      this.recommInfos = rs.data.data[0]
      console.log(this.recommInfos)
      console.log(this.recommInfos.client_name)
      if (this.recommInfos != null) {
        this.lessonname = this.recommInfos.name
        this.flag = true
      } else {
        this.lessonname = "暂无课程"
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
  width: 334px;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 20px;
  margin-top: 80px;
  margin-left: 151px;
  color: #000000;
  line-height: 60px;
  text-align: center;
  overflow: auto;
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
  top: 280px;
  left: 19px;
  text-align: center;
  font-size: 18px;
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
