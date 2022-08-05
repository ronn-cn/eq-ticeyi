export default {
  //通用
  publicPath: state => state.common.publicPath,
  evenfPublic: state => state.common.evenfPublic,
  ouid: state => state.common.ouid,      //ouid
  Qrcode: state => state.common.Qrcode,  //二维码
  PAGEID: state => state.common.PAGEID,         //pageid
  userMakeState: state => state.common.userMakeState, //预约
  StandbyState: state => state.common.StandbyState, //屏保
  recommendid: state => state.common.recommendid,   //推荐课程
  recommendState: state => state.common.recommendState,  //推荐状态
  sport_start_time: state => state.common.sport_start_time,  //开始时间
  sport_end_time: state => state.common.sport_end_time,  //结束时间
  client_id: state => state.common.client_id,  //
  powerHieght: state => state.common.powerHieght, //力量器械的高度 
  projecttype: state => state.common.projecttype, //设备类型 
  lesson_id: state => state.common.lesson_id,      //lesson_id
  
  MakeCareTitle: state => state.common.MakeCareTitle,  //预约名称
  MakeCareDesc: state => state.common.MakeCareDesc,  //预约简介
  MakelampColor: state => state.common.MakelampColor,  //预约灯的颜色
  MakeClientName: state => state.common.MakeClientName,  //预约灯的颜色


  //用户
  loginState: state => state.user.loginState, //登陆状态 
  userInfo: state => state.user.userinfo, //用户信息
  user_rmvalue: state => state.user.user_rmvalue, //用户rm值 
  user_data: state => state.user.user_data, //用户rm值 
  user_side_log: state => state.user.user_side_log, // 用户体测数据日志

  //websocket
  websocketUrl: state => state.websocket.websocketUrl,  //websocket地址
  getTouchTime: state => state.websocket.TouchTime,  //间隔时间

  resStartLesson: state => state.websocket.resStartLesson,  //课程预约

  resLogoutUser: state => state.websocket.resLogoutUser,  //用户转移退出

  //体测仪
  user_sex: state => state.bodytester.user_sex,   //用户性别
  user_age: (state) => state.bodytester.user_age, //用户年龄
  voicestate: state => state.bodytester.voicestate, //设置声音
  RUN_HEIGHT: (state) => state.bodytester.RUN_HEIGHT, //用户身高
  LOCK_WEIGHT: (state) => state.bodytester.LOCK_WEIGHT, //用户体重
  impedance: (state) => state.bodytester.impedance, //用户体脂
  bodydata: (state) => state.bodytester.bodydata, //用户各项指数
  //力量器械
  moheight: state => state.power.moheight,  //动作数据
  moloopval: state => state.power.moloopval,  //模型循环
  actionValue: state => state.power.actionValue,  //动作数据
  coursegroup: state => state.power.coursegroup,  //课程组
  powerEndData: state => state.power.powerEndData,  //课程组
  isShortcut: state => state.power.isShortcut,  //是否能通过下压到休息
  weight_rm: state => state.power.weight_rm,  //是否能通过下压到休息

  // totalweight: state => state.power.totalweight, //总负重 
  // averagescore: state => state.power.averagescore, //平均分 
  // combinedscore: state => state.power.combinedscore, //综合得分 
  // amount: state => state.power.amount, //训练量 



  //跑步机
  TreadmillData: (state) => state.treadmill.TreadmillData, //实习数据
  resSetSpeed: (state) => state.treadmill.resSetSpeed, //速度改变
  resSetIncline: (state) => state.treadmill.resSetIncline, //坡度改变
  resEmergencyStop: (state) => state.treadmill.resEmergencyStop, //坡度改变
  resSetStart: (state) => state.treadmill.resSetStart, //开始
  resSetStop: (state) => state.treadmill.resSetStop, //结束
};