<style scoped lang="scss">
.iframe_conver {
  position: fixed;
  top: 20%;
  left: 30%;
  width: 400px;
  height: 5rem;
  background-color: aqua;
}
.cover_container {
  width: 100%;
  height: 4.5rem;
}
</style>

<template>
  <div class="iframe_conver">
    <div class="cover_container">
      <iframe
        :src="`${publicPath}powerStatic/mo1.html`"
        id="mo1"
        style="width: 100%; height: 100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(['publicPath']),
  },
  methods: {},
}
</script>
