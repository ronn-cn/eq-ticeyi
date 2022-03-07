<!--THREEJS组件-->
<template>
  <div id="d3Container" ref="mainContent"></div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  name: 'ThreePage',
  props: {
    /*模型资源地址*/
    ossPath: {
      type: String,
      default() {
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
    /*当前模型的颜色*/
    currentColor: {
      type: String,
      default() {
        return ''
      },
    },
    /*配准后的颜色*/
    matchedColor: {
      type: String,
      default() {
        return ''
      },
    },
    /*配准后的地址*/
    matchedOssPatch: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
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
      bgColor: '0x303445', // 设置背景颜色
      modelPath: '/012fb7b6d5a802614a264827c92194db/models/动画_V807.glb', // 设置模型路径
      actionSplitFarme: [119, 133, 251], // 设置模型动作分割帧
      actionSplitTime: [2.5, 1, 3], // 设置动作分割时长
      FPS: 50, // 设置刷新率
    }
  },
  mounted() {
    this.init()
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
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
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
        this.modelPath,
        (gltf) => {
          // 打印模型参数
          console.log('加载模型', gltf)
          // 创建场景
          var sceneObj = gltf.scene || gltf.scenes[0]
          sceneObj.scale.multiplyScalar(0.19)
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

    // 创建相机
    createCamera() {
      // 摄像机
      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      // x横轴y纵轴z前后纵深
      this.camera.position.set(30, 25, 30)
      //相机看向哪个坐标
      this.camera.lookAt({ x: 0, y: 30, z: 0 })
      this.scene.add(this.camera)
    },
    // 创建渲染器
    createRender() {
      const element = this.$refs.mainContent

      this.renderer = new THREE.WebGLRenderer()

      this.renderer.setClearColor(0x303445) // 设置背景颜色

      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      //this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染区域尺寸
      //this.renderer.shadowMap.enabled = true // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      element.innerHTML = ''
      element.appendChild(this.renderer.domElement)
    },
    render() {
      this.animationId = requestAnimationFrame(this.animate) //旋转动画;
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target = new THREE.Vector3(0, 15, 0)
      this.controls.enablePan = false
      this.controls.enableZoom = false
      // controls.enableRotate = false;
      this.controls.rotateSpeed = 0.5
      this.controls.screenSpacePanning = true
    },
    // onWindowResize() {
    //   this.camera.aspect = this.aspect
    //   this.camera.updateProjectionMatrix()
    // },
    //动画
    animate() {
      var renderT = 1 / this.FPS //单位秒  间隔多长时间渲染渲染一次
      var timeS = 0
      requestAnimationFrame(this.animate)
      this.controls.update()
      var delta = this.clock.getDelta()
      timeS = timeS + delta
      if (this.mixer) {
        // 肌肉显示贴图

        // if(AnimationAction.time < 1){
        //     sceneObj.children[5].children[0].children[0].children[1].material.emissiveIntensity = AnimationAction.time;
        // } else if(AnimationAction.time > 1 && AnimationAction.time < 2){
        //     var v = 2-AnimationAction.time;
        //     sceneObj.children[5].children[0].children[0].children[1].material.emissiveIntensity = v;
        // }
        this.mixer.update(delta)
      }

      if (timeS > renderT) {
        this.renderer.render(this.scene, this.camera)
        timeS = 0
      }
    },
    ControlAnimationTime(h) {
      // parent.getFromIframe(h) //2.传递参数
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

<style scoped>
#d3Container {
  width: 100%;
  height: 100%;
  z-index: 888;
}
</style>
