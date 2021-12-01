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
  },
  {
    path: "/restpage",
    name: "RestPage",
    component: _import('powers/page/RestPage'),
    // component: () => import(/* webpackChunkName: "about" */ "../views/RestPage.vue"),
  },
  {
    path: "/endpage",
    name: "EndPage",
    component: _import('powers/page/EndPage'),
    // component: () => import(/* webpackChunkName: "about" */ "../views/EndPage.vue"),
  },
  {
    path: "/limittest",
    name: "LimitTest",
    component: _import('powers/page/LimitTest'),
    // component: () => import(/* webpackChunkName: "about" */ "../views/LimitTest.vue"),
    meta: { title: '极限组测试' }
  }
]

