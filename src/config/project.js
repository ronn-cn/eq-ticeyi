// process.env.VUE_APP_PAGE_ID == 0 ? "坐姿腹肌训练器" : process.env.VUE_APP_PAGE_ID == 1 ? "体测仪" : "跑步机"
let projecttype;
let lesson_id;

import md5 from 'js-md5';

let data = powerInfo

if (process.env.VUE_APP_PAGE_ID == 0) {
  // let index = process.env.VUE_APP_PAGE_TYPE
  projecttype = data.type
  lesson_id = md5(data.type) || ''

} else if (process.env.VUE_APP_PAGE_ID == 1) {
  projecttype = '体测仪'
  lesson_id = '445dab66e033da6f0000000000000001'
} else {
  projecttype = '跑步机'
  lesson_id = '445dab66e033da6f0000000000000006'
}

export default {
  projecttype: projecttype,
  lesson_id: lesson_id
}