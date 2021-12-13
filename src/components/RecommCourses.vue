<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(242, 242, 242);
}
.main_mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: #79797981;
}
header {
  height: 1.8rem;
  // background-color: royalblue;
  background: url(../../public/common/images/v.jpg) no-repeat;
  background-size: cover;
}
.courses_containr {
  h4 {
    color: #7f7f7f;
    font-size: 0.18rem;
    padding: 0.25rem 0;
  }
  .courses_item {
    ul {
      height: 4rem;
      overflow-y: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 2.8rem;
        height: 1.8rem;
        margin-bottom: 0.25rem;
        position: relative;
        // background: url(../assets/images/course/弹力带减脂塑形跟练_1920x660.jpg)
        //   no-repeat;
        // background-size: cover;
        // background-color: salmon;
        .item_text {
          padding-left: 10%;
          text-align: left;
          .p1 {
            width: 95%;
            overflow: hidden;
            white-space: nowrap;
            font-size: 0.2rem;
            padding: 0.4rem 0 0.2rem 0;
          }
          .p2 {
            font-size: 0.16rem;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 0.2rem;
            font-size: 0.14rem;
            padding-right: 0.12rem;
          }
        }
        .item_btn {
          width: 1rem;
          height: 0.3rem;
          color: #000;
          font-size: 0.16rem;
          background-color: #fff;
          border-radius: 0.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 0.14rem;
          bottom: 0.14rem;
        }
      }
    }
  }
}
footer {
  width: 100%;
  height: 0.8rem;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  color: #ee494e;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>

<template>
  <div class="main">
    <div class="main_mask" v-if="recommendState"></div>
    <header></header>
    <section class="courses_containr">
      <h4>通过以下推荐课程继续训练</h4>
      <div class="courses_item">
        <ul>
          <li
            v-for="item of courseList"
            :key="item.md5"
            class="courses_list_item"
            :style="{
              backgroundImage: `url(${item.image})`,
              backgroundPosition: 'right',
            }"
          >
            <div class="item_text">
              <p class="p1" :title="item.name">{{ item.name }}</p>
              <p class="p2" :title="item.desc">{{ item.desc }}</p>
            </div>
            <div class="item_btn" @click="details(item)">开始课程</div>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div v-if="!recommendState" @click="$router.push('/')">
        退出({{ timernum }}s)
      </div>
      <div v-if="recommendState" @click="lotrecommend">退出课程</div>
    </footer>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      timernum: 30,
      downtimer: null,
      courseList: [],
      showNotify: false,
    }
  },
  created() {
    if (process.env.NODE_ENV === 'production') {
      this.loadDown()
    }
    this.loadcourseList()
  },
  watch: {
    recommendState(val) {
      if (!val) {
        this.loadDown()
      } else {
        clearInterval(this.downtimer)
        this.timernum = 30
      }
    },
  },
  mounted() {},
  destroyed() {
    clearInterval(this.downtimer)
    this.$store.commit('set_recommendid', '')
  },
  computed: {
    ...mapGetters(['recommendState', 'userInfo', 'client_id']),
  },
  methods: {
    async details(info) {
      const user_id = this.userInfo.user_id
      const lesson_id = info.md5
      const client_type = info.equipmenttype
      const rs = await api.post('/transfer-user', {
        user_id,
        lesson_id,
        client_type,
      })
      console.log(rs)
      if (rs.data.data) {
        this.$store.commit('set_client_id', rs.data.data.client_id)
        if (process.env.VUE_APP_PAGE_ID == 0) {
          if (client_type.includes('坐姿腹肌训练器')) {
            this.$router.push('/trainpage')
          } else {
            this.$store.commit('set_recommendid', {
              md5: info.md5,
              transfer: rs.data.data,
            })
          }
        }
        if (process.env.VUE_APP_PAGE_ID == 1) {
          if (client_type.includes('体测仪')) {
            this.$router.push('/datadetection')
          } else {
            this.$store.commit('set_recommendid', {
              md5: info.md5,
              transfer: rs.data.data,
            })
          }
        }
        if (process.env.VUE_APP_PAGE_ID == 2) {
          if (client_type.includes('跑步机')) {
            this.$router.push({
              path: '/trainrun',
              query: { type: 2, status: 0 },
            })
          } else {
            this.$store.commit('set_recommendid', {
              md5: info.md5,
              transfer: rs.data.data,
            })
          }
        }
      } else {
        this.$notify({ type: 'warning', message: '暂无设备空闲' })
      }
    },
    //退出课程
    async lotrecommend() {
      this.$store.commit('set_recommendid', '')
      const rs = await api.post('/cancel-transfer', {
        client_id: this.client_id,
      })
      console.log(rs)
      // this.$router.push('/')
    },
    async loadcourseList() {
      const rs = await api.post('/guide-lesson', {
        user_id: this.userInfo.user_id,
      })

      if (rs.data.code == '200') {
        let data = rs.data.data.lessonIds
        const lessons = require('../../public/common/js/lessons.json')
        // console.log(lessons)
        for (let i in data) {
          lessons.forEach((item) => {
            // console.log(data[i])
            if (item.md5 == data[i]) {
              this.courseList.push({
                md5: item.md5,
                name: item.name,
                desc: item.desc,
                image: require(`../assets/images/course/${item.image}`),
                equipmenttype: item.equipmenttype,
              })
            }
          })
        }
      }
    },
    loadDown() {
      this.downtimer = setInterval(() => {
        let num = (this.timernum -= 1)
        if (num !== 0) {
          this.timernum = num
        } else {
          clearInterval(this.downtimer)
          this.$router.push('/')
        }
      }, 1000)
    },
  },
}
</script>
