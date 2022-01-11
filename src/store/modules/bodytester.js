
const state = {
  user_sex: 1,
  user_age: 18,
  screenstate: false,
  voicestate: true,
  RUN_HEIGHT: {
    num: 0,
    state: false,
    height: 0,
  },
  LOCK_WEIGHT: {
    state: 5,
    num: 0,
    weight: 0,
    status: false
  },
  impedance: 0,
  bodydata: {},
}

const mutations = {
  //设置性别
  set_user_sex (state, data) {
    state.user_sex = data;
  },
  //设置年龄
  set_user_age (state, data) {
    state.user_age = data;
  },
  //开始测试
  set_screenstate (state, boolean) {
    state.screenstate = boolean
  },
  //设置声音
  set_voicestate (state, boolean) {
    state.voicestate = boolean
  },
  //测量身高
  set_resMeasureHeight (state, data) {
    if (state.screenstate) {
      if (data !== 0) {
        if (!state.RUN_HEIGHT.state) {
          console.log("身高", data);
          if (data > state.RUN_HEIGHT.height) {
            state.RUN_HEIGHT.height = Math.ceil(data);
          }
          state.RUN_HEIGHT.num += 1;
          if (state.RUN_HEIGHT.num == 20) {
            state.RUN_HEIGHT.state = true;
          }
        }
      }
    }
  },
  //返回上一次重量体重
  set_resWeightState (state, data) {
    state.LOCK_WEIGHT.weight = data.weight
    state.LOCK_WEIGHT.status = true
  },
  //测量体脂
  set_resMeasureImpedance (state, data) {
    // if(data.impedance >=100 && data.impedance <=1000){
    //   store.state.user.impedance = data.impedance
    // }
    state.impedance = data.impedance;
  },
  //各类信息
  set_resMeasureBodyData (state, data) {
    state.bodydata = data;
  },
  //清空测试数据
  clear_bodydata (state, data) {
    state.RUN_HEIGHT = {
      num: 0,
      state: false,
      height: 0,
    }
    state.LOCK_WEIGHT = {
      state: 5,
      weight: 0,
      status: false
    }
    state.impedance = 0
  }
}

const actions = {
  websocket_body ({ dispatch, commit }, data) {
    switch (data.cmd) {
      case "resMeasureHeight": //测量身高
        commit("set_resMeasureHeight", data.data);
        break;
      case "resMeasureWeight": //测量体重
        console.log(data)
        dispatch("set_resMeasureWeight", data.data);
        break;
      case "resMeasureImpedance": //测量体脂
        // console.log(data)
        if (data.data.impedance >= 100 && data.data.impedance <= 1000) {
          commit("set_resMeasureImpedance", data.data);
        } else {
          commit('SEND_SOCKET', '{"cmd":"askMeasureImpedance"}')
        }
        break;
      case "resWeightState":    //返回上一次重量数据
        console.log('resWeightState', data)
        commit("set_resWeightState", data.data);
        break;
      case "resMeasureBodyData":
        commit("set_resMeasureBodyData", data.data);
        break;
    }
  },
  //测量体重
  set_resMeasureWeight ({ state, commit }, data) {
    // console.log(data)
    if (state.RUN_HEIGHT.state) {
      if (data.state == 6 || data.state == 7) {
        state.LOCK_WEIGHT.state = data.state;
        state.LOCK_WEIGHT.weight = data.weight;
        state.LOCK_WEIGHT.status = true
        // clearTimeout(state.weighttimer)
      }
    }
  },
}

export default {
  state,
  mutations,
  actions
}