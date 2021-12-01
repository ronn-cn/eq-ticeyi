const _import = require('../config/_import_' + process.env.NODE_ENV)
/**
 * 跑步机
 */
export default [
  {
    path: "/treadmillHome",
    name: "跑步机首页",
    component: _import('treadmill/page/Home'),
  },
  {
    path: '/trainrun',
    name: 'TrainRun',
    component: _import('treadmill/page/TrainRun'),
  },
  {
    path: '/courseend',
    name: 'CourseEnd',
    component: _import('treadmill/page/CourseEnd'),
  },
]

