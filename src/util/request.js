import { getAccessToken } from "@/util/auth";
import axios from "axios";


// import { notification } from "ant-design-vue";

//创建 axios 实例
const request = axios.create({
  //API 请求的默认前缀
  baseURL: process.env.Vue_APP_API_BASE_URL,
  timeout: 10000 //请求超时，10s
})

// 异常拦截处理器
const errorHandler = errorRep => {
  if (errorRep.response) {
    const {
      data: { error },
      status
    } = errorRep.response


    //从 cookie 获取token
    token = getAccessToken()

    //身份验证失败
    if (status == 401) {
      notification.error({
        message: '身份验证',
        description: "登陆过期，需要重新验证身份"
      })

      //如果登陆了，则退出登录
      if (token) {

      }

      if (status === 403) {
        notification.error({
          message: "拒绝访问",
          description: error.message
        });
      } else {
        notification.error({
          message: "错误消息",
          description: error.message
        });
      }
    }
    return Promise.reject(error)
  }
  return Promise.reject(errorRep);
}

//请求前拦截
request.interceptors.request.use(config => {
  const token = getAccessToken()
  //如果token存在
  if (token) {
    config.headers["authorization"] = `Bearer${token}`
  }
  return config
}, errorHandler)

//请求后拦截
request.interceptors.response.use(response => {
  return response.data
}, errorHandler)

export default request;