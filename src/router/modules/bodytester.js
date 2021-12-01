const _import = require('../config/_import_' + process.env.NODE_ENV)
/**
 * 业务模块home
 */
export default [
  {
    path: "/bodytester",
    name: "体测仪首页",
    component: _import('bodytester/page/Home'),
  },
  {
    path: "/testingend",
    name: "TestingEnd",
    component: _import('bodytester/page/TestingEnd'),
  },
  {
    path: "/recommendPage",
    name: "RecommendPage",
    component: _import('bodytester/page/TestingEnd'),
  },
  {
    path: "/datadetection",
    name: "DataDetection",
    component: _import('bodytester/page/DataDetection'),
  },
]

