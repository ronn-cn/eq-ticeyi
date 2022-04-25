
var ruler = {


  /**
   * 初始化刻度尺插件
   * @el 容器 String
   * @height 刻度尺高度 Number
   * @maxScale 最大刻度 Number
   * @startValue 开始的值 Number
   * @region 区间 Array
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * @isConstant 是否不断地获取值 Boolean
   * @success(res) 滑动结束后的回调 Function
   * */


  initPlugin: function (params) {
    // console.log('``````12345')
    // params = item
    //console.log(params)
    var initParams = {
      el: "ruler",
      height: 60,
      maxScale: 80,
      startValue: 25,
      region: [0, 80],
      background: "",
      color: "#fff",
      markColor: "#3786db",
      markwidth: '100%',
      isConstant: true
    };

    if (!initParams.el) {
      console.warn("没有容器元素的参数");
      return false;
    }

    var rulerWrap = document.getElementById(initParams.el); //获取容器
    //console.log(rulerWrap)
    // rulerWrap.style.height = initParams.height < 50 ? 50 + "px" : initParams.height + "px";

    //最大刻度的小值是50
    initParams.maxScale = initParams.maxScale < 50 ? 50 : initParams.maxScale;

    if (initParams.startValue > initParams.maxScale) {
      initParams.startValue = initParams.maxScale;
    }

    var minSildeNum = 0;//最小滑动的值
    var maxSildeNum = initParams.maxScale;//最大滑动的值

    if (initParams.region) {
      minSildeNum = Math.floor(initParams.region[0]);
      maxSildeNum = Math.floor(initParams.region[1]);
    }

    var count = initParams.startValue; //初始值
    // rulerWrap.offsetWidth
    var winWidth = 900; //容器宽度
    var division = winWidth / 50; //每个刻度的距离 分割线
    //刻度值数组
    var scaleValueList = [];
    initParams.maxScale
    //console.log(initParams.maxScale)
    for (var i = 0; i <= initParams.maxScale; i += 5) {
      scaleValueList.push(i);
    }

    var canvas = rulerWrap.getElementsByTagName("canvas")[0]; //获取容器下的canvas标签
    //没有canvas就创建一个
    if (!canvas) {
      canvas = document.createElement("canvas"); //创建canvas标签
      canvas.width = winWidth;
      //console.log('我是宽度')
      canvas.height = initParams.height;
      rulerWrap.appendChild(canvas);
    }
    // canvas = document.createElement("canvas")
    // canvas.width = 300;
    // canvas.height = initParams.height;
    var cxt = canvas.getContext("2d");
    console.log(window.devicePixelRatio)

    // if (window.devicePixelRatio) {
    // 	console.log('----------------------------456')
    // 	// canvas.width = window.devicePixelRatio * winWidth;
    // 	canvas.width = 1600
    // 	// window.devicePixelRatio * initParams.height
    // 	canvas.height = 120 ;
    // 	//console.log(canvas.width)
    // 	// cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
    // }else{
    // 	console.log('----------------------------456')
    // }
    canvas.width = 2 * winWidth;
    canvas.width = 1700
    // window.devicePixelRatio * initParams.height
    canvas.height = 100;
    // //console.log(canvas.width)
    cxt.scale(2, 2);

    //画刻度尺
    function drawRuler (count) {
      //console.log(count)
      count = count - 25;

      //清空画布
      cxt.clearRect(0, 0, winWidth, initParams.height);

      //刻度尺背景
      if (initParams.background) {
        cxt.fillStyle = initParams.background;
        cxt.fillRect(0, 0, canvas.width, initParams.height);
      }

      //画刻度线
      for (var i = 0; i < initParams.maxScale; i++) {
        cxt.beginPath();
        cxt.save();
        cxt.strokeStyle = initParams.color ? initParams.color : "#bbb";
        cxt.lineWidth = 4;
        // cxt.lineHeight = 1
        cxt.lineCap = "round";
        cxt.moveTo(division * i - count * division, 0);
        cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.2));

        // if (i % 2 === 0) {
        //     cxt.strokeStyle = initParams.color ? initParams.color : "#999";
        //     cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.35));
        // }
        if (i % 5 == 0) {
          cxt.strokeStyle = initParams.color ? initParams.color : "#666";
          cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.52));
        }

        cxt.stroke();
        cxt.restore();
        cxt.closePath();
      }

      //添加体重数字
      cxt.beginPath();
      cxt.font = "14px Arial";
      cxt.fillStyle = initParams.color ? initParams.color : "#333";
      cxt.textAlign = "center";
      cxt.textBaseline = "middle";
      scaleValueList.forEach(function (num, i) {
        // //console.log(i)
        cxt.fillText(num.toString(), (division * i * 5) - (count * division), Math.floor(initParams.height * 0.78));
      });
      cxt.closePath();

      //中心刻度线
      cxt.beginPath();
      cxt.save();
      // cxt.strokeStyle = initParams.markColor;
      cxt.strokeStyle = '#fff'
      cxt.lineWidth = 4;
      // cxt.lineCap = "round";
      // winWidth = 1800
      // //console.log(winWidth)
      cxt.moveTo((winWidth / 2), 0);
      // 0.52
      cxt.lineTo((winWidth / 2), Math.floor(initParams.height * 1));
      // //console.log(cxt.lineTo())
      cxt.stroke();
      cxt.restore();
      cxt.closePath();
    }

    if (window.devicePixelRatio) {
      canvas.style.width = "100%"
      canvas.style.height = "118px"
      // + 1 / window.devicePixelRatio + 
      canvas.style.transform = "scale(0.7)";
      canvas.style.transformOrigin = "left top";
      canvas.style.transform = "translate(-32px, 0px)";
    }

    drawRuler(count);

    //滑动相关
    var initX = 0, //初始x 距离
      endX = 0, //结束x 距离
      distanceX = 0, //移动距离
      _distanceX = 0,// 判断用的移动距离
      lastX = count; //上次移动距离

    if (!canvas) return false;

    //手指按下
    canvas.addEventListener("touchstart", function (e) {
      initX = e.targetTouches[0].pageX;

    }, false);

    //手指滑动
    canvas.addEventListener("touchmove", function (e) {
      endX = e.targetTouches[0].pageX;
      moveEvent();
    }, false);

    //手指抬起
    canvas.addEventListener("touchend", function (e) {
      lastX = count;
      overEvent();
    }, false);

    var isMouseDown = false; //鼠标是否按下

    //鼠标按下
    canvas.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      initX = e.layerX;
    }, false);

    //鼠标移动
    canvas.addEventListener("mousemove", function (e) {
      if (!isMouseDown) {
        return false;
      }
      endX = e.layerX;
      moveEvent();
    }, false);


    //鼠标抬起&离开
    canvas.addEventListener("mouseup", function (e) {
      lastX = count;
      isMouseDown = false;
      overEvent();
    }, false);

    canvas.addEventListener("mouseleave", function (e) {
      if (isMouseDown) {
        lastX = count;
        isMouseDown = false;
        overEvent();
      }
    }, false);


    //手指&鼠标移动事件
    function moveEvent () {
      distanceX = Math.floor((endX - initX) / (winWidth / 50));
      if (distanceX === _distanceX) {
        return false;
      }
      _distanceX = distanceX;
      // count = lastX + distanceX;
      count = lastX - distanceX;
      // //console.log(count)
      // scaleValueList.forEach((item,i)=>{
      //     // //console.log(item)
      //     if(lastX + distanceX == item ){
      //         scaleValueList[i] = ''
      //         //console.log(item)
      //     }else if(lastX + distanceX != item ){
      //       scaleValueList[i] = item
      //     }
      // })
      // if(count)

      if (count >= initParams.maxScale || count <= 0) {
        count = count >= initParams.maxScale ? initParams.maxScale : 0;
      }
      drawRuler(count);

      if (initParams.isConstant) {
        params.success && params.success(count);
      }
    }
    //手指&鼠标结束事件
    function overEvent () {
      if (count > maxSildeNum) {
        lastX = count = count > maxSildeNum ? maxSildeNum : count;
      } else if (count < minSildeNum) {
        lastX = count = count < minSildeNum ? minSildeNum : count;
      } else {

      }
      drawRuler(count);
      //返回最后的值
      params.success && params.success(count);
      // //console.log(params.success)
    }

  }


  // initPlugin({
  //         el: "ruler", //容器id
  //         height: 50, //刻度尺高度
  //         maxScale: 80, //最大刻度
  //         startValue: 0, //刻度开始的初始值
  //         region: [0, 80], //选择刻度的区间范围
  //         background: "#323647", //刻度尺背景色
  //         color: "#fff", //刻度线和字体的颜色
  //         markColor: "#3786db", //中心刻度标记颜色
  //         isConstant: true, //是否不断地获取值
  //         success: function (res) {
  //             //console.log(res);
  //             this.inputval = res;
  //         }
  //     });

}
var rulertwo = {


  /**
   * 初始化刻度尺插件
   * @el 容器 String
   * @height 刻度尺高度 Number
   * @maxScale 最大刻度 Number
   * @startValue 开始的值 Number
   * @region 区间 Array
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * @isConstant 是否不断地获取值 Boolean
   * @success(res) 滑动结束后的回调 Function
   * */
  initPlugin: function (params) {
    // console.log('``````12345')
    // //console.log('第一次')
    // //console.log(params)
    // // //console.log('123')
    // // params = item
    // //console.log(params)
    var initParams = {
      el: "ruler",
      height: 60,
      maxScale: 100,
      startValue: 20,
      region: [0, 100],
      background: false,
      color: "#fff",
      markColor: "#fff",
      markwidth: '100%',
      isConstant: true
    };

    if (!initParams.el) {
      // console.warn("没有容器元素的参数");
      return false;
    }

    var rulerWrap = document.getElementById(initParams.el); //获取容器
    // //console.log(rulerWrap)
    // rulerWrap.style.height = initParams.height < 50 ? 50 + "px" : initParams.height + "px";

    //最大刻度的小值是50
    initParams.maxScale = initParams.maxScale < 50 ? 50 : initParams.maxScale;

    if (initParams.startValue > initParams.maxScale) {
      initParams.startValue = initParams.maxScale;
    }

    var minSildeNum = 0;//最小滑动的值
    var maxSildeNum = initParams.maxScale;//最大滑动的值

    if (initParams.region) {
      minSildeNum = Math.floor(initParams.region[0]);
      maxSildeNum = Math.floor(initParams.region[1]);
    }

    var count = initParams.startValue; //初始值
    // rulerWrap.offsetWidth
    var winWidth = 900; //容器宽度
    var division = winWidth / 50; //每个刻度的距离 分割线
    //刻度值数组
    var scaleValueList = [];
    initParams.maxScale
    // //console.log(initParams.maxScale)
    for (var i = 0; i <= initParams.maxScale; i += 5) {
      scaleValueList.push(i / 10);
    }

    var canvas = rulerWrap.getElementsByTagName("canvas")[0]; //获取容器下的canvas标签
    //没有canvas就创建一个
    if (!canvas) {
      canvas = document.createElement("canvas"); //创建canvas标签
      canvas.width = winWidth;
      // //console.log('我是宽度')
      canvas.height = initParams.height;
      rulerWrap.appendChild(canvas);
    }
    // canvas = document.createElement("canvas")
    // canvas.width = 300;
    // canvas.height = initParams.height;
    var cxt = canvas.getContext("2d");

    // if (window.devicePixelRatio) {
    // 	console.log(`${window.devicePixelRatio}`),
    // 	canvas.width = 2 * winWidth;
    // 	canvas.width = 1560
    // 	// window.devicePixelRatio * initParams.height
    // 	canvas.height = 100 ;
    // 	// //console.log(canvas.width)
    // 	cxt.scale(2, 2);
    // }else{
    // console.log(`${window.devicePixelRatio}`),
    canvas.width = 2 * winWidth;
    canvas.width = 1560
    // window.devicePixelRatio * initParams.height
    canvas.height = 100;
    // //console.log(canvas.width)
    cxt.scale(2, 2);
    // }

    //画刻度尺
    function drawRuler (count) {
      // //console.log(count)
      count = count - 25;

      //清空画布
      cxt.clearRect(0, 0, winWidth, initParams.height);

      //刻度尺背景
      if (initParams.background) {
        cxt.fillStyle = initParams.background;
        cxt.fillRect(0, 0, canvas.width, initParams.height);
      }

      //画刻度线
      for (var i = 0; i < initParams.maxScale; i++) {
        cxt.beginPath();
        // //console.log(i)
        cxt.save();
        cxt.strokeStyle = initParams.color ? initParams.color : "#bbb";
        cxt.lineWidth = 4;
        // cxt.lineHeight = 1
        cxt.lineCap = "round";
        cxt.moveTo(division * i - count * division, 0);
        cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.2));
        if (i % 5 == 0) {
          cxt.strokeStyle = initParams.color ? initParams.color : "#666";
          cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.52));
        }

        cxt.stroke();
        cxt.restore();
        cxt.closePath();
      }

      //添加体重数字
      cxt.beginPath();
      cxt.font = "14px Arial";
      cxt.fillStyle = initParams.color ? initParams.color : "#333";
      cxt.textAlign = "center";
      cxt.textBaseline = "middle";
      scaleValueList.forEach(function (num, i) {
        // //console.log(i)
        cxt.fillText(num.toString(), (division * i * 5) - (count * division), Math.floor(initParams.height * 0.78));
      });
      cxt.closePath();

      //中心刻度线
      cxt.beginPath();
      cxt.save();
      // cxt.strokeStyle = initParams.markColor;
      cxt.strokeStyle = '#fff'
      cxt.lineWidth = 4;
      // cxt.lineCap = "round";
      // winWidth = 1800
      // //console.log(winWidth)
      cxt.moveTo((winWidth / 2), 0);
      // 0.52
      cxt.lineTo((winWidth / 2), Math.floor(initParams.height * 1));
      // //console.log(cxt.lineTo())
      cxt.stroke();
      cxt.restore();
      cxt.closePath();
    }

    if (window.devicePixelRatio) {
      canvas.style.width = "12rem"
      canvas.style.height = "100px"
      // + 1 / window.devicePixelRatio + 
      canvas.style.transform = "scale(0.7)";
      canvas.style.transformOrigin = "left top";
      canvas.style.transform = "translate(-491px, 0px)";
    }

    drawRuler(count);

    //滑动相关
    var initX = 0, //初始x 距离
      endX = 0, //结束x 距离
      distanceX = 0, //移动距离
      _distanceX = 0,// 判断用的移动距离
      lastX = count; //上次移动距离

    if (!canvas) return false;

    //手指按下
    canvas.addEventListener("touchstart", function (e) {
      initX = e.targetTouches[0].pageX;

    }, false);

    //手指滑动
    canvas.addEventListener("touchmove", function (e) {
      endX = e.targetTouches[0].pageX;
      // console.log(endX)
      moveEvent();
    }, false);

    //手指抬起
    canvas.addEventListener("touchend", function (e) {
      lastX = count;
      overEvent();
    }, false);

    var isMouseDown = false; //鼠标是否按下

    //鼠标按下
    canvas.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      initX = e.layerX;
    }, false);

    //鼠标移动
    canvas.addEventListener("mousemove", function (e) {
      if (!isMouseDown) {
        return false;
      }
      endX = e.layerX;
      console.log(endX)
      moveEvent();
    }, false);


    //鼠标抬起&离开
    canvas.addEventListener("mouseup", function (e) {
      lastX = count;
      isMouseDown = false;
      overEvent();
    }, false);

    canvas.addEventListener("mouseleave", function (e) {
      if (isMouseDown) {
        lastX = count;
        isMouseDown = false;
        overEvent();
      }
    }, false);


    //手指&鼠标移动事件
    function moveEvent () {
      distanceX = Math.floor((endX - initX) / (winWidth / 50));
      if (distanceX === _distanceX) {
        return false;
      }
      _distanceX = distanceX;
      // count = lastX + distanceX;
      count = lastX - distanceX;
      // console.log(count,`--------------`,lastX,distanceX)
      // //console.log(count)
      // scaleValueList.forEach((item,i)=>{
      //     // //console.log(item)
      //     if(lastX + distanceX == item ){
      //         scaleValueList[i] = ''
      //         //console.log(item)
      //     }else if(lastX + distanceX != item ){
      //       scaleValueList[i] = item
      //     }
      // })
      // if(count)

      if (count >= initParams.maxScale || count <= 0) {
        count = count >= initParams.maxScale ? initParams.maxScale : 0;
      }
      drawRuler(count);

      if (initParams.isConstant) {
        params.success && params.success(count);
      }
    }

    //手指&鼠标结束事件
    function overEvent () {
      if (count > maxSildeNum) {
        lastX = count = count > maxSildeNum ? maxSildeNum : count;
      } else if (count < minSildeNum) {
        lastX = count = count < minSildeNum ? minSildeNum : count;
      } else {

      }
      drawRuler(count);

      //返回最后的值
      params.success && params.success(count);
      // //console.log(params.success)
    }

  }


  // initPlugin({
  //         el: "ruler", //容器id
  //         height: 50, //刻度尺高度
  //         maxScale: 80, //最大刻度
  //         startValue: 0, //刻度开始的初始值
  //         region: [0, 80], //选择刻度的区间范围
  //         background: "#323647", //刻度尺背景色
  //         color: "#fff", //刻度线和字体的颜色
  //         markColor: "#3786db", //中心刻度标记颜色
  //         isConstant: true, //是否不断地获取值
  //         success: function (res) {
  //             //console.log(res);
  //             this.inputval = res;
  //         }
  //     });


}
var rulerthree = {


  /**
   * 初始化刻度尺插件
   * @el 容器 String
   * @height 刻度尺高度 Number
   * @maxScale 最大刻度 Number
   * @startValue 开始的值 Number
   * @region 区间 Array
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * @isConstant 是否不断地获取值 Boolean
   * @success(res) 滑动结束后的回调 Function
   * */
  initPlugin: function (params) {
    // //console.log('第一次')
    // //console.log('我运行了')
    // //console.log(params)
    // //console.log('123')
    // params = item
    // //console.log(params)
    var initParams = {
      el: "rulertwo",
      height: 60,
      maxScale: 100,
      startValue: 20,
      region: [0, 100],
      background: false,
      color: "#fff",
      markColor: "#fff",
      markwidth: '100%',
      isConstant: true
    };

    if (!initParams.el) {
      // console.warn("没有容器元素的参数");
      return false;
    }

    var rulerWrap = document.getElementById(initParams.el); //获取容器
    // //console.log(rulerWrap)
    // rulerWrap.style.height = initParams.height < 50 ? 50 + "px" : initParams.height + "px";

    //最大刻度的小值是50
    initParams.maxScale = initParams.maxScale < 50 ? 50 : initParams.maxScale;

    if (initParams.startValue > initParams.maxScale) {
      initParams.startValue = initParams.maxScale;
    }

    var minSildeNum = 0;//最小滑动的值
    var maxSildeNum = initParams.maxScale;//最大滑动的值

    if (initParams.region) {
      minSildeNum = Math.floor(initParams.region[0]);
      maxSildeNum = Math.floor(initParams.region[1]);
    }

    var count = initParams.startValue; //初始值
    // rulerWrap.offsetWidth
    var winWidth = 900; //容器宽度
    var division = winWidth / 50; //每个刻度的距离 分割线
    //刻度值数组
    var scaleValueList = [];
    initParams.maxScale
    // //console.log(initParams.maxScale)
    for (var i = 0; i <= initParams.maxScale; i += 5) {
      scaleValueList.push(i);
    }
    // //console.log(scaleValueList)

    var canvas = rulerWrap.getElementsByTagName("canvas")[0]; //获取容器下的canvas标签
    //没有canvas就创建一个
    if (!canvas) {
      canvas = document.createElement("canvas"); //创建canvas标签
      canvas.width = winWidth;
      // //console.log('我是宽度')
      canvas.height = initParams.height;
      rulerWrap.appendChild(canvas);
    }
    // canvas = document.createElement("canvas")
    // canvas.width = 300;
    // canvas.height = initParams.height;
    var cxt = canvas.getContext("2d");

    canvas.width = 2 * winWidth;
    canvas.width = 1560
    // window.devicePixelRatio * initParams.height
    canvas.height = 100;
    // //console.log(canvas.width)
    cxt.scale(2, 2);

    // if (window.devicePixelRatio) {
    // 	canvas.width = window.devicePixelRatio * winWidth;
    // 	canvas.width = 1560
    // 	// window.devicePixelRatio * initParams.height
    // 	canvas.height = 100 ;
    // 	// //console.log(canvas.width)
    // 	cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
    // }

    //画刻度尺
    function drawRuler (count) {
      // //console.log(count)
      count = count - 25;

      //清空画布
      cxt.clearRect(0, 0, winWidth, initParams.height);

      //刻度尺背景
      if (initParams.background) {
        cxt.fillStyle = initParams.background;
        cxt.fillRect(0, 0, canvas.width, initParams.height);
      }

      //画刻度线
      for (var i = 0; i < initParams.maxScale; i++) {
        cxt.beginPath();
        // //console.log(i)
        cxt.save();
        cxt.strokeStyle = initParams.color ? initParams.color : "#bbb";
        cxt.lineWidth = 4;
        // cxt.lineHeight = 1
        cxt.lineCap = "round";
        cxt.moveTo(division * i - count * division, 0);
        cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.2));
        if (i % 5 == 0) {
          cxt.strokeStyle = initParams.color ? initParams.color : "#666";
          cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.52));
        }

        cxt.stroke();
        cxt.restore();
        cxt.closePath();
      }

      //添加体重数字
      cxt.beginPath();
      cxt.font = "14px Arial";
      cxt.fillStyle = initParams.color ? initParams.color : "#333";
      cxt.textAlign = "center";
      cxt.textBaseline = "middle";
      scaleValueList.forEach(function (num, i) {
        // //console.log(i)
        cxt.fillText(num.toString(), (division * i * 5) - (count * division), Math.floor(initParams.height * 0.78));
      });
      cxt.closePath();

      //中心刻度线
      cxt.beginPath();
      cxt.save();
      // cxt.strokeStyle = initParams.markColor;
      cxt.strokeStyle = '#fff'
      cxt.lineWidth = 4;
      // cxt.lineCap = "round";
      // winWidth = 1800
      // //console.log(winWidth)
      cxt.moveTo((winWidth / 2), 0);
      // 0.52
      cxt.lineTo((winWidth / 2), Math.floor(initParams.height * 1));
      // //console.log(cxt.lineTo())
      cxt.stroke();
      cxt.restore();
      cxt.closePath();
    }

    if (window.devicePixelRatio) {
      canvas.style.width = "1800px"
      canvas.style.height = "100px"
      // + 1 / window.devicePixelRatio + 
      canvas.style.transform = "scale(0.7)";
      canvas.style.transformOrigin = "left top";
      canvas.style.transform = "translate(-491px, 0px)";
    }

    drawRuler(count);

    //滑动相关
    var initX = 0, //初始x 距离
      endX = 0, //结束x 距离
      distanceX = 0, //移动距离
      _distanceX = 0,// 判断用的移动距离
      lastX = count; //上次移动距离

    if (!canvas) return false;

    //手指按下
    canvas.addEventListener("touchstart", function (e) {
      initX = e.targetTouches[0].pageX;

    }, false);

    //手指滑动
    canvas.addEventListener("touchmove", function (e) {
      endX = e.targetTouches[0].pageX;
      moveEvent();
    }, false);

    //手指抬起
    canvas.addEventListener("touchend", function (e) {
      lastX = count;
      overEvent();
    }, false);

    var isMouseDown = false; //鼠标是否按下

    //鼠标按下
    canvas.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      initX = e.layerX;
    }, false);

    //鼠标移动
    canvas.addEventListener("mousemove", function (e) {
      if (!isMouseDown) {
        return false;
      }
      endX = e.layerX;
      moveEvent();
    }, false);


    //鼠标抬起&离开
    canvas.addEventListener("mouseup", function (e) {
      lastX = count;
      isMouseDown = false;
      overEvent();
    }, false);

    canvas.addEventListener("mouseleave", function (e) {
      if (isMouseDown) {
        lastX = count;
        isMouseDown = false;
        overEvent();
      }
    }, false);


    //手指&鼠标移动事件
    function moveEvent () {
      distanceX = Math.floor((endX - initX) / (winWidth / 50));
      if (distanceX === _distanceX) {
        return false;
      }
      _distanceX = distanceX;
      // count = lastX - distanceX;
      count = lastX - distanceX;
      // //console.log(count)
      // scaleValueList.forEach((item,i)=>{
      //     // //console.log(item)
      //     if(lastX + distanceX == item ){
      //         scaleValueList[i] = ''
      //         //console.log(item)
      //     }else if(lastX + distanceX != item ){
      //       scaleValueList[i] = item
      //     }
      // })
      // if(count)

      if (count >= initParams.maxScale || count <= 0) {
        count = count >= initParams.maxScale ? initParams.maxScale : 0;
      }
      drawRuler(count);

      if (initParams.isConstant) {
        params.success && params.success(count);
      }
    }

    //手指&鼠标结束事件
    function overEvent () {
      if (count > maxSildeNum) {
        lastX = count = count > maxSildeNum ? maxSildeNum : count;
      } else if (count < minSildeNum) {
        lastX = count = count < minSildeNum ? minSildeNum : count;
      } else {

      }
      drawRuler(count);

      //返回最后的值
      params.success && params.success(count);
      // //console.log(params.success)
    }

  }
}
var rulerfour = {


  /**
   * 初始化刻度尺插件
   * @el 容器 String
   * @height 刻度尺高度 Number
   * @maxScale 最大刻度 Number
   * @startValue 开始的值 Number
   * @region 区间 Array
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * @isConstant 是否不断地获取值 Boolean
   * @success(res) 滑动结束后的回调 Function
   * */
  initPlugin: function (params) {
    // //console.log('第一次')
    // //console.log('我运行了')
    // //console.log(params)
    // //console.log('123')
    // params = item
    // //console.log(params)
    var initParams = {
      el: "rulerfour",
      height: 60,
      maxScale: 1000,
      startValue: 200,
      region: [0, 1000],
      background: false,
      color: "#fff",
      markColor: "#fff",
      markwidth: '100%',
      isConstant: true
    };

    if (!initParams.el) {
      // console.warn("没有容器元素的参数");
      return false;
    }

    var rulerWrap = document.getElementById(initParams.el); //获取容器
    // //console.log(rulerWrap)
    // rulerWrap.style.height = initParams.height < 50 ? 50 + "px" : initParams.height + "px";

    //最大刻度的小值是50
    initParams.maxScale = initParams.maxScale < 50 ? 50 : initParams.maxScale;

    if (initParams.startValue > initParams.maxScale) {
      initParams.startValue = initParams.maxScale;
    }

    var minSildeNum = 0;//最小滑动的值
    var maxSildeNum = initParams.maxScale;//最大滑动的值

    if (initParams.region) {
      minSildeNum = Math.floor(initParams.region[0]);
      maxSildeNum = Math.floor(initParams.region[1]);
    }

    var count = initParams.startValue; //初始值
    // rulerWrap.offsetWidth
    var winWidth = 900; //容器宽度
    var division = winWidth / 50; //每个刻度的距离 分割线
    //刻度值数组
    var scaleValueList = [];
    initParams.maxScale
    // //console.log(initParams.maxScale)
    for (var i = 0; i <= initParams.maxScale; i += 5) {
      scaleValueList.push(i);
    }
    // //console.log(scaleValueList)

    var canvas = rulerWrap.getElementsByTagName("canvas")[0]; //获取容器下的canvas标签
    //没有canvas就创建一个
    if (!canvas) {
      canvas = document.createElement("canvas"); //创建canvas标签
      canvas.width = winWidth;
      // //console.log('我是宽度')
      canvas.height = initParams.height;
      rulerWrap.appendChild(canvas);
    }
    // canvas = document.createElement("canvas")
    // canvas.width = 300;
    // canvas.height = initParams.height;
    var cxt = canvas.getContext("2d");


    canvas.width = 2 * winWidth;
    canvas.width = 1560
    // window.devicePixelRatio * initParams.height
    canvas.height = 100;
    // //console.log(canvas.width)
    cxt.scale(2, 2);

    // if (window.devicePixelRatio) {
    // 	canvas.width = window.devicePixelRatio * winWidth;
    // 	canvas.width = 1560
    // 	// window.devicePixelRatio * initParams.height
    // 	canvas.height = 100 ;
    // 	// //console.log(canvas.width)
    // 	cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
    // }

    //画刻度尺
    function drawRuler (count) {
      // //console.log(count)
      count = count - 25;

      //清空画布
      cxt.clearRect(0, 0, winWidth, initParams.height);

      //刻度尺背景
      if (initParams.background) {
        cxt.fillStyle = initParams.background;
        cxt.fillRect(0, 0, canvas.width, initParams.height);
      }

      //画刻度线
      for (var i = 0; i < initParams.maxScale; i++) {
        cxt.beginPath();
        // //console.log(i)
        cxt.save();
        cxt.strokeStyle = initParams.color ? initParams.color : "#bbb";
        cxt.lineWidth = 4;
        // cxt.lineHeight = 1
        cxt.lineCap = "round";
        cxt.moveTo(division * i - count * division, 0);
        cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.2));
        if (i % 5 == 0) {
          cxt.strokeStyle = initParams.color ? initParams.color : "#666";
          cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.52));
        }

        cxt.stroke();
        cxt.restore();
        cxt.closePath();
      }

      //添加体重数字
      cxt.beginPath();
      cxt.font = "14px Arial";
      cxt.fillStyle = initParams.color ? initParams.color : "#333";
      cxt.textAlign = "center";
      cxt.textBaseline = "middle";
      scaleValueList.forEach(function (num, i) {
        // //console.log(i)
        cxt.fillText(num.toString(), (division * i * 5) - (count * division), Math.floor(initParams.height * 0.78));
      });
      cxt.closePath();

      //中心刻度线
      cxt.beginPath();
      cxt.save();
      // cxt.strokeStyle = initParams.markColor;
      cxt.strokeStyle = '#fff'
      cxt.lineWidth = 4;
      // cxt.lineCap = "round";
      // winWidth = 1800
      // //console.log(winWidth)
      cxt.moveTo((winWidth / 2), 0);
      // 0.52
      cxt.lineTo((winWidth / 2), Math.floor(initParams.height * 1));
      // //console.log(cxt.lineTo())
      cxt.stroke();
      cxt.restore();
      cxt.closePath();
    }

    if (window.devicePixelRatio) {
      canvas.style.width = "1800px"
      canvas.style.height = "100px"
      // + 1 / window.devicePixelRatio + 
      canvas.style.transform = "scale(0.7)";
      canvas.style.transformOrigin = "left top";
      canvas.style.transform = "translate(-491px, 0px)";
    }

    drawRuler(count);

    //滑动相关
    var initX = 0, //初始x 距离
      endX = 0, //结束x 距离
      distanceX = 0, //移动距离
      _distanceX = 0,// 判断用的移动距离
      lastX = count; //上次移动距离

    if (!canvas) return false;

    //手指按下
    canvas.addEventListener("touchstart", function (e) {
      initX = e.targetTouches[0].pageX;

    }, false);

    //手指滑动
    canvas.addEventListener("touchmove", function (e) {
      endX = e.targetTouches[0].pageX;
      moveEvent();
    }, false);

    //手指抬起
    canvas.addEventListener("touchend", function (e) {
      lastX = count;
      overEvent();
    }, false);

    var isMouseDown = false; //鼠标是否按下

    //鼠标按下
    canvas.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      initX = e.layerX;
    }, false);

    //鼠标移动
    canvas.addEventListener("mousemove", function (e) {
      if (!isMouseDown) {
        return false;
      }
      endX = e.layerX;
      moveEvent();
    }, false);


    //鼠标抬起&离开
    canvas.addEventListener("mouseup", function (e) {
      lastX = count;
      isMouseDown = false;
      overEvent();
    }, false);

    canvas.addEventListener("mouseleave", function (e) {
      if (isMouseDown) {
        lastX = count;
        isMouseDown = false;
        overEvent();
      }
    }, false);


    //手指&鼠标移动事件
    function moveEvent () {
      distanceX = Math.floor((endX - initX) / (winWidth / 50));
      if (distanceX === _distanceX) {
        return false;
      }
      _distanceX = distanceX;
      count = lastX - distanceX;

      if (count >= initParams.maxScale || count <= 0) {
        count = count >= initParams.maxScale ? initParams.maxScale : 0;
      }
      drawRuler(count);

      if (initParams.isConstant) {
        params.success && params.success(count);
      }
    }

    //手指&鼠标结束事件
    function overEvent () {
      if (count > maxSildeNum) {
        lastX = count = count > maxSildeNum ? maxSildeNum : count;
      } else if (count < minSildeNum) {
        lastX = count = count < minSildeNum ? minSildeNum : count;
      } else {

      }
      drawRuler(count);

      //返回最后的值
      params.success && params.success(count);
      // //console.log(params.success)
    }

  }
}
const inbt = ruler.initPlugin
const inbtwo = rulertwo.initPlugin
const inbtthree = rulerthree.initPlugin
const inbtfour = rulerfour.initPlugin


export {
  inbt,
  inbtwo,
  inbtthree,
  inbtfour
}  