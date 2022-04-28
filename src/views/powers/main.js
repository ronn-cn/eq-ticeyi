// 引入echarts
import echarts from 'echarts';
import moment from 'moment';
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import axios from 'axios';

import { Button } from 'vant';
import 'vant/lib/button/style'
Vue.use(Button);

// import Vant from 'vant';
// import 'vant/lib/index.css';


Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
