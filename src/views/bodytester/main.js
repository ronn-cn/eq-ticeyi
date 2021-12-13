// 引入echarts
import echarts from 'echarts';
import moment from 'moment';
import Vue from "vue";
import Body from "./Body.vue";
import router from "../../router";
import store from "../../store";
import axios from 'axios';
// import "./util/cusImportAntD";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;



Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment;


console.log(process.env);

new Vue({
  router,
  store,
  render: (h) => h(Body),
}).$mount("#app");
