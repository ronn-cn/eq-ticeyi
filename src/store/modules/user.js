import api from "../../api/api";

const state = {
  userinfo: {},
  loginState: false,
  resLogoutUser: 0,
  user_rm: 0,
  user_rmvalue: {
    state: false,
    value: 24
  },
  user_data: {
    data: { vitality: 0, sport_power: 0 },
    total: { star_count: 0 }
  }
};

const mutations = {
  setLoginStatus (state, data) {
    state.loginState = true
    state.userinfo = JSON.parse(data)
  }
};

const actions = {
  //用户登陆接口
  async clientlogin ({ state, rootState }) {
    // console.log('用户登录接口', state.userinfo)
    const rs = await api.post('/client-login', {
      ouid: rootState.common.ouid,
      user_id: state.userinfo.user_id,
      transfer_client_id: state.userinfo.transfer_client_id || 'bug'
    })
    console.log('用户登陆', rs)

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
      ouid: rootState.common.ouid
    })
    console.log('用户退出', rs)

    if (process.env.VUE_APP_PAGE_ID == 0) {
      state.user_rmvalue.state = false
      state.user_rmvalue.value = 0
    }

  },
  async all_user ({ state, commit, dispatch }) {
    const rs = await api.get('/get-user-all', {
      user_id: state.userinfo.user_id
    })
    console.log('用户信息', rs.data.data)
    state.user_data = rs.data.data
    if (process.env.VUE_APP_PAGE_ID == 0) {
      let userrm = JSON.parse(rs.data.data.data.user_rm)
      if (userrm[0].value != 0) {
        state.user_rmvalue.state = true
        state.user_rmvalue.value = userrm[0].value
      } else {
        state.user_rmvalue.state = false
        state.user_rmvalue.value = 0
      }
    } else if (process.env.VUE_APP_PAGE_ID == 1) {
      let user = rs.data.data.user
      commit('set_user_age', user.age)
      commit('set_user_sex', user.sex)
    }

    // state.user_rm = userrm[0].value || 0
    // console.log(JSON.parse(rs.data.data.data.user_rm))
  },
}

export default {
  state,
  mutations,
  actions
}