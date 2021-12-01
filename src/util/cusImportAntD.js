// cusImportAntD.js，按需引入antD
// import "@/util/cusImportAntd";
import { Button, Input } from "ant-design-vue";
import Vue from "vue";
const antd = [Button, Input];
antd.forEach(component => {
  Vue.use(component);
});



