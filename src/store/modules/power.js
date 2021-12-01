
const state = {
  actionValue: {},
  coursegroup: {},
  total_group: 0,  //总总数
  totalweight: 0, //总负重
  averagenum: 0,  //总次数
  averagescore: 0,  //平均分  平均负重
  combinedscore: 0,  //综合分
  weight_max: 0,       //最大负重
  weight_rm: 0,        //极限rm
  powerDetail: []
}

const mutations = {
  add_detail (state, payload) {
    // console.log(payload)
    let info = payload.info
    let timeMeter = Math.round(payload.timeMeter)
    // info.timeMeter = timeMeter
    state.powerDetail.push({
      ...info,
      time: timeMeter
    })
    console.log(state.powerDetail)
  },
  add_total_group (state) {
    state.total_group += 1
  },
  //设置极限rm
  set_weight_rm (state, data) {
    state.weight_rm = data
  },
  set_totalweight (state, data) {
    // Count: 1 Duration: 1826 Height: 42 Percent: 0.5599135044420577 Weight: 6
    if (data) {
      state.totalweight += data.Weight
      state.averagenum += 1
      state.averagescore = Math.ceil((state.totalweight / state.averagenum))
      state.combinedscore = Math.ceil(Math.ceil(data.Percent * 100) / state.averagenum)
      if (data.Weight > state.weight_max) {
        state.weight_max = data.Weight
      }

      // console.log(state.totalweight, state.averagenum, state.averagescore, state.combinedscore)
    }
  },
  //动作数据
  set_resHeightWeight (state, data) {
    state.actionValue = data
  },
  //课程组
  set_resGenerateLesson (state, data) {
    state.coursegroup = data
  },
}

const actions = {
  websocket_power ({ dispatch, commit }, data) {
    switch (data.cmd) {
      case "resHeightWeight":   //下压数据
        commit('set_resHeightWeight', data.data)
        break;
      case "resGenerateLesson": //课程开始
        commit('set_resGenerateLesson', data.data)
        break;
    }
  },
  //结束上传数据
  svseEndData ({ state, getters, dispatch }, data) {
    let sport_detail = {
      group: state.total_group,   //总组数
      times: state.averagenum,   //总次数
      weight_total: state.totalweight,//总负重
      weight_avg: state.averagescore,//平均负重
      weight_max: state.weight_max,//最大负重
      weight_rm: state.weight_rm,  //极限RM
      detail: state.powerDetail     //详细信息
    }
    const masg = {
      device_ouid: getters.ouid, //设备id
      device_type: '坐姿腹肌训练器', //设备类型
      user_ouid: getters.userInfo.user_id || '',   //用户id
      lesson_id: '445dab66e033da6f0000000000000003',   //课程id
      lesson_type: '力量塑形', //课程类型
      lesson_name: '力量器械-坐姿腹肌训练器', //课程名称,同上
      sport_start_time: getters.sport_start_time,  //运动开始时间
      sport_end_time: getters.sport_end_time,     //运动结束时间
      sport_detail: JSON.stringify(sport_detail)
    }
    console.log(masg)

    dispatch('addSportDetail', masg)
  },
}

export default {
  state,
  mutations,
  actions
}