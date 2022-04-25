// const index = require('../../assets/js/index')
import { config } from "@/config"
// console.log(config)
const state = {
  websocketUrl: config,
  socket: null,
  TouchTime: 0,
  httpUrl: {},
  resStartLesson: {},
  resLogoutUser: 0,
  downval: null
};

const mutations = {
  //设置http请求
  set_httpUrl (state, data) {
    state.httpUrl = data
  },
  //间隔时间
  set_resLastTouchTime (state, data) {
    let timestamp = new Date().getTime()
    let newdate = timestamp - data
    if (newdate >= 1000 * 60 * 5) {
      console.log('时间到了', newdate)
      state.TouchTime = newdate
    }
  },
  //课程预约
  set_resStartLesson (state, data) {
    state.resStartLesson = data
  },
  //发送
  SEND_SOCKET (state, cmd) {
    console.log(cmd)
    if (state.socket) {
      state.socket.send(cmd)
    }
  },
};

const actions = {
  init_socket ({ dispatch, commit, rootState }) {
    if (!state.downval) {
      state.downval = setInterval(() => {
        commit('SEND_SOCKET', `{mag:${new Date().getTime()}}`)
      }, 7000)
    }
    if (typeof WebSocket === 'undefined') {
      console.log('您的浏览器不支持socket')
    } else {
      if (state.socket) {
        console.log('websocket已连接')
      } else {
        // 实例化socket
        const ws = new WebSocket(state.websocketUrl)
        //建立连接
        ws.onopen = function () {
          console.log('socket连接成功')
          state.socket = ws;
          //ws.send('{"cmd":"askOwnerOuid"}');    //ouid
          //ws.send('{"cmd":"askLocalInfo"}');    //各种id
          ws.send('{"cmd":"askLoginQrcode"}');  //登陆二维码
          ws.send('{"cmd":"askServiceBusiness"}');  //请求地址
        };
        //接收服务端消息
        ws.onmessage = function (e) {
          let data = JSON.parse(e.data);

          // if (data.cmd !== "resHeightWeight") {
          //   if (data.cmd !== 'resMeasureHeight') {
          //     console.log(data)
          //   }
          // }
          const cmdList = ['resLoginQrcode', 'resLoginUser', 'resServiceBusiness', 'resLastTouchTime', 'resStartLesson', 'resLogoutUser']  //登陆二维码，登陆用户，主机http,间隔时间,课程预约
          const powerList = ['resHeightWeight', 'resGenerateLesson']  //下压数据,课程开始
          const bodytesterList = ['resMeasureHeight', 'resMeasureWeight', 'resMeasureImpedance', 'resMeasureBodyData', 'resWeightState']  //测量身高，测量体重，测量体脂，各类数据 返回上一次
          const treadmillList = ['resTreadmillData', 'resSetSpeed', 'resSetIncline', 'resEmergencyStop', 'resSetStart', 'resSetStop']  //实时记录 回馈速度 坡度改变 紧急停止 课程开始 运动结束

          if (cmdList.includes(data.cmd)) {
            dispatch('websocket_common', data)
          } else if (powerList.includes(data.cmd)) {
            dispatch('websocket_power', data)
          } else if (bodytesterList.includes(data.cmd)) {
            dispatch('websocket_body', data)
          } else if (treadmillList.includes(data.cmd)) {
            dispatch('websocket_treadmill', data)
          }

        };
        ws.onerror = function () {
          console.log('连接错误');
          dispatch('init_socket')
        }
        ws.close = function () {
          console.log('连接已断开');
        }
      }
    }
  },
  websocket_common ({ dispatch, commit }, data) {
    switch (data.cmd) {
      case "resLoginQrcode":  //获取登陆二维码
        commit('set_qrcodeId', data.data)
        break;
      case "resLoginUser":  //登陆信息
        window.localStorage.setItem('userInfo', JSON.stringify(data.data));
        const userinfo = window.localStorage.getItem('userInfo');
        // let user = JSON.parse(userinfo)
        // console.log(user)
        commit('setLoginStatus', userinfo)
        dispatch('clientlogin')
        break;
      case "resServiceBusiness":  //返回http地址
        if (data.data) {
          console.log('有http')
          clearInterval(window.businesstime)
          commit('set_httpUrl', data.data)
          dispatch('clientStatus')
        } else {
          console.log('没有有http')
          commit('set_httpUrl', {})
          window.businesstime = setInterval(() => {
            ws.send('{"cmd":"askServiceBusiness"}');
          }, 1000 * 3);
        }
        break;
      case "resLastTouchTime":   //屏幕间隔时间
        commit('set_resLastTouchTime', data.data)
        break;
      case "resStartLesson": //课程预约
        commit('set_resStartLesson', data.data)
        break;
      case "resLogoutUser": //用户转移退出
        dispatch('set_resLogoutUser', data)
        break;
    }
  }
}

export default {
  state,
  mutations,
  actions
}