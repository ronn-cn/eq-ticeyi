const state = {
  TreadmillData: {},
  detailList: [],
  resSetSpeed: 0,
  resSetIncline: 0,
  resEmergencyStop: null,
  resSetStart: '',
  resSetStop: ''
  // speed_max: 0,//最大速度
  // incline_max: 0,//最大坡度
  // heart_rate_max: 0//最大心率
};

const mutations = {
  set_TreadmillData (state, data) {
    state.TreadmillData = data
  },
  //设置上传详细信息
  set_detailList (state, data) {
    state.detailList.push(data)
    // console.log(state.detailList)
  },
  //速度
  set_resSetSpeed (state, data) {
    state.resSetSpeed = data
  },
  //坡度
  set_resSetIncline (state, data) {
    state.resSetIncline = data
  },
  //开始
  set_resSetStart (state, data) {
    state.resSetStart = data + new Date().getTime()
  },
  //结束
  set_resSetStop (state, data) {
    state.resSetStop = data + new Date().getTime()
  },
  //紧急停止
  set_resEmergencyStop (state, data) {
    state.resEmergencyStop = data
  }
};

const actions = {

  websocket_treadmill ({ dispatch, commit }, data) {
    switch (data.cmd) {
      case "resTreadmillData": //实时数据
        commit('set_TreadmillData', data.data)
        break;
      case "resSetSpeed":     //速度改变
        commit('set_resSetSpeed', data.data)
        break;
      case "resSetIncline":   //坡度改变
        commit('set_resSetIncline', data.data)
        break;
      case "resSetStart":   //课程开始
        commit('set_resSetStart', data.data)
        break;
      case "resSetStop":  //运动结束
        commit('set_resSetStop', data.data)
        break;
      case "resEmergencyStop":  //紧急停止
        commit('set_resEmergencyStop', data.data)
        break;
    }
  },
  addTreadmillEnd ({ state, getters, dispatch }, data) {
    let info = data
    info.detail = state.detailList;
    const msg = {
      device_ouid: getters.ouid,
      device_type: '跑步机',
      user_ouid: getters.userInfo.user_id || '',
      lesson_id: '445dab66e033da6f0000000000000006',   //课程id
      lesson_name: '跑步机自由跑', //课程名称,同上
      lesson_type: '有氧训练',
      sport_calorie: info.calorie,
      sport_score: 0, //运动得分
      sport_grade: 0, //运动评分
      sport_start_time: getters.sport_start_time,  //运动开始时间
      sport_end_time: getters.sport_end_time,     //运动结束时间
      sport_detail: JSON.stringify(info)
    }
    // console.log(msg)
    dispatch('addSportDetail', msg)
  }
}

export default {
  state,
  mutations,
  actions
}