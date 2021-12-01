<style scoped lang="scss">
.profiles_main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 9;
  &_page {
    color: #000;
    width: 3.47rem;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
  }
  .page_profiles1 {
    color: #fff;
    height: 2.33rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .img_mask {
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .page_title {
      position: absolute;
      bottom: 20px;
      left: 20px;
      &_p1 {
        font-size: 0.2rem;
      }
      &_p2 {
        font-size: 0.16rem;
        text-align: left;
        margin-top: 0.14rem;
      }
    }
  }
  .page_profiles2 {
    h3 {
      font-size: 26px;
      font-weight: 600;
      padding: 20px;
      text-align: left;
      // border-bottom: 1px solid #000000;
    }
    p {
      font-size: 22px;
      padding-left: 30px;
      line-height: 40px;
      text-align: left;
    }
  }
  .page_btn {
    button {
      width: 145px;
      height: 47px;
      background: linear-gradient(-90deg, #4668bf 0%, #7d89e2 100%);
      border-radius: 24px;
      font-size: 22px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #ffffff;
      border-color: transparent;
    }
  }
}
</style>

<template>
  <div class="profiles_main" @click="$emit('set_display')">
    <div class="profiles_main_page">
      <section class="page_profiles1">
        <!-- <img src="../assets/images/popular_class0.png" alt="" /> -->
        <div class="img_mask">
          <div class="page_title">
            <p class="page_title_p1">{{ detailsInfo.title || '' }}</p>
            <p class="page_title_p2">
              <span>{{ detailsInfo.level }}</span> |
              <span>{{ detailsInfo.minute }}分钟</span> |
              <span>{{ detailsInfo.calorie }}千卡</span>
            </p>
          </div>
        </div>
      </section>
      <section class="page_profiles2">
        <h3>课程介绍</h3>
        <p>
          {{ detailsInfo.desc }}
        </p>
      </section>
      <section class="page_profiles2">
        <h3>课程效果</h3>
      </section>
      <section class="page_profiles2">
        <h3>课程阶段</h3>
      </section>
      <div class="page_btn">
        <button @click="startrun">Run</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailsInfo: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    startrun() {
      this.$router.push('/trainrun')
    },
  },
}
</script>
