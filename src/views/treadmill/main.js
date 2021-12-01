// 引入echarts
import echarts from 'echarts';
// import { createApp } from 'vue'
import Vue from "vue";
import App from './App.vue'
import router from '../../router'
import store from '../../store'
import moment from "moment";
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// import './plugins/element.js'
// import installElementPlus from '@/plugins/element'

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");