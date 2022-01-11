// process.env.VUE_APP_PAGE_ID == 0 ? "坐姿腹肌训练器" : process.env.VUE_APP_PAGE_ID == 1 ? "体测仪" : "跑步机"

let projecttype;
let lesson_id;
let MakeCareTitle;
let MakeCareDesc;

if (process.env.VUE_APP_PAGE_ID == 0) {
  if (process.env.VUE_APP_PAGE_TYPE == 0) {
    projecttype = '大腿伸展器'
    lesson_id = '445dab66e033da6f0000000000000002'
    MakeCareTitle = '力量器械-大腿伸展器'
    MakeCareDesc = "大腿伸展器是是一款针对肱四头肌，腹直肌训练的专用健身器材"
  } else if (process.env.VUE_APP_PAGE_TYPE == 1) {
    projecttype = '坐姿腹肌训练器'
    lesson_id = '445dab66e033da6f0000000000000003'
    MakeCareTitle = '力量器械-坐姿腹肌训练器'
    MakeCareDesc = "坐姿腹部训练器是一款针对腹部训练的专用健身器材,起到增强上肢及腹部肌肉力量,改善心肺及胸腔功能"
  } else if (process.env.VUE_APP_PAGE_TYPE == 2) {
    projecttype = '坐姿划船训练器'
    lesson_id = '445dab66e033da6f0000000000000004'
    MakeCareTitle = '力量器械-坐姿划船训练器'
    MakeCareDesc = "坐姿划船训练器是一款针对背阔肌、大圆肌、后三角肌 肱二头肌、斜方肌等练习的器械。"
  } else if (process.env.VUE_APP_PAGE_TYPE == 3) {
    projecttype = '双轴胸部推举器'
    lesson_id = '445dab66e033da6f0000000000000005'
    MakeCareTitle = '力量器械-双轴胸部推举器'
    MakeCareDesc = "双轴胸部推举器是一款针对胸部训练的专用健身器材"
  }

} else if (process.env.VUE_APP_PAGE_ID == 1) {
  projecttype = '体测仪'
  lesson_id = '445dab66e033da6f0000000000000001'
} else {
  projecttype = '跑步机'
  lesson_id = '445dab66e033da6f0000000000000006'
}

export default {
  projecttype: projecttype,
  lesson_id: lesson_id,
  MakeCareTitle: MakeCareTitle,
  MakeCareDesc: MakeCareDesc
}