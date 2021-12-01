import api from "../../api/api";
const state = {
  ouid: '', //设备id
  Qrcode: '',
  PAGEID: process.env.VUE_APP_PAGE_ID,
  voicestate: true,
  userMakeState: false,  //预约
  StandbyState: false,  //屏保
  recommendState: false,  //是否有转移设备
  recommendid: '',        //推荐课程
  recommendMsg: {},
  sport_start_time: 0, //课程开始时间
  sport_end_time: 0, //课程结束时间
  projecttype: process.env.VUE_APP_PAGE_ID == 0 ? "坐姿腹肌训练器" : process.env.VUE_APP_PAGE_ID == 1 ? "体测仪" : "跑步机",
  publicPath: process.env.NODE_ENV == "development" ? '/' : './',
  MakeCareTitle: '',  //预约课程名称
  MakeCareDesc: ''    //预约课程简介
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
      state.sport_start_time = data.time
    } else if (data.type == 'end') {
      state.sport_end_time = data.time
    }
  },
  //用户转移
  set_userMakeState (state, boolean) {
    state.userMakeState = boolean
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

  }
}

const actions = {
  //设备登录初始化
  async clientStatus ({ state, commit, rootState }) {
    if (!state.initialization) {
      state.initialization = true
      const rs = await api.post('/client-status', {
        ouid: state.ouid,
        status: 'Y',
        type: state.projecttype
      })
      console.log("设备初始化", rs)
    } else {
      console.log('已经初始化')
    }
  },
  //设备开始上课状态变更
  async clientstart ({ state, rootState }, lesson_id) {
    const user_id = rootState.user.userinfo.user_id
    const ouid = state.ouid
    const rs = await api.post('/client-start', {
      ouid,
      lesson_id,
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