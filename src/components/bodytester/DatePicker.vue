<style lang="scss" scoped>
.pickder {
  width: 70%;
  margin: auto;
}
::v-deep .vue-picker {
  background-color: transparent !important;
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
      :defaultIndex="user_age"
      @change="pickerchang"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VuePicker from '../../../node_modules/vue-pickers/src/picker.vue'
// import VuePicker from 'vue-pickers'
var tdata = []
for (let i = 0; i < 100; i++) {
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
  computed: {
    ...mapGetters(['user_age']),
  },
  methods: {
    pickerchang(e) {
      this.$store.commit('set_user_age', e[0].value)
    },
  },
}
</script>
