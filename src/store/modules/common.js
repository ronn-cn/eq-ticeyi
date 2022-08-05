import api from "../../api/api";
import project from "@/config/project"
import router from '../../router';
// console.log(powerInfo, 111)
const state = {
  ouid: '', //设备id
  Qrcode: '',
  PAGEID: process.env.VUE_APP_PAGE_ID,
  initialization: false,  //设备初始化
  voicestate: true,
  userMakeState: false,  //预约
  StandbyState: false,  //屏保
  recommendState: false,  //是否有转移设备
  recommendid: {},        //推荐课程
  sport_start_time: 0, //课程开始时间
  sport_end_time: 0, //课程结束时间
  projecttype: project.projecttype,   //设备类型
  powerHieght: project.powerHieght,    //力量器械最大高度
  publicPath: process.env.NODE_ENV == "development" ? '/' : './',   //打包目录
  evenfPublic: process.env.NODE_ENV == "development" ? '/' : '../', //资源目录
  MakeCareTitle: powerInfo.name || '',  //预约课程名称
  MakeCareDesc: powerInfo.desc || '',    //预约课程简介
  MakelampColor:'255,165,0',   //预约灯的颜色
  MakeClientName: '',    //预约设备名称
  client_id: '',       //推荐
  lesson_id: project.lesson_id, //课程id
  Audio_effects: null
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
    state.MakelampColor = data.color
    state.MakeClientName = data.client_name
  },
  set_recommendid (state, data) {
    if (Object.keys(data).length == 0) {
      state.recommendid = {}
      state.recommendState = false
    } else {
      state.recommendid = {
        data: data.md5,
        msg: data.transfer
      }
      state.recommendState = true
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
      client_ouid: ouid,
      lesson_id: data.lesson_id,
      lesson_name: data.lesson_name,
      user_id: user_id || 0,
      transfer_client_id: ''  //用户转移设备id
    })
    console.log('开始上课状态变更', rs)
  },
  //设备结束下课状态变更
  async clientEnd ({ state, rootState }) {
    // const user_id = rootState.user.userinfo.user_id
    const ouid = state.ouid
    const rs = await api.post('/client-end', {
      client_ouid: ouid,
      // user_id: user_id || ''
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
  //用户转移
  set_userMakeState ({ state, commit, dispatch }, boolean) {
    state.userMakeState = boolean
    if (state.StandbyState) {
      state.StandbyState = false
      // dispatch('send_askLedState', { r: 0, g: 0, b: 0 })
    }
  },
  //用户转移退出 || 退出
  set_resLogoutUser ({ commit, dispatch }, data) {
    console.log('用户转移退出', data)
    dispatch('logout')
    console.log('router:',router)
    console.log('this.$route:', this.$route)
    if (router.history.current.path != '/' && router.history.current.path != '/bodytester') {
      router.push({ path: '/' })
    }
  },
  //点击音频
  click_effects ({ state, dispatch }) {
    if (!state.Audio_effects) {
      state.Audio_effects = new Audio()
      state.Audio_effects.src = `${state.publicPath}powerStatic/audio/首页/click.mp3`
    }
    state.Audio_effects.play()
  },
}

export default {
  state,
  mutations,
  actions
}