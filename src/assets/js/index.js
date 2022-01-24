// 添加 评分，点数据，卡路里消耗
var Run_Data = {
  Count: 0,
  Weight: 0,
  Height: 0,
  Duration: 0,
  Percent: 0,
  Grade: 0,
  Points: [],
  Calorie: 0
}

var frames = [1, 1, 2]    //设置向心离心时间比例

const dead = 10;        // 死区范围
let start_time = 0;     // 开始时间
let pts = null;
let pt0, pt1, pt2, pt3;    // 点
let weight, height;
let max_height = 0;

var t1 = frames[0] * 1000;
var t2 = t1 + frames[1] * 1000;
var t3 = t2 + frames[2] * 1000;
// 标准
const c_height = 50;
const c_pt0 = { "x": 0, "y": 0 }
const c_pt1 = { "x": t1, "y": 50 }
const c_pt2 = { "x": t2, "y": 50 }
const c_pt3 = { "x": t3, "y": 0 }

// 计算斜率
function calc_slope (p1, p2) {
  return (p2.y - p1.y) / (p2.x - p1.x)
}

// 计算时间
function calc_time () {
  return new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ")
}

// 计算角度
function calc_angle (k1, k2) {
  if (k1 * k2 == -1) {
    return 90;
  } else {
    return Math.atan(Math.abs(k1 - k2 / 1 + k1 * k2)) / (Math.PI / 180);
  }
}


let c1 = calc_slope(c_pt0, c_pt1)
let c2 = calc_slope(c_pt1, c_pt2)
let c3 = calc_slope(c_pt2, c_pt3)

// 处理腹肌训练器数据, 标准重量
function HandleSeatedAbTrainerData (data, st_weight, callback) {

  weight = data.weight * 6;
  if (data.extra_weight) {
    weight = weight + 3
  }
  height = data.height;

  if (height >= dead) {
    if (height > max_height) {
      Run_Data.Height = height;
      Run_Data.Weight = weight;
      max_height = height;
    }

    if (pts == null) {
      pts = new Array();
      start_time = Date.now();
      pt0 = { "x": Date.now() - start_time, "y": height };
    }
    pts.push({ "x": Date.now() - start_time, "y": height });
  }

  if (height < dead) {
    if (pts) {
      pt3 = { "x": Date.now() - start_time, "y": height };
      let temp_height = Run_Data.Height * 0.8;

      for (let i = 0; i < pts.length; i++) {
        if (pts[i].y >= temp_height) {
          pt1 = pts[i];
          break;
        }
      }

      for (let i = pts.length - 1; i >= 0; i--) {
        if (pts[i].y >= temp_height) {
          pt2 = pts[i];
          break;
        }
      }
      // 计算斜率，比较
      let s1 = calc_slope(pt0, pt1)
      let s2 = calc_slope(pt1, pt2)
      let s3 = calc_slope(pt2, pt3)


      let A1 = calc_angle(s1, c1);
      let A2 = calc_angle(s2, c2);
      let A3 = calc_angle(s3, c3);

      let S1, S2, S3 = 0;
      if (A1 < 3) {
        S1 = (3 - A1) / 3;
      }
      if (A2 < 3) {
        S2 = (3 - A2) / 3;
      }
      if (A3 < 3) {
        S3 = (3 - A3) / 3;
      }

      var score = 0;
      if (Run_Data.Weight <= st_weight) {
        score += 40 * Run_Data.Weight / st_weight
      } else {
        var over_weight = Run_Data.Weight - st_weight;
        score += 40 + 20 * over_weight / 42;
      }

      if (Run_Data.Height <= c_height) {
        if (Run_Data.Height < c_height * 0.7) {
          score += 15 * (Run_Data.Height / c_height * 0.7);
        } else {
          score += 15 + (15 * (c_height - Run_Data.Height) / c_height * 0.3);
        }
        score += 30 * ((S1 + S2 + S3) / 3) * Run_Data.Height / c_height;
      } else {
        score += 30;
        score += 30 * ((S1 + S2 + S3) / 3);
      }

      let percent = 0;
      if (score > 0) {
        percent = score / 100;
      }
      if (percent > 1) {
        percent = 1;
      }

      Run_Data.Count += 1;
      Run_Data.Percent = Math.round(percent * 1000) / 1000;
      Run_Data.Duration = Date.now() - start_time;
      Run_Data.Grade = Math.round(Run_Data.Percent * 100);
      Run_Data.Points = [pt0, pt1, pt2, pt3]
      // 公式计算出的是KCAL
      Run_Data.Calorie = Run_Data.Weight * 10 * Run_Data.Height / 100 * 0.3
      max_height = 0;


      start_time = 0;
      pts = null;

      return callback(Run_Data);
    }
  }
}

module.exports = {
  HandleSeatedAbTrainerData
}