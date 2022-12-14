const _import = require('../config/_import_' + process.env.NODE_ENV)
/**
 * 业务模块home
 */
export default [
  // 首页
  {
    path: '/powerhome',
    name: '首页',
    component: _import('powers/page/Home'),
    meta: {
      keepAlive: false,
      requiresAuth: true // 要求验证的页面,在此情况下其子页面也会被验证.
    },
  },
  {
    path: "/trainpage",
    name: "TrainPage",
    component: _import('powers/page/TrainPage'),
    meta: {
      title: '训练页'
    },
  },
  {
    path: "/freeplan",
    name: "FreePlan",
    component: _import('powers/page/FreePlan'),
    meta: {
      title: '自由训练'
    },
  },
  {
    path: "/strengthtest",
    name: "StrengthTest",
    component: _import('powers/page/StrengthTest'),
    meta: {
      title: '力量测试'
    },
  },
  {
    path: "/restpage",
    name: "RestPage",
    component: _import('powers/page/RestPage'),
    meta: {
      title: '休息页'
    },
    // component: () => import(/* webpackChunkName: "about" */ "../views/RestPage.vue"),
  },
  {
    path: "/endpage",
    name: "EndPage",
    component: _import('powers/page/EndPage'),
    meta: {
      title: '结束页'
    },
    // component: () => import(/* webpackChunkName: "about" */ "../views/EndPage.vue"),
  }
]

