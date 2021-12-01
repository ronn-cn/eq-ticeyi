<style lang="scss" scoped>
.pickder {
  width: 70%;
  margin: auto;
}
</style>
<template>
  <div class="pickder">
    <VuePicker
      :data="pickData"
      :showToolbar="false"
      :maskClick="true"
      :rowNumber="4"
      :itemHeight="60"
      :defaultIndex="11"
      @change="pickerchang"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
import VuePicker from '../../../node_modules/vue-pickers/src/picker.vue'
// import VuePicker from 'vue-pickers'
var tdata = []
for (let i = 7; i < 100; i++) {
  tdata.push({
    label: `${i}岁`,
    value: i,
  })
}
export default {
  components: {
    VuePicker,
  },
  data() {
    return {
      pickerVisible: false,
      pickData: [tdata],
      result: '',
    }
  },
  mounted() {},
  methods: {
    pickerchang(e) {
      // console.log(e[0].value);
      this.$store.commit('set_user_age', e[0].value)
    },
  },
}
</script>
