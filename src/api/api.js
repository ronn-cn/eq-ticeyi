import axios from 'axios'
import stroe from '../store/index'
import config from "../config"
export default {
  //通用get请求
  async get (url, params) {
    var timestamp = Date.parse(new Date())
    let src;
    if (config.teststatus) {
      src = config.api_url
    } else {
      src = stroe.state.websocket.httpUrl.ServiceAddress
    }
    const rs = await axios({
      url: src + url + '?t=' + timestamp,
      method: 'get',
      params
    })
    return rs
  },
  async post (url, data) {
    var timestamp = Date.parse(new Date())
    let src;
    if (config.teststatus) {
      src = config.api_url
    } else {
      src = stroe.state.websocket.httpUrl.ServiceAddress
    }
    const rs = await axios({
      url: src + url + '?t=' + timestamp,
      method: 'post',
      data
    })
    return rs
  }

}