const _import = require('./config/_import_' + process.env.NODE_ENV)

export default [
  // 默认页面
  {
    path: '/',
    redirect: process.env.VUE_APP_PAGE_ID == 0 ? "/powerhome" : process.env.VUE_APP_PAGE_ID == 1 ? "/bodytester" : "/treadmillHome"
  },
  // 无权限页面
  // {
  //   path: '/nopermission',
  //   name: '无权限页面',
  //   component: _import('NoPermission')
  // },
  // 404
  // {
  //   path: '*',
  //   name: '404',
  //   component: _import('404')
  // }
]

