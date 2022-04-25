<!--THREEJS组件-->
<style scoped>
#d3Container {
  width: 100%;
  height: 100%;
  z-index: 888;
}
</style>
<template>
  <div id="d3Container" ref="mainContent"></div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { mapGetters } from 'vuex'

export default {
  name: 'ThreePage',
  props: {
    /*模型资源地址*/
    ossPath: {
      type: String,
      default(val) {
        return ''
      },
    },
    /*文件类型*/
    suffix: {
      type: String,
      default() {
        return 'gltf'
      },
    },
    /* 模型用途 */
    modeltype: {
      type: String,
      default: '0', //0演示模型 1运动模型
    },
    modelVlue: null,
    /*当前模型的颜色*/
    currentColor: {
      type: String,
      default() {
        return ''
      },
    },
    currentbgColor: {
      type: null,
      default: 0x161616,
    },
  },
  data() {
    return {
      evenf: '1',
      motype: '2',
      // loading: false,
      // publicPath: process.env.BASE_URL,
      // mesh: null,
      camera: null, //摄像机
      scene: null,
      clock: null,
      mixer: null,
      // originX: 0,
      // originY: 0,
      // originZ: 20,
      renderer: null,
      controls: null,
      AnimationAction: null,
      actionA: null,
      actionB: null,
      actionC: null,
      //bgColor: 0x161616, // 设置背景颜色
      modelPath: '/012fb7b6d5a802614a264827c92194db/models/动画_V807.glb', // 设置模型路径
      actionSplitFarme: [119, 133, 251], // 设置模型动作分割帧
      actionSplitTime: [2.5, 1, 3], // 设置动作分割时长
      FPS: 50, // 设置刷新率
      frames: [2.5, 1, 3],
      inum: 0,
      downtime: null,
      downtime2: null,
      timeS: 0,
    }
  },
  computed: {
    ...mapGetters(['evenfPublic', 'projecttype']),
    idowna() {
      return this.frames[0] * 10
    },
    idownb() {
      return this.frames[1] * 1000
    },
    idownc() {
      return this.frames[2] * 10
    },
  },
  mounted() {
    this.init()
    if (this.modeltype == '0') {
      this.mositdown()
    }
  },
  destroyed() {
    // this.clear()
  },
  watch: {
    //监听地址变化时需要更新地址,防止多次点击同一个渲染多次;
    ossPath(val, oldVal) {
      if (val != oldVal) {
        this.init()
      }
    },
    modelVlue(val) {
      this.ControlAnimationTime(val)
    },
  },
  //组件被销毁时,干掉所有3D资源；
  methods: {
    // 初始化
    init() {
      /*利用vue单项数据流的特性做最后的守卫,在最底层监听是否需要展示配准图,只影响该组件的内部数据而不影响外部的matchedOssPatch*/
      if (!this.showMatchWatch) {
        this.matchedOssPatch = ''
      }
      this.createScene() // 创建场景
      this.loadLoader() // 加载P模型
      this.createLight() // 创建光源
      //this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      //this.render() // 渲染
      this.animate()
    },
    //清除当前所有场景
    clear() {
      //this.mesh = null
      this.camera = null
      this.scene = null
      this.renderer = null
      this.controls = null
      cancelAnimationFrame(this.animationId)
      console.log('我要清除啦')
    },
    // 创建场景
    createScene() {
      // this.loading = true
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()
      // var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444)
      // grid.material.opacity = 0.4
      // grid.material.transparent = true
      // grid.rotation.x = Math.PI / 2.0
      // this.scene.add(grid)
    },

    // 加载PLY模型
    loadLoader() {
      let loader = new GLTFLoader()
      loader.load(
        `${this.evenfPublic}012fb7b6d5a802614a264827c92194db/models/${this.projecttype}.glb`,
        (gltf) => {
          // 打印模型参数
          console.log('加载模型', gltf)
          // 创建场景
          var sceneObj = gltf.scene || gltf.scenes[0]
          sceneObj.scale.multiplyScalar(0.19)
          sceneObj.position.set(0, -3, -5)
          this.scene.add(sceneObj)

          this.mixer = new THREE.AnimationMixer(gltf.scene)

          var action = gltf.animations[0]

          this.AnimationAction = this.mixer.clipAction(gltf.animations[0])
          this.AnimationAction.play()
          this.AnimationAction.paused = true

          this.actionA = THREE.AnimationUtils.subclip(
            action,
            'A',
            0,
            this.actionSplitFarme[0],
            24
          )
          this.actionB = THREE.AnimationUtils.subclip(
            action,
            'B',
            this.actionSplitFarme[0],
            this.actionSplitFarme[1],
            24
          )
          this.actionC = THREE.AnimationUtils.subclip(
            action,
            'C',
            this.actionSplitFarme[1],
            this.actionSplitFarme[2],
            24
          )
        },
        undefined,
        function (error) {
          console.error(error)
        }
      )
    },
    // 创建光源
    createLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff) // 创建环境光
      this.scene.add(ambientLight) // 将环境光添加到场景
      const directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, 45, 30)
      this.scene.add(directionalLight)
      //const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
      //spotLight.position.set(50, 50, 50)
      //spotLight.castShadow = true //平行光开启阴影
      //spotLight.receiveShadow = true
      //this.scene.add(spotLight)
    },

    // 创建渲染器
    createRender() {
      const element = this.$refs.mainContent

      //创建相机
      this.camera = new THREE.PerspectiveCamera(
        50,
        element.clientWidth / element.clientHeight,
        0.1,
        1000
      )
      // x横轴y纵轴z前后纵深
      this.camera.position.set(25, 25, 35)
      //相机看向哪个坐标
      this.camera.lookAt({ x: 0, y: 30, z: 0 })
      this.scene.add(this.camera)

      //创建渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(this.currentbgColor) // 设置背景颜色
      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      //this.renderer.shadowMap.enabled = true // 显示阴影
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      element.innerHTML = ''
      element.appendChild(this.renderer.domElement)
    },
    render() {
      //this.animationId = requestAnimationFrame(this.animate) //旋转动画;
      // this.renderer.render(this.scene, this.camera)
      // this.controls.update()
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target = new THREE.Vector3(-2, 13, 0)
      this.controls.enablePan = false
      this.controls.enableZoom = false
      // controls.enableRotate = false;
      this.controls.rotateSpeed = 0.05
      this.controls.screenSpacePanning = true
    },
    // onWindowResize() {
    //   this.camera.aspect = this.aspect
    //   this.camera.updateProjectionMatrix()
    // },
    //动画
    animate() {
      var renderT = 1 / this.FPS //单位秒  间隔多长时间渲染渲染一次
      // var timeS = 0
      requestAnimationFrame(this.animate)

      this.controls.update()
      var delta = this.clock.getDelta()
      this.timeS = this.timeS + delta

      if (this.mixer) {
        this.mixer.update(delta)
      }

      if (this.timeS > renderT) {
        // console.log(timeS, renderT)
        this.renderer.render(this.scene, this.camera)
        this.timeS = 0
      }
    },
    mositdown() {
      this.downtime = setInterval(() => {
        this.inum += 0.6
        if (this.inum >= 60) {
          clearInterval(this.downtime)
          setTimeout(() => {
            this.mogetup()
          }, this.idownb)
        }
        this.ControlAnimationTime(this.inum)
      }, this.idowna)
    },
    mogetup() {
      this.downtime2 = setInterval(() => {
        this.inum -= 0.6
        if (this.inum <= 0) {
          clearInterval(this.downtime2)
          this.mositdown()
        }
        this.ControlAnimationTime(this.inum)
      }, this.idownc)
    },
    ControlAnimationTime(h) {
      // console.log(Math.floor(h))
      //parent.getFromIframe(h) //2.传递参数
      if (this.modeltype == 0) {
        this.$emit('dropvalue', h)
      }
      if (this.AnimationAction) {
        if (h == 0) {
          this.AnimationAction.time = 0
        } else {
          var v1 = (h / 60) * this.actionA.duration

          if (v1 > this.actionA.duration) {
            v1 = this.actionA.duration
          }
          this.AnimationAction.time = v1
        }
      }
    },
  },
}
</script>
