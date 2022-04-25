// 引入echarts
import echarts from 'echarts';
import moment from 'moment';
import Vue from "vue";
import App from "./App.vue";
import router from "../../router";
import store from "../../store";
import axios from 'axios';
import 'vant/lib/button/style'
import { Button } from 'vant';
Vue.use(Button);


Vue.config.productionTip = false;



Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment;


// console.log(process.env);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
