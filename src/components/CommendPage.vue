<style scoped lang="scss">
.page_main {
  display: flex;
  width: 100%;
  height: 100%;
}
// .Recomm_left {
//   width: 30%;
//   position: relative;
//   // height: 100%;
//   // overflow-y: auto;
// }
// .Recomm_right {
//   width: 70%;
//   height: 100%;
// }
</style>

<template>
  <div class="page_main">
    <RecommCourses />
    <!-- <section class="Recomm_left">
      <RecommUser @userlogout="logout" />
    </section> -->
    <!-- <section class="Recomm_right">
      <RecommCourses />
    </section> -->
  </div>
</template>

<script>
// import RecommUser from '@/components/RecommUser.vue'
import RecommCourses from '@/components/RecommCourses'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    // RecommUser,
    RecommCourses,
  },
  computed: {
    ...mapGetters(['loginState']),
  },
  data() {
    return {}
  },
  watch: {
    loginState(val) {
      if (!val) {
        this.$emit('setpagestatus')
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
