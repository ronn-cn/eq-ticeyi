import api from "../../api/api";

const state = {
  userinfo: {},
  loginState: false,
  resLogoutUser: 0
};

const mutations = {
  setLoginStatus (state, data) {
    state.loginState = true
    state.userinfo = JSON.parse(data)
  },
  //用户转移退出
  set_resLogoutUser (state) {
    state.resLogoutUser = new Date().getTime()
  }
};

const actions = {
  //用户登陆接口
  async clientlogin ({ state, rootState }) {
    const rs = await api.post('/client-login', {
      ouid: rootState.common.ouid,
      user_id: state.userinfo.user_id
    })
    console.log('用户登陆', rs)
  },
  // 退出登录
  logout ({ state, commit, dispatch, getters }) {
    if (state.loginState) {
      state.userinfo = {}
      state.loginState = false
      window.localStorage.removeItem('userInfo')
      dispatch('clientExit')
    }
    if (getters.userMakeState) {
      commit('set_userMakeState', false)
    }

  },
  //用户退出接口
  async clientExit ({ rootState }) {
    const rs = await api.post('/client-exit', {
      ouid: rootState.common.ouid
    })
    console.log('用户退出', rs)
  },
}

export default {
  state,
  mutations,
  actions
}