<style scoped lang="scss">
.theme_run {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 242, 242);
  overflow-y: auto;
  &_rotation {
    width: 100%;
    height: 2.7rem;
    background-color: cadetblue;
  }
  &_item {
    padding: 0.15rem 0.05rem;
    h2 {
      color: #000;
      font-size: 0.2rem;
      text-align: left;
      padding: 0 0 0.1rem 0.12rem;
    }
    .curriculum {
      display: flex;
      justify-content: space-between;
      &_item {
        width: 3rem;
        height: 1.9rem;
        background-color: chartreuse;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        &_info {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          opacity: 0.8;
          .info_p1 {
            font-size: 0.22rem;
            margin-bottom: 0.22rem;
          }
          .info_p2 {
            font-size: 0.17rem;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="introduce_item">
    <div class="theme_run">
      <section class="theme_run_rotation">
        <el-carousel :autoplay="false">
          <el-carousel-item v-for="(item, index) in 3" :key="index">
            <div class="carousel_run">
              <h3>跑步机——耐力燃脂跑</h3>
              <p class="p1">
                课程以间歇与变速跑为基础编排,已科学的课程结构安排,让你在训练中达到最佳燃脂效果
              </p>
              <div class="carousel_level">
                <span>L3</span> | <span>30分钟</span> |
                <span>300千卡</span>
              </div>
              <div class="carousel_btn">Run</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
      <div class="theme_run_item">
        <h2>热课排行榜</h2>
        <div class="curriculum">
          <section
            v-for="item of latestList"
            :key="item.level"
            @click="courseDetails(item)"
            class="curriculum_item"
          >
            <img :src="publicPath + item.url" />
            <div class="curriculum_item_info">
              <p class="info_p1">{{ item.title }}</p>
              <p class="info_p2">
                <span>{{ item.level }}</span> |
                <span>{{ item.minute }}分钟</span> |
                <span>{{ item.calorie }}</span
                >千卡
              </p>
            </div>
          </section>
        </div>
      </div>
      <div class="theme_run_item">
        <h2>最新课程</h2>
        <div class="curriculum">
          <section
            v-for="item of popularList"
            :key="item.title"
            class="curriculum_item"
          >
            <img :src="publicPath + item.url" />
            <div class="curriculum_item_info">
              <p class="info_p1">{{ item.title }}</p>
              <p class="info_p2">
                <span>{{ item.level }}</span> |
                <span>{{ item.minute }}分钟</span> |
                <span>{{ item.calorie }}</span
                >千卡
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      latestList: [
        {
          title: '跑步机——耐力燃脂跑',
          level: 'L1',
          minute: 30,
          calorie: 300,
          desc: '使用法特莱克训练法通过跑步中不同速度的组合，增加跑步的趣味性，也在训练过程达到高效燃脂的效果',
          url: 'TreadmillStatic/images/latest_class0.png',
        },
        {
          title: '跑步机——耐力燃脂跑',
          level: 'L2',
          minute: 30,
          calorie: 300,
          desc: '使用法特莱克训练法通过跑步中不同速度的组合，增加跑步的趣味性，也在训练过程达到高效燃脂的效果',
          url: 'TreadmillStatic/images/latest_class1.png',
        },
        {
          title: '跑步机——耐力燃脂跑',
          level: 'L3',
          minute: 30,
          calorie: 300,
          desc: '使用法特莱克训练法通过跑步中不同速度的组合，增加跑步的趣味性，也在训练过程达到高效燃脂的效果',
          url: 'TreadmillStatic/images/latest_class2.png',
        },
      ],
      popularList: [
        {
          title: '跑步机——耐力燃脂跑1',
          level: 'L3',
          minute: 30,
          calorie: 300,
          url: 'TreadmillStatic/images/popular_class0.png',
        },
        {
          title: '跑步机——耐力燃脂跑2',
          level: 'L3',
          minute: 30,
          calorie: 300,
          url: 'TreadmillStatic/images/popular_class1.png',
        },
        {
          title: '跑步机——耐力燃脂跑3',
          level: 'L3',
          minute: 30,
          calorie: 300,
          url: 'TreadmillStatic/images/popular_class2.png',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['publicPath']),
  },
  created() {},
  mounted() {},
  methods: {
    courseDetails(data) {
      this.$emit('courseDetails', data)
    },
  },
}
</script>
