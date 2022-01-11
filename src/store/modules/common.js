import api from "../../api/api";
import project from "@/config/project"
// console.log(project)
const state = {
  ouid: '', //设备id
  Qrcode: '',
  PAGEID: process.env.VUE_APP_PAGE_ID,
  initialization: false,  //设备初始化
  voicestate: true,
  userMakeState: false,  //预约
  StandbyState: false,  //屏保
  recommendState: false,  //是否有转移设备
  recommendid: '',        //推荐课程
  recommendMsg: {},
  sport_start_time: 0, //课程开始时间
  sport_end_time: 0, //课程结束时间
  projecttype: project.projecttype,
  publicPath: process.env.NODE_ENV == "development" ? '/' : './',
  MakeCareTitle: project.MakeCareTitle,  //预约课程名称
  MakeCareDesc: project.MakeCareDesc,    //预约课程简介
  client_id: '',       //推荐课程id
  lesson_id: project.lesson_id, //课程id
}

const mutations = {
  //登陆二维码
  set_qrcodeId (state, data) {
    let i = data.indexOf('ouid=')
    let ouid = data.substr(i + 5)
    state.ouid = ouid
    state.Qrcode = data
  },
  //设置开始时间 结束时间
  set_couserTimer (state, data) {
    if (data.type == 'start') {
      state.sport_start_time = Number(Date.parse(new Date()).toString().substr(0, 10))
    } else if (data.type == 'end') {
      state.sport_end_time = Number(Date.parse(new Date()).toString().substr(0, 10))
    }
  },
  //用户转移
  set_userMakeState (state, boolean) {
    state.userMakeState = boolean
    if (state.StandbyState) {
      state.StandbyState = false
    }
  },
  //设置课程id
  set_lesson_id (state, data) {
    state.lesson_id = data
  },
  //设置屏保
  set_StandbyState (state, boolean) {
    state.StandbyState = boolean
  },
  set_MakeCareInfo (state, data) {
    state.MakeCareTitle = data.name
    state.MakeCareDesc = data.desc
  },
  set_recommendid (state, data) {
    if (data) {
      state.recommendid = data.md5
      state.recommendMsg = data.transfer
      state.recommendState = true
    } else {
      state.recommendid = ''
      state.recommendMsg = {}
      state.recommendState = false
    }

  },
  set_client_id (state, data) {
    state.client_id = data
  }
}

const actions = {
  //设备登录初始化
  async clientStatus ({ state, commit, dispatch }) {
    if (!state.initialization) {
      const rs = await api.post('/client-status', {
        ouid: state.ouid,
        status: 'Y',
        type: state.projecttype
      })
      state.initialization = true
      console.log("设备初始化", rs)
    } else {
      console.log('已经初始化')
    }
  },
  //设备开始上课状态变更
  async clientstart ({ state, rootState }, data) {
    const user_id = rootState.user.userinfo.user_id
    const ouid = state.ouid
    const rs = await api.post('/client-start', {
      ouid,
      lesson_id: data.lesson_id,
      lesson_name: data.lesson_name,
      user_id: user_id || ''
    })
    console.log('开始上课状态变更', rs)
  },
  //设备结束下课状态变更
  async clientEnd ({ state, rootState }) {
    const user_id = rootState.user.userinfo.user_id
    const ouid = state.ouid
    const rs = await api.post('/client-end', {
      ouid,
      user_id: user_id || ''
    })
    console.log('结束下课状态变更', rs)
  },
  //结束上传数据
  async addSportDetail ({ state, rootState }, data) {
    const rs = await api.post('/add-sport-detail', data)
    console.log('结束上传数据', rs)
  },
  //设置灯的颜色
  send_askLedState ({ commit }, data) {
    // console.log(r, g, b)
    var sendData = {
      cmd: 'askLedState',
      data: {
        r: data.r,
        g: data.g,
        b: data.b,
      },
    }
    commit('SEND_SOCKET', JSON.stringify(sendData))
  },
}

export default {
  state,
  mutations,
  actions
}