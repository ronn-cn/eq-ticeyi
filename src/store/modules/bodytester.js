
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
  },
  impedance: 888,
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
        console.log("身高", data);
        if (!state.RUN_HEIGHT.state) {
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
  //测量体重
  set_resMeasureWeight (state, data) {
    if (state.RUN_HEIGHT.state) {
      if (state.LOCK_WEIGHT.state !== 6) {
        state.LOCK_WEIGHT.state = data.state;
        state.LOCK_WEIGHT.num += 1;
        if (data.state == 6) {
          state.LOCK_WEIGHT.weight = data.weight;
        } else {
          if (state.LOCK_WEIGHT.num == 20) {
            state.LOCK_WEIGHT.state = 6;
          } else {
            if (state.LOCK_WEIGHT.weight < data.weight) {
              state.LOCK_WEIGHT.weight = data.weight;
            }
          }
        }
      }
    }
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
}

const actions = {
  websocket_body ({ dispatch, commit }, data) {
    // console.log(data)
    switch (data.cmd) {
      case "resMeasureHeight": //测量身高
        commit("set_resMeasureHeight", data.data);
        break;
      case "resMeasureWeight": //测量体重
        commit("set_resMeasureWeight", data.data);
        break;
      case "resMeasureImpedance": //测量体脂
        if (data.data.impedance >= 100 && data.data.impedance <= 1000) {
          commit("set_resMeasureImpedance", data.data);
        } else {
          ws.send('{"cmd":"askMeasureImpedance"}');
        }
        break;
      case "resMeasureBodyData":
        commit("set_resMeasureBodyData", data.data);
        break;
    }
  }
}

export default {
  state,
  mutations,
  actions
}