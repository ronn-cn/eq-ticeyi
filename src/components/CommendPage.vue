<style scoped lang="scss">
.page_main {
  display: flex;
  width: 1880px;
  padding: 20px;
  overflow: hidden;
}
</style>

<template>
  <div class="page_main">
    <RecommCourses />
  </div>
</template>

<script>
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
