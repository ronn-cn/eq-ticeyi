import api from "../../api/api";
const state = {
  actionValue: {},
  coursegroup: {},
  total_group: 0,  //总总数
  weight_max: 0,       //最大负重
  weight_rm: 0,        //极限rm
  powerDetail: [],
  moheight: 0,
  moloopval: 0,
  total_Percent: 0,
  powerEndData: {
    combinedscore: 0,  //综合分
    totalweight: 0, //总负重
    averagenum: 0,  //总次数
    averagescore: 0,  //平均负重
    amount: 0, //训练量
  },
  echartData: []
}

const mutations = {
  add_detail (state, payload) {
    let info = payload.info
    let timeMeter = Math.round(payload.timeMeter)
    state.powerDetail.push({
      ...info,
      time: timeMeter
    })
    console.log(state.powerDetail)
  },
  add_total_group (state) {
    state.total_group += 1
  },
  //设置模型高度
  set_moheight (state, val) {
    state.moheight = val
  },
  //
  set_moloop (state, val) {
    state.moloopval = val
  },
  //设置极限rm
  set_weight_rm (state, data) {
    state.weight_rm = data
  },
  set_totalweight (state, data) {
    // Count: 1 Duration: 1826 Height: 42 Percent: 0.5599135044420577 Weight: 6
    if (data) {
      state.powerEndData.totalweight += data.Weight  //总重量
      state.powerEndData.averagenum += 1             //总次数
      state.total_Percent = state.total_Percent += Math.ceil(data.Percent * 100)  //总分
      state.powerEndData.averagescore = Math.ceil(state.powerEndData.totalweight / state.powerEndData.averagenum)  //平均负重
      state.powerEndData.combinedscore = Math.ceil(state.total_Percent / state.powerEndData.averagenum) //综合得分
      state.powerEndData.amount += data.amount
      if (data.Weight > state.weight_max) {
        state.weight_max = data.Weight
      }
      // console.log(state.totalweight, state.averagenum, state.averagescore, state.combinedscore)
    }
  },
  //这是图标的数据
  set_echartData (state, data) {
    state.echartData.push(data)
  },
  //清空数据
  clear_powerEndData (state) {
    state.powerEndData.combinedscore = 0
    state.powerEndData.totalweight = 0
    state.powerEndData.averagenum = 0
    state.powerEndData.averagescore = 0
    state.powerEndData.amount = 0
    state.echartData = []
  },
  //动作数据
  set_resHeightWeight (state, data) {
    // console.log(1232, data)
    state.actionValue = data
  },
  //课程组
  set_resGenerateLesson (state, data) {
    state.coursegroup = data
  },
}
const getters = {
  completion (state) {
    return '别急'
  },
  echartData: state => state.echartData
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
      times: state.powerEndData.averagenum,   //总次数
      weight_total: state.powerEndData.totalweight,//总负重
      weight_avg: state.powerEndData.averagescore,//平均负重
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
  //
  async updateRM ({ state, getters }, value) {
    console.log(value)
    const rs = await api.post('/update-user-RM', {
      user_id: getters.userInfo.user_id,
      user_RM: [{
        part: '坐姿腹肌训练器RM值',
        value: value,
        date: Number(Date.parse(new Date()).toString().substr(0, 10))
      }]
    })
    console.log('更新rm值', rs)
  },
}

export default {
  getters,
  state,
  mutations,
  actions
}