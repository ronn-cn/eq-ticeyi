import api from "../../api/api";

const state = {
  userinfo: {},
  loginState: false,
  resLogoutUser: 0,
  user_rmvalue: {
    state: false,
    value: 24
  },
  user_data: {
    data: { vitality: 0, sport_power: 0 },
    total: { star_count: 0 }
  },
  user_side_log: []
};

const mutations = {
  setLoginStatus (state, data) {
    state.loginState = true
    state.userinfo = JSON.parse(data)
  }
};

const actions = {
  //用户登陆接口
  async clientlogin ({ state, rootState, dispatch}) {
    // console.log('用户登录接口', state.userinfo)
    const rs = await api.post('/client-login', {
      client_ouid: rootState.common.ouid,
      user_id: state.userinfo.user_id || 0,
      user_ouid: state.userinfo.user_ouid,
      transfer_client_id: state.userinfo.transfer_client_id || 'bug'
    })
    // console.log('调用用户登录接口后，返回数据', rs)
    // console.log("user_id:", rs.data.data.user_id)
    state.userinfo.user_id = rs.data.data.user_id
    
    window.localStorage.setItem('userInfo', JSON.stringify(state.userinfo));
    // console.log('client-login  user_id:', state.userinfo.user_id)
    dispatch('all_user')
    dispatch('get_user_side_log', state)
  },
  // 退出登录
  logout ({ state, commit, dispatch, getters }) {
    dispatch('send_askLedState', { r: 0, g: 0, b: 0 })
    if (state.loginState) {
      state.userinfo = {}
      state.loginState = false
      window.localStorage.removeItem('userInfo')
      dispatch('clientExit')
    }
    if (getters.userMakeState) {
      dispatch('set_userMakeState', false)
    }
  },
  //用户退出接口
  async clientExit ({ rootState }) {
    const rs = await api.post('/client-exit', {
      client_ouid: rootState.common.ouid
    })
    console.log('用户退出', rs)

    if (process.env.VUE_APP_PAGE_ID == 0) {
      state.user_rmvalue.state = false
      state.user_rmvalue.value = 0
    }

  },
  async all_user ({ state, commit, dispatch }) {
    console.log('get-user-all  user_id:', state.userinfo.user_id)
    const rs = await api.post('/get-user-all', {
      user_id: state.userinfo.user_id
    })
    // console.log('用户信息', rs.data.data)
    state.user_data = rs.data.data
    if (process.env.VUE_APP_PAGE_ID == 0) {
      let userrm = JSON.parse(rs.data.data.data.user_rm)

      let title = powerInfo.type + "RM值"
      console.log(userrm, title)

      for (let item of userrm) {
        if (item.part == title) {
          if (item.value != 0) {
            state.user_rmvalue.state = true
            state.user_rmvalue.value = item.value
            return
          }
        }
      }
      state.user_rmvalue.state = false
      state.user_rmvalue.value = 0

    } else if (process.env.VUE_APP_PAGE_ID == 1) {
      let user = rs.data.data
      let myDate = new Date();
      let age = Math.ceil((myDate.getFullYear()*10000 - user.birthday)/10000)
      let sex = user.sex
      console.log("sex:",sex," age:",age)
      commit('set_user_age', age)
      commit('set_user_sex', sex)
    }
  },
  async get_user_side_log({state}){
    const rs = await api.post('/get-user-side-log', {
      user_id: state.userinfo.user_id
    })
    state.user_side_log = rs.data.data
    console.log("user_side_log:",state.user_side_log)
  }
}

export default {
  state,
  mutations,
  actions
}